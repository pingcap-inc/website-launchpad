import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'

const CDN_BASE = 'https://static.pingcap.com'
const TAGS_KEY = 'media/tags.json'

/**
 * POST /api/admin/upload-image
 * Uploads an image file to public/images/admin-uploads/{slug}/ via GitHub Contents API.
 * Body: multipart/form-data with `file` and `slug` fields.
 */
export async function POST(req: NextRequest) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = 'drafts/ai'

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const slug = (formData.get('slug') as string | null) ?? 'admin'
  const source = (formData.get('source') as string | null) ?? ''
  const tagsRaw = (formData.get('tags') as string | null) ?? ''
  const tags = tagsRaw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)

  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  const MAX_SIZE = 5 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File must be under 5 MB' }, { status: 413 })
  }

  const allowed = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Only PNG, JPG, SVG, WebP are allowed' }, { status: 415 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const hash = crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 8)
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '_').toLowerCase()
  const filename = `${hash}-${safeName}`

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
    const s3Key = `images/${filename}`
    await s3.send(
      new PutObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
      })
    )
    const publicUrl = `${CDN_BASE}/${s3Key}`

    // Update tags.json
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

    return NextResponse.json({ path: publicUrl })
  }

  // ── Default path: upload to GitHub (page-specific images) ────────────────
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  const filePath = `public/images/admin-uploads/${slug}/${filename}`
  const publicPath = `/images/admin-uploads/${slug}/${filename}`

  const baseUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`
  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }

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

  // Check for existing file SHA
  let sha: string | undefined
  const check = await fetch(`${baseUrl}/contents/${filePath}?ref=${encodeURIComponent(branch)}`, {
    headers,
  })
  if (check.ok) {
    const existing = (await check.json()) as { sha: string }
    sha = existing.sha
  }

  const body: Record<string, unknown> = {
    message: `chore: upload image ${filename} for /${slug}/`,
    content: buffer.toString('base64'),
    branch,
  }
  if (sha) body.sha = sha

  const res = await fetch(`${baseUrl}/contents/${filePath}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = (await res.json()) as { message?: string }
    return NextResponse.json({ error: err.message ?? 'Upload to GitHub failed' }, { status: 500 })
  }

  return NextResponse.json({ path: publicPath })
}
