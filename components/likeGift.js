import { updateCartLikes } from '../redux/actions'
import {connect} from 'react-redux'
import {MOBILE_BREAKPOINT} from '../config'
import {getObjectToPushToWishlist} from '../functions'
function LikeGift(props){
    let jewelProduct = props.cache.products[props.item.split("-")[0]]
    async function like(){
        // console.log('like gift')
        let cartItems = props.selection?.selection?.selection?.items
        let cartItem = null
        let giftsInWishlist = JSON.parse(JSON.stringify(props.selection.cartItems))
        if(Array.isArray(cartItems)){
            cartItem = cartItems.find(item=>{
                if(item.comment){
                    let comment = JSON.parse(item.comment)
                    if( props.jewel==comment.mainJewelProductId &&
                        jewelProduct.product==comment.selectedJewelProductId &&
                        props.item==comment.selectedItem
                    )
                    return true
                } else {
                    return false
                }
            })
        }
        if(!!cartItem){
            if(isLiked()){
                let i = giftsInWishlist.findIndex(gift=>gift.line==cartItem.line)
                if(i>-1)
                    giftsInWishlist.splice(i,1)
            } else {
                let giftItemToPush=getObjectToPushToWishlist(cartItem)
                let comment = JSON.stringify({mainJewelProductId:props.jewel,selectedJewelProductId:parseInt(props.item.split("-")[0]),boxChoice:props.personalisation.bundle[props.bundleId].boxChoice,cardChoice:props.personalisation.bundle[props.bundleId].cardChoice,selectedItem:props.item,engravingText:!!props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:"",noteText:!!props?.personalisation?.bundle[props.bundleId]?.noteText?props.personalisation.bundle[props.bundleId].noteText:""})
                giftItemToPush.comment = comment
                // console.log('giftItem to push',giftItemToPush)
                giftsInWishlist.unshift(giftItemToPush)
            }
            props.updateCartLikes(giftsInWishlist,props?.selection?.selection.loggedIn,true,props.cookieConsent.functional)
        }
    }
    function isLiked(){
        let giftsInWishlist = JSON.parse(JSON.stringify(props.selection.cartItems))
        let cartItems = props.selection?.selection?.selection?.items
        let cartItem = null
        if(Array.isArray(cartItems)){
            cartItem = cartItems.find(item=>{
                if(item.comment){
                    let comment = JSON.parse(item.comment)
                    if( props.jewel==comment.mainJewelProductId &&
                        jewelProduct.product==comment.selectedJewelProductId &&
                        props.item==comment.selectedItem
                    )
                    return true
                } else {
                    return false
                }
            })
        }
        if(!!cartItem){
            //find in wishlist gifts line item
            return giftsInWishlist.findIndex(gift=>gift.line==cartItem.line) > -1
        } else {
            return false
        }
    }
    return(
        <>
        <div onClick={()=>like()} className="like cursorPointer positionRelative">
            <div className="likeButton">
                <div className="icon positionRelative">
                    <img src="/images/favourite.svg" alt='favourite icon' className="likeItem width-100"/>
                    <img src="/images/favourite_black.svg" alt='favourite icon' className={`unlikeItem width-100 ${isLiked()?"fill":""}`}/>
                </div>
            </div>
        </div>
        <style jsx>{`
        .icon{
            width:2.4rem;
            height:2.4rem;
        }
        .likeItem{
            position:absolute;
            top:0;
            width:100%;
            height:100%;
            left:0;
            opacity: 1;
            z-index:9;
        }
        .unlikeItem{
            position:absolute;
            top:0;
            width:100%;
            height:100%;
            left:0;
            opacity: 0;
            z-index:-9;
            transition:all .30s ease-out;
        }
        .unlikeItem.fill{
            transform: translateY(0);
            opacity: 1;
            z-index:9;
        }
        @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
            .icon{
                width:1.6rem;
                height:1.6rem;
            }
        }
        `}</style>
        </>
    )
}
function mapStateToProps({common,selection,cache,personalisation,cookieConsent}){
    return {common,selection,cache,personalisation,cookieConsent}
}
export default connect(mapStateToProps,{updateCartLikes})(LikeGift);