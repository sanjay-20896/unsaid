import React from 'react'
import RichContentCard from './RichContentCard'
import {MOBILE_BREAKPOINT} from '../config'
import Sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url";
import {connect} from 'react-redux'
import { useEffect, useRef, useState } from 'react';
const imageBuilder = imageUrlBuilder(Sanity)
const urlFor = source => imageBuilder.image(source)
import {getImageUrl} from "../functions"
function RichContentCards(props) {
    const [minHeadingHeight,setMinHeadingHeight] = useState("auto")
    const [minDescHeight,setMinDescHeight] = useState("auto")
    const headingRef = useRef([]);
    const descRef = useRef([]);
    useEffect(()=>{
        let max = 0 
        for(let i=0;i<headingRef.current.length;i++){
            if(headingRef.current[i].getBoundingClientRect().height > max)
                max = headingRef.current[i].getBoundingClientRect().height
            // console.log("************item heights rich content cards module",i,headingRef.current[i].getBoundingClientRect().height)
        }
        setMinHeadingHeight(`${max}px`);
        let maxDesc = 0 
        for(let i=0;i<descRef.current.length;i++){
            if(descRef.current[i].getBoundingClientRect().height > maxDesc)
                maxDesc = descRef.current[i].getBoundingClientRect().height
            // console.log("**********item desc heights rich content cards",i,descRef.current[i].getBoundingClientRect().height)
        }
        setMinDescHeight(`${maxDesc}px`);
    },[props.common.windowWidth]) 
    return (
        <>
            <div className="richContentCards paddedContent">
                {props.richContentCards.map((card,index)=>{
                    if(!!card.image && !!card.title && !!card.description && !!card.width && !!card.height)
                    return(
                        <div key={index} className="singleCard">
                            <RichContentCard 
                                index={index}
                                headingRef={headingRef}
                                descRef={descRef}
                                minHeadingHeight={minHeadingHeight}
                                minDescHeight={minDescHeight}
                                heading={card.title}
                                desc={card.description}
                                img={getImageUrl(card.image,!!card.width?Math.ceil(card.width):421)}
                                imgPlaceholder={getImageUrl(card.image,20)}
                                alt={"single-card"}
                                width={!!card.width?card.width:421}
                                height={!!card.height?card.height:314}
                            />
                        </div>
                    )
                })}
            </div>  
            <style jsx>{`
                .richContentCards{
                    display:flex;
                    margin-right:-2.4rem;
                }
                .singleCard{
                    flex:1 1 100%;
                    padding-right:2.4rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .richContentCards{
                        display:block;
                        margin-right:0rem;
                    }
                    .singleCard{
                        width:100%;
                        padding-right:0rem;
                        margin-bottom:4.8rem;
                    }
                    .singleCard:last-child{
                        margin-bottom:0rem;
                    }
                }
            `}</style> 
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(RichContentCards)