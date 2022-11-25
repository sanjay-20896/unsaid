import { MOBILE_BREAKPOINT } from "../config";
import Video from  './video'
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import Sanity from '../sanity';
import LazyImage from "./lazyImage"
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import BlockContent from '@sanity/block-content-to-react'
import {getImageUrl} from "../functions"
function Heading(props){
    // console.log("videoProps",props.data)
    let placeholderDesktopBlurUrl = props.data?.video?.placeholderDesktop?urlFor(props.data?.video?.placeholderDesktop).width(20).quality(100).url():null
    let placeholderDesktopFullUrl = props.data?.video?.placeholderDesktop?urlFor(props.data?.video?.placeholderDesktop).width(1749).quality(100).url():null
    let placeholderMobileBlurUrl = props.data?.video?.placeholderMobile?urlFor(props.data?.video?.placeholderMobile).width(20).quality(100).url():null
    let placeholderMobileFullUrl = props.data?.video?.placeholderMobile?urlFor(props.data?.video?.placeholderMobile).width(1749).quality(100).url():null
    let idDesktop = props.data?.video?.videoDesktop?.asset?._ref
    let idMobile = props.data?.video?.videoMobile?.asset?._ref
    let videoDesktopUrl = null
    let videoMobileUrl = null
    if(idDesktop)
        videoDesktopUrl=buildFileUrl(parseAssetId(idDesktop),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
    if(idMobile)
        videoMobileUrl=buildFileUrl(parseAssetId(idMobile),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
        // console.log(videoMobileUrl)
    //  console.log("show mute button",props?.data?.video?.showMuteButton)
    return(
        <>
        <div className="">
             <div className="title anoRegular alignCenter font20">{props.data.title}</div>
             {/* {!!props?.data?.description && <div className="description font40  alignCenter canelaThin">{props.data.description}</div>} */}
             {!!props.data?.mainHeading ? 
                <div className="description font40  alignCenter canelaThin">{props.data.mainHeading}</div>
                :
                <>
                    {!!props?.data?.description && <div className="description font40  alignCenter canelaThin">{props.data.description}</div>}
                </>
             }
            <div className="hideForMobile">
                {props?.data?.articleBannerType==="image" && props.data.desktopImageUrl   ?
                <div className="">
                    <LazyImage 
                        alt={props.data.title}
                        originalSrc={props.data.desktopImageUrl} 
                        placeholderSrc={props.data.desktopBlurUrl}
                        width={2624} 
                        height={1476} 
                    />
                </div>
                :
                <div className="">
                    {<Video placeholderDesktopFullUrl={placeholderDesktopFullUrl} placeholderDesktopBlurUrl={placeholderDesktopBlurUrl} videoUrl={videoDesktopUrl} playButtonPresent={props?.data?.video?.playButtonPresent} controls={props?.data?.video?.controls} autoplay={props?.data?.video?.autoplay} muted={props?.data?.video?.muted} loop={props?.data?.video?.loop} width={props.data.video?.widthDesktop} height={props.data.video?.heightDesktop} showMuteButton={props?.data?.video?.showMuteButton}/>}
                </div>}
            </div>
            <div className="showForMobile">
                {props?.data?.articleBannerType==="image"  && props.data.mobileImageUrl?
                    <LazyImage 
                        alt={props.data.title}
                        originalSrc={props.data.mobileImageUrl} 
                        placeholderSrc={props.data.mobileBlurUrl}
                        width={606} 
                        height={1076} 
                    />
                :
                    <div className="">
                        {<Video placeholderMobileFullUrl={placeholderMobileFullUrl} placeholderMobileBlurUrl={placeholderMobileBlurUrl} videoUrl={videoMobileUrl} playButtonPresent={props.data.video?.playButtonPresent} controls={props.data.video?.controls} autoplay={props?.data?.video?.autoplay} muted={props?.data?.video?.muted} loop={props?.data?.video?.loop} width={props?.data?.video?.widthMobile} height={props.data.video?.heightMobile} showMuteButton={props?.data?.video?.showMuteButton}/>}
                    </div>
                }
            </div>
        </div>
        <style jsx>{`
            .description{
                padding: 0 27.5%;
                margin-bottom:8rem;
            }
            .title{
                margin-bottom:2rem;
            }
            @media screen and  (max-width:${MOBILE_BREAKPOINT}px){
                .title{
                    margin-bottom:2.4rem;
                    font-size:1.6rem;
                }
                .description{
                    padding: 0 0rem;
                    margin-bottom:4.8rem;
                }
            }
        `}
        </style>
        <style jsx global>{`
            @media screen and  (max-width:${MOBILE_BREAKPOINT}px){
                .description div p{
                    display: inline;
                }
            }
        `}</style>
        </>
    )
}
export default Heading;