import { NextResponse } from 'next/server'

type VercelState = 'BUILDING' | 'INITIALIZING' | 'QUEUED' | 'READY' | 'ERROR' | 'CANCELED'

interface VercelDeployment {
  uid: string
  url: string
  state: VercelState
  createdAt: number
}

interface VercelDeploymentsResponse {
  deployments: VercelDeployment[]
}

const STATE_MAP: Record<string, 'building' | 'ready' | 'error'> = {
  BUILDING: 'building',
  INITIALIZING: 'building',
  QUEUED: 'building',
  READY: 'ready',
  ERROR: 'error',
  CANCELED: 'error',
}

export async function GET() {
  const { VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_TEAM_ID } = process.env

  if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) {
    return NextResponse.json({ status: 'unknown' })
  }

  const params = new URLSearchParams({ projectId: VERCEL_PROJECT_ID, limit: '1' })
  if (VERCEL_TEAM_ID) params.set('teamId', VERCEL_TEAM_ID)

  const res = await fetch(`https://api.vercel.com/v6/deployments?${params}`, {
    headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
  })

  if (!res.ok) {
    return NextResponse.json({ status: 'unknown' })
  }

  const data = (await res.json()) as VercelDeploymentsResponse
  const deployment = data.deployments?.[0]

  if (!deployment) {
    return NextResponse.json({ status: 'unknown' })
  }

  return NextResponse.json({
    status: STATE_MAP[deployment.state] ?? 'building',
    url: `https://${deployment.url}`,
    createdAt: deployment.createdAt,
    elapsed: Date.now() - deployment.createdAt,
  })
}
