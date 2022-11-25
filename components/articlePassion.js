import React,{useRef, useState} from 'react'
import ThreeStepText from './threeStepText'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link'
import Caret from './caret'
import {MOBILE_BREAKPOINT} from '../config'
import Slider from "react-slick";
import LazyImage from './lazyImage';
import {paddingLeftDesktop,paddingRightDesktop,paddingLeftMobile,paddingRightMobile} from '../data/cssVariables'
export default function ArticlePassion(props) {
    const [imageDetail, setImageDetail] = useState(props.imageDetails[0]);
    const [animation, setAnimation] = useState("none");
    const [hoveredIndexId, setHoveredIndexId] = useState(null);

    const slider=useRef();
    
    function setData(id){
        setHoveredIndexId(id)
        setImageDetail(props.imageDetails[id]);
        setAnimation("opacityNone");
        setTimeout(()=>{
            setAnimation("fadeUpAnimation");
        },50)
    }

    var settings = {
        dots: false,
        infinite: true,
        arrows:false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "28px",
        beforeChange: (current, next) => setData(next)
    };

    let imageWidth=100 / props.images.length;
    return (
        <>
            <div className="articlePassion ">
                <div className="topText">
                    <ThreeStepText
                        smallText={props.smallText}
                        largeText={props.largeText}
                        desc={props.desc}
                        descFont16={true}
                    />
                </div>
                <div onMouseLeave={()=>setHoveredIndexId(null)} className="hideForMobile paddedContent">
                    <div className="passionImages">
                        {props.images.map((image,index)=>{
                            return(
                                <div onMouseEnter={()=>setData(index)} key={index} className="singleImage">
                                    <Link href={props.imageDetails[index].link}><a>
                                        <LazyImage 
                                            alt={"Product image"} 
                                            originalSrc={image.img} 
                                            placeholderSrc={image.imgPlaceholder}
                                            width={310}
                                            height={527}
                                        />
                                        <div className="belowPart desktop alignCenter paddedContent">
                                            <p className={`belowText font16-notResponsive anoHalfRegular ${hoveredIndexId==index?"fadeUpAnimation":"opacityNone"}`}>{props.imageDetails[index].belowText}</p>
                                            <div style={{animationDelay:"0.2s"}} className={`linkText font16 anoRegular ${hoveredIndexId==index?"fadeUpAnimation":"opacityNone"}`}>{props.imageDetails[index].linkText} <span className="sizeArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></div>
                                        </div>
                                    </a></Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
               <div className="showForMobile imageSlider">
                    <Slider ref={slider} {...settings}>
                        {props.images.map((image,index)=>{
                            return(
                                <div key={index} className="singleImageSlider">
                                    <Link href={props.imageDetails[index].link}><a>
                                        <LazyImage 
                                            alt={"Product image"} 
                                            originalSrc={image.img} 
                                            placeholderSrc={image.imgPlaceholder}
                                            width={303} 
                                            height={515}
                                        />
                                    </a></Link>
                                </div>
                            )
                        })}
                    </Slider>
               </div>
                {!!imageDetail &&
                <div className="belowPart showForMobile alignCenter paddedContent">
                    <Link href={imageDetail.link}><a>
                        <p className={`belowText font16-notResponsive anoHalfRegular ${animation}`}>{imageDetail.belowText}</p>
                        <div style={{animationDelay:"0.2s"}} className={`linkText font16 anoRegular ${animation}`}>{imageDetail.linkText} <span className="sizeArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></div>
                    </a></Link>
                </div>}
            </div> 
            <style jsx>{`
                .belowPart.desktop{
                    padding: 30px 20px 0;
                }
                .belowPart.desktop .belowText{
                    padding: 0;
                }
                .topText{
                    margin-bottom:9.6rem;
                    // padding:0 27%;
                    padding-left:${paddingLeftDesktop};
                    padding-right:${paddingRightDesktop};
                }
                .opacityNone{
                    opacity:0;
                }
                .imageSlider{
                    margin-bottom:2.4rem;
                }
                .singleImageSlider{
                    padding:0 8px;
                }
                .belowText{
                    margin-bottom:3.2rem;
                    padding: 0 39%;
                }
                .linkText span{
                    margin-left:0.8rem;
                }
                .passionImages{
                    display:flex;
                    margin-right:-2.4rem;
                    margin-bottom:3.2rem;
                }
                .singleImage{
                    width:${imageWidth}%;
                    padding-right:2.4rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .topText{
                        margin-bottom:0rem;
                        // padding:0 3.6rem;
                        padding-left:${paddingLeftMobile};
                        padding-right:${paddingRightMobile};
                    }
                    .belowText{
                        padding: 0 0%;
                    }
                }
            `}</style>  
        </>
    )
}