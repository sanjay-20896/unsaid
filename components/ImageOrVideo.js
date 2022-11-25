import React from 'react'
import useDevice from '../hooks/useDevice'
import LazyImage from "./lazyImage"
import {getImageUrl} from "../functions"
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import Video from '../components/video';
import PlaceHolder from './PlaceHolder'
export default function ImageOrVideo({data,fullBleed,fullBleedMobile}) {
    // console.log("data",data);
    let {deviceName} = useDevice();
    // let placeholderDesktopFullUrl=getImageUrl(data?.video?.placeholderDesktop,data.video.widthDesktop)
    // let placeholderDesktopBlurUrl=getImageUrl(data?.video?.placeholderDesktop,20)
    // let placeholderMobileFullUrl=getImageUrl(data?.video?.placeholderMobile,data.video.widthDesktop)
    // let placeholderMobileBlurUrl=getImageUrl(data?.video?.placeholderMobile,20)
    let idDesktop=data?.video?.videoDesktop?.asset?._ref;
    // console.log(idDesktop)
    let idMobile=data?.video?.videoMobile?.asset?._ref;
    // console.log(idMobile)
    let videoDesktop,videoMobile;
    // console.log( SANITY_DATASET)
    if(idDesktop){
        videoDesktop=buildFileUrl(parseAssetId(idDesktop),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
    }
    if(idMobile){
        videoMobile=buildFileUrl(parseAssetId(idMobile),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
    }
    if(!!data?.mediaType) data.craftsmanshipMediaType=data.mediaType
    return (
        <>
            {!!deviceName ? 
                <div className="imageOrVideo">
                    {data?.craftsmanshipMediaType == "image" ?
                        <div className="image">
                            {deviceName!="mobile" ?
                                <div className={`${fullBleed?"":"paddedContent"} hideForMobile`}>
                                    <LazyImage 
                                        alt={"Craftsmanship"}
                                        originalSrc={getImageUrl(data.imageDesktop)}
                                        // placeholderSrc={props.data.desktopBlurUrl}
                                        width={!!data.widthDesktop ? data.widthDesktop : 1312}
                                        height={!!data.heightDesktop ? data.heightDesktop : 560} 
                                    />
                                </div>
                                :
                                <div className={`${fullBleedMobile?"":"paddedContent"} showForMobile`}>
                                    <LazyImage 
                                        alt={"Craftsmanship"}
                                        originalSrc={getImageUrl(data.imageMobile)}
                                        // placeholderSrc={props.data.desktopBlurUrl}
                                        width={!!data.widthMobile ? data.widthMobile : 375}
                                        height={!!data.heightMobile ? data.heightMobile : 558}
                                    />
                                </div>
                            }
                        </div>
                        :
                        <div className="video">
                            {deviceName!="mobile" ?
                                <div className={`${fullBleed?"":"paddedContent"}`}>
                                    <Video  videoUrl={videoDesktop} playButtonPresent={data?.video?.playButtonPresent} controls={data?.video?.controls} autoplay={data?.video?.autoplay} muted={data?.video?.muted} loop={data?.video?.loop} width={data.video?.widthDesktop} height={data?.video?.heightDesktop} showMuteButton={data?.video?.showMuteButton}/>
                                </div>
                                :
                                <div className={`${fullBleedMobile?"":"paddedContent"}`}>
                                    <Video  videoUrl={videoMobile} playButtonPresent={data?.video?.playButtonPresent} controls={data?.video?.controls} autoplay={data?.video?.autoplay} muted={data?.video?.muted} loop={data?.video?.loop} width={data.video?.widthMobile} height={data?.video?.heightMobile} showMuteButton={data?.video?.showMuteButton}/>
                                </div>
                            }
                        </div>
                    }
                </div>
                :
                <>
                    <div className={`${fullBleed?"":"paddedContent"} placeholder hideForMobile`}>
                        <PlaceHolder height={!!data.heightDesktop ? data.heightDesktop : 560} width={!!data.widthDesktop ? data.widthDesktop : 1312}/>
                    </div>
                    <div  className={`${fullBleedMobile?"":"paddedContent"} placeholder showForMobile`}>
                        <PlaceHolder height={!!data.heightMobile ? data.heightMobile : 558} width={!!data.widthMobile ? data.widthMobile : 375}/>
                    </div>
                </>
            }
        </>
    )
}
