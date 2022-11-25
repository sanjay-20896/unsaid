
import Sanity from './../sanity'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import { MOBILE_BREAKPOINT } from '../config';
import LazyImage from './lazyImage';
import {getImageUrl} from "../functions"
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables';
export default function singleImage(props){
    return (
        <>
        <div className={`paddedContent banner ${props.fullBleed?"fullBleed":""}`}>
           <LazyImage
            alt="Product image"
            originalSrc={getImageUrl(props.image,Math.ceil(props.width))}
            placeholderSrc={getImageUrl(props.image,20)}
            width={props.width}
            height={props.height}/>
        </div>
        <style jsx>{`
        .banner{
            padding-left:10%;
            padding-right:10%;
        }
        .fullBleed.banner{
            padding-left:0%;
            padding-right:0%;
        }
        @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
            .banner{
                padding-left:${paddingLeftMobile};
                padding-right:${paddingRightMobile};
            }
            .fullBleed.banner{
                padding-left:0%;
                padding-right:0%;
            }
        }
        `}</style>
        </>
    )
}