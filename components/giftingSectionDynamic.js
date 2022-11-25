import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {MOBILE_BREAKPOINT} from '../config'
import { connect } from 'react-redux'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import imageUrlBuilder from "@sanity/image-url";
import Sanity from './../sanity';
import cssVariables from '../data/cssVariables'
import GiftingTopText from './giftingTopText'
import LazyImage from './lazyImage'
import Video from './video'
let springConfig={
    duration: "0.9s",
    easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
    delay: "0s",
}
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import {getImageUrl} from "../functions"
function GiftingSection(props) {
    const [index, setIndex] = useState(0)
    const [indexMobile, setIndexMobile] = useState(0)
    const [textChangeTransition,setTextChangeTransition] = useState("")
    const [textIndex,setTextIndex] = useState(0)
    const [autoplay,setAutoplay] = useState(true)
    const [device,setDevice] = useState(null)
    let autoPlayTimer
    let handleChangeIndex = index => {
        setIndex(index)
        setIndexMobile(index)
        setTextChangeTransition("out")
        setTimeout(()=>{
            setTextChangeTransition("in")
            setTextIndex(index)
        },450)
    }
    function textItemClick(slideIndex){
        clearTimeout(autoPlayTimer)
        setAutoplay(false)
        setIndex(slideIndex);
    }
    useEffect(()=>{
        if(autoplay){
            autoPlayTimer = setTimeout(()=>{
                if(index>=0 && index<3){
                    setIndex(index+1)    
                }
                if(index===3){
                    setIndex(0)
                }
            },4000)
        }
    },[index]) 
    useEffect(()=>{
        let windowWidth = props.common.windowWidth?props.common.windowWidth:window.innerWidth
        if(windowWidth<=MOBILE_BREAKPOINT)
            setDevice("mobile")
        else 
            setDevice("desktop")
        
    },[props.common.windowWidth])
    return (
       <>
        <div className={`giftingSection container positionRelative`}>
            {device=="desktop" &&
                <div className="hideForMobile">
                    {!!props.heading && <div className="heading anoHalfRegular paddedContent font20">{props.heading}</div>}
                    <div className="animationComplete paddedContent positionRelative onlyImageSlider">
                        <SwipeableViews index={index} onChangeIndex={handleChangeIndex} springConfig={springConfig}>
                            {Array.isArray(props.data) && props.data.map((slide,slideIndex)=>{  
                                let placeholderDesktopBlurUrl = slide?.video?.placeholderDesktop?urlFor(slide?.video?.placeholderDesktop).width(20).quality(100).format("webp").url():null
                                let placeholderDesktopFullUrl = slide?.video?.placeholderDesktop?urlFor(slide?.video?.placeholderDesktop).width(1749).quality(100).format("webp").url():null
                                let id;
                                let videoUrl;
                                id=slide?.video?.videoDesktop?.asset?._ref;
                                // console.log("videoId*********",id)
                                if(id){
                                    videoUrl=buildFileUrl(parseAssetId(id),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
                                }
                                return (
                                    <div key={`desktop_image_slide_${slideIndex}`} >
                                        {!!slide.imageDesktop?
                                                <LazyImage 
                                                    alt={slide.heading} 
                                                    originalSrc={urlFor(slide.imageDesktop).width(1749).quality(100).format("webp").url()} 
                                                    width={1749} 
                                                    height={750} 
                                                />
                                        :
                                        <>
                                            { !!slide?.video &&  <Video placeholderDesktopFullUrl={placeholderDesktopFullUrl} placeholderDesktopBlurUrl={placeholderDesktopBlurUrl} videoUrl={videoUrl} playButtonPresent={slide?.video?.playButtonPresent} controls={slide?.video?.controls} autoplay={slide?.video?.autoplay} muted={slide?.video?.muted} loop={slide?.video?.loop} width={slide?.video?.widthDesktop} height={slide?.video?.heightDesktop} videoPause={index!=slideIndex} showMuteButton={slide?.video?.showMuteButton}/>}
                                        </>                                 
                                        }
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                        <div className="lineAnimation">
                            { Array.isArray(props.data) && props.data.map((data,id)=>{
                                return(
                                    <div key={`lineAnimation_${id}`} className={`line ${index===id?"active":""}`}></div>
                                )
                            })}
                        </div>
                    </div>  
                    <div className="textContent">
                        <GiftingTopText data={props.data} heading={props.heading} currentSlideIndex={index} itemClick={(slideIndex)=>textItemClick(slideIndex)} alreadyUnlocked={true}/>
                    </div>                  
                </div> 
            }
            {device=="mobile" &&
                <div className="giftingMobileContainer showForMobile">
                    {!!props.heading && <div className="heading paddedContent anoHalfRegular">{props.heading}</div>}
                    <div className="unlockSection">
                        <div className="sliderModifyMobile">
                            <SwipeableViews style={{padding:"0 9.5rem 0 2rem"}} slideStyle={{padding:"0 0rem 0 0"}} index={indexMobile} onChangeIndex={handleChangeIndex} springConfig={springConfig}>
                                {Array.isArray(props.data) && props.data.map((slide,slideIndex)=>{
                                    // console.log("banner type",slide.bannerType)
                                    let placeholderMobileFullUrl = slide?.video?.placeholderMobile?urlFor(slide?.video?.placeholderMobile).width(300).quality(50).format("webp").url():null
                                    let placeholderMobileBlurUrl = slide?.video?.placeholderMobile?urlFor(slide?.video?.placeholderMobile).width(20).quality(50).format("webp").url():null
                                    let id,videoUrl;
                                    id=slide?.video?.videoMobile?.asset?._ref;
                                    if(id){
                                        videoUrl=buildFileUrl(parseAssetId(id),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
                                    }
                                    return (
                                        <div key={`mobile_slide_${slideIndex}`}>
                                            {slide.bannerType==="image" ?
                                            <div className="imgContainerMobile">
                                                <LazyImage 
                                                    alt={slide?.heading} 
                                                    originalSrc={urlFor(slide.imageMobile).width(300).quality(100).format("webp").url()} 
                                                    placeholderSrc={urlFor(slide.imageMobile).width(20).quality(100).format("webp").url()}
                                                    width={300} 
                                                    height={531} 
                                                />
                                                {/* <div className="imgMobile" style={{backgroundImage:`url(${urlFor(slide.imageMobile).url(500)})`}}></div> */}
                                            </div>:
                                            <>
                                            <div className="imgContainerMobile">
                                                <Video placeholderMobileFullUrl={placeholderMobileFullUrl} placeholderMobileBlurUrl={placeholderMobileBlurUrl} videoUrl={videoUrl} playButtonPresent={slide?.video?.playButtonPresent} controls={slide?.video?.controls} autoplay={slide?.video?.autoplay} muted={slide?.video?.muted} loop={slide?.video?.loop} width={slide?.video?.widthMobile} height={slide?.video?.heightMobile} restrictedHeightAndWidth={slide?.video?.restrictedHeightAndWidth} videoPause={indexMobile!=slideIndex} showMuteButton={slide?.video?.showMuteButton} />
                                            </div>
                                            </>}
                                        </div>
                                    )
                                })}
                            </SwipeableViews>
                        </div>
                        <div className={`currentSlideText ${textChangeTransition}`}>
                            <div className="itemHeading one canelaThin font24-notResponsive">{props.data[textIndex]?.heading}</div>
                            <div className="itemDesc one anoHalfRegular font16-notResponsive">{props.data[textIndex]?.description}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
        <style jsx>{`
            .videoContainerDesktop{
                padding-top:42.91%;
                overflow:hidden;
            }
            .heading{
                margin-bottom: 1.6rem;
            }
            .onlyImageSlider{
                margin-bottom: 3.2rem;
            }
            .videoContainerDesktop video{
                position:absolute;
                width:100%;
                height:100%;
                left:0;
                top:0;
            }
            .playButton{
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
            }
            .lineAnimation.hide{
                display:none;
            }
            .lineAnimation{
                position:absolute;
                left:50%;
                transform:translateX(-50%);
                bottom:4.8rem;
                display:flex;
            }
            .line{
                height: 0.4rem;
                width: 8rem;
                background: #ffffff17;
                margin-right:1.6rem;
                position:relative;
            }
            .line:last-child{
                margin-right:0rem;
            }
            .line::after{
                position:absolute;
                content:"";
                top:0;
                left:0;
                height:100%;
                width:0%;
                background: #FFFFFF;
                transition:all 0s linear;
            }
            .line.active::after{
                width:100%;
                transition:all 3s linear;
            }
            .container.fadeIn{
                transform: translateY(0);
            }
            .container.unlock{
                transform: translateY(0);
            }
            .animationComplete{
                //width: calc(100% - 1.03rem);
                //margin-left: 0.515rem;
            }
            .lazyloadSwiperImages{
                height:0;
                width:0;
                overflow:hidden;
            }
            .lockedImageDesktop{
                background-image:url(/images/gift1.jpg);
                background-size:cover;
                background-position:center center;
            }
            .itemHeading{
                margin-bottom:2.4rem;
            }
            .giftingSection.unlock{
                height:auto !important;
            }
            .textContent{
                margin-bottom:3.2rem;
            }
            .textOnImg{
                width:47%;
                display:none;
                z-index:2;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition:all 0.3s ease-out;
            }
            .fadeIn .textOnImg{
                display:block;
            }
            .unlock .textOnImg{
                transform:translate(-50%, -55%);
                opacity:0;
                pointer-events:none;
            }
            .imgContainer{
                margin:0 auto;
                text-align:center;
                width:100%;
                // height:100%;
                overflow:hidden;
                top:0;
                left:50%;
                transform:translateX(-50%);
                transition:all 0.5s ease-out 0.4s;
            }
            .unlock .imgContainer{
                width:calc(100% - 12.8rem);
                top:24.3rem;
                left:50%;
                transform:translateX(-50%);
            }
            
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .videoContainer{
                    margin-bottom:2.4rem;
                    padding-right:1.6rem;
                }
                .unlockSection{
                    //padding-left:${cssVariables.paddingLeftMobile};
                }
                .currentSlideText{
                    padding-left:${cssVariables.paddingLeftMobile};
                    padding-right:${cssVariables.paddingRightMobile};
                    opacity:1;
                }
                .currentSlideText.out{
                    transition:all 0.45s cubic-bezier(0.1, 0.35, 0.2, 1);
                    opacity:0;
                    transform:translateY(1.5rem)
                }
                .currentSlideText.in{
                    transition:all 0.45s cubic-bezier(0.1, 0.35, 0.2, 1);
                    opacity:1;
                    transform:translateY(0)
                }
                .itemHeading{
                    margin-bottom:1.6rem;
                }
                .heading{
                    font-size:1.4rem;
                }
                .textOnImg{
                    width:calc(100% - 6.4rem);
                }
                .lockedImageMobile{
                    position:absolute;
                    width:100%;
                    top:0;
                    left:0;
                    transition:all 0.5s ease-out 0.4s;
                    background-image:url(/images/giftingHeroMobile.jpg);
                    background-size:cover;
                    background-position:center center;
                }
                .unlock .lockedImageMobile{
                    top: 5.1rem;
                    left: 3.6rem;
                    height: 43.4rem !important;
                    width: 82%;
                }
                .mainImg{
                    height:100%;
                    object-fit:cover;
                }
                .imgContainerMobile{
                    margin-bottom:2.4rem;
                    padding-right:1.6rem;
                }
                .imgMobile{
                    width:100%;
                    height:43.3rem;
                    background-size:cover;
                    background-position:center center;
                }
                .imgContainerOne:last-child{
                    //padding-right:0rem;
                }
                .imgContainerFour{
                    //padding-right:0rem;
                }
                @keyframes displayNone1{
                    from{
                        opacity:1;
                    }
                    to{
                        opacity:0;
                        pointer-events:none;
                    }
                }                
            }
 
        `}</style>
       </>
    )
}

function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(GiftingSection)