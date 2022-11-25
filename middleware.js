import { NextResponse } from 'next/server';
import { setCookie, getCookies } from 'cookies-next';
const BLOCKED_COUNTRY = 'CN';
export function middleware(req) {
  // console.log("middleware req",req);
  const country = req.geo.country || 'US';
  // If the request is from the blocked country redirect
  if (country === BLOCKED_COUNTRY) {
    return NextResponse.redirect("https://comingsoon.unsaid.com");
  }
  // let locale = getCookies("NEXT_LOCALE");
  // console.log("middle locale",locale);
  // if (!!locale && !req.nextUrl.pathname.startsWith(`/${locale}`)) {
  //   console.log("middle locale inside",locale);
  //   const url = req.nextUrl.clone()
  //   url.pathname = `/${locale}` + url.pathname
  //   return NextResponse.rewrite(url)
  // }
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }

  if (req.nextUrl.locale === 'default') {
    const locale = req.cookies.get('NEXT_LOCALE') || 'en'

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    )
  }
  // Otherwise, continue
  return NextResponse.next();
}
export const config = {
    matcher: '/:path*',
}