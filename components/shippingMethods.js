import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import { MEDIUM_BREAKPOINT } from '../config'
import {changeShippingMethod} from '../redux/actions'
import Payment from './payment'
import useTranslation from 'next-translate/useTranslation'
function ShippingMethods(props){
    const {t}=useTranslation('common');
    const [backupShippingAddressValues,setBackupShippingAddressValues] = useState({})
    function shippingMethodSelect(shippingMethod){
        //if store pick up
        //back up existing country, state, city and zipcode
        //change shipping address values to belgium, antwerp,
        //else
        //change country, state, city and zipcode to backup values
        if(props?.selection?.selection?.selection?.shippingMethod!=shippingMethod){
            props.changeShippingMethod(shippingMethod)
        }
    }
    function proceedToPayment(){
        if(props?.selection?.selection?.selection?.shippingMethod)
            props.next()
    }
    return (
        <>
            {!props?.selection?.selection?.location?.shipTo?
                <div className="error">{t('sorryDontShipToYourLocation')}</div>
                :
                <div className="alignLeft">
                    <div className="shippingMethods">
                        {props?.selection?.selection?.shippingMethods.map(method=>{
                            return (
                                <div key={method.shippingMethod} className="shippingMethod font16 cursorPointer" onClick={(e)=>shippingMethodSelect(method.shippingMethod)}>
                                    <input type="radio" value={method.shippingMethod} checked={props?.selection?.selection?.selection?.shippingMethod == method.shippingMethod}  className="verticalAlignTop" /> {method.name}
                                    {(method.shippingMethod=="store-pickup-antwerp-usd" || method.shippingMethod=="store-pickup-antwerp-eur" || method.shippingMethod=="store-pickup-antwerp-gbp") &&
                                        <div className="pickupAddress">
                                            De Burburestraat 20<br />
                                            2000 Antwerpen, Belgium     
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <Payment 
                        frontendURI={props.frontendURI} 
                        addressValidationError={props.addressValidationError} 
                        sameBillingAddress={props.sameBillingAddress} 
                        billingAddressValues={props.billingAddressValues} 
                        shippingAddressValues={props.shippingAddressValues} 
                    />
                    <div className="paymentIconsWrapper">
                        <div className="paymentIcons">
                            <img src="/images/payment_icons/visa.webp" />
                            <img src="/images/payment_icons/mastercard.webp" />
                            <img src="/images/payment_icons/paypal.webp" />
                            <img src="/images/payment_icons/ax.webp" />
                            <img src="/images/payment_icons/gpay.webp" />
                            <img src="/images/payment_icons/applepay.webp" />
                        </div>
                    </div>
                    {/* <button className={`btn submit ${props?.selection?.selection?.selection?.shippingMethod?"btnPrimary":"btnInactive"} white anoRegular font16-notResponsive cursorPointer`} onClick={()=>proceedToPayment()}>Next</button> */}
                </div>
            }
            <style jsx>{`
                .paymentIconsWrapper{
                    margin-top:1.8rem;
                    margin-left:1rem;
                }
                .paymentIcons img:not(:last-child){
                    margin-right:0.25rem;
                }
                .paymentIcons img{
                    width:4rem;
                }
                .pickupAddress{
                    margin-top: 0.75rem;
                    margin-left: 2.5rem;
                }
                .submit{
                    margin-top:2.8rem;
                    min-width:15rem; 
                }
                .shippingMethod{
                    margin-bottom:1rem;
                }
                @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .paymentIcons img{
                        width:3.5rem;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,{changeShippingMethod})(ShippingMethods)