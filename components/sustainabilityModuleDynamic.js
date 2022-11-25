import React, { useEffect, useState,useRef} from 'react'
import ThreeStepText from '../components/threeStepText'
import {FIXING_BUFFER_DESKTOP,FIXING_BUFFER_MOBILE, TABLET_PORTRAIT_BREAKPOINT,MOBILE_BREAKPOINT, HEADER_HEIGHT_DESKTOP,HEADER_HEIGHT_MOBILE} from '../config'
import {connect} from 'react-redux';
import  { paddingLeftDesktop, paddingLeftMobile} from '../data/cssVariables'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Sanity from './../sanity'
import LazyImage  from './lazyImage';
import Link from 'next/link'
import {getImageUrl} from "../functions"
function SustainabilityModuleDynamic(props) {
    // console.log("sustainability props",props.sustainability)
    const [minHeadingHeight,setMinHeadingHeight] = useState("auto")
    const [minDescHeight,setMinDescHeight] = useState("auto")
    const itemHeading = useRef([]);
    const itemDesc = useRef([]);
    const imageCalc = useRef(null)
    const topInfo = useRef(null)
    const [topInfoHeight,setTopInfoHeight] = useState(0)
    const [imageWidth,setImageWidth] = useState(0)
    const [imageHeight,setImageHeight] = useState(0)
    useEffect(()=>{
        setTopInfoHeight(topInfo.current.getBoundingClientRect().height)
        setImageWidth(imageCalc.current.getBoundingClientRect().width)
        setImageHeight(imageCalc.current.getBoundingClientRect().height)
    },[])
    let lockedImageHeight = props.class=="unlock"?`${imageHeight}px`:props.device=="mobile"?`calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`:`calc(${props.common.windowHeight}px)`
    let lockedImageWidth = props.class=="unlock"?`${imageWidth}px`:"100%"
    let lockedImageTop = props.class=="unlock"?`calc(${topInfoHeight}px + 7.5rem + ${HEADER_HEIGHT_DESKTOP}px)`:"0"
    let lockedImageLeft = props.class=="unlock"?paddingLeftDesktop:"0"
    if(props.device=="tablet" && props.class=="unlock"){
        // lockedImageTop = `calc(${topInfoHeight}px + 6rem`
        lockedImageLeft = paddingLeftMobile
    }
    if(props.device=="mobile" && props.class=="unlock"){
        lockedImageTop = `calc(${topInfoHeight}px + 9.6rem`
        lockedImageLeft = paddingLeftMobile
    }
    if(props.device=="mobile" && props.class!="unlock"){
        lockedImageHeight = `calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`
    }
    useEffect(()=>{
        setMinHeadingHeight("auto")
        setMinDescHeight("auto")
        setTimeout(()=>{
            if(Array.isArray(props.sustainability)){
                let max = 0 
                let maxDesc = 0 
                props.sustainability.forEach((item,index)=>{
                    let headingHeight = itemHeading.current[index].getBoundingClientRect().height
                    let descHeight = itemDesc.current[index].getBoundingClientRect().height
                    // console.log('heading and sec height',index,headingHeight,descHeight)
                    if(headingHeight > max)
                        max = headingHeight
                    setMinHeadingHeight(`${max}px`);
                    if(descHeight > maxDesc)
                        maxDesc = descHeight
                    setMinDescHeight(`${maxDesc}px`);
                    // console.log("maxdesc",maxDesc)
                })    
            }
        },1000)
    },[props.common.windowWidth,props.common.windowHeight])
    return (
        <>
            <div className={`sustainabilityModule paddedContent alignCenter positionRelative ${props.fixedModule?"fixedModule":""} ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="fadeOut"?"fadeOut":""} ${props.class=="unlock"?"unlock":""}`}>
                {!props.unlockedSection &&
                        <div className="lockedImg positionAbsolute" style={{height:lockedImageHeight,width:lockedImageWidth,top:lockedImageTop,left:lockedImageLeft}}>
                            <div className="dark-overlay"></div>
                            <div className="textOnImg white positionAbsolute">
                                <ThreeStepText lockState={true} fadeIn={true} smallText={props.pageMainHeading} largeText={props.pageSubHeading} desc={props.pageDescription}/>
                            </div>
                        </div>
                }
                <div className="heading font20 anoHalfRegular">{props.heading}</div>
                <div className="items">
                    {Array.isArray(props.sustainability) && props.sustainability.map((item,index)=>{
                        let transitionDelayHeading = 0.9
                        let transitionDelayDescription = 1.1
                        if(index==1){
                            transitionDelayHeading = 1.13
                            transitionDelayDescription = 1.15
                        }
                        if(index==2){
                            transitionDelayHeading = 1.17
                            transitionDelayDescription = 1.19
                        }
                        return(
                            <div className="item positionRelative" key={`sustain_${index}`}>
                                <Link href={item.link}><a>
                                    <div className="topInfo" ref={topInfo}>
                                        <div  ref={el => itemHeading.current[index] = el} className="itemHeading canelaThin font32" style={{transition:`all 0.7s ease-out ${transitionDelayHeading}s`}}>{item.heading}</div>
                                        <div  ref={el => itemDesc.current[index] = el} className="desc anoHalfRegular font16" style={{transition:`all 0.7s ease-out ${transitionDelayDescription}s`}}>{item.description}</div>
                                    </div>
                                    {index==0 &&
                                        <div className="imageCalcWrapper" ref={imageCalc}>
                                            <div className="imageCalc"></div>
                                        </div>
                                    }
                                    <LazyImage 
                                        alt={item.heading} 
                                        originalSrc={ getImageUrl(item.imageDesktop,561)} 
                                        placeholderSrc={getImageUrl(item.imageDesktop,20)}
                                        width={561} 
                                        height={749} 
                                    />
                                    {/* <img className="width-100" src={urlFor(item.imageDesktop).url()} /> */}
                                    <div className="descMobile anoHalfRegular font16-notResponsive">{item.description}</div>
                                </a></Link>
                                
                            </div>
                        )
                    })}
                </div>
            </div>   
            <style jsx>{`
                .imageCalcWrapper{
                    position:absolute;
                    z-index:1;
                    pointer-events:none;
                    width:calc(100% - 2.4rem);
                }
                .itemHeading{
                    min-height:${minHeadingHeight};
                }
                .item .desc{
                    min-height:${minDescHeight};
                }
                .imageCalc{
                    padding-top:133.5%;
                }
                .sustainabilityModule.fixedModule{
                    transition: transform 0.5s ease-out;
                    transform: translateY(${FIXING_BUFFER_DESKTOP}px);
                }
                .sustainabilityModule.fadeIn{
                    transform: translateY(0);
                }
                .sustainabilityModule.unlock{
                    transform: translateY(0);
                }
                .sustainabilityModule.fixedModule{
                    padding-top:${HEADER_HEIGHT_DESKTOP}px;
                }
                .desc{
                    padding:0 5.6rem;
                    letter-spacing: 0.5px;
                }
                .heading{
                    margin-bottom:3.2rem;
                }
                .items{
                    display:flex;
                    margin-right:-2.4rem;
                }
                .item{
                    padding-right:2.4rem;
                    flex: 1 1 100%;
                }
                .itemHeading, .desc{
                    margin-bottom:2.4rem;
                    
                }
                .lockedImg{
                    top:0;
                    left:0;
                    z-index:1;
                    opacity:1;
                    width:100%;
                    transition:all 0.5s ease-out 0.6s;
                    background-image:url(${getImageUrl(props.sustainability[0].imageDesktop,2000)});
                    background-size:cover;
                    background-position:center center;
                    // transition: 0.5s ease-out 1.1s;
                }
                .unlock .lockedImg{
                    opacity: 1;
                    pointer-events: none;
                    animation:unlockSection2 0.1s ease-out 1.1s forwards;
                }
                .lockedImg .dark-overlay{
                        background: #00000070;
                }
                @keyframes unlockSection2{
                    from{
                        opacity:1;
                    }
                    to{
                        opacity:0;
                        pointer-events:none;
                    }
                }
                .textOnImg{
                    width:47%;
                    display:none;
                    z-index:3;
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
                }
                .itemHeading,.desc{
                    opacity:0;
                    transform:translateY(3rem);
                }
                .unlock .itemHeading,.unlock .desc{
                    opacity:1;
                    transform:translateY(0);
                }
                @keyframes fadeUpAnimation{
                    0% {
                        opacity:0;
                        transform-origin:bottom;
                        transform: translateY(1.5rem);
                    }
                    100% {
                        opacity:1;
                        transform-origin:top;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        transform: translateY(0);
                    }
    
                }
                .descMobile{
                    display:none;
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    // .heading{
                    //     font-size:1.7rem;
                    //     line-height:2.4rem;
                    // }
                    .desc{
                        padding:0 0;
                        letter-spacing: 0.5px;
                    }
                    // .sustainabilityModule.fixedModule{
                    //     transform: translateY(${FIXING_BUFFER_MOBILE}px);
                    // }
                    // .sustainabilityModule.fadeIn{
                    //     transform: translateY(0);
                    // }
                    // .sustainabilityModule.unlock{
                    //     transform: translateY(0);
                    // }
                    // .items{
                    //     display:block;
                    // }
                    // .items .item:not(:first-child){
                    //     margin-top:3.8rem;
                    // }
                    // .textOnImg{
                    //     width:calc(100% - 6.4rem);
                    // }
                    .lockedImg{
                        background-image:url(${getImageUrl(props.sustainability[0].imageDesktop,900)});
                    }
                    // .lockedImg .dark-overlay{
                    //     display:block;
                    //     background: #00000070;
                    // }
                    // .itemHeading{
                    //     font-size:3.2rem;
                    //     margin-bottom:4rem;
                    // }
                    // .descMobile{
                    //     margin-top:2.4rem;
                    //     margin-bottom:4.8rem;
                    // }
                    // .item:last-child .descMobile{
                    //     margin-bottom:0rem;
                    // }
                    // .desc{
                    //     font-size:1.6rem;
                    //     line-height:2.4rem;
                    //     width: 60%;
                    //     margin-left:auto;
                    //     margin-right:auto;
                    // }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .heading{
                        margin-bottom:1.6rem;
                        font-size:1.2rem;
                    }
                    .desc{
                        width:100%;
                        display:none;
                    }
                    .descMobile{
                        display:block;
                    }
                    .items{
                        display:block;
                    }
                    .items .item:not(:first-child){
                        margin-top:3.8rem;
                    }
                    .item{
                        width:100%;
                    }
                    .textOnImg{
                        width:calc(100% - 6.4rem);
                    }
                    .lockedImg .dark-overlay{
                        display:block;
                        background: #00000070;
                    }
                    .lockedImg{
                        background-image:url(${getImageUrl(props.sustainability[0].imageMobile,500)});
                    }
                    .itemHeading{
                        margin-bottom:2.4rem;
                    }
                    .descMobile{
                        margin-top:2.4rem;
                        margin-bottom:4.8rem;
                    }
                    .item:last-child .descMobile{
                        margin-bottom:0rem;
                    }
                    .sustainabilityModule.fixedModule{
                        padding-top:0;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(SustainabilityModuleDynamic)