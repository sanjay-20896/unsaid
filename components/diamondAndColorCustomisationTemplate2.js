import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import SwipeableViews from 'react-swipeable-views';
import { getNestedObject, getProductImage } from '../functions';
import Sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url";
import { concat, countBy } from 'lodash';
const imageBuilder = imageUrlBuilder(Sanity);
import {getPriceBasedOnSelection} from '../functions'
const urlFor = source => imageBuilder.image(source);
import {getImageUrl} from '../functions'

function customizeViews(props) {
    let numberAndDiamondImageMapping = {}
    const [transform, setTransform] = useState(props.device==="mobile"?0:0)
    const [transform2, setTransform2] = useState(0)
    const [stones, setStones] = useState(3)
    const [customColor, setCustomColor] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [currentIndex2, setCurrentIndex2] = useState(2)
    const [currentPrice, setCurrentPrice] = useState(3999)
    const [indexSlider, setIndexSlider] = useState(1)
    const [layerHeight, setLayerHeight] = useState(null)
    const [indexSlider2, setIndexSlider2] = useState(1)
    const [bottomHeight, setBottomHeight] = useState(288);
    const [variantProduct,setVariantProduct] = useState(null)
    const [allColors,setAllColors] = useState(null)
    const [colorLabelButtonWidth,setColorLabelButtonWidth] = useState(100);
    const getImageSize=useRef();
    const stoneHeight=useRef();
    const colorNameButtonRef=useRef();
    const colorNameButtonMobileRef=useRef();
    let springConfig={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    useEffect(() => {
        if(window.innerWidth > MOBILE_BREAKPOINT)
            setColorLabelButtonWidth(colorNameButtonRef.current.getBoundingClientRect().width);
        else
            setColorLabelButtonWidth(colorNameButtonMobileRef.current.getBoundingClientRect().width);
    }, [variantProduct])
    // console.log("colorLabelButtonWidth",colorLabelButtonWidth);
    useEffect(()=>{
        if(props.common.windowWidth < MOBILE_BREAKPOINT)
            setBottomHeight(256);
        else
            setBottomHeight(288);

        if(props.common.showNavBar){
            setLayerHeight(props.common.windowHeight - (bottomHeight + props.common.navHeight))
        }else{
            setLayerHeight(props.common.windowHeight - (bottomHeight))
        }
    },[])
    useEffect(()=>{
        if(props.common.windowWidth < MOBILE_BREAKPOINT)
            setBottomHeight(256);
        else
            setBottomHeight(288);

        if(props.common.showNavBar){
            setLayerHeight(props.common.windowHeight - (bottomHeight + props.common.navHeight))
        }else{
            setLayerHeight(props.common.windowHeight - (bottomHeight))
        }
    },[props.common.windowHeight])

    useEffect(()=>{
        if(props.common.windowWidth < MOBILE_BREAKPOINT)
            setBottomHeight(256);
        else
            setBottomHeight(288);

        if(props.common.showNavBar){
            setLayerHeight(props.common.windowHeight - (bottomHeight + props.common.navHeight))
        }else{
            setLayerHeight(props.common.windowHeight - (bottomHeight))
        }
    },[props.common.showNavBar])    
    function getCompleteImageSrc(p){
        let productsCustomisationData = getNestedObject(props,["customisationData","variants"])?getNestedObject(props,["customisationData","variants"]):null
        let customisationData = productsCustomisationData.find(item=>item.color==p?.color?.color_text && item.numberOfDiamonds==p.number_of_diamonds_text)
        if(!!customisationData)
            return getImageUrl(customisationData.completeProductImage,600)
        else
            return false
    }
    function selectCustomColor(id){
        setVariantProduct(allColors[id])
        setCurrentIndex(id)
        setIndexSlider(id)
        if(id===0){
            setTransform2(33.33)
        }
        if(id===1){
            setTransform2(0)
        }
        if(id===2){
            setTransform2(-33.33)
        }
    }
    function setVariantBasedOnDiamondsAndColor(numberOfDiamonds,colorText){
        // console.log('set varaint ppage',numberOfDiamonds,colorText)
        let {product} = props
        if(product.color.color_text==colorText && product.number_of_diamonds_text==numberOfDiamonds){
            // console.log('main product')
            setVariantProduct(null)
        }
        else{
            if(Array.isArray(product.relatedProducts)){
                // console.log('searching related products')
                // console.log(numberOfDiamonds,colorText)
                let relatedProducts = product.relatedProducts.filter(p=>p.relation=="variant" || p.relation=="Diamond variant")
                // console.log(relatedProducts)
                let v = relatedProducts.find(p=>{
                    return !!p.color && p.color.color_text==colorText && p.number_of_diamonds_text==numberOfDiamonds.toString()
                })
                // console.log(v)
                if(!!v)
                setVariantProduct(v)
            }
        }
    }
    function translate(id,dontSetVariant){
        // console.log('translate',id)
        let currentSelectedProduct = variantProduct || props.product
        // console.log(currentSelectedProduct)
        // console.log(props)
        // console.log('set variant translate')
        if(!dontSetVariant)
            setVariantBasedOnDiamondsAndColor(id+1,currentSelectedProduct.color.color_text)
        setCurrentIndex2(id)
        if(id===0){
            setTransform(40)
        }
        if(id===1){
            setTransform(20)
        }
        if(id===2){
            setTransform(0)            
        }
        if(id===3){
            setTransform(-20)
        }
        if(id===4){
            setTransform(-40)
        }
    }
    let handleChangeIndex2 = (index,indexLatest,meta,dontSetVariant) => {
        let currentSelectedProduct = variantProduct || props.product
        if(!dontSetVariant)
            setVariantBasedOnDiamondsAndColor(index+1,currentSelectedProduct.color.color_text)
        setIndexSlider2(index)
    }
    function translateBasedOnNumberOfDiamonds(product,dontSetVariant){
        if(!!product){
            let numberOfDiamonds = parseInt(product.number_of_diamonds_text)
            translate(numberOfDiamonds-1,dontSetVariant)
            handleChangeIndex2(numberOfDiamonds-1,null,null,dontSetVariant)
        }
    }
    function confirm(){
        props.setVariant(variantProduct)
        props.showCustomisationWindow(false)
    }
    function showColorSelector(){
        let allProducts = []
        let relatedProducts = !!props.product && Array.isArray(props.product.relatedProducts)?props.product.relatedProducts:[]
        allProducts.push(props.product)
        allProducts = allProducts.concat(relatedProducts).filter(p=>p.relation=="variant" || p.relation=="Diamond variant")
        let currentSelectedProduct = variantProduct || props.product
        let allColorProducts = allProducts.filter(p=>p.number_of_diamonds_text==currentSelectedProduct.number_of_diamonds_text)
        setTransform2(0)
        setCurrentIndex(1)
        setIndexSlider(1)
        setAllColors(allColorProducts)
        setCustomColor(true)
      
    }
    function hideColorSelector(){
        setAllColors(null)
        setCustomColor(false)
    }
    useEffect(()=>{
        // console.log('translate based on number of diamonds',props.currentSelectedProduct)
        //if different color
        let {product,currentSelectedProduct} = props
        //if different color, set variant
        // console.log('ids:',props.currentSelectedProduct.product,product.product)
        translateBasedOnNumberOfDiamonds(props.currentSelectedProduct,true)
        if(props.currentSelectedProduct.product != product.product)
            setVariantProduct(currentSelectedProduct)
    },[])
    let currentSelectedProduct = variantProduct || props.product
    let productsCustomisationData = getNestedObject(props,["customisationData","variants"])?getNestedObject(props,["customisationData","variants"]):null
    // console.log("product customisation data",productsCustomisationData)
    let customisationData = getNestedObject(props,["customisationData"])?getNestedObject(props,["customisationData"]):null
    let diamondHeading = getNestedObject(props,["customisationData","diamondHeading"])
    let colorSelectorHeading = getNestedObject(props,["customisationData","colorSelectorHeading"])
    let currentSelectedProductCustomisationData = Array.isArray(productsCustomisationData) && !!currentSelectedProduct?productsCustomisationData.find(item=>item.color==currentSelectedProduct?.color?.color_text && item.numberOfDiamonds==currentSelectedProduct.number_of_diamonds_text):null
    let diamondText1 = !!currentSelectedProductCustomisationData?currentSelectedProductCustomisationData.diamondText1:""
    let diamondText2 = !!currentSelectedProductCustomisationData?currentSelectedProductCustomisationData.diamondText2:""
    let colorSelectorText1 = !!currentSelectedProductCustomisationData?currentSelectedProductCustomisationData.colorSelectorText1:""
    let colorSelectorText2 = !!currentSelectedProductCustomisationData?currentSelectedProductCustomisationData.colorSelectorText2:""
    let emptyImage = !!currentSelectedProductCustomisationData?currentSelectedProductCustomisationData.emptyproductImage:null
    let allProducts = []
    let relatedProducts = !!props.product && Array.isArray(props.product.relatedProducts)?props.product.relatedProducts:[]
    // console.log("product",props.product)
    // console.log("related products",relatedProducts)
    allProducts.push(props.product)
    allProducts = allProducts.concat(relatedProducts).filter(p=>p.relation=="variant" || p.relation=="Diamond variant")
    // console.log("allProducts",allProducts);
    if(Array.isArray(allProducts)){
        for(let i=0;i<allProducts.length;i++){
            // console.log(`product index ${i}`,allProducts[i])
            // console.log(`product costomoise data index : ${i}`,productsCustomisationData[i])
            let customisationData = productsCustomisationData.find(item=>item.color==allProducts[i]?.color?.color_text && item.numberOfDiamonds==allProducts[i]?.number_of_diamonds_text)
            // console.log("customisationData",customisationData)
            // console.log("customisation data",customisationData)
            if(!numberAndDiamondImageMapping[allProducts[i].number_of_diamonds_text] && customisationData)
            numberAndDiamondImageMapping[allProducts[i].number_of_diamonds_text] =getImageUrl(customisationData.diamondImage,300)
        }
    }
    let numberOfDiamonds = currentSelectedProduct.number_of_diamonds_text
    let currentColor = currentSelectedProduct.color.color_text
    let colorProducts = allProducts.filter(p=>(p.number_of_diamonds_text==numberOfDiamonds && p.product!=props.currentSelectedProduct.product)) 
    let productsOfSameColorAsCurrent = allProducts.filter(p=>p.color.color_text==currentSelectedProduct.color.color_text)
    let allColorProducts = allProducts.filter(p=>p.number_of_diamonds_text==currentSelectedProduct.number_of_diamonds_text)
    let price = getPriceBasedOnSelection(currentSelectedProduct,props.selection)
    useEffect(()=>{
        !!allColors && allColorProducts.forEach((product,id)=>{
            if(currentColor==product.color?.color_text){
                selectCustomColor(id)
            }
        })
    },[allColors])
    // console.log("number and diamond image mapping",numberAndDiamondImageMapping)
    return (
        <>
         <div className={`container ${customColor?"customColorActive":""}`}>
            <div className="firstWindow">
                <div style={{height:`${layerHeight}px`}} className="allLayers positionRelative alignCenter">
                    <div className="mainImg">
                        <h1 className="productName showForMobile canelaThin font16-notResponsive">{props.product.name}</h1>
                        {!!emptyImage &&
                            <div ref={getImageSize} className="emptyRing"><img src={ getImageUrl(emptyImage,600)} className="mainEmptyRingImg width-100"/></div>
                        }
                    </div>
                    <div className="customLine hideForMobile">
                        <div ref={stoneHeight} className="customStones">
                            {Object.keys(numberAndDiamondImageMapping).map((key, index)=>{
                                
                                // console.log('key***',numberAndDiamondImageMapping[key], index)
                                return(
                                    <div onClick={()=>translate(index)} className={`stone ${numberOfDiamonds===key.toString()?"currentStone":""}`}>
                                        <img className="width-100" src={numberAndDiamondImageMapping[key]}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="customLine showForMobile mobile">
                        <SwipeableViews style={{padding:"0 12rem 0 12rem"}} slideStyle={{padding:"0 0 0 0"}} index={indexSlider2} onChangeIndex={(index)=>handleChangeIndex2(index)} springConfig={springConfig}>
                            {Object.keys(numberAndDiamondImageMapping).map((key, index)=>{
                                return(
                                    <div onClick={()=>handleChangeIndex2(index)} className={`stone ${indexSlider2===index?"currentStone":""}`}>
                                        <img className="width-100" src={numberAndDiamondImageMapping[key]}/>
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                    </div>
                    {productsOfSameColorAsCurrent.map(p=>{
                        let imgSrc = getCompleteImageSrc(p)
                        if(imgSrc){
                            return (
                                <div className={`mainRing ${p.number_of_diamonds_text===currentSelectedProduct.number_of_diamonds_text?"active":""}`}>
                                    <img className="width-100" src={imgSrc}/>
                                </div>
                            )
                        }
                    })}
                </div>    
                <div style={{height:`${layerHeight}px`}} className="customColorSection">
                    <div style={{height:'100%'}} className="positionRelative makeCenterInMobile">
                        <div className="hideForMobile">
                            <div className="colorTransform">
                                {Array.isArray(allColorProducts) && allColorProducts.map((p,index)=>{
                                    let v1 = getProductImage(p,"v1","standard")
                                    return(
                                        <div className={`colorImage ${currentIndex===index?"current":""}`} onClick={()=>selectCustomColor(index)}>
                                            <img className="width-100" src={v1} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="showForMobile">
                            <div className="colorTransform2">
                                <SwipeableViews style={{padding:"0 10rem 0 10rem"}} slideStyle={{padding:"0 0 0 0"}} index={indexSlider} onChangeIndex={(index)=>selectCustomColor(index)} springConfig={springConfig}>
                                    {Array.isArray(allColorProducts) && allColorProducts.map((p,index1)=>{
                                    let v1 = getProductImage(p,"v1","standard")
                                    // {props.customColors.map((colorImg,index1)=>{
                                        return(
                                            <div className={`colorImage ${indexSlider===index1?"current":""}`} onClick={()=>selectCustomColor(index1)}>
                                                <img className="width-100" src={v1}/>
                                            </div>
                                        )
                                    })}
                                </SwipeableViews>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contentSection alignCenter">
                    <div className="hideForMobile">
                        <div className="positionRelative newDC">
                            <div className="diamondCountAndColor">
                                <div onClick={()=>hideColorSelector()} className="diamondCountContainer positionRelative">
                                    <div className="diamondCount">
                                        <div><img className="width-100" src={`${customColor?"/images/diamondIconBlack.svg":"/images/DiamondIcon.svg"}`}/></div>
                                        <div className="count anoRegular">{numberOfDiamonds}</div>
                                    </div>
                                </div>
                                <div ref={colorNameButtonRef} onClick={()=>showColorSelector()} className="colorName">
                                    <div className="colorSymbol positionRelative"><div></div></div>
                                    <div className="label anoRegular">{currentColor}</div>
                                </div>
                                <div className="blackBg"></div>
                            </div>
                        </div>
                    </div>
                    <div className="details">
                        <h1 className="title canelaThin font24 hideForMobile">{customColor?!!colorSelectorHeading?colorSelectorHeading:"Which gold speaks to you?":!!diamondHeading?diamondHeading:"Sprinkle it with diamonds"}</h1>
                        <h1 className="title canelaThin font24 showForMobile">{customColor?!!colorSelectorHeading?colorSelectorHeading:"Which gold speaks to you?":!!diamondHeading?diamondHeading:"Sprinkle it with diamonds"}</h1>
                        <h3 className="priceLine anoHalfRegular font16"><span className="anoRegular">{customColor?colorSelectorText1:price}</span> {!customColor && diamondText1}</h3>
                        <h3 className="caretDetails anoHalfRegular font16">{customColor?colorSelectorText2:diamondText2}</h3>
                    </div>
                    <div className="showForMobile diamondCountAndColorForMobile">
                        <div className="diamondCountAndColor">
                            <div onClick={()=>hideColorSelector()} className="diamondCountContainer positionRelative">
                                <div className="diamondCount">
                                    <div><img className="width-100" src={`${customColor?"/images/diamondIconBlack.svg":"/images/DiamondIcon.svg"}`}/></div>
                                    <div className="count anoRegular">{numberOfDiamonds}</div>
                                </div>
                            </div>
                            <div ref={colorNameButtonMobileRef} onClick={()=>showColorSelector()} className="colorName">
                                <div className="colorSymbol positionRelative"><div></div></div>
                                <div className="label anoRegular">{currentColor}</div>
                            </div>
                            <div className="blackBg"></div>
                        </div>
                    </div>
                    <div className="bottomLine paddedContent positionRelative">
                        <h1 className="canelaThin font20 hideForMobile">{currentSelectedProduct.name}</h1>
                        <div className="buttons">
                            <div onClick={()=>confirm()}>
                                <button className="first btn btnPrimary anoRegular">Confirm</button>
                            </div>
                            <div onClick={()=>props.showCustomisationWindow(false)}>
                                <button className="second btn btnSecondary anoRegular">Cancel</button>
                            </div>
                        </div>
                        <h1 className="canelaThin font20 hideForMobile">{price}</h1>
                    </div>
                </div>
            </div>
         </div>   
         <style jsx>{`
            .container{
                width:100%;
                overflow-y:hidden;
            }
            .contentSection{
                position: absolute;
                width: 100%;
                bottom: 0;
                z-index:100;
            }
            .emptyRing{
                width:20%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .newDC{
                height:8.8rem;
            }
            .mainRing{
                opacity:0;
                position: absolute;
                width: 20%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition:opacity 0.1s ease-out 0s;
            }
            .mainRing.active{
                opacity:1;
                transition:opacity 0.1s ease-out 0.5s;
            }
            .customColorSection{
                position:absolute;
                top:${customColor && props.common.showNavBar ?props.common.navHeight:"0"}px;
                background:#ffffff;
                left:0;
                width:100%;
                overflow:hidden;
                z-index: 99;
                transform:translateY(-150%);
                transition:all 0.5s ease-out;
            }
            .colorTransform{
                display:flex;
                justify-content:center;
                transform:translate(${transform2}%, -50%);
                transition:all 0.5s ease-out;
                position: absolute;
                top: 50%;
            }
            .customColorActive .customColorSection{
                transform:translateY(0%);
            }
            .customColorActive .mainEmptyRingImg{
                opacity:0;
                transition:all 0.3s ease-out ;
            }
            .mainEmptyRingImg{
                opacity:1;
                transition:all 0.5s ease-out 0.2s;
            }
            .customColorActive .customLine{
                opacity:0;
                transition:all 0.3s ease-out ;
            }
            .customLine{
                opacity:1;
                transition:all 0.5s ease-out 0.2s;
            }
            .colorImage{
                cursor:pointer;
                transform:scale(1);
                transition:all 0.5s ease-out;
            }
            .colorImage.current{
                transform:scale(1.3);
            }
            .bottomLine{
                display:flex;
                padding-top:2.6rem;
                padding-bottom:2.6rem;
                justify-content: space-between;
                align-items: center;
            }
            .buttons{
                display:flex;
                position:absolute;
                bottom:1.6rem;
                left:50%;
                transform:translateX(-50%);
            }
            .buttons .first{
                margin-right:2.4rem;
            }
            .details{
                padding:0rem 0 2.4rem 0;
            }
            .title{
                margin-bottom:1.6rem;
            }
            .colorName{
                display:flex;
                align-items: center;
                cursor:pointer;
            }
            .colorName .label{
                color:#000000;
            }
            .customColorActive .colorName .label{
                color:#ffffff;
            }
            .colorSymbol{
                height:2.4rem;
                width:2.4rem;
                border:1px solid #000000;
                border-radius:50%;
                text-align:center;
                margin-right:0.8rem;
            }
            .customColorActive .colorSymbol, .customColorActive .colorSymbol div{
                border:1px solid #ffffff;
            }
            .colorSymbol div{
                height:0.8rem;
                width:0.8rem;
                border:1px solid #000000;
                border-radius:50%;
                position: absolute;
                background:#EAC786;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
            }
            .count{
                margin-left:0.8rem;
            }
            .diamondCountAndColor{
                display:flex;
                align-items: center;
                top: 0rem;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                z-index:9;
            }
            .diamondCountContainer{
                width:6.3rem;
                height:4.8rem;
                margin-right:3.6rem;
                cursor:pointer;
            }
            .diamondCount{
                display:flex;
                position: absolute;
                top: 13.5px;
                left:12px;
            }
            .diamondCountAndColor .count{
                color:#ffffff;
            }
            .customColorActive .diamondCountAndColor .count{
                color:#000000;
            }
            .blackBg{
                position:absolute;
                top:0;
                left:0;
                width:6.3rem;
                height:4.8rem; 
                background:#000000;
                border-radius:2.4rem;
                z-index:-99;
                transition:all 0.5s ease-out;
            }
            .customColorActive .blackBg{
                left:8.7rem;
                width:${colorLabelButtonWidth  + 24}px;
            }
            .firstWindow{
                padding-top:${props.common.showNavBar?"8rem":"0"};
                overflow:hidden;
                width:100%;
            }
            .mainImg{
                width:100%;
                display:inline-block;
                height:auto;
            }
            .customLine{
                position:absolute;
                width:100%;
                top:50%;
                left: 0;
                z-index:99;
                transform:translateY(-50%);
            }
            .customStones{
                width:100%;
                position:relative;
                display:flex;
                justify-content:space-around;
                transform: translateX(${transform}%);
                transition:all 0.5s ease-out;
            }
            .stone{
                cursor:pointer;
                transform:scale(1);
                opacity:1;
                transition:transform 0.5s ease-out, opacity 0.1s ease-out 0s;
            }
            .stone.currentStone{
                opacity:0;
                transform:scale(1);
                transition:transform 0.5s ease-out, opacity 0.1s ease-out 0.5s;
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .customStones{
                    transform: translateX(${transform - 21}%);
                }
                .stone{
                    transform:scale(1);
                    width:180%
                }
                .mainRing{
                    width: 50%;
                } 
                .emptyRing{
                    width:50%;
                }
                .stone.currentStone{
                    transform:scale(1);
                }
                .customLine{
                    width:180%;
                }
                .customColorActive .blackBg{
                    left:9.7rem;
                    //width:15rem;
                }
                .diamondCountContainer{
                    margin-right:4.6rem;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .stone{
                    transform:scale(1);
                    width:180%
                }
                .mainRing{
                    width: 50%;
                } 
                .emptyRing{
                    width:50%;
                }
                .stone.currentStone{
                    transform:scale(1);
                }
                .customLine{
                    width:180%;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .firstWindow{
                    padding-top:${props.common.showNavBar && props.common.showBrandNotification?"8.8rem":"5.6rem"};
                    text-align:center;
                    overflow:hidden;
                    width:100%;
                }
                .diamondCountAndColorForMobile{
                    display:flex;
                    justify-content:center;
                }  
                .mainRing{
                    width: 50%;
                } 
                .emptyRing{
                    width:50%;
                }
                .productName{
                    position:absolute;
                    top:0rem;
                    left:50%;
                    transform:translateX(-50%);
                    z-index:999;
                }
                .mainImg{
                    width:100%;
                    display:inline-block;
                }
                .customLine{
                    top:50%;
                    overflow-x:visible;
                    width:100%;
                }
                .customStones{
                    overflow-x:visible;
                }
                .stone{
                    width:100%;
                    transform:scale(1);
                }
                .stone.currentStone{
                    transform:scale(1);
                }
                .diamondCountAndColor{
                    margin:0 0 2.1rem 0rem;
                    position:static;
                    top: auto;
                    left: 50%;
                    transform: translateX(0%);
                }
                .buttons{
                    position:static;
                    transform:translateX(0%);
                    margin-right:-2.4rem;
                }
                .buttons div{
                    width:100%;
                    padding-right:2.4rem;
                }
                .buttons button{
                    width:100%;
                }
                .bottomLine{
                    display:block;
                    padding-top:1.6rem;
                    padding-bottom:1.6rem;
                    border-top: 1px solid #F2F2F2;
                }
                .buttons .first{
                    margin-right:0rem;
                }
                .contentSection{
                    position:absolute;
                    bottom:0;
                    left:0;
                    width:100%;
                }
                .details .title{
                    font-size:2.4rem;
                }
                .customColorSection{
                    top:${props.common.showNavBar && props.common.showBrandNotification?"8.8rem":"5.6rem"};
                    transform:translateY(-200%);
                }
                .colorTransform{
                    display:none;
                }
                .colorTransform2{
                }
                .colorTransform2 .colorImage{
                    width:180px;
                }  
                .makeCenterInMobile{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
                .label{
                    width: max-content;
                }
                .customColorActive .blackBg{
                    left:9.7rem;
                    //width:16rem;
                }
            }
            @media screen and (max-width: 370px){
                .customColorActive .blackBg{
                    //left:8.3rem;
                    //width:14rem;
                }
            }
         `}</style>
        </>
    )
}

function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(customizeViews)
