import React, { useEffect } from 'react'
import PaypalExpress from '../components/PaypalExpress'
import StripeCustom from '../components/stripeCustom'
import GooglePay from './GooglePay'
import {connect} from 'react-redux'
import {fbProceedToPayment} from '../gtmFunctions'
function AllPaymentMethods(props) {
  useEffect(()=>{
    fbProceedToPayment(props.selection)
  },[])
 return (
    <>
        <PaypalExpress shippingAddressValues={props.shippingAddressValues} billingAddressValues={props.billingAddressValues} sameBillingAddress={props.sameBillingAddress}/>
        {/* <GooglePay/> */}
        <StripeCustom shippingAddressValues={props.shippingAddressValues} billingAddressValues={props.billingAddressValues} sameBillingAddress={props.sameBillingAddress} />
    </>
  )
}
function mapStateToProps({selection}){
  return {selection}
}
export default connect(mapStateToProps,null)(AllPaymentMethods)