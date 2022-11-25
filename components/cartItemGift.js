import {connect} from 'react-redux'
import {MOBILE_BREAKPOINT, TOKEN_VAR_NAME, HIDE_UNDO_MESSAGE_TIMER} from '../config'
import {getProductImage,formatPrice,getObjectToPushToWishlist} from '../functions'
import LazyImage from './lazyImage'
import CartNoteText from './cartNoteText'
import LikeProduct from './likeProduct'
import {tempSaveCartItem, storeSelection, showCart} from '../redux/actions'
import { ECOMMERCE_URI } from '../branch-specific-config'
import {onRemoveSingleItemFromCart} from '../gtmFunctions'
import Link from "next/link"
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from 'next/router'
function cartItemGift(props){
    const {t}=useTranslation('common')
    const router = useRouter()
    let metaData = JSON.parse(props.item.comment)
    let {selectedJewelProductId,boxChoice,cardChoice,noteText,engravingText,selectedItem} = metaData
    // console.log('cart item meta data',metaData)
    // console.log('cache cart item:',props.cache)
    let selectedJewelProduct = props.cache.products[selectedJewelProductId]
    // console.log('selected Jewel Product',selectedJewelProduct)
    let collectionName = !!selectedJewelProduct?selectedJewelProduct.collectionName:""
    let boxProductBundleItem = props.item.bundle.find(it=>it.item==boxChoice)
    let boxProductId = !!boxProductBundleItem?boxProductBundleItem.product:null
    let boxProduct = !!boxProductId?props.cache.products[boxProductId]:null
    let boxProductImage = !!boxProduct?.media?.small?boxProduct?.media?.small[0]:null
    // console.log(boxProductImage)
    let cardProductBundleItem = props.item.bundle.find(it=>it.item==cardChoice)
    let cardProductId = !!cardProductBundleItem?cardProductBundleItem.product:null
    let cardProduct = !!cardProductId?props.cache.products[cardProductId]:null
    let cardProductImage = !!cardProduct?.media?.small?cardProduct?.media?.small[0]:null
    let jewelProduct = !!selectedJewelProductId?props.cache.products[selectedJewelProductId]:null
    let jewelProductImage = getProductImage(jewelProduct,"v1","small")
    let selectedSize = !!jewelProduct?jewelProduct?.items?.find(it=>it.item==selectedItem).name:""
    let productUrl = `/products/${selectedJewelProduct?.uri}/${selectedJewelProduct?.sku}`

    async function deleteGift(){
        props.setLoading(true)
        try {
            let token=localStorage.getItem(TOKEN_VAR_NAME);
            const response=await fetch(`${ECOMMERCE_URI}/lines/${props.item.line}`,{
                method:'DELETE',
                headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type': 'application/json'
                }
            })
            if(response.status==200){
                let selection = await response.json();
                props.tempSaveCartItem([getObjectToPushToWishlist(props.item)])
                props.storeSelection(selection);
                props.setLoading(false)
                onRemoveSingleItemFromCart(props.item,props.cache,props.selection)
            } else {
                props.setLoading(false)
            }
            props.setUndoMessage(t('itemDeleted'))
            props.deleteButtonClicked();
            // setTimeout(()=>{
            //     props.setUndoMessage("")
            // },HIDE_UNDO_MESSAGE_TIMER)
        } catch(err) {
            props.setLoading(false)
        }
    }
    return (
        <>
            <div className="giftBoxSection" key={props.item.item}>
                <div className="mainHeadingSection">
                    {router.locale==="fr" && <div className="giftBoxSectionHeading font20 anoRegular">{t('your')} {t('giftBox')} {collectionName}</div>}
                    {router.locale==="en" && <div className="giftBoxSectionHeading font20 anoRegular">{t('your')} {collectionName} {t('giftBox')}</div>}
                    {!props.hideEdit && !!jewelProduct &&
                        // <div onClick={()=>!!props.setEditItem && props.setEditItem(props.item)} className="font16 anoRegular inlineBlock underlineLR active">Edit</div>
                        <div className="cartItemActions">
                            <div className="cartItemAction likeAction cursorPointer">
                                    <LikeProduct product={jewelProduct} noPadding={false} customPaddingLeft="0.8rem" customPaddingRight="0.8rem" customPaddingLeftMobile="0.8rem" customPaddingRightMobile="0.8rem" />
                            </div>
                            <div className="cartItemAction editAction cursorPointer" onClick={()=>!!props.setEditItem && props.setEditItem(props.item)}>
                                <img src="/images/edit.svg" className="editImg" width="100" height="100" />
                            </div>
                            <div className="cartItemAction trashAction cursorPointer" onClick={()=>deleteGift()}>
                                <img src="/images/trash.png" className="trashImg" width="100" height="100" />
                            </div>
                        </div>
                    }
                </div>
                {!!jewelProduct &&
                    <div className="giftRow jewel">         
                        {!!jewelProductImage &&
                            <div className="giftRowLeft">
                                <Link href={productUrl}><a onClick={()=>props.showCart(false)}>
                                    <LazyImage
                                        alt="Jewel"
                                        originalSrc={jewelProductImage}
                                        width={400}
                                        height={400}
                                    />
                                </a></Link>
                            </div>
                        }
                        <div className="giftRowRight anoRegular font16">
                            <Link href={productUrl}><a onClick={()=>props.showCart(false)}>
                                <div>
                                    <h4>{jewelProduct.name}</h4>
                                    <h4 className="grey">{selectedSize?`${selectedSize}`:""}{jewelProduct?.color?.color_text?`${selectedSize?", ":""}${jewelProduct.color.color_text}`:""}{jewelProduct?.cord_color?.text?`${selectedSize || jewelProduct?.color?.color_text?", ":""}${jewelProduct.cord_color.text} cord`:""}</h4>
                                    {!!engravingText &&
                                        <h4 className="grey">{`"${engravingText}"`}</h4>
                                    }
                                    {!!jewelProduct.number_of_diamonds_text &&
                                        <h4 className="grey ">{`${jewelProduct.number_of_diamonds_text} ${jewelProduct.number_of_diamonds_text=="1"?"diamond":"diamonds"}`}</h4>
                                    }
                                </div>
                                <h4 className="includeLabel grey alignRight">{props.item.quantity > 1?`${props.item.quantity} x `:""}{formatPrice(props.item.priceEach)}</h4>
                            </a></Link>
                        </div>
                    </div>
                }
                {!!boxProduct &&
                    <div className="giftRow box">
                        {!!boxProductImage &&
                            <div className="giftRowLeft">
                                <LazyImage
                                    alt="Box"
                                    originalSrc={boxProductImage}
                                    width={308}
                                    height={323}
                                />
                            </div>
                        }
                        <div className="giftRowRight anoRegular font16">
                            <div>
                                <h4 className="boxHeading">{boxProduct.name}</h4>
                                {!!boxProduct.excerpt &&
                                    <h4 className="grey">{boxProduct.excerpt}</h4>
                                }
                            </div>
                        </div>
                    </div>
                }
                {!!cardProduct &&
                    <div className="giftRow postCard">
                        {!!cardProductImage &&
                            <div className="giftRowLeft">
                                <div className="postCardImage">
                                    <LazyImage
                                        alt="Postcard"
                                        originalSrc={cardProductImage}
                                        width={276}
                                        height={400}
                                    />
                                </div>
                            </div>
                        }
                        <div className="giftRowRight anoRegular font16">
                            <div>
                                <h4>{cardProduct.name}</h4>
                                {!!cardProduct.excerpt &&
                                    <h4 className="grey">{cardProduct.excerpt}</h4>
                                }
                                {!!noteText &&
                                    <h4 className="grey noteTextInCart"><CartNoteText noteText={noteText} readMore={false} /></h4>
                                }
                            </div>
                        </div>
                    </div>
                }                
                {!props.hideTotal &&
                    <div className="totalPrice anoRegular">
                        <div className="font16">{t('total')}</div>
                        <div className="font20">{formatPrice(props.item.totalPrice)}</div>
                    </div>
                }
            </div>
            <style jsx>{`
                .cartItemAction:not(.likeAction){
                    padding-left: 0.8rem;
                    padding-right: 0.8rem;
                }
                .likeAction{
                    margin-top: -1rem;
                    //margin-right: -0.8rem;
                }
                .cartItemActions{
                    margin-right:-0.8rem;
                }
                .editImg{
                    width:22px;
                    height:22px;
                }
                .trashImg{
                    width:22px;
                    height:22px;
                }
                .cartItemActions{
                    display:flex;
                }
                .boxHeading{
                    margin-top: 1rem;
                }
                .postCardImage{
                    box-shadow: 1px 1px 4px #acacac;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    width: 65%;
                }
                .mainHeadingSection{
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:3.2rem;
                    overflow:hidden;
                }
                .noteTextInCart{
                    overflow-wrap: anywhere;
                    white-space: pre-wrap;
                }
                .giftRow{
                    display:flex;
                    margin-bottom:3.2rem;
                }
                .giftRow.box{
                    margin-top:-1.2rem;
                }
                .giftRowRight{
                    width:79%;
                    padding-left:2.4rem;
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                }
                .giftRowLeft{
                    width:25%;
                }
                .includeLabel.card{
                    margin-bottom:2.4rem;
                }
                .giftRowRight h4{
                    margin-bottom:0.8rem;
                }
                .giftRowRight .includeLabel, .includeLabel.giftBoxLevel{
                    margin-bottom:0rem;
                }
                .addProduct{
                    display:flex;
                    cursor:pointer;
                    margin-bottom:3.2rem;
                }
                .addProduct img{
                    margin-right:0.8rem;
                }
                .totalPrice{
                    display:flex;
                    justify-content:space-between;
                    margin-top:2.4rem;
                    margin-bottom:3.2rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .mainHeadingSection{
                        margin-bottom:3.6rem;
                    }
                    .giftRowRight{
                        width:76%;
                        padding-left:1.6rem;
                    }
                    .giftRowLeft{
                        width:25%;
                    }
                    .totalPrice{
                        margin-bottom:2.4rem;
                    }
                    .editImg{
                        width:14px;
                        height:14px;
                    }
                    .trashImg{
                        width:14px;
                        height:14px;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({gifting,cache}){
    return {gifting,cache}
}
export default connect(mapStateToProps,{showCart,tempSaveCartItem,storeSelection})(cartItemGift)