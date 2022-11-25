import React, { useState } from 'react'
import LazyImage from './lazyImage'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import Video from './video'
function twoColumnImage(props) {
    const [img1Loaded, setImg1Loaded] = useState(false)
    const [img2Loaded, setImg2Loaded] = useState(false)
    function imageClick(imageType){
        if(props.showGalleryModal)
            props.showGalleryModal({status:true,imageType:imageType})
    }
    // console.log("m1Video",props.m1Video);
    // console.log("m2Video",props.m2Video);
    return (
        <>
         <div className={`twoImageWrapper paddedContent img1Loaded img2Loaded ${img1Loaded?"":""} ${img2Loaded?"":""}`}>
            <div  className="firstImg ">
                <div className="imageWrap">
                    {/* {!!props.img1 &&
                        <LazyImage 
                            alt={props.alt1}
                            originalSrc={props.img1} 
                            placeholderSrc={props.img1Blur}
                            width={858} 
                            height={858} 
                            afterLoad={()=>setImg1Loaded(true)}
                        />
                    } */}
                    {!!props.m1Video ? 
                        <Video videoUrl={props.m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                     : 
                    <div className="image" onClick={()=>{!!props.showGalleryModal && !!props.imageType1 && props.showGalleryModal({status:true,imageType:props.imageType1})}}>
                        {!!props.img1 &&
                            <LazyImage 
                                    alt={props.alt1}
                                    originalSrc={props.img1} 
                                    width={858} 
                                    height={858} 
                                    afterLoad={()=>setImg1Loaded(true)}
                            />
                        }
                    </div>}
                </div>
            </div>
            {props.withText?
                <div className="textCol">
                    <h2 className="anoHalfRegular font20">{props.smallText}</h2>
                    <h1 className="canelaThin font32">{props.largeText}</h1>
                    <h3 className="anoHalfRegular font16">{props.content}</h3>
                </div>
                :
                <div  className="secondImg">
                    <div className="imageWrap">
                        <div className="image" onClick={()=>{!!props.showGalleryModal && !!props.imageType2 && props.showGalleryModal({status:true,imageType:props.imageType2})}}>
                            {!!props.img2 &&
                                <LazyImage 
                                    alt={props.alt1}
                                    originalSrc={props.img2}
                                    width={858} 
                                    height={858} 
                                    afterLoad={()=>setImg1Loaded(true)}
                                />
                            }
                        </div>
                    {/* {!!props.m2Video ? 
                        <Video   videoUrl={props.m2Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                     : <div className="image" onClick={()=>{imageClick()}}>
                        <LazyImage 
                            alt={props.alt1}
                            originalSrc={props.img2} 
                            placeholderSrc={props.img2Blur}
                            width={858} 
                            height={858} 
                            afterLoad={()=>setImg1Loaded(true)}
                        />
                        </div>} */}

                    </div>
                </div>
            }
         </div>  
         
         <style jsx>{`
            // .imageWrap{
            //     background:#f2f2f2;
            // }
            .firstImg, .secondImg{
                transform:translateY(1rem);
                opacity:0;
                transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .1s,transform 1.2s cubic-bezier(.215,.61,.355,1) .1s;
            }
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
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .textCol h2{
                    margin-bottom:2.4rem;
                }
                .textCol h1{
                    margin-bottom:1.9rem;
                }
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
                    line-height:2rem;
                    margin-bottom:1.6rem;
                }
                .textCol h1{
                    margin-bottom:1.6rem;
                    padding-right:1rem;
                }
                .font16{
                    font-size:1.6rem;
                    line-height:2.4rem;
                }
            }

         `}</style> 
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(twoColumnImage)