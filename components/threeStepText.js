import React from 'react'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'

export default function threeStepText(props) {
    return (
        <>
         <div className={`container alignCenter ${props.topTextLeftAlignForMobile?"topTextLeftAlignForMobile":""}`}>
             {props.smallText && <div className={`smallText anoHalfRegular font20 ${props.fadeIn?"fadeIn":""}`}>{props.smallText}</div>}
             {props.largeText && <h1 className={`largeText ${props.lockState?"larger lockState":""} canelaThin ${props.fadeIn?"fadeIn":""}`}>{props.largeText}</h1>}
             {props.desc && <div className={`desc ${props.descFont16?"fontSize16":""} ${props.largerDesc?"fontLarger":""} ${props.lockState?"anoRegular":"canelaThin"} ${props.fadeIn?"fadeIn":""}`}>{props.desc}</div>}
         </div>   
         <style jsx>{`
            .smallText{
                margin-bottom:3.2rem;
                animation:textFadeInAnimation 0.5s ease-out 1s forwards;
            }
            .largeText{
                margin-bottom:2.4rem;
                font-size:4rem;
                line-height:4.8rem;
            }
            .largeText.lockState{
                padding: 0 18%;
            }
            .largeText.larger{
                font-size:4.8rem;
                line-height:5.6rem;
            }
            .desc{
                width:64.4rem;
                margin:0 auto;
                max-width:100%;
                letter-spacing: 0.32px;
            }
            .desc:not(.fontLarger){
                font-size:2rem;
                line-height:2.8rem;
            }
            .desc.fontSize16{
                font-size:1.6rem;
                //width:100%;
            }
            .desc.fontLarger{
                font-size:2.4rem;
                line-height:3.2rem;
            }
            .smallText.fadeIn{
                opacity:0;
                animation:textFadeInAnimation 0.5s ease-out 0.7s forwards;
            }
            .largeText.fadeIn{
                opacity:0;
                animation:textFadeInAnimation 0.5s ease-out 0.9s forwards;
            }
            .desc.fadeIn{
                opacity:0;
                animation:textFadeInAnimation 0.5s ease-out 1.2s forwards;
            }
            @keyframes textFadeInAnimation{
                from{
                    opacity:0;
                    transform:translateY(2rem);
                }
                to{
                    opacity:1;
                    transform:translateY(0);
                }
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .desc.fontLarger {
                    font-size: 2.0rem;
                    line-height: 2.8rem;
                }
                .largeText.lockState{
                    padding: 0 10%;
                }
                .desc:not(.fontLarger) {
                    font-size: 1.8rem;
                    line-height: 2.5rem;
                }
                .largeText{
                    font-size:3.5rem;
                    line-height:4.2rem;
                }
                .largeText.larger{
                    font-size:4.2rem;
                    line-height:4.9rem;
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .largeText{
                    font-size:3rem;
                    line-height:4.4rem;
                }
                .largeText.larger {
                    font-size: 3.7rem;
                    line-height: 4.4rem;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .desc:not(.fontLarger) {
                    font-size: 1.6rem;
                    line-height: 2.2rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .smallText{
                    margin-bottom:1.6rem;
                    font-size:1.2rem;
                    line-height: 2rem;
                }
                .desc{
                    width: 100%;
                }
                .largeText,.largeText.larger{
                    font-size:${props.lockState?"3.2rem":"2.4rem"};
                    line-height:${props.lockState?"4rem":"3.2rem"};
                    margin-bottom:1.6rem;
                }
                .desc:not(.fontLarger){
                    font-size:${props.lockState?"2rem":"1.6rem"};
                    line-height: ${props.lockState?"2.8rem":"2.4rem"};
                    width: 100%;
                    margin-bottom:4.8rem;
                    letter-spacing:0.5px;
                }
                .desc.fontLarger{
                    font-size:1.6rem;
                    line-height:2.4rem;
                }
                .topTextLeftAlignForMobile{
                    text-align:left;
                }
            }
         `}</style>
        </>
    )
}
