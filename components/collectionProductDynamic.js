import React from 'react'
import Link from 'next/link'
import Caret from '../components/caret'
import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import ProductTagging from '../components/productTagging'
import cssVariables from '../data/cssVariables'
import {connect} from 'react-redux'
import imageUrlBuilder from "@sanity/image-url";
import Sanity from './../sanity'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {getPriceBasedOnSelection} from '../functions'
import LazyImage from './lazyImage'
import TextAndArrowCta from './textAndArrowCta'
import {getImageUrl} from './../functions'
import useTranslation from 'next-translate/useTranslation'

function collectionProduct(props) {
    const {t}=useTranslation('common')
    return (
        <>
            <div className={`collectionProduct ${props.layoutReverse?"layoutReverse":""}`}>
                <div className="productImage">
                    <div className="wrapper positionRelative">
                        <div className="content">
                            <div className="showForMobile">
                                <LazyImage objectFitCover={props.objectFitCover} alt={props.productHeading} originalSrc={getImageUrl(props.productImageMobile,780)} placeholderSrc={getImageUrl(props.productImageMobile,20)} width={500} height={500} paddingTop="100%" />
                            </div>
                            <div className="hideForMobile">
                                <LazyImage alt={props.productHeading} originalSrc={getImageUrl(props.productImage,2000)} placeholderSrc={getImageUrl(props.productImage,20)} width={1156} height={650} paddingTop="56.2860%" />
                            </div>
                            <div className="hideForMobile">
                            {!!props?.productTagging &&  Array.isArray(props.productTagging) && props.productTagging.map(product=>{
                                let positionFromTopValue=`calc(${product.positionFromTop} - 1.2rem)`
                                let positionFromBottomValue=`calc(${product.positionFromBottom} -1.2rem)`
                                if(product?.taggedProduct?.uri && product?.taggedProduct)
                                    return(
                                        <ProductTagging
                                            width={product.width} 
                                            key={product._key}
                                            productUri={product?.taggedProduct?.uri}
                                            positionFromTop={product.distanceFromTop}
                                            positionFromTopValue={positionFromTopValue} 
                                            positionFromBottomValue={positionFromBottomValue}
                                            positionFromLeft={product.distanceFromLeft}
                                            productName={product && product.taggedProduct && product.taggedProduct.name?product.taggedProduct.name:"name"}
                                            productPrice={product && !!product.taggedProduct?product.taggedProduct.prices?getPriceBasedOnSelection(product.taggedProduct,props.selection):product.taggedProduct.price:""}
                                            textAppearance={!!product.textAppearance ? product.textAppearance:"right"} 
                                            textColorBlack={product.enableTextColor}
                                        />
                                    )
                            })}  
                            </div>
                            <div className="showForMobile">
                                {!!props?.productTaggingMobile &&  Array.isArray(props.productTaggingMobile) && props.productTaggingMobile.map(product=>{
                                     let positionFromTopValue=`calc(${product.positionFromTop} - 1.2rem)`
                                     let positionFromBottomValue=`calc(${product.positionFromBottom} -1.2rem)`
                                    if(product?.taggedProduct?.uri && product?.taggedProduct)
                                    return(
                                        <ProductTagging 
                                            width={product.width}
                                            key={product._key}
                                            productUri={product?.taggedProduct?.uri}
                                            positionFromTop={product.distanceFromTop} 
                                            positionFromLeft={product.distanceFromLeft}
                                            positionFromTopValue={positionFromTopValue} 
                                            positionFromBottomValue={positionFromBottomValue}
                                            productName={product && product.taggedProduct && product.taggedProduct.name?product.taggedProduct.name:"name"}
                                            productPrice={product && !!product.taggedProduct?product.taggedProduct.prices?getPriceBasedOnSelection(product.taggedProduct,props.selection):product.taggedProduct.price:""}
                                            textAppearance={!!product.textAppearance ? product.textAppearance:"right"}
                                            textColorBlack={product.enableTextColor}
                                        />
                                    )
                                })}  
                            </div>
                                              
                        </div>
                    </div>
                </div>
                <div className="productInfo alignCenter black">
                    <div className="productInfoContentWrapper">
                        <div className="productInfoContent">
                            <h1 className={`heading font40 canelaThin ${!!props.showHeadingInMobile?"":"hideForMobile"}`}>{props.productHeading}</h1>
                            <h2 className="desc font24 canelaThin">{props.productDesc}</h2>
                            {!!props?.linksTo &&  
                                <div className="link font16 hideForMobile">
                                    <Link href={props.linksTo}>
                                        <a>
                                            <TextAndArrowCta text={!!props.linkLabel?props.linkLabel:t('seeFullCollection')} />
                                        </a>
                                    </Link> 
                                </div>
                            }
                            <div className="logoImg hideForMobile">
                                <img className="width-100" src="/images/logoPic.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!!props?.linksTo &&  
                <div className="linkMobile showForMobile">
                    <Link href={props.linksTo}>
                        <a>
                            <TextAndArrowCta text={!!props.linkLabel?props.linkLabel:t('seeFullCollection')} />
                        </a>
                    </Link>
                </div>
            }
            <style jsx>{`
                .productInfoContentWrapper{
                    display:flex;
                    height:100%;
                    justify-content:center;
                    flex-direction:column;
                }
                .collectionProduct{
                    display:flex;
                    align-items:center;
                }
                .collectionProduct.layoutReverse{
                    flex-direction: row-reverse;
                }
                .collectionProduct.layoutReverse .productInfo{
                    padding-right: 5.5%;
                    padding-left: 3.7%;
                }
                .productImage{
                    width:66%;
                }
                .wrapper{
                    padding-top:56.28%;
                }
                .content{
                    position:absolute;
                    z-index:1;
                    top:0;
                    left:0;
                    width:100%;
                }
                .productInfo{
                    padding-left: 5.5%;
                    padding-right: 3.7%;
                    width:34%;
                }
                .heading{
                    margin-bottom:4.8rem;
                }
                .desc{
                    margin:0 auto 3.2rem 0;
                    letter-spacing: 1px;
                }
                .logoImg{
                    width:2rem;
                    margin: 4.8rem auto 0; 
                }
                .link a{
                    letter-spacing: 1px;
                    margin-right: 4px;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .heading{
                        font-size:3.4rem;
                        line-height:4.8rem;
                        margin-bottom:2.2rem;
                    }
                    .logoImg{
                        width:1.7rem;
                        margin: 3rem auto 0; 
                    }
                    .desc{
                        margin:0 auto 1.5rem;
                    }
                    .productInfo{
                        padding-left: 2.5%;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .heading{
                        font-size:3.1rem;
                        line-height:3.8rem;
                        margin-bottom:1rem;
                    }
                    .desc{
                        margin:0 auto 1rem;
                    }
                    .logoImg{
                        margin: 2rem auto 0; 
                    }
                    .productInfo{
                        padding-left: 2.5%;
                    }
                    
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .heading{
                        font-size:3.1rem;
                        line-height:4.8rem;
                        margin-bottom:1rem;
                    }
                    .desc{
                        font-size:1.6rem;
                        line-height:2.4rem;
                        margin: 0 auto 1rem;
                    }
                    .logoImg{
                        width:1.3rem;
                        margin: 1rem auto 0; 
                    }
                    .productInfo{
                        padding-left: 2.5%;
                        padding-right: 0;
                    }
                }
                @media screen and (max-width: 768px){
                    .heading{
                        font-size:3.1rem;
                        line-height:2.8rem;
                        margin-bottom:1.5rem;
                    }
                    .desc{
                        font-size:1.6rem;
                        margin: 0 auto 0.5rem;
                    }
                    .logoImg{
                        width:1.3rem;
                        margin: 1rem auto 0; 
                    }
                    
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .wrapper{
                        padding-top:100%;
                    }
                    .heading{
                        font-size:2.4rem;
                        line-height:3.2rem;
                        margin-bottom:1.7rem;
                    }
                    .collectionProduct.layoutReverse .heading{
                        text-align: center;
                        padding-left: 5rem;
                        padding-right: 5rem;
                    }
                    .collectionProduct.layoutReverse .desc{
                        text-align: center;
                    }
                    .collectionProduct,
                    .collectionProduct.layoutReverse{
                        display:flex;
                        height:auto;
                        flex-direction:column-reverse;
                    }
                    .productImage{
                        width:100%;
                        margin-right:0;
                    }
                    .productInfo,
                    .collectionProduct.layoutReverse .productInfo{
                        padding:0;
                        width:100%;
                    }
                    .desc{
                        padding-left: ${cssVariables.paddingLeftMobile};
                        padding-right: ${cssVariables.paddingRightMobile};
                        width:100%;
                        line-height:2.4rem;
                        margin:0 auto 2.4rem;
                        font-size: 1.6rem;
                        text-align:left;
                        min-height: 4.8rem;
                    }
                    .linkMobile{
                        margin-top:4rem;    
                        font-size:1.2rem;
                        text-align:center;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(collectionProduct)