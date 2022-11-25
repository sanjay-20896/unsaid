import React , { useEffect,useState } from 'react'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { connect } from 'react-redux';
import cssVariables from '../data/cssVariables'
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
import Sanity from './../sanity'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {useRouter} from 'next/router'
import {showMyUnsaidMenu,setLoggedIn} from '../redux/actions'
import {getImageUrl} from "../functions"
function HeroModuleDynamic(props) {
    let placeholderDesktopBlurUrl = props.placeholderDesktop?getImageUrl(props.placeholderDesktop,20):null
    let placeholderDesktopFullUrl = props.placeholderDesktop?getImageUrl(props.placeholderDesktop,1440):null
    let placeholderMobileBlurUrl = props.placeholderMobile?getImageUrl(props.placeholderMobile,20):null
    let placeholderMobileFullUrl = props.placeholderMobile?getImageUrl(props.placeholderMobile,500):null
    const [placeholderDesktop,setPlaceholderDesktop] = useState(placeholderDesktopBlurUrl)
    const [placeholderMobile,setPlaceholderMobile] = useState(placeholderMobileBlurUrl)
    const [animate,setAnimate] = useState(false)
    let description=props.desc;
    useEffect(()=>{
        let placeholderDesktopBlur = new Image()
        if(placeholderDesktopBlurUrl && !placeholderDesktop){
            placeholderDesktopBlur.onload = ()=>{
                if(!placeholderDesktop)
                    setPlaceholderDesktop(placeholderDesktopBlurUrl)
            }
            placeholderDesktopBlur.src = placeholderDesktopBlurUrl 
        }

        let placeholderDesktopFull = new Image()
        if(placeholderDesktopFullUrl){
            placeholderDesktopFull.onload = ()=>{
                setPlaceholderDesktop(placeholderDesktopFullUrl)
            }
            placeholderDesktopFull.src = placeholderDesktopFullUrl 
        }

        let placeholderMobileBlur = new Image()
        if(placeholderMobileBlurUrl && !placeholderMobile){
            placeholderMobileBlur.onload = ()=>{
                if(!placeholderMobile)
                    setPlaceholderMobile(placeholderMobileBlurUrl)
            }
            placeholderMobileBlur.src = placeholderMobileBlurUrl 
        }

        let placeholderMobileFull = new Image()
        if(placeholderMobileFullUrl){
            placeholderMobileFull.onload = ()=>{
                setPlaceholderMobile(placeholderMobileFullUrl)
            }
            placeholderMobileFull.src = placeholderMobileFullUrl 
        }
        setTimeout(()=>{
            setAnimate(true)
        },100)
    },[])
    return (
       <>
        <div style={{height:props.common.windowHeight2?`${props.common.windowHeight2}px`:"100vh"}} className={`container ${animate?"animate":""} ${props.animation=="unlock"?"unlock":""}`}>
            <div className="videoContainer positionRelative">
                <video  className="hideForMobile" width="400" id={props.id} autoPlay muted playsInline loop>
                    <source src={props.video} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
                <video  className="showForMobile" width="400" id={props.id} autoPlay muted playsInline loop>
                    <source src={props.videoMobile?props.videoMobile:props.video} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
                {/* <img className="mainImg width-100"  src="/images/hero.png" /> */}
                <div className="textContainer positionAbsolute">
                    <h1 className="textOne white canelaThin">{props.pageHeading}</h1>
                    <div className="textTwo"><img className="width-100" src={getImageUrl(props.pageLogo,208)} alt="Unsaid Logo" /></div>
                </div>
            </div>
            <h2 className="font32 heroText canelaThin black alignCenter paddedContent">{description}
                {/* {Array.isArray(description) && description.map((text,index)=>{
                    return(
                        <span key={index} style={{animationDelay:`${(index+1)*0.2}s`}} className="heroTextItem">{text} </span>
                    )
                })} */}
            </h2>
        </div>
        <style jsx>{`
            .container{
                background:#ffffff;
            }
            .textContainer{
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);            
            }
            .textOne{
                margin-bottom: 3.2rem;
                transition: all 0.5s ease-out 0.3s;
                // animation:textFadeInAnimation 0.5s ease-out 0.3s forwards;
                opacity:0;
                transform:translateY(2rem);
                font-size:3.2rem;
                line-height:4rem;
                opacity:0;
                transform:translateY(2rem);
            }
            .textTwo{
                width: 20.8rem;
                transition: all 0.5s ease-out 0.6s;
                // animation:textFadeInAnimation 0.5s ease-out 0.6s forwards;
                opacity:0;
                transform:translateY(2rem);
            }
            .animate .textOne,.animate .textTwo{
                opacity:1;
                transform:translateY(0);
            }
            .unlock .textContainer{
                opacity:0;
            }
            .videoContainer{
                margin:0 auto;
                text-align:center;
                width:100%;
                height:100%;
                overflow:hidden;
                transition:all 0.5s ease-out;
                background-size:cover;
                // background-image:url(${placeholderDesktop?placeholderDesktop:"none"});
            }
            .videoContainer video{
                object-fit: cover;
                min-width: 100%;
                min-height: 100%;
                position: absolute;
            }
            .unlock .videoContainer{
                width:calc(100% - ${cssVariables.paddingLeftDesktop} - ${cssVariables.paddingRightDesktop});
                height:73%;
            }
            .heroText{
                margin-top:6.4rem;
            }
           
            .heroText .heroTextItem{
                opacity:0;
            }
            .unlock .heroText .heroTextItem{
                animation:heroTextAnime 0.3s ease-out forwards;
            }
            .heroText{
                padding: 0 29%;
            }
            @keyframes heroTextAnime{
                from{
                    opacity:0;
                }
                to{
                    opacity:1;
                }
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .textOne{
                    font-size:2.8rem;
                    line-height:3.5rem;
                    margin-bottom:2.7rem;
                }
                .textTwo{
                    width:18.6rem;
                }
                .unlock .videoContainer{
                    width:calc(100% - ${cssVariables.paddingLeftMedium} - ${cssVariables.paddingRightMedium});
                }
                
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .unlock .videoContainer{
                    width:calc(100% - ${cssVariables.paddingLeftTabletLandscape} - ${cssVariables.paddingRightTabletLandscape});
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .unlock .videoContainer{
                    width:calc(100% - ${cssVariables.paddingLeftTabletPortrait} - ${cssVariables.paddingRightTabletPortrait});
                }
                .heroText{
                    padding: 0 21%;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .videoContainer{
                    background-image:url(${placeholderMobile?placeholderMobile:"none"})
                }
                .textOne{
                    font-size:1.6rem;
                    line-height:2.4rem;
                    margin-bottom:1.6rem;
                }
                .textTwo{
                    width: 15.6rem;
                    // height: 4.8rem;
                }
                .unlock .videoContainer{
                    width:calc(100% - 7.2rem);
                }
                .container{
                    background:#ffffff;
                }
                .heroText{
                    padding: 0 3.6rem;
                }
                .unlock .videoContainer{
                    height:calc(100% - 12.8rem);
                }
                .heroText{
                    margin-top:3.4rem;
                }
            }
            @media screen and (min-width: 1373px){
                .heroText{
                    padding: 0 33%;
                }
            }
        `}</style>
       </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setLoggedIn,showMyUnsaidMenu})(HeroModuleDynamic)