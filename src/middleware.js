import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // ✅ Read session cookie
  const sessionToken =
    request.cookies.get('__Secure-next-auth.session-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value

  // ✅ Define protected routes
  const protectedRoutes = ['/upload', '/ai']

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  // 🔒 Redirect ONLY if accessing protected route while logged out
  if (isProtected && !sessionToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ✅ Let everything else through
  return NextResponse.next()
}

export const config = {
  matcher: ['/upload/:path*', '/ai/:path*'],
}
