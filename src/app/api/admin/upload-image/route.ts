import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { logAudit } from '@/lib/audit'
import { getGitHubAuthHeaders } from '@/lib/github-auth'
import { resolveAwsCredentials } from '@/lib/aws-credentials'
import { updateJsonObject } from '@/lib/security/api-s3-json'

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

type UploadType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/svg+xml' | 'video/mp4'

// Stored extension per type. The first entry is used when the uploaded name has no
// matching extension; the others are accepted as-is so existing names are kept.
const EXTENSIONS: Record<UploadType, string[]> = {
  'image/png': ['png'],
  'image/jpeg': ['jpg', 'jpeg'],
  'image/webp': ['webp'],
  'image/svg+xml': ['svg'],
  'video/mp4': ['mp4'],
}

function startsWith(buffer: Buffer, bytes: number[], offset = 0) {
  return buffer.length >= offset + bytes.length && bytes.every((b, i) => buffer[offset + i] === b)
}

function ascii(buffer: Buffer, start: number, end: number) {
  return buffer.length >= end ? buffer.toString('latin1', start, end) : ''
}

// SVG has no magic number: accept only text that is plainly an SVG document — an
// optional BOM/XML prolog/comments/doctype, then a root <svg> element — with no NUL.
function looksLikeSvg(buffer: Buffer) {
  if (buffer.includes(0)) return false
  const head = buffer.toString('utf-8', 0, Math.min(buffer.length, 4096)).replace(/^\uFEFF/, '')
  return /^\s*(<\?xml[^>]*\?>\s*)?(<!--[\s\S]*?-->\s*)*(<!doctype\s+svg[^>]*>\s*)?(<!--[\s\S]*?-->\s*)*<svg[\s>]/i.test(
    head
  )
}

/**
 * The file's real type, from its leading bytes (never from the client-supplied
 * name or MIME type). Null when it is none of the accepted formats.
 */
function detectUploadType(buffer: Buffer): UploadType | null {
  if (startsWith(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return 'image/png'
  if (startsWith(buffer, [0xff, 0xd8, 0xff])) return 'image/jpeg'
  if (ascii(buffer, 0, 4) === 'RIFF' && ascii(buffer, 8, 12) === 'WEBP') return 'image/webp'
  if (ascii(buffer, 4, 8) === 'ftyp') {
    // ISO-BMFF: AVIF/HEIC share the container, so only MP4-family brands count.
    const brand = ascii(buffer, 8, 12)
    if (!/^(avi[fs]|hei[cmsx]|mif1|msf1)$/.test(brand)) return 'video/mp4'
    return null
  }
  if (looksLikeSvg(buffer)) return 'image/svg+xml'
  return null
}

// The stored file name: sanitized base name with an extension forced to match the
// detected type, so the CDN serves it with the right Content-Type.
function storedName(originalName: string, type: UploadType) {
  const sanitized = originalName
    .replace(/[^a-z0-9._-]/gi, '_')
    .replace(/^\.+/, '_')
    .toLowerCase()
  const dot = sanitized.lastIndexOf('.')
  const ext = dot > 0 ? sanitized.slice(dot + 1) : ''
  const base = (dot > 0 ? sanitized.slice(0, dot) : sanitized).replace(/\./g, '_') || 'file'
  const finalExt = EXTENSIONS[type].includes(ext) ? ext : EXTENSIONS[type][0]
  return `${base.slice(-(100 - finalExt.length - 1))}.${finalExt}`
}

function sha256Hex(buffer: Buffer | Uint8Array) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
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
 * Whether the object at `key` holds exactly `buffer`, by SHA-256. Uses the digest
 * recorded in the object's metadata at upload; objects uploaded before that was
 * recorded are read back and hashed (only when the sizes already match).
 */
async function hasSameContent(
  s3: S3Client,
  bucket: string,
  key: string,
  buffer: Buffer,
  sha256: string
) {
  const head = await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
  const recorded = head.Metadata?.sha256
  if (recorded) return recorded === sha256
  if (head.ContentLength !== buffer.length) return false
  const obj = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  const bytes = await obj.Body?.transformToByteArray()
  return !!bytes && sha256Hex(bytes) === sha256
}

/**
 * Write `buffer` under `key` only if nothing is there yet. Returns 'written', or
 * 'identical' when the existing object already has exactly this content (SHA-256),
 * or 'conflict' when a different object holds the key.
 */
async function putIfAbsent(
  s3: S3Client,
  bucket: string,
  key: string,
  buffer: Buffer,
  contentType: UploadType,
  sha256: string
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
        Metadata: { sha256 },
        IfNoneMatch: '*',
      })
    )
    return 'written'
  } catch (err) {
    if (!isPreconditionFailed(err)) throw err
  }
  return (await hasSameContent(s3, bucket, key, buffer, sha256)) ? 'identical' : 'conflict'
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

  // The client-declared MIME type is only a first filter (and must agree with the
  // content below); the stored type is always the one detected from the bytes.
  if (!Object.hasOwn(EXTENSIONS, file.type)) {
    return NextResponse.json(
      { error: 'Only PNG, JPG, SVG, WebP, MP4 are allowed' },
      { status: 415 }
    )
  }
  // Size limit by the declared type, before buffering; the detected type must equal
  // the declared one below, so the limit that applied is the right one.
  const isVideo = file.type === 'video/mp4'
  const MAX_SIZE = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `File must be under ${isVideo ? 50 : 5} MB` },
      { status: 413 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const detectedType = detectUploadType(buffer)
  if (!detectedType || detectedType !== file.type || buffer.length > MAX_SIZE) {
    await logAudit(req, {
      action: 'upload-image',
      target: file.name.slice(0, 200),
      status: 'denied',
      detail: `content does not match declared type (${file.type} vs ${detectedType ?? 'unknown'})`,
    })
    return NextResponse.json(
      { error: 'File content does not match its type. Only PNG, JPG, SVG, WebP, MP4 are allowed' },
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

  const isSvg = detectedType === 'image/svg+xml'
  // Page-specific uploads are committed under public/ and served from the main
  // www.pingcap.com origin, where an SVG document is too risky — SVGs go through
  // the Media Library (static.pingcap.com) only.
  if (isSvg && source !== 'media') {
    return NextResponse.json(
      { error: 'SVGs can only be uploaded via the Media Library' },
      { status: 415 }
    )
  }

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
  const contentSha256 = sha256Hex(buffer)
  const safeName = storedName(file.name, detectedType)
  // Short content-address prefix (the media library strips an 8-hex prefix for
  // display); on a collision with different content we fall back to a longer one
  // rather than overwrite the existing object.
  const filename = `${fullHash.slice(0, 8)}-${safeName}`
  const longFilename = `${fullHash.slice(0, 20)}-${safeName}`

  // ── Media Center path: upload to S3 ──────────────────────────────────────
  if (source === 'media') {
    const { AWS_REGION, AWS_S3_BUCKET } = process.env
    const credentials = resolveAwsCredentials('AWS_')
    if (!credentials || !AWS_REGION || !AWS_S3_BUCKET) {
      return NextResponse.json({ error: 'AWS env vars not configured' }, { status: 500 })
    }
    const s3 = new S3Client({
      region: AWS_REGION,
      credentials,
      followRegionRedirects: true,
    })
    let s3Key = `images/${filename}`
    try {
      let outcome = await putIfAbsent(s3, AWS_S3_BUCKET, s3Key, buffer, detectedType, contentSha256)
      if (outcome === 'conflict') {
        s3Key = `images/${longFilename}`
        outcome = await putIfAbsent(s3, AWS_S3_BUCKET, s3Key, buffer, detectedType, contentSha256)
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
    // the caller plans to batch-update tags after a parallel upload. The write is
    // conditional (IfMatch), so concurrent tag edits aren't lost.
    if (!skipTagsUpdate && tags.length > 0) {
      try {
        await updateJsonObject<Record<string, string[]>>(
          s3,
          AWS_S3_BUCKET,
          TAGS_KEY,
          () => ({}),
          (raw) => {
            const tagsMap = Object.assign(Object.create(null) as Record<string, string[]>, raw)
            tagsMap[publicUrl] = tags
            return tagsMap
          }
        )
      } catch (err) {
        // The file itself is stored; only its tags failed. Report it, keep the upload.
        console.error('[upload-image] tags update failed:', err)
        await logAudit(req, {
          action: 'media-tags',
          target: publicUrl,
          status: 'error',
          detail: 'tags write after upload failed',
        })
      }
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
