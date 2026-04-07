import { NextResponse } from 'next/server'

function extractDocId(url: string) {
  const match = url.match(/\/document\/d\/([a-zA-Z0-9-_]+)/)
  return match?.[1] ?? null
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { url?: string }
    const url = body.url?.trim()
    if (!url) {
      return NextResponse.json({ error: 'Missing Google Doc URL.' }, { status: 400 })
    }

    const docId = extractDocId(url)
    if (!docId) {
      return NextResponse.json({ error: 'Invalid Google Doc URL.' }, { status: 400 })
    }

    const exportUrl = `https://docs.google.com/document/d/${docId}/export?format=txt`
    const res = await fetch(exportUrl)
    if (!res.ok) {
      return NextResponse.json(
        {
          error:
            'Unable to fetch the Google Doc. Make sure it is shared and accessible. Doc 必须设置为 “Anyone with the link can view”（共享 → 改为任何人可查看）。',
        },
        { status: 400 }
      )
    }

    const content = await res.text()
    if (!content.trim()) {
      return NextResponse.json(
        { error: 'The Google Doc is empty or not accessible.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ content })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Import failed.' },
      { status: 500 }
    )
  }
}
