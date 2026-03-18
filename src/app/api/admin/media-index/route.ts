import { NextRequest, NextResponse } from 'next/server'
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3'

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
    const meta = metaMap[url] ?? {}
    return {
      url,
      name,
      tags: tagsMap[url] ?? [],
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

  const body = (await req.json()) as {
    url?: string
    tags?: string[]
    alt?: string
    width?: number | null
    height?: number | null
  }
  if (!body.url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 })
  }

  const updates: Promise<void>[] = []

  if (Array.isArray(body.tags)) {
    const p = readJson<Record<string, string[]>>(s3, bucket, TAGS_KEY, {}).then((tagsMap) => {
      tagsMap[body.url!] = body.tags!
      return writeJson(s3, bucket, TAGS_KEY, tagsMap)
    })
    updates.push(p)
  }

  if ('alt' in body || 'width' in body || 'height' in body) {
    const p = readJson<Record<string, ImageMeta>>(s3, bucket, META_KEY, {}).then((metaMap) => {
      const existing = metaMap[body.url!] ?? {}
      if ('alt' in body) existing.alt = body.alt ?? ''
      if ('width' in body) existing.width = body.width ?? undefined
      if ('height' in body) existing.height = body.height ?? undefined
      metaMap[body.url!] = existing
      return writeJson(s3, bucket, META_KEY, metaMap)
    })
    updates.push(p)
  }

  await Promise.all(updates)

  return NextResponse.json({ ok: true })
}
