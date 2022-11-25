import {updateLikes,addProductsToCache }from '../redux/actions'
import {getNestedObject} from '../functions'
import {connect} from 'react-redux'
import {UNSAID_API,TOKEN_VAR_NAME,MOBILE_BREAKPOINT, LOCAL_LIKES_VAR_NAME} from '../config'
import {onAddToWishlist,onRemoveFromWishlist} from '../gtmFunctions'
function Like(props){
    async function like(){
        let {product} = props;
        // console.log('like component',product)
        let id = product.product
        let likesArray=JSON.parse(JSON.stringify(props.selection.likesArray))
        let index=likesArray.findIndex((productId)=>{
            return productId==id
        })
        if(index>-1){
            likesArray.splice(index,1)
            onRemoveFromWishlist(product,props.selection)
        } else {
            likesArray.push(id)
            onAddToWishlist(product,props.selection)
        }
        props.updateLikes(likesArray,props.selection.selection.loggedIn,true,props.cookieConsent.functional)
        props.addProductsToCache([props.product])
    }
    function isLiked(){
        let {selection,product} = props
        let id = product.product
        return Array.isArray(selection.likesArray) ? selection.likesArray.findIndex(productId=> productId == id) > -1 :false
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
            .like{
                padding-top: ${props.noPadding?"0":"1rem"};
                padding-bottom: ${props.noPadding?"0":"1rem"};
                padding-left: ${props.noPadding?props.customPaddingLeft?props.customPaddingLeft:"0":"1rem"};
                padding-right: ${props.noPadding?props.customPaddingRight?props.customPaddingRight:"0":"1rem"};
            }
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
            }
            .unlikeItem.fill{
                transform: translateY(0);
                opacity: 1;
                z-index:9;
            }
            .like:hover .unlikeItem{
                opacity: 1;
                z-index: 9;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .icon{
                    width:1.6rem;
                    height:1.6rem;
                }
                .like{
                    padding-top: ${props.noPadding?"0":"1rem"};
                    padding-bottom: ${props.noPadding?"0":"1rem"};
                    padding-left: ${props.noPadding?"0":props.customPaddingLeftMobile?props.customPaddingLeftMobile:"1rem"};
                    padding-left: ${props.noPadding?"0":props.customPaddingRightMobile?props.customPaddingRightMobile:"1rem"};
                }
                .like:hover .unlikeItem{
                    opacity: 0;
                }
                .like:hover .unlikeItem.fill{
                    opacity: 1;
                }
            }
        `}</style>
        </>
    )
}
function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}
export default connect(mapStateToProps,{updateLikes,addProductsToCache})(Like);