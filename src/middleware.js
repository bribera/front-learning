import { NextResponse } from 'next/server'

// Routes qui nécessitent d'être connecté
const PROTECTED = ['/checkout', '/profile', '/dashboard', '/courses']

// Routes accessibles uniquement si NON connecté
const AUTH_ONLY = ['/login', '/register']

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Redirige vers /login si non connecté sur route protégée
  if (PROTECTED.some(r => pathname.startsWith(r)) && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname) // pour rediriger après login
    return NextResponse.redirect(url)
  }

  // Redirige vers / si déjà connecté et tente login/register
  if (AUTH_ONLY.some(r => pathname.startsWith(r)) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/profile/:path*',
    '/dashboard/:path*',
    '/my-courses/:path*',
    '/login',
    '/register',
  ],
}