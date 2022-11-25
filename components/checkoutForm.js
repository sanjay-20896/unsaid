import React, { useEffect, useRef, useState } from "react";
import {zeroDecimalCurrencies,currencySymbols} from '../data/currency'
import {PaymentElement, useStripe, useElements, PaymentRequestButtonElement} from "@stripe/react-stripe-js";
import Loader from './loader'
import {removeDecimalZeros} from '../functions'
import {useRouter} from 'next/router'
import StripePaymentButton from "./StripePaymentButton";
import {connect} from 'react-redux'
import { onProceedToPayment } from "../gtmFunctions";
import useTranslation from 'next-translate/useTranslation'

function CheckoutForm(props) {
  const {t}=useTranslation('common')
  const [paymentRequest, setPaymentRequest] = useState(null);
  const paymentElementRef = useRef(null)
  const stripe = useStripe()
  const elements = useElements()
  const [payBtnShouldBeShown,showPaymentBtn] = useState(false)
  const [buttonToShow,setButtonToShow] = useState(false)
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!stripe) {
      return;
    }
    //PaymentRequestButtonElement - start
    
    const pr = stripe.paymentRequest({
      country: props.countryCode,
      currency: props.paymentIntentData.currency,
      total: {
        label: 'Total',
        amount: props.paymentIntentData.amount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        if(result.applePay){
          setButtonToShow("applePay")
        }else{
          setButtonToShow("googlePay")
        }
      }
    });

    //PaymentRequestButtonElement - end

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(t('paymentSuccess'));
          break;
        case "processing":
          setMessage(t('paymentProcessing'));
          break;
        case "requires_payment_method":
          setMessage(t('paymentFailed'));
          break;
        default:
          setMessage(t('somethingWentWrong'));
          break;
      }
    });
    
  }, [stripe]);


  useEffect(()=>{
    paymentRequest?.on('paymentmethod', async (ev) => {
      // Confirm the PaymentIntent without handling potential next actions (yet).
      const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
        props.paymentIntentData.clientSecret,
        {payment_method: ev.paymentMethod.id},
        {handleActions: false}
      );
      if (confirmError) {
        ev.complete('fail');
      } else {
        ev.complete('success');
        if (paymentIntent.status === "requires_action") {
          // Let Stripe.js handle the rest of the payment flow.
          const {error} = await stripe.confirmCardPayment(props.paymentIntentData.clientSecret);
          if (error) {
            // The payment failed -- ask your customer for a new payment method.
            // console.log("fail",error);
          } else {
            // The payment has succeeded.
            // console.log("payment success");
            router.push(`/confirmation?payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}&redirect_status=${paymentIntent.status}`)
          }
        } else {
          // The payment has succeeded.
          // console.log("payment success");
          router.push(`/confirmation?payment_intent=${paymentIntent.id}&payment_intent_client_secret=${paymentIntent.client_secret}&redirect_status=${paymentIntent.status}`)
        }
      }
    });
  },[paymentRequest])
  
  // if (paymentRequest) {
  //   return <PaymentRequestButtonElement options={{paymentRequest}} />
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/confirmation`,
      },
    });

    
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      // console.log("unexpected payment error",error)
      setMessage(t('unexpectedErrorOccured'));
    }
    setIsLoading(false);
    onProceedToPayment(props.selection,props.cache)
  }
  function paymentElementOnChangeHandler(e){
    // if(e.elementType=="payment" && e.collapsed==false && e.value.type=="apple_pay")
    //   showPaymentBtn(false)
    // else
    //   showPaymentBtn(true)
  }
  useEffect(()=>{
    setTimeout(()=>{
      showPaymentBtn(true)
    },1500)
  },[])
  let btnContent = isLoading
  ?
  <span className="inlineBlock"><Loader type="dots" size={8} color="white"/></span>
  :
  `${zeroDecimalCurrencies.includes(props.paymentIntentData.currency)?`${currencySymbols[props.paymentIntentData.currency]?currencySymbols[props.paymentIntentData.currency]:""}${removeDecimalZeros(props.paymentIntentDataData.amount.toFixed(2))}${currencySymbols[props.paymentIntentData.currency]?"":` ${props.paymentIntentData.currency}`}`:`${currencySymbols[props.paymentIntentData.currency]?currencySymbols[props.paymentIntentData.currency]:""}${removeDecimalZeros((props.paymentIntentData.amount/100).toFixed(2))}${currencySymbols[props.paymentIntentData.currency]?"":` ${props.paymentIntentData.currency}`}`} - ${t('Payment')}`
  return (
    <>
        {/* {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />} */}
        {buttonToShow=="googlePay" && <StripePaymentButton type="googlePay" onclick={()=>paymentRequest.show()}/>}
        {buttonToShow=="applePay" && <StripePaymentButton type="applePay" onclick={()=>paymentRequest.show()}/>}
        <form id="payment-form" onSubmit={handleSubmit}>
          <div ref={paymentElementRef}>
            <PaymentElement id="payment-element-1" onChange={e=>paymentElementOnChangeHandler(e)} />
          </div>
          {!!stripe && !!elements && payBtnShouldBeShown &&
            <button className={`btn btnPrimary anoRegular pay ${isLoading?"loading":""}`}>
                {btnContent}
            </button>
          }
          {message && <div className="paymentMessage error">{message}</div>}
        </form>
        <style jsx>{`
            .pay{
                margin-top:2.4rem;
                min-width:20.1rem;
            }
            .pay.loading{
              background:#000000;
              color:#ffffff;
            }
            .paymentMessage{
                margin-top:1.6rem;
            }
            #payment-form{
              margin-top: 32px;
            }
        `}</style>
    </>
  );
}
function mapStateToProps({selection,cache}){
  return {selection,cache}
}
export default connect(mapStateToProps,null)(CheckoutForm)