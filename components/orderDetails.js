import {connect} from 'react-redux'
import {MOBILE_BREAKPOINT} from '../config'
import CartItemGift from './cartItemGift'
import Promotions from './promotions'
import Totals from './totals'
import Expandable2 from './expandable2'
import { useEffect, useState } from 'react'
import YourOrderMobile from './yourOrderMobile'
import CheckoutIcons from './checkoutIcons'
import Assistance from './assistance'
import useTranslation from 'next-translate/useTranslation'
function OrderDetails(props){
    const {t}=useTranslation('common');
    let cartItems = props.selection?.selection?.selection?.items
    const [yourOrderExpanded,setYourOrderExpanded] = useState(false)
    const [promotionsExpanded,setPromotionsExpanded] = useState(false)
    function yourOrderClick(bool){
        setYourOrderExpanded(bool)
    }
    function promotionsClick(bool){
        setPromotionsExpanded(bool)
    }
    return (
        <div className="orderDetailsWrapper">
            <div className="hideForMobile">
                <div className="greyBg padded">
                    <div className="details">
                        <div className="orderHeading anoRegular font20 positionRelative">{t('yourOrder')}</div>
                        <div className="applyCodeDropDownMobile top anoRegular font20 positionRelative">{t('applyCode')}</div>
                        <div className="yourOrderDetails">
                            <Promotions />
                            <Totals totals={props?.selection?.selection?.selection?.totals} shippingLocation={props?.selection?.selection?.location?.name} discounts={props?.selection?.selection?.selection?.discounts}/>
                            <div className="giftingDetails">
                                {Array.isArray(cartItems) && cartItems.map((item,index)=>{
                                    // console.log("single item",item,index)
                                    if(!!item.bundle)
                                        return(
                                            <div className="cartItem">
                                                <CartItemGift item={item} hideEdit={true} hideTotal={true}/>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="greyBg">
                    <div className="assistance">
                        <Assistance />
                    </div>
                    <CheckoutIcons />
                </div>
            </div>
            <div className="showForMobile mobileWrapper">
                <div className="yourOrderMobile">
                    <Expandable2 headingFont="anoRegular" headingSmallMobile={true} borderBottom={true} expand={yourOrderExpanded} setExpand={(bool)=>yourOrderClick(bool)} heading={t('yourOrder')} heading2={props?.selection?.selection?.selection?.totals?.grandTotalPriceAsNumber?`${props.selection.selection.selection.totals.grandTotalPrice.substring(0,1)}${props.selection.selection.selection.totals.grandTotalPriceAsNumber.toFixed(2)}`:""} content={<YourOrderMobile />} />
                </div>
                <div className="promotionsMobile">
                    <Expandable2 headingFont="anoRegular" headingSmallMobile={true} borderBottom={true} expand={promotionsExpanded} setExpand={(bool)=>promotionsClick(bool)} heading={t('applyCode')} heading2={props?.selection?.selection?.selection?.totals?.totalDiscountPriceAsNumber?`${props.selection.selection.selection.totals.totalDiscountPrice.substring(0,1)}${props.selection.selection.selection.totals.totalDiscountPriceAsNumber}`:""} content={<Promotions />} />
                </div>
            </div>
            {/* <div className="applyCodeDropDownMobile bottom anoRegular font20 positionRelative">Apply code</div> */}
            <style jsx>{`
                .mobileWrapper{
                    background: #f5f5f5;
                    padding:1rem 5% 2rem 5%;
                }
                .promotionsMobile{

                }
                .padded{
                    padding-left: 5%;
                    padding-right: 5%; 
                }
                .details{
                    padding-top:4.8rem;
                }
                .applyCodeDropDownMobile{
                    display:none;
                }
                .orderHeading span{
                    display:none;
                }
                .orderHeading{
                    margin-bottom:4.8rem;
                }
                .cartItem{
                    background:#ffffff;
                    padding:2rem 5%;
                    margin-bottom: 4.8rem;
                }
                .giftingDetails .cartItem:last-child{
                    margin-bottom: 0;
                }
                .assistance{
                    padding-top:2.5rem;
                    padding-bottom:3.3rem;
                    padding-left: 5%;
                    padding-right: 5%; 
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .orderHeading,.applyCodeDropDownMobile{
                        margin-bottom:0rem;
                        padding:2.4rem 0;
                    }
                    .applyCodeDropDownMobile{
                        margin-bottom:6.4rem;
                        display:block;
                        border-bottom:1px solid #787878;
                    }
                    .showingApplyCode .applyCodeDropDownMobile{
                        margin-bottom:0rem;
                    }
                    .orderHeading::after, .applyCodeDropDownMobile::after{
                        content: '';
                        position: absolute;
                        background: black;
                        width: 1px;
                        height: 16px;
                        top: 50%;
                        right: 8px;
                        transform: translate(0px, -50%) rotate(0deg);
                        transition:all 0.3s ease-out;
                    }
                    .orderHeading::before, .applyCodeDropDownMobile::before{
                        content: '';
                        position: absolute;
                        background: black;
                        width: 1px;
                        height: 16px;
                        top: 50%;
                        right: 8px;
                        opacity:1;
                        transform: translate(0px, -50%) rotate(90deg);
                        transition:all 0.3s ease-out;
                    }
                    .orderHeading span{
                        display:inline-block;
                    }
                    .yourOrderDetails{
                        height:0;
                        overflow:hidden;
                    }
                    .showingYourOrder .yourOrderDetails, .showingApplyCode .yourOrderDetails{
                        height:auto;
                    }
                    .showingApplyCode .applyCodeDropDownMobile.top, .showingYourOrder .applyCodeDropDownMobile.bottom{
                        display:block;
                    }
                    .applyCodeDropDownMobile.bottom, .showingYourOrder .applyCodeDropDownMobile.top{
                        display:none;
                    }
                    .orderHeading{
                        border-bottom:1px solid #787878;
                    }
                    .showingYourOrder .orderHeading, .showingApplyCode .applyCodeDropDownMobile{
                        border-bottom:none;
                    }
                    .showingApplyCode .giftingDetails{
                        display:none;
                    }
                    .showingYourOrder .orderHeading::after, .showingApplyCode .applyCodeDropDownMobile::after{
                        transform: translate(0px, -50%) rotate(90deg);
                    }
                    .showingYourOrder .orderHeading::before, .showingApplyCode .applyCodeDropDownMobile::before{
                        opacity:0;
                    }
                    .showingYourOrder .totalDetails{
                        padding:1.6rem 0 5.6rem;
                        border-bottom:none;
                        margin-bottom:0;
                    }
                    .showingApplyCode .totalDetails{
                        border-bottom:1px solid #787878;
                        margin-bottom:6.4rem;
                    }
                }
            `}</style>
        </div>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,null)(OrderDetails)