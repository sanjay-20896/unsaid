import React from 'react'
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables'

export default function twoStepText(props) {
    return (
        <>
         <div className={`textWrapper ${props.animate?"animate":""} ${props.productPage?"productPage":""}`}>
             <div className="text1 font40 canelaThin">{props.text1}</div>
             <div className="text2 font20 anoHalfRegular">{props.text2}</div>
         </div>  
         <style jsx>{`
            .text1{
                margin-bottom:${props.flexReverse?"0":"3.2rem"};
                opacity:0;
            }
            .text2{
                margin-bottom:${props.flexReverse?"3.2rem":"0"};
                opacity:0;
                letter-spacing: 0.4px;
            }
            .animate .text1{
                animation:textFadeInAnimation 0.5s ease-out 0s forwards;
            }
            .animate .text2{
                animation:textFadeInAnimation 0.5s ease-out 0.2s forwards;
            }
            .textWrapper{
                //padding: 0 27%;
                width:45.7222%;
                margin:0 auto;
                text-align:center;
                display: flex;
                flex-direction: ${props.flexReverse?"column-reverse":"column"};
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
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .textWrapper{
                    width:62.7222%;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .textWrapper{
                    width:auto;
                    text-align:left;
                    padding-left:3.6rem;
                    padding-right:3.6rem;
                }
                .text1{
                    margin-bottom:2.4rem;
                    line-height: 3.2rem;
                }
                .text2{
                    font-size:2rem;
                    line-height: 2.8rem;
                }
                .textWrapper.productPage .text2{
                    font-size:1.2rem;
                    margin-bottom:1.6rem;
                }
                .textWrapper.productPage .text1{
                    margin-bottom:0;
                }
                .textWrapper.productPage{
                    text-align:center;
                }
            }
         `}</style> 
        </>
    )
}
