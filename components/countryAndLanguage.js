import {connect} from 'react-redux'
import {currencySymbols} from '../data/menuBar'
import {gettingSelection,storeSelection,fetchBundledProduct} from '../redux/actions'
import {TOKEN_VAR_NAME} from '../config'
import {ECOMMERCE_URI} from '../branch-specific-config'
import Caret from './caret'
function CountryAndLanguage(props){
    function getBundleProductsAndStoreInCache(selection){
        if(Array.isArray(selection?.selection?.items)){
            selection.selection.items.forEach(lineItem=>{
                let bundle = lineItem?.product?.product
                if(!!bundle){
                    if(!props.gifting.bundle[bundle])
                        props.fetchBundledProduct(bundle)
                }
            })
        }   
    }
    async function handleCountryChange(country){
        try{
            props.gettingSelection(true);
            const token=localStorage.getItem(TOKEN_VAR_NAME);
            const rawResponse=await fetch(`${ECOMMERCE_URI}/countries/${country}`,{
                method:'PUT',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if(rawResponse.status==200){
                // console.log('country changed')
                let selection = await rawResponse.json();
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                //if selection items are bundles, fetch products and store in cache
                getBundleProductsAndStoreInCache(selection)
                props.storeSelection(selection)
            } else {
                // console.log('could not change country')
                // console.log(rawResponse.status)
            }
            props.gettingSelection(false);
        } catch(err) {
            // console.log(err)
            props.gettingSelection(false)
        }
    }
    return (
        <>
            <div className="countryAndLanguage">
                <select className={`${props.fontClass?props.fontClass:""}`}  value={props?.selection?.selection?.location?.country} onChange={(e)=>handleCountryChange(e.target.value)} autoComplete="off">
                    {props?.selection?.selection?.countries?.map(country=>{
                        return <option key={country.country} value={country.country}>{country.name} - {country.currency} {currencySymbols[country.currency]?currencySymbols[country.currency]:""}</option>
                    })}
                </select>
                {!!props?.caret && <span className="caret"><Caret marginBottom={props.CaretMarginBottom} color={!!props?.caretColor ?props.caretColor:"black"} direction="down" width="0.1rem" length="0.6rem"/></span>}
            </div>
            <style jsx>{`
                select{
                    width:100%;
                    font-family:anoRegular, sans-serif;
                }
                .countryAndLanguage{
                    display: flex;
                }
                .countryAndLanguage .caret{
                    margin-left: 10px;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection,gifting}){
    return {selection,gifting}
}
export default connect(mapStateToProps,{gettingSelection,storeSelection,fetchBundledProduct})(CountryAndLanguage)