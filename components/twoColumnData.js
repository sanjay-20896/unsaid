import { MOBILE_BREAKPOINT } from "../config";
import Sanity from './../sanity'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from "./lazyImage";
import {getImageUrl} from "../functions"
function columnData(props){
    return(
        <>
        <div className="hideForMobile paddedContent">
            <div className="columnWrapper">
                <div className="row">
                    <div className="column">
                        
                         <LazyImage 
                                    alt={"gift image"} 
                                    originalSrc={getImageUrl(props?.giftData?.image,!!props.giftData.width?Math.ceil(props.giftData.width):533)} 
                                    placeholderSrc={getImageUrl(props?.giftData?.image,20)}
                                    width={!!props?.giftData?.width ? props.giftData.width:533} 
                                    height={!!props?.giftData?.height ? props.giftData.height:710} 
                                />
                    </div>
                    <div className="column col-2">
                        <div className="textWrapper">
                            <div className="text1 font32 canelaThin">{props.giftData.title}</div>
                            <div className="text2 font16 canelaThin">{props.giftData.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="showForMobile paddedContent">
            <div className="columnWrapper alignCenter">
                <LazyImage 
                    alt={"gift image"} 
                    originalSrc={getImageUrl(props?.giftData?.image,!!props.giftData.width?Math.ceil(props.giftData.width):303)} 
                    placeholderSrc={getImageUrl(props?.giftData?.image,20)}
                    width={!!props?.giftData?.width ? props.giftData.width:303} 
                    height={!!props?.giftData?.height ? props.giftData.height:404} 
                />
                <div className="text1 font24 canelaThin">{props.giftData.title}</div>
                <div className="text2 font16-notResponsive canelaThin">{props.giftData.description}</div>
            </div>
        </div>
        <style jsx>{`
        .columnWrapper{
            padding-left:11.1rem;
            padding-right:11.1rem;
        }
        .row{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
            align-items:center;
        }
        .column{
            display:flex;
            flex-direction:column;
            flex-wrap:wrap;
            width:50%
        }
        .textWrapper{
            padding-left:13.5rem;
            // padding-top:50%;
            
        }
        .text1{
            padding-bottom:3.2rem;
        }
        @media screen and (max-width:${MOBILE_BREAKPOINT}px){
            .columnWrapper{
                padding-left:0rem;
                padding-right:0rem;
            }
            img{
                padding-bottom:3.2rem;
            }
            .text1{
                margin-top:2.4rem;
                padding-bottom:2.4rem;
            }

        }
        `}</style>
        </>
    )
}


export default columnData;