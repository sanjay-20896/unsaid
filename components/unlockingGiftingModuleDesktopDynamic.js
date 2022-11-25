import React, { useState, useEffect,useRef } from 'react'
import ThreeStepText from '../components/threeStepText'
import { connect } from 'react-redux'
import {FIXING_BUFFER_DESKTOP, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_TABLET, TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT, MEDIUM_BREAKPOINT, HEADER_HEIGHT_MEDIUM} from '../config'
import {paddingLeftDesktop,paddingRightDesktop,paddingLeftMobile,paddingRightMobile, paddingLeftTabletLandscape,paddingRightTabletLandscape, paddingLeftTabletPortrait, paddingRightTabletPortrait} from '../data/cssVariables'
import GiftingTopText from './giftingTopText'
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Sanity from './../sanity'
import {getImageUrl} from "../functions"
function GiftingSectionDynamic(props) {
    const [height,setHeight] = useState(0) 
    const [top,setTop] = useState(0)
    let heightCalc = useRef(null)
    let textContent = useRef(null)
    function setUnlockParams(){
        setHeight(`${heightCalc.current.getBoundingClientRect().height}px`)
        let top = `calc(${textContent.current.getBoundingClientRect().height}px + 3.2rem + ${HEADER_HEIGHT_DESKTOP}px)`
        if(window.innerWidth <= MEDIUM_BREAKPOINT)
            top = `calc(${textContent.current.getBoundingClientRect().height}px + 3.2rem + ${HEADER_HEIGHT_MEDIUM}px)`
        if(window.innerWidth <= TABLET_LANDSCAPE_BREAKPOINT)
            top = `calc(${textContent.current.getBoundingClientRect().height}px + 3.2rem + ${HEADER_HEIGHT_TABLET}px)`
        setTop(top)
    }
    function handleResize(){
        setUnlockParams()
    }
    useEffect(()=>{
        setUnlockParams()
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize)
        }
    },[])
    let giftingSectionHeight = `calc(${props.common.windowHeight}px`
    let lockedImageHeight = props.class=="unlock"?height:`calc(${props.common.windowHeight}px)`
    let lockedImageTop = props.class=="unlock"?top:0
    return (
       <>
        <div className={`giftingSection container ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="fadeOut"?"fadeOut":""} ${props.class=="unlock"?"unlock":""} positionRelative`} style={{height:giftingSectionHeight}}>     
            <div className="textContent" ref={textContent}>
                <GiftingTopText heading={props.heading} device={props.device} data={props.data} alreadyUnlocked={true}/>
            </div>
            <div className="lockedImageDesktop positionAbsolute" style={{height:lockedImageHeight,top:lockedImageTop}}>
                <div className="dark-overlay"></div>
            </div>
            <div className="paddedContent heightCalcWrapper" ref={heightCalc}>
                <div className="heightCalc"></div>
            </div>
            <div className={`textOnImg white positionAbsolute `}>
                <ThreeStepText lockState={true} fadeIn={true} smallText={props.pageMainHeading} largeText={props.pageSubHeading} desc={props.pageDescription} />
            </div>  
        </div>
        <style jsx>{`
            .lockedImageDesktop .dark-overlay{
                background: #00000070;
            }
            .heightCalcWrapper{
                position:absolute;
                z-index:1;
                pointer-events:none;
                width:100%;
            }
            .heightCalc{
                width:100%;
                padding-top:62.44%;
            }
            .container{
                transition: transform 0.5s ease-out;
                transform: translateY(${FIXING_BUFFER_DESKTOP}px);
                padding-top:${HEADER_HEIGHT_DESKTOP}px;
            }
            .container.fadeIn{
                transform: translateY(0);
            }
            .container.unlock{
                transform: translateY(0);
            }
            .lockedImageDesktop{
                background-image:url(${ getImageUrl(props.lockedImage,2000)});
                background-size:cover;
                background-position:center center;
                z-index:1;
                top:0;
                left:0;
                width:100%;
                transition:all 0.5s ease-out 0.4s;
            }
            .unlock .dark-overlay{
                opacity:0;
            }
            .unlock .lockedImageDesktop{
                width:calc(100% - ${paddingLeftDesktop} - ${paddingRightDesktop} - 1.03rem);
                margin-left:${paddingLeftDesktop};
            }
            .heading{
                margin-bottom:3.2rem;
                opacity:0;
                animation:textFadeInAnimation 0.5s ease-out 0.5s forwards;
                display:block;
            }
            .textContent{
                margin-bottom:3.2rem;
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
                pointer-events:none;
            }
            @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .container{
                    padding-top:${HEADER_HEIGHT_MEDIUM}px;
                }
                .unlock .lockedImageDesktop{
                    width:calc(100% - ${paddingLeftTabletPortrait} - ${paddingRightTabletPortrait} - 1.03rem);
                    margin-left:${paddingLeftTabletPortrait};
                }
            }
            @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .unlock .lockedImageDesktop{
                    width:calc(100% - ${paddingLeftTabletLandscape} - ${paddingRightTabletLandscape} - 1.03rem);
                    margin-left:${paddingLeftTabletLandscape};
                }
                .container{
                    padding-top:${HEADER_HEIGHT_TABLET}px;
                }
            }
            @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .unlock .lockedImageDesktop{
                    width:calc(100% - ${paddingLeftMobile} - ${paddingRightMobile} - 1.03rem);
                    margin-left:${paddingLeftMobile};
                }
                .container{
                    padding-top:${HEADER_HEIGHT_TABLET}px;
                }
            }
        `}</style>
       </>
    )
}

function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(GiftingSectionDynamic)
