import { NextResponse } from 'next/server'

export interface BuildItem {
  id: string
  state: 'BUILDING' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'ERROR' | 'CANCELED'
  status: 'building' | 'ready' | 'error' | 'unknown'
  url: string | null
  branch: string | null
  commitMessage: string | null
  createdAt: string
  elapsed: number | null
}

/**
 * GET /api/builds
 * Returns the last 10 Vercel deployments.
 * Requires: VERCEL_TOKEN + VERCEL_PROJECT_ID (+ optional VERCEL_TEAM_ID)
 */
export async function GET() {
  const { VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_ID } = process.env

  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    return NextResponse.json({
      builds: [],
      error: 'VERCEL_TOKEN or VERCEL_PROJECT_ID not configured',
    })
  }

  const params = new URLSearchParams({ projectId: VERCEL_PROJECT_ID, limit: '10' })
  if (VERCEL_TEAM_ID) params.set('teamId', VERCEL_TEAM_ID)

  const res = await fetch(`https://api.vercel.com/v6/deployments?${params}`, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return NextResponse.json({ builds: [], error: 'Failed to fetch Vercel deployments' })
  }

  const data = (await res.json()) as {
    deployments: {
      uid: string
      state: BuildItem['state']
      url: string
      meta?: { githubCommitRef?: string; githubCommitMessage?: string }
      createdAt: number
      ready?: number
    }[]
  }

  const builds: BuildItem[] = (data.deployments ?? []).map((d) => {
    let status: BuildItem['status'] = 'unknown'
    if (['BUILDING', 'INITIALIZING', 'QUEUED'].includes(d.state)) status = 'building'
    else if (d.state === 'READY') status = 'ready'
    else if (['ERROR', 'CANCELED'].includes(d.state)) status = 'error'

    const createdMs = d.createdAt
    const readyMs = d.ready ?? null
    const elapsed = readyMs ? Math.round((readyMs - createdMs) / 1000) : null

    return {
      id: d.uid,
      state: d.state,
      status,
      url: d.url ? `https://${d.url}` : null,
      branch: d.meta?.githubCommitRef ?? null,
      commitMessage: d.meta?.githubCommitMessage ?? null,
      createdAt: new Date(createdMs).toISOString(),
      elapsed,
    }
  })

  return NextResponse.json({ builds })
}
