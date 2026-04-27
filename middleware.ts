import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = request.cookies.get('NEXT_LOCALE')?.value ?? 'de'
  const pathnameHasLocale = ['/de', '/en', '/es'].some(
    (localePath) => pathname.startsWith(`${localePath}/`) || pathname === localePath
  )
 
  if (pathnameHasLocale) return
 
  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /de/products
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}