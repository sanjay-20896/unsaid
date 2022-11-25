import AddressForm from '../components/addressForm'
import Loader from './loader'
import {connect} from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

function CheckoutAddress(props){
    const {t}=useTranslation('common')
    let shippingCountries = props?.selection?.selection?.countries?props.selection.selection.countries:[]
    let countryOptions = shippingCountries.map(country=>{
        return {label:country.name,value:country.country,states:country.states}
    })
    let btnContent = props.common.changingCountry?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:"Next"
    async function proceedToShipping(){
        if(!props.addressValidationError && !props.common.changingCountry){
            props.next()
        }
    }
    return (
        <>
            <div className="addresses alignLeft">
                <div className="shippingAddress">
                    <div className="anoRegular font16 addressTitle shippingAddressTitle">{t('shippingAddress')}</div>
                    <div className="shippingAddressForm">
                        <AddressForm countryOptions={countryOptions} setValues={props.setShippingAddressValues} setValidationStatus={props.setValidationErrorShipping} type="shipping" />
                    </div>
                </div>
                <div className="same anoRegular font16"><input type="checkbox" className="checkbox" defaultChecked={props.sameBillingAddress} onChange={() => props.setSameBillingAddress(!props.sameBillingAddress)}/>{t('billingAddressDesc')}</div>
                <div className={`billingAddress ${props.sameBillingAddress?"":"show"}`}>
                    <div className="anoRegular font16 billingAddressTitle addressTitle">{t('billingAddress')}</div>
                    <div className="billingAddressForm">
                        <AddressForm countryOptions={countryOptions} setValues={props.setBillingAddressValues} setValidationStatus={props.setValidationErrorBilling} type="billing"/>
                    </div>
                </div>
                <button onClick={()=>proceedToShipping()} className={`btn submit ${props.addressValidationError?"btnInactive":"btnPrimary"} white anoRegular font16-notResponsive cursorPointer`} >{btnContent}</button>
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
            `}</style>
        </>
    )
}
function mapStateToProps({selection,common}){
    return {selection,common}
}
export default connect(mapStateToProps,null)(CheckoutAddress)