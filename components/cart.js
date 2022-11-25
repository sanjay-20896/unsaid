import React, {useState,useRef,useEffect} from 'react'
import {TOKEN_VAR_NAME,MOBILE_BREAKPOINT,HIDE_UNDO_MESSAGE_TIMER,TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import { ECOMMERCE_URI } from '../branch-specific-config'
import Link from 'next/link'
import {updateCartLikes,storeSelection,showCart,tempSaveCartItem,restoreItems} from '../redux/actions'
import {connect} from 'react-redux'
import CartItemGift from './cartItemGift'
import CartItemEditGift from './cartItemEditGift'
import {getObjectToPushToWishlist,formatMoney} from '../functions'
import {onRemoveFromCart,onAddToCartMultiple, onProceedToCheckout} from '../gtmFunctions'
import Loader from './loader'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables'
import useTranslation from 'next-translate/useTranslation'

function Cart(props) {
    const {t}=useTranslation('common')

    const [editItem, setEditItem] = useState(null)
    const [undoMessage,setUndoMessage] = useState("")
    const [loading,setLoading] = useState(false)
    const [overlayDeactivated,deactivateOverlay] = useState(false)
    const cart = useRef(null)
    const productsListRef = useRef(null)
    // {props?.selection?.selection?.location?.name}
    let cartItems = props.selection?.selection?.selection?.items?.slice().reverse()
    // let displayCartItems=props.selection?.selection?.selection?.items?.reverse()

    let timer=null;
    function deleteButtonClicked(){
        productsListRef.current.scrollIntoView();
    }
    async function addCartToWishlist(){
        setLoading(true)
        let newGiftsList=[]
        if(Array.isArray(cartItems)){
            for(let i=0;i<cartItems.length;i++){
                if(!!cartItems[i].bundle){
                    newGiftsList.push(
                        getObjectToPushToWishlist(cartItems[i])
                    )
                }
            }
        }
        props.tempSaveCartItem(newGiftsList)
        let oldGiftsInWishlist = JSON.parse(JSON.stringify(props.selection.cartItems))
        newGiftsList=newGiftsList.concat(oldGiftsInWishlist)
        props.updateCartLikes(newGiftsList,props?.selection?.selection?.loggedIn,true,props.cookieConsent.functional)
        for(let j=0;j<cartItems.length;j++){
                let line=cartItems[j].line
                let token=localStorage.getItem(TOKEN_VAR_NAME)
                let response=await fetch(`${ECOMMERCE_URI}/lines/${line}`,{
                    method:'DELETE',
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': `*/*; api-token: ${token}`,
                    },
                })
                if(response.status==200){
                    let selection=await response.json()
                    props.storeSelection(selection);
                }else{
                    let data=await response.json()
                }
        }
        setLoading(false)
        setUndoMessage(t('cartMovedWishlist'));
        setTimeout(()=>{
            setUndoMessage("")
        },HIDE_UNDO_MESSAGE_TIMER)
        onRemoveFromCart(cartItems,props.selection,props.cache)

    }
    async function emptyCart(){
        setLoading(true)
        let backupItems=[]
        for(let i=0;i<cartItems.length;i++){
            let line=cartItems[i].line;
            let token=localStorage.getItem(TOKEN_VAR_NAME)
            let response=await fetch(`${ECOMMERCE_URI}/lines/${line}`,{
                method:"DELETE",
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': `*/*; api-token: ${token}`,
                },
            })
            if(response.status==200){
                backupItems.push(getObjectToPushToWishlist(cartItems[i]))
                let selection=await response.json()
                props.storeSelection(selection)
            }else{
                // console.log("couldnt remove item from cart",response.status)
                let data=await response.json();
                // console.log(data); 
            }
        }
        props.tempSaveCartItem(backupItems)
        setLoading(false)
        setUndoMessage(t('cartEmptied'))
        setTimeout(()=>{
            setUndoMessage("")
        },HIDE_UNDO_MESSAGE_TIMER)
        onRemoveFromCart(cartItems,props.selection,props.cache)
    }
    function addToCartMultipleGTM(backupItems){
        let productsArray = backupItems.filter(item=>{
            let metaData = JSON.parse(item.comment)
            let {selectedJewelProductId} = metaData
            return !!props?.cache?.products[selectedJewelProductId]
        })
        onAddToCartMultiple(productsArray,props.cache,props.selection)
    }
    async function clickRestore(){
        setLoading(true)
        let backupItems = props?.selection?.backupItems
        props.restoreItems(props?.selection?.backupItems,props?.gifting,props.cookieConsent.functional,props.selection.cartItems,(bool)=>{
            if(bool){
                setUndoMessage("")
            }else{
                //
            }
            setLoading(false)
        })
        addToCartMultipleGTM(backupItems)
    }
    function handleCartScroll(){
        deactivateOverlay(true)
    }
    useEffect(()=>{
        cart.current.addEventListener("scroll",handleCartScroll)
        if(props.common.showCart) deactivateOverlay(false)
        else setUndoMessage("")
    },[props.common.showCart])
//    console.log("cartItems",cartItems)
    return (
        <>
         <div className="cartComponent positionRelative" ref={cart}>
             {loading &&
                <div className="loader text-center">
                    <span className="dots inlineBlock">
                        <Loader type="dots" size={8} color="#787878"/>
                    </span>
                </div>
            }
            <div className="cartNav">
                <div className="cartLabel font24 canelaThin">{t('cart')}</div>
                <div onClick={()=>props.showCart(false)} className="cross"><img src="/images/cross.svg" width="16" height="16" alt='cross'/></div>
                <div className="mobileLogo showForMobile"><Link href="/"><a><img src="/images/logoDarkSmall.png" width="104" height="32" className="logoDark" alt="Mobile Logo Dark" /></a></Link></div>
            </div>
           <div className={`mainMsg anoRegular font16 ${undoMessage?"show":""}`}>
                <div className="mainTextMsg white">{undoMessage}</div>
                <div className="undo white underlineWhiteLR active cursorPointer" onClick={()=>clickRestore()} onMouseEnter={()=>{clearTimeout(timer)}} onMouseLeave={()=>{setTimeout(()=>{
                    setUndoMessage("")
                },HIDE_UNDO_MESSAGE_TIMER)
            }
            }>{t('undo')}</div>
            </div>
            {!editItem && Array.isArray(cartItems) && cartItems.length >=1 &&
                <div ref={productsListRef} className="cartList">
                    <div className="products positionRelative">
                        {/* <div className={`darkOverlayCart ${overlayDeactivated?"inactive":""}`} onClick={()=>deactivateOverlay(true)}></div> */}
                        {Array.isArray(cartItems) && cartItems.map((item,index)=>{
                            // console.log(item)
                            if(!!item.bundle)
                            return(
                                <div className="cartItemGift">
                                    <CartItemGift  noCartTextAnimation={props.noCartTextAnimation} item={item} setEditItem={setEditItem} hideTotal={true} setLoading={setLoading} setUndoMessage={setUndoMessage} deleteButtonClicked={()=>deleteButtonClicked()}/>
                                </div>
                            )
                        })}
                    </div>   
                    <div className="bottomSection">
                        <Link href="/checkout"><a  className="btn btnPrimary anoRegular font20 fadeUpAnimation" onClick={()=>{props.showCart(false);onProceedToCheckout(props.selection,props.cache);}}>{props?.selection?.selection?.selection?.totals?`${props.selection.selection.selection.totals.itemsTotalPrice.substring(0,1)}${formatMoney(props.selection.selection.selection.totals.itemsTotalPriceAsNumber,0,".",",")}`:""} – {t('proceedToCheckout')}</a></Link>
                        {props?.selection?.selection?.location?.shipTo &&
                        <>  
                            <div  className="shippingWrapper">
                                <div  className="shippingLine anoRegular alignCenter fadeUpAnimation">
                                    <span className="grey">{t('complementoryShipping')}</span>
                                </div>
                            </div>
                        </>
                        }
                    </div>
                </div>
            }
            {!editItem && (!Array.isArray(cartItems) || cartItems.length == 0) && 
                <div className="emptyCartMsg positionRelative">
                    <div className="canelaThin font24-notResponsive cartEmpty">{t('cartEmpty')}</div>
                </div>
            }
            {!!editItem &&
                <CartItemEditGift timer={timer} item={editItem} setEditItem={setEditItem} undoMessage={undoMessage} setUndoMessage={setUndoMessage} deleteButtonClicked={()=>deleteButtonClicked()}/>
            }
         </div>   
         <style jsx>{`
            .shippingTo{
               margin-top: 1.6rem;
               display: flex;
               justify-content: center;
            }
            .caretDown{
                position: absolute;
                right: 0.2rem;
                top: -0.3rem;
            }
            .shipToText{
                transform:translateY(0.25rem);
            }
            .countrySelector{
                margin-left:1.6rem;
                width:19rem;
                padding-right:2rem;
            }
            .shippingWrapper{
                justify-content: center;
                align-items: center;
            }
            .bottomSection{
                position:fixed;
                bottom:0;
                padding-top:3.2rem;
                background-color:white;
                width:100%;
                z-index:10;
                background:#ffffff;
            }
            .loader{
                display: flex;
                flex-direction: column;
                justify-content: center;
                height:100%;
                position:fixed;
                width:100%;
                text-align: center;
                background: #ffffff;
                z-index: 11;            
            }
            .dots{
                margin:auto;
            }
            .cartItemGift{
                border-bottom: 1px solid #787878;
                margin-bottom: 3.2rem;
                overflow-y: scroll;
            }
            .products .cartItemGift:last-child{
                border-bottom: none;
            }
            .cartComponent{
                overflow-y:scroll;
                height:100%;
                width:100%;
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .cartComponent::-webkit-scrollbar {
                display: none;
            }
            .cartEmpty{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .mainMsg{
                justify-content:space-between;
                background:#000000;
                width:100%;
                padding:2rem 6.4rem;
                display:none;
                position:fixed;
                width:100%;
                top:8rem;
                z-index:4;
            }
            .mainMsg.show{
                display:flex;
            }
            .emptyCartMsg{
                height:100%;
                padding-top:8rem;
            }
            .shippingLine{
                font-size:1.2rem;
                margin-top:1.6rem;
            }
            .bottomSection{
                border-top: 1px solid #F2F2F2;
                // box-shadow: 0px -2px 5px #f2f2f2;
                padding:1.6rem 6.4rem 1.6rem 6.4rem;
                text-align:center;
            }
            .bottomSection button{
                width:100%;
                margin-bottom:1.6rem;
            }
            .cartToWishList{
                display:flex;
                justify-content:center;
                margin-top:2.4rem;
            }
            .cartToWishList .moveToWishList{
                margin-right:2.4rem;
            }
            .cartToWishList div{
                cursor:pointer;
            }
            .cross{
                cursor:pointer;
            }
            .cartNav{
                height:8rem;
                position: fixed;
                width: 100%;
                display:flex;
                justify-content:space-between;
                align-items: baseline;
                padding:2.4rem 6.4rem;
                border-bottom:${overlayDeactivated?"1px solid #787878":"none"};
                background:#ffffff;
                z-index: 10;
                padding: 2.4rem 6.4rem;
            }
            .products{
                padding:${undoMessage?"15rem 6.4rem 12rem 6.4rem":"12.8rem 6.4rem 12rem 6.4rem"};
            }   
            .darkOverlayCart{
                position: absolute;
                background: rgba(0, 0, 0, 0.09);
                z-index: 3;
                width: 100%;
                height: 100%;
                left: 0;
                top:0;
            }
            .darkOverlayCart.inactive{
                display:none;
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .products{
                    padding:${undoMessage?"15rem 4.8rem 12rem 4.8rem":"12.8rem 4.8rem 12rem 4.8rem"};
                }   
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .cross img{
                    width:1.2rem;
                }
                .cartNav{
                    padding:1.6rem ${paddingRightMobile} 1.6rem ${paddingLeftMobile};
                    margin:0;
                    width:100%;
                    height:5.6rem;
                    border-bottom:none;
                }
                .mobileLogo{
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                }
                .products{
                    padding:${undoMessage?`11.8rem ${paddingLeftMobile} 10rem ${paddingRightMobile}`:`8.8rem ${paddingLeftMobile} 10rem ${paddingRightMobile}`};
                }
                .bottomSection{
                    padding: 1.6rem 2rem 1.6rem 2rem;
                }
                .bottomSection button{
                    letter-spacing: 0.5px;
                }
                .shippingLine{
                    padding: 0 3%;
                }
                .cartEmpty{
                    letter-spacing: 0.7px;
                }
                .mainMsg{
                    top:5.6rem;
                    padding:1.4rem 3.6rem;
                }
                .emptyCartMsg{
                    padding-top:5.6rem;
                }
                .logoDark{
                    width:59px;
                    height: auto;
                }
                .cartNav .mobileLogo a{
                    display: block;
                }
            }
         `}</style>
        </>
    )
}
function mapStateToProps({cache,selection,common,gifting,cookieConsent,personalisation}){
    return {cache,selection,common,gifting,cookieConsent,personalisation}
}
export default connect(mapStateToProps,{updateCartLikes,storeSelection,showCart,tempSaveCartItem,restoreItems})(Cart)