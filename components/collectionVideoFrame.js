import Video from "./video";
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import {MOBILE_BREAKPOINT} from '../config'
import Sanity from '../sanity'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import imageUrlBuilder from "@sanity/image-url";
import LazyImage from "./lazyImage";
import {getImageUrl} from "./../functions"
import useDevice from '../hooks/useDevice'
function collectionVideoFrame(props){
    
    let placeholderDesktopBlurUrl =getImageUrl(props?.video?.placeholderDesktop,20)
    let placeholderDesktopFullUrl = getImageUrl(props?.video?.placeholderDesktop,1749)
    let placeholderMobileBlurUrl = getImageUrl(props?.video?.placeholderMobile,20)
    let placeholderMobileFullUrl =  getImageUrl(props?.video?.placeholderMobile,500)
    let idDesktop = props?.video?.videoDesktop?.asset?._ref
    let idMobile = props?.video?.videoMobile?.asset?._ref
    let videoDesktopUrl = null
    let videoMobileUrl = null
    if(idDesktop)
        videoDesktopUrl=buildFileUrl(parseAssetId(idDesktop),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
    if(idMobile)
        videoMobileUrl=buildFileUrl(parseAssetId(idMobile),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
    const {deviceName} = useDevice()
    // console.log("deivce name",deviceName,!!deviceName)
    return(
        <>
        <div className="container">
            <div className="mainHeading alignCenter font48 canelaThin">{props.collectionHeading}</div>
            {props.bannerType=="video" &&!!videoDesktopUrl && !!videoMobileUrl &&
                <div className="videoContainer">
                    {deviceName!="mobile" &&
                        <Video placeholderDesktopFullUrl={placeholderDesktopFullUrl} placeholderDesktopBlurUrl={placeholderDesktopBlurUrl} videoUrl={videoDesktopUrl} playButtonPresent={props.video?.playButtonPresent} controls={props.video?.controls} autoplay={props.video?.autoplay} muted={props.video?.muted} loop={props.video?.loop} width={props.video?.widthDesktop} height={props.video?.heightDesktop} showMuteButton={props?.video?.showMuteButton} invisibleUntilDeviceSet={true} deviceName={deviceName}/>
                    }
                    {deviceName=="mobile" &&
                        <Video placeholderMobileFullUrl={placeholderMobileFullUrl} placeholderMobileBlurUrl={placeholderMobileBlurUrl} videoUrl={videoMobileUrl} playButtonPresent={props.video?.playButtonPresent} controls={props.video?.controls} autoplay={props.video?.autoplay} muted={props.video?.muted} loop={props.video?.loop} width={props.video?.widthMobile} height={props.video?.heightMobile} showMuteButton={props?.video?.showMuteButton} invisibleUntilDeviceSet={true} deviceName={deviceName}/>
                    }
                </div>
            }
            {props.bannerType=="image" && 
                <div className="imageContainer">
                    <div className="hideForMobile">    
                        <LazyImage
                            alt="Image"
                            originalSrc={!!props?.desktopImage?props.desktopImage:null}
                            placeholderSrc={!!props?.desktopPlaceholderImage?props.desktopPlaceholderImage:null}
                            width={props?.desktopWidth}
                            height={props?.desktopHeight}
                        />
                    </div>
                    <div className="showForMobile">
                        <LazyImage
                            alt="Image"
                            originalSrc={!!props?.mobileImage?props.mobileImage:null}
                            placeholderSrc={!!props?.mobilePlaceholderImage?props.mobilePlaceholderImage:null}
                            width={props?.mobileWidth}
                            height={props?.mobileHeight}
                        />
                    </div>
                </div>
            }
        </div>
        <style jsx>{`
        .container{
            padding-top:14.4rem;
        }
        .mainHeading{
            margin-bottom:6.4rem;
        }
        @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
            .mainHeading{
                margin-bottom:4.8rem;
                font-size: 2.4rem;
                line-height: 3.2rem;
            }
            .container{
                padding-top:10.4rem;
            }

        }
        `}</style>
        </>
    )
}


export default collectionVideoFrame;