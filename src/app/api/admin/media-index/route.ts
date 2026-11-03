import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/security/require-admin'
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { logAudit } from '@/lib/audit'
import { readJsonBody } from '@/lib/security/api-guards'
import {
  MEDIA_CDN_BASE,
  MEDIA_IMAGES_PREFIX,
  MediaIndexFullError,
  assertMediaIndexBounds,
  findMissingMediaObjects,
  isMediaUrl,
} from '@/lib/security/api-media-index'
import { updateJsonObject } from '@/lib/security/api-s3-json'
import { resolveAwsCredentials } from '@/lib/aws-credentials'

const CDN_BASE = MEDIA_CDN_BASE
const TAGS_KEY = 'media/tags.json'
const META_KEY = 'media/meta.json'
const IMAGES_PREFIX = MEDIA_IMAGES_PREFIX

interface ImageMeta {
  alt?: string
  width?: number
  height?: number
}

function getS3Client() {
  const { AWS_REGION } = process.env
  const credentials = resolveAwsCredentials('AWS_')
  if (!credentials || !AWS_REGION) {
    throw new Error('AWS env vars not configured')
  }
  return new S3Client({
    region: AWS_REGION,
    credentials,
    followRegionRedirects: true,
  })
}

async function readJson<T>(s3: S3Client, bucket: string, key: string, fallback: T): Promise<T> {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
    const body = await res.Body?.transformToString()
    return body ? (JSON.parse(body) as T) : fallback
  } catch {
    return fallback
  }
}

/**
 * GET /api/admin/media-index
 * Returns all images under `images/` merged with tags and metadata.
 */
export async function GET(req: Request) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const bucket = process.env.AWS_S3_BUCKET
  if (!bucket) {
    return NextResponse.json({ error: 'AWS_S3_BUCKET not configured' }, { status: 500 })
  }

  let s3: S3Client
  try {
    s3 = getS3Client()
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }

  // List all objects under images/
  const objects: { key: string; size: number; uploadedAt: string }[] = []
  let continuationToken: string | undefined

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: IMAGES_PREFIX,
        ContinuationToken: continuationToken,
        MaxKeys: 1000,
      })
    )
    for (const obj of res.Contents ?? []) {
      if (obj.Key && !obj.Key.endsWith('/')) {
        objects.push({
          key: obj.Key,
          size: obj.Size ?? 0,
          uploadedAt: obj.LastModified?.toISOString() ?? '',
        })
      }
    }
    continuationToken = res.IsTruncated ? res.NextContinuationToken : undefined
  } while (continuationToken)

  // Read tags and meta in parallel
  const [tagsMap, metaMap] = await Promise.all([
    readJson<Record<string, string[]>>(s3, bucket, TAGS_KEY, {}),
    readJson<Record<string, ImageMeta>>(s3, bucket, META_KEY, {}),
  ])

  // Merge
  const images = objects.map((obj) => {
    const url = `${CDN_BASE}/${obj.key}`
    const name = obj.key.split('/').pop() ?? obj.key
    const meta = Object.hasOwn(metaMap, url) ? metaMap[url] : {}
    return {
      url,
      name,
      tags: Object.hasOwn(tagsMap, url) ? tagsMap[url] : [],
      alt: meta.alt ?? '',
      width: meta.width,
      height: meta.height,
      size: obj.size,
      uploadedAt: obj.uploadedAt,
    }
  })

  // Sort newest first
  images.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))

  return NextResponse.json({ images })
}

const MAX_TAGS = 50
const MAX_TAG_LENGTH = 64
const MAX_ALT_LENGTH = 1000
const MAX_BATCH_ENTRIES = 500

function cleanTags(tags: unknown): string[] | null {
  if (!Array.isArray(tags) || tags.length > MAX_TAGS) return null
  if (!tags.every((t) => typeof t === 'string')) return null
  return (tags as string[]).map((t) => t.trim().slice(0, MAX_TAG_LENGTH)).filter(Boolean)
}

function isDimension(value: unknown) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 100_000)
  )
}

// Re-home a parsed index on a null-prototype object so lookups/assignments by key
// can never reach Object.prototype.
function toDict<T>(obj: Record<string, T>): Record<string, T> {
  return Object.assign(Object.create(null) as Record<string, T>, obj)
}

/**
 * Before a URL becomes a new key in an index, confirm its object exists in the
 * bucket — the index only ever describes real uploads. URLs already in the index
 * are not re-checked. Returns the verified set (consulted again inside the write,
 * in case the index changed in between), or the URLs whose objects are missing.
 */
async function verifyNewMediaUrls(
  s3: S3Client,
  bucket: string,
  indexKey: string,
  urls: string[]
): Promise<{ ok: true; known: Set<string> } | { ok: false; missing: string[] }> {
  // On a read failure this falls back to {}, which only means more HEAD checks.
  const index = await readJson<Record<string, unknown>>(s3, bucket, indexKey, {})
  const fresh = [...new Set(urls)].filter((url) => !Object.hasOwn(index, url))
  const missing = await findMissingMediaObjects(s3, bucket, fresh)
  if (missing.length) return { ok: false, missing }
  return { ok: true, known: new Set(urls) }
}

// Apply `entries` to an index, adding new keys only for URLs verified above and
// within the index caps.
function applyBounded<T>(
  raw: Record<string, T>,
  known: Set<string>,
  entries: Array<[string, (prev: T | undefined) => T]>
): Record<string, T> {
  const index = toDict(raw)
  let added = 0
  for (const [url, update] of entries) {
    const exists = Object.hasOwn(index, url)
    if (!exists) {
      if (!known.has(url)) throw new MediaIndexFullError('Unverified media url')
      added++
    }
    index[url] = update(exists ? index[url] : undefined)
  }
  assertMediaIndexBounds(index, added)
  return index
}

function indexWriteError(err: unknown) {
  if (err instanceof MediaIndexFullError) {
    return NextResponse.json({ error: err.message }, { status: 413 })
  }
  return NextResponse.json({ error: 'Failed to update media metadata' }, { status: 500 })
}

/**
 * PATCH /api/admin/media-index
 * Body: { url, tags?, alt?, width?, height? }
 */
export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin(req)
  if (denied) return denied
  const bucket = process.env.AWS_S3_BUCKET
  if (!bucket) {
    return NextResponse.json({ error: 'AWS_S3_BUCKET not configured' }, { status: 500 })
  }

  let s3: S3Client
  try {
    s3 = getS3Client()
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }

  const parsed = await readJsonBody<{
    url?: unknown
    tags?: unknown
    alt?: unknown
    width?: unknown
    height?: unknown
    /** Batch: set tags for many URLs in one read-modify-write cycle */
    tagEntries?: unknown
  }>(req)
  if (!parsed.ok) return parsed.response
  const body = parsed.data

  // Batch tag update path — no per-URL alt/size in batch mode
  if (body.tagEntries !== undefined) {
    if (!Array.isArray(body.tagEntries) || body.tagEntries.length > MAX_BATCH_ENTRIES) {
      return NextResponse.json({ error: 'Invalid tagEntries' }, { status: 400 })
    }
    const entries: { url: string; tags: string[] }[] = []
    for (const entry of body.tagEntries as { url?: unknown; tags?: unknown }[]) {
      const tags = cleanTags(entry?.tags)
      if (!isMediaUrl(entry?.url) || !tags) {
        return NextResponse.json({ error: 'Invalid tagEntries' }, { status: 400 })
      }
      entries.push({ url: entry.url, tags })
    }
    try {
      const verified = await verifyNewMediaUrls(
        s3,
        bucket,
        TAGS_KEY,
        entries.map((e) => e.url)
      )
      if (!verified.ok) {
        await logAudit(req, {
          action: 'media-tags',
          status: 'denied',
          detail: `${verified.missing.length} url(s) with no object`,
        })
        return NextResponse.json(
          { error: 'Some media urls do not exist', missing: verified.missing.slice(0, 20) },
          { status: 404 }
        )
      }
      await updateJsonObject<Record<string, string[]>>(
        s3,
        bucket,
        TAGS_KEY,
        () => ({}),
        (raw) =>
          applyBounded(
            raw,
            verified.known,
            entries.map((entry) => [entry.url, () => entry.tags])
          )
      )
    } catch (err) {
      console.error('[media-index] tags batch update failed:', err)
      await logAudit(req, { action: 'media-tags', status: 'error', detail: 'index write failed' })
      return indexWriteError(err)
    }
    await logAudit(req, {
      action: 'media-tags',
      status: 'success',
      detail: `${entries.length} url(s)`,
    })
    return NextResponse.json({ ok: true })
  }

  const url = body.url
  if (!isMediaUrl(url)) {
    return NextResponse.json({ error: 'A valid media url is required' }, { status: 400 })
  }

  const tags = body.tags === undefined ? undefined : cleanTags(body.tags)
  if (tags === null) {
    return NextResponse.json({ error: 'Invalid tags' }, { status: 400 })
  }
  if (
    ('alt' in body &&
      body.alt !== null &&
      body.alt !== undefined &&
      (typeof body.alt !== 'string' || body.alt.length > MAX_ALT_LENGTH)) ||
    !isDimension(body.width) ||
    !isDimension(body.height)
  ) {
    return NextResponse.json({ error: 'Invalid alt, width or height' }, { status: 400 })
  }

  const writesMeta = 'alt' in body || 'width' in body || 'height' in body
  if (!tags && !writesMeta) {
    return NextResponse.json({ ok: true })
  }

  // The object must exist before it can gain an index entry (checked once against
  // both indexes: a URL already in either is a known upload).
  let known: Set<string>
  try {
    const [inTags, inMeta] = await Promise.all([
      readJson<Record<string, unknown>>(s3, bucket, TAGS_KEY, {}),
      readJson<Record<string, unknown>>(s3, bucket, META_KEY, {}),
    ])
    if (!Object.hasOwn(inTags, url) && !Object.hasOwn(inMeta, url)) {
      const missing = await findMissingMediaObjects(s3, bucket, [url])
      if (missing.length) {
        await logAudit(req, {
          action: 'media-meta',
          target: url,
          status: 'denied',
          detail: 'no such object',
        })
        return NextResponse.json({ error: 'Media object not found' }, { status: 404 })
      }
    }
    known = new Set([url])
  } catch (err) {
    console.error('[media-index] existence check failed:', err)
    await logAudit(req, { action: 'media-meta', target: url, status: 'error', detail: 'head' })
    return NextResponse.json({ error: 'Failed to update media metadata' }, { status: 500 })
  }

  const updates: Promise<void>[] = []

  if (tags) {
    updates.push(
      updateJsonObject<Record<string, string[]>>(
        s3,
        bucket,
        TAGS_KEY,
        () => ({}),
        (raw) => applyBounded(raw, known, [[url, () => tags]])
      )
    )
  }

  if (writesMeta) {
    updates.push(
      updateJsonObject<Record<string, ImageMeta>>(
        s3,
        bucket,
        META_KEY,
        () => ({}),
        (raw) =>
          applyBounded(raw, known, [
            [
              url,
              (prev) => {
                const existing: ImageMeta = { ...(prev ?? {}) }
                if ('alt' in body) existing.alt = (body.alt as string | null | undefined) ?? ''
                if ('width' in body)
                  existing.width = (body.width as number | null | undefined) ?? undefined
                if ('height' in body)
                  existing.height = (body.height as number | null | undefined) ?? undefined
                return existing
              },
            ],
          ])
      )
    )
  }

  const results = await Promise.allSettled(updates)
  const failure = results.find((r): r is PromiseRejectedResult => r.status === 'rejected')
  if (failure) {
    console.error('[media-index] update failed:', results)
    await logAudit(req, {
      action: 'media-meta',
      target: url,
      status: 'error',
      detail: 'index write failed',
    })
    return indexWriteError(failure.reason)
  }

  await logAudit(req, { action: 'media-meta', target: url, status: 'success' })

  return NextResponse.json({ ok: true })
}
