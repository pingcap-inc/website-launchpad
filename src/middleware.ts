import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
}

export function middleware(_req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}
