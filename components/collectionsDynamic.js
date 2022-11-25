import React, { useEffect, useState,useRef } from 'react'
import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import CollectionProduct from '../components/collectionProductDynamic'
import cssVariables from '../data/cssVariables'
import Slider from "react-slick";
export default function CollectionsDynamic(props) {
    const collectionItemRefs = useRef([]);
    let collectionItems = useRef(null)
    const collections = useRef(null)
    // let collectionItemRefs = []
    const [index, setIndex] = useState(0)
    const [translateD,setTranslateD] = useState(0)
    let handleChangeIndex = index => {
        // console.log('handle change',index)
        setIndex(index)
    }
    useEffect(() => {
        collectionItemRefs.current = collectionItemRefs.current.slice(0, props.collections.length);
     }, [props.collections]);
    useEffect(()=>{
        if(index >= 2){
            let totalPreviousItemsLength = 0
            for(let i=0;i<index;i++){
                totalPreviousItemsLength += collectionItemRefs.current[i].getBoundingClientRect().width
            }
            collectionItems.current.scrollLeft = totalPreviousItemsLength + index * 24
        } else {
            collectionItems.current.scrollLeft = 0
        }
    },[index])
    // for(let i=0;i<5;i++){
    //     collectionItemRefs[i] = useRef(null)
    // }
    const settings = {
        dots: false,
        infinite: false,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    function handleSlideChange(index){
        setIndex(index)
    }
    function listItemClick(index){
        collections.current.slickGoTo(index)
        setIndex(index)
    }
    return (
        <>
            <div className="collectionsContainer">
                <div className="collectionsTop">
                    {/* <div className="heading canelaThin black inlineBlock">{props.heading}</div> */}
                    <div className="collectionListWrapper">
                        <ul className="collectionItems font24 canelaThin grey" ref={collectionItems} style={{transform:`translateX(${translateD})`}}>
                            {!!props?.collections && Array.isArray(props.collections) && props.collections.map((collectionItem,i)=>{
                                return <li key={`collectionItem_${i}`} className={`collectionItem underlineLR ${index===i?"active":""}`} ref={el => collectionItemRefs.current[i] = el}  onClick={()=>listItemClick(i)}>{collectionItem.navItem}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className="productContainer">
                    <Slider {...settings} beforeChange={(oldIndex,newIndex)=>handleSlideChange(newIndex)} ref={collections}>
                        {!!props?.collections && Array.isArray(props.collections) && props.collections.map((collectionItem,i)=>{
                            return (
                                <div className="collectionProduct" key={`collectionProduct_${i}`}>
                                    <CollectionProduct objectFitCover={props.objectFitCover} productTagging={Array.isArray(collectionItem.productTaging)?collectionItem.productTaging:""} productTaggingMobile={Array.isArray(collectionItem.productTagingMobile)?collectionItem.productTagingMobile:""} linksTo={!!collectionItem?.link? collectionItem.link : false} productImage={collectionItem.imageDesktop?collectionItem.imageDesktop:null} productImageMobile={collectionItem.imageMobile?collectionItem.imageMobile:null} productHeading={collectionItem.heading?collectionItem.heading:null} productDesc={collectionItem.description?collectionItem.description:""} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
            <style jsx>{`
                .heading{
                    font-size:2rem;
                    line-height: 2.8rem;
                    letter-spacing: 1px;
                }
                .collectionsContainer{
                    position:relative;
                    overflow:hidden;
                    padding-left: ${cssVariables.paddingLeftDesktop};
                    padding-right: ${cssVariables.paddingRightDesktop};
                }
                .collectionsTop{
                    margin-bottom: 2.8rem;
                }
                .collectionListWrapper{
                    display:inline-block;
                }
                .collectionItems{
                    list-style: none;
                    // display: flex;
                    justify-content: center;
                    margin-top:0;
                    margin-bottom: 0;
                    white-space:nowrap;
                }
                .collectionItem{
                    display:inline-block;
                    margin-right:4.8rem;
                    cursor:pointer;
                }
                .collectionItem.active,.collectionItem:hover{
                    color:#000000;
                }
                .collectionProduct{
                   width:100%;
                }
                ul{
                    padding:0;
                }
                .underline:hover::after{
                    transform:scale(0);
                }
                .underline.active:hover::after{
                    transform:scale(1);
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .heading{
                        font-size:1.8rem;
                        line-height:2.8rem;
                    }
                    .collectionItems{
                        //margin-left:4.5rem;
                    }
                    .collectionItem {
                        margin-right: 4.2rem;
                    }
                    .collectionsContainer{
                        padding-left: ${cssVariables.paddingLeftMedium};
                        padding-right: ${cssVariables.paddingRightMedium};
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .heading{
                        font-size:1.6rem;
                        line-height:2.8rem;
                    }
                    .collectionItems{
                        //margin-left:6.9rem;
                    }
                    .collectionItem {
                        margin-right: 3.5rem;
                    }
                    .collectionsContainer{
                        padding-left: ${cssVariables.paddingLeftTabletLandscape};
                        padding-right: ${cssVariables.paddingRightTabletLandscape};
                    }
                }
                @media screen and (max-width: 925px){
                    .collectionItem {
                        margin-right: 2rem;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .collectionItems{
                        //margin-left:5.1rem;
                    }
                    .collectionsContainer{
                        padding-left: ${cssVariables.paddingLeftTabletPortrait};
                        padding-right: ${cssVariables.paddingRightTabletPortrait};
                    }
                }
                @media screen and (max-width: 768px){
                    .collectionsTop{
                        text-align:center;
                    }
                    .collectionItems{
                        margin-left:auto;
                        margin-right:auto;
                    }
                    .heading{
                        margin-bottom:2rem;
                        display:block;
                        text-align:center;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .heading{
                        font-size: 1.7rem;
                        line-height: 2rem;
                        letter-spacing: 1px;
                    }
                    .descMobile{
                        margin-top:2.4rem;
                    }
                    .collectionItems{
                        font-size:2.4rem;
                        line-height:3.2rem;
                        // padding-right: ${cssVariables.paddingRightMobile};
                        overflow-x:scroll;
                        -webkit-overflow-scrolling: touch;
                        -ms-overflow-style: none;  /* Internet Explorer 10+ */
                        scrollbar-width: none;  /* Firefox */
                        width:100%;
                    }
                    .collectionsContainer{
                        padding-left:0;
                        padding-right:0;
                    }
                    .collectionListWrapper{
                        display:block;
                        padding-left: 0;
                    }
                    .collectionItems .collectionItem:first-child {
                        margin-left: ${cssVariables.paddingLeftMobile};
                    }
                    .collectionItems .collectionItem:last-child {
                        margin-right: ${cssVariables.paddingRightMobile};
                        // margin-right:0;
                    }
                    .heading{
                        position:absolute;
                        top:0;
                        left:50%;
                        transform:translateX(-50%);
                        width: max-content;
                    }
                    .mobilePadding{
                        padding-left: ${cssVariables.paddingLeftMobile};
                        padding-right: ${cssVariables.paddingRightMobile};
                    }
                    .collectionItems::-webkit-scrollbar { 
                        display: none;  /* Safari and Chrome */
                    }
                    .collectionItems{
                        margin-left:0;
                        justify-content: left;
                        margin-top:0rem;
                        margin-bottom: 2.4rem;
                    }
                    .collectionItem{
                        margin-right:2.4rem;
                    }
                }
            `}</style>
        </>
    )
}