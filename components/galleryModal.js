import Sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import { MOBILE_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT } from '../config';
import { connect } from 'react-redux';
import Like from './likeProduct'
import React, { useState,useEffect, useRef } from 'react'
import LazyImage from './lazyImage';
import useTranslation from 'next-translate/useTranslation'

function GalleryModal(props){
    const [addToCartMouse,addToCartMouseEnter] = useState(false)
    const [galleryModalImages,setGalleryModalImages] = useState([])
    const gmRef = useRef(null);
    let btnContent = addToCartMouse?props.addToCartContentOnMouseHover:props.addToCartContent
    const {t}=useTranslation('common');

    useEffect(()=>{
        let firstImage;
        let remainingImage;
        firstImage=props.images.find((img)=>{return img.type===props.imageType})
        remainingImage=props.images.filter((img)=>{return  img.type!=props.imageType})
        let gallery=[].concat([firstImage]).concat(remainingImage)
        setGalleryModalImages(gallery)
    },[props.imageType])
    useEffect(()=>{
        gmRef.current.scrollIntoView();
    },[props.galleryModal])
    return (
        <> 
            <div className="wrapper">
                <div ref={gmRef} className="GMContent">
                    <div className="header paddedContent">
                        <div className="font16-notResponsive canelaThin productNameHeader">
                            {props.product.name}
                        </div>
                        <div className="cross" onClick={()=>props.showGalleryModal({status:false,imageType:"v1"})}>
                            <img src="/images/cross.svg" width="16" height="16" alt='cross' className="width-100" />
                        </div>
                    </div>
                    <div className="crossIpad" onClick={()=>props.showGalleryModal({status:false,imageType:"v1"})}>
                        <img src="/images/galleryClose.svg" className="width-100" />
                    </div>
                    <div className="imagesWrapper">
                        <div className="allImages" onClick={()=>props.showGalleryModal({status:false,imageType:""})}>
                            {galleryModalImages.map(galleryModalImage=>{
                                if(!!galleryModalImage?.imageFull){
                                    return(
                                        <div className="image">
                                            <LazyImage 
                                                alt={galleryModalImage.type} 
                                                originalSrc={galleryModalImage.imageFull} 
                                                placeholderSrc={galleryModalImage.imageBlur}
                                                width={2000} 
                                                height={2000}
                                                background={true}
                                                showPlaceHolder={true}
                                            />
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>  
                    <div className="cartButton">
                        <div className="favButton"><Like className="favIcon" product={props.product}/></div>
                        <h1 className="font24 canelaThin hideForMobile">{t('saveToWishlist')}</h1>
                        {props.showAddToCartButton &&
                            <div><button className="btn btnPrimary anoRegular addToCart" onClick={()=>props.addToCart(true)} onMouseEnter={()=>addToCartMouseEnter(true)} onMouseLeave={()=>addToCartMouseEnter(false)}>{btnContent}</button></div>
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .wrapper{
                    height:100%;
                    overflow-y:scroll;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .loader{
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                }
                .header,.crossIpad{
                    display:none;
                }
                .landscapeWrapper{
                    padding-top:42.824%;
                }
                .twoImageWrapper{
                    display:flex;
                    margin-right:-2.4rem;
                    align-items: center;
                }
                .twoImageWrapper.smallImages{
                    margin-right:-6.4rem;
                }
                .squareImage{
                    padding-right:6.4rem;
                }
                .smallImages{
                    margin-bottom:9.6rem;
                }
                .cartButton{
                    display:flex;
                    align-items: center;
                    justify-content: center;
                }
                .addToCart{
                    min-width:28rem;
                }
                .cartButton .favButton{
                    margin-right:2.4rem;
                    // margin-top: 6px;
                    cursor:pointer;
                }
                .cartButton h1{
                    margin-right:6.4rem;
                    cursor:pointer;
                }
                .allImages:hover{
                    cursor: url("/images/galleryClose.svg"), auto;
                }
                .wrapper{
                    padding:0 0 9.6rem 0;
                }
                .imagesWrapper{
                    padding:6.4rem 6.4rem 0 6.4rem;
                }
                .imagesWrapper::-webkit-scrollbar,.GMContent::-webkit-scrollbar {
                    display: none;
                }
                .image{
                    margin-bottom:6.4rem;
                    width:100%;
                }
                @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .crossIpad{
                        position:absolute;
                        display: block;
                        right: 4rem;
                        top: 4rem;
                        z-index: 9;
                    }
                    .addToCart{
                        min-width:24rem;
                    }
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .header{
                        padding-top: 2rem;
                        padding-bottom: 2rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .crossIpad{
                        display:none;
                    }
                    .imagesWrapper {
                        padding: 0px 0.8rem;
                    }
                    .image{
                        margin-bottom:0.8rem;
                    }
                    .cartButton{
                        display:block;
                        text-align: center;
                        padding: 3.3rem 3.6rem 0 3.6rem;
                    }
                    .cartButton .favButton{
                        margin-bottom: 3.2rem;
                        margin-right:0;
                        margin-top:0;
                        
                    }  
                    .favButton{
                        margin-left:14rem;
                    }
                    .addToCart{
                        width:100%;
                    }    
                    .mobileImages .image:last-child{
                        margin-bottom:0;
                    }   
                    .wrapper {
                        padding: 0 0 4.8rem 0;
                    }           
                }
            `}</style>
        </>
    )
}

function mapStateToProps({common,selection,gifting}){
    return {common,selection,gifting}
}

export default connect(mapStateToProps,{})(GalleryModal)