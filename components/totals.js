import { MOBILE_BREAKPOINT } from "../config"
import {removeDecimalZeros,formatMoney} from '../functions'
import useTranslation from 'next-translate/useTranslation'
export default function Totals(props){
    const {t}=useTranslation('common');
    let subTotal=props.totals?.itemsTotalPriceAsNumber 
    return (
        <>
            <div className="subTotalDetails anoRegular font16">
                <div className="headingAndValue">
                    <div className="leftLabel">{t('subtotal')}</div>
                    <div className="rightLabel">{`${props.totals?.grandTotalPrice?.substring(0,1)}${subTotal}`}</div>
                </div>
                {/* <div className="headingAndValue grey">
                    <div className="leftLabel">VAT {props.totals?.taxPercent} %</div>
                    <div className="rightLabel">{`${props.totals?.grandTotalPrice?.substring(0,1)}${removeDecimalZeros(props.totals?.grandTotalPriceTaxAsNumber.toFixed(2))}`}</div>
                </div> */}
                {props.discounts?.vouchers?.map(voucher=>{
                    return (
                        <>
                            {!voucher.voucher.startsWith("GC") && 
                            <div className="headingAndValue grey">
                                <div className="leftLabel">{t('discount')}</div>
                                <div className="rightLabel">{voucher.priceOff.substring(0,1)}{removeDecimalZeros(voucher.priceOffAsNumber.toFixed(2))}</div>
                            </div>}
                            {voucher.voucher.startsWith("GC") && 
                            <div className="headingAndValue grey">
                                <div className="leftLabel">{t('giftCard')}</div>
                                <div className="rightLabel">{voucher.priceOff.substring(0,1)}{removeDecimalZeros(voucher.priceOffAsNumber.toFixed(2))}</div>
                            </div>}
                        </>
                    )
                })}
                <div className="headingAndValue">
                    <div className="leftLabel">{t('shipping')} {props.shippingLocation?`${t('tovers')} ${props.shippingLocation}`:""}</div>
                    <div className="rightLabel">{props.totals?.shippingPriceAsNumber==0?t('free'):props.totals?.shippingPrice}</div>
                </div>
            </div>
            <div className="totalDetails anoRegular">
                <div className="headingAndValue">
                    <div className="leftLabel font16">{t('total')}</div>
                    <div className="rightLabel font20">{`${props.totals?.grandTotalPrice?.split(".")[0]}`}</div>
                </div>
            </div>
            <style jsx>{`
                .subTotalDetails{
                    border-bottom:1px solid #787878;
                }
                .totalDetails{
                    padding:2.4rem 0 5.2rem;
                    border-bottom:1px solid #787878;
                    margin-bottom: 3.2rem;
                }
                .totalDetails .headingAndValue{
                    margin-bottom:0rem;
                }
                .headingAndValue{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:2.4rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .headingAndValue{
                        margin-bottom:1.6rem;
                    }
                    .totalDetails{
                        padding:2.4rem 0 2.4rem;
                    }
                }
            `}</style>
        </>
    )
}