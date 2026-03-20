import { NextResponse } from 'next/server'
import { promises as fs } from 'node:fs'
import path from 'node:path'

type ScorePayload = {
  results?: Array<{
    slug: string
    ux: number
    seo: number
    consistency: number
    overall: number
    error?: string
  }>
}

let cachedRemote: { data: ScorePayload; ts: number } | null = null
const REMOTE_CACHE_TTL_MS = 15_000

async function readLocalScores(): Promise<ScorePayload | null> {
  const reportPath = path.join(process.cwd(), 'reports', 'page-scorecards.json')
  try {
    const raw = await fs.readFile(reportPath, 'utf-8')
    return JSON.parse(raw) as ScorePayload
  } catch {
    return null
  }
}

async function readRemoteScores(): Promise<ScorePayload | null> {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } = process.env
  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) return null

  if (cachedRemote && Date.now() - cachedRemote.ts < REMOTE_CACHE_TTL_MS) {
    return cachedRemote.data
  }

  const ref = GITHUB_BRANCH ?? 'staging'
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/reports/page-scorecards.json?ref=${ref}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  )

  if (!res.ok) return null
  const json = (await res.json()) as { content?: string; encoding?: string }
  if (!json.content) return null

  const decoded = Buffer.from(
    json.content,
    json.encoding === 'base64' ? 'base64' : 'utf-8'
  ).toString('utf-8')
  const data = JSON.parse(decoded) as ScorePayload
  cachedRemote = { data, ts: Date.now() }
  return data
}

export async function GET() {
  const remote = await readRemoteScores()
  if (remote?.results?.length) {
    return NextResponse.json({ scores: remote.results })
  }

  const local = await readLocalScores()
  if (local?.results?.length) {
    return NextResponse.json({ scores: local.results })
  }

  return NextResponse.json({ scores: [], error: 'Score report not found' }, { status: 200 })
}
