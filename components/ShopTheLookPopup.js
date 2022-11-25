import {connect} from 'react-redux'
import {setShopTheLookProducts} from "../redux/actions"
import {getPriceBasedOnSelection,formatPrice} from "../functions"
import SimpleProductView from './SimpleProductView';
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'
function ShopTheLookPopup(props) {
    const {t}=useTranslation('common');
    return (
        <>
            <div className="shopPopupWrapper">
                <div className="topNavContainer paddedContent">
                    <div className="topNav positionRelative">
                        <h2 className="navHeading font24 canelaThin">{t('shopTheLook')}</h2>
                        <img className="showForMobile logoMobile" src="/images/mobileLogoDark.svg"/>
                        <div onClick={()=>props.setShopTheLookProducts(false,props.common.shopTheLookProducts)} className="cursorPointer"><img src="/images/cross.svg" alt="Cross"/></div>
                    </div>
                </div>
                <div className="productContainer">
                    <div className="gridView paddedContent">
                        {!!props.common.shopTheLookProducts && props.common.shopTheLookProducts.map((product,index)=>{
                            let productPrice=getPriceBasedOnSelection(product,props.selection)
                            return(
                                <>
                                    <div className="singleProductGrid" key={`singleProductGrid-${product.product}`}>
                                        <SimpleProductView showF1={true} product={product} selectedColor={null} colors={true} colorSize={"2rem"} productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .shopPopupWrapper{
                    width: 54.9rem;
                    background:#FFFFFF;
                    height: 100%;
                }
                .singleProductGrid{
                    width: calc(50% - 12.5px);
                    margin-bottom: 2.4rem;
                }
                .gridView{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content:space-between;
                    padding-top:4.8rem;
                }
                .productContainer{
                    overflow-y: scroll;
                    height: calc(100% - 81px);
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .productContainer::-webkit-scrollbar {
                    display: none;
                }
                .topNav{
                    padding: 2.4rem 0;
                    border-bottom: 1px solid #787878;
                }
                .topNav div{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    padding: 2rem;
                    right:-1.2rem;
                    width:1.6rem;
                    height:1.6rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .shopPopupWrapper{
                        width: 100%;
                    }
                    .logoMobile{
                        width: 10.4px;
                        display: inline-block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .topNav{
                        padding: 1.55rem 0;
                    }
                    .topNavContainer{
                        padding: 0 3.6rem;
                    }
                    .gridView{
                        padding-top:4.2rem;
                    }
                    .productContainer{
                        height: calc(100% - 56px);
                    }
                    .singleProductGrid{
                        width: calc(50% - 10.5px);
                        margin-bottom: 3.6rem;
                    }
                }
            `}</style>
        </>   
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setShopTheLookProducts})(ShopTheLookPopup)