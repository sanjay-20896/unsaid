import React, { useEffect, useState } from 'react'
import Caret from '../components/caret'
import {MOBILE_BREAKPOINT} from '../config'
import PlusButton from './plusButton'
export default function expandable(props) {
    function rowClicked(row,e){
        e.stopPropagation()
        if(props.sizeClicked && props.spec.title=="Size Guide")
        props.sizeClicked(row.column1Value)
    }
    return (
        <>
         <div className={`expand positionRelative ${props.expandableActive===props.indexValue?"show":""}`}>
            <div>
                <h1 className="outerHeading canelaThin font24">{props.spec.title}</h1>
                <div className="plusButtonWrap positionAbsolute">
                    <PlusButton minus={props.expandableActive===props.indexValue} />
                </div>
            </div>
            <div className="contentContainer">
                {!!props.spec.text1 &&  props.spec.title!="Size Guide" && <div className="content anoHalfRegular font16">{props.spec.text1}</div>}
                {props.spec.title=="Size Guide" &&
                    <div className="sizeFormat">
                        <h3 className="sizeHeading anoRegular font16">{props.spec.text1}</h3>
                        <h3 className="content anoHalfRegular font16">{props.spec.text2}</h3>
                        <h3 className="completeGuide anoRegular font16">{props.spec.text3}<span className="sizeArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span></h3>
                        <div className="sizeGuide">
                           {!!props.spec.twoColumnTable && 
                                <div className="sizeGuideHeading">
                                    <h1 className="anoRegular font16">{props.spec.twoColumnTable.column1heading?props.spec.twoColumnTable.column1heading:""}<span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></span></h1>
                                    <h1 className="anoRegular font16">{props.spec.twoColumnTable.column2heading?props.spec.twoColumnTable.column2heading:""}<span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></span></h1>
                                </div>
                            }
                            {!!props.spec.twoColumnTable && Array.isArray(props.spec.twoColumnTable.twoColumnTableRows) && props.spec.twoColumnTable.twoColumnTableRows.map(row=>{
                                return(
                                    <div key={row._key} onClick={(e)=>rowClicked(row,e)} className={`sizesList ${props.currentSize===row.column1Value?"active":""}`}>
                                        <h1 className="anoHalfRegular font16">{row.column1Value}</h1>
                                        <h1 className="anoHalfRegular font16">{row.column2Value}</h1>
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
                padding:1.6rem 0 ${props.expandableActive===props.indexValue?"0":"1.6rem"} 0;
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
                padding:3.2rem 0;
                height:auto;
                //transform:translateY(0rem);
                transition:all 0.4s linear;
            }
            .plusButtonWrap{
                top:3rem;
                right:0;
                transform:translateY(-50%);
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .outerHeading{
                    font-size:2.4rem;
                }
                .contentContainer .font16{
                    font-size:1.6rem;
                    line-height:2.4rem;
                }
            }

         `}</style>
        </>
    )
}
