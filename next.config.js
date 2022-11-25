const nextTranslate = require('next-translate')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })

  module.exports = withBundleAnalyzer({
    images: {
        domains: ['cdn.sanity.io','unsaid.centraqa.com','unsaid.centracdn.net','unsaid-dev.centraqa.com'],
        deviceSizes: [400, 640, 750, 828, 900, 1080, 1200, 1920, 2048, 3840],
    },
    swcMinify:true,
    ...nextTranslate(),
    async rewrites() {
      return [
        // {
        //   source: '/with-locale', // automatically handles all locales
        //   destination: '/another', // automatically passes the locale on
        // },
        // {
        //   // does not handle locales automatically since locale: false is set
        //   source: '/nl/with-locale-manual',
        //   destination: '/nl/another',
        //   locale: false,
        // },
        // {
        //   // this matches '/' since `en` is the defaultLocale
        //   source: '/en',
        //   destination: '/en/another',
        //   locale: false,
        // },
        {
          // it's possible to match all locales even when locale: false is set
          source: '/:locale/:path*',
          destination: '/:path*',
          locale: false,
        },
        // {
        //   // this gets converted to /(en|fr|de)/(.*) so will not match the top-level
        //   // `/` or `/fr` routes like /:path* would
        //   source: '/(.*)',
        //   destination: '/another',
        // },
      ]
    },
})