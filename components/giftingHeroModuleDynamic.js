import React, { useState } from 'react'
import Caret from './caret'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT, MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import {formatPrice,getProductImage} from '../functions'
import {standardGiftingAddToCart,animateCart,showCart} from '../redux/actions'
import {useRouter} from 'next/router'
import {plpPaths} from '../branch-specific-config'
import TextAndArrowCta from './textAndArrowCta'
import LazyImage from './lazyImage'
import {onStandardGifting} from '../gtmFunctions'
import useTranslation from 'next-translate/useTranslation'

function giftingHeroModule(props) {
    const [buttonDropDown,setButtonDropDown] = useState(false)
    const router = useRouter()
    let product = props.cache.products[props.item.split("-")[0]]
    let v1 = getProductImage(product,"v1","standard")
    function standardGifting(){
        let collectionId = product.collection
        let collectionFilterValues = props.common.plpPaths.find(data=>data.filterType=="collection")
        collectionFilterValues = collectionFilterValues?collectionFilterValues.filterValues:[]
        let collectionData = collectionFilterValues.find(c=>c.id==collectionId)
        let collectionUri=collectionData?collectionData.uri:null 
        if(collectionUri){
            props.showCart(true)
            router.push(`/collection/${collectionUri}?matching=${product.uri}`)
        }
        onStandardGifting(product,props.selection,props.item)
    }
    const {t}=useTranslation('common');
    return (
        <>
            {!!product &&
                <div className="giftingHeroContainer paddedContent positionRelative">
                    <div className="leftContainer">
                        <div  className="leftDetailsContainer">
                            <div className="leftDetails one alignCenter">
                                <div className="cursorPointer" onClick={()=>standardGifting()}>
                                    <div className="giftBox">
                                        <LazyImage
                                            alt="Personal gifting"
                                            originalSrc={props.img2}
                                            width={400}
                                            height={420}
                                            bgColor="#f2f2f2"
                                        />
                                    </div>
                                    <h2 className="giftBoxHeadingOne canelaThin font20">{t('standardGifting')}</h2>
                                    <h2 className="giftBoxHeadingtwo anoRegular font16">{t('allIncluded')}</h2>
                                </div>
                            </div>
                            <div className="leftDetails two alignCenter">
                                <div className="cursorPointer" onClick={()=>props.showPersonalisation(true)}>
                                    <div className="giftBox positionRelative">
                                        <LazyImage
                                            alt="Personal gifting"
                                            originalSrc={props.img1}
                                            width={400}
                                            height={420}
                                            bgColor="#f2f2f2"
                                        />
                                    </div> 
                                    <h2 className="giftBoxHeadingOne canelaThin font20">{t('personalGifting')}</h2>
                                    <h2 className="giftBoxHeadingtwo anoRegular font16">{t('allIncluded')}</h2>
                                </div>
                            </div>
                        </div>
                        <div style={{animationDelay:"0.8s"}} className="desc showForMobile anoHalfRegular font16-notResponsive ">{t('personaliseDesc')}</div>
                        {/* <div className="backPage" onClick={() => router.back()}>
                            <TextAndArrowCta text="Back" arrowDirection="left" />
                        </div> */}
                    </div>
                    <div className="rightContainer alignCenter">
                        <div className="contentPadding">
                            {!!v1 &&
                                <div className="productImg">
                                    <LazyImage
                                        alt={product?.name}
                                        originalSrc={v1}
                                        width={400}
                                        height={400}
                                        delayShowingLazyPlaceholder={3000}
                                    />
                                </div>
                            }
                            <h2 className="productName canelaThin font16-notResponsive ">{product.name}</h2>
                            <h1 className="mainHeading canelaThin font40 ">{props.heading}</h1>
                            <h2 className="process anoHalfRegular ">{product.engraving_possible=="1"?`${t('engrave')} - `:""}{t('Box')} – {t('Card')} – {t('personalNote')}</h2>
                            <h2 className="price anoRegular font16 alignCenter">{formatPrice(product.price)}</h2>
                            <div className="desc hideForMobile anoHalfRegular font16 ">{t('personaliseDesc')}</div>
                        </div>
                        <div className="buttonsWrapper">
                            <div className="buttonWrapper standard">
                                <button type="button" className="btn btnSecondary anoRegular font20 standardGiftingBtn" onClick={()=>standardGifting()}>{t('standardGifting')}</button>
                            </div>
                            <div className="buttonWrapper personal">
                                <button type="button" className="btn btnSecondary anoRegular font20 personalGiftingBtn" onClick={()=>props.showPersonalisation(true)}>{t('personalGifting')}</button>
                            </div>
                        </div>
                        <div className="standardGiftingButton contentPadding">
                            <h4 className="or anoRegular ">{t('or')}</h4>
                            <div className="standardGifting anoRegular font16">
                                <span className="inlineBlock" onClick={()=>router.back()}>
                                    <TextAndArrowCta text={t('returnToShop')} arrowDirection="left" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <style jsx>{`
                .price{
                    font-weight:bold;
                }
                .buttonsWrapper{
                    display:flex;
                    justify-content:center;
                }
                .personalGiftingBtn{
                    margin-left:1.8rem;
                }
                .or{
                    margin-top:3rem;
                }
                .giftingHeroContainer{
                    padding-bottom:6.4rem;
                    display:flex;
                }
                .backPage span{
                    margin-left:0.8rem;
                }
                .backPage{
                    cursor:pointer;
                    position: absolute;                
                    top: 2rem;
                    left: 6.4rem;
                }
                .favIcon{
                    margin-right:1.6rem;
                }
                .save{
                    display:flex;
                    justify-content:center;
                    margin-bottom:3.2rem;
                }
                .directButton{
                    text-decoration:underline;
                    cursor:pointer;
                }   
                .headingAndDetail, .addToCartButton{
                    margin-bottom:2.4rem;
                }
                .personalNote.headingAndDetail{
                    margin-bottom:4.8rem;
                }
                .personalNote.headingAndDetail .boldHeading{
                    margin-bottom:1.6rem;
                }
                .personalNote.headingAndDetail .detail{
                    letter-spacing: 0.4px;
                }
                .boldHeading{
                    margin-bottom:0.8rem;
                }
                .summaryHeading{
                    margin-bottom:4.8rem;
                    animation-delay:0.3s;
                }
                .bundledGiftingImg{
                    width:100%;
                    height:75.6rem;
                    background:#F2F2F2;
                }
                .sampleText{
                    width:100%;
                    position:absolute;
                    top:50%;
                    transform:translateY(-50%);
                }
                .engravingContainer{
                    height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                    background:#ffffff;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 9;
                    display:none;
                    transition:all 0.5s ease-out;
                }
                .engravingContainer.show{
                    display:block;
                }
                .engravingContainerMobile{
                    display:none;
                }
                .arrowRightInBotton{
                    margin-left:1.6rem;
                }
                .existingGiftbox{
                    margin-bottom:1.6rem;
                }
                .standardGiftingButton{
                    opacity:${buttonDropDown?"0":"1"};
                    pointer-events:${buttonDropDown?"none":"visible"};
                }
                .buttonContainer h2{
                    display:none;
                }
                .buttonContainer.dropDownShow h2{
                    display:block;
                    cursor:pointer;
                }
                .buttonContainer{
                    width:312px;
                    position:absolute;
                    left:50%;
                    transform:translateX(-50%);
                    height:0;
                    background:#ffffff;
                    transition:all 0.3s ease-out;
                }
                .buttonContainer.dropDownShow{
                    height:auto;
                    padding:2.4rem 0;
                }
                .standardGifting{
                    cursor:pointer;
                }
                .createGiftButton, .or{
                    margin-bottom:3rem;
                }
                .arrowLeft{
                    margin-right:0.8rem;
                }
                .productName{
                    margin-bottom:1.6rem;
                }
                .process, .price{
                    margin-bottom:3.3rem;
                }
                .desc{
                    margin-bottom:4.8rem;
                }
                .mainHeading{
                    margin-bottom:1rem;
                } 
                .logoOnGiftingBox{
                    position:absolute;
                    bottom:3.2rem;
                    left:50%;
                    transform:translateX(-50%);
                }
                .giftBoxHeadingOne{
                    margin-bottom:1.6rem;
                }
                .giftBox{
                    margin-bottom:4rem;
                }
                .leftContainer .leftDetails{
                    padding-right:2rem;
                }
                .leftDetailsContainer{
                    animation-delay: 0.1s;
                    margin-right:-2rem;
                    display:flex;
                    justify-content: space-evenly;
                }
                .leftDetails{
                    flex:1 1 100%;
                }
                .leftContainer{
                    width:50%;
                    background:#F2F2F2;
                    padding-top:24.7rem;
                    padding-left:6.1rem;
                    padding-right:7.7rem;
                    padding-bottom:13.9rem;
                }
                .rightContainer{
                    width:50%;
                }
                .contentPadding{
                    padding-left:18%;
                    padding-right:18%;
                }
                .productImg{
                    width:19.8rem;
                    margin:0 auto 1.6rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:5rem;
                    }
                    .leftContainer{
                        padding-top:20.9rem;
                        padding-left:5.5rem;
                        padding-right:6.7rem;
                        padding-bottom:12.4rem;
                    }
                    .leftContainer .leftDetails{
                        padding-right:1.8rem;
                    }
                    .leftDetailsContainer{
                        margin-right:-1.8rem;
                    }
                    .productImg{
                        width:17.7rem;
                        margin:0 auto 1.8rem
                    }
                    .productName{
                        font-size:1.4rem;
                        margin-bottom:2.3rem;
                    }
                    .price{
                        font-size:1.8rem;
                        margin-bottom:2.1rem;
                    }
                    .process{
                        margin-bottom:3.7rem;
                    }
                    .desc{
                        margin-bottom:4.6rem;
                    }
                    .createGiftButton button{
                        font-size:1.8rem;
                    }
                    .createGiftButton{
                        margin-bottom:2.9rem;
                    }
                    .bundledGiftingImg{
                        height:67.2rem;
                    }
                    .summaryHeading{
                        font-size:4rem;
                    }
                    .boldHeading, .detail{
                        font-size:1.4rem;
                    }    
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:4.3rem;
                    }
                    .leftContainer{
                        padding-top:19rem;
                        padding-left:5.6rem;
                        padding-right:5.1rem;
                        padding-bottom:11.7rem;
                    }
                    .leftContainer .leftDetails{
                        padding-right:1.6rem;
                    }
                    .leftDetailsContainer{
                        margin-right:-1.6rem;
                    }
                    .productImg{
                        width:15.4rem;
                        margin:0 auto 1.5rem;
                    }
                    .productName{
                        font-size:1.2rem;
                        margin-bottom:2rem;
                    }
                    .price{
                        font-size:1.5rem;
                        margin-bottom:1.8rem;
                    }
                    .process{
                        font-size:1.2rem;
                        margin-bottom:3rem;
                    }
                    .desc{
                        //font-size:1.2rem;
                        margin-bottom:4rem;
                        line-height: 18px;
                        letter-spacing: 0.6px;
                    }
                    .createGiftButton button{
                        font-size:1.5rem;
                    }
                    .createGiftButton{
                        margin-bottom:2.5rem;
                    }
                    .contentPadding{
                        padding-left:7%;
                        padding-right:7%;
                    }
                    .bundledGiftingImg{
                        height:58.3rem;
                    }
                    .boldHeading, .detail{
                        font-size:1.2rem;
                    } 
                    .summaryHeading{
                        margin-bottom:3.8rem;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:5.9rem;
                    }
                    .leftContainer{
                        padding-top:19.9rem;
                        padding-left:3.8rem;
                        padding-right:4.2rem;
                        padding-bottom:19.8rem;
                    }
                    .leftContainer .leftDetails{
                        padding-right:1.2rem;
                    }
                    .leftDetailsContainer{
                        margin-right:-1.2rem;
                    }
                    .leftContainer{
                        width:49%;
                    }
                    .rightContainer{
                        width:51%;
                    }
                    .contentPadding{
                        padding-left:2.5%;
                        padding-right:2.5%;
                    }
                    .desc{
                        line-height: 18px;
                        letter-spacing: 0.6px;
                    }
                }
                @media screen and (max-width: 1000px){
                    .buttonsWrapper{
                        display: flex;
                        flex-direction: column;
                    }
                    .personalGiftingBtn{
                        margin-left:0;
                    }
                    .buttonWrapper.personal{
                        order:1;
                    }
                    .buttonWrapper.standard{
                        order:2;
                        margin-top:1.6rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .desc{
                        line-height:2.4rem;
                    }
                    .giftingHeroContainer{
                        padding-bottom:9.6rem;
                        flex-direction: column-reverse;
                    }
                    .backPage{
                        top: 1.6rem;
                        left: 3.6rem;
                    }
                    .shippingDate{
                        margin-bottom:3.2rem;
                        text-align:center;
                    }
                    .summaryHeading{
                        margin-bottom:3.2rem;
                        text-align:center;
                        animation-delay:1.4s;
                    }
                    .addToCartButton{
                        margin-bottom:2.4rem;
                    }
                    .bundledGiftingImg{
                        height:28.2rem;
                        margin-bottom:3.2rem;
                    }
                    .save{
                        margin-bottom:1.6rem;
                    }
                    .bundledGiftingImg .sampleText{
                        display:none;
                    }
                    .engravingContainerMobile{
                        height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                        background:#ffffff;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        z-index: 9;
                        display:none;
                        transition:all 0.5s ease-out;
                    }
                    .engravingContainerMobile.show{
                        display:block;
                        //transform:translateY(0%);
                    }
                    .engravingContainer{
                        display:none;
                    }
                    .leftContainer{
                        width:100%;
                        background:#ffffff;
                        padding:0;
                    }
                    .rightContainer{
                        width:100%;
                        margin-bottom:2rem;
                    }
                    .contentPadding{
                        padding-left:0;
                        padding-right:0;
                    }
                    .productImg{
                        width:13.9rem;
                        height:13.9rem;
                        margin:0 auto 1.6rem;
                    }
                    .productImg img{
                        width:100%;
                    }
                    .productName{
                        font-size:1.6rem;
                        margin-bottom:1.2rem;
                    }
                    .mainHeading{
                        font-size:3.2rem;
                    }
                    .price{
                        margin-bottom:3.9rem;
                    }
                    .process{
                        margin-bottom:3.9rem;
                    }
                    .createGiftButton, .or{
                        margin-bottom:1.6rem;
                    }
                    .newGiftButton{
                        font-family: AnoRegular, sans-serif;
                    }
                    .standardGifting{
                        margin-bottom:4.8rem;
                    }
                    .leftDetailsContainer{
                        animation-delay: 1.2s;
                        width:100%;
                        background:#F2F2F2;
                        margin-bottom:2.4rem;
                        padding-bottom: 3rem;
                        padding-top:2rem;
                    }
                    .desc{
                        letter-spacing:0.5px;
                        margin-bottom:0rem;
                    }
                }
                
            `}</style>   
        </>
    )
}
function mapStateToProps({common,gifting,selection,cache}){
    return {common,gifting,selection,cache}
}
export default connect(mapStateToProps,{standardGiftingAddToCart,animateCart,showCart})(giftingHeroModule)
