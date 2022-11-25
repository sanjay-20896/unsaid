import React, { useState, useEffect } from 'react'
import SwipeableViews from 'react-swipeable-views'
import {MOBILE_BREAKPOINT} from '../config'
import { connect } from 'react-redux'
import {FIXING_BUFFER_DESKTOP,FIXED_BUFFER_MOBILE} from '../config'
import cssVariables from '../data/cssVariables'
import GiftingTopText from './giftingTopText'
import Slider from 'react-slick'
let springConfig={
    duration: "0.9s",
    easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
    delay: "0s",
}
function giftingSection(props) {
    // console.log(props)
    const [index, setIndex] = useState(0)
    const [indexMobile, setIndexMobile] = useState(0)
    const [textChangeTransition,setTextChangeTransition] = useState("")
    const [textIndex,setTextIndex] = useState(0)
    const [lineAnimation, setLineAnimation] = useState(false)
    const [autoplay,setAutoplay] = useState(true)
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
        // console.log('text item click')
        clearTimeout(autoPlayTimer)
        setAutoplay(false)
        // setAutoplay(false)
        setIndex(slideIndex);

    }
    useEffect(()=>{
        // console.log('index changed',autoplay)
        if(autoplay){
            autoPlayTimer = setTimeout(()=>{
                // console.log('auto play timer')
                // console.log(index)
                if(index>=0 && index<3){
                    setIndex(index+1)    
                }
                if(index===3){
                    setIndex(0)
                }
            },3000)
        }
    },[index]) 
    return (
       <>
        <div className={`giftingSection container positionRelative`}>
            {(props.device=="desktop" || props.device=="tablet") &&
                <div>
                    <div className="textContent">
                        <GiftingTopText device={props.device} data={props.data} heading="The gift of storytelling" currentSlideIndex={index} itemClick={(slideIndex)=>textItemClick(slideIndex)} alreadyUnlocked={true}/>
                    </div>
                    <div className="animationComplete paddedContent">
                        <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
                            {props.data.map((slide,slideIndex)=>{
                                return (
                                    <div key={`desktop_image_slide_${slideIndex}`}>
                                        <img className="mainImg width-100" src={slide.imageUrl} />
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                    </div>                    
                    <div className="lineAnimation">
                        {props.data.map((data,id)=>{
                            return(
                                <div className={`line ${index===id?"active":""}`}></div>
                            )
                        })}
                    </div>
                </div> 
            }
            {props.device=="mobile" &&
                <div className="giftingMobileContainer">
                    {!!props.heading && <div className="heading paddedContent anoHalfRegular">{props.heading}</div>}
                    <div className="unlockSection">
                        <SwipeableViews style={{padding:"0 7.8rem 0 0"}} slideStyle={{padding:"0 0rem 0 0"}} index={indexMobile} onChangeIndex={handleChangeIndex} springConfig={springConfig}>
                            {props.dataMobile.map((slide,slideIndex)=>{
                                return (
                                    <div key={`mobile_slide_${slideIndex}`}>
                                        <div className="imgContainerMobile">
                                            <div className="imgMobile" style={{backgroundImage:`url(${slide.imageUrl})`}}></div>
                                            {/* <img className={`mainImg width-100 `} src={slide.imageUrl}/> */}
                                        </div>
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                        <div className={`currentSlideText ${textChangeTransition}`}>
                            <div className="itemHeading one canelaThin font24-notResponsive">{props.data[textIndex].heading}</div>
                            <div className="itemDesc one anoHalfRegular font16-notResponsive">{props.data[textIndex].description}</div>
                        </div>
                    </div>
                </div>
            }
        </div>
        <style jsx>{`
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
                width: calc(100% - 1.03rem);
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
                .unlockSection{
                    padding-left:${cssVariables.paddingLeftMobile};
                }
                .currentSlideText{
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
                    font-size:1.2rem;
                    margin-bottom: 3.2rem;
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
export default connect(mapStateToProps,null)(giftingSection)
