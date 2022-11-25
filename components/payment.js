
import { useState } from 'react'
import {connect} from 'react-redux'
import {storeSelection} from '../redux/actions'
import {MEDIUM_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI } from '../branch-specific-config'
import {useRouter} from 'next/router'
import Loader from '../components/loader'
import useTranslation from 'next-translate/useTranslation'

function Payment(props){
    const {t}=useTranslation('common');
    const [paymentError,setPaymentError] = useState(null)
    const [paymentErrorMessage,setPaymentErrorMessage] = useState(t('paymentFail'))
    const [loading,setLoading] = useState(false)
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
            additionalNotes += `${i!=0?" | ":""}${productName}: ${size?`${t('size')} - ${size}`:""}${color?` ${t('color')} - ${color}`:""}${cordColor?` Cord color - ${cordColor}`:""}${!!boxProduct?` ${t('giftBox')} - ${boxProduct?.name}`:""}${!!cardProduct?` ${t('postCard')} - ${cardProduct?.name}`:""}${engravingText?` ${t('engravingText')} - ${engravingText}`:""}${noteText?` ${t('noteText')} - ${noteText}`:""}`
        })
        return additionalNotes
    }
    async function beginPayment(){
        let reqBody = 
        {
            "paymentMethod": "stripe-checkout",
            "paymentReturnPage": `${props.frontendURI}/confirmation`,
            "paymentFailedPage": `${props.frontendURI}/checkout?payment=failed`,
            "termsAndConditions": true
        }
        let address =  props.sameBillingAddress?{
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
        let shippingAddress = {
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
        if(props.shippingAddressValues.number)
            reqBody.shippingAddress.phoneNumber = props.shippingAddressValues.number
        if(props.shippingAddressValues.stateCode)
            reqBody.shippingAddress.state = props.shippingAddressValues.stateCode
        reqBody.additionalNotes = prepareAdditionalNotes()
        let token = localStorage.getItem(TOKEN_VAR_NAME)
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
    function evaluate(subtree, context = window){
        function getSnippetType(script) {
          return script.type || '';
        }
        function getRawSnippet(script) {
          return script.text || script.textContent || script.innerHTML || '';
        }
      
        if (subtree) {
          try {
            const scripts = subtree.getElementsByTagName('script');
            const scriptsAsArray = Array.from(scripts).filter(script => getSnippetType(script) !== 'application/json');
      
            scriptsAsArray.forEach((script) => {
              const unescaped = getRawSnippet(script).replace(/\\/gi, '');
              eval.call(context, unescaped);
            });
          } catch (error) {
            // tslint:disable-next-line:no-console
            console.error('Catched error in evaluate function:', error);
          }
        }
    }
    async function initStripe(){
        try{
            setPaymentError(false)
            setLoading(true)
            let selectionPaymentMethodStripe = props?.selection?.selection?.selection.paymentMethod=="stripe-checkout"
            if(!selectionPaymentMethodStripe){
                // console.log('selection payment method not stripe')
                let token = localStorage.getItem(TOKEN_VAR_NAME)
                let rawResponse = await fetch(`${ECOMMERCE_URI}/payment-methods/stripe-checkout`, {
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
                // console.log('payment response')
                result = await result.json()
                // console.log(result)
                localStorage.setItem(TOKEN_VAR_NAME,result.token)
                const checkoutContainer = document.getElementById('stripe-checkout'); // Reference to element already on page
                checkoutContainer.innerHTML = result.formHtml;
                evaluate(checkoutContainer);
            } else if(result.status==201){
                router.push('/confirmation?centraPaymentMethod=stripe-checkout')
            } else {
                    let data = await result.json()
                    throw {status:result.status,data}
            } 
            // props.initiatingPayment(false)
            setLoading(false)
        } catch(err){
            // console.log(err)
            // props.initiatingPayment(false)
            if(err.status==410){
                // console.log("Stock fail:")
                // console.log(err.data)
                localStorage.setItem(TOKEN_VAR_NAME,err.data.token)
                props.storeSelection(err.data)
                    setPaymentErrorMessage(t('notInStockTryAgain'))
            }
            else if(err.status==406){
                if(err?.data?.errors["address.email"] || err?.data?.errors["shippingAddress.email"])
                    setPaymentErrorMessage(t('shippingAndBillingAddressInvalid'))
            } else {
                setPaymentErrorMessage(t('paymentFail'))   
            }
            setPaymentError(true)
            setLoading(false)
            // this.setState({paymentError:err})

        }
    }
    let btnContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('proceedToPayment')
    let btnContent2 = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('placeOrder')
    // console.log('additional notes',prepareAdditionalNotes())
    return (
        <>
            <div className="alignLeft">
                <div className="paymentOptions">
                    {/* <div className="payButton roboto grey font16-notResponsive">Checkout with PayPal</div> */}
                    {props?.selection?.selection?.selection?.items && props?.selection?.selection?.selection?.items?.length > 0 && props?.selection?.selection?.selection?.totals?.grandTotalPriceAsNumber==0?
                        <div className="btn btnPrimary font16-notResponsive width-100 alignCenter" onClick={()=>initStripe()}>{btnContent2}</div>
                        :
                        // <div className="payButton roboto grey font16-notResponsive" onClick={()=>initStripe()}>{btnContent}</div>
                        <button className={`btn submit ${props?.selection?.selection?.selection?.shippingMethod?"btnPrimary":"btnInactive"} anoRegular font16-notResponsive cursorPointer`} onClick={()=>initStripe()}>{btnContent}</button>
                    }
                    {paymentError &&
                        <div className="error">{paymentErrorMessage}</div>
                    }
                    <div id="stripe-checkout"></div>
                </div>
                {/* <button className={`btn submit btnPrimary white anoRegular font16-notResponsive cursorPointer`}></button> */}
            </div>
            <style jsx>{`
                .submit{
                    margin-top:2.8rem;
                    min-width:26.8rem;
                }
                // .payButton{
                //     padding:1.2rem 2.9rem;
                //     background:#F5F5F5;
                //     margin-bottom:2.2rem;
                //     text-align:center;
                //     cursor:pointer;
                // }
                @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .submit{
                        min-width:23.4rem;
                    }   
                }
                @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .submit{
                        min-width:21.2rem;
                    }   
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection,cache}){
    return {selection,cache}
}
export default connect(mapStateToProps,{storeSelection})(Payment)