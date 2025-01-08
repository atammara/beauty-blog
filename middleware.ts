import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/' || path === '/signup' || path === '/login'

  const token = request.cookies.get('authToken')?.value || ''

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/signup',
    '/login',
    '/articles',
    '/beauty-tips',
    '/about',
    '/contact',
    '/profile',
    '/favorites',
  ],
}

