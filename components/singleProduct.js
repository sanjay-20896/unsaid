import React, {useState,useEffect,useRef} from 'react'
import Link from 'next/link'
import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT} from '../config'
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import LazyImage from './lazyImage'
import LikeProduct from './likeProduct'
import {getProductImage,getPriceBasedOnSelection,formmatPrice} from '../functions'
import {productImpression} from '../gtmFunctions'
import useOnScreen from '../hooks/useOnScreen'
import TextAndArrowCta from './textAndArrowCta';
import Video from "./video"
function SingleProduct(props) {
    const productWrapperRef = useRef(null)
    const [variantProduct,setVariantProduct] = useState(null)
    let initialIndex = props.firstProduct?1:0
    let singleProductImage = useRef(null)
    let singleProductImageMobile = useRef(null)
    const [index, setIndex] = useState(initialIndex)
    let handleChangeIndex = index => {
        setIndex(index)
    }
    let springConfig={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    let currentProduct=variantProduct || props.product
    let productUri=`/products/${props.product.uri}/${props.product.sku}` 
    if(variantProduct){
        productUri=`/products/${props.product.uri}/${variantProduct.sku}`
    }
    let m1 = getProductImage(currentProduct,"m1","standard")
    let m2 = getProductImage(currentProduct,"m2","standard")
    m1 = m1?m1:m2
    let m1Mobile = getProductImage(currentProduct,"m1","standard")
    let m2Mobile = getProductImage(currentProduct,"m2","standard")
    m1Mobile = m1Mobile?m1Mobile:m2Mobile
    let f1= getProductImage(currentProduct,"f1","standard")
    let f1Mobile = getProductImage(currentProduct,"f1","standard")
    let m1Video = currentProduct.variant_product_model_video_1_url;
    const isOnScreen = useOnScreen(productWrapperRef)
    useEffect(()=>{
        if(isOnScreen){
            productImpression(currentProduct,props.selection,"Home page")
        }
    },[isOnScreen,currentProduct])
    return (
        <>
         <div className="singleProduct" ref={productWrapperRef} key={currentProduct.sku}>
            <div className="hideForMobile">
                <div className={`imgSection paddedContent`}>
                    <div className={`img1Container`}>
                        <Link href={productUri}>
                            <a>
                                <div className="imageWrapper positionRelative">
                                    {!!m1Video ? 
                                         <Video   videoUrl={m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                                    :
                                    !!m1 &&
                                        <LazyImage 
                                            alt={props?.product?.name} 
                                            originalSrc={m1}
                                            width={858} 
                                            height={858} 
                                            paddingTop="100%"
                                            background={true} 
                                        />
                                    }   
                                </div>
                            </a>
                        </Link>
                        <Link href={productUri}><a><div className="productName canelaThin font24">{props?.product?.name}</div></a></Link>
                        <div className="productPrice anoRegular font16 grey">{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):formatPrice(props.product.price)}</div>
                    </div>
                    <div className={`img2Container positionRelative`}>
                        <Link href={productUri}>
                            <a>
                                <div className="imageWrapper positionRelative" ref={singleProductImage}>
                                    {!!f1 &&
                                        <LazyImage 
                                            alt={props?.product?.name} 
                                            originalSrc={f1}
                                            width={858} 
                                            height={858} 
                                            paddingTop="100%"
                                            background={true} 
                                        />
                                    }
                                </div>
                            </a>
                        </Link>
                        <div className="favouriteIcon">
                            <LikeProduct product={props.product} />
                        </div>
                        <div className="link anoRegular font16">
                            <Link href={props.productSectionLink}><a>
                                <TextAndArrowCta text={props.viewProductSection} />
                            </a></Link> 
                        </div>
                    </div>
                </div>
            </div>
            <div className="showForMobile">
                <div className={`imgSection ${!!m1Mobile?"":"hideSecondSlide"}`} key={`singleProduct_${currentProduct.sku}_images`}>
                    <SwipeableViews style={{padding:"0 1.6rem 0 2rem"}} slideStyle={{padding:"0 1.6rem 0 0px"}} index={index} onChangeIndex={()=>handleChangeIndex} springConfig={springConfig}>
                        <div className={`img2Container positionRelative`}>
                            <div className="imageWrapper positionRelative" ref={singleProductImageMobile}>
                                {!!f1Mobile &&
                                    <Link href={productUri}>
                                        <a>
                                            <LazyImage 
                                                alt={props?.product?.name} 
                                                originalSrc={f1Mobile}
                                                width={858} 
                                                height={858} 
                                                paddingTop="100%"
                                                background={true} 
                                            />
                                        </a>
                                    </Link>
                                }
                            </div>
                            <div className="favouriteIcon">
                                <LikeProduct product={props.product} />
                            </div>
                            <Link href={productUri}>
                                <a>
                                    <div className="productName canelaThin font24">{props.product.name}</div>
                                </a>
                            </Link>
                            <div className="productPrice anoRegular grey">{props.productPrice}</div>
                            {/* <Colors showColorName={false} colorsSize="standard" product={props.product} currentSelectedProduct={currentProduct} colorClick={colorClick}/> */}
                        </div>
                        <div className={`img1Container`}>
                            <div className="imageWrapper positionRelative">
                                    {!!m1Video?
                                        <Link href={productUri}><a>
                                            <Video   videoUrl={m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                                        </a></Link> 
                                    :
                                        <div>
                                            {!!m1Mobile &&
                                                <Link href={productUri}>
                                                    <a>
                                                        <LazyImage 
                                                            alt={props?.product?.name} 
                                                            originalSrc={m1Mobile} 
                                                            width={858} 
                                                            height={858} 
                                                            paddingTop="100%"
                                                            background={true} 
                                                        />
                                                    </a>
                                                </Link>
                                            }
                                        </div>
                                    }
                            </div>
                            <div className="link anoRegular font16">
                                <Link href={props.productSectionLink}>
                                    <a>
                                        <TextAndArrowCta text={props.viewProductSection} />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
            </div>      
         </div>   
         <style jsx>{`
            .imgSection{
                display:flex;
                margin-right:-2.4rem;
            }
            .img1Container, .img2Container{
                width:50%;
                padding-right:2.4rem;
            }
            .img2Container{
                cursor:pointer;
            }
            .productDetails{
                display:flex;
                justify-content: space-between;
                margin-top:1.6rem;
            }
            .productName{
                margin-bottom:0.8rem;
                margin-top:2.8rem;
                cursor:pointer;
            }
            .productPrice{
                letter-spacing: 0.6px;
            }
            .link a{
                margin-right:0.8rem;
                letter-spacing: 1px;
            }
            .link{
                margin-top:2.8rem;
                text-align:right;
            }
            .favouriteIcon{
                position:absolute;
                top: 1.2rem;
                right: 3.2rem;
                z-index:2;
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .productPrice{
                    font-size:1.4rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .favouriteIcon img{
                    content:url("/images/favMobile.svg")
                }
                .productName{
                    margin-bottom:0.8rem;
                    margin-top:0.8rem;
                    cursor:pointer;
                }
                .productPrice{
                    margin-bottom:0rem;
                    font-size:1.4rem;
                }
                .favouriteIcon{
                    top:0;
                    right:0;
                    transform
                }
                .imgSection{
                    display:block;
                    margin-right:0;
                    align-items: center;
                }
                .img1Container{
                    width:100%;
                    padding-right:0rem;
                }
                .img2Container{
                    width:100%;
                    padding-right:0rem;
                }
                .link{
                    text-align:right;
                    margin-top:0.8rem;
                    margin-right:0.5rem;
                }
            }
         `}</style>
        </>
    )
}

function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(SingleProduct)

