import { MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT } from "../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url";
import LazyImage from "./lazyImage";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {paddingLeftDesktop,paddingRightDesktop,paddingLeftMobile,paddingRightMobile} from '../data/cssVariables'
function contentItem(props){
    return(
        <>
            <div className="contentWrapper">
                {Array.isArray(props.items) && props.items.map((item)=>{
                    return(
                        <>
                            <div className="container">
                                <div className="imageWrapper">
                                    <LazyImage 
                                    alt={"product image"} 
                                    originalSrc={getImageUrl(item.imageDesktop,533)} 
                                    placeholderSrc={getImageUrl(item.imageDesktop,20)}
                                    width={533} 
                                    height={710} 
                                />
                                </div>
                                <div className="name font24-notResponsive canelaThin">{item.heading}</div>
                                <div className="desc font16-notResponsive anoHalfRegular" >{item.description}</div>
                            </div>
                        </>
                    )
                })}
            </div>
            <style jsx>{`
            .contentWrapper{
                display:flex;
                // padding:0 12.15%;
                padding-left:${paddingLeftDesktop};
                padding-right:${paddingRightDesktop};
                margin-right:-2.4rem;
            }
            .container{
                width:50%;
                padding-right:2.4rem;
            }
            .imageWrapper{
                margin-bottom:3.2rem;
            }
            .name{
                margin-bottom:1.6rem;
            }
            .desc{
                padding-right:11.1rem;
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .desc{
                    padding-right:5rem;
                }
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .contentWrapper{
                    display:block;
                    padding:0 3.6rem;
                    padding-left:${paddingLeftMobile};
                    padding-right:${paddingRightMobile};
                    margin-right:0rem;
                }
                .container{
                    width:100%;
                    padding-right:0rem;
                    margin-bottom:4.8rem;
                }
                .container:last-child{
                    margin-bottom:0rem;
                }
                .imageWrapper{
                    margin-bottom:2.4rem;
                }
                .name{
                    margin-bottom:2.4rem;
                }
                .desc{
                    padding-right:0rem;
                }
                
            }
            `}</style>
        </>
    )
}
export default contentItem;