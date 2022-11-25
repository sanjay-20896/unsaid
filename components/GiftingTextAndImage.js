import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {MOBILE_BREAKPOINT} from '../config'
import LazyImage from './lazyImage';
export default function GiftingTextAndImage(props) {
    return (
        <>
            <div className="giftingTextAndImage">
                <div className="topText standardPaddingBottom2 textArrayCenter alignCenter">
                    <h2 className="shortHeading font20 anoHalfRegular">{props.shortHeading}</h2>
                    <h1 className="bigHeading canelaThin font32-notResponsive">{props.bigHeading}</h1>
                    <p className="desc font16-notResponsive canelaThin">{props.desc}</p>
                </div>
                <div className="giftingImage">
                <LazyImage
                     alt="Product image"
                     originalSrc={props.image}
                     placeholderSrc={props.imagePlaceholder}
                     width={props.width}
                     height={props.height}
                />
                </div>
            </div>   
            <style jsx>{`
                .shortHeading{
                    margin-bottom:3.2rem;
                }
                .bigHeading{
                    margin-bottom:2.4rem;
                    line-height: 40px;
                    letter-spacing: 0.03em;
                }
                .desc{
                    line-height: 28px;
                    letter-spacing: 0.03em;
                }
                .giftingImage{
                    padding:0 12.15%;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .shortHeading{
                        margin-bottom:1.6rem;
                        font-size:1.2rem;
                    }
                    .bigHeading{
                        margin-bottom:1.6rem;
                    }
                    .giftingImage{
                        padding:0 3.6rem;
                    }
                }
            `}</style>
        </>
    )
}
