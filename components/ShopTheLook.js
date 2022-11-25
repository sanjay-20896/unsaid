import React from 'react'
import {getPriceBasedOnSelection,formatPrice} from '../functions'
import GridViewProduct from '../components/gridViewProductDynamic'
import {getImageUrl} from "../functions"
import LazyImage from './lazyImage'
import ProductTagging from './productTagging'
import {connect} from 'react-redux'
import {setShopTheLookProducts} from "../redux/actions"
import {MOBILE_BREAKPOINT} from '../config'
import useDevice from '../hooks/useDevice'
import useTranslation from 'next-translate/useTranslation'
function ShopTheLook(props) {
    const {t}=useTranslation('common');
    let shopTheLookPopupData = [];
    for(let i=0;i<props?.shopTheLookItem?.productTaging?.length;i++){
        if(!!props?.shopTheLookItem?.productTaging[i]?.product){
            shopTheLookPopupData.push(props?.shopTheLookItem?.productTaging[i]?.product[0])
        }
    }
    let {deviceName} = useDevice();
    return (
        <>
            <div className={`shopTheLook ${props.shopTheLookId%2==0?"":"rightSide"}`}>
                {!!props?.shopTheLookItem &&
                    <div className="left">
                    <div className="positionRelative">
                        {props?.shopTheLookItem?.image && deviceName!="mobile" &&
                            <LazyImage 
                                alt={"Shop the look"}
                                originalSrc={getImageUrl(props.shopTheLookItem.image)}
                                width={642} 
                                height={727} 
                            />
                        }
                        {props?.shopTheLookItem?.image && deviceName=="mobile" &&
                            <LazyImage 
                                alt={"Shop the look"}
                                originalSrc={getImageUrl(props.shopTheLookItem.image)}
                                width={642} 
                                height={727} 
                            />
                        }
                        {Array.isArray(props?.shopTheLookItem?.productTaging) && props.shopTheLookItem.productTaging.map(product=>{
                            {/* console.log("hotspot module product tagging",product) */}
                            // console.log("single hotspot product",product.textAppearance)
                            if(!!product && !!product?.product)
                            return(
                                <ProductTagging 
                                    width={product.width}
                                    textColorBlack={product.enableTextColor}
                                    key={product._key}
                                    positionFromTop={product.distanceFromTop} 
                                    positionFromLeft={product.distanceFromLeft}
                                    productName={`${product.product[0].name}`}
                                    productPrice={`${product && product.product[0].prices ? getPriceBasedOnSelection(product.product[0],props.selection):"price"}`} 
                                    textAppearance={!!product.textAppearance? product.textAppearance:"right"}
                                    productUri={`${product && product.product[0].uri? product.product[0].uri:"#"}`}
                                />
                            )
                        })}
                        <div onClick={()=>props.setShopTheLookProducts(true,shopTheLookPopupData)} className="shopTheLookButton positionAbsolute cursorPointer">
                            <img src="/images/shopIconBlack.svg" alt="Shop Icon"/>
                            <p className="label font16-notResponsive anoRegular">{t('shopTheLook')}</p>
                        </div>
                    </div>
                    </div>
                }
                <div className={`right ${deviceName=="mobile"?"paddedContent":""}`}>
                    {!!props.productSet && props.productSet.map((product,index)=>{
                        let productPrice=getPriceBasedOnSelection(product,props.selection)
                        return(
                            <>
                                {!product?.empty ? 
                                    <div className="singleProductGrid" key={`singleProductGrid-${product.product}`}>
                                        <GridViewProduct showF1={true} product={product} selectedColor={props.selectedColor} colors={true} colorSize={"2rem"} productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                                    </div>
                                :
                                    <div className="singleProductGrid" key={`singleProductGrid-EMPTY`}></div>
                                }
                            </>
                        )
                    })}
                </div>
            </div>
            <style jsx>{`
                .shopTheLook{
                    display:flex;
                    justify-content:space-between;
                }
                .shopTheLookButton{
                    padding:19.5px 19px;
                    z-index: 2;
                    bottom: 0;
                    left: 0;
                    display:flex;
                    align-item: baseline;
                }
                .shopTheLookButton img{
                    width:1.8rem;
                    height: 2.1rem;
                    margin-right: 1rem;
                }
                .rightSide.shopTheLook{
                    flex-direction: row-reverse;
                }
                .left{
                    width:calc(50% - 1.4rem);
                }
                .right{
                    width:calc(50% - 1.4rem);
                    display:flex;
                    justify-content:space-between;
                    flex-wrap: wrap;
                }
                .singleProductGrid{
                    width: calc(50% - 1.3rem);
                    margin-bottom:4rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .shopTheLook{
                        flex-direction: column-reverse;
                    }
                    .rightSide.shopTheLook{
                        flex-direction: column-reverse;
                    }
                    .left{
                        width:100%;
                        margin-bottom:4.8rem;
                    }
                    .right{
                        width:100%;
                        display:flex;
                        justify-content:space-between;
                        flex-wrap: wrap;
                    }
                }
            `}</style>
        </>   
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setShopTheLookProducts})(ShopTheLook)