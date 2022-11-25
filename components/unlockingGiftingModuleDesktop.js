import React, { useState, useEffect,useRef } from 'react'
import ThreeStepText from '../components/threeStepText'
import { connect } from 'react-redux'
import {FIXING_BUFFER_DESKTOP} from '../config'
import {paddingLeftDesktop,paddingRightDesktop} from '../data/cssVariables'
import GiftingTopText from './giftingTopText'
function giftingSection(props) {
    const [height,setHeight] = useState(0) 
    const [textContentHeight,setTextContentHeight] = useState(0)
    let heightCalc = useRef(null)
    let textContent = useRef(null)
    useEffect(()=>{
        setHeight(`${heightCalc.current.getBoundingClientRect().height}px`)
        setTextContentHeight(`${textContent.current.getBoundingClientRect().height}px`)
    },[])
    let giftingSectionHeight = `calc(${props.common.windowHeight}px`
    let lockedImageHeight = props.class=="unlock"?height:`calc(${props.common.windowHeight}px)`
    let lockedImageTop = props.class=="unlock"?`calc(${textContentHeight} + 3.2rem)`:0
    return (
       <>
        <div className={`giftingSection container ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="fadeOut"?"fadeOut":""} ${props.class=="unlock"?"unlock":""} positionRelative`} style={{height:giftingSectionHeight}}>     
            <div className="textContent" ref={textContent}>
                <GiftingTopText heading="The gift of storytelling" device={props.device} data={props.data} alreadyUnlocked={true}/>
            </div>
            <div className="lockedImageDesktop positionAbsolute" style={{height:lockedImageHeight,top:lockedImageTop}}>
                <div className="dark-overlay"></div>
            </div>
            <div className="paddedContent heightCalcWrapper" ref={heightCalc}>
                <div className="heightCalc"></div>
            </div>
            <div className={`textOnImg white positionAbsolute `}>
                <ThreeStepText lockState={true} fadeIn={true} smallText="The gift of storytelling" largeText="A personal touch" desc="Give an everlasting story with personalised messages, emotive artwork and the signature Unsaid gift box. "/>
            </div>  
        </div>
        <style jsx>{`
            .heightCalcWrapper{
                position:absolute;
                z-index:1;
                pointer-events:none;
                width:100%;
            }
            .heightCalc{
                width:100%;
                padding-top:42.9388%;
            }
            .container{
                transition: transform 0.5s ease-out;
                transform: translateY(${FIXING_BUFFER_DESKTOP}px);
            }
            .container.fadeIn{
                transform: translateY(0);
            }
            .container.unlock{
                transform: translateY(0);
            }
            .lockedImageDesktop{
                background-image:url(/images/gift2.jpg);
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
            .giftItemsTextSlider{
                padding-left:${paddingLeftDesktop};
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
        `}</style>
       </>
    )
}

function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(giftingSection)
