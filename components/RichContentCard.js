import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import LazyImage from './lazyImage';
export default function RichContentCard(props) {
    return (
        <>
            <div className="richContentCard">
                <h1 className="heading alignCenter canelaThin font32 additionalPaddingMobile" ref={el => props.headingRef.current[props.index] = el}>{props.heading}</h1>
                <p className="desc alignCenter hideForMobile canelaThin font16-notResponsive additionalPaddingMobile" ref={el => props.descRef.current[props.index] = el}>{props.desc}</p>
                <div className="cardImage">
                    {/* <LazyLoadImage
                        alt="Product image"
                        src={props.img}
                        width="100%"
                        placeholderSrc={props.imgPlaceholder}
                        effect="blur"
                    /> */}
                    <LazyImage 
                        alt={"product image"} 
                        originalSrc={props.img} 
                        placeholderSrc={props.imgPlaceholder}
                        width={props.width} 
                        height={props.height} 
                    />
                </div>
                <p className="desc alignCenter showForMobile canelaThin font16-notResponsiv additionalPaddingMobile">{props.desc}</p>
            </div>   
            <style jsx>{`
                .heading,.desc{ 
                    margin-bottom:2.4rem;
                }
                .desc{
                    padding: 0 11%;
                    min-height:${props.minDescHeight};
                } 
                .heading{
                    min-height:${props.minHeadingHeight};
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .cardImage{
                        margin-bottom:2.4rem;
                    }
                    .desc{
                        margin-bottom:0rem;
                    }
                    .desc{
                        padding: 0 0%;
                    } 
                }
            `}</style>
        </>
    )
}
