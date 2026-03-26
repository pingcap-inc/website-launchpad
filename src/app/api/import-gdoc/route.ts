import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const docId = req.nextUrl.searchParams.get('docId')
  if (!docId) return NextResponse.json({ error: 'Missing docId' }, { status: 400 })

  try {
    const res = await fetch(`https://docs.google.com/document/d/${docId}/export?format=txt`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    })
    if (!res.ok) throw new Error('Failed to fetch')
    const text = await res.text()
    return NextResponse.json({ text })
  } catch {
    return NextResponse.json({ error: 'Could not fetch document' }, { status: 502 })
  }
}
