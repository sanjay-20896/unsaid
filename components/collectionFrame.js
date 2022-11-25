import React, { useState,useEffect } from 'react'
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import {paddingLeftDesktop,paddingLeftDesktopNumber,paddingRightDesktop, paddingRightDesktopNumber, paddingLeftMedium, paddingRightMedium, paddingLeftMediumNumber, paddingRightMediumNumber, paddingLeftMobile, paddingLeftMobileNumber, paddingRightMobile,paddingRightMobileNumber,paddingLeftTabletLandscape,paddingRightTabletLandscape,paddingLeftTabletLandscapeNumber,paddingRightTabletLandscapeNumber, paddingLeftTabletPortrait,paddingRightTabletPortrait,paddingLeftTabletPortraitNumber,paddingRightTabletPortraitNumber} from '../data/cssVariables'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Video from './video';
function CollectionFrame(props) {
    const [deleteLockedImg, setDeleteLockedImg] = useState(false)
    const [unlock,setUnlock] = useState(false)
    const [unlockedImageHeight,setUnlockedImageHeight] = useState(0)
    const [img1Loaded,setImg1Loaded] = useState(false)
    const [img2Loaded,setImg2Loaded] = useState(false)
    function setHeight(){
        let unlockedImageHeight = (window.innerWidth - paddingLeftDesktopNumber - paddingRightDesktopNumber) * 0.75 / 2
        if(window.innerWidth <= MEDIUM_BREAKPOINT)
            unlockedImageHeight = (window.innerWidth - paddingLeftMediumNumber - paddingRightMediumNumber) * 0.75 / 2
        if(window.innerWidth <= TABLET_LANDSCAPE_BREAKPOINT)
            unlockedImageHeight = (window.innerWidth - paddingLeftTabletLandscapeNumber - paddingRightTabletLandscapeNumber) * 0.75 / 2
        if(window.innerWidth <= TABLET_PORTRAIT_BREAKPOINT)
            unlockedImageHeight = (window.innerWidth - paddingLeftTabletPortraitNumber - paddingRightTabletPortraitNumber) * 0.75 / 2
        if(window.innerWidth <= MOBILE_BREAKPOINT)
            unlockedImageHeight = window.innerWidth - paddingLeftMobileNumber - paddingRightMobileNumber
        setUnlockedImageHeight(unlockedImageHeight)
    }
    useEffect(() => {
        setHeight()
        var img1 = new Image();
        img1.src = window.innerWidth<=MOBILE_BREAKPOINT?props.img1Mobile:props.img1;
        img1.onload = ()=>{
            setImg1Loaded(true)
        }
        var img2 = new Image();
        img2.src = window.innerWidth<=MOBILE_BREAKPOINT?props.img2Mobile:props.img2;
        img2.onload = ()=>{
            setImg2Loaded(true)
        }
    }, []);
    useEffect(()=>{
        if(unlockedImageHeight && img1Loaded && img2Loaded){
            setUnlock(true)
            const timer = setTimeout(() => {
                setDeleteLockedImg(true)        
                // setUnlock(true)
            }, 2500);
        }
    },[unlockedImageHeight,img1Loaded,img2Loaded])
    // console.log("unlockedImageHeight",unlockedImageHeight)
    return (
        <>
         <div className={`collectionFrame paddedContent positionRelative ${unlock?"unlock":""}`}>
            <div className="mainHeading font48 canelaThin">{props.collectionHeading}</div>
            {!deleteLockedImg && 
                <div className={`unlockedImg positionAbsolute ${unlock?"unlock":""}`}>
                    <img src={props.img1} className="firstUnlockedImg hideForMobileInline" />
                    <img src={props.img2} className="secondUnlockedImg hideForMobileInline" />
                    <img src={props.img2Mobile} className="showForMobileInline" />
                </div>
            }
            <div className={`imageWrapper ${deleteLockedImg?"show":""}`}>
                
                {/* <div className="img1">
                    <img src={props.img1} className="width-100 hideForMobileInline"/>
                    <img src={props.img1Mobile} className="width-100 showForMobile"/>
                </div>
                <div className="img2">
                    <img src={props.img2} className="width-100 hideForMobileInline" />
                    <img src={props.img2Mobile} className="width-100 showForMobile" />
                </div> */}
                <div className="hideForMobileInline">
                    <Video poster={props.placeHolderDesktop} videoUrl={props.videoDesktopUrl} playButtonPresent={false} autoplay={true} width={1312} height={492} />
                </div>
                <div className="showForMobile">
                    <Video poster={props.placeHolderMobile} videoUrl={props.videoMobileUrl} playButtonPresent={false} autoplay={true} width={303} height={530}/>
                </div>
            </div>
         </div>   
         <style jsx>{`
            .mainHeading{
                margin-bottom:6.4rem;
                margin-top:3.2rem;
                text-align:center;
            }
            .collectionFrame{
                padding-top:14.4rem;
            }
            .imageWrapper{
                display:flex;
                justify-content: center;
                opacity:0;
            }
            .imageWrapper.show{
                opacity:1;
            }
            .unlockedImg{
                top:0;
                left:0;
                width:100%;
                z-index:1;
                height:100vh;
                background:white;
                overflow:hidden;
                white-space: nowrap;
                transition:top 0.8s ease-out 1.5s,left 0.8s ease-out 1.5s,width 0.8s ease-out 1.5s,height 0.8s ease-out 1.5s;
            }
            .unlockedImg img{
                width:100%;
                opacity:1;
                transition:width 0.8s ease-out 1.5s,height 0.8s ease-out 1.5s;
            }
            .unlock .unlockedImg img{
                opacity:1;
                width:50%;
            }
            .unlock .unlockedImg{
                    top: 29.4rem;
                    left: ${paddingLeftDesktop};
                    width: calc(100% - ${paddingLeftDesktop} - ${paddingRightDesktop});
                    pointer-events:none;
                    height:${unlockedImageHeight}px;             
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .mainHeading{
                    margin-bottom:7rem;
                }
                .collectionFrame{
                    padding-top:13.1rem;
                }
                .unlock .unlockedImg{
                    top: 28rem;
                    left: ${paddingLeftMedium};
                    width: calc(100% - ${paddingLeftMedium} - ${paddingRightMedium});
                    pointer-events:none;
                    height:${unlockedImageHeight}px;              
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .mainHeading{
                    margin-bottom:5.3rem;
                }
                .collectionFrame{
                    padding-top:11.4rem;
                }
                .mainHeading{
                    font-size:3.7rem;
                }
                .unlock .unlockedImg{
                    top: 25rem;
                    left: ${paddingLeftDesktop};
                    width: calc(100% - ${paddingLeftTabletLandscape} - ${paddingRightTabletLandscape});
                    pointer-events:none;
                    height:${unlockedImageHeight}px;              
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .unlock .unlockedImg{
                    top: 25rem;
                    left: ${paddingLeftTabletPortrait};
                    width: calc(100% - ${paddingLeftTabletPortrait} - ${paddingRightTabletPortrait});
                    pointer-events:none;
                    height:${unlockedImageHeight}px;              
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .imageWrapper{
                    opacity:1;
                }
                .unlock .unlockedImg img{
                    opacity:1;
                    width:100%;
                }
                .collectionFrame{
                    padding-top:10.4rem;
                }
                .mainHeading{
                    margin-bottom:4.8rem;
                    font-size: 2.4rem;
                    line-height: 3.2rem;
                }
                .imageWrapper{
                    flex-direction: column;
                }
                .unlockedImg{
                    overflow-x:hidden;
                    // transition:all 0.8s ease-out 1.5s;
                }
                .unlock .unlockedImg{
                    top: calc(21.4rem + ${unlockedImageHeight*0.75}px);
                    left: ${paddingLeftMobile};
                    width: calc(100% - ${paddingLeftMobile} - ${paddingRightMobile});
                    pointer-events:none;
                    height:${unlockedImageHeight}px;               
                }       
            }
            
         `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(CollectionFrame)
