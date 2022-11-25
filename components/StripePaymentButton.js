import React from 'react'
import { MOBILE_BREAKPOINT } from "../config"

export default function StripePaymentButton(props) {
  return (
    <>
        <button className={`${props.type=="applePay"?"applePay":""}`} onClick={()=>props.onclick()}></button>
        <style jsx>{`
            button{
                width: 100%;
                height: 55px;
                padding: 16px;
                cursor:pointer;
                background-image: url(/images/googlePay.svg);
                background-origin: content-box;
                background-position: 50%;
                background-repeat: no-repeat;
                background-size: contain;
                background-color: #000000;
                border-radius: 28px;
                border:none;
            }
            button.applePay{
                padding: 10px;
                background-image: url(/images/applePayImg.png);
            }
            button:hover{
                background-color: #000000db;
            }
            button.applePay:hover{
                background-color: #000000;
            }
            @media only screen and (max-width: 1350px){
                button{
                    height: 45px;
                    padding: 12px;
                }  
                button.applePay{
                    padding: 8px;
                }
            }
            @media only screen and (max-width: 822px){
                button{
                    height: 35px;
                    padding: 9px;
                }  
                button.applePay{
                    padding: 3px;
                }
            }
            @media only screen and (max-width: 740px){
                button{
                    height: 55px;
                    padding: 14px;
                }  
                button.applePay{
                    padding: 8px;
                }
            }
            @media only screen and (max-width: 540px){
              button{
                height: 45px;
                padding: 12px;
              }
              button.applePay{
                padding: 8px;
              }
            }
            @media only screen and (max-width: 339px){
              button{
                height: 35px;
                padding: 8px;
              }
              button.applePay{
                padding: 4px;
              }
            }
        `}</style>
    </>
  )
}