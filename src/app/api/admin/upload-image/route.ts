import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * POST /api/admin/upload-image
 * Uploads an image file to public/images/admin-uploads/{slug}/ via GitHub Contents API.
 * Body: multipart/form-data with `file` and `slug` fields.
 */
export async function POST(req: NextRequest) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env
  const branch = 'drafts/ai'

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: 'GitHub env vars not configured' }, { status: 500 })
  }

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const slug = (formData.get('slug') as string | null) ?? 'admin'

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
