import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT, MEDIUM_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT, HEADER_HEIGHT_TABLET,TOKEN_VAR_NAME, HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MEDIUM, TABLET_LANDSCAPE_BREAKPOINT, UNSAID_API} from '../config'
import TextAndArrowCta from './textAndArrowCta'
import cssVariables from '../data/cssVariables'
import Loader from './loader'
import {getProductImage,formatPrice,getPriceBasedOnSelection} from '../functions'
import {addBundleToCart,showNavBar,setShowNotification,showCart,setGiftEditFromSummary} from '../redux/actions'
import LikeGift from './likeGift'
import ShipsBy from './shipsBy'
import CartNoteText from '../components/cartNoteText'
import useTranslation from 'next-translate/useTranslation'
function personalisationSummary(props) {
    const {t}=useTranslation('common');
    const [category, setCategory] = useState("");
    const [stockDetails,setStockDetails] = useState(null);
    let jewelProduct = props.cache.products[props.item.split("-")[0]]
    let size = jewelProduct?.items?.find(it=>it.item==props.item)
    let selectedSize = size?.name
    let boxProductId = props.personalisation.bundle[props.bundleId].boxChoice.split("-")[0]
    let cardProductId = props.personalisation.bundle[props.bundleId].cardChoice.split("-")[0]
    let boxProduct = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.find(p=>p.product==boxProductId)
    let cardProduct = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.find(p=>p.product==cardProductId)
    let boxProductImage = boxProduct && boxProduct?.media?.standard && Array.isArray(boxProduct?.media?.standard) ? boxProduct?.media?.standard[0]:null
    let cardProductImage1 = cardProduct && cardProduct?.media?.standard && Array.isArray(cardProduct?.media?.standard) ? cardProduct?.media?.standard[0]:null
    let cardProductImage2 = cardProduct && cardProduct?.media?.standard && Array.isArray(cardProduct?.media?.standard) ? cardProduct?.media?.standard[1]:null
    let jewelImage = getProductImage(jewelProduct,"s1","standard")
    let desktopBundleHeight = `calc(100vh - ${props.common.showBrandNotification?HEADER_HEIGHT_DESKTOP+28:HEADER_HEIGHT_DESKTOP}px - 8rem)`
    let mediumBundleHeight = `calc(100vh - ${props.common.showBrandNotification?HEADER_HEIGHT_MEDIUM+28:HEADER_HEIGHT_MEDIUM}px - 8rem)`
    let landscapeBundleHeight = `calc(100vh - ${props.common.showBrandNotification?HEADER_HEIGHT_TABLET+28:HEADER_HEIGHT_TABLET}px - 8rem)`
    useEffect(()=>{
        setCategory(jewelProduct.categoryName[0])
    },[])
    async function getStockDetails(eans){
        let response=await fetch(`${UNSAID_API}/api/getStockDetails`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"eans": eans})
        })
        let data=await response.json()
        // console.log("data res",data);
        if(data.ResponseStatus=="Success"){
            setStockDetails(data.ResponseData)
        }
    }
    useEffect(()=>{
        let eans = [size.ean];
        getStockDetails(eans);
    },[size])
    let getSelectedItemsStock = !!stockDetails && !!size && stockDetails.find(item=> item.EAN==size.ean)
    let checkStockAvailability=false;
    let stockLocation = "Belgium studio.";
    // console.log("getSelectedItemsStock",getSelectedItemsStock);
    if(!!getSelectedItemsStock && getSelectedItemsStock.status=="Available"){
        checkStockAvailability=true;
        if(getSelectedItemsStock.LocationName=="For LP") stockLocation = "Paris studio."
        else stockLocation = "Belgium studio."
    }else{
        checkStockAvailability=false;
        stockLocation = "Belgium studio."
    }
    
    return (
        
        <div className="positionRelative">
            <div className="showForMobile personalisationTop paddedContent">
                <div onClick={()=>{props.goToSlide(jewelProduct.engraving_possible=="1"?3:2)}}><TextAndArrowCta arrowDirection="left" text={t('back1')} /></div>
                <div className="anoRegular">{t('allIncluded')}</div>
                <div className="anoRegular">{formatPrice(jewelProduct.price)}</div>
            </div>
            <div className="giftingHeroContainer paddedContent finalGiftSummary">
                <div className={`leftContainer ${!!props?.personalisation?.bundle[props.bundleId]?.noteText?"":"noNote"} ${!!props?.personalisation?.bundle[props.bundleId]?.noteText && cardProduct.name != "Unsaid Post Card" ? "":"singleCard1"} `}>
                        <div style={{animationDelay:"0.1s"}} className="bundledGiftingImg positionRelative">
                            <div className="bundleLine positionAbsolute">
                                <div className="width-100 height-100 positionRelative">
                                    <div className="boxImage">
                                        <img src={boxProductImage} className="width-100" />
                                    </div>
                                    {!!props?.personalisation?.bundle[props.bundleId]?.noteText && cardProduct.name != "Unsaid Post Card" && 
                                    <div className="cardFrontImage positionAbsolute">
                                        <img src={cardProductImage1} className="width-100" />
                                    </div>}
                                    {!props?.personalisation?.bundle[props.bundleId]?.noteText && 
                                    <div className="cardFrontImage defaultCard">
                                        <img src={cardProductImage1} className="width-100" />
                                    </div>}
                                    {!!props?.personalisation?.bundle[props.bundleId]?.noteText &&
                                        <div className="cardBackImage">
                                            <div className="positionRelative width-100">
                                                <img src={cardProductImage2} className="width-100" />
                                                <div className="noteTextOnImage canelaThin">
                                                    <div className="noteTextContainer">
                                                        <div className="noteTextElement">{props.personalisation.bundle[props.bundleId].noteText}</div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    }
                                    {!!jewelImage &&
                                        <div className={`jewelImage ${category}`}>
                                            <img src={jewelImage} className="width-100" />
                                        </div>
                                    }
                                </div>
                            </div>
                            
                            {/* {!!props?.personalisation?.bundle[props.bundleId]?.noteText && cardProduct.name != "Unsaid Post Card" && 
                            <div className="cardFrontImage">
                                <img src={cardProductImage1} className="width-100" />
                            </div>}
                            {!props?.personalisation?.bundle[props.bundleId]?.noteText && cardProduct.name === "Unsaid Post Card" && 
                            <div className="cardFrontImage defaultCard">
                                <img src={cardProductImage1} className="width-100" />
                            </div>}
                            {!!props?.personalisation?.bundle[props.bundleId]?.noteText &&
                                <div className="cardBackImage">
                                    <div className="positionRelative width-100">
                                        <img src={cardProductImage2} className="width-100" />
                                        <div className="noteTextOnImage canelaThin">
                                            <div className="noteTextContainer">
                                                <div className="noteTextElement">{props.personalisation.bundle[props.bundleId].noteText}</div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            }
                            <div className={`jewelImage ${category}`}>
                                {!!jewelImage &&
                                    <img src={jewelImage} className="width-100" />
                                }
                            </div> */}
                            <div className="like showForMobile paddedContent">
                                <div className="save ">
                                    <div className="favIcon"><LikeGift bundleId={props.bundleId} jewel={props.jewel} item={props.item}  /></div>
                                    <div className="anoRegular font16 msg">{t('SaveForLater')}</div>
                                </div>
                            </div>
                        </div>
                        
                </div>
                <div className="rightContainer alignCenter">
                    <h1 className="summaryHeading canelaThin font40 ">{t('giftSummary')}</h1>
                    <h4 style={{animationDelay:"1.5s"}} className="shippingDate anoHalfRegular font16">
                        <ShipsBy stockLocation={stockLocation} checkStockAvailability={checkStockAvailability} currentSelectedProduct={jewelProduct} selectedItem={{name:selectedSize}} />
                    </h4>
                    {/* <div className="showForMobile"> 
                        <button style={{animationDelay:"1.4s"}} className={`btn addToCartButton width-100 btnPrimary anoRegular font20  ${props.common.addingToCart?"addingToCart":""}`} onClick={()=>addToCart()}>{addToCartContent}</button>
                    </div> */}
                    <div className="headingAndDetail nameSizeAndColor">
                        <h1 style={{animationDelay:"0.3s"}} className="boldHeading anoRegular font16-notResponsive ">{jewelProduct?.name}</h1>
                        <h1 style={{animationDelay:"0.4s"}} className="detail anoHalfRegular font16-notResponsive ">{!!selectedSize ? <span>{t('size')} {selectedSize}, </span>:""}{jewelProduct.color.color_text}</h1>
                    </div>
                    {jewelProduct.engraving_possible=="1" &&
                        <div className="headingAndDetail">
                            <h1 style={{animationDelay:"0.5s"}} className="boldHeading anoRegular font16-notResponsive ">{t('engraving')} <span onClick={()=>{props.goToSlide(0),props.setGiftEditFromSummary(true)}} className="directButton anoHalfRegular">{t('edit')}</span></h1>
                            <h1 style={{animationDelay:"0.6s"}} className="detail anoHalfRegular font16-notResponsive  showForMobile">“{props.personalisation.bundle[props.bundleId].engravingText}”</h1>
                            <h1 style={{animationDelay:"0.6s"}} className="detail anoHalfRegular font16-notResponsive  hideForMobile">“{props.personalisation.bundle[props.bundleId].engravingText}”</h1>
                        </div>
                    }
                    <div className="headingAndDetail">
                        <h1 style={{animationDelay:"0.7s"}} className="boldHeading anoRegular font16-notResponsive ">{t('giftBox')} <span onClick={()=>{props.goToSlide(jewelProduct.engraving_possible=="1"?1:0),props.setGiftEditFromSummary(true)}} className="directButton anoHalfRegular">{t('edit')}</span></h1>
                        <h1 style={{animationDelay:"0.8s"}} className="detail anoHalfRegular font16-notResponsive  showForMobile">{props.personalisation.bundle[props.bundleId].boxName}</h1>
                        <h1 style={{animationDelay:"0.8s"}} className="detail anoHalfRegular font16-notResponsive  hideForMobile">{props.personalisation.bundle[props.bundleId].boxName}</h1>
                    </div>
                    <div className="headingAndDetail">
                        <h1 style={{animationDelay:"0.9s"}} className="boldHeading anoRegular font16-notResponsive ">{t('Card')} <span onClick={()=>{props.goToSlide(jewelProduct.engraving_possible=="1"?2:1),props.setGiftEditFromSummary(true)}} className="directButton anoHalfRegular">{t('edit')}</span></h1>
                        <h1 style={{animationDelay:"1s"}} className="detail anoHalfRegular font16-notResponsive  showForMobile">{props.personalisation.bundle[props.bundleId].cardName}</h1>
                        <h1 style={{animationDelay:"1s"}} className="detail anoHalfRegular font16-notResponsive  hideForMobile">{props.personalisation.bundle[props.bundleId].cardName}</h1>
                    </div>
                    <div className="headingAndDetail personalNote">
                        <h1 style={{animationDelay:"1.1s"}} className="boldHeading anoRegular font16-notResponsive ">{t('personalNote')} <span onClick={()=>{props.goToSlide(jewelProduct.engraving_possible=="1"?3:2),props.setGiftEditFromSummary(true)}} className="directButton anoHalfRegular">{t('edit')}</span></h1>
                        <h1 style={{animationDelay:"1.2s"}} className="detail anoHalfRegular font16-notResponsive  showForMobile">{!!props.personalisation.bundle[props.bundleId].noteText?<CartNoteText noteText={props.personalisation.bundle[props.bundleId].noteText} readMore={true}/>:""}</h1>
                        <h1 style={{animationDelay:"1.2s"}} className="detail anoHalfRegular font16-notResponsive  hideForMobile">{!!props.personalisation.bundle[props.bundleId].noteText?<CartNoteText noteText={props.personalisation.bundle[props.bundleId].noteText} readMore={true}/>:""}</h1>
                    </div>
                    <div className="hideForMobile">
                        <div style={{animationDelay:"1.3s"}} className="save">
                            <div className="favIcon"><LikeGift bundleId={props.bundleId} jewel={props.jewel} item={props.item}  /></div>
                            <div className="anoRegular font16">{t('SaveForLater')}</div>
                        </div>
                        {/* <button style={{animationDelay:"1.4s"}} className={`addToCartButton width-100 btn btnPrimary anoRegular font20  ${props.common.addingToCart?"addingToCart":""}`} onClick={()=>addToCart()}>{addToCartContent}</button> */}
                        {/* <h4 style={{animationDelay:"1.5s"}} className="shippingDate anoHalfRegular ">
                            <ShipsBy currentSelectedProduct={jewelProduct} selectedItem={{name:selectedSize}} />
                        </h4> */}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .like{
                    position:absolute;
                    bottom:-5px;
                }
                .cardFrontImage{
                    box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
                    position: absolute;
                    width: 20.5%;
                    bottom: 19.3%;
                    left: 42.5%;
                }
                .boxImage{
                    width: 49%;
                }
                .jewelImage{
                    position: absolute;
                    top: 16%;
                    width: 43%;
                    left: 57%;
                }
                .jewelImage.Earrings{
                    top: 13%;
                }
                .jewelImage.Necklaces{
                    top: 18%;
                    width: 37%;
                    left: 60.5%;
                }
                .singleCard1 .jewelImage.Necklaces, .noNote .jewelImage.Necklaces{
                    top: 27%;
                    left: 58%;
                }
                .noNote .cardFrontImage{
                    width: 20%;
                    position: absolute;
                    bottom: 14%;
                    left: 40%;
                }
                .cardBackImage{
                    box-shadow: rgb(0 0 0 / 16%) 0px 3px 6px, rgb(0 0 0 / 23%) 0px 3px 6px;
                    width: 20%;
                    position: absolute;
                    bottom: 14%;
                    left: 40%;
                }
                .bundleLine{
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                }
                .addToCartButton.addingToCart{
                    background:#000000 !important;
                }
                .noteTextOnImage{
                    line-height: 8px;
                    white-space: break-spaces;
                    word-break: break-word;
                    position: absolute;
                    left: 0;
                    top: 0;
                    font-size: 0.5vw;
                    width: 100%;
                    height:100%;
                }
                .noteTextContainer{
                    overflow:hidden;
                    padding:11.4% 16.66% 22.8%;
                    width:100%;
                    height:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                .noteTextElement{
                    font-size: 4px;
                    line-height: 5px;
                }
                .noteTextOnImage{
                    background: #ffffff;
                }
                .backPage{
                    cursor:pointer;
                    position: absolute;
                    top: 1rem;
                    left: ${cssVariables.paddingLeftDesktop};
                    z-index:1;
                }
                .giftingHeroContainer{
                    display:flex;
                }
                .favIcon{
                    margin-right:1.6rem;
                }
                .save{
                    display:flex;
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
                    margin-bottom:2.2rem;
                }
                .personalNote.headingAndDetail h1{
                    word-break: break-word;
                    white-space: break-spaces;
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
                    margin-bottom:0.6rem;
                }
                .nameSizeAndColor{
                    margin-top:4.2rem;
                }
                .bundledGiftingImg{
                    width:100%;
                    height:${desktopBundleHeight};
                    background:#F2F2F2;
                }
                .sampleText{
                    width:100%;
                    position:absolute;
                    top:50%;
                    transform:translateY(-50%);
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
                }
                .leftContainer{
                    width:50%;
                    background:#F2F2F2;
                    padding-top:24.7rem;
                    padding-left:6.1rem;
                    padding-right:7.7rem;
                    padding-bottom:13.9rem;
                }
                .finalGiftSummary .leftContainer{
                    padding:0;
                    background:#ffffff;
                }
                .rightContainer{
                    width:50%;
                    padding: 0 8%;
                }
                .finalGiftSummary .rightContainer{
                    text-align:left;
                    padding:5.6rem 11.1rem 0 13.5rem;
                }
                .productImg{
                    width:19.8rem;
                    margin:0 auto 1.6rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .bundledGiftingImg{
                        height:${mediumBundleHeight};
                    }
                    .backPage{
                        left: ${cssVariables.paddingLeftMedium};
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
                    
                    .finalGiftSummary .rightContainer{
                        text-align:left;
                        padding:8.7rem 10rem 0 10rem;
                    }
                    .summaryHeading{
                        font-size:4rem;
                    }
                    .boldHeading, .detail{
                        font-size:1.4rem;
                    }    
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .bundledGiftingImg{
                        height:${landscapeBundleHeight};
                    }
                    .backPage{
                        left: ${cssVariables.paddingLeftTabletLandscape};
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
                    .rightContainer{
                        padding: 0 7%;
                    }
                    .msg{
                        margin-left: 0.8rem;
                        transform: translateY(-0.15rem);
                    }
                    .boldHeading, .detail{
                        font-size:1.2rem;
                    }
                    .finalGiftSummary .rightContainer{
                        padding:7.6rem 8rem 0 9rem;
                    }
                    .summaryHeading{
                        margin-bottom:3.8rem;
                    }
                    .noteTextElement{
                        font-size: 3px;
                        line-height: 3px;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .backPage{
                        left: ${cssVariables.paddingLeftTabletPortrait};
                    }
                    .noteTextElement{
                        font-size: 3px;
                        line-height: 2px;
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
                        padding: 0 2.5%;
                    }
                    .finalGiftSummary .rightContainer{
                        padding:7.6rem 1.7rem 0 7rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .favIcon{
                        margin-right:0;
                    }
                    .jewelImage.Necklaces{
                        top: 20%;
                        width: 35%;
                        left: 62%;
                    }
                    .singleCard1 .jewelImage.Necklaces, .noNote .jewelImage.Necklaces{
                        top: 27%;
                        left: 59%;
                    }
                    .personalisationTop{
                        display:flex;
                        justify-content:space-between;
                        padding-top:1.6rem;
                        padding-bottom:1.6rem;
                    }
                    .save{
                        justify-content:center;
                    }
                    .noteTextOnImage{
                        font-size: 0.9vw;
                        line-height: 1.2vw;
                    }
                    .backPage{
                        left: ${cssVariables.paddingLeftMobile};
                    }
                    .shippingDate{
                        text-align:center;
                    }
                    .nameSizeAndColor{
                        margin-top:3.2rem;
                    }
                    .summaryHeading{
                        margin-bottom:3.2rem;
                        text-align:center;
                        animation-delay:1.4s;
                        font-size:2.4rem;
                    }
                    .addToCartButton{
                        margin-bottom:2.4rem;
                    }
                    .giftingHeroContainer{
                        display:block;
                        padding-right:0;
                        padding-left:0;
                        padding-top:0;
                    }
                    .bundledGiftingImg{
                        height:45vh;
                        margin-bottom:3.2rem;
                    }
                    .finalGiftSummary .rightContainer{
                        text-align:left;
                        padding:0 3.6rem;
                    }
                    .save{
                        margin-bottom:1.6rem;
                    }
                    .bundledGiftingImg .sampleText{
                        display:none;
                    }
                    .leftContainer{
                        width:100%;
                        background:#ffffff;
                        padding:0;
                    }
                    .rightContainer{
                        width:100%;
                        padding: 0 0%;
                    }
                    .productImg{
                        width:13.9rem;
                        height:13.9rem;
                        margin:0 auto 1.6rem;
                    }
                    .productImg img{
                        width:100%;
                    }
                    .mainHeading{
                        font-size:3.2rem;
                        margin-bottom:3.2rem;
                    }
                    .newGiftButton{
                        font-family: AnoRegular, sans-serif;
                    }
                    .leftDetailsContainer{
                        animation-delay: 1.2s;
                        width:100%;
                        height:303px;
                        display:block;
                        background:#F2F2F2;
                        margin-bottom:2.4rem;
                    }
                    .noteTextElement{
                        font-size: 3px;
                        line-height: 2px;
                    }
                }
                
            `}</style>   
        </div>
    )
}
function mapStateToProps({gifting,selection,cache,personalisation,cookieConsent,common}){
    return {gifting,selection,cache,personalisation,cookieConsent,common}
}
export default connect(mapStateToProps,{addBundleToCart,showNavBar,setShowNotification,showCart,setGiftEditFromSummary})(personalisationSummary)