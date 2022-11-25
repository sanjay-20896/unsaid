import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import {setEngravingText,setNoteText,setBoxChoice,setCardChoice} from '../redux/actions'
import {TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import Slider from "react-slick"
import LazyImage from './lazyImage'
import useTranslation from 'next-translate/useTranslation'

function GiftBoxWindow(props) {
    const {t}=useTranslation('common');
    const [giftBoxSliderIndex, setGiftBoxSliderIndex] = useState(1);
    const [animateOnce, setAnimateOnce] = useState("none")
    const slider=useRef();
    const didMount = useRef(false)
    useEffect(() => {
        slider.current.slickGoTo(1)
    }, [])
    const settings = {
        arrows:false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (current, next) => setGiftBoxSliderIndex(next)
    };

    useEffect(()=>{
        if(didMount.current){
            let giftBoxProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[0].products
            if(giftBoxSliderIndex==0 || !didMount.current){
                let giftBoxProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
                let defaultGiftBoxProduct = giftBoxProducts.find(p=>p.is_standard_gifting_option=="1")
                props.setBoxChoice(props.bundleId,defaultGiftBoxProduct.items[0].item,defaultGiftBoxProduct.name)
            } 
            if(giftBoxSliderIndex!=0 && didMount.current){
                let giftBoxProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
                props.setBoxChoice(props.bundleId,giftBoxProductsWithoutBlank[giftBoxSliderIndex-1].items[0].item,giftBoxProductsWithoutBlank[giftBoxSliderIndex-1].name)
            }
            if(animateOnce!="active" && props.personalisationShow){
                if(props.mainSliderIndex==(product.engraving_possible?1:0)){
                    setAnimateOnce("active")
                }
            }
        } else {
            didMount.current = true
        }
    },[props.mainSliderIndex])
    useEffect(() => {
        if(animateOnce!="active" && props.personalisationShow){
            if(props.mainSliderIndex==(product.engraving_possible?1:0)){
                setAnimateOnce("active")
            }
        }
    }, [props.personalisationShow])

    let product = props.cache.products[props.item.split("-")[0]]
    let giftBoxProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[0].products
    let giftBoxProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
    let giftBoxProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
    let defaultGiftBoxProduct = giftBoxProducts.find(p=>p.is_standard_gifting_option=="1")
    let defaultGiftBoxImage = defaultGiftBoxProduct.media.standard[0]
    let giftBoxArtistName = giftBoxSliderIndex==0?defaultGiftBoxProduct.excerpt:giftBoxProductsWithoutBlank[giftBoxSliderIndex-1]?.excerpt
    return (
        <>
            <div className={`giftBoxWindow  ${animateOnce}`}>
                <div className={`engravingSecond `} key="giftbox_slide">
                    <div className="allGiftBoxes">
                        <Slider ref={slider} {...settings}>
                            <div className="giftBoxContainer"></div>
                            <div onClick={()=>slider.current.slickGoTo(0)} className={`giftBoxContainer ${giftBoxSliderIndex==0?"active":""}`}>
                                <LazyImage
                                    alt="Blank gift box"
                                    originalSrc={defaultGiftBoxImage}
                                    width={818}
                                    height={858}
                                />
                            </div>
                            {giftBoxProductsWithoutBlank.map((p,i)=>{
                                if(p.product != defaultGiftBoxProduct.product)
                                return (
                                    <div onClick={()=>slider.current.slickGoTo(i+1)} className={`giftBoxContainer ${i==0 && "two"} ${i==1 && "three"} ${giftBoxSliderIndex==i+1?"active":""}`}>
                                        {p?.media?.standard &&
                                            <LazyImage
                                                alt="Blank gift box"
                                                originalSrc={p?.media?.standard[0]}
                                                width={818}
                                                height={858}
                                            />
                                        }
                                    </div>
                                )
                            })}
                            <div className="giftBoxContainer"></div>
                        </Slider>
                    </div>
                    <h1 style={{animationDelay:"0.3s"}} className={`heading alignCenter canelaThin font24 ${props.mainSliderIndex===(product.engraving_possible=="1"?1:0)?"fadeUpAnimation":""}`}>{t('chooseJewelBox')}</h1>
                    <div style={{animationDelay:"0.4s"}} className={`giftBoxNames canelaThin font24 ${props.mainSliderIndex===(product.engraving_possible=="1"?1:0)?"fadeUpAnimation":""}`}>
                        <div onClick={()=>slider.current.slickGoTo(0)} className={`giftBoxName underlineLR ${giftBoxSliderIndex===0?"currentlyActive active":""}`}>Unsaid</div>
                        <div className={`giftBoxName seperator`}></div>
                        {giftBoxProductsWithoutBlank.map((p,index)=>{
                                if(p.product != defaultGiftBoxProduct.product)
                                return <div onClick={()=>slider.current.slickGoTo(index+1)} className={`giftBoxName underlineLR ${giftBoxSliderIndex===index+1?"currentlyActive active":""}`}>{p.name}</div>                                            
                        })}
                    </div>
                    <div style={{animationDelay:"0.5s"}} className={`artistName alignCenter anoHalfRegular font16 ${props.mainSliderIndex===(product.engraving_possible=="1"?1:0)?"fadeUpAnimation":""}`}>{!!giftBoxArtistName ? `${t('artist')}: ${giftBoxArtistName}` :""}</div>
                </div>
            </div>
            <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .giftBoxWindow{
                    overflow-x:hidden;
                }
                .giftBoxWindow{
                    padding:12rem 0 12rem;
                }
                .allGiftBoxes{
                    margin:0 -5% 3.2rem;
                }
                .allGiftBoxes .giftBoxContainer{
                    padding-right:20%;
                    padding-left:20%;
                }
                .artistName{
                    margin-bottom:2.4rem;
                }
                .giftBoxContainer{
                    cursor:pointer;
                    opacity:0.6;
                    transform:scale(0.8);
                    transition:transform 0.15s;
                }
                .giftBoxContainer.active{
                    opacity:1;
                    transform:scale(1.1);
                }
                .giftBoxNames{
                    display:flex;
                    justify-content:center;
                    margin-bottom:4rem;
                    overflow-x:scroll;
                    -ms-overflow-style: none;
                    scrollbar-width: none; 
                }
                .giftBoxNames::-webkit-scrollbar{
                    display: none;
                }
                .giftBoxName{
                    margin-right:4.8rem;
                    color:#787878;
                    white-space: nowrap;
                }
                .giftBoxName.seperator{
                    width:1px;
                    background:#787878;
                }
                .giftBoxName.currentlyActive{
                    color:#000000;
                }
                @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:15%;
                        padding-left:15%;
                    }
                }
                @media only screen and (max-width: 1000px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:10%;
                        padding-left:10%;
                    }
                }
                @media only screen and (max-width: 1000px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:7%;
                        padding-left:7%; 
                    }
                }
                @media only screen and (max-width: 900px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:3%;
                        padding-left:3%;
                    }
                }
            `}</style>
        
        </>
    )
}
function mapStateToProps({gifting,common,cache,personalisation}){
    return {gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{setEngravingText,setNoteText,setBoxChoice,setCardChoice})(GiftBoxWindow)