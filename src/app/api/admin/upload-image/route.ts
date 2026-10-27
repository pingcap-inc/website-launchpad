import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { logAudit } from '@/lib/audit'
import { getGitHubAuthHeaders } from '@/lib/github-auth'

const CDN_BASE = 'https://static.pingcap.com'
const TAGS_KEY = 'media/tags.json'

// `slug` is interpolated into the committed file path
// (public/images/admin-uploads/<slug>/<file>). Without validation, a value like
// `../../../src/app/some-page` escapes the uploads dir and writes arbitrary repo
// files via the GitHub token. Allow only plain slug segments — no dots, no traversal.
function isValidSlugPath(slug: string) {
  if (!slug) return false
  const segments = slug.split('/').filter(Boolean)
  return segments.length > 0 && segments.every((segment) => /^[a-z0-9-]+$/.test(segment))
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const MAX_VIDEO_BYTES = 50 * 1024 * 1024
// Multipart framing + the small text fields on top of the largest allowed file.
const MAX_REQUEST_BYTES = MAX_VIDEO_BYTES + 1024 * 1024

// SVG is an active document: opened directly from static.pingcap.com it can run
// script. We don't ship a full sanitizer, so refuse markup that can execute script;
// plain vector artwork (including embedded data:image rasters) passes untouched.
// SVGs are additionally stored with Content-Disposition: attachment.
const SVG_ACTIVE_CONTENT =
  /<script|<foreignobject|<iframe|<embed|<object|<handler|[\s/"']on[a-z]+\s*=|javascript:|vbscript:|data:text\/html|<!entity/i

function isSafeSvg(buffer: Buffer) {
  const text = buffer.toString('utf-8')
  return !SVG_ACTIVE_CONTENT.test(text)
}

// Git's blob id for `content` — what the GitHub contents API reports as `sha`.
function gitBlobSha(content: Buffer) {
  return crypto.createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex')
}

function isPreconditionFailed(err: unknown) {
  const e = err as { name?: string; $metadata?: { httpStatusCode?: number } }
  return e?.name === 'PreconditionFailed' || e?.$metadata?.httpStatusCode === 412
}

/**
 * Write `buffer` under `key` only if nothing is there yet. Returns 'written', or
 * 'identical' when the existing object already has exactly this content, or
 * 'conflict' when a different object holds the key.
 */
async function putIfAbsent(
  s3: S3Client,
  bucket: string,
  key: string,
  buffer: Buffer,
  contentType: string,
  md5Hex: string
): Promise<'written' | 'identical' | 'conflict'> {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        // Never served inline as a document if opened directly (SVG script).
        ...(contentType === 'image/svg+xml' ? { ContentDisposition: 'attachment' } : {}),
        IfNoneMatch: '*',
      })
    )
    return 'written'
  } catch (err) {
    if (!isPreconditionFailed(err)) throw err
  }
  const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
  return head.ETag?.replace(/"/g, '') === md5Hex ? 'identical' : 'conflict'
}

/**
 * POST /api/admin/upload-image
 * Uploads an image file to public/images/admin-uploads/{slug}/ via GitHub Contents API.
 * Body: multipart/form-data with `file` and `slug` fields.
 */
export async function POST(req: NextRequest) {
  const { GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = 'drafts/ai'

  // Refuse oversized bodies before buffering them.
  const declaredLength = Number(req.headers.get('content-length') ?? '')
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return NextResponse.json({ error: 'File must be under 50 MB' }, { status: 413 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const slug = (formData.get('slug') as string | null) ?? 'admin'
  if (!isValidSlugPath(slug)) {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
  }
  const source = (formData.get('source') as string | null) ?? ''
  const tagsRaw = (formData.get('tags') as string | null) ?? ''
  const skipTagsUpdate = (formData.get('skipTagsUpdate') as string | null) === '1'
  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim().slice(0, 64))
    .filter(Boolean)
    .slice(0, 50)

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  const isVideo = file.type.startsWith('video/')

  const MAX_SIZE = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File must be under ${isVideo ? 50 : 5} MB` },
      { status: 413 }
    )
  }

  const allowed = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp', 'video/mp4']
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: 'Only PNG, JPG, SVG, WebP, MP4 are allowed' },
      { status: 415 }
    )
  }

  // Videos are large binaries — they must go to S3 (Media Center), never the
  // GitHub Contents API, which base64-encodes into a commit.
  if (isVideo && source !== 'media') {
    return NextResponse.json(
      { error: 'Videos can only be uploaded via the Media Library' },
      { status: 400 }
    )
  }

  const isSvg = file.type === 'image/svg+xml'
  // Page-specific uploads are committed under public/ and served from the main
  // www.pingcap.com origin, where an SVG document is too risky — SVGs go through
  // the Media Library (static.pingcap.com) only.
  if (isSvg && source !== 'media') {
    return NextResponse.json(
      { error: 'SVGs can only be uploaded via the Media Library' },
      { status: 415 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  if (isSvg && !isSafeSvg(buffer)) {
    await logAudit(req, {
      action: 'upload-image',
      target: file.name,
      status: 'denied',
      detail: 'svg with active content',
    })
    return NextResponse.json({ error: 'SVG contains scripts or event handlers' }, { status: 415 })
  }
  const fullHash = crypto.createHash('sha1').update(buffer).digest('hex')
  const md5Hex = crypto.createHash('md5').update(buffer).digest('hex')
  const safeName = file.name
    .replace(/[^a-z0-9._-]/gi, '_')
    .replace(/^\.+/, '_')
    .toLowerCase()
    .slice(-100)
  // Short content-address prefix (the media library strips an 8-hex prefix for
  // display); on a collision with different content we fall back to a longer one
  // rather than overwrite the existing object.
  const filename = `${fullHash.slice(0, 8)}-${safeName}`
  const longFilename = `${fullHash.slice(0, 20)}-${safeName}`

  // ── Media Center path: upload to S3 ──────────────────────────────────────
  if (source === 'media') {
    const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET } = process.env
    if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY || !AWS_REGION || !AWS_S3_BUCKET) {
      return NextResponse.json({ error: 'AWS env vars not configured' }, { status: 500 })
    }
    const s3 = new S3Client({
      region: AWS_REGION,
      credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
      followRegionRedirects: true,
    })
    let s3Key = `images/${filename}`
    try {
      let outcome = await putIfAbsent(s3, AWS_S3_BUCKET, s3Key, buffer, file.type, md5Hex)
      if (outcome === 'conflict') {
        s3Key = `images/${longFilename}`
        outcome = await putIfAbsent(s3, AWS_S3_BUCKET, s3Key, buffer, file.type, md5Hex)
      }
      if (outcome === 'conflict') {
        return NextResponse.json(
          { error: 'A different file already exists with this name' },
          { status: 409 }
        )
      }
    } catch (err) {
      console.error('[upload-image] S3 upload failed:', err)
      await logAudit(req, { action: 'upload-image', target: s3Key, status: 'error' })
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
    const publicUrl = `${CDN_BASE}/${s3Key}`

    // Skip tags.json read-modify-write when there's nothing to set, or when
    // the caller plans to batch-update tags after a parallel upload.
    if (!skipTagsUpdate && tags.length > 0) {
      let tagsMap: Record<string, string[]> = {}
      try {
        const res = await s3.send(new GetObjectCommand({ Bucket: AWS_S3_BUCKET, Key: TAGS_KEY }))
        const body = await res.Body?.transformToString()
        if (body) tagsMap = JSON.parse(body) as Record<string, string[]>
      } catch {
        // tags.json doesn't exist yet — start fresh
      }
      tagsMap[publicUrl] = tags
      await s3.send(
        new PutObjectCommand({
          Bucket: AWS_S3_BUCKET,
          Key: TAGS_KEY,
          Body: JSON.stringify(tagsMap, null, 2),
          ContentType: 'application/json',
        })
      )
    }

    await logAudit(req, {
      action: 'upload-image',
      target: publicUrl,
      status: 'success',
      detail: 'media-library (s3)',
    })
    return NextResponse.json({ path: publicUrl })
  }

  // ── Default path: upload to GitHub (page-specific images) ────────────────
  const headers = await getGitHubAuthHeaders()
  if (!headers || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`

  // Check if branch exists, create if not
  const branchCheck = await fetch(`${baseUrl}/git/refs/heads/${encodeURIComponent(branch)}`, {
    headers,
  })
  if (!branchCheck.ok) {
    // Get main SHA to branch from
    const mainRef = await fetch(`${baseUrl}/git/refs/heads/main`, { headers })
    if (!mainRef.ok) {
      return NextResponse.json({ error: 'Could not resolve main branch' }, { status: 500 })
    }
    const { object } = (await mainRef.json()) as { object: { sha: string } }
    await fetch(`${baseUrl}/git/refs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: object.sha }),
    })
  }

  // Pick a path that is free or already holds exactly this content — never
  // overwrite a different existing file.
  const blobSha = gitBlobSha(buffer)
  let chosen: string | null = null
  let alreadyThere = false
  for (const name of [filename, longFilename]) {
    const check = await fetch(
      `${baseUrl}/contents/public/images/admin-uploads/${slug}/${name}?ref=${encodeURIComponent(branch)}`,
      { headers }
    )
    if (check.status === 404) {
      chosen = name
      break
    }
    if (!check.ok) {
      return NextResponse.json({ error: 'Upload to GitHub failed' }, { status: 500 })
    }
    const existing = (await check.json()) as { sha?: string }
    if (existing.sha === blobSha) {
      chosen = name
      alreadyThere = true
      break
    }
  }
  if (!chosen) {
    return NextResponse.json(
      { error: 'A different file already exists with this name' },
      { status: 409 }
    )
  }

  const filePath = `public/images/admin-uploads/${slug}/${chosen}`
  const publicPath = `/images/admin-uploads/${slug}/${chosen}`

  if (!alreadyThere) {
    const res = await fetch(`${baseUrl}/contents/${filePath}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `chore: upload image ${chosen} for /${slug}/`,
        content: buffer.toString('base64'),
        branch,
      }),
    })

    if (!res.ok) {
      console.error(
        '[upload-image] GitHub upload failed:',
        res.status,
        await res.text().catch(() => '')
      )
      await logAudit(req, { action: 'upload-image', target: publicPath, branch, status: 'error' })
      return NextResponse.json({ error: 'Upload to GitHub failed' }, { status: 500 })
    }
  }

  await logAudit(req, {
    action: 'upload-image',
    target: publicPath,
    branch,
    status: 'success',
    detail: `for /${slug}/`,
  })

  return NextResponse.json({ path: publicPath })
}
