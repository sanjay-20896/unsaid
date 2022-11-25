import { propTypes } from '@sanity/block-content-to-react';
import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT} from '../config'
import LazyImage from './lazyImage';
import video from "./video"
function twoColumnImage(props) {
    const [img1Loaded, setImg1Loaded] = useState(false)
    const [img2Loaded, setImg2Loaded] = useState(false)
    function imageClick(imageType){
        if(props.showGalleryModal)
            props.showGalleryModal({status:true,imageType:imageType})
    }
   
    return (
        <>
         <div className={`twoImageWrapper paddedContent ${img1Loaded?"img1Loaded":""} ${img2Loaded?"img2Loaded":""}`}>
            <div  className="firstImg image">
                {/* <LazyLoadImage
                    alt={"Model image"}
                    effect="opacity"
                    src={props.img1}
                    width="100%"
                    afterLoad={()=>setImg1Loaded(true)}
                    //placeholderSrc="/images/favourite.svg"
                /> */}
                {props.m1Video ?
                <>
                    <div className="hideForMobile">
                        <Video   videoUrl={props.m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={props.width} height={props.height} />
                    </div>
                    <div className="showForMobile">
                        <Video   videoUrl={props.m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={props.width} height={props.height} restrictedHeightAndWidth={true}/>
                    </div>
                </>: <div onClick={()=>imageClick(props.imageType1)} className="image"> 
                <LazyImage 
                    alt={props.alt1}
                    originalSrc={props.img1}
                    placeholder={props.img1Blur}
                    height={props.height}
                    width={props.width}
                />
                </div>
                }
            </div>
            {props.withText?
                <div className="textCol">
                    <h2 className="anoHalfRegular font20">{props.smallText}</h2>
                    <h1 className="canelaThin font32">{props.largeText}</h1>
                    <h3 className="anoHalfRegular font16-notResponsive">{props.content}</h3>
                </div>
                :
                <div className="secondImg">
                    {props.m2Video ?
                <>
                    <div className="hideForMobile">
                        <Video   videoUrl={props.m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={props.width} height={props.height} />
                    </div>
                    <div className="showForMobile">
                        <Video   videoUrl={props.m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={props.width} height={props.height} restrictedHeightAndWidth={true}/>
                    </div>
                </>: <div onClick={()=>imageClick(props.imageType2)} className="image"> 
                <LazyImage 
                    alt={props.alt1}
                    originalSrc={props.img2}
                    placeholder={props.img2Blur}
                    height={props.height}
                    width={props.width}
                />
                </div>
                }
                </div>
            } 
         </div>  
         
         <style jsx>{`
            .twoImageWrapper{
                display:flex;
                margin-right:-2.4rem;
                align-items: center;
            }
            .img1Loaded .firstImg, .img2Loaded .secondImg{
                transform:translateY(0rem);
                opacity:1;
            }
            .secondImg, .firstImg{
                width:50%;
                padding-right:2.4rem;
            }
            .textCol{
                padding-left:8%;
                width:50%;
                padding-right:calc(8% + 2.4rem);
                transform:translateY(2rem);
                opacity:0;
                transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .7s,transform 1.2s cubic-bezier(.215,.61,.355,1) .7s;
            }
            .img1Loaded .textCol{
                transform:translateY(0rem);
                opacity:1;
            }
            .textCol h2{
                margin-bottom:3.2rem;
            }
            .textCol h1{
                margin-bottom:2.4rem;
            }
            .image:hover{
                cursor: ${props.imageClickOpensGalleryModal?`url("/images/galleryOpen.svg"), auto`:"auto"};
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .freeSpace{
                    height:${!!props.mobileHeight?props.mobileHeight:props.height}
                } 
                .twoImageWrapper{
                    display:block;
                    margin-right:0rem;
                }
                .secondImg, .firstImg{
                    width:100%;
                    padding-right:0rem;
                }
                .firstImg{
                    margin-bottom:3.2rem;
                }
                .textCol{
                    padding-left:0%;
                    width:100%;
                    padding-right:0;
                }
                .textCol h2{
                    font-size:1.2rem;
                    margin-bottom:1.6rem;
                }
                .textCol h1{
                    font-size:2.4rem;
                    margin-bottom:1.6rem;
                    padding-right:1rem;
                }
         `}</style> 
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(twoColumnImage)