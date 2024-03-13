import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LANDING_PATH } from './config/site'
import { splitLocaleAndPath, getLocaleRequest } from './app/_utils/locale'

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    // '/((?!api/*|_next/static|_next/image|icon/*|favicon.ico|image/*|sw|worker|peach-service-worker|workbox|__nextjs_original-stack-frame).*)',
    // `/dsi/api/:path*`,
    // `/acf/api/:path*`,
    // "/((?!api|_next/static|favicon.ico).*)",
    // "/code/:path*",
    // "/signin",
    "/doc/:path*",
    "/artifacts/:path*",
    "/home",
    "/about",
    "/game/:path*",
    "/projects/:path*",
    "/",
  ],
}
const IGNORE_PATHS = ['icon/', 'sitemap.xml', 'robots.txt', 'favicon.ico', 'svg', 'manifest', 'sw.js', 'worker.js', 'peach-service-worker.js', 'workbox',]

export async function middleware(request: NextRequest, response: NextResponse) {
  if (IGNORE_PATHS.some((p) => request.nextUrl.pathname.includes(p))) {
    return NextResponse.next()
  }
  let nextP = request.nextUrl.pathname
  let { locale, path: onlyPath } = await splitLocaleAndPath(nextP)

  if (onlyPath === '/' || onlyPath === '') {
    onlyPath = LANDING_PATH
  }

  if (onlyPath.includes('/api')) {
    locale = undefined
  } else if (!locale) {
    locale = getLocaleRequest(request)
  }
  // console.log({ onlyPath, locale, nextP })

  const join = (p: string, l?: string) => {
    if (!l) return new URL(p, request.url)
    return new URL(`/${l}${p.startsWith('/') ? '' : '/'}${p}`, request.url)
  }

  const nextUrl = join(onlyPath, locale)
  if (nextUrl.pathname === nextP) {
    return NextResponse.next()
  }
  // console.log(`go redirect from ${nextP} to ${nextUrl.pathname}`)
  return NextResponse.redirect(nextUrl, { status: 301 })
}
