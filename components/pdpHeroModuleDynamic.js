import React, { useState,useEffect, useRef } from 'react'
import Colors from './colorsDynamic'
import Head from 'next/head'
import { connect } from 'react-redux'
import Loader from './loader'
import {setCustomizeWindow} from '../redux/actions'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT,STANDARD_PRODUCT_IMAGE_SIZE,TABLET_LANDSCAPE_BREAKPOINT,INVENTORY_URI,DELIVERY_DATE,REVISED_DELIVERY_DATE} from '../config'
import { getNestedObject, getPriceBasedOnSelection,getProductImage } from '../functions'
import cssVariables from '../data/cssVariables'
import Like from './likeProduct'
import CordColors from './cordColors'
import LazyImage from './lazyImage';
import ShipsBy from './shipsBy'
import Script from 'next/script'
import {SANITY_PROJECT_ID,SANITY_DATASET} from "../branch-specific-config"
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import useTranslation from 'next-translate/useTranslation'

function pdpHeroModule(props) {
    // console.log("pdpheromodule",props);
    const {t}=useTranslation('common');
    const [addToCartMouse,addToCartMouseEnter] = useState(false)
    const [placeholderLoaded, setPlaceholderLoaded] = useState(false)
    const [readyToLoad3d, load3d] = useState(false)
    const [sizeDropDown, setSizeDropDown] = useState(false)
    const [sirvReady,setSirvReady] = useState(false)
    useEffect(()=>{
        let timer;
    if(placeholderLoaded){
            timer = setTimeout(() => {
                load3d(true)
            }, 1000);
        }
        return () => {clearTimeout(timer)};
    },[placeholderLoaded])
    function sirvIsReady(){
        setSirvReady(true)
    }
    function pause3d(){
        if(sirvReady){
            if(!!Sirv){
                let sirvInstance = Sirv.instance(`product_3d_${props.currentSelectedProduct.product}`)
                if(!!sirvInstance)
                    sirvInstance.pause()
            }
        }
    }
    useEffect(()=>{
        window.addEventListener('sirvready',sirvIsReady)
        return ()=>{
            window.removeEventListener('sirvready',sirvIsReady)
        }
    },[]) 
    function handleSizeChange(val){
        let newItem = props.currentSelectedProduct.items.find(item=>item.name==val)
        if(newItem)
            props.setSelectedItem(newItem)
        else
            props.setSelectedItem(null)
    }
    useEffect(()=>{
        if(props.threeDAvailable && !props.p1){
            setPlaceholderLoaded(true)
        }
    },[props.currentSelectedProduct])
    useEffect(()=>{
        props.pdpAddToCartMouseEnter(addToCartMouse)
    },[addToCartMouse])
    let btnContent = addToCartMouse?props.addToCartContentOnMouseHover:props.addToCartContent
    // console.log("size guide",props.sizeGuideData)
    let sizeGuideDocument="";
    if(props?.sizeGuideData?.sizeGuideDocument){
        sizeGuideDocument = buildFileUrl(parseAssetId(props.sizeGuideData.sizeGuideDocument.asset._ref),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET})
    }
    let getSelectedItemsStock = !!props?.stockDetails && !!props?.selectedItem && props.stockDetails.find(item=> item.EAN==props.selectedItem.ean)
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
    // console.log("getSelectedItemsStock",getSelectedItemsStock);
    // console.log("checkStockAvailability",checkStockAvailability);
    // buildFileUrl(parseAssetId(idDesktop),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
    return (
        <div>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        var SirvOptions = {
                        spin: {
                            onready: function (spin) { 
                                const event = new Event('sirvready');
                                window.dispatchEvent(event);
                            }
                        }
                    };
                  `,
                }}
                ></script>
            </Head>
            {props.threeDAvailable &&
                <Script strategy="afterInteractive" src="https://scripts.sirv.com/sirv.js" async />
            }
            <main className={`pdpHeroModuleWrapper paddedContent ${placeholderLoaded?"mainImagesLoaded":""}`}>
                <div className="firstCol positionRelative">
                    <div className="leftWrapper positionRelative" key={`pdpHeroModule_${props.currentSelectedProduct.product}`}>
                        <div className="leftContent">
                            {props.threeDAvailable?
                                <div className="threed">
                                    {readyToLoad3d &&
                                        <div className="ring-wrapper positionRelative" onMouseMove={()=>pause3d()}>
                                            <div key={`threed_${props.currentSelectedProduct.sku}`} id={`product_3d_${props.currentSelectedProduct.product}`} className="Sirv" data-src={`${props.currentSelectedProduct?.three_d_src_code?.trim()}${props.currentSelectedProduct?.three_d_src_code?.includes("?")?"&":"?"}spin=hover&autospin=infinite&fullscreen=false&hint=false`}></div>
                                            {/* <div className="removeWaterMark"></div> */}
                                        </div>
                                    }
                                    {!sirvReady &&
                                        <div>
                                            {!!props.p1  &&
                                                <LazyImage 
                                                    alt={`3d placeholder for ${props.currentSelectedProduct.name}`} 
                                                    originalSrc={props.p1} 
                                                    placeholderSrc={props.p1Blur}
                                                    width={858} 
                                                    height={858} 
                                                    afterLoad={()=>setPlaceholderLoaded(true)}
                                                    background={true}
                                                    showPlaceholder={true}
                                                    delayShowingLazyPlaceholder={3000}
                                                />
                                            }
                                        </div>
                                    }
                                </div>
                            :
                                <div className="justImage" onClick={()=>props.showGalleryModal({status:true,imageType:"v1"})}>
                                    {!!props.v1 &&
                                        <LazyImage 
                                            alt={`Product main image ${props.currentSelectedProduct.name}`} 
                                            originalSrc={props.v1} 
                                            placeholderSrc={props.v1Blur}
                                            width={858} 
                                            height={858} 
                                            afterLoad={()=>setPlaceholderLoaded(true)}
                                            background={true}
                                            showPlaceholder={true}
                                            delayShowingLazyPlaceholder={3000}
                                        />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    {props.threeDAvailable && sirvReady &&
                        <div className="icon3dMobile"><img src="/images/3dIconNew.png" className="width-100" alt="3D-Icon"/></div>
                    }
                    {!props.threeDAvailable && 
                        <div className="icon3dMobile two" onClick={()=>props.showGalleryModal({status:true,imageType:"v1"})}><img src="/images/2dIconNew.png" className="width-100" alt="3D-Icon"/></div>
                    }
                </div>
                <div className="productDesc alignCenter" >
                    <h2 style={{animationDelay:"0.7s"}} className="subHeading font20 anoHalfRegular">
                        {props.currentSelectedProduct.engraving_possible=="1"?
                            <span>{t('engravingPossible')}</span>
                            :
                            <span>&nbsp;</span>
                        }
                    </h2>
                    <h1 style={{animationDelay:"0.8s"}} className="heading font32 canelaThin">{props.currentSelectedProduct.name}</h1>
                    {checkStockAvailability && 
                        <div className="stockTag">
                            <img src="/images/pin.svg" alt='Pin Icon'/>
                            <p className="anoRegular storeName smallUnderlineBlack active">{stockLocation==="Belgium studio."?"Antwerp":"Printemps Paris"}</p>
                        </div>
                    }
                    <h3 style={{animationDelay:"0.9s"}} className="desc font16 anoHalfRegular hideForMobile">{props.currentSelectedProduct.excerpt} <a onClick={()=>props.scrollToFeatures()} className="cursorPointer">{t('seeMoreDetails')}</a></h3>
                    {props.currentSelectedProduct.customisation_possible=="1" &&
                        <div onClick={()=>props.showCustomisationWindow(true)} style={{animationDelay:"1s"}} className="customiseButton"><button className="btn btnSecondary anoRegular">{t('customise')}</button></div>
                    }
                    {props.currentSelectedProduct.customisation_possible!="1" && props.product.relatedProducts &&
                        <div style={{animationDelay:"1s"}} className="colorPalete">
                            <Colors showColorName={true} colorsSize="standard" product={props.product} currentSelectedProduct={props.currentSelectedProduct} colorClick={props.colorClick}/>
                        </div>
                    }
                    {getNestedObject(props,["currentSelectedProduct","itemTable","desc"])!="One Size" &&
                        <div style={{animationDelay:"1.1s"}} ref={props.sizeGuideTextRef} className={`sizeWrap positionRelative ${sizeDropDown?"showSizes":""}`}>
                            <div className={`sizeContainer positionRelative default font16 anoRegular ${!!props.sizeGuide?"":"noSizeGuide"} ${props.highlightSelectSize?"highlight":""}`}> 
                                <span className="sizeText">{t('size')}: </span>
                                <select onClick={()=>props.setHighlightSelectSize(false)} className="anoRegular font16 select cursorPointer" onChange={(e)=>handleSizeChange(e.target.value)} value={!!props.selectedItem?props.selectedItem.name:""}>
                                    <option value="">{t('select')} </option>
                                    {Array.isArray(getNestedObject(props,["currentSelectedProduct","items"])) && getNestedObject(props,["currentSelectedProduct","items"]).map((item)=>{
                                            return <option value={item.name} key={item.item} className={`sizeSingle ${item.stock=="no"?"lightGrey":""}`}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                            {sizeGuideDocument && 
                                <a href={sizeGuideDocument} target="_blank" className={`sizeGuide underlineLR active font16 anoRegular ${props.highlightSelectSize?"dim":""}`} >
                                    {t('sizeGuide')}
                                </a>
                            }
                        </div>
                    }
                    {props.product.product_type_value=="cord" &&
                        <div className="cordColorSelector font16 anoRegular" style={{animationDelay:"1.2s"}}>
                            <span className="cordColorTitle">{t('cordColor')}: </span>
                            <CordColors currentSelectedProduct={props.currentSelectedProduct} product={props.product} showColorName={true} colorsSize="standard" cordColorClick={props.cordColorClick} />
                        </div>
                    }
                    <div style={{animationDelay:"1.2s"}} className="addToCart">
                        {props.showAddToCartButton &&
                            <button className={`btn btnPrimary anoRegular ${props.common.addingToCart || props.highlightSelectSize?"black":""}`} onClick={()=>props.addToCart()} onMouseEnter={()=>addToCartMouseEnter(true)} onMouseLeave={()=>addToCartMouseEnter(false)}>{btnContent}</button>
                        }
                        <Like className="favIcon" noPadding={false} product={props.product} />
                    </div> 
                    <h4 style={{animationDelay:"1.3s"}} className="shippingDetail anoRegular"><span>{props.product.product_under_addtocart_text}</span></h4>
                    {props.showShipBy &&
                        <div style={{animationDelay:"1.4s"}} className="shipsBy anoRegular">
                            <ShipsBy stockLocation={stockLocation} checkStockAvailability={checkStockAvailability} currentSelectedProduct={props.currentSelectedProduct} selectedItem={props.selectedItem} partialGrey={true}/>
                        </div>
                    }
                </div>
            </main>   
            <style jsx>{`
                .stockTag{
                    display:flex;
                    margin-top:10.2px;
                    justify-content: center;
                }
                .storeName{
                    font-size: 1.4rem;
                    line-height: 2.4rem;
                    margin-left: 8px;
                }
                .justImage{
                    cursor: ${props.imageClickOpensGalleryModal?`url("/images/galleryOpen.svg"), auto`:"auto"};
                }
                .sizeGuide.dim{
                    color:#787878;
                    transition:color 0.3s;
                }
                .sizeGuide.dim::after {
                    background-color: #f2f2f2 !important;
                    transition:background-color 0.3s;
                }
                .sizeContainer.highlight::after{
                    content:'';
                    position:absolute;
                    height:1px;
                    width:100%;
                    bottom:0;
                    left:0;
                    background-image: linear-gradient(black, black), linear-gradient(white, white);
                    background-size: 100% 1px, auto;
                    background-repeat: no-repeat;
                    background-position: center bottom;
                }
                .cordColorSelector{
                    margin-bottom:3.2rem;
                }
                .arrow{
                    border-left:0.1rem solid black;
                    border-bottom:0.1rem solid black;
                    height:0.6rem;
                    width :0.6rem;
                    display: inline-block;
                    transform:rotate(45deg);
                }
                .leftWrapper{
                    width:100%;
                    padding-top:100%;
                }
                .sizeContainer.default{
                    margin-right:3.2rem;
                }
                .sizeContainer.noSizeGuide{
                    margin-right:0;
                }
                .leftContent{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                    overflow:hidden;
                }
                .colorPalete{
                    margin-bottom:1.6rem;
                    margin-top: 2.3rem;
                }
                .productImg{
                    position:absolute;
                    top:0;
                    left:0;
                    z-index:2;
                    width:100%;
                    transform:translateX(3rem);
                }
                .pdpHeroModuleWrapper{
                    display:flex;
                    margin-bottom:2.5rem;
                    align-items: center;
                }
                .sizeSingle{
                    padding-left: 26px;
                    margin-bottom:0.8rem;
                    cursor:pointer;
                }
                .sizeSingle:hover{
                    background: #D8D8D8 0% 0% no-repeat padding-box;
                }
                .sizeSingle.lightGrey{
                    color:${cssVariables.lightGrey};
                }
                .showSizes .sizeDropDown{
                    height:128px;
                    overflow: -moz-scrollbars-vertical; 
                    overflow-y:scroll;
                }
                .sizeDropDown{
                    height:0;
                    overflow:hidden;
                    width: 8rem;
                    position: absolute;
                    background: #ffffff;
                    top: 13px;
                    left: 50%;
                    transform: translateX(-122%);
                    transition:all 0.3s ease-out;
                }
                .firstCol{
                    height:100%;
                }
                .loader{
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                }
                .removeWaterMark{
                    position: absolute;
                    width: 11rem;
                    height: 4rem;
                    background: #ffffff;
                    bottom: 0px;
                    right: 0;
                    z-index: 9;
                }
                .ring-wrapper:hover, .productImg:hover{
                    cursor: url("/images/3D.svg"), auto !important;
                }
                .ring-wrapper{
                    transform:${props?.currentSelectedProduct?.variant_scale_desktop_value ? `scale(${props?.currentSelectedProduct?.variant_scale_desktop_value})`:"none"}
                }
                .customiseButton{
                    margin-bottom:4.8rem;
                }
                .productDesc{
                    padding:6.5rem 8% 0 8%;
                }
                .shippingDetail{
                    letter-spacing:1px;
                    font-size:1.2rem;
                    line-height: 2.5rem;
                }
                .shippingDetail span{
                    text-decoration:underline;
                }
                .shipsBy{
                    margin-top:0.5rem;
                }
                .addToCart{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    margin-bottom:1.6rem;
                    margin-left:${props.showAddToCartButton?"3.53rem":"0"};
                }
                .addToCart button{
                    margin-right:1.5px;
                    min-width:28rem;
                }
                .addToCart button.black{
                    color:#ffffff;
                    background:#000000 !important;
                }
                .size{
                    margin-right:3.2rem;
                    cursor:pointer;
                }
                .sizeWrap{
                    z-index:9;
                    display:flex;
                    justify-content: center;
                    margin-bottom:3.2rem;
                }
                .ring-wrapper{
                    width:100%;
                }
                .firstCol, .productDesc{
                    width:50%;
                }
                .subHeading{
                    margin-bottom:3.2rem;
                }
                .heading{
                    margin-bottom:2.4rem;
                }
                .desc{
                    margin-bottom:0rem;
                }
                .desc a{
                    text-decoration:underline;
                }
                .colorPalete{
                    margin-bottom:4.8rem;
                }
                .sizeArrow{
                    margin-left:0.8rem;
                }
                .icon3dMobile.two{
                    width: 3.3rem;
                    height: 3.3rem;
                    display: none;
                }
                .icon3dMobile{
                    width: 5rem;
                    height: 3.4rem;
                    display:block;
                    position:absolute;
                    bottom:3.6rem;
                    left:50%;
                    z-index: 99;
                    transform:translateX(-50%);
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .customiseButton{
                        margin-bottom:3.2rem;
                        margin-top:0.8rem;
                    }
                    .addToCart button{
                        min-width:24rem;
                    }
                    .icon3dMobile{
                        bottom:1rem;
                    }
                }
                @media screen and (max-width: 1025px){
                    .productDesc {
                        padding: 6.5rem 5% 0 5%;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .favIcon{
                        margin-left:0.9rem;
                    }
                    .desc{
                        width: 40%;
                        margin-right: auto;
                        margin-left: auto;
                    }
                    .pdpHeroModuleWrapper{
                        display:block;
                        height:auto;
                        margin-bottom:0rem;
                    }
                    .icon3dMobile{
                        width: 3.2rem;
                        height: 2.3rem;
                        bottom:11rem;
                        left:50%;
                        z-index: 9;
                        transform:translateX(-50%);
                    }
                    
                    .firstCol, .productDesc{
                        width:100%;
                    }
                    .firstCol{
                        margin-bottom:0;
                        margin-top:${props.currentSelectedProduct.three_d_available=="1"?"-3rem":"0"}
                    }
                    .productImg{
                        position:absolute;
                        top:0;
                        left:0;
                    }
                    .subHeading{
                        margin-bottom:1.6rem;
                        font-size:1.2rem;
                    }
                    .heading{
                        font-size:2.4rem;
                        margin-bottom:2.4rem;
                    }
                    .productDesc{
                        padding:6rem 0 0 0;
                        position:relative;
                        z-index:5;
                        margin-top: -16rem;
                    }
                    .colorPalete{
                        margin-bottom:3.2rem;
                    }
                    .size{
                        margin-right:2.4rem;
                    }
                    .addToCart{
                        margin-bottom:1.6rem;
                        margin-left:3.5rem;
                    }
                    .addToCart button{
                        margin-right:0.9rem;
                    }  
                    .favIcon{
                        margin-left:0;
                    }
                    .firstCol{
                        height:auto;
                    }
                    .sizeDropDown{
                        transform: translateX(-110%);
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .ring-wrapper{
                        transform:${props?.currentSelectedProduct?.variant_scale_mobile_value ? `scale(${props?.currentSelectedProduct?.variant_scale_mobile_value})`:"none"}
                    }
                    .select,.sizeText,.sizeGuide,.cordColorTitle{
                        font-size:1.6rem;
                        line-height:2.4rem;
                    }
                    .productDesc{
                        padding:0rem 0 0 0;
                    }
                    .icon3dMobile{
                        bottom:-2rem;
                    }
                    .icon3dMobile.two{
                        width: 2.2rem;
                        height: 2.2rem;
                        display: block;
                    }
                    .favIcon{
                        margin-left:0;
                    }
                    .firstCol{
                        margin-bottom:4.8rem;
                    }
                    .pdpHeroModuleWrapper{
                        height:auto;
                    }
                    .productDesc{
                        margin-top:0;
                    }
                    .firstCol{
                        margin-top:0;
                    }
                    .addToCart{
                        margin-left:0;
                    }
                    .addToCart button{
                        margin-right:1.6rem;
                    }
                }
            `}</style>
        </div>
    )
}
function mapStateToProps({common,selection,gifting}){
    return {common,selection,gifting}
}
export default connect(mapStateToProps,{setCustomizeWindow})(pdpHeroModule)