import {useState} from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import {connect} from 'react-redux'
import {updateCartLikes,addBundleToCart} from '../redux/actions'
import {getPriceBasedOnSelection,getProductImage} from '../functions'
import {onAddWishlistGiftToCart} from '../gtmFunctions'
import useTranslation from 'next-translate/useTranslation'

function LikedGift(props){
    const {t}=useTranslation('common');
    const [noteTextExpand, setNoteTextExpand] = useState(false)
    // console.log("single gift item",props.giftItem)
    // console.log("single gift item",props.giftItem.bundleId)
    let metaData = JSON.parse(props.giftItem.comment)
    let {selectedJewelProductId,boxChoice,cardChoice,noteText,engravingText,selectedItem} = metaData
    let selectedJewelProduct = props.cache.products[selectedJewelProductId]
    let collectionName = !!selectedJewelProduct?selectedJewelProduct.collectionName:""
    // let boxProductBundleItem = props.giftItem.bundle.find(it=>it.item==boxChoice)
    // let boxProductId = !!boxProductBundleItem?boxProductBundleItem.product:null
    // console.log('box Product Id',boxProductId)
    let boxProductId = boxChoice.split("-")[0]
    let boxProduct = !!boxProductId?props.cache.products[boxProductId]:null
    let boxProductImage = !!boxProduct?boxProduct?.media?.small[0]:null
    // let cardProductBundleItem = props.giftItem.bundle.find(it=>it.item==cardChoice)
    // let cardProductId = !!cardProductBundleItem?cardProductBundleItem.product:null
    let cardProductId = cardChoice.split("-")[0]
    let cardProduct = !!cardProductId?props.cache.products[cardProductId]:null
    let cardProductImage = !!cardProduct?cardProduct?.media?.small[0]:null
    let jewelProduct = !!selectedJewelProductId?props.cache.products[selectedJewelProductId]:null
    let jewelProductImage = getProductImage(jewelProduct,"v1","medium")
    let selectedSize = !!jewelProduct?jewelProduct?.items?.find(it=>it.item==selectedItem).name:""
    // console.log('selected jewel product wishlist',selectedJewelProduct)
    let noteLength;
    if(noteTextExpand){
        noteLength=noteText.length
    } else {
        noteLength=45;
    }
    async function deleteItem(giftItem){    
        let giftItems=JSON.parse(JSON.stringify(props.selection.cartItems))
        giftItems = giftItems.filter(gift=>gift.line!=giftItem.line)
        props.updateCartLikes(giftItems,props?.selection?.selection?.loggedIn,false,props.cookieConsent.functional);
    }
    function addBundleToCart(giftItem){
        // console.log("single giftItem",giftItem)
       
        let metaData = JSON.parse(giftItem.comment)
        // console.log("metadata",metaData)
        let {boxChoice,cardChoice,selectedItem} = metaData
        let giftBoxSection = props.gifting.bundle[giftItem.bundleId].bundleInfo.bundle.bundleInfo.sections[0]
        let postCardSection = props.gifting.bundle[giftItem.bundleId].bundleInfo.bundle.bundleInfo.sections[1]
        let jewelSection =  props.gifting.bundle[giftItem.bundleId].bundleInfo.bundle.bundleInfo.sections[2]
        let comment = giftItem.comment
        let reqBody = {
            item:giftItem.item,
            comment:comment,
            sections:[
                {
                    section: giftBoxSection.section,
                    item: boxChoice
                },
                {
                    section: postCardSection.section,
                    item: cardChoice
                },
                {
                    section: jewelSection.section,
                    item: selectedItem
                }
            ]
        }
        
        props.addBundleToCart(giftItem.item,reqBody,(bool)=>{
            if(bool){
                // console.log('add to cart success')
                deleteItem(giftItem)
                onAddWishlistGiftToCart(giftItem,props.cache,props.selection)
            } else {
                // console.log('add to cart fail')
            }
        })
    }
    return (
        <>
            <div>
                <div className="giftingDetails">
                    <div className="giftBox">
                        <img className="width-100" src={boxProductImage} />
                        <div className="anoRegular font16">{boxProduct?.name}</div>
                    </div>
                    <div className="giftCard">
                        <img className="width-100" src={cardProductImage} />
                        <div className="anoRegular font16">{cardProduct?.name}</div>
                    </div>
                </div> 
                {!!noteText &&
                    <div className="noteSection anoRegular font16">
                        <div className="noteLabel">{t('note')}</div>
                        <div className="noteContent grey cursorPointer" onClick={()=>setNoteTextExpand(!noteTextExpand)}>“{noteText.substring(0,noteLength)}{!noteTextExpand?"...":""}”</div>
                    </div>
                }
                <div className="productsHavingGiftBox">
                    <div className="productHavingGiftBox anoRegular font16">
                        {!!jewelProductImage && <div>
                            <img className="width-100" src={jewelProductImage} />
                            <div>{selectedJewelProduct?.name}</div>
                            <div className="grey">{selectedJewelProduct?.prices?getPriceBasedOnSelection(selectedJewelProduct,props.selection):selectedJewelProduct?.price}</div>
                            <div className="grey">{engravingText}</div>
                            </div>
                        }
                    </div>  
                </div>
                <button className="btn btnSecondary addToCart anoRegular font20" onClick={()=>{addBundleToCart(props.giftItem)}}>{selectedJewelProduct?.prices?getPriceBasedOnSelection(selectedJewelProduct,props.selection):selectedJewelProduct?.price} – {t('addGiftToCart')}</button>
                <div className="alignCenter"><div className="deleteGift anoRegular font16 underlineLR active" onClick={()=>deleteItem(props.giftItem)}>{t('deleteGift')}</div></div>
            </div>
            <style jsx>{`
                .addToCart{
                    width:100%;
                    margin-bottom:3.2rem;
                }
                .giftingDetails{
                    display:flex;
                    margin-right:-24.5px;
                    margin-bottom:4.8rem;
                }
                .giftBox, .giftCard{
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                }
                .giftBox, .giftCard, .productHavingGiftBox{
                    width:50%;
                    padding-right:24.5px;
                }
                .giftBox img, .giftCard img, .noteLabel{
                    margin-bottom:0.8rem;
                }
                .noteSection{
                    margin-bottom:4.8rem;
                } 
                .productHavingGiftBox{
                    margin-bottom:4.8rem;
                }
                .productHavingGiftBox  div {
                    margin-bottom: 0.8rem;
                }
                .productHavingGiftBox > *{
                    margin-bottom:0.8rem;
                } 
                .deleteGift{
                    // margin-bottom:4.8rem;
                    display:inline-block;
                    cursor:pointer;
                }  
                .singleGiftingProduct{
                    border-bottom:1px solid #787878;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .giftingDetails{
                        margin-right:-24px;
                        margin-bottom:3.2rem;
                    }
                    .giftBox, .giftCard, .productHavingGiftBox{
                        padding-right:24px;
                    } 
                    .productHavingGiftBox{
                        margin-bottom:3.2rem;
                    }
                    .noteSection{
                        margin-bottom:3.2rem;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection,cache,gifting,cookieConsent}){
    return {selection,cache,gifting,cookieConsent}
}
export default connect(mapStateToProps,{addBundleToCart,updateCartLikes})(LikedGift)