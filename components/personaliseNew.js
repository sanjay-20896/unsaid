import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {showNavBar,preventNavHide,preventBodyScroll,setEngravingText,setNoteText,setBoxChoice,setCardChoice,updateCart,setGiftEditFromSummary} from '../redux/actions'
import {formatPrice} from '../functions'
import Slider from "react-slick";
import EngravingWindow from './engravingWindow';
import {MOBILE_BREAKPOINT, MEDIUM_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MEDIUM, HEADER_HEIGHT_TABLET, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import GiftBoxWindow from './giftBoxWindow';
import PostCardWindow from './postCardWindow';
import PostNoteWindow from './postNoteWindow';
import PersonalisationSummary from './personalisationSummary'
import {useRouter} from 'next/router'
import Loader from './loader'
import TextAndArrowCta from './textAndArrowCta'
import {onUpdateCart} from '../gtmFunctions'
import useTranslation from 'next-translate/useTranslation'
function personaliseNew(props) {
    const {t}=useTranslation('common');
    const [updateButtonLabel, setUpdateButtonLabel] = useState(t('update'))
    const [defaultPostcard,setDefaultPostcard] = useState(false)
    const [postNoteImage1, setPostNoteImage1] = useState();
    const [postNoteImage2, setPostNoteImage2] = useState();
    const [mainSliderIndex, setMainSliderIndex] = useState(0);
    const [disableNext, setDisableNext] = useState(false)
    const [loading,setLoading] = useState(false)
    const didMount = useRef(false)
    const router = useRouter()
    const slider=useRef();
    let product = props.cache.products[props.item.split("-")[0]]
    function goToSlide(n){
        slider.current.slickGoTo(n)
        setMainSliderIndex(n)
    }
    useEffect(()=>{
        if(props.personalisationShow){
            props.preventBodyScroll(true)
            props.preventNavHide(true)
            props.showNavBar(true)
        } else {
            props.preventBodyScroll(false)
            props.preventNavHide(false)
        }
    },[props.personalisationShow,mainSliderIndex])
    function previousWindow(){
        if(mainSliderIndex>0){
            slider.current.slickPrev()
        }else {
            props.showPersonalisation(false)   
        }
    }
    function nextWindow(){
        let maxIndex = product.engraving_possible=="1"?4:3
        if(mainSliderIndex!=maxIndex){
            if(props.common.giftEditFromSummary){
                slider.current.slickGoTo(maxIndex);
                props.setGiftEditFromSummary(false);
                setUpdateButtonLabel(t('update'));
            }else{
                slider.current.slickNext()
            }
        } 
        else {
            props.updateCart(props.selection,props.gifting,props.personalisation,props.bundleId,props.jewel,product,props.item,router,mainSliderIndex==maxIndex?false:true,(bool)=>{setLoading(false)},props.common.plpPaths)
            onUpdateCart(product,props.selection,props.personalisation.bundle[props.bundleId],props.item)
        }
    }
    const settings = {
        swipe:false,
        arrows:false,
        adaptiveHeight:false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setMainSliderIndex(next)
    }
    let addToCartContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('updateCart')
    let nextLabel = ""
    if(product?.engraving_possible=="1"){
        if(mainSliderIndex==0)
            nextLabel = `1/5 - ${t('next')}`
        else if(mainSliderIndex==1)
            nextLabel = `2/5 - ${t('next')}`
        else if(mainSliderIndex==2)
            nextLabel = `3/5 - ${t('next')}`
        else if(mainSliderIndex==3)
            nextLabel = `4/5 - ${t('next')}`
        else if(mainSliderIndex==4)
            nextLabel = addToCartContent
    } else {
        if(mainSliderIndex==0)
            nextLabel = `1/4 - ${t('next')}`
        else if(mainSliderIndex==1)
            nextLabel = `2/4 - ${t('next')}`
        else if(mainSliderIndex==2)
            nextLabel = `3/4 - ${t('next')}`
        else if(mainSliderIndex==3)
            nextLabel = addToCartContent
    }
    let personaliseWindows = [
        <GiftBoxWindow  mainSliderIndex={mainSliderIndex} personalisationShow={props.personalisationShow} item={props.item} bundleId={props.bundleId} jewel={props.jewel}/>,
        <PostCardWindow setDefaultPostcard={setDefaultPostcard} setNoteImg1={(img)=>setPostNoteImage1(img)} setNoteImg2={(img)=>setPostNoteImage2(img)} mainSliderIndex={mainSliderIndex} item={props.item} bundleId={props.bundleId} jewel={props.jewel}/>,
        <PostNoteWindow defaultPostcard={defaultPostcard} disableNextButton={(state)=>setDisableNext(state)} isNextDisabled={disableNext} noteImage1={postNoteImage1} noteImage2={postNoteImage2} mainSliderIndex={mainSliderIndex} item={props.item} bundleId={props.bundleId} jewel={props.jewel}/>,
        <>
            <div className="personalisationSummary">
                {!!props.personalisation.bundle[props.bundleId] && (mainSliderIndex==(product.engraving_possible=="1"?4:3)) &&
                <PersonalisationSummary 
                        bundleId={props.bundleId} 
                        jewel={props.jewel}
                        item={props.item}
                        goToSlide={goToSlide} 
                        showPersonalisation={props.showPersonalisation} 
                        close={props.close}
                    />
                }
            </div>
            <style jsx>{`
                .personalisationSummary{
                    padding-top: ${props.common.showBrandNotification?HEADER_HEIGHT_DESKTOP+28:HEADER_HEIGHT_DESKTOP}px;
                    padding-bottom:8rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .personalisationSummary{
                        padding-top: ${props.common.showBrandNotification?HEADER_HEIGHT_MEDIUM+28:HEADER_HEIGHT_MEDIUM}px;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .personalisationSummary{
                        padding-top: ${props.common.showBrandNotification?HEADER_HEIGHT_TABLET+28:HEADER_HEIGHT_TABLET}px;
                    }
                }
            `}</style>
        </>
    ];
    if(product?.engraving_possible=="1"){personaliseWindows.unshift(<EngravingWindow item={props.item} bundleId={props.bundleId}/>)}
    useEffect(()=>{
        if (didMount.current) {
            let cartItems = props.selection?.selection?.selection?.items
            if(Array.isArray(cartItems)){
                let editCartItem = cartItems.find(lineItem=>{
                    if(lineItem.comment){
                        let comment = JSON.parse(lineItem.comment)
                        if( props.jewel==comment.mainJewelProductId &&
                            product.product==comment.selectedJewelProductId &&
                            props.item==comment.selectedItem
                        )
                        return true
                    } else {
                        return false
                    }
                })
                if(editCartItem){
                    let comment = JSON.parse(editCartItem.comment)
                    if(
                        (
                            props.personalisation.bundle[props.bundleId].cardChoice != comment.cardChoice
                            || props.personalisation.bundle[props.bundleId].boxChoice != comment.boxChoice
                        ) && !(product.engraving_possible=="1" && mainSliderIndex==0) //avoid update if engraving window
                    ){
                        // console.log("update cart useeffect")
                        props.updateCart(props.selection,props.gifting,props.personalisation,props.bundleId,props.jewel,product,props.item,router,true,null,props.common.plpPaths)
                    }
                }
            }
        } else {
            didMount.current = true
        }
    },[props.personalisation])
    return (
        <>
            <div className="personaliseNew positionRelative">
                <Slider ref={slider} {...settings}>
                    {personaliseWindows.map(slide => slide)}
                </Slider>
                <div className="allIncludedLabel anoRegular font16  showForMobile positionAbsolute">{t('allIncluded')}</div>
                <div className="productPriceLabel anoRegular font16  showForMobile positionAbsolute">{!!product.price && product.price}</div>
                <div onClick={()=>previousWindow()} style={{animationDelay:"0.6s"}} className="backButton anoRegular font16 ">
                    <TextAndArrowCta text={t('back1')} arrowDirection="left" />
                </div>
                <div className="bottomContent paddedContent ">
                    <div onClick={()=>previousWindow()} className="backButton anoRegular font16">
                        <TextAndArrowCta text={t('back1')} arrowDirection="left" />
                    </div>
                    <div className="processList anoRegular hideForMobile">
                        {product.engraving_possible=="1" &&
                            <h2 onClick={()=>{slider.current.slickGoTo(0)}} className={`font16 grey ${mainSliderIndex===0?"currentlyActive":""}`}>{t('engrave')}</h2>
                        }
                        <h2 onClick={()=>{slider.current.slickGoTo(product.engraving_possible=="1"?1:0);}} className={`font16 grey ${mainSliderIndex===(product.engraving_possible=="1"?1:0)?"currentlyActive":""}`}>{t('Box')}</h2>
                        <h2 onClick={()=>{slider.current.slickGoTo(product.engraving_possible=="1"?2:1);}} className={`font16 grey ${mainSliderIndex===(product.engraving_possible=="1"?2:1)?"currentlyActive":""}`}>{t('Card')}</h2>
                        <h2 onClick={()=>{slider.current.slickGoTo(product.engraving_possible=="1"?3:2);}} className={`font16 grey ${mainSliderIndex===(product.engraving_possible=="1"?3:2)?"currentlyActive":""}`}>{t('note')}</h2>
                        <h2 onClick={()=>{slider.current.slickGoTo(product.engraving_possible=="1"?4:3)}} className={`font16 grey ${mainSliderIndex===(product.engraving_possible=="1"?4:3)?"currentlyActive":""}`}>{t('summary')}</h2>
                    </div>
                    <div className="priceAndAddToCart">
                        <div className="hideForMobile alignRight allIncluded">
                            <div className="inlineBlock anoRegular font16">{formatPrice(product.price)}</div>
                            <div className="allIncludedText">{t('allIncluded')}</div>
                        </div>
                        <button onClick={()=>disableNext==false?nextWindow():""} className={`updateCartBtn anoRegular font20 btn ${loading?"loading":""} ${disableNext?"btnInactive":"btnPrimary"}`}>{props.common.giftEditFromSummary?updateButtonLabel:nextLabel}</button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .priceAndAddToCart{
                    display:flex;
                    align-items:center;
                }
                .allIncluded{
                    margin-right:2.5rem;
                }
                .allIncludedText{
                    font-size:1.2rem;
                    line-height:2.4rem;
                }
                .allIncludedPrice{
                    display:inline-block;
                }
                .personaliseNew{
                    height:100%;
                    overflow:hidden;
                }
                .bottomContent{
                    box-shadow: 0 1px 5px #e0e0e0;
                    position:absolute;
                    bottom:0;
                    z-index:20;
                    background:#ffffff;
                    align-items:center;
                    height:8rem;
                    width: 100%;
                    display:flex;
                    justify-content:space-between;
                }
                .backButton{
                    cursor:pointer;
                }
                .processList h2.currentlyActive{
                    color:#000000;
                }
                .processList{
                    align-items:center;
                    display:flex;
                    margin-right:-3.2rem;
                    padding-left:28rem;
                }
                .processList h2{
                    padding-right:3.2rem;
                    cursor:pointer;
                }
                .arrowBack{
                    margin-right:0.8rem;
                }
                .updateCartBtn.loading{
                    color:#ffffff;
                    background:#000000;
                }
                .updateCartBtn{
                    min-width:18.8rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .updateCartBtn{
                        min-width:17.75rem;
                    }
                }
                @media screen and (max-width: 1130px){
                    .processList{
                        padding-left:24rem;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .updateCartBtn{
                        min-width:16.63rem;
                    }
                    .processList{
                        padding-left:20rem;
                    }
                }
                @media screen and (max-width: 1000px){
                    .processList{
                        padding-left:14rem;
                    }
                }
                @media screen and (max-width: 917px){
                    .processList{
                        padding-left:7rem;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .processList{
                        padding-left:2rem;
                    }
                    .allIncludedPrice{
                        margin-right:1.5rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .allIncludedLabel{
                        top:7.2rem;
                        left:50%;
                        transform: translateX(-50%) !important;
                    }  
                    .productPriceLabel{
                        top:7.2rem;
                        right:3.2rem;
                    }
                    .backButton{
                        position:absolute;
                        left:3.6rem;
                        top:7.2rem;
                    }
                    .bottomContent{
                        display:none;
                    }
                    .nextButtonMobile{
                        top:0;
                        margin:1.6rem 3.6rem;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection,gifting,common,cache,personalisation}){
    return {selection,gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{showNavBar,preventNavHide,preventBodyScroll,setEngravingText,setNoteText,setBoxChoice,setCardChoice,updateCart,setGiftEditFromSummary})(personaliseNew)