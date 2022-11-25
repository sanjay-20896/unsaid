import React, { useState, useEffect,useRef } from 'react'
import { MOBILE_BREAKPOINT } from '../config';
import {connect} from 'react-redux'
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'
function Video(props){
    const {t}=useTranslation('common');
    const videoRef=useRef();
    const [showPlayIcon,setShowPlayIcon]=useState(true)
    const [controlsShown,showControls] = useState(false)
    const [placeholderDesktop,setPlaceholderDesktop] = useState(null)
    const [placeholderMobile,setPlaceholderMobile] = useState(null)
    const [mute,setMute] = useState(props.muted)
    const [videoLoaded, setVideoLoaded] = useState(true)
    // useEffect(()=>{
    //     let windowWidth = props.common.windowWidth?props.common.windowWidth:window.innerWidth
    //     if(windowWidth<=MOBILE_BREAKPOINT){
    //         if(props.placeholderMobileFullUrl){
    //             let placeholderMobileFull = new Image()
    //             placeholderMobileFull.onload = ()=>{
    //                 setPlaceholderMobile(props.placeholderMobileFullUrl)
    //             }
    //             placeholderMobileFull.src = props.placeholderMobileFullUrl
    //         }
    //     } else {
    //         console.log("gifting section desktop",props.placeholderDesktopFullUrl)
    //         if(props.placeholderDesktopFullUrl){
    //             let placeholderDesktopFull = new Image()
    //             placeholderDesktopFull.onload = ()=>{
    //                 setPlaceholderDesktop(props.placeholderDesktopFullUrl)
    //             }
    //             placeholderDesktopFull.src = props.placeholderDesktopFullUrl
    //         }
    //     }
    // },[props.common.windowWidth])
    useEffect(() => {
        if(props.playButtonPresent===true){
            videoRef.current.onplay=()=>{
                setShowPlayIcon(false)
            }
            videoRef.current.onpause=()=>{
                setShowPlayIcon(true)
            }
        }
        //videoRef.current.play()
        
    }, [])
    useEffect(()=>{
        if(props.videoPause){
            if(videoRef.current)
                videoRef.current.pause()
        } else {
            if(props.autoplay){
                if(videoRef.current)
                    videoRef.current.play()
            }
        }
        
    },[props.videoPause])
    function playVideo(){
        setShowPlayIcon(false)
        videoRef.current.play()
    }
    
    function muteVideo(){
        videoRef.current.muted=!videoRef.current.muted
        setMute(videoRef.current?.muted)
    }
    function onLoadedData(){
        setVideoLoaded(true);
    }
    return(
        <>
        <div className={`videoContainer positionRelative lazyShineAnimation overflowHidden ${videoLoaded?"onVideoLoad":""} ${props.restrictedHeightAndWidth?"restrictHeightAndWidth":""}`} onMouseEnter={()=>showControls(props.controls===true ? true:false)} onMouseLeave={()=>showControls(props.controls===true?false:true)}>
            {((props.invisibleUntilDeviceSet && !!props.deviceName) || (!props.invisibleUntilDeviceSet)) &&
                <>
                    <video onLoadedData={()=>onLoadedData()} ref={videoRef} className="width-100"  autoPlay={props.autoplay} controls={props.controls && controlsShown}  muted loop={props.loop} playsInline onClick={()=>muteVideo()}>
                        <source src={props.videoUrl} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                    {props.playButtonPresent && 
                        <div className="playButton positionAbsolute cursorPointer">
                            {showPlayIcon && <img src="/images/playIconWhite.svg" alt="Play Icon" className="width-100" onClick={()=>playVideo()}/>}
                        </div>
                    }
                    {props.showMuteButton && 
                        <div className="showMuteIcon positionAbsolute cursorPointer">
                            {props.muted && <img src={mute ? "/images/mute.png":"/images/unmute.png"} alt="Mute Icon" className="width-100" onClick={()=>muteVideo()}/>}
                        </div>
                    }
                    {!!props.videoLabel &&
                        <h2 className="videoLabel white font48 canelaThin alignCenter positionAbsolute">{props.videoLabel}</h2>
                    }
                    {!!props.ctaLink &&
                        <div className="ctaOnVideo positionAbsolute"><Link href={props.ctaLink}><a><button className="btnTransparentWhite anoRegular">{t('learnMore')}</button></a></Link></div>
                    }
                </>
            }
        </div>
        <style jsx>{`
            .videoLabel{
                width: 100%;
                top: 44%;
                left: 50%;
                transform: translate(-50%,-50%);
                z-index: 9;
                padding: 0 15px;
            }
            .ctaOnVideo a{
                display: inline-block;
            }
            .ctaOnVideo{
                bottom: 4.3rem;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9;
                width: 100%;
                text-align: center;
            }
            .videoContainer{
                background-color:#f2f2f2;
                background-image:${placeholderDesktop?`url(${placeholderDesktop})`:"none"};
                background-size:cover;
                padding-top:${props.height*100/props.width}%;
            }
            .onVideoLoad.videoContainer{
                background:transparent;
            }
            .restrictHeightAndWidth{
                overflow:hidden;
            }
            .videoContainer video{
                position:absolute;
                width:100%;
                height:100%;
                left:0;
                top:0;
                object-fit:cover;
                z-index:2
            }
            .playButton{
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                z-index:3;
            }
            .showMuteIcon{
                width:25px;
                height:25px;
                bottom:20px;
                right:15px;
                z-index:3;
                // transform:translate(-50%,-50%);
            }
            .showMuteIcon img{
                height:100%;
            }
            @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .videoContainer{
                    background-image:${placeholderMobile?`url(${placeholderMobile})`:"none"};
                }
                .showMuteIcon{
                    bottom:15px;
                    right:9px;
                }
                .videoLabel{
                    top: 50%;
                    padding: 0 60px;
                }
            }
        `}</style>
        
        </>
        
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(Video)