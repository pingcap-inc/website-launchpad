import { NextRequest, NextResponse } from 'next/server'
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import { logAudit } from '@/lib/audit'
import { isUnsafeObjectKey, readJsonBody } from '@/lib/security/api-guards'

const CDN_BASE = 'https://static.pingcap.com'
const TAGS_KEY = 'media/tags.json'
const META_KEY = 'media/meta.json'
const IMAGES_PREFIX = 'images/'

interface ImageMeta {
  alt?: string
  width?: number
  height?: number
}

function getS3Client() {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env
  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION) {
    throw new Error('AWS env vars not configured')
  }
  return new S3Client({
    region: AWS_REGION,
    credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
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

async function writeJson(s3: S3Client, bucket: string, key: string, data: unknown): Promise<void> {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(data, null, 2),
      ContentType: 'application/json',
    })
  )
}

/**
 * GET /api/admin/media-index
 * Returns all images under `images/` merged with tags and metadata.
 */
export async function GET() {
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

// Index keys are CDN URLs of objects under images/ — the only thing the Media
// Library ever writes. Anything else (incl. `__proto__`/`constructor`) is refused,
// so caller strings can't become arbitrary keys in the shared JSON indexes.
function isMediaUrl(url: unknown): url is string {
  return (
    typeof url === 'string' &&
    url.length <= 1024 &&
    url.startsWith(`${CDN_BASE}/${IMAGES_PREFIX}`) &&
    !url.includes('..') &&
    !isUnsafeObjectKey(url)
  )
}

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
 * PATCH /api/admin/media-index
 * Body: { url, tags?, alt?, width?, height? }
 */
export async function PATCH(req: NextRequest) {
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
    const tagsMap = toDict(await readJson<Record<string, string[]>>(s3, bucket, TAGS_KEY, {}))
    for (const entry of entries) tagsMap[entry.url] = entry.tags
    await writeJson(s3, bucket, TAGS_KEY, tagsMap)
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

  const updates: Promise<void>[] = []

  if (tags) {
    const p = readJson<Record<string, string[]>>(s3, bucket, TAGS_KEY, {}).then((raw) => {
      const tagsMap = toDict(raw)
      tagsMap[url] = tags
      return writeJson(s3, bucket, TAGS_KEY, tagsMap)
    })
    updates.push(p)
  }

  if ('alt' in body || 'width' in body || 'height' in body) {
    const p = readJson<Record<string, ImageMeta>>(s3, bucket, META_KEY, {}).then((raw) => {
      const metaMap = toDict(raw)
      const existing: ImageMeta = { ...(metaMap[url] ?? {}) }
      if ('alt' in body) existing.alt = (body.alt as string | null | undefined) ?? ''
      if ('width' in body) existing.width = (body.width as number | null | undefined) ?? undefined
      if ('height' in body)
        existing.height = (body.height as number | null | undefined) ?? undefined
      metaMap[url] = existing
      return writeJson(s3, bucket, META_KEY, metaMap)
    })
    updates.push(p)
  }

  await Promise.all(updates)

  await logAudit(req, { action: 'media-meta', target: url, status: 'success' })

  return NextResponse.json({ ok: true })
}
