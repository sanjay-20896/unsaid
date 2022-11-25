import { NextResponse } from 'next/server';
import i18nlocales from "./../i18n.json"
const BLOCKED_COUNTRY = 'CN';
const PUBLIC_FILE = /\.(.*)$/
export function middleware(req) {
    let browserLang = req?.headers?.get('accept-language').split(",")[0].split("-")[0];
    let allLocales = i18nlocales.locales;
    const country = req.geo.country || 'US';
    const reqLocale = req.cookies.NEXT_LOCALE || browserLang;
    let localeExist = allLocales.find(locale=>locale===reqLocale);
    
    if (country === BLOCKED_COUNTRY) {
        return NextResponse.redirect("https://comingsoon.unsaid.com");
    }
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return
    }
    // console.log("localeExist",localeExist);
    // console.log("req.nextUrl.locale",req.nextUrl.locale);
    if(!!localeExist && localeExist!=req.nextUrl.locale){
        // console.log("reqLocale",reqLocale);
        return NextResponse.redirect(
            new URL(`/${reqLocale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        )
    }
    return NextResponse.next();
}
export const config = {
    matcher: '/:path*',
}