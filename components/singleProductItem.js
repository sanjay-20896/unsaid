import Link from 'next/link';
import React, { useState,useEffect,useRef } from 'react'
import Like from '../components/likeProduct'
import LazyImage from './lazyImage';
import Colors from './colorsDynamic';
import { connect } from 'react-redux';
import {getPriceBasedOnSelection,getProductImage} from '../functions'
import {MOBILE_BREAKPOINT} from '../config'
import {productImpression} from '../gtmFunctions'
import useOnScreen from '../hooks/useOnScreen'
function SingleProduceItem(props){
    const wrapperRef = useRef(null)
    const [variantProduct,setVariantProduct] = useState(null);
    let product = props.product;
    let hasVariants = product && product.relatedProducts && Array.isArray(product.relatedProducts) && product.relatedProducts.length>0?true:false;
    let currentProduct = variantProduct || product
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
    let v1 = getProductImage(currentProduct,"v1","standard")
    let v1Blur = getProductImage(currentProduct,"v1","blur")
    const isOnScreen = useOnScreen(wrapperRef)
    useEffect(()=>{
        if(isOnScreen){
            productImpression(currentProduct,props.selection,"Single product in dropdown")
        }
    },[isOnScreen,currentProduct])
    return(
        <>
            <div className="singleProduceItem" ref={wrapperRef}>
                <Link href={productUri}>
                    <a>
                        <div className="productImage" key={`singleProductItem_${currentProduct.sku}_image`}>
                            {!!v1 &&
                                // <LazyLoadImage
                                //     alt={props?.product?.name}
                                //     effect="blur"
                                //     src={v1}
                                //     placeholderSrc={!!v1Blur?v1Blur:null}
                                //     width="100%"
                                // />
                                <LazyImage 
                                    alt={props?.product?.name} 
                                    originalSrc={v1} 
                                    placeholderSrc={!!v1Blur?v1Blur:null}
                                    width={858} 
                                    height={858} 
                                />
                                // <img src={v1} className="width-100" />
                            }
                        </div>
                        <h1 className="anoRegular font16 productName">{props.product.name}</h1>
                        <h2 className="anoRegular font16 productPrice grey">{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):props.product.price}</h2>
                    </a>
                </Link>
                <div className="colorAndLike">
                    {hasVariants &&  
                        <div>
                            <Colors showColorName={false} colorsSize="standard" product={props.product} currentSelectedProduct={currentProduct} colorClick={colorClick}/>
                        </div>
                    }
                    <div>
                        <Like noPadding={true} product={props.product} />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .productImage{
                    margin-bottom:1.6rem;
                }
                .productName,.productPrice{
                    margin-bottom:0.8rem;
                }
                .colorAndLike{
                    display:flex;
                    justify-content: space-between;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .colorAndLike{
                        display:flex;
                        justify-content: space-between;
                    }
                }
            `}</style>
        </>
    )
}

function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(SingleProduceItem)