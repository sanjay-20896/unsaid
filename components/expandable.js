import React, { useEffect, useRef, useState } from 'react'
import Caret from '../components/caret'
import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import BlockContent from '@sanity/block-content-to-react'
export default function expandable(props) {
    const [expand, setExpand] = useState(false)
    useEffect(()=>{
        if(props.sizeGuideOpen){
            setExpand(true)
        }
    },[props.sizeGuideOpen])

    useEffect(()=>{
        if(props.expandableActive===props.indexValue){
            setExpand(true)
        }else{
            setExpand(false)
        }
    },[props.expandableActive])
    
    // console.log(props.expandableActive, props.indexValue);
    // console.log(props.content)
    return (
        <>
         <div className={`expand positionRelative ${expand?"show":""}`}>
            <div onClick={()=>setExpand(!expand)}>
                <h1 className={`outerHeading ${!!props.headingFontSize?props.headingFontSize:"font24"} ${!!props.headingFont?props.headingFont:"canelaThin"}`}>{props.heading}</h1>
                <div className="plusButtonWrap positionAbsolute"><span className="plusButton positionRelative"></span></div>
            </div>
            <div className="contentContainer">
                {!!props.content && <h3 className="content anoHalfRegular font16-notResponsive">{props.content}</h3>}
                {!!props.answer &&
                 <div className="answer content anoHalfRegular font16-notResponsive">
                    {/* <BlockContent blocks={props.answer}/> */}
                </div>}
                {!!props.sizeFormat &&
                    <div className="sizeFormat">
                        <h3 className="sizeHeading anoRegular font16-notResponsive">{props.sizeFormat.headingOne}</h3>
                        <h3 className="content anoHalfRegular font16-notResponsive">{props.sizeFormat.content}</h3>

                        <h3 className="completeGuide anoRegular font16-notResponsive">Complete guide<span className="sizeArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span></h3>
                        <div className="sizeGuide">
                            <div className="sizeGuideHeading">
                                <h1 className="anoRegular font16-notResponsive">Size(EU)<span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></span></h1>
                                <h1 className="anoRegular font16-notResponsive">Inside (mm)<span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></span></h1>
                            </div>
                            {!!props.sizeFormat && props.sizeFormat.sizes.map((size,index)=>{
                                return(
                                    <div key={index} onClick={()=>{props.sizeValueUpdate(size.size)}} className={`sizesList ${props.currentSize===size.size?"active":""}`}>
                                        <h1 className="anoHalfRegular font16-notResponsive">{size.size}</h1>
                                        <h1 className="anoHalfRegular font16-notResponsive">{size.sizeMM}</h1>
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>
                }
            </div>
         </div>   
         <style jsx>{`
            
            .expand{
                padding:2.4rem 0 ${expand?"0":"2.4rem"} 0;
                border-top:${props.borderTop?"1px solid #787878":"none"};
                border-bottom:${props.borderBottom?"1px solid #787878":"none"};
                cursor:pointer;
            }
            .sizesList{
                margin-bottom:2.4rem;
            }
            .sizesList:last-child{
                margin-bottom:0rem;
            }
            .sizesList:hover, .sizesList.active{
                background:#00000012;
            }
            .sizeGuideHeading, .sizesList{
                display:flex;
            }
            .sizeGuideHeading{
                margin-bottom:2.4rem;
            }
            .sizeGuide{
                //display:flex;
            }
            .sizeGuideHeading h1, .sizesList h1{
                width:50%;
            }
            .sizesList h1{
                padding-left:1.2rem;
            }
            .sizeFormat .sizeHeading{
                margin-bottom:1.6rem;
            }
            .sizeFormat .content{
                margin-bottom:3.2rem;
            }
            .sizeArrow{
                margin-left:0.8rem;
            }
            .completeGuide{
                padding-bottom:3.2rem;
                border-bottom:1px solid #787878;
                margin-bottom:3.2rem;
            }
            .contentContainer{
                padding:0 0;
                height:0;
                overflow:hidden;
                //transform:translateY(-2rem);
                transition:all 0.4s linear;
            }
            .expand.show .contentContainer{
                //padding:3.2rem 0;
                padding:2.4rem 0 3.2rem;
                height:auto;
                //transform:translateY(0rem);
                transition:all 0.4s linear;
            }
            .plusButtonWrap{
                top:3rem;
                right:0;
                transform:translateY(-50%);
            }
            .plusButton::after{
                content:"";
                position:absolute;
                top:5px;
                right:0;
                height:1px;
                width:24px;
                background:#000000;
                transition:all 0.4s ease-out;
            }
            .plusButton::before{
                content:"";
                position:absolute;
                top:5px;
                right:0;
                height:1px;
                width:24px;
                background:#000000;
                transform: rotate(90deg);
                transition:all 0.4s ease-out;
            }
            .expand.show .plusButton::after{
                opacity:0;
            }
            .expand.show .plusButton::before{
                transform: rotate(0);
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .plusButton::after{
                    width:21px;
                }
                .plusButton::before{
                    width:21px;
                }
                .outerHeading{
                    font-size: 2rem;
                    line-height: 2.8rem;
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .plusButton::after{
                    width:18px;
                }
                .plusButton::before{
                    width:18px;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .plusButton::after{
                    width:14px;
                }
                .plusButton::before{
                    width:14px;
                }
                .outerHeading{
                    font-size: 1.6rem;
                    line-height: 2.4rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .outerHeading{
                    font-size:${props.headingSmallMobile?"1.6rem":"2.4rem"};
                    line-height: 2.4rem;
                }
                .plusButton::after{
                    width:16px;
                }
                .plusButton::before{
                    width:16px;
                }
            }

         `}</style>
        </>
    )
}
