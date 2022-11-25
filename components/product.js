import React, {useState,useEffect,useRef} from 'react'
import Link from 'next/link'
import {MOBILE_BREAKPOINT} from '../config'
import SwipeableViews from 'react-swipeable-views';
import Colors from './colorsDynamic'
import { connect } from 'react-redux';
import {getPriceBasedOnSelection,getProductImage,formatPrice} from '../functions'
import Like from '../components/likeProduct'
import LazyImage from './lazyImage';
import {productImpression} from '../gtmFunctions'
import useOnScreen from '../hooks/useOnScreen'
import Video from './video'
function SingleProduct(props) {
    const wrapperRef = useRef(null)
    let initialIndex = props.firstProduct?1:0
    let singleProductImage = useRef(null)
    const [variantProduct,setVariantProduct] = useState(null);
    const [index, setIndex] = useState(initialIndex)
    let handleChangeIndex = index => {
        setIndex(index)
    }
    let springConfig={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    let hasVariants=Array.isArray(props.product.relatedProducts) && props.product.relatedProducts.length>0? true:false
    let currentProduct=variantProduct || props.product;
    useEffect(()=>{
        if(props.selectedColor!=null && props.selectedColor!=undefined){
            // console.log("use effect running")
            if(props?.product?.color?.color_text==props.selectedColor){
                // console.log("current selected product")
                // console.log(props.product.color.color_text)
                // console.log(props.selectedColor)
                // console.log(props.product)
                setVariantProduct(null)
                // console.log("variant product selected")
            }else{
                if(props?.product?.product_type_value=="cord"){
                   
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props?.selectedColor && rp?.cord_color?.hex==props?.product?.cord_color?.hex)
                    if(p){
                        // console.log("cord product")
                        // console.log(p?.color?.color_text)
                        // console.log(props.selectedColor)
                        // console.log(p)
                        setVariantProduct(p)
                        // console.log("variant product selected")

                    }
                }else if(props?.product?.customisation_possible=="1"){
                    
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props.selectedColor && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text)
                    if(p){
                        // console.log("customisation possible")
                        // console.log(p?.color?.color_text)
                        // console.log(props.selectedColor)
                        // console.log(p)
                        setVariantProduct(p)
                        // console.log("variant product selected")

                    }
                }else{
                    
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props.selectedColor)
                    if(p){
                        // console.log("normal products")
                        // console.log(p?.color?.color_text)
                        // console.log(props.selectedColor)
                        // console.log(p)
                        setVariantProduct(p)
                        // console.log("variant product selected")

                    }
                }
            }
        }else{
            setVariantProduct(null)
        }
    },[props.selectedColor])

    useEffect(()=>{
        setIndex(props.slideIndex)
    },[props.slideIndex])
    function colorClick(color){
        // console.log(color)
        if(color.color_hex_2){
            if(color.color_hex==props?.product?.color?.color_hex && color.color_hex_2==props?.product?.color?.color_hex_2){
                setVariantProduct(null)
            }else{
                if(props?.product?.product_type_value=="cord"){
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex && rp?.color?.color_hex_2==color.color_hex_2 && rp?.cord_color?.hex==props?.product?.cord_color?.hex
                    )
                    if(p)
                        setVariantProduct(p)
                }else if(props.product.customisation_possible=="1"){
                    let p=props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text && rp?.color?.color_hex_2==props?.product?.color?.color_hex_2
                    )
                    if(p)
                        setVariantProduct(p)
                }else{
                    // console.log("dual color")
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color?.color_hex && rp?.color?.color_hex_2==color?.color_hex_2
                        )
                    // console.log(p)
                    if(p)
                        setVariantProduct(p)
                }
            }
        }else{
            if(color?.color_hex==props?.product?.color?.color_hex){
                setVariantProduct(null)
            }else{
                if(props?.product?.product_type_value=="cord"){
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex  && rp?.cord_color?.hex==props?.product?.cord_color?.hex
                    )
                    if(p)
                        setVariantProduct(p)
                }else if(props.product.customisation_possible=="1"){
                    let p=props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text 
                    )
                    if(p)
                        setVariantProduct(p)
                }else{
                    // console.log("single color")
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex
                        )
                    if(p)
                        setVariantProduct(p)
                }
            }
        }
    }
   
    let productUri=`/products/${props.product.uri}/${props.product.sku}` 
    if(variantProduct){
        productUri=`/products/${props.product.uri}/${variantProduct.sku}`
    }
    let m1 = getProductImage(currentProduct,"m1","standard")
    let m2 = getProductImage(currentProduct,"m2","standard")
    m1 = m1?m1:m2
    let v1 = !!props.showF1 && props.showF1 ? getProductImage(currentProduct,"f1","standard") : getProductImage(currentProduct,"v1","standard")
    let m1Mobile = getProductImage(currentProduct,"m1","standard")
    let v1Mobile = !!props.showF1 && props.showF1 ? getProductImage(currentProduct,"f1","standard") : getProductImage(currentProduct,"v1","standard")
    let m1Blur = getProductImage(currentProduct,"m1","blur")
    let m2Blur = getProductImage(currentProduct,"m2","blur")
    m1Blur=m1Blur?m1Blur:m2Blur
    let v1Blur = getProductImage(currentProduct,"v1","blur")
    let m1Video = currentProduct.variant_product_model_video_1_url;
    let m2Video=currentProduct.variant_product_model_video_2_url;
    // console.log("m1video",m1Video)
    // console.log("m2video",m2Video)
    const isOnScreen = useOnScreen(wrapperRef)
    useEffect(()=>{
        if(isOnScreen)
            productImpression(currentProduct,props.selection,"")
    },[isOnScreen,currentProduct])
    return (
        <>
          <div className="singleProduct" ref={wrapperRef} key={currentProduct.sku}>
            <div className="hideForMobile">
                <div className={`imgSection paddedContent`}>
                    <div className={`img1Container`}>
                        <Link href={productUri}>
                            <a>
                                <div className="imageWrapper positionRelative">
                                    {!!m1Video ?                                 
                                        <Video   videoUrl={m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                                        :!!m1 &&           
                                        <LazyImage 
                                            alt={currentProduct.name}
                                            originalSrc={m1} 
                                            placeholderSrc={!!m1Blur?m1Blur:null}
                                            width={858} 
                                            height={858}
                                            background={true} 
                                        />
                                    }
                                </div>
                            </a>
                        </Link>
                        <Link href={productUri}>
                            <a>
                                <div className="productName canelaThin font24">{props.product.name}</div>
                            </a>
                        </Link>
                        <Link href={productUri}>
                            <a>
                                <div className="productPrice anoRegular font16 grey">{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):formatPrice(props.product.price)}</div>
                            </a>
                        </Link>
                    </div>
                    <div className={`img2Container positionRelative`}>
                        <Link href={productUri}>
                            <a>
                                <div className="imageWrapper positionRelative" ref={singleProductImage}>
                                    {!!v1 &&
                                        <LazyImage 
                                            bgColor={!!props.showF1 && props.showF1? "#f2f2f2": null}
                                            alt={currentProduct.name}
                                            originalSrc={v1} 
                                            placeholderSrc={!!v1Blur?v1Blur:null}
                                            width={858} 
                                            height={858}
                                            background={true} 
                                            scale={currentProduct.variant_product_scaling_desktop_value}
                                        />
                                    }
                                </div>
                            </a>
                        </Link>
                        <div className="favouriteIcon">
                            <Like product={props.product} />
                        </div>
                       { <div className="link anoRegular font16">{hasVariants==true ?<Colors showColorName={false} defaultColorSwatch={props.selectedColor} colorsSize="standard" product={props.product} currentSelectedProduct={currentProduct} colorClick={colorClick}/>: "" }</div>}
                    </div>
                </div>
            </div>
            <div className="showForMobile">
                <div className={`imgSection ${!!m1Video || !!m1Mobile?"":"hideSecondSlide" }`} key={`singleproduct_${currentProduct.sku}`}>
                    <SwipeableViews style={{padding:"0 1.6rem 0 2rem"}} slideStyle={{padding:"0 1.6rem 0 0px"}} index={index} onChangeIndex={()=>handleChangeIndex} springConfig={springConfig}>
                        <div className={`img2Container positionRelative`}>
                            <Link href={productUri}>
                                <a>
                                    {!!v1Mobile &&
                                        <LazyImage 
                                            bgColor={!!props.showF1 && props.showF1? "#f2f2f2": null}
                                            alt={currentProduct.name}
                                            originalSrc={v1Mobile} 
                                            placeholderSrc={!!v1Blur?v1Blur:null}
                                            width={858} 
                                            height={858} 
                                            background={true}
                                            scale={currentProduct.variant_product_scaling_desktop_value}
                                        />
                                    }
                                </a>
                            </Link>
                            <div className="favouriteIcon">
                                <Like product={props.product} />
                            </div>
                            <Link href={productUri}>
                                <a>
                                    <div className="productName canelaThin font24">{props.product.name}</div>
                                </a>
                            </Link>
                            <div className="productPrice anoRegular font16 grey">{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):formatPrice(props.product.price)}</div>
                            {hasVariants==true &&
                            <Colors showColorName={false} colorsSize="standard" product={props.product} defaultColorSwatch={props.selectedColor} currentSelectedProduct={currentProduct} colorClick={colorClick}/>}
                        </div>
                        {!!m1Video ? 
                        <div className={`img1Container`}>
                            <Link href={productUri}>
                                <a>
                                    <Video videoUrl={m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                                </a>
                            </Link>
                        </div>
                        :m1Mobile &&
                            <div className={`img1Container`}>
                                <Link href={productUri}>
                                    <a>
                                        <LazyImage 
                                            alt={currentProduct.name}
                                            originalSrc={m1Mobile} 
                                            placeholderSrc={!!m1Blur?m1Blur:null}
                                            width={858} 
                                            height={858} 
                                            background={true}
                                        />
                                    </a>
                                </Link>    
                            </div>
                        }
                    </SwipeableViews>
                </div>
            </div>      
         </div>  
         <style jsx>{`
            .imgSection{
                display:flex;
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
                margin-top:1.6rem;
                cursor:pointer;
            }
            .productPrice{
                margin-bottom:0.8rem;
                letter-spacing: 0.6px;
            }
            .link a{
                margin-right:0.8rem;
                letter-spacing: 1px;
            }
            .link{
                margin-top:1.6rem;
                text-align:right;
            }
            .favouriteIcon{
                position:absolute;
                top: 1.2rem;
                right: 3.2rem;
                z-index:2;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .favouriteIcon img{
                    content:url("/images/favMobile.svg");
                }
                .favouriteIcon{
                    top:0rem;
                    right:0rem;
                }
                .imgSection{
                    display:block;
                    margin-right:0;
                    padding-left:0rem;
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
