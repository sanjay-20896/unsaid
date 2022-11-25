import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import VideoContainer from './videoContainer'
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import Sanity from './../sanity';
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import imageUrlBuilder from "@sanity/image-url";
import Video from '../components/video';

export default function ArticleVideoSection(props) {
    let placeholderDesktopFullUrl=getImageUrl(props.data.video.placeholderDesktop,props.data.video.widthDesktop)
    let placeholderDesktopBlurUrl=getImageUrl(props.data.video.placeholderDesktop,20)
    let placeholderMobileFullUrl=getImageUrl(props.data.video.placeholderMobile,props.data.video.widthMobile)
    let placeholderMobileBlurUrl=getImageUrl(props.data.video.placeholderMobile,20)
    let idDesktop=props?.data?.video?.videoDesktop?.asset?._ref;
    let idMobile=props?.data?.video?.videoMobile?.asset?._ref;
    let videoDesktop;
    let videoMobile;
    if(idDesktop){
        videoDesktop=buildFileUrl(parseAssetId(idDesktop),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
    }
    if(idMobile){
        videoMobile=buildFileUrl(parseAssetId(idMobile),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
    }
    return (
        <>
            <div className={`video ${props.landScape?"landScapeLayout":""}`}>
                <div className="textFieldOne showForMobile font32 canelaThin">{props?.data?.textDataOne}</div> 
                <div className="landScapeVideo">
                   { <div className="videoWrapper">
                        {!!videoDesktop && <div className="hideForMobile">
                            <Video placeholderDesktopFullUrl={placeholderDesktopFullUrl} placeholderDesktopBlurUrl={placeholderDesktopBlurUrl} videoUrl={videoDesktop} playButtonPresent={props.data.video.playButtonPresent} controls={props.data.video.controls} autoplay={props.data.video.autoplay} muted={props.data.video.muted} loop={props.data.video.loop} width={props.data.video.widthDesktop} height={props.data.video.heightDesktop} />
                        </div>}
                       {!!videoMobile && <div className="showForMobile">
                            <Video placeholderMobileFullUrl={placeholderMobileFullUrl} placeholderMobileBlurUrl={placeholderMobileBlurUrl} videoUrl={videoMobile} playButtonPresent={props.data.video.playButtonPresent} controls={props.data.video.controls} autoplay={props.data.video.autoplay} muted={props.data.video.muted} loop={props.data.video.loop} width={props.data.video.widthDesktop} height={props.data.video.heightDesktop} restrictedHeightAndWidth={props.data.video.restrictedHeightAndWidth} /> 
                        </div>}
                    </div>}
                    <div className="rightTextSection">
                        <div className="textFieldOne hideForMobile font32 canelaThin">{props?.data?.textDataOne}</div>
                        <div className={`textFieldTwo canelaThin font16-notResponsive`}>{props?.data?.textDataTwo}</div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .video{
                    padding-left:35.3%;
                    padding-right:35.3%;
                }
                .landScapeLayout .landScapeVideo{
                    display:flex;
                } 
                .landScapeLayout .videoWrapper,
                .landScapeLayout .rightTextSection{
                    width:50%;
                }
                .landScapeLayout .videoWrapper{
                    padding-right:1.2rem;
                    margin-bottom:0rem;
                }
                .landScapeLayout .rightTextSection{
                    padding:3.7rem 11.1rem 0 12.3rem;
                }
                .video.landScapeLayout{
                    padding-left:6.4rem;
                    padding-right:6.4rem;
                }
                .videoWrapper{
                    margin-bottom:6.4rem;
                }
                .textFieldOne{
                    margin-bottom:3.2rem;
                }
                .landScapeLayout .textFieldOne{
                    margin-bottom:2.4rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .video{
                        padding-left:3.6rem;
                        padding-right:3.6rem;
                    }
                    .videoWrapper{
                        margin-bottom:3.2rem;
                    }
                    .video.landScapeLayout{
                        padding-left:0rem;
                        padding-right:0rem;
                    }
                    .landScapeLayout .landScapeVideo{
                        display:flex;
                        flex-direction: column-reverse;
                    } 
                    .landScapeLayout .rightTextSection{
                        padding:0;
                    }
                    .landScapeLayout .videoWrapper,
                    .landScapeLayout .rightTextSection{
                        width:100%;
                    }
                    .landScapeLayout .videoWrapper{
                        padding-right:0;
                    }
                    .landScapeLayout .textFieldOne, .landScapeLayout  .textFieldTwo{
                        padding:0 3.6rem;
                    }
                    .landScapeLayout  .textFieldTwo{
                        margin-bottom:4.8rem;
                    }
                }
            `}</style>   
        </>
    )
}
