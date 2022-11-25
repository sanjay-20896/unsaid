import AddressForm from './addressForm'
import Loader from './loader'
import {connect} from 'react-redux'
import {changeShippingMethod, changeSelectionCountry,updateAddresses} from '../redux/actions'
import { useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

function DeliveryDetails(props){
    const {t}=useTranslation('common')
    const [backupShippingAddressValues,setBackupShippingAddressValues] = useState({})
    const [backupBillingAddressValues,setBackupBillingAddressValues] = useState({})
    const [backupSameBillingAddress,setBackupSameBillingAddress] = useState(true)
    const [backupShippingMethod,setBackupShippingMethod] = useState("")
    const [defaultCheck,setDefaultCheck] = useState(true)
    let btnContent = props.common.changingCountry?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('next')
    async function proceed(){
        if(!props.addressValidationError && !props.common.changingCountry){
            let override = false
            let sameBillingAddress = props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") > -1?false:props.sameBillingAddress
            if(props?.selection?.selection?.selection?.shippingMethod=="store-pickup-antwerp-eur")
                override = {stateCode:"",countryCode:"BE"}
            if(props?.selection?.selection?.selection?.shippingMethod=="store-pickup-paris-eur")
                override = {stateCode:"",countryCode:"FR"}
            let situation = props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") > -1?"storePickupProceedClick":"shippingMethodSelectionProceed"
            props.updateAddresses(props.shippingAddressValues,props.billingAddressValues,sameBillingAddress,override,situation,props.selection,(bool)=>{
                if(bool)
                    props.next()
            })
        }
    }  
    function shippingMethodSelect(shippingMethod,countryCode){
        // console.log(shippingMethod)
        if(props?.selection?.selection?.selection?.shippingMethod!=shippingMethod){
            //if store shipping, change shipping country to belgium
            if(countryCode){
                setDefaultCheck(false)
                // console.log("store pickup antwerp click",props?.selection?.selection?.selection?.shippingMethod)
                let copiedShippingAddress = JSON.parse(JSON.stringify(props.shippingAddressValues))
                setBackupShippingAddressValues(copiedShippingAddress)
                setBackupSameBillingAddress(props.sameBillingAddress)
                setBackupBillingAddressValues(props.billingAddressValues)
                setBackupShippingMethod(props?.selection?.selection?.selection?.shippingMethod)
                props.updateAddresses(props.shippingAddressValues,props.billingAddressValues,false,{stateCode:"",countryCode:countryCode},"storePickup",props.selection,(bool)=>{
                    // console.log("changing shipping method to:",shippingMethod)
                    if(bool)
                        props.changeShippingMethod(shippingMethod)
                })
            }else{
                setDefaultCheck(true)
                props.updateAddresses(backupShippingAddressValues,backupBillingAddressValues,backupSameBillingAddress,false,"shippingMethodSelection",props.selection,(bool)=>{
                    if(bool){
                        // console.log("dhl update address success")
                        // if(backupShippingMethod){
                        //     console.log("change to back up",backupShippingMethod)
                        //     props.changeShippingMethod(backupShippingMethod)
                        // }
                        // else{
                            //loop through
                            let method = props.selection?.selection?.shippingMethods?.find(m=>m.shippingMethod.indexOf("dhl-standard") > -1)
                            // console.log("change to dhl",method.shippingMethod)
                            if(method)
                                props.changeShippingMethod(method.shippingMethod)
                        // }
                    }
                }) 
            }
            // if(shippingMethod=="store-pickup-antwerp-eur"){
            //     setDefaultCheck(false)
            //     // console.log("store pickup antwerp click",props?.selection?.selection?.selection?.shippingMethod)
            //     let copiedShippingAddress = JSON.parse(JSON.stringify(props.shippingAddressValues))
            //     setBackupShippingAddressValues(copiedShippingAddress)
            //     setBackupSameBillingAddress(props.sameBillingAddress)
            //     setBackupBillingAddressValues(props.billingAddressValues)
            //     setBackupShippingMethod(props?.selection?.selection?.selection?.shippingMethod)
            //     props.updateAddresses(props.shippingAddressValues,props.billingAddressValues,false,{stateCode:"",countryCode:"BE"},"storePickup",props.selection,(bool)=>{
            //         // console.log("changing shipping method to:",shippingMethod)
            //         if(bool)
            //             props.changeShippingMethod(shippingMethod)
            //     })
            // } else if(shippingMethod=="store-pickup-paris-eur"){
            //     setDefaultCheck(false)
            //     // console.log("store pickup paris click",props?.selection?.selection?.selection?.shippingMethod)
            //     let copiedShippingAddress = JSON.parse(JSON.stringify(props.shippingAddressValues))
            //     setBackupShippingAddressValues(copiedShippingAddress)
            //     setBackupSameBillingAddress(props.sameBillingAddress)
            //     setBackupBillingAddressValues(props.billingAddressValues)
            //     setBackupShippingMethod(props?.selection?.selection?.selection?.shippingMethod)
            //     props.updateAddresses(props.shippingAddressValues,props.billingAddressValues,false,{stateCode:"",countryCode:"FR"},"storePickup",props.selection,(bool)=>{
            //         // console.log("changing shipping method to:",shippingMethod)
            //         if(bool)
            //             props.changeShippingMethod(shippingMethod)
            //     })
            // } else {
            //     // console.log("dhl click",shippingMethod)
            //     setDefaultCheck(true)
            //     props.updateAddresses(backupShippingAddressValues,backupBillingAddressValues,backupSameBillingAddress,false,"shippingMethodSelection",props.selection,(bool)=>{
            //         if(bool){
            //             console.log("dhl update address success")
            //             // if(backupShippingMethod){
            //             //     console.log("change to back up",backupShippingMethod)
            //             //     props.changeShippingMethod(backupShippingMethod)
            //             // }
            //             // else{
            //                 //loop through
            //                 let method = props.selection?.selection?.shippingMethods?.find(m=>m.shippingMethod.indexOf("dhl-standard") > -1)
            //                 // console.log("change to dhl",method.shippingMethod)
            //                 if(method)
            //                     props.changeShippingMethod(method.shippingMethod)
            //             // }
            //         }
            //     })
            // }
        }
    }
    // useEffect(()=>{
    //     props.updateAddresses(backupShippingAddressValues,backupBillingAddressValues,backupSameBillingAddress,false,"shippingMethodSelection",props.selection,(bool)=>{
    //         if(bool){
    //             console.log("dhl update address success")
    //                 let method = props.selection?.selection?.shippingMethods?.find(m=>m.shippingMethod.indexOf("dhl-standard") > -1)
    //                 if(method)
    //                     props.changeShippingMethod(method.shippingMethod)
    //         }
    //     })
    // },[])
    // console.log("selection",props?.selection?.selection?.selection?.shippingMethod);
   
    let storePickupOptions = props?.storePickupOptions?.filter(p=>p.enableStorePickUp===true)
    // console.log("storePickupOptions",storePickupOptions)
    // console.log(storePickupOptions)
    return (
        <>  <div className="shippingMethodsWrapper alignLeft">
                <div className="anoRegular font16 selectShippingMethod">{t('selectDeliveryOption')}</div>
                <div className="shippingMethods">
                    {props?.selection?.selection?.shippingMethods.filter(method=>method.shippingMethod.indexOf("store-pickup")==-1).map(method=>{
                        return (
                            <div key={method.shippingMethod} className="shippingMethod font16 cursorPointer" onClick={(e)=>shippingMethodSelect(method.shippingMethod)}>
                                <input type="radio" value={method.shippingMethod} checked={props?.selection?.selection?.selection?.shippingMethod == method.shippingMethod}  className="verticalAlignTop" /> {method.name}
                            </div>
                        )
                    })}
                    {Array.isArray(storePickupOptions) &&  storePickupOptions.map((p)=>{
                        return (
                            <div key={p._key} className="shippingMethod font16 cursorPointer" onClick={(e)=>shippingMethodSelect(p.storePickUpKey,p.countryCode)}>
                            <input type="radio" value={p.storePickUpKey} checked={props?.selection?.selection?.selection?.shippingMethod == p.storePickUpKey}  className="verticalAlignTop" /> {p.storePickupName}
                            <div className="pickupAddress">
                            {p.storeAddressLine1}<br />
                            {p.storeAddressLine2}<br />
                            </div>
                        </div> 
                        )
                    })}
                   
                </div>
            </div>
            <div className="addresses alignLeft">
                {props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") == -1 &&
                    <>
                        <div className="shippingAddress">
                            <div className="anoRegular font16 addressTitle shippingAddressTitle">{t('shippingAddress')}</div>
                            <div className="shippingAddressForm">
                                <AddressForm countryOptions={props.countryOptions} values={props.shippingAddressValues} setValues={props.setShippingAddressValues} setValidationStatus={props.setValidationErrorShipping} type="shipping" />
                            </div>
                        </div>
                        <div className="same anoRegular font16"><input type="checkbox" className="checkbox" defaultChecked={props.sameBillingAddress} onChange={() => props.setSameBillingAddress(!props.sameBillingAddress)}/>{t('billingAddressDesc')}</div>
                    </>
                }
                <div className={`billingAddress ${!props.sameBillingAddress || props?.selection?.selection?.selection?.shippingMethod.indexOf("store-pickup") > -1?"show":""}`}>
                    <div className="anoRegular font16 billingAddressTitle addressTitle">{t('billingAddress')}</div>
                    <div className="billingAddressForm">
                        <AddressForm countryOptions={props.countryOptions} setValues={props.setBillingAddressValues} setValidationStatus={props.setValidationErrorBilling} type="billing"/>
                    </div>
                </div>
                <button onClick={()=>proceed()} className={`btn submit ${props.addressValidationError?"btnInactive":"btnPrimary"} white anoRegular font16-notResponsive cursorPointer`} >{btnContent}</button>
            </div>
            <style jsx>{`
                .shippingAddressForm,.billingAddressForm{
                    margin-top:1rem;
                }
                .same{
                    margin-top:2.8rem;  
                }
                .submit{
                    margin-top:2.8rem;
                    min-width:15rem;
                }
                .billingAddress{
                    display:none;
                }
                .billingAddress.show{
                    display:block;
                }
                .addressTitle{
                    margin-bottom:2.8rem;
                }
                .billingAddressTitle{
                    margin-top:2.8rem;
                }
                .checkbox{
                    vertical-align:top;
                }
                .pickupAddress{
                    margin-top: 0.75rem;
                    margin-left: 2.5rem;
                }
                .shippingMethod{
                    margin-bottom:1rem;
                }
                .selectShippingMethod{
                    margin-bottom:2.4rem;
                }
                .shippingMethodsWrapper{
                    margin-bottom:2.4rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection,common}){
    return {selection,common}
}
export default connect(mapStateToProps,{changeShippingMethod,changeSelectionCountry,updateAddresses})(DeliveryDetails)