import React, { useRef, useState ,useEffect} from 'react'
import { connect } from 'react-redux'
import Slider from "react-slick"
import Caret from './caret'
import EngravingText from './engravingText'
import {setEngravingText,setNoteText,setBoxChoice,setCardChoice,updateCart,setGiftEditFromSummary} from '../redux/actions'
import {getProductImage,formatPrice} from '../functions'
import {DEFAULT_ENGRAVING_CHARACTER_LIMIT, MOBILE_BREAKPOINT} from '../config'
import PersonalisationSummary from './personalisationSummary'
import {useRouter} from 'next/router'
import Loader from './loader'
import TextAndArrowCta from './textAndArrowCta'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables'
import {onUpdateCart} from '../gtmFunctions'
import useTranslation from 'next-translate/useTranslation'
import { plpPaths } from '../branch-specific-config'
function engravingMobile(props) {
    const {t}=useTranslation('common');
    const [index, setIndex] = useState(0)
    const [index2, setIndex2] = useState(1)
    const [index3, setIndex3] = useState(1)
    const [disableNext, setDisableNext] = useState(false)
    const [loading,setLoading] = useState(false)
    const slider=useRef();
    const sliderGiftBox=useRef();
    const sliderPostCard=useRef();
    const maxNoteTextHeightRef=useRef();
    const postCardHeadingWrapperRef = useRef();
    const giftBoxHeadingWrapperRef = useRef();
    const router = useRouter()
    const textareaRef=useRef();
    const noteTextRef=useRef();
    const [disableTyping,setDisableTyping] = useState(false)
    const [nextDisabled,_setNextDisabled] = useState(false)
    const nextDisabledRef = useRef(nextDisabled)
    const didMount = useRef(false)
    const setNextDisabled = data => {
        nextDisabledRef.current = data;
        _setNextDisabled(data);
    };
    
    function keyDownHandler(e){
            // if(nextDisabledRef.current){
            //     if(e.keyCode == 8){
            //         setDisableTyping(false)
            //     } else {
            //         setDisableTyping(true)
            //     }
            // } else {
            //     setDisableTyping(false)
            // }
    } 
    useEffect(()=>{
        setNextDisabled(disableNext)
    },[disableNext])
    useEffect(() => {
        sliderGiftBox.current.slickGoTo(1)
        sliderPostCard.current.slickGoTo(1)
    }, [])
    function goToSlide(n){
        slider.current.slickGoTo(n)
        setIndex(n)
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
        beforeChange: (current, next) => setIndex(next)
    };
    const settingsGift = {
        arrows:false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (current, next) => setIndex2(next)
    };
    const settingsPost = {
        arrows:false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (current, next) => setIndex3(next)
    }
    function nextWindow(){
        let maxIndex = product.engraving_possible=="1"?4:3
        if(index!=maxIndex){
            if(props.common.giftEditFromSummary){
                slider.current.slickGoTo(maxIndex);
                props.setGiftEditFromSummary(false);
                setUpdateButtonLabel("Update");               
            }else{
                slider.current.slickNext()
                // props.updateCart(props.selection,props.gifting,props.personalisation,props.bundleId,props.jewel,product,props.item,router,(bool)=>{
                //     setLoading(false)
                // },true)
            }
        } else {
            setLoading(true)
            props.updateCart(props.selection,props.gifting,props.personalisation,props.bundleId,props.jewel,product,props.item,router,false,(bool)=>{setLoading(false)},props.common.plpPaths)
            onUpdateCart(product,props.selection,props.personalisation.bundle[props.bundleId],props.item)
        }
    }
    function previousWindow(){
        if(index>0){
            slider.current.slickGoTo(index-1)
            // updateCartAtEachLevel(true)
            // props.updateCartAtEachLevelOfGiftingJourney(props.selection,props.gifting,props.personalisation,props.bundleId,props.jewel,product,props.item,router,(bool)=>{

            // },true)
        } else {
            props.close()
        }
    }
    let product = props.cache.products[props.item.split("-")[0]]
    let giftBoxProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[0].products
    let postCardProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[1].products
    let giftBoxProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
    let postCardProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
    let giftBoxProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
    let postCardProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
    let defaultGiftBoxProduct = giftBoxProducts.find(p=>p.is_standard_gifting_option=="1")
    let defaultPostCardProduct = postCardProducts.find(p=>p.is_standard_gifting_option=="1")
    let defaultGiftBoxImage = defaultGiftBoxProduct.media.standard[0]
    let defaultPostCardImage = defaultPostCardProduct.media.standard[0]
    let defaultPostCardImage2 = defaultPostCardProduct.media.standard[1]
    let selectedPostCardImage1 = index3==0?defaultPostCardImage:postCardProductsWithoutBlank[index3-1]?.media?.standard?postCardProductsWithoutBlank[index3-1]?.media?.standard[0]:null
    let selectedPostCardImage2 = index3==0?defaultPostCardImage2:postCardProductsWithoutBlank[index3-1]?.media?.standard?postCardProductsWithoutBlank[index3-1]?.media?.standard[1]:null
    let giftBoxArtistName = index2==0?defaultGiftBoxProduct.excerpt:giftBoxProductsWithoutBlank[index2-1]?.excerpt
    let postCardArtistName = index3==0?defaultPostCardProduct.excerpt:postCardProductsWithoutBlank[index3-1]?.excerpt
    let nextLabel = ""
    let addToCartContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:`${formatPrice(product.price)} - ${t('updateCart')}`
    if(product.engraving_possible=="1"){
        if(index==0)
            nextLabel = `1/5 - ${t('next')} (${t('Box')})`
        else if(index==1)
            nextLabel = `2/5 - ${t('next')} (${t('Card')})`
        else if(index==2)
            nextLabel = `3/5 - ${t('next')} (${t('note')})`
        else if(index==3)
            nextLabel = `4/5 - ${t('next')} (${t('summary')})`
        else if(index==4)
            nextLabel = addToCartContent
    } else {
        if(index==0)
            nextLabel = `1/4 - ${t('next')} (${t('Card')})`
        else if(index==1)
            nextLabel = `2/4 - ${t('next')} (${t('note')})`
        else if(index==2)
            nextLabel = `3/4 - ${t('next')} (${t('summary')})`
        else if(index==3)
            nextLabel = addToCartContent
    }
    function noteTextInputOnChange(e){
        if(!disableTyping){
            props.setNoteText(props.bundleId,e.target.value);
        }
        setTimeout(()=>{
            checkNoteTextHeight()
        },10)
    }
    function checkNoteTextHeight(){
        let maxHeight = maxNoteTextHeightRef.current?.getBoundingClientRect().height;
        let currentHeight = noteTextRef.current?.getBoundingClientRect().height + 8;
        if(currentHeight > maxHeight)
            setDisableNext(true)
        else
            setDisableNext(false)
    }
    useEffect(()=>{
        if(didMount.current){
            let giftBoxProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[0].products
            let postCardProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[1].products
            if(index2==0 || !didMount.current){
                let giftBoxProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
                let defaultGiftBoxProduct = giftBoxProducts.find(p=>p.is_standard_gifting_option=="1")
                props.setBoxChoice(props.bundleId,defaultGiftBoxProduct.items[0].item,defaultGiftBoxProduct.name)
            } 
            if(index2!=0 && didMount.current){
                let giftBoxProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
                props.setBoxChoice(props.bundleId,giftBoxProductsWithoutBlank[index2-1].items[0].item,giftBoxProductsWithoutBlank[index2-1].name)
            }
            if(index3==0 || !didMount.current){
                let postCardProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
                let defaultPostCardProduct = postCardProducts.find(p=>p.is_standard_gifting_option=="1")
                props.setCardChoice(props.bundleId,defaultPostCardProduct.items[0].item,defaultPostCardProduct.name)
            } 
            if(index3!=0 && didMount.current){
                let postCardProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
                props.setCardChoice(props.bundleId,postCardProductsWithoutBlank[index3-1].items[0].item,postCardProductsWithoutBlank[index3-1].name)
            }
        } 
    },[index])
    useEffect(()=>{
        if (didMount.current && window.innerWidth<=MOBILE_BREAKPOINT) {
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
                        ) && !(product.engraving_possible=="1" && index==0)
                    ){
                        // console.log("update cart useeffect")
                        props.updateCart(props.selection,props.gifting,props.personalisation,props.bundleId,props.jewel,product,props.item,router,true,null)
                    }
                }
            }
        } else {
            didMount.current = true
        }
    },[props.personalisation])
    let postCardItemRefs = [];
    useEffect(()=>{
        if(index3 >= 2){
            let totalPreviousItemsLength = 0
            for(let i=0;i<index3;i++){
                totalPreviousItemsLength += postCardItemRefs[i].current?.getBoundingClientRect().width
            }
            if(postCardHeadingWrapperRef.current)
                postCardHeadingWrapperRef.current.scrollLeft = totalPreviousItemsLength + index3 * 24
        } else {
            if(postCardHeadingWrapperRef.current)
                postCardHeadingWrapperRef.current.scrollLeft = 0
        }
    },[index3])
    for(let i=0;i<postCardProductsWithoutBlank.length+1;i++){
        postCardItemRefs[i] = useRef(null)
    }

    let giftBoxItemRefs = [];
    useEffect(()=>{
        if(index2 >= 2){
            let totalPreviousItemsLength = 0
            for(let i=0;i<index2;i++){
                totalPreviousItemsLength += giftBoxItemRefs[i].current?.getBoundingClientRect().width
            }
            if(giftBoxHeadingWrapperRef.current)
                giftBoxHeadingWrapperRef.current.scrollLeft = totalPreviousItemsLength + index2 * 24
        } else {
            if(giftBoxHeadingWrapperRef.current)
                giftBoxHeadingWrapperRef.current.scrollLeft = 0
        }
    },[index2])
    for(let i=0;i<giftBoxProductsWithoutBlank.length+1;i++){
        giftBoxItemRefs[i] = useRef(null)
    }
    
    let jsxArray = []
    if(product.engraving_possible=="1"){
        let engravingImage = product.engraving_possible=="1"?getProductImage(product,"e1","standard"):null
        let engravingCharacterLimit = product.engraving_character_limit_value?product.engraving_character_limit_value:DEFAULT_ENGRAVING_CHARACTER_LIMIT
        let remainingChars = parseInt(engravingCharacterLimit) - parseInt(props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText.length:0)
        let x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?500 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:500
        let archTextTop = "214px"
        let archTextLeft = "48px"
        let archTextWidth = "75%"
        let svgViewBox = "0 0 1150 407"
        let svgd = "M 66.00,109.50C 253.00,302.00 869.00,280.00 1083.50,142.50C 436.00,204.00 1168.00,88.00 1212.00,4.00M -888.00,-1128.00"
        let shapeWrapperPaddingTop = "36.5%"
        let engravingFontSize = "58px"
        if(product.sku == "U1RG1-18K-R" || product.sku == "U1RG1-18K-W" || product.sku == "U1RG1-18K-Y"){ 
            svgViewBox = "0 0 1232 140"
            svgd = "M 4.00,24.00C 436.00,204.00 1168.00,88.00 1212.00,4.00M -888.00,-1128.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U1RG2-18K-R" || product.sku == "U1RG2-18K-W" || product.sku == "U1RG2-18K-Y" || product.sku == "U1RG5-18K-R" || product.sku == "U1RG5-18K-W" || product.sku == "U1RG5-18K-Y"){ 
            archTextTop = "170px"           
            archTextLeft = "47px"
            svgViewBox = "0 0 1256 296"
            svgd = "M 16.00,96.00C 256.00,280.00 1048.00,256.00 1240.00,96.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U1RG4-18K-R" || product.sku == "U1RG4-18K-W" || product.sku == "U1RG4-18K-Y"){ 
            archTextTop = "162px"           
            archTextLeft = "66px"
            svgViewBox = "0 0 1528 256"
            svgd = "M 24.00,88.00C 384.00,248.00 1120.00,216.00 1496.00,88.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U2RG2-18K-R" || product.sku == "U2RG2-18K-W" || product.sku == "U2RG2-18K-Y"){ 
            archTextTop = "304px"           
            archTextLeft = "45px"
            svgViewBox = "0 0 1233 237"
            svgd = "M 15.00,30.00C 243.00,309.00 1053.00,252.00 1209.00,3.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U2RG3-18K-R" || product.sku == "U2RG3-18K-W" || product.sku == "U2RG3-18K-Y"){ 
            archTextTop = "282px"           
            archTextLeft = "45px"
            svgViewBox = "0 0 1208 280"
            svgd = "M 40.00,64.00C 352.00,312.00 888.00,256.00 1160.00,48.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U2RG5-18K-R" || product.sku == "U2RG5-18K-W" || product.sku == "U2RG5-18K-Y"){
            archTextTop = "293px"
            archTextLeft = "46px"
            svgViewBox = "0 0 1280 288"
            svgd = "M 40.00,48.00C 312.00,312.00 1024.00,264.00 1240.00,16.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U9RG2-18K-R" || product.sku == "U9RG2-18K-W" || product.sku == "U9RG2-18K-Y"){
            archTextTop = "235px"           
            archTextLeft = "54px"
            svgViewBox = "0 0 1280 288"
            svgd = "M 40.00,48.00C 312.00,312.00 1024.00,264.00 1240.00,16.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U9RG4-18K-R" || product.sku == "U9RG4-18K-W" || product.sku == "U9RG4-18K-Y"){
            archTextTop = "282px"           
            archTextLeft = "55px"
            archTextWidth = "70%"
            svgViewBox = "0 0 1232 320"
            svgd = "M 24.00,56.00C 272.00,336.00 968.00,304.00 1192.00,48.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U9RG14-18K-R" || product.sku == "U9RG14-18K-W" || product.sku == "U9RG14-18K-Y"){
            archTextTop = "362px"           
            archTextLeft = "55px"
            archTextWidth = "62%"
            svgViewBox = "0 0 820 120"
            svgd = "M 8.00,4.00C 120.00,132.00 664.00,128.00 800.00,12.00"
            shapeWrapperPaddingTop = "13.5%"
            x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?325 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:325
        }
        if(product.sku == "U9RG1-18K-R" || product.sku == "U9RG1-18K-W" || product.sku == "U9RG1-18K-Y"){ //U9RG15
            archTextTop = "240px"           
            archTextLeft = "54px"
            archTextWidth = "68%"
            svgViewBox = "0 0 1240 288"
            svgd = "M 56.00,40.00C 256.00,304.00 1016.00,280.00 1152.00,32.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U9RG20-18K-R" || product.sku == "U9RG20-18K-W" || product.sku=="U9RG20-18K-Y"){
            archTextTop = "310px"           
            archTextLeft = "51px"
            archTextWidth = "68%"
            svgViewBox = "0 0 1164 237"
            svgd = "M 42.00,48.00C 216.00,294.00 1017.00,240.00 1134.00,36.00"
            shapeWrapperPaddingTop = "13.5%"
        }
        if(product.sku == "U9RG5-18K-R" || product.sku == "U9RG5-18K-W" || product.sku=="U9RG5-18K-Y"){
            archTextTop = "276px"           
            archTextLeft = "50px"
            archTextWidth = "68%"
            svgViewBox = "0 0 1119 159"
            svgd = "M 6.00,15.00C 198.00,171.00 903.00,171.00 1110.00,24.00"
            shapeWrapperPaddingTop = "13.5%"
            engravingFontSize = "58px"
        }
        if(product.sku == "U9RG8-18K-R" || product.sku == "U9RG8-18K-W" || product.sku=="U9RG8-18K-Y"){
            archTextTop = "277px"           
            archTextLeft = "48px"
            archTextWidth = "68%"
            svgViewBox = "0 0 1080 147"
            svgd = "M 9.00,9.00C 168.00,165.00 858.00,165.00 1074.00,24.00"
            shapeWrapperPaddingTop = "13.5%"
            engravingFontSize = "60px"
        }
        if(product.sku == "U9RG11-18K-R" || product.sku == "U9RG11-18K-W" || product.sku=="U9RG11-18K-Y"){
            archTextTop = "287px"           
            archTextLeft = "50px"
            archTextWidth = "68%"
            svgViewBox = "0 0 1112 192"
            svgd = "M 16.00,32.00C 232.00,176.00 880.00,184.00 1088.00,24.00"
            shapeWrapperPaddingTop = "13.5%"
            engravingFontSize = "60px"
        }
        if(product.sku == "U9RG23-18K-R" || product.sku == "U9RG23-18K-W" || product.sku=="U9RG23-18K-Y"){
            archTextTop = "233px"           
            archTextLeft = "44px"
            archTextWidth = "68%"
            svgViewBox = "0 0 1028 182"
            svgd = "M 16.00,33.00C 236.00,176.00 835.50,159.50 1017.00,38.50"
            shapeWrapperPaddingTop = "13.5%"
            engravingFontSize = "60px"
        }
        if(product.sku == "U9RG25-18K-R" || product.sku == "U9RG25-18K-Y" || product.sku == "U9RG25-18K-W"){
            archTextTop = "250px"           
            archTextLeft = "69px"
            archTextWidth = "50%"
            svgViewBox = "0 0 465 67"
            svgd = "M 4.00,7.00C 88.00,71.50 361.00,79.00 460.00,14.50"
            shapeWrapperPaddingTop = "13.5%"
            engravingFontSize = "35px"
            x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?225 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:225
        }
        if(product.sku == "U9RG18-18K-R" || product.sku == "U9RG18-18K-Y" || product.sku == "U9RG18-18K-W"){
            archTextTop = "295px"
            archTextLeft = "73px"
            archTextWidth= "50%"
            svgViewBox = "0 0 1029 180"
            svgd = "M 9.00,15.00C 144.00,156.00 816.00,198.00 1020.00,15.00"
            shapeWrapperPaddingTop = "13.5%"
            engravingFontSize = "77px"
            x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?400 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:400
        } 
        jsxArray.push(
            <div className="engravingFirst positionRelative">
                    <div className="engraveImageAndInput">
                        <div style={{animationDelay:"0.3s"}} className="engravingImage alignCenter fadeUpAnimation positionRelative">
                            {!!engravingImage &&
                                <img className="width-100" src={engravingImage} />
                            }
                            <div style={{animationDelay:"0.6s"}} className="arcText fadeUpAnimation ">
                                <div className="shapeWrapper engravingText canelaThin">
                                    <EngravingText x={x} text={props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:""} id={product.product} svgViewBox={svgViewBox} svgd={svgd}/>
                                </div>
                            </div>
                        </div>
                        <div className="paddedContent engravingInput">
                            <h1 style={{animationDelay:"0.8s"}} className="heading alignCenter canelaThin font24-notResponsive fadeUpAnimation">{t('yourChoiceOfEngraving')}</h1>
                            <div className="textInputWrapper">
                                <div style={{animationDelay:"0.9s"}} className="textInput positionRelative">
                                    <input onChange={e=>props.setEngravingText(props.bundleId,e.target.value)} value={props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:""} maxlength={engravingCharacterLimit} placeholder={t('engravingText')} className="font24" type="text"/>
                                    <h4 className="textCount anoRegular grey">({remainingChars})</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                <style jsx>{`
                    .engravingInput{
                        margin-bottom:10rem;
                    }
                    .engraveImageAndInput{
                        display:flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    .arcText{
                        position: absolute;
                        top: ${archTextTop};
                        left: ${archTextLeft};
                        width: ${archTextWidth};
                    }
                    .shapeWrapper{
                        position:relative;
                        padding-top:${shapeWrapperPaddingTop};
                        width:100%;
                    }
                    .engravingText{
                        font-size: ${engravingFontSize};
                    }
                    .bottomContent button{
                        width:100%;
                    }
                    .bottomContent{
                        position: absolute;
                        width: 100%;
                        bottom: 1.6rem;
                    }
                    .textInputWrapper{
                        margin-bottom:3rem;
                    }
                    .textCount{
                        position:absolute;
                        bottom:0.8rem;
                        right:0;
                    }
                    .heading{
                        margin-bottom:2.4rem;
                    }
                    .textInput input{
                        padding:0 0 0.8rem 0;
                        border:0;
                        width:80%;
                    }
                    .textInput textarea{
                        padding:0 0 0rem 0;
                        border:0;
                        width:90%;
                        resize: none;
                        min-height: 36px;
                        line-height: 32px;
                    }
                    .engravingFirst .textInput{
                        opacity:0;
                        animation:inputFieldFillWidth 0.5s ease-out forwards;
                    }
                    .engravingFirst, .engraveImageAndInput{
                        height:100%;
                    }
                    .engravingFirst{
                        overflow-y:scroll;
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                    }
                    .engravingFirst::-webkit-scrollbar {
                        display: none;
                    }
                    .textInput{
                        display:block;
                        width:100%;
                        border-bottom:1px solid #787878;
                    }
                    .engravingImage{
                        width:280px;
                        max-width:100%;
                        margin:0 auto;
                        padding-top: 10rem;
                    }
                    @keyframes inputFieldFillWidth{
                        from{
                            opacity:0;
                            width:0%;
                        }
                        to{
                            opacity:1;
                            width:100%;
                        }
                    }
                    .active .bottomContent.static{
                        position:static;
                        margin-bottom:1.6rem;
                    }
                `}</style>
            </div>
        )
    }  
    jsxArray.push(
        <div key="giftboxes_mobile_slide" style={{height:"100%"}} className="giftBoxSelection">
            <div className={`engravingSecond `}>
                <div className="allGiftBoxes positionRelative">
                    <div className="giftBoxesMiddleSecond">
                        <Slider ref={sliderGiftBox} {...settingsGift}>
                            <div className="giftBoxContainer"></div>
                            <div onClick={()=>sliderGiftBox.current.slickGoTo(0)} className={`giftBoxContainer ${index2==0?"active":""}`}>
                                <img className="width-100" src={defaultGiftBoxImage} />
                            </div>
                            {giftBoxProductsWithoutBlank.map((p,i)=>{
                                if(p.product != defaultGiftBoxProduct.product)
                                return (
                                    <div onClick={()=>sliderGiftBox.current.slickGoTo(i+1)} className={`giftBoxContainer ${index2==i+1?"active":""}`}>
                                        {p?.media?.standard &&
                                            <img className="width-100" src={p.media.standard[0]} />
                                        }
                                    </div>
                                )
                            })}
                            <div className="giftBoxContainer"></div>
                        </Slider>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .allGiftBoxes{
                    height:calc(100% - 23.6rem);
                    margin: 0 -25%;
                }
                .giftBoxContainer.active{
                    opacity:1;
                    transform:scale(1.1);
                }
                .giftBoxesMiddleSecond{
                    width:100%;
                    position:absolute;
                    top: 50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                }
                .engravingSecond{
                    height: 100%;      
                    overflow:hidden;          
                }
                .giftBoxContainer{
                    overflow:hidden;
                    width:187px;
                    height:auto;
                    cursor:pointer;
                    opacity:0.6;
                    transform:scale(0.8);
                    transition:transform 0.15s;
                }
            `}</style>
        </div>
    )
    jsxArray.push(
        <div key="postcards_mobile_slide" style={{height:"100%"}} className="noteCardSelection">
            <div className={`engravingThird `}>
                <div className="allGiftBoxes positionRelative">
                    <div className="giftBoxesMiddleSecond">   
                        <Slider ref={sliderPostCard} {...settingsPost}>
                            <div className="giftBoxContainer"></div>
                            <div onClick={()=>sliderPostCard.current.slickGoTo(0)} className={`giftBoxContainer ${index3==0?"active":""}`}>
                                <img className="width-100" src={defaultPostCardImage} />
                            </div>
                            {postCardProductsWithoutBlank.map((p,i)=>{
                                return (
                                    <div onClick={()=>sliderPostCard.current.slickGoTo(i+1)} className={`giftBoxContainer ${index3==i+1?"active":""}`}>
                                        {p?.media?.standard &&
                                            <img className="width-100" src={p.media.standard[0]} />
                                        }
                                    </div>
                                )
                            })}
                            <div className="giftBoxContainer"></div>
                        </Slider>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .allGiftBoxes{
                    height:calc(100% - 23.6rem);
                    margin: 0 -32%;
                    padding-top: 5rem;
                    display: flex;
                    flex-flow: column nowrap;
                    justify-content: center;
                }
                .giftBoxesMiddleSecond{
                    width:100%;
                    position:absolute;
                    top: 50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                }
                .engravingThird{
                    height: 100%;  
                    overflow:hidden;              
                }                
                .giftBoxContainer{
                    cursor:pointer;
                    opacity:0.6;
                    padding-left:14%;
                    padding-right:14%;
                    transform:scale(0.9);
                    transition:transform 0.15s;
                }
                .giftBoxContainer img{
                    box-shadow: 0 3px 5px #a6a6a6;
                }
                .giftBoxContainer.active{
                    opacity:1;
                    transform:scale(1);
                }
            `}</style>
        </div>
    ) 
    jsxArray.push(
        <div key="note_slide" style={{height:"100%"}} className={`noteTextWritting ${index===(product.engraving_possible=="1"?3:2)?"removeGlitch active":""}`}>
            <div className="engravingFourth paddedContent positionRelative">
                {/* <div className="fourthContainer"> */}
                    <div className="imgSection  positionRelative">
                        <div className="noteImg">
                            {!!selectedPostCardImage1 &&
                                <img className="width-100 postCardImage1" src={selectedPostCardImage1}/>
                            }
                        </div>
                        {/* <div className="notePad canelaThin font16" ref={noteTextRef}>
                            {props.gifting.bundle[props.bundleId].noteText}
                        </div> */}
                        <div className="notePad canelaThin font16">
                            <div className="positionRelative">
                                {!!selectedPostCardImage2 &&
                                    <img className="width-100 postCardImage2" src={selectedPostCardImage2}/>
                                }
                                <div className="noteTextWrapper">
                                    <div ref={maxNoteTextHeightRef} className="maxHeightHolder width-100">
                                        <span className="font12" ref={noteTextRef}>{`${props?.personalisation?.bundle[props.bundleId]?.noteText?.length > 0?props?.personalisation?.bundle[props.bundleId]?.noteText:index3==0?t('yourMessageAppearsHere'):t('sayItWithUnsaid')}`}</span>
                                    </div>
                                </div>                                                                                              
                            </div>
                        </div>
                    </div>
                    <div className="noteSectionDetails">
                        {/* <h1 style={{animationDelay:"1.7s"}} className={`heading alignCenter canelaThin font24-notResponsive ${index===(product.engraving_possible=="1"?3:2)?"fadeUpAnimation":""}`}>Add a personal note</h1> */}
                        <div style={{animationDelay:"0.5s"}} className={`textInputWrapper alignCenter ${index===(product.engraving_possible=="1"?3:2)?"fadeUpAnimation":""}`}>
                            <div className="textInput alignLeft positionRelative">
                                <textarea onKeyDown={(e)=>keyDownHandler(e)} rows="2" cols="50" ref={textareaRef} onChange={e=>{noteTextInputOnChange(e)}} maxlength={1000} placeholder={t('addPersonalNote')} value={props?.personalisation?.bundle[props.bundleId]?.noteText?props.personalisation.bundle[props.bundleId].noteText:""} className="font24"></textarea>
                                {/* <h4 className="textCount anoRegular grey">({14 - noteTextLines})</h4> */}
                                {disableNext && <h4 className="textExceedingMsg positionAbsolute anoRegular error">{t('noteCharacterLimitDesc')}</h4>}
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>
            <style jsx>{`
                .noteImg{
                    position:absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left:1.6rem;
                    width:13.6rem;
                    overflow:hidden;
                    background:#ffffff;
                }
                .heading,.noteTextWritting{
                    opacity:0;
                }
                .noteTextWritting.removeGlitch{
                    opacity:1;
                }
                .heading.fadeUpAnimation{
                    opacity:auto;
                }
                .textExceedingMsg{
                    bottom:-18px;
                    right:0;
                }
                .noteTextWrapper{
                    padding: 10.4% 16.66% 22%;
                    width:100%;
                    height:100%;
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    height:100%;
                }
                .maxHeightHolder{
                    position:relative;
                    height:100%;
                    width:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    overflow:hidden;
                }
                .noteTextWrapper span{
                    font-size: 8px;
                    line-height: 8px;
                    display: inline-block;
                    overflow-wrap: anywhere;
                    white-space: pre-wrap;
                }
                .notePad{
                    position:absolute;
                    white-space: pre-wrap;
                    top: 50%;
                    transform: translateY(-50%);
                    right:50%;
                    width:187px;
                    height:270px;
                    overflow-wrap: break-word;
                    transition:all 0.3s ease-out 0.4s;
                }
                .active .notePad{
                    right:1.6rem;
                }
                .imgSection{
                    height:calc(100% - 232px);
                    min-height:24.8rem;
                }
                .noteFront, .noteBack{
                    position:absolute;
                    top:510px;
                    left:50%;
                }
                .noteFront{
                    transform:translateX(calc((-50%) - 167px));
                }
                .noteBack{
                    transform:translateX(calc((-50%) + 167px));
                }
                .cardNoteSection{
                    transform:translateX(-6rem);
                    transition:all 1s ease-out 0.5s;
                }
                .active .cardNoteSection{
                    transform:translateX(0rem);
                }
                .engravingFourth{
                    height:100%;
                    overflow-y:scroll;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .engravingFourth::-webkit-scrollbar {
                    display: none;
                }
                .bottomContent button{
                    width:100%;
                }
                .bottomContent{
                    position: absolute;
                    width: 100%;
                    bottom: 1.6rem;
                }
                .textInputWrapper{
                    margin-bottom:3rem;
                }
                .textCount{
                    position:absolute;
                    bottom:6px;
                    right:3px;
                }
                .heading{
                    margin-bottom:1.6rem;
                }
                .textInput input{
                    padding:0 0 0.8rem 0;
                    border:0;
                    width:80%;
                }
                .textInput textarea{
                    background: #ffffff;
                    padding:1rem 3rem 1rem 0;
                    border:0;
                    width:100%;
                    resize: none;
                    line-height: 32px;
                    -ms-overflow-style: none;  
                    scrollbar-width: none;  
                }
                .textInput textarea::-webkit-scrollbar {
                    display: none;
                }
                .engravingFourth .textInput{
                    line-height:14px;
                }
                .textInput{
                    display:block;
                    width:100%;
                    border-bottom:1px solid #787878;
                }
                .active .bottomContent.static{
                    position:static;
                    margin-bottom:1.6rem;
                }
                .noteImg,.notePad{
                    box-shadow: 0 3px 5px #a6a6a6;
                }
            `}</style>
        </div>
    )
    jsxArray.push(
        <div key="summary_slide" className={`summarySlide ${index===(product.engraving_possible=="1"?4:3)?"show":""}`} style={{height:"100%"}}>
            <div className="personalisationSummary">
                {!!props.personalisation.bundle[props.bundleId] && (index==(product.engraving_possible=="1"?4:3)) &&
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
                .summarySlide{
                    opacity:0;
                    height:100%;
                    overflow:scroll;
                }
                .summarySlide.show{
                    opacity:1;
                }
                .personalisationSummary{
                    padding-bottom:8.2rem;
                    width:100%;
                }
            `}</style>
        </div>
    )
    return (
        <>
            <div className="engravingSection mobile positionRelative">
                <Slider ref={slider} {...settings}>
                    {jsxArray.map(slide=>slide)}
                </Slider>
                <div onClick={()=>{previousWindow()}} className={`backButton anoRegular font16 positionAbsolute ${index===(product.engraving_possible=="1"?4:3)?"hideForMobile":""}`}>
                    <TextAndArrowCta text={t('back1')} arrowDirection="left" />
                </div>
                <h4 className={`allIncluded anoRegular positionAbsolute ${index===(product.engraving_possible=="1"?4:3)?"hideForMobile":""}`}>{t('allIncluded')}</h4>
                <h4 className={`allIncludedPrice anoRegular positionAbsolute ${index===(product.engraving_possible=="1"?4:3)?"hideForMobile":""}`}>{formatPrice(product.price)}</h4>
                {index===(product.engraving_possible=="1"?1:0) &&
                <div className="boxesDetails">
                    <h1 style={{animationDelay:"0.1s"}} className={`heading alignCenter canelaThin font24-notResponsive ${index===(product.engraving_possible=="1"?1:0)?"fadeUpAnimation":""}`}>{t('chooseJewelBox')}</h1>
                    <div ref={giftBoxHeadingWrapperRef} style={{animationDelay:"0.2s"}} className={`giftBoxNames canelaThin font24 ${index===(product.engraving_possible=="1"?1:0)?"fadeUpAnimation":""}`}>
                        <div ref={giftBoxItemRefs[0]} onClick={()=>sliderGiftBox.current.slickGoTo(0)} className={`giftBoxName underlineLR ${index2===0?"currentlyActive active":""}`}>Unsaid</div>
                        <div className={`giftBoxName seperator`}></div>
                        {giftBoxProductsWithoutBlank.map((p,i)=>{
                                if(p.product != defaultGiftBoxProduct.product)
                                return <div ref={giftBoxItemRefs[i+1]} onClick={()=>sliderGiftBox.current.slickGoTo(i+1)} className={`giftBoxName ${index2===i+1?"currentlyActive active":""}`}><span className={` underlineLR ${index2===i+1?"active":""}`}>{p.name}</span></div>                                            
                        })}
                    </div>
                    <div style={{animationDelay:"0.3s"}} className={`artistName alignCenter anoHalfRegular font16 ${index===(product.engraving_possible=="1"?1:0)?"fadeUpAnimation":""}`}>{!!giftBoxArtistName?`Artist: ${giftBoxArtistName}`:""}</div>
                </div>}
                {index===(product.engraving_possible=="1"?2:1) &&
                <div className="boxesDetails">
                    <h1 style={{animationDelay:"0.1s"}} className={`heading alignCenter canelaThin font24-notResponsive ${index===(product.engraving_possible=="1"?2:1)?"fadeUpAnimation":""}`}>{t('chooseYourCard')}</h1>
                    <div ref={postCardHeadingWrapperRef} style={{animationDelay:"0.2s"}} className={`giftBoxNames canelaThin font24 ${index===(product.engraving_possible=="1"?2:1)?"fadeUpAnimation":""}`}>
                        <div ref={postCardItemRefs[0]} onClick={()=>sliderPostCard.current.slickGoTo(0)} className={`giftBoxName underlineLR ${index3===0?"currentlyActive active":""}`}>Unsaid</div>
                        <div className={`giftBoxName seperator`}></div>
                        {postCardProductsWithoutBlank.map((p,i)=>{
                            return (
                                <div ref={postCardItemRefs[i+1]} onClick={()=>sliderPostCard.current.slickGoTo(i+1)} className={`giftBoxName ${index3===i+1?"currentlyActive active":""}`}><span className={` underlineLR ${index3===i+1?"active":""}`}>{p.name}</span></div>
                            )
                        })}
                    </div>
                    <div style={{animationDelay:"0.3s"}} className={`artistName alignCenter anoHalfRegular font16 ${index===(product.engraving_possible=="1"?2:1)?"fadeUpAnimation":""}`}>{!!postCardArtistName?`Artist: ${postCardArtistName}`:""}</div>
                </div>}
                <div style={{animationDelay:"0.3s"}} className="bottomContent seperate paddedContent">
                    <button onClick={()=>disableNext==false?nextWindow():""} className={`btn anoRegular font20 nextBtn ${disableNext?"btnInactive":"btnPrimary"} ${loading?"loading":""}`}>{props.common.giftEditFromSummary?"Update":nextLabel}</button>
                </div>
            </div>
            
            <style jsx>{`
                .nextBtn.loading{
                    color:#ffffff;
                    background:#000000;
                }
                .engravingSection{
                    background:#ffffff;
                    padding-top:${props.common.showBrandNotification?"8.4rem":"5.6rem"};
                    height:100%;
                    width:100%;
                    background:#ffffff;
                }
                .enFirstActive .engravingFirst{
                    overflow-y:scroll;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .engravingSection::-webkit-scrollbar{
                    display: none;
                }
                .boxesDetails{
                    width:100%;
                    position: absolute;
                    bottom: 104px;
                }
                .engravingSection::-webkit-scrollbar {
                    display: none;
                }        
                .artistName{
                    margin-bottom:0rem;
                    min-height:2rem;
                }
                .giftBoxName span{
                    line-height: 2.4rem;
                    display: inline-block;
                }
                .giftBoxNames{
                    padding-left:3.6rem;
                    display:flex;
                    //display: -webkit-box;
                    overflow-x:scroll;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                    margin-bottom:3.2rem;
                }
                .giftBoxNames::-webkit-scrollbar {
                    display: none;
                }
                .giftBoxName{
                    width:auto;
                    margin-right:2.4rem;
                    color:#787878;
                    white-space: nowrap;
                }
                .giftBoxNames .giftBoxName:last-child{
                    margin-right: 0;
                    padding-right: 3.6rem;
                }
                .giftBoxName.seperator{
                    border-right:1px solid #787878;
                }
                .backButton{
                    top:${props.common.showBrandNotification?"10rem":"7.2rem"};
                    left:${paddingLeftMobile};
                }
                .allIncluded{
                    top:${props.common.showBrandNotification?"10rem":"7.2rem"};
                    left:50%;
                    transform:translateX(-50%);
                }
                .allIncludedPrice{
                    top:${props.common.showBrandNotification?"10rem":"7.2rem"};
                    right:${paddingRightMobile};
                }
                .processList h2.currentlyActive,
                .giftBoxName.currentlyActive{
                    color:#000000;
                }
                .processList{
                    align-items:center;
                    display:flex;
                    margin-right:-3.2rem;
                }
                .processList h2{
                    padding-right:3.2rem;
                }
                .arrowBack{
                    margin-right:0.8rem;
                }
                .bottomContent button{
                    width:100%;
                }
                .bottomContent{
                    position: absolute;
                    width: 100%;
                    background: #ffffff;
                    padding-bottom: 1.6rem;
                    padding-top: 1.6rem;
                    bottom:0;
                    box-shadow: 0 1px 5px #e0e0e0;
                }
                .heading{
                    margin-bottom:2.4rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection,gifting,common,cache,personalisation}){
    return {selection,gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{setEngravingText,setNoteText,setBoxChoice,setCardChoice,updateCart,setGiftEditFromSummary})(engravingMobile)