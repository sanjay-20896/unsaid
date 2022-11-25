import React, { useEffect } from 'react'
import {TOKEN_VAR_NAME} from '../config'
import {connect} from 'react-redux'
import { ECOMMERCE_URI, UNSAID_API } from "../branch-specific-config"
import {storeSelection} from '../redux/actions'
import {useRouter} from 'next/router'
import { onProceedToPayment } from '../gtmFunctions'
function PaypalExpress(props) {
    const router = useRouter()
    const token=localStorage.getItem(TOKEN_VAR_NAME)
    let resCentraData;
    function payPalScriptOnLoad(){
      var FUNDING_SOURCES = [
        paypal.FUNDING.PAYPAL,
      ];
      // Loop over each funding source/payment method
      FUNDING_SOURCES.forEach(function(fundingSource) {
          // Initialize the buttons
          var button = paypal.Buttons({
              style: {
                color: 'gold',
                shape: 'pill',
                label: 'paypal',
                layout: 'vertical',
              },
              fundingSource: fundingSource,
              createOrder: async (data, actions) => {
                resCentraData = await initiatePayment();
                // console.log("resCentraData",resCentraData);
                if(!!resCentraData){
                  return fetch(`${UNSAID_API}/api/orders`, {
                    method: "POST",
                    headers:{
                      'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        metadata: resCentraData,
                    })
                  })
                  .then((response) => response.json())
                  .then((order) => order.id);
                }
              },
              onApprove: (data, actions) => {
                // console.log("onApprove data");
                return fetch(`${UNSAID_API}/api/orders/${data.orderID}/capture`, {
                  method: "POST",
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({
                    metadata: resCentraData,
                  })
                })
                .then((response) => response.json())
                .then((orderData) => {
                  router.push('/confirmation?centraPaymentMethod=paypal-custom')
                  // Successful capture! For dev/demo purposes:
                  // console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                  // const transaction = orderData.purchase_units[0].payments.captures[0];
                  // alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
                  // When ready to go live, remove the alert and show a success message within this page. For example:
                  // const element = document.getElementById('paypal-button-container');
                  // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                  // Or go to another URL:  actions.redirect('thank_you.html');
                });
              }
          });
          // Check if the button is eligible
          if (button.isEligible()) {
              // Render the standalone button for that funding source
              button.render('#paypal-button-container');
          }
      });
      // paypal.Buttons({
        
      // }).render('#paypal-button-container')
    }
    function removeAndAddPaypalScript(){
        var jsElm = document.createElement("script");
        // jsElm.type = "application/javascript";
        jsElm.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=${props?.selection?.selection?.selection?.currency}`
        jsElm.id = "paypalScript"
        document.body.appendChild(jsElm);
        jsElm.onload = function(){payPalScriptOnLoad()};
    }
    useEffect(()=>{
      removeAndAddPaypalScript()
    },[props?.selection?.selection?.selection?.currency])

    // payment intent centra

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
      let billingStateCode = null
      if(billingStateRequired && props?.billingAddressValues?.state){
          let i = billingStates.findIndex(s=>s.label.toLowerCase()==props?.billingAddressValues?.state?.toLowerCase())
          if(i > -1)       
          billingStateCode = billingStates[i].value
      }
      let reqBody = {
          "paymentMethod": "paypal-custom",
          "termsAndConditions": true
      }
      let address =  props.sameBillingAddress && props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") == -1?{
          "newsletter": false,
          "email": props.shippingAddressValues.email,
          "firstName": props.shippingAddressValues.firstName,
          "lastName": props.shippingAddressValues.lastName,
          "address1": props.shippingAddressValues.address1,
          "address2": props.shippingAddressValues.address2,
          "zipCode": props.shippingAddressValues.zipCode,
          "city": props.shippingAddressValues.city,
          "country": shippingCountryCode
      }:{
          "newsletter": false,
          "email": props.billingAddressValues.email,
          "firstName": props.billingAddressValues.firstName,
          "lastName": props.billingAddressValues.lastName,
          "address1": props.billingAddressValues.address1,
          "address2": props.billingAddressValues.address2,
          "zipCode": props.billingAddressValues.zipCode,
          "city": props.billingAddressValues.city,
          "country": billingCountryCode
      }
      reqBody.address = address
      if(props.sameBillingAddress && props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") == -1){
          if(props.shippingAddressValues.number)
              reqBody.address.phoneNumber = props.shippingAddressValues.number
          if(props.shippingAddressValues.state)
              reqBody.address.state = shippingStateCode
      } else {
          // console.log("not same billing address take actual",props.billingAddressValues)
          if(props.billingAddressValues.number)
              reqBody.address.phoneNumber = props.billingAddressValues.number
          if(props.billingAddressValues.state)
              reqBody.address.state = billingStateCode
      }
      let shippingAddress = props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") > -1?
      {
          "email": props.billingAddressValues.email,
          "firstName": props.billingAddressValues.firstName,
          "lastName": props.billingAddressValues.lastName,
          "address1": "Store pick up",
          "zipCode": "Store pick up",
          "city": "Store pickup",
          "country": props?.selection?.selection?.selection?.shippingMethod == "store-pickup-antwerp-eur"?"BE":"FR"
      }
      :{
          "email": props.shippingAddressValues.email,
          "firstName": props.shippingAddressValues.firstName,
          "lastName": props.shippingAddressValues.lastName,
          "address1": props.shippingAddressValues.address1,
          "address2": props.shippingAddressValues.address2,
          "zipCode": props.shippingAddressValues.zipCode,
          "city": props.shippingAddressValues.city,
          "country": shippingCountryCode
      }
      reqBody.shippingAddress = shippingAddress
      if(props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") > -1){
          if(props.billingAddressValues.number)
              reqBody.shippingAddress.phoneNumber = props.billingAddressValues.number
      } else {
          if(props.shippingAddressValues.number)
              reqBody.shippingAddress.phoneNumber = props.shippingAddressValues.number
          if(props.shippingAddressValues.state)
              reqBody.shippingAddress.state = shippingStateCode
      }
      reqBody.additionalNotes = prepareAdditionalNotes()
      // console.log("post payment request body",reqBody)
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
      return fetch(`${ECOMMERCE_URI}/payment-methods/paypal-custom`, {
          method: 'PUT',
          headers: {
          'Accept': `*/*; api-token: ${token}`,
          'Content-Type': 'application/json'
          }
      })
    }

    async function initiatePayment(){
      try{
          // let selectionPaymentMethodPaypal = props?.selection?.selection?.selection.paymentMethod=="paypal-custom"
          // console.log("init payment paypal",props?.selection?.selection?.selection.paymentMethod)
          // if(!selectionPaymentMethodPaypal){
          //   console.log("selectionPaymentMethodPaypal",selectionPaymentMethodPaypal);
          let resPaymentMethodChange = await paymentMethodChange()
          if(resPaymentMethodChange.status==200){
              let selection = await resPaymentMethodChange.json();
              localStorage.setItem(TOKEN_VAR_NAME,selection.token)
              props.storeSelection(selection)
          } else {
              throw {type:"PAY_METHOD_UNAVAILABLE",status:resPaymentMethodChange.status}
          }
          // }
          let resCentra = await postPaymentCentra()
          if(resCentra.status==200){
              onProceedToPayment(props.selection,props.cache)
              let resCentraData = await resCentra.json()
              // console.log("resCentraData",resCentraData);
              return resCentraData;
              // setPaymentIntentData(data)
              // let createPaymentIntentResponse = await createPaymentIntent(resCentraData)
              // if(createPaymentIntentResponse.status==200){
              //     let data = await createPaymentIntentResponse.json()
              //     setPaymentIntentData(data)
              // } else {
              //     throw {type:"SERVER",status:createPaymentIntentResponse.status}
              // }
          } else {
              throw {type:"ECOMM",status:resCentra.status}
          }
      } catch(err){
          // console.log(err)
      }
    }

    // useEffect(()=>{
    //   initiatePayment()
    // },[props?.selection?.selection?.selection?.totals])
    return (
        <>
          <div key={props?.selection?.selection?.selection?.currency}>
            <div id="paypal-button-container"></div>
          </div>
        </>
    )
}
function mapStateToProps({selection,cache}){
  return {selection,cache}
}
export default connect(mapStateToProps,{storeSelection})(PaypalExpress)

// <div id="smart-button-container">
//     <div style="text-align: center"><label for="description"> </label><input type="text" name="descriptionInput" id="description" maxlength="127" value=""></div>
//       <p id="descriptionError" style="visibility: hidden; color:red; text-align: center;">Please enter a description</p>
//     <div style="text-align: center"><label for="amount"> </label><input name="amountInput" type="number" id="amount" value="" ><span> USD</span></div>
//       <p id="priceLabelError" style="visibility: hidden; color:red; text-align: center;">Please enter a price</p>
//     <div id="invoiceidDiv" style="text-align: center; display: none;"><label for="invoiceid"> </label><input name="invoiceid" maxlength="127" type="text" id="invoiceid" value="" ></div>
//       <p id="invoiceidError" style="visibility: hidden; color:red; text-align: center;">Please enter an Invoice ID</p>
//     <div style="text-align: center; margin-top: 0.625rem;" id="paypal-button-container"></div>
//   </div>
//   <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD" data-sdk-integration-source="button-factory"></script>
//   <script>
//   function initPayPalButton() {
//     var description = document.querySelector('#smart-button-container #description');
//     var amount = document.querySelector('#smart-button-container #amount');
//     var descriptionError = document.querySelector('#smart-button-container #descriptionError');
//     var priceError = document.querySelector('#smart-button-container #priceLabelError');
//     var invoiceid = document.querySelector('#smart-button-container #invoiceid');
//     var invoiceidError = document.querySelector('#smart-button-container #invoiceidError');
//     var invoiceidDiv = document.querySelector('#smart-button-container #invoiceidDiv');

//     var elArr = [description, amount];

//     if (invoiceidDiv.firstChild.innerHTML.length > 1) {
//       invoiceidDiv.style.display = "block";
//     }

//     var purchase_units = [];
//     purchase_units[0] = {};
//     purchase_units[0].amount = {};

//     function validate(event) {
//       return event.value.length > 0;
//     }

//     paypal.Buttons({
//       style: {
//         color: 'gold',
//         shape: 'pill',
//         label: 'paypal',
//         layout: 'vertical',
        
//       },

//       onInit: function (data, actions) {
//         actions.disable();

//         if(invoiceidDiv.style.display === "block") {
//           elArr.push(invoiceid);
//         }

//         elArr.forEach(function (item) {
//           item.addEventListener('keyup', function (event) {
//             var result = elArr.every(validate);
//             if (result) {
//               actions.enable();
//             } else {
//               actions.disable();
//             }
//           });
//         });
//       },

//       onClick: function () {
//         if (description.value.length < 1) {
//           descriptionError.style.visibility = "visible";
//         } else {
//           descriptionError.style.visibility = "hidden";
//         }

//         if (amount.value.length < 1) {
//           priceError.style.visibility = "visible";
//         } else {
//           priceError.style.visibility = "hidden";
//         }

//         if (invoiceid.value.length < 1 && invoiceidDiv.style.display === "block") {
//           invoiceidError.style.visibility = "visible";
//         } else {
//           invoiceidError.style.visibility = "hidden";
//         }

//         purchase_units[0].description = description.value;
//         purchase_units[0].amount.value = amount.value;

//         if(invoiceid.value !== '') {
//           purchase_units[0].invoice_id = invoiceid.value;
//         }
//       },

//       createOrder: function (data, actions) {
//         return actions.order.create({
//           purchase_units: purchase_units,
//         });
//       },

//       onApprove: function (data, actions) {
//         return actions.order.capture().then(function (orderData) {

//           // Full available details
//           console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

//           // Show a success message within this page, e.g.
//           const element = document.getElementById('paypal-button-container');
//           element.innerHTML = '';
//           element.innerHTML = '<h3>Thank you for your payment!</h3>';

//           // Or go to another URL:  actions.redirect('thank_you.html');
          
//         });
//       },

//       onError: function (err) {
//         console.log(err);
//       }
//     }).render('#paypal-button-container');
//   }
//   initPayPalButton();
//   </script>