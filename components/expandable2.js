import React, { useEffect, useRef, useState } from 'react'
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import PlusButton from '../components/plusButton'
export default function expandable(props) {
    const expandableWrapperRef = useRef();
    function setExpand(bool){
        if(props.setExpand)
            props.setExpand(bool)
    }
    useEffect(()=>{
        if(props.expand && props.onExpandScrollIntoView){
            let buffer = props.scrollSubtractBuffer?props.scrollSubtractBuffer:0
            let subtract = props.scrollIntoViewSubtractDesktop
            if(window.innerWidth <= MEDIUM_BREAKPOINT)
                subtract = props.scrollIntoViewSubtractMedium
            if(window.innerWidth <= TABLET_LANDSCAPE_BREAKPOINT)
                subtract = props.scrollIntoViewSubtractTablet
            if(window.innerWidth <= MOBILE_BREAKPOINT)
                subtract = props.scrollIntoViewSubtractMobile
            let top = expandableWrapperRef.current.offsetTop - subtract - buffer
            top = top<0?0:top 
            window.scrollTo({
                top
                // behavior: 'smooth'
            });
        }
    },[props.expand])
    return (
        <>
         <div ref={expandableWrapperRef} className={`expand positionRelative ${props.expand?"show":""} ${props.disabled?"disabled":""}`}>
            <div onClick={()=>setExpand(!props.expand)} className="expandTop">
                <h1 className={`outerHeading alignLeft ${!!props.headingFontSize?props.headingFontSize:"font24"} ${!!props.headingFont?props.headingFont:"canelaThin"}`}>
                    <span>{props.heading}</span>
                    {!!props.heading2 &&
                        <span className={`grey ${props.heading2FontSize}`}> {props.heading2}</span>
                    }
                </h1>
                <div className="plusButtonWrap positionAbsolute">
                    <PlusButton minus={props.expand} disabled={props.disabled} />
                </div>
            </div>
            <div className="contentContainer">
                {props.content}
            </div>
         </div>   
         <style jsx>{`
            .expandTop{
                padding: 1.6rem 0 1.6rem 0;
                cursor:pointer;
            }
            .expand{
                border-top:${props.borderTop?"1px solid #787878":"none"};
                border-bottom:${props.borderBottom?"1px solid #787878":"none"};
            }            
            .contentContainer{
                padding:0 0;
                height:0;
                overflow:hidden;
                // transition:all 0.15s linear;
            }
            .expand.show .contentContainer{
                padding:2.4rem 0 3.2rem;
                height:auto;
                // transition:all 0.15s linear;
            }
            .plusButtonWrap{
                top:3rem;
                right:0;
                transform:translateY(-50%);
            }
            .outerHeading{
                padding-right: 3rem;
            }
            .disabled .outerHeading{
                color:#cecece;
            }
            .disabled .expandTop{
                cursor:default;
            }
            .expand.disabled{
                border-top:${props.borderTop?"1px solid #cecece":"none"};
                border-bottom:${props.borderBottom?"1px solid #cecece":"none"};
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .outerHeading{
                    font-size: 2rem;
                    line-height: 2.8rem;
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .outerHeading{
                    font-size: 2rem;
                    line-height: 2.8rem;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .outerHeading{
                    font-size:${props.headingSmallMobile?"1.6rem":props.headingFontSizeMobile?props.headingFontSizeMobile:"2.4rem"};
                    line-height: ${props.headingSmallMobile?"2.4rem":props.headingLineHeightMobile?props.headingLineHeightMobile:"3.2rem"}
                }
                .expand.show .contentContainer{
                    padding:3.2rem 0 2.4rem;
                } 
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .outerHeading{
                    font-size:${props.headingSmallMobile?"1.6rem":props.headingFontSizeMobile?props.headingFontSizeMobile:"2.4rem"};
                    line-height: ${props.headingSmallMobile?"2.4rem":props.headingLineHeightMobile?props.headingLineHeightMobile:"3.2rem"}
                }
                .expand.show .contentContainer{
                    padding:3.2rem 0 2.4rem;
                }
            }


         `}</style>
        </>
    )
}
