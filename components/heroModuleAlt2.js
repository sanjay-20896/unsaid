import {useRef} from 'react'
import { MOBILE_BREAKPOINT } from '../config'
import { connect } from 'react-redux'
import {showMyUnsaidMenu,setLoggedIn} from '../redux/actions'
import {getImageUrl} from "../functions"
import Styles from '../styles/heroModuleAlt2.module.scss'
import LazyImage from './lazyImage'
import Link from 'next/link'
import Head from 'next/head'
function HeroModuleDynamic(props) {
    const imageContainerRef = useRef(null);
    let imageUrlDesktop = getImageUrl(props.heroImage.imageDesktop,2000)
    let imageUrlMobile = getImageUrl(props.heroImage.imageMobile,400)
    return (
        <>
        <Head>
            <link rel="preload" href={imageUrlMobile} as="image" media={`(max-width: ${MOBILE_BREAKPOINT}px)`} />
            <link rel="preload" href={imageUrlDesktop} as="image" media={`(min-width: ${MOBILE_BREAKPOINT+1}px)`} />
        </Head>
        <div className={Styles.container}>
            <div ref={imageContainerRef} className={`${Styles.videoContainer} homeBanner`}>
                    <div className="hideForMobile">
                        <Link href={props.heroImage.link}><a>
                            <LazyImage
                                alt="Product image"
                                originalSrc={imageUrlDesktop}
                                width={2000} 
                                height={854}
                                afterLoad={props.afterHeroLoad}
                            />
                        </a></Link>
                    </div>
                    <div className="showForMobile">
                        <Link href={props.heroImage.link}><a>
                            <LazyImage
                                alt="Product image"
                                originalSrc={imageUrlMobile}
                                width={400}
                                height={711}
                                // priority={true}
                            />
                        </a></Link>
                    </div>
                
            </div>
            <h2 className={`font32 ${Styles.heroText} canelaThin black alignCenter paddedContent`}>
                {props.desc}
            </h2>
        </div>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setLoggedIn,showMyUnsaidMenu})(HeroModuleDynamic)