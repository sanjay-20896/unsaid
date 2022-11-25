import '../styles/global.scss'
import "../styles/slick.css"
import "../styles/slick-theme.css"
import { wrapper }  from '../redux/store'
import Script from 'next/script'
import Head from 'next/head'
import {GTM_CONTAINER_ID} from '../branch-specific-config'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script strategy="lazyOnload" src="https://assets.calendly.com/assets/external/widget.js" async />
      <Script strategy="lazyOnload" dangerouslySetInnerHTML={{__html:`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`}} async />
      <Head>
          <meta name="facebook-domain-verification" content="6ac0yzx67lrv010i59x5aq9fuvp7ug" /> 
          <link rel="preload" href="/fonts/Canela-Thin.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/AnoRegular-Regular.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/fonts/AnoHalf-Regular.otf" as="font" crossOrigin="anonymous" />
          <link rel="preload" href="/images/mobileLogoDark.svg" as="image" crossOrigin="anonymous" />
          <link rel="preload" href="/images/logoDarkSmall.png" as="image" crossOrigin="anonymous" />
          <noscript dangerouslySetInnerHTML={{__html:`<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />`}} />
          <script dangerouslySetInnerHTML={{__html:`
                  window.dataLayer = window.dataLayer || [];
          `}}> 
          </script>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
export default wrapper.withRedux(MyApp)