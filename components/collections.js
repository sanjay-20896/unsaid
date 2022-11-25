import React, { useEffect, useState,useRef } from 'react'
import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT} from '../config'
import CollectionProduct from '../components/collectionProduct'
import SwipeableViews from 'react-swipeable-views'
import cssVariables from '../data/cssVariables'
export default function Collections(props) {
    let collectionItems = useRef(null)
    let collectionItemRefs = []
    const [index, setIndex] = useState(0)
    const [translateD,setTranslateD] = useState(0)
    let handleChangeIndex = index => {
        setIndex(index)
    }
    useEffect(()=>{
        if(index >= 2){
            let totalPreviousItemsLength = 0
            for(let i=0;i<index;i++){
                totalPreviousItemsLength += collectionItemRefs[i].current.getBoundingClientRect().width
            }
            collectionItems.current.scrollLeft = totalPreviousItemsLength + index * 24
        } else {
            collectionItems.current.scrollLeft = 0
        }
    },[index])
    for(let i=0;i<5;i++){
        collectionItemRefs[i] = useRef(null)
    }
    return (
        <>

            <div className="collectionsContainer">
                <div className="collectionsTop">
                    <div className="heading canelaThin black inlineBlock">Our hero collections of symbols</div>
                    <div className="collectionListWrapper">
                        <ul className="collectionItems font24 canelaThin grey" ref={collectionItems} style={{transform:`translateX(${translateD})`}}>
                            <li className={`collectionItem underlineLR ${index===0?"active":""}`} ref={collectionItemRefs[0]} onClick={()=>setIndex(0)}>Nest</li>
                            <li className={`collectionItem underlineLR ${index===1?"active":""}`} ref={collectionItemRefs[1]} onClick={()=>setIndex(1)}>Whirlwind</li>
                            <li className={`collectionItem underlineLR ${index===2?"active":""}`} ref={collectionItemRefs[2]} onClick={()=>setIndex(2)}>Supernova</li>
                            <li className={`collectionItem underlineLR ${index===3?"active":""}`} ref={collectionItemRefs[3]} onClick={()=>setIndex(3)}>Infinite</li>
                            <li className={`collectionItem underlineLR ${index===4?"active":""}`} ref={collectionItemRefs[4]} onClick={()=>setIndex(4)}>Bubble</li>
                        </ul>
                    </div>
                    {/* <div className="showForMobile descMobile canelaThin font16-notResponsive mobilePadding">
                        The Nest collection is for the people and places you call home, wherever they may be.
                    </div> */}
                </div>
                <div className="productContainer">
                    <SwipeableViews index={index} onChangeIndex={handleChangeIndex} springConfig={{
                            duration: "0.9s",
                            easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
                            delay: "0s",
                    }}>
                        <div className={`collectionProduct `}><CollectionProduct linksTo="/collections" device={props.device} productImage="/images/collection.jpg" productImageTablet="/images/collectionTabletNew.jpg" productImageMobile="/images/collectionMobile.jpg" productHeading="Nest" productDesc="The Nest collection is for the people and places you call home, wherever they may be." /></div>
                        <div className={`collectionProduct `}><CollectionProduct linksTo="/collections" device={props.device} productImage="/images/collection.jpg" productImageTablet="/images/collectionTabletNew.jpg" productImageMobile="/images/collectionMobile.jpg" productHeading="Whirlwind" productDesc="The Nest collection is for the people and places you call home, wherever they may be." /></div>
                        <div className={`collectionProduct `}><CollectionProduct linksTo="/collections" device={props.device} productImage="/images/collection.jpg" productImageTablet="/images/collectionTabletNew.jpg" productImageMobile="/images/collectionMobile.jpg" productHeading="Supernova" productDesc="The Nest collection is for the people and places you call home, wherever they may be." /></div>
                        <div className={`collectionProduct `}><CollectionProduct linksTo="/collections" device={props.device} productImage="/images/collection.jpg" productImageTablet="/images/collectionTabletNew.jpg" productImageMobile="/images/collectionMobile.jpg" productHeading="Infinite" productDesc="The Nest collection is for the people and places you call home, wherever they may be." /></div>
                        <div className={`collectionProduct `}><CollectionProduct linksTo="/collections" device={props.device} productImage="/images/collection.jpg" productImageTablet="/images/collectionTabletNew.jpg" productImageMobile="/images/collectionMobile.jpg" productHeading="Bubble" productDesc="The Nest collection is for the people and places you call home, wherever they may be." /></div>
                    </SwipeableViews>
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
                    margin-bottom: 3.2rem;
                }
                .collectionListWrapper{
                    display:inline-block;
                }
                .collectionItems{
                    list-style: none;
                    display: flex;
                    justify-content: center;
                    margin-top:0;
                    margin-bottom: 3.2rem;
                    margin-left:9.3rem;
                }
                .collectionItem{
                    margin-right:4.8rem;
                    cursor:pointer;
                }
                .collectionItem.active,.collectionItem:hover{
                    color:#000000;
                }
                .collectionItem:last-child{
                    margin-right:0;
                }
                .collectionProduct{
                   width:100%;
                }
                ul{
                    padding:0;
                }
                // .underline:hover::after{
                //     transform:scale(0);
                // }
                @media screen and (max-width: 1180px){
                    .collectionItems{
                        margin-left:0;
                    }
                    .heading,.collectionListWrapper{
                        display:block;
                    }
                    .heading{
                        text-align:center;
                    }
                    .collectionListWrapper{
                        margin-top:2.4rem;
                        margin-left:0;
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
                    .collectionsContainer{
                        padding-left:0;
                        padding-right:0;
                    }
                    .collectionListWrapper{
                        display:block;
                        padding-left: ${cssVariables.paddingLeftMobile};
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
                    .collectionItems{
                        margin-left:0;
                        justify-content: left;
                        margin-top:4.8rem;
                        margin-bottom: 3.2rem;
                        overflow-x:scroll;
                        -webkit-overflow-scrolling: touch;
                        -ms-overflow-style: none;  /* Internet Explorer 10+ */
                        scrollbar-width: none;  /* Firefox */
                    }
                    .collectionItems::-webkit-scrollbar { 
                        display: none;  /* Safari and Chrome */
                    }
                    .collectionItem{
                        margin-right:2.4rem;
                    }
                    
                    // .underline::after{
                    //     display:none;
                    // }
                }
            `}</style>
        </>
    )
}