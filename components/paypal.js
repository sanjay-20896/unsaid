import { useEffect, useState } from "react"
import {connect} from 'react-redux'
import {TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI } from "../branch-specific-config"
import {storeSelection} from '../redux/actions'
function PayPal(props){
    const [paymentError,setPaymentError] = useState(null)
    const [initiatingPayment,setInitiatingPayment] = useState(false)
    const token=localStorage.getItem(TOKEN_VAR_NAME);
    async function beginPayment(){
        let shippingCountry = props?.selection?.selection?.location?.country
        let state = props?.selection?.selection?.location?.country
        let reqBody = 
            {
                "paymentMethod": "paypal",
                "paymentReturnPage": "http://example.com/success",
                "paymentFailedPage": "http://example.com/failure",
                "termsAndConditions": true,
                "address": {
                  "newsletter": false,
                  "email": "abc123@example.com",
                  "phoneNumber": "123456789",
                  "firstName": "Test Billing",
                  "lastName": "Testson Billing",
                  "address1": "Address One",
                  "address2": "Address Two",
                  "zipCode": "12345",
                  "city": "Malmö",
                  "country": "SE"
                }
            }
        // let loggedIn = getNestedObject(this.props,["selection","selection","loggedIn"])
        // if(!!loggedIn){
        //     if(loggedIn.address1)
        //         reqBody.address.address1 = loggedIn.address1
        //     if(loggedIn.address2)
        //         reqBody.address.address2 = loggedIn.address2
        //     if(loggedIn.city)
        //         reqBody.address.city = loggedIn.city
        //     if(loggedIn.country)
        //         reqBody.address.country = loggedIn.country
        //     if(loggedIn.email)
        //         reqBody.address.email = loggedIn.email
        //     if(loggedIn.firstName)
        //         reqBody.address.firstName = loggedIn.firstName
        //     if(loggedIn.lastName)
        //         reqBody.address.lastName = loggedIn.lastName
        //     if(loggedIn.phoneNumber)
        //         reqBody.address.phoneNumber = loggedIn.phoneNumber
        //     if(loggedIn.zipCode)
        //         reqBody.address.zipCode = loggedIn.zipCode
        // }
        // console.log('payment req body:')
        // console.log(reqBody)
        return fetch(`${ECOMMERCE_URI}/payment`, {
          method: 'POST',
          headers: {
            'Accept': `*/*; api-token: ${token}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(
            reqBody
          )
        })
    }
    async function initiatePayment(){
        try{
            let selectionPaymentMethodStripe = props?.selection?.selection?.selection.paymentMethod=="paypal"
            if(!selectionPaymentMethodStripe){
                // console.log('selection payment method not klarna')
                let rawResponse = await fetch(`${ECOMMERCE_URI}/payment-methods/paypal`, {
                    method: 'PUT',
                    headers: {
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                    },
                })
                if(rawResponse.status==200){
                    let selection = await rawResponse.json();
                    localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                    props.storeSelection(selection)
                } else {
                    throw {type:"paymentMethodFail"}
                }
            }
            let result = await beginPayment()
            // console.log('begin payment response')
            // console.log(result.status)
            if(result.status==200){
                // console.log('payment response paypal')
                result = await result.json()
                // console.log(result)
                // localStorage.setItem(TOKEN_VAR_NAME,result.token)
                // var checkoutContainer = document.getElementById('stripe-checkout')  
                // checkoutContainer.innerHTML = result.formHtml
                // var scriptsTags = checkoutContainer.getElementsByTagName('script')
                // // This is necessary otherwise the scripts tags are not going to be evaluated
                // for (var i = 0; i < scriptsTags.length; i++) {
                //     var parentNode = scriptsTags[i].parentNode
                //     var newScriptTag = document.createElement('script')
                //     newScriptTag.type = 'text/javascript'
                //     newScriptTag.text = scriptsTags[i].text
                //     parentNode.removeChild(scriptsTags[i])
                //     parentNode.appendChild(newScriptTag)
                // }
            } else if(result.status==410) {
                    result = await result.json()
                    throw {type:"stockFail",data:result}
            } else {
                    let data = await result.json()
                    throw {type:"paymentFail",data}
            }   
            // props.initiatingPayment(false)
        } catch(err){
            // console.log(err)
            // props.initiatingPayment(false)
            if(err.type=="stockFail"){
                // console.log("Stock fail:")
                // console.log(err.data)
                // localStorage.setItem(TOKEN_VAR_NAME,err.data.token)
                // props.storeSelection(err.data.selection)
            }
            setPaymentError(true)
            // this.setState({paymentError:err})

        }
    }
    useEffect(()=>{
        initiatePayment()
    },[])
    return (
        <div id="stripe-checkout"></div>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,{storeSelection})(PayPal)