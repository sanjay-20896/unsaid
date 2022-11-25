import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import {setEngravingText,setNoteText,setBoxChoice,setCardChoice} from '../redux/actions'
import {getNestedObject,getProductImage} from '../functions'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT, IPAD_BREAKPOINT,MEDIUM_BREAKPOINT,DEFAULT_ENGRAVING_CHARACTER_LIMIT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import Slider from "react-slick";
import useTranslation from 'next-translate/useTranslation'

function postCardWindow(props) {
    const {t}=useTranslation('common');
    const [postCardSliderIndex, setPostCardSliderIndex] = useState(1);
    const [animateOnce, setAnimateOnce] = useState("none")
    const slider=useRef();
    const postCardHeadingWrapperRef=useRef();
    let postCardItemRefs = [];
    const didMount = useRef(false)
    useEffect(()=>{
        // if(props.giftEdit) props.updateButtonLabel("Update");
        if(postCardSliderIndex >= 3){
            let totalPreviousItemsLength = 0
            for(let i=0;i<postCardSliderIndex;i++){
                totalPreviousItemsLength += postCardItemRefs[i].current?.getBoundingClientRect().width
            }
            if(postCardHeadingWrapperRef.current)
                postCardHeadingWrapperRef.current.scrollLeft = totalPreviousItemsLength + postCardSliderIndex * 24
        } else {
            if(postCardHeadingWrapperRef.current)
                postCardHeadingWrapperRef.current.scrollLeft = 0
        }
    },[postCardSliderIndex])
   

    useEffect(() => {
        slider.current.slickGoTo(1)

        // if(props.mainSliderIndex==(product.engraving_possible?1:0)){
        //     setAnimateOnce("active")
        // }
    }, [])
    const settings = {
        arrows:false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        beforeChange: (current, next) => setPostCardSliderIndex(next)
    };

    useEffect(()=>{
        if(didMount.current){
            let postCardProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[1].products
            if(postCardSliderIndex==0 || !didMount.current){
                let postCardProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
                let defaultPostCardProduct = postCardProducts.find(p=>p.is_standard_gifting_option=="1")
                props.setCardChoice(props.bundleId,defaultPostCardProduct.items[0].item,defaultPostCardProduct.name)
            } 
            if(postCardSliderIndex!=0 && didMount.current){
                let postCardProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
                props.setCardChoice(props.bundleId,postCardProductsWithoutBlank[postCardSliderIndex-1].items[0].item,postCardProductsWithoutBlank[postCardSliderIndex-1].name)
            }
            props.setNoteImg1(selectedPostCardImage1)
            props.setNoteImg2(selectedPostCardImage2)
            props.setDefaultPostcard(postCardSliderIndex==0?true:false)

            if(animateOnce!="active"){
                if(props.mainSliderIndex==(product.engraving_possible?2:1)){
                    setAnimateOnce("active")
                }
            }
        } else {
            didMount.current = true
        }
    },[props.mainSliderIndex])

    let product = props.cache.products[props.item.split("-")[0]]
    let postCardProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[1].products
    let postCardProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
    let postCardProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
    let defaultPostCardProduct = postCardProducts.find(p=>p.is_standard_gifting_option=="1")
    let defaultPostCardImage = defaultPostCardProduct.media.standard[0]
    let defaultPostCardImage2 = defaultPostCardProduct.media.standard[1]
    let selectedPostCardImage1 = postCardSliderIndex==0?defaultPostCardImage:postCardProductsWithoutBlank[postCardSliderIndex-1]?.media?.standard?postCardProductsWithoutBlank[postCardSliderIndex-1]?.media?.standard[0]:null
    let selectedPostCardImage2 = postCardSliderIndex==0?defaultPostCardImage2:postCardProductsWithoutBlank[postCardSliderIndex-1]?.media?.standard?postCardProductsWithoutBlank[postCardSliderIndex-1]?.media?.standard[1]:null
    let postCardArtistName = postCardSliderIndex==0?defaultPostCardProduct.excerpt:postCardProductsWithoutBlank[postCardSliderIndex-1]?.excerpt

    for(let i=0;i<postCardProductsWithoutBlank.length+1;i++){
        postCardItemRefs[i] = useRef(null)
    }
    console
    return (
        <>
            <div className={`postCardWindow  ${animateOnce}`}>
                <div className="engravingThird" key="postcard_slide">
                    <div className="allGiftBoxes">
                        <Slider ref={slider} {...settings}>
                            <div className="giftBoxContainer one"></div>
                            <div onClick={()=>slider.current.slickGoTo(0)} className={`giftBoxContainer one ${postCardSliderIndex==0?"active":""}`}>
                                <img className="width-100" src={defaultPostCardImage} />
                            </div>
                            {postCardProductsWithoutBlank.map((p,i)=>{
                                return (
                                    <div key={i} onClick={()=>slider.current.slickGoTo(i+1)} className={`giftBoxContainer ${i==0 && "two"} ${i==1 && "three"} ${postCardSliderIndex==i+1?"active":""}`}>
                                        {p?.media?.standard &&
                                            <img className="width-100" src={p.media.standard[0]} />
                                        }
                                    </div>
                                )
                            })}
                            <div className="giftBoxContainer one"></div>
                        </Slider>
                    </div>
                    <h1 style={{animationDelay:"0.3s"}} className={`heading alignCenter canelaThin font24 ${props.mainSliderIndex===(product.engraving_possible=="1"?2:1)?"fadeUpAnimation":""}`}>{t('chooseYourCard')}</h1>
                    <div ref={postCardHeadingWrapperRef} style={{animationDelay:"0.4s"}} className={`giftBoxNames canelaThin font24 ${props.mainSliderIndex===(product.engraving_possible=="1"?2:1)?"fadeUpAnimation":""}`}>
                        <div ref={postCardItemRefs[0]} onClick={()=>slider.current.slickGoTo(0)} className={`giftBoxName underlineLR ${postCardSliderIndex===0?"currentlyActive active":""}`}>Unsaid</div>
                        <div className={`giftBoxName seperator`}><span>|</span></div>
                        {postCardProductsWithoutBlank.map((p,index)=>{
                            return (
                                <div ref={postCardItemRefs[index+1]} onClick={()=>slider.current.slickGoTo(index+1)} className={`giftBoxName underlineLR ${postCardSliderIndex===index+1?"currentlyActive active":""}`}>{p.name}</div>
                            )
                        })}
                    </div>
                    <div style={{animationDelay:"0.5s"}} className={`artistName alignCenter anoHalfRegular font16 ${props.mainSliderIndex===(product.engraving_possible=="1"?2:1)?"fadeUpAnimation":""}`}>{!!postCardArtistName ? `${t('artist')}: ${postCardArtistName}` :""}</div>
                </div>
            </div>
            <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .postCardWindow{
                    padding:12rem 0 12rem;
                }
                .postCardWindow{
                    overflow-x:hidden;
                }
                .allGiftBoxes{
                    margin:0 -10% 3.2rem;
                }
                .allGiftBoxes .giftBoxContainer{
                    padding-right:30%;
                    padding-left:30%;
                }
                .artistName{
                    margin-bottom:2.4rem;
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
                .giftBoxName.seperator span{
                    opacity:0;
                }
                .giftBoxContainer{
                    cursor:pointer;
                    opacity:0.6;
                    transform:scale(0.8);
                    transition:transform 0.15s;
                }
                .giftBoxContainer.active{
                    opacity:1;
                    transform:scale(1);
                }
                .giftBoxContainer img{
                    box-shadow: 0 3px 5px #a6a6a6;
                }
                .giftBoxName.currentlyActive{
                    color:#000000;
                }
                @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:24%;
                        padding-left:24%;
                    }
                }
                @media only screen and (max-width: 1000px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:20%;
                        padding-left:20%;
                    }
                }
                @media only screen and (max-width: 900px){
                    .allGiftBoxes .giftBoxContainer{
                        padding-right:17%;
                        padding-left:17%;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({gifting,common,cache,personalisation}){
    return {gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{setEngravingText,setNoteText,setBoxChoice,setCardChoice})(postCardWindow)