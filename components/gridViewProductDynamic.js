import Link from 'next/link'
import React, { useState,useEffect,useRef } from 'react'
import { connect } from 'react-redux'
import Colors from '../components/colorsDynamic'
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import {getPriceBasedOnSelection,getProductImage,formatPrice} from '../functions'
import Like from './likeProduct'
import LazyImage from './lazyImage'
import {productImpression} from '../gtmFunctions'
import useOnScreen from '../hooks/useOnScreen'
import Video from "./video"

function GridViewProduct(props) {
    const wrapperRef = useRef(null)
    const [variantProduct,setVariantProduct] = useState(null);
    let hasVariants= props.product && props.product.relatedProducts && Array.isArray(props.product.relatedProducts) && props.product.relatedProducts.length>0? true:false
    let currentProduct=variantProduct || props.product
    // console.log("currentProduct currentProduct",currentProduct)
    useEffect(()=>{
        if(props.selectedColor!=null && props.selectedColor!=undefined){
            if(props?.product?.color?.color_text==props.selectedColor){
                setVariantProduct(null)
            }else{
                if(props?.product?.product_type_value=="cord"){
                   
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props?.selectedColor && rp?.cord_color?.hex==props?.product?.cord_color?.hex)
                    if(p){
                        setVariantProduct(p)
                    }
                }else if(props?.product?.customisation_possible=="1"){
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props.selectedColor && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text)
                    if(p){
                        setVariantProduct(p)
                    }
                }else{
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props.selectedColor)
                    if(p){
                        setVariantProduct(p)
                    }
                }
            }
        }else{
            setVariantProduct(null)
        }
    },[props.selectedColor])
   
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
                        if(p){
                            setVariantProduct(p)
                        }
                            
                    }else if(props.product.customisation_possible=="1"){
                        let p=props?.product?.relatedProducts.find(rp=>
                            rp?.color?.color_hex==color.color_hex && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text && rp?.color?.color_hex_2==props?.product?.color?.color_hex_2
                        )
                        if(p)
                            setVariantProduct(p)
                    }else{
                        let p= props?.product?.relatedProducts.find(rp=>
                            rp?.color?.color_hex==color?.color_hex && rp?.color?.color_hex_2==color?.color_hex_2
                        )
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
                        let p= props?.product?.relatedProducts.find(rp=>
                            rp?.color?.color_hex==color.color_hex
                            )
                       
                        if(p){
                            setVariantProduct(p)                       
                        }
                            
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
    let m2Mobile = getProductImage(currentProduct,"m2","standard")
    m1Mobile=m1Mobile?m1Mobile:m2Mobile
    let v1Mobile = !!props.showF1 && props.showF1 ? getProductImage(currentProduct,"f1","standard") : getProductImage(currentProduct,"v1","standard")
    let m1Blur = getProductImage(currentProduct,"m1","blur")
    let v1Blur = getProductImage(currentProduct,"v1","blur")
    const isOnScreen = useOnScreen(wrapperRef)
    // const videoOnScreen=useOnScreen()
    let m1Video = currentProduct.variant_product_model_video_1_url;
    let m2Video=currentProduct.variant_product_model_video_2_url;
    // console.log("m1video",m1Video)
    // console.log("m2video",m2Video)
    useEffect(()=>{
        if(isOnScreen){
            productImpression(currentProduct,props.selection,"Collection/Category page")
        }
    },[isOnScreen,currentProduct])
    // useEffect(()=>{
    //     if(props.product.name=="Meta Pavé Ring"){
    //         console.log("use effect grid view")
    //         console.log(variantProduct)
    //     }
    // },[variantProduct])
    
    return (
        <>
            <div className="gridViewProduct" ref={wrapperRef} key={currentProduct.sku}>
                <div className='positionRelative'>
                    <Link href={productUri}>
                        <a>
                            <div className="productImg positionRelative" >
                                <div className="img width-100 hideForMobileInline">
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
                                <div className="bgImg width-100 hideForMobileInline" >
                                    {!!m1Video ?                         
                                    <Video   videoUrl={m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={858} height={858} />
                                    :
                                    !!m1 &&
                                    <LazyImage 
                                        alt={currentProduct.name}
                                        originalSrc={m1} 
                                        width={858} 
                                        height={858}
                                        background={true} 
                                    />
                                    }
                                </div>
                                <div className="img width-100 showForMobileInline">
                                    {!!v1Mobile && 
                                        <LazyImage 
                                            bgColor={!!props.showF1 && props.showF1? "#f2f2f2": null}
                                            alt={currentProduct.name}
                                            originalSrc={v1Mobile} 
                                            placeholderSrc={!!v1Blur?v1Blur:null}
                                            width={600} 
                                            height={600}
                                            background={true} 
                                            scale={currentProduct.variant_product_scaling_desktop_value}
                                        />
                                    }
                                </div>
                                <div className="bgImg width-100 showForMobileInline" >
                                    {!!m1Video ? 
                                    <Video videoUrl={m1Video} playButtonPresent={false} controls={false} autoplay={true} muted={true} loop={true} width={600} height={600} />
                                    :
                                    m1Mobile &&
                                    <LazyImage 
                                        alt={currentProduct.name}
                                        originalSrc={m1Mobile} 
                                        width={600} 
                                        height={600}
                                        background={true} 
                                    />
                                    }
                                </div>
                                
                            </div>
                        </a>
                    </Link>
                    {!props?.hideLikeButton && 
                        <div className="favouriteIcon positionAbsolute">
                            <Like noPadding={false} product={props.product} />
                        </div>
                    }
                </div>
                <div className="hideForMobile">
                    <div className="productInfo">
                        <div className="topLine">
                            <Link href={productUri} >
                                <a>
                                    <div className="productName anoRegular">{props.product.name}</div>
                                </a>
                            </Link>  
                            {!props?.hideColors && 
                                <div className="colorSwatches">{hasVariants && <Colors marginRight="0.8rem" defaultColorSwatch={props.selectedColor} showColorName={false}  colorsSize="standard" product={props.product} currentSelectedProduct={currentProduct} colorClick={colorClick}/>}</div>
                            }
                        </div>
                        <div className="bottomLine">
                            <div className="productPrice anoRegular grey" key={`product_price_desktop_${props?.selection?.selection?.location?.pricelist}`}>{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):formatPrice(props.product.price)}</div>
                        </div>
                    </div>
                </div>
                <div className="showForMobile">
                    <div className="productInfoMobile">
                        <div className="nameAndPrice">
                            <div className="pn">
                                <Link href={productUri}>
                                    <a>
                                        <div className="productName anoRegular">{props.product.name}</div>
                                    </a>
                                </Link> 
                            </div> 
                            <div className="productPrice anoRegular grey" key={`product_price_mobile_${props?.selection?.selection?.location?.pricelist}`}>{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):formatPrice(props.product.price)}</div>
                        </div>
                        {!props?.hideColors && 
                            <div className="colorAndLike">
                                <div>{hasVariants && <div className="link anoRegular"><Colors marginRight="0.6rem" defaultColorSwatch={props.selectedColor} showColorName={false} colorsSize="standard" activeColor={props.selectedColor} product={props.product} currentSelectedProduct={currentProduct} colorClick={colorClick}/></div>}</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .productPrice{
                    letter-spacing: 0.6px;
                }
                .colorSwatches{
                    height:2rem;
                }
                .productName{
                    padding-right: 2rem;
                }
                .topLine,.bottomLine{
                    display:flex;
                    justify-content:space-between;
                }
                .gridViewProduct{
                    width:100%;
                }
                .topLine{
                    margin-bottom:0.8rem;
                    overflow:hidden;
                    align-items: center;
                }
                .favouriteIcon{
                    top: 0.4rem;
                    right: 0.4rem;
                    z-index: 8;
                }
                .productImg .img,.productImg .bgImg{
                    opacity:1;
                    width:100%;
                    position:absolute;
                    left:0;
                    top:0;
                    // transition:all 0.3s ease-out;
                }
                .productImg .img{
                    z-index:2;
                    background:#ffffff;
                }
               
                .productImg .bgImg{
                    z-index:1;
                }
                .productImg:hover .img{
                    opacity:${!!m1Video ?0:m1?0:1};
                }
                .productImg{
                    margin-bottom:1.6rem;
                    background-size: 100%;
                    background-repeat: no-repeat;
                    padding-top:100%;
                }
                .productInfo{
                    font-size:1.6rem;
                    line-height:2.4rem;
                    letter-spacing:1px;
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .productInfo{
                        line-height:1.8rem;
                        letter-spacing:1px;
                    }
                    .productName,.productPrice{
                        font-size:1.4rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .colorAndLike{
                        height: 14px;
                        margin-top:0rem;
                        position: relative;
                    }
                    .productPrice{
                        font-size:1.2rem;
                    }
                    .productName{
                        font-size: ${!!props?.productNameSizeMobile?props?.productNameSizeMobile:"1.2rem"}
                    }
                    .productImg{
                        margin-bottom:0.8rem;
                    }
                    .productName{
                        padding-right: 0;
                    }
                    .favouriteIcon{
                        right: 0;
                        top: 0;
                    }
                    .productPrice{
                        margin-bottom:0.4rem;
                    }
                    .pn{
                        overflow:hidden;
                        margin-bottom:0.4rem;
                    }
                    .link{
                        margin-top:0rem;
                    }
                    .productImg:hover .img{
                        opacity:${!!m1Video ?0:!!m1Mobile?0:1};
                    }
                }
            `}</style>
        </>
    )
}



function mapStateToProps({common,selection}){
    return {common,selection}
}

export default connect(mapStateToProps,null)(GridViewProduct)