import { useEffect, useState } from "react"
import {connect} from 'react-redux'
import {TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI, STRIPE_PK, UNSAID_API } from "../branch-specific-config"
import {storeSelection} from '../redux/actions'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "./checkoutForm";
import Loader from './loader'
import PaymentError from "./paymentError"
import usePrevious from "../hooks/usePrevious"
import isEqual from "lodash/isEqual"
import {useRouter} from 'next/router'
const stripePromise = loadStripe(STRIPE_PK)

function Stripe(props){
    const [paymentIntentData,setPaymentIntentData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [fakeLoading,setFakeLoading] = useState(false)
    const [paymentError,setPaymentError] = useState(false)
    const token=localStorage.getItem(TOKEN_VAR_NAME)
    const router = useRouter()
    function prepareAdditionalNotes(){
        let additionalNotes = ""
        props.selection?.selection?.selection?.items?.forEach((cartItem,i)=>{
            let {noteText,engravingText,selectedJewelProductId,selectedItem,boxChoice,cardChoice} = JSON.parse(cartItem.comment)
            let selectedJewelProduct = props.cache.products[selectedJewelProductId]
            let productName = selectedJewelProduct?.name
            let size = selectedJewelProduct?.items?.find(it=>it.item==selectedItem)?.name
            let color = selectedJewelProduct?.color?.color_text
            let cordColor = selectedJewelProduct?.cord_color?.text
            // add post card and box details 
            let boxProductId = boxChoice.split("-")[0]
            let boxProduct = !!boxProductId?props.cache.products[boxProductId]:null
            let cardProductId = cardChoice.split("-")[0]
            let cardProduct = !!cardProductId?props.cache.products[cardProductId]:null
            additionalNotes += `${i!=0?" | ":""}${productName}: ${size?`Size - ${size}`:""}${color?` Color - ${color}`:""}${cordColor?` Cord color - ${cordColor}`:""}${!!boxProduct?` Gift Box - ${boxProduct?.name}`:""}${!!cardProduct?` Postcard - ${cardProduct?.name}`:""}${engravingText?` Engraving Text - ${engravingText}`:""}${noteText?` Note Text - ${noteText}`:""}`
        })
        return additionalNotes
    }
    async function postPaymentCentra(){
        let shippingCountries = props.selection?.selection?.countries?props.selection.selection.countries:[]
        let countryOptions = shippingCountries.map(country=>{
            return {label:country.name,value:country.country,states:country.states}
        })
        /* Create shipping address in centra format */
        //shipping country code
        let shippingCountryCode = null
        let shippingCountryIndex = countryOptions.findIndex(c=>c.label.toLowerCase()==props?.shippingAddressValues?.country?.toLowerCase())
        if(shippingCountryIndex > -1)
            shippingCountryCode = countryOptions[shippingCountryIndex].value
        //billing country code
        let billingCountryCode = null
        let billingCountryIndex = countryOptions.findIndex(c=>c.label.toLowerCase()==props?.billingAddressValues?.country?.toLowerCase())
        if(billingCountryIndex > -1)
            billingCountryCode = countryOptions[billingCountryIndex].value
        //shipping state code
        let shippingStateRequired = false
        let shippingStates = []
        if(shippingCountryIndex > -1 && Array.isArray(countryOptions[shippingCountryIndex].states)){
            shippingStateRequired = true
            shippingStates = countryOptions[shippingCountryIndex].states.map(s=>{return {label:s.name,value:s.state}})
        }
        let shippingStateCode = null
        if(shippingStateRequired && props?.shippingAddressValues?.state){
            let i = shippingStates.findIndex(s=>s.label.toLowerCase()==props?.shippingAddressValues?.state?.toLowerCase())
            if(i > -1)       
            shippingStateCode = shippingStates[i].value
        }
        //billing state code
        let billingStateRequired = false
        let billingStates = []
        if(billingCountryIndex > -1 && Array.isArray(countryOptions[billingCountryIndex].states)){
            billingStateRequired = true
            billingStates = countryOptions[billingCountryIndex].states.map(s=>{return {label:s.name,value:s.state}})
        }
        // console.log("billingStates",billingStates)
        let billingStateCode = null
        if(billingStateRequired && props?.billingAddressValues?.state){
            let i = billingStates.findIndex(s=>s.label.toLowerCase()==props?.billingAddressValues?.state?.toLowerCase())
            if(i > -1)       
            billingStateCode = billingStates[i].value
        }
        let reqBody = 
            {
                "paymentMethod": "stripe-custom",
                "termsAndConditions": true
            }
            let address =  props.sameBillingAddress && props?.selection?.selection?.selection?.shippingMethod != "store-pickup-antwerp-eur"?{
                "newsletter": false,
                "email": props.shippingAddressValues.email,
                "firstName": props.shippingAddressValues.firstName,
                "lastName": props.shippingAddressValues.lastName,
                "address1": props.shippingAddressValues.address1,
                "address2": props.shippingAddressValues.address2,
                "zipCode": props.shippingAddressValues.zipCode,
                "city": props.shippingAddressValues.city,
                "country": props.shippingAddressValues.countryCode
            }:{
                "newsletter": false,
                "email": props.billingAddressValues.email,
                "firstName": props.billingAddressValues.firstName,
                "lastName": props.billingAddressValues.lastName,
                "address1": props.billingAddressValues.address1,
                "address2": props.billingAddressValues.address2,
                "zipCode": props.billingAddressValues.zipCode,
                "city": props.billingAddressValues.city,
                "country": props.billingAddressValues.countryCode
            }
            reqBody.address = address
            if(props.sameBillingAddress){
                if(props.shippingAddressValues.number)
                    reqBody.address.phoneNumber = props.shippingAddressValues.number
                if(props.shippingAddressValues.stateCode)
                    reqBody.address.state = props.shippingAddressValues.stateCode
            } else {
                if(props.billingAddressValues.number)
                    reqBody.address.phoneNumber = props.billingAddressValues.number
                if(props.billingAddressValues.stateCode)
                    reqBody.address.state = props.billingAddressValues.stateCode
            }
            let shippingAddress = props?.selection?.selection?.selection?.shippingMethod == "store-pickup-antwerp-eur"?
            {
                "email": props.billingAddressValues.email,
                "firstName": props.billingAddressValues.firstName,
                "lastName": props.billingAddressValues.lastName,
                "address1": "De Burburestraat 20",
                "zipCode": "2000",
                "city": "Antwerp",
                "country": "BE" 
            }
            :{
                "email": props.shippingAddressValues.email,
                "firstName": props.shippingAddressValues.firstName,
                "lastName": props.shippingAddressValues.lastName,
                "address1": props.shippingAddressValues.address1,
                "address2": props.shippingAddressValues.address2,
                "zipCode": props.shippingAddressValues.zipCode,
                "city": props.shippingAddressValues.city,
                "country": props.shippingAddressValues.countryCode
            }
            reqBody.shippingAddress = shippingAddress
            if(props?.selection?.selection?.selection?.shippingMethod == "store-pickup-antwerp-eur"){
                if(props.billingAddressValues.number)
                    reqBody.shippingAddress.phoneNumber = props.billingAddressValues.number
            } else {
                if(props.shippingAddressValues.number)
                    reqBody.shippingAddress.phoneNumber = props.shippingAddressValues.number
                if(props.shippingAddressValues.stateCode)
                    reqBody.shippingAddress.state = props.shippingAddressValues.stateCode
            }
            reqBody.additionalNotes = prepareAdditionalNotes()
            // console.log("reqBody",reqBody);
            return fetch(`${ECOMMERCE_URI}/payment`, {
                method: 'POST',
                headers: {
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type': 'application/json'
                },
                body:JSON.stringify(reqBody)
            })
            
    } 
    async function paymentMethodChange(){
        return fetch(`${ECOMMERCE_URI}/payment-methods/stripe-custom`, {
            method: 'PUT',
            headers: {
            'Accept': `*/*; api-token: ${token}`,
            'Content-Type': 'application/json'
            }
        })
    }
    async function createPaymentIntent(data){
        return fetch(`${UNSAID_API}/api/stripe/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
    }
    async function initiatePayment(){
        try{
            setPaymentError(false)
            setLoading(true)
            let selectionPaymentMethodStripe = props?.selection?.selection?.selection.paymentMethod=="stripe-custom"
            if(!selectionPaymentMethodStripe){
                let resPaymentMethodChange = await paymentMethodChange()
                if(resPaymentMethodChange.status==200){
                    let selection = await resPaymentMethodChange.json();
                    localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                    props.storeSelection(selection)
                } else {
                    throw {type:"PAY_METHOD_UNAVAILABLE",status:resPaymentMethodChange.status}
                }
            }
            let resCentra = await postPaymentCentra()
            // console.log("resCentra",resCentra);
            if(resCentra.status==200){
                let resCentraData = await resCentra.json()
                // console.log("resCentraData ress",resCentraData);
                let createPaymentIntentResponse = await createPaymentIntent(resCentraData)
                // console.log("createPaymentIntentResponse",createPaymentIntentResponse);
                if(createPaymentIntentResponse.status==200){
                    let data = await createPaymentIntentResponse.json()
                    setPaymentIntentData(data)
                } else {
                    // console.log("resCentraData",resCentraData);
                    throw {type:"SERVER",status:createPaymentIntentResponse.status}
                }
            } else {
                let resCentraData = await resCentra.json()
                // console.log("resCentraData",resCentraData);
                throw {type:"ECOMM",status:resCentra.status}
            }
            setLoading(false)
            setTimeout(()=>{
                setFakeLoading(false)
            },1500)
        } catch(err){
            setTimeout(()=>{
                setFakeLoading(false)
            },1500)
            setLoading(false)
            setPaymentError(err)
            // console.log("cc",err)
        }
    }
    const previousTotals = usePrevious(props?.selection?.selection?.selection?.totals)
    useEffect(()=>{
        if(!isEqual(previousTotals,props?.selection?.selection?.selection?.totals)){
            initiatePayment()
        }
    },[props?.selection?.selection?.selection?.totals])
    const appearance = {
        theme: 'stripe'
    }
    const options = {
        clientSecret:paymentIntentData?.clientSecret,
        appearance,
        locale:router.locale
    }
    return (
        <div className="stripeCustom">
            {loading && !paymentError &&
                <div className="loaderWrapper alignCenter">
                    <div className="loader inlineBlock">
                        <Loader type="dots" size={8} color="#000000"/>
                    </div>
                </div>
            }
            {!!paymentIntentData && !loading && !paymentError && (
                <>
                    <div className={`loaderWrapperElements alignCenter ${fakeLoading?"show":""}`}>
                        <div className="loader inlineBlock">
                            <Loader type="dots" size={8} color="#000000"/>
                        </div>
                    </div>
                    <div className={`elements ${!fakeLoading?"show":""}`}>
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm paymentIntentData={paymentIntentData} countryCode={props?.selection?.selection?.location?.country}/>
                        </Elements>
                    </div>
                </>
            )}
            {!!paymentError &&
                <PaymentError error={paymentError} initiatePayment={initiatePayment}/>
            }
            <style jsx>{`
                .elements,.loaderWrapperElements{
                    opacity:0;
                }
                .elements.show,.loaderWrapperElements.show{
                    opacity:1;
                }
                .loader{
                    margin:auto;
                }
            `}</style>
        </div>
    )
}
function mapStateToProps({selection,cache}){
    return {selection,cache}
}
export default connect(mapStateToProps,{storeSelection})(Stripe)