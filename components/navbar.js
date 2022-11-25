import React from 'react'
import { MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT } from '../config'
import Link from 'next/link'
import {setCustomizeWindow} from '../redux/actions'
import { connect } from 'react-redux';
import {showCart,showWishlist,showMyUnsaidMenu,showExploreMenu,showSearchWindow,setActiveTier1Item,setActiveTier2Item,setPanelTwoData,setPanelThreeData,preventNavHide} from '../redux/actions'
import SearchResults from './searchResults'
import { headerHeightMobile, paddingLeftMobile, paddingRightMobile } from '../data/cssVariables';
import useTranslation from 'next-translate/useTranslation'
function navbar(props) {
    const {t}=useTranslation('common');
    let cartItemsCount = Array.isArray(props.selection?.selection?.selection?.items) && props.selection.selection.selection.items.length > 0?props.selection.selection.selection.items.length:""
    let productLikesLength = 0
    let giftLikesLength = 0
    for(let i=0;i<props.selection.likesArray.length;i++){
        let id = props.selection.likesArray[i]
        if(props.cache.products[id])
            productLikesLength += 1
    }
    for(let i=0;i<props.selection.cartItems.length;i++){
        let giftItem = props.selection.cartItems[i]
        if(props.gifting.bundle[giftItem.bundleId])
            giftLikesLength += 1
    }
    let wishlistItemsCount = productLikesLength + giftLikesLength
    function myUnsaidClick(){
        if(props.common.showExploreMenu && !props.common.showMyUnsaidMenu){
            props.showExploreMenu(false)
            setTimeout(()=>{
                props.preventNavHide(true)
                props.showMyUnsaidMenu(true)
            },150)
        }
        if(!props.common.showExploreMenu && !props.common.showMyUnsaidMenu){
            props.preventNavHide(true)
            props.showMyUnsaidMenu(true)
        } 
        if(props.common.showMyUnsaidMenu){
            props.preventNavHide(false)
            props.showMyUnsaidMenu(false)
        }
        
    }
    function exploreClick(){
            if(props.common.showMyUnsaidMenu && !props.common.showExploreMenu){
                props.showMyUnsaidMenu(false)
                setTimeout(()=>{
                    props.preventNavHide(true)
                    props.showExploreMenu(true)
                },150)
            }
            if(!props.common.showMyUnsaidMenu && !props.common.showExploreMenu){
                props.preventNavHide(true)
                props.showExploreMenu(true)
            }
            if(props.common.showExploreMenu){
                props.preventNavHide(false)
                props.showExploreMenu(false)
            }
    }
    function wishlistClick(){
        props.showExploreMenu(false)
        props.showMyUnsaidMenu(false)
        setTimeout(()=>{
            props.showWishlist(true)
        },150)
    }
    function cartClick(){
        props.showExploreMenu(false)
        props.showMyUnsaidMenu(false)
        setTimeout(()=>{
            props.showCart(true)
        },150)
    }
    function topSearchBoxClicked(){
        // console.log('search box clicked')
        props.showSearchWindow(true)
        props.setActiveTier1Item(null)
        props.setActiveTier2Item(null)
        props.setPanelTwoData(<SearchResults />)
        props.setPanelThreeData(null)
    }
    return (
        <>
            <div className={`nav positionRelative ${props.common.showExploreMenu?"showExplore":""} ${props.common.showSearchWindow?"searchWindowActive":""}`}>
                <div className="mobileMenuIcon showForMobile" onClick={()=>exploreClick()}>
                    <div className="linesWrapper positionRelative">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="accountIconMobile showForMobile" onClick={()=>myUnsaidClick()}>
                    {!props.common.showMyUnsaidMenu && 
                        <img src="/images/userIcon.svg" width="16" height="16" className="showForMobile userIcon" alt="Show My Unsaid"/>
                    }
                    {props.common.showMyUnsaidMenu &&
                        <img src="/images/cross.svg" width="16" height="16" className="showForMobile closeMyUnsaidMenuIcon" alt="Close My Unsaid"/>
                    }
                </div>
                <div className="navItemsNavbar paddedContent canelaThin">
                    <div className="navItemFirst">
                        <div className="positionRelative exploreButton hideForMobileInline underlineLR" onClick={()=>exploreClick()}>
                            <span className="showExploreMenuText hideForMobileInline">{props.common.showExploreMenu?t('close'):t('explore')}</span>
                        </div>
                    </div>
                    <div className="navItemMiddle">
                        <span className="navLogos">
                            <Link href="/"><a><img src="/images/logoDarkSmall.png" width="104" height="32" className="logoDark" alt="Logo Dark" /></a></Link>
                        </span>
                        <div className="navSearchButton" onClick={()=>topSearchBoxClicked()}>
                            <div className="searchWrap positionRelative">
                                <div className="searchLabel">{props.common.showSearchWindow?t('searchTitle'):t('search')}</div>
                            </div>
                        </div>
                    </div>
                    <div className="navItemLast">
                        <ul className="options flexList listStyleNone pl0 m0 hideForMobileInline">
                            <li onClick={()=>cartClick()} className={`positionRelative cartItem navBarItem ${props.selection.animateCart?"hover":""} ${!!cartItemsCount?"hasItems":""}`}>
                                <img src="/images/cart.svg" className="middle" width="24" height="24" />
                                {!!cartItemsCount &&
                                    <>
                                        <div className="cartIndicator positionAbsolute font12 anoRegular"></div>
                                        <div className="cartValue anoRegular alignCenter">{cartItemsCount}</div>
                                    </>
                                }
                            </li>
                            <li onClick={()=>wishlistClick()} className={`positionRelative favouriteItem navBarItem ${props.selection.animateHeart?"hover":""} ${!!wishlistItemsCount?"hasItems":""}`}>
                                <img src="/images/favourite.svg" alt='favourite icon' className="middle" width="24" height="24" />
                                {!!wishlistItemsCount &&
                                    <>
                                        <div className="cartIndicator positionAbsolute font12 anoRegular"></div>
                                        <div className="cartValue anoRegular alignCenter">{wishlistItemsCount}</div>
                                    </>
                                }
                            </li>
                            <li onClick={()=>myUnsaidClick()} className="userIconList">
                                <span className="myUnsaidText"><span className="underlineLR inlineBlock">{props.common.showMyUnsaidMenu?t('close'):t('myUnsaid')}</span></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div onClick={()=>cartClick()} className={`cartItem showForMobile navBarItem ${props.selection.animateCart?"hover":""} ${!!cartItemsCount?"hasItems":""}`}>
                    <div className="positionRelative cartItemContent">
                        <img src="/images/cartIconMobile.svg" alt='cart icon' className="middle" width="16" height="16" />
                        {!!cartItemsCount &&
                            <>
                                <div className="cartIndicator positionAbsolute font12 anoRegular"></div>
                                <div className="cartValue anoRegular alignCenter">{cartItemsCount}</div>
                            </>
                        }
                    </div>
                </div>
                <div onClick={()=>wishlistClick()} className={`favouriteItem showForMobile navBarItem ${props.selection.animateHeart?"hover":""} ${!!wishlistItemsCount?"hasItems":""}`}>
                    <div className="positionRelative favItemContent">
                        <img src="/images/favMobile.svg" alt='Favourite icon' className="middle" width="16" height="16" />
                        {!!wishlistItemsCount &&
                            <>
                                <div className="cartIndicator positionAbsolute font12 anoRegular"></div>
                                <div className="cartValue anoRegular alignCenter">{wishlistItemsCount}</div>
                            </>
                        }
                    </div>
                </div>
           </div>
           <style jsx>{`
                .accountIconMobile{
                    position:absolute;
                    left:calc(1.6rem + 2.1rem);
                    top:0;
                    height:${headerHeightMobile};
                    padding-left:1.25rem;
                    padding-right:1.5rem;
                    display:flex;
                    flex-flow:column wrap;
                    justify-content:center;
                    transform: translateY(0.1rem);
                }
                .accountIconMobile .userIcon{
                    transform: translateY(-0.2rem);
                }
                .mobileMenuIcon{
                    position: absolute;
                    left: 0;
                    top: 0;
                    height: 5.6rem;
                    width: calc(1.6rem + 2.35rem);
                    padding-left: 2rem;
                }
                .linesWrapper{
                    height:100%;
                    width:1.6rem;
                }
                .mobileMenuIcon span{
                    display:inline-block;
                    position:absolute;
                    left:0;
                    height:0.1rem;
                    width:100%;
                    background:#000000;
                }
                .mobileMenuIcon span:nth-child(1){
                    top:2.1rem;
                }
                .mobileMenuIcon span:nth-child(2){
                    top:2.6rem;
                }
                .mobileMenuIcon span:nth-child(3){
                    top:3.1rem;
                }
                .showExplore .mobileMenuIcon span:nth-child(1){
                    top:2.5rem;
                    transform:rotate(45deg);
                }
                .showExplore .mobileMenuIcon span:nth-child(2){
                    display:none;
                }
                .showExplore .mobileMenuIcon span:nth-child(3){
                    top:2.5rem;
                    transform:rotate(-45deg);
                }
                .closeMyUnsaidMenuIcon{
                    width: 1.2rem;
                    margin-top: -0.5rem;
                }
                .navItemMiddle{
                    width: 100%;
                    text-align: center;
                    line-height:1;
                }
                .navLogos{
                    display:inline-block;
                }
                .navSearchButton{
                    display:none;
                    width: 80%;
                    text-align: center;
                }
                .showExplore .navLogos{
                    display:none;
                }
                .showExplore .navSearchButton{
                    display:inline-block;
                }
                .searchWrap{
                    width:100%;
                }
                .searchWrap::after{
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
                .searchWindowActive .searchWrap::after{
                    animation:underLineBackwards 0.5s ease-out forwards 0.1s;
                }
                @keyframes underLineBackwards{
                    from{
                        opacity:1;
                        background-size: 100% 1px, auto;
                    }
                    to{
                        opacity:0;
                        background-size: 0 1px, auto;
                    }
                }
                .myUnsaidText{
                    min-width:9.5rem;
                    text-align:right;
                }
                .exploreButton{
                    cursor:pointer;
                }
                .cartItem.hasItems, .favouriteItem.hasItems
                {
                    transform: translateY(8px);
                }
                .cartItem:hover, .favouriteItem:hover,.cartItem.hover, .favouriteItem.hover{
                    transform: translateY(0);
                }
                .cartValue{
                    opacity:0;
                }
                .cartItem:hover .cartValue, .favouriteItem:hover .cartValue,.cartItem.hover .cartValue, .favouriteItem.hover .cartValue{
                    opacity:1;
                }
                .cartItem:hover .cartIndicator, .favouriteItem:hover .cartIndicator,.cartItem.hover .cartIndicator, .favouriteItem.hover .cartIndicator{
                    display:none;
                }
                .cartItem:hover .cartItem img, .favouriteItem:hover .favouriteItem img,.cartItem.hover .cartItem img, .favouriteItem.hover .favouriteItem img{
                    margin-bottom:0.8rem;
                }
                .cartValue{
                    font-size:1.2rem;
                }
                .customizeButton{
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                }
                .addToCart{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                }
                .addToCart button{
                    margin-right:11.5px;
                }
                .cartIndicator{
                    width:0.8rem;
                    height:0.8rem;
                    border-radius:50%;
                    background:#000000;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 3px;
                }
                .showExplore .showExploreMenuText{
                    opacity:1;
                }
                .exploreButton{
                    //cursor:${props.common.menuItems.menu ? "pointer":"progress"};
                    cursor:pointer;
                }
                .mobileLogoDark{
                    display:none;
                }
                ul li{
                    cursor:pointer;
                }
                .navItemFirst{
                    width:calc(100% - 104px);
                }
                .navItemLast{
                    width:calc(100% - 104px);
                    display:flex;
                    justify-content:flex-end;
                }
                .middle{
                    vertical-align:middle;
                }
                .nav{
                    background:white;
                    width:100%;
                }
                .nav.show{
                    transform:translateY(0%);
                }
                .logoDark{
                    width:104px;
                    height:auto;
                }
                .explore{
                    font-size:2.4rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .logoDark{
                        width:94px;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .logoDark{
                        width:79px;
                    }
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .cartItem{
                        position:absolute;
                        right:0;
                        top:0;
                        height:${headerHeightMobile};
                        width:calc(1.6rem + 2.35rem);
                        padding-right:1.6rem;
                        padding-left:0.75rem;
                        display:flex;
                        flex-flow:column wrap;
                        justify-content:center;
                        transform:translateY(0);   
                    }
                    .cartItem.hasItems{
                        transform: translateY(0);
                    }
                    .cartItemContent{
                        transform: translateY(-0.1rem);
                    }
                    .cartItem.hasItems .cartItemContent{
                        transform: translateY(0.9rem);
                    }
                    .favouriteItem{
                        position:absolute;
                        right:calc(1.6rem + 2.35rem);
                        height:${headerHeightMobile};
                        top:0;
                        padding-right:0.75rem;
                        padding-left:1.5rem;
                        display:flex;
                        flex-flow:column wrap;
                        justify-content:center;
                        transform:translateY(0);
                    }
                    .favouriteItem.hasItems{
                        transform:translateY(0);
                    }
                    .favItemContent{
                        transform: translateY(-0.1rem);
                    }
                    .favouriteItem.hasItems .favItemContent{
                        transform: translateY(0.9rem);
                    }
                    .logoDark{
                        width:71px;
                        height: 22px;
                    }
                    .userIconList{
                        min-width:1.6rem;
                    }
                    .showExplore .navLogos{
                        display:inline-block;
                    }
                    .showExplore .navSearchButton{
                        display:none;
                    }
                    .mobileLogoDark{
                        display:block;
                    }
                    .navItemFirst{
                        font-size:1.6rem;
                    }
                    .cartIndicator{
                        width:0.4rem;
                        height:0.4rem;
                        border-radius:50%;
                        background:#000000;
                        left: 50%;
                        transform: translateX(-50%);
                        bottom: 10px;
                    }
                    .logo{
                        display:none;
                    }
                    .navItemFirst{
                        width:calc(100% - 11px);
                    }
                    .navItemLast{
                        width:calc(100% - 11px);
                        transform: translateY(-0.3rem);
                    }
                    .navItemLast ul.options li{
                        margin-right:1.6rem;
                    }
                    .exploreMenu{
                        width:100%;
                        z-index:100;
                    }
                    .myUnsaidMenu{
                        width:100%;
                        z-index:100;
                    }
                    .userIconList{
                        margin-bottom: -2px;
                    }
                }
           `}</style>
        </>
    )
}
function mapStateToProps({common,selection,cache,gifting}){
    return {common,selection,cache,gifting}
}
export default connect(mapStateToProps,{setCustomizeWindow,showCart,showWishlist,showMyUnsaidMenu,showExploreMenu,showSearchWindow,setActiveTier1Item,setActiveTier2Item,setPanelTwoData,setPanelThreeData,preventNavHide})(navbar)