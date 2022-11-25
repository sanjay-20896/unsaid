import { MOBILE_BREAKPOINT } from "../config";
import ThreeStepText from "./threeStepText";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from "./lazyImage";
export default function StoryTelling(props){
    return(
        <>
            <div className="giftStoryTelling">
                <div className="topText">
                    <ThreeStepText
                        smallText={props.smallText}
                        largeText={props.largeText}
                        desc={props.desc}
                        descFont16={true}
                        topTextLeftAlignForMobile={props.topTextLeftAlignForMobile}
                    />
                </div>
                <div className="imageWrapper">
                    <div className="landscapeImageWrapper">
                        {/* <LazyLoadImage
                            alt="Product image"
                            src={props.bigImage}
                            placeholderSrc={props.bigImagePlaceholder}
                            effect="blur"
                            width="100%"
                        /> */}
                        <LazyImage 
                                    alt={"Product image"} 
                                    originalSrc={props.bigImage} 
                                    placeholderSrc={props.bigImagePlaceholder}
                                    width={props.bigImageWidth} 
                                    height={props.bigImageHeight}
                                />
                    </div>
                    <div className="portraitImageWrapper">
                        <div>
                            <div className="smallImage">
                                 <LazyImage 
                                    alt={"Product image"} 
                                    originalSrc={props.smallImage} 
                                    placeholderSrc={props.smallImagePlaceholder}
                                    width={props.smallImageHeight} 
                                    height={props.smallImageWidth}
                                />
                            </div>
                            <div className="caption hideForMobile font16 canelaThin alignCenter">{props.caption}</div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .giftStoryTelling{
                    padding:0 6.4rem;
                }
                .smallImage{
                    margin-bottom:1.6rem;
                }
                .imageWrapper{
                    display:flex;
                }
                .landscapeImageWrapper{
                    width:66%;
                }
                .portraitImageWrapper{
                    width:34%;
                    padding:11.1rem 11.1rem 0 13.5rem;
                }
                .topText{
                    margin-bottom:9.6rem;
                    padding: 0 26%;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                   .topText{
                        padding:0 3.6rem;
                        margin-bottom:6.4rem;
                   } 
                   .giftStoryTelling{
                        padding:0 0rem;
                    }
                    .imageWrapper{
                        display:block;
                    }
                    .landscapeImageWrapper{
                        width:100%;
                    }
                    .portraitImageWrapper{
                        width:100%;
                        padding:4rem 3.6rem 0 3.6rem;
                    }
                    .smallImage{
                        margin-bottom:0rem;
                    }
                }
            `}
            </style>
        </>
    )
}