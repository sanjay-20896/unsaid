import Sanity from './../sanity'
import imageUrlBuilder from "@sanity/image-url";
import { MOBILE_BREAKPOINT } from '../config';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import LazyImage from './lazyImage';
import {getImageUrl} from "../functions"
import {paddingLeftDesktop,paddingRightDesktop,paddingLeftMobile,paddingRightMobile} from '../data/cssVariables'

export default function imageColumn(props){
    return(
        <>
            <div className="alignCenter">
                <div className="columnWrapper">
                    {Array.isArray(props.images) && props.images.map((img)=>{return (
                        <>
                         <div> 
                            {img.image &&
                                <LazyImage
                                    alt="Image"
                                    originalSrc={getImageUrl(img.image)}
                                    placeholderSrc={getImageUrl(img.image,20)}
                                    width={img.width?img.width:533}
                                    height={img.height ? img.height:710}
                                />
                            }
                        </div>
                        {/* <div>
                            {props?.images[1]?.image &&
                                <LazyImage
                                alt="Image"
                                originalSrc={getImageUrl(props.images[1].image,!!props.images[1]?.width ? Math.ceil(props.images[1].width):533)}
                                placeholderSrc={getImageUrl(props.images[1].image,20)}
                                width={!!props.images[1].width ? props.images[1].width:533}
                                height={!!props.images[1].height ? props.images[1].height:710}/>
                            }
                        </div> */}
                        </>
                    )})}
                    {/* <div> 
                        {props?.images[0]?.image &&
                            <LazyImage
                                alt="Image"
                                originalSrc={getImageUrl(props.images[0].image,!!props.images[0]?.width ? Math.ceil(props.images[0].width):533)}
                                placeholderSrc={getImageUrl(props.images[0].image,20)}
                                width={!!props.images[0].width?props.images[0].width:533}
                                height={!!props.images[0].height ? props.images[0].height:710}
                            />
                        }
                    </div>
                    <div>
                        {props?.images[1]?.image &&
                            <LazyImage
                            alt="Image"
                            originalSrc={getImageUrl(props.images[1].image,!!props.images[1]?.width ? Math.ceil(props.images[1].width):533)}
                            placeholderSrc={getImageUrl(props.images[1].image,20)}
                            width={!!props.images[1].width ? props.images[1].width:533}
                            height={!!props.images[1].height ? props.images[1].height:710}/>
                        }
                    </div> */}
                </div>
            </div>
            <style jsx>{`
                .columnWrapper{
                    flex-wrap: wrap;
                    display:flex;
                    // padding:0 12.15%;
                    padding-left:${paddingLeftDesktop};
                    padding-right:${paddingRightDesktop};
                    margin-right:-2.4rem;
                }
                .columnWrapper div{
                    margin-bottom: 2.4rem;
                    width:50%;
                    padding-right:2.4rem;
                }
                .columnWrapper div:nth-last-child(-n+2){
                    margin-bottom: 0rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .columnWrapper{
                        display:block;
                        margin-right:0rem;
                        padding-left:${paddingLeftMobile};
                        padding-right:${paddingRightMobile};
                    }
                    .columnWrapper div{
                        width:100%;
                        padding-right:0rem;
                        margin-bottom: 1.6rem;
                    }
                    .columnWrapper div:nth-last-child(-n+2){
                        margin-bottom: 1.6rem;
                    }
                    .columnWrapper div:last-child{
                        margin-bottom: 0rem;
                    }
                }
            `}</style>
        </>
    )
}