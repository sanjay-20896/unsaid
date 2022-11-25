import { MOBILE_BREAKPOINT } from "../config";
import TextArray from './textArray'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from "./lazyImage";

export default function ImageSlider(props){
    return(
        <>
            <div className="imageSlider paddedContent">
                {!!props.text && <div className="topText standardPaddingBottom2">
                    <TextArray text={props.text} textAlignLeft={false} descFontSize="font20"/>
                </div>}
                <div className="imageWrapper two showForMobile">
                    {/* <LazyLoadImage 
                        width="100%"
                        src={props.img2}
                        alt="Slider image 2"
                        effect="blur"
                        placeholderSrc={props.img2Placeholder}
                    /> */}
                    <LazyImage 
                        alt={"Product image"} 
                        originalSrc={props.img2} 
                        placeholderSrc={props.img2Placeholder}
                        width={props.img2Width} 
                        height={props.img2Height}
                    />
                    <div className="name alignCenter font16-notResponsive canelaThin">{props.img2Name}</div>
                </div>
                <div className="sliderWrapper">
                    <div className="imageWrapper one">
                        {/* <LazyLoadImage 
                            width="100%"
                            src={props.img1}
                            alt="Slider image 1"
                            effect="blur"
                            placeholderSrc={props.img1Placeholder}
                        /> */}
                        <LazyImage 
                            alt={"Product image"} 
                            originalSrc={props.img1} 
                            placeholderSrc={props.img1Placeholder}
                            width={props.img1Width} 
                            height={props.img1Height}
                        />
                        <div className="name alignCenter font16-notResponsive canelaThin">{props.img1Name}</div>
                    </div>
                    <div className="imageWrapper two hideForMobile">
                        <LazyImage 
                            alt={"Product image"} 
                            originalSrc={props.img2} 
                            placeholderSrc={props.img2Placeholder}
                            width={props.img2Width} 
                            height={props.img2Height}
                        />
                        <div className="name alignCenter font16-notResponsive canelaThin">{props.img2Name}</div>
                    </div>
                    <div className="imageWrapper three">
                        {/* <LazyLoadImage 
                            width="100%"
                            src={props.img3}
                            alt="Slider image 3"
                            effect="blur"
                            placeholderSrc={props.img3Placeholder}
                        /> */}
                        <LazyImage 
                            alt={"Product image"} 
                            originalSrc={props.img3} 
                            placeholderSrc={props.img3Placeholder}
                            width={props.img3Width} 
                            height={props.img3Height}
                        />
                        <div className="name alignCenter font16-notResponsive canelaThin">{props.img3Name}</div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .sliderWrapper{
                    display:flex;
                }
                .topText{
                    padding-right:35%;
                    padding-left:35%;
                }    
                .imageWrapper{
                    width:33.33%;
                }
                .imageWrapper img{
                    margin-bottom:2.4rem;
                }
                .imageWrapper.one{
                    padding-right:12.7rem;
                    padding-top:7.5rem;
                }
                .imageWrapper.two{
                    padding:0 0.8rem;
                }
                .imageWrapper.three{
                    padding-left:12.7rem;
                    padding-top:7.5rem;
                }
                .name{
                    margin-top:2.4rem;
                }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .name{
                    margin-top:1.6rem;
                }
                .topText{
                    padding-right:0%;
                    padding-left:0%;
                } 
                .sliderWrapper{
                    display:block;
                }
                .imageWrapper{
                    width:100%;
                    margin-bottom:4rem;
                }
                .imageWrapper.three{
                    margin-bottom:0rem;
                    padding-left:0rem;
                    padding-right:8.2rem;
                    padding-top:0rem;
                }
                .imageWrapper.one{
                    padding-right:8.2rem;
                    padding-left:8.2rem;
                    padding-top:0rem;
                }
                .imageWrapper.two div{
                    text-align:left;
                }
                .imageWrapper img{
                    margin-bottom:1.6rem;
                }
                .imageWrapper.three div{
                    text-align:left;
                }
            }
            `}</style>
        </>
    )
}