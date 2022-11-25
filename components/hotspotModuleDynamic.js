import React from 'react'
import ProductTagging from '../components/productTagging'
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { connect } from 'react-redux';
import imageUrlBuilder from "@sanity/image-url";
import Sanity from './../sanity'
const imageBuilder = imageUrlBuilder(Sanity)
const urlFor = source => imageBuilder.image(source)
import {getPriceBasedOnSelection} from '../functions'
import LazyImage from './lazyImage'
import {getImageUrl} from "../functions"
function hotspotModule(props) {
    return (
        <>
            <div className="hotspot">
                <div className="heading font20 anoHalfRegular">{props.heading}</div>
                <div className="wrapper positionRelative">
                    <div className="content">
                        {/* <LazyLoad offset={500}>
                            <img className="width-100" src={props.img}/>
                        </LazyLoad> */}
                        <div className="hideForMobile">
                            {props.img &&
                                <LazyImage 
                                    alt={props.heading}
                                    originalSrc={getImageUrl(props.img,1749)}
                                    placeholderSrc={getImageUrl(props.img,20)}
                                    width={1749} 
                                    height={984} 
                                />
                            }
                            {Array.isArray(props.productTagging) && props.productTagging.map(product=>{
                                // console.log("hotspot module product tagging",product)
                                // console.log("single hotspot product",product.textAppearance)
                                if(!!product && !!product.taggedProduct)
                                return(
                                    <ProductTagging 
                                        width={product.width}
                                        textColorBlack={product.enableTextColor}
                                        key={product._key}
                                        positionFromTop={product.distanceFromTop} 
                                        positionFromLeft={product.distanceFromLeft}
                                        productName={`${product && product.taggedProduct && product.taggedProduct.name ? product.taggedProduct.name:"name"}`}
                                        productPrice={`${product && !!product.taggedProduct && product.taggedProduct.prices ? getPriceBasedOnSelection(product.taggedProduct,props.selection):"price"}`} 
                                        textAppearance={!!product.textAppearance? product.textAppearance:"right"}
                                        productUri={`${product && product.taggedProduct && product.taggedProduct.uri? product.taggedProduct.uri:"#"}`}
                                    />
                                )
                            })}
                        </div>
                        <div className="showForMobile">
                            {props.imgMobile &&
                                <LazyImage 
                                    alt={props.heading}
                                    originalSrc={getImageUrl(props.imgMobile,500)} 
                                    placeholderSrc={getImageUrl(props.imgMobile,20)}
                                    width={400} 
                                    height={711} 
                                />
                            }
                            {Array.isArray(props.productTaggingMobile) && props.productTaggingMobile.map((product)=>{
                                //  console.log("single hotspot product mobile",product.textAppearance)
                                if(!!product && !!product.taggedProduct)
                                return(
                                <ProductTagging 
                                    width={product.width}
                                    key={product._key}
                                    positionFromTop={product.distanceFromTop} 
                                    positionFromLeft={product.distanceFromLeft}
                                    productName={`${product && product.taggedProduct && product.taggedProduct.name ? product.taggedProduct.name:"name"}`}
                                    productPrice={`${product && product.taggedProduct && product.taggedProduct.prices? getPriceBasedOnSelection(product.taggedProduct,props.selection):"price"}`} 
                                    textAppearance={!!product.textAppearance?product.textAppearance:"right"}
                                    productUri={`${product && product.taggedProduct && product.taggedProduct.uri? product.taggedProduct.uri:"#"}`}
                                /> 
                                )
                            })}
                        </div>
                                            
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .hotspot{
                    padding:0 6.4rem;
                }
                .heading{
                    margin-bottom:3.2rem;
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .heading{
                        margin-bottom:2.5rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .heading{
                        font-size:1.2rem;
                        text-align:center;
                    }
                    .hotspot{
                        padding:0 0;
                    }
                    // .wrapper img{ 
                    //     display:none;
                    // }
                    // .wrapper{
                    //     height:${props.common.windowHeight2}px;
                    //     background-image: url(${props.img});
                    //     background-size: auto;
                    //     background-repeat: no-repeat;
                    //     background-position: center;
                    // }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(hotspotModule)