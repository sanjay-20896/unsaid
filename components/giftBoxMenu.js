import { MOBILE_BREAKPOINT } from "../config"
import {connect} from 'react-redux'
import {getProductImage,removeDecimalZeros} from '../functions'
import useTranslation from 'next-translate/useTranslation'

function GiftBoxMenu(props){
    const {t}=useTranslation('common');

    return (
        <>
            {props.order.items.map(giftItem=>{
                if(giftItem.bundle){
                    let metaData = JSON.parse(giftItem.comment)
                    let {selectedJewelProductId,boxChoice,cardChoice,noteText,engravingText,selectedItem} = metaData
                    let selectedJewelProduct = props.cache.products[selectedJewelProductId]
                    let collectionName = !!selectedJewelProduct?selectedJewelProduct.collectionName:""
                    let boxProductBundleItem = giftItem.bundle.find(it=>it.item==boxChoice)
                    let boxProductId = !!boxProductBundleItem?boxProductBundleItem.product:null
                    let boxProduct = !!boxProductId?props.cache.products[boxProductId]:null
                    let boxProductImage = !!boxProduct?boxProduct?.media?.small[0]:null
                    let cardProductBundleItem = giftItem.bundle.find(it=>it.item==cardChoice)
                    let cardProductId = !!cardProductBundleItem?cardProductBundleItem.product:null
                    let cardProduct = !!cardProductId?props.cache.products[cardProductId]:null
                    let cardProductImage = !!cardProduct?cardProduct?.media?.small[0]:null
                    let jewelProduct = !!selectedJewelProductId?props.cache.products[selectedJewelProductId]:null
                    // let jewelProductImage = !!jewelProduct?jewelProduct?.media?.small[0]:null
                    //console.log("selected Jewel Product",jewelProduct)
                    let jewelProductImage = getProductImage(jewelProduct,"v1","small")
                    let selectedSize = !!jewelProduct?jewelProduct?.items?.find(it=>it.item==selectedItem).name:""
                    return (
                        <div className="giftBoxSection">
                            <div style={{animationDelay:"0.4s"}} className="mb24  font16-notResponsive anoRegular">{t('your')} {collectionName} {t('giftBox')}</div>
                            <div style={{animationDelay:"0.5s"}} className="mb24 giftBox  one">
                                <div className="giftBoxLeft">
                                    <img className="width-100" src={boxProductImage}/>
                                </div>
                                <div className="giftBoxRight anoRegular">
                                    <h4>{boxProduct?.name}</h4>
                                    {/* <h4 className="grey">Daniel Baretto</h4> */}
                                    <h4 className="includeLabel grey alignRight">{t('included')}</h4>
                                </div>
                            </div>
                            <div style={{animationDelay:"0.6s"}} className="mb24 giftBox giftCard ">
                                <div className="giftBoxLeft"><img className="width-100" src={cardProductImage}/></div>
                                <div className="giftBoxRight anoRegular">
                                    <h4>{t('card')}</h4>
                                    <h4 className="grey">{cardProduct?.name}</h4>
                                    {!!noteText &&
                                        <h4 className="grey">{noteText}</h4>
                                    }
                                    <h4 className="includeLabel grey alignRight">{t('included')}</h4>
                                </div>
                            </div>
                            <div style={{animationDelay:"0.7s"}} className="mb24 giftBox product ">
                                <div className="giftBoxLeft">
                                    <img className="width-100" src={jewelProductImage}/>
                                </div>
                                <div className="giftBoxRight anoRegular">
                                    <h4>{selectedJewelProduct?.name}</h4>
                                    <h4 className="grey">{t('size')} {selectedSize}{selectedJewelProduct?.color?.color_text?`, ${selectedJewelProduct.color.color_text}`:""}{selectedJewelProduct?.cord_color?.text?`, ${selectedJewelProduct.cord_color.text}`:""}</h4>
                                    {!!engravingText &&
                                        <h4 className="grey">{engravingText}</h4>
                                    }
                                    <h4 className="includeLabel price grey alignRight">{removeDecimalZeros(giftItem.totalPrice)}</h4>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            <style jsx>{`
                .mb24{
                    margin-bottom:2.4rem;
                }
                .giftBoxLeft{
                    width:23%;
                    padding-right:1.6rem;
                }
                .giftBox{
                    display:flex;
                }
                .giftBoxRight{
                    width:76%;
                }
                .giftBoxRight h4{
                    margin-bottom:0.8rem;
                }
                .giftBoxRight .includeLabel{
                    margin-bottom:0rem;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .giftBoxRight{
                        width:70%;
                    }
                    .giftBoxLeft{
                        width:30%;
                    }
                    
                }
            `}</style>
        </>
    )
}
function mapStateToProps({cache}){
    return {cache}
}
export default connect(mapStateToProps,null)(GiftBoxMenu)