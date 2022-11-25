import { useEffect, useState } from "react"
import { TOKEN_VAR_NAME } from "../config"
import { ECOMMERCE_URI } from "../branch-specific-config"
import  {storeSelection} from '../redux/actions'
import {connect} from 'react-redux'
import Input from '../components/input'
import useTranslation from 'next-translate/useTranslation'
function Promotions(props){
    const {t}=useTranslation('common');
    const [discountCodeError,setDiscountCodeError] = useState(false)
    const [discountCodeApplied,setDiscountCodeApplied] = useState(false)
    const [giftCertError,setGiftCertError] = useState(false)
    const [giftCertApplied,setGiftCertApplied] = useState(false)
    const [discountCode,setDiscountCode] = useState("")
    const [giftCertCode,setGiftCertCode] = useState("")
    let applyDiscountCodeTimer = null
    let applyGiftCertTimer = null
    async function remove(code){
        try{
            const token = localStorage.getItem(TOKEN_VAR_NAME)
            let rawResponse = await fetch(`${ECOMMERCE_URI}/vouchers`, {
                method: 'DELETE',
                headers: {
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "voucher":code
                })
            })
            if(rawResponse.status==200){
                let selection = await rawResponse.json();
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                props.storeSelection(selection)
                // console.log(`${type} code removed`)
            } 
        } catch(err) {
            console.log(err)  
        }
    }
    async function removePromotion(type){
        let codes = []
        if(type=="voucher"){
            //remove all discount codes
            codes = props.selection.selection.selection.discounts.vouchers.filter(voucher=>voucher.voucher.indexOf("GC")==-1)
        } else {
            codes = props.selection.selection.selection.discounts.vouchers.filter(voucher=>voucher.voucher.indexOf("GC")>-1)
        }
        codes.forEach(code=>{
            remove(code.voucher)
        })
    }
    async function applyCode(code,type){
        // console.log('apply code',code)
        removePromotion(type)
        try{
            const token = localStorage.getItem(TOKEN_VAR_NAME)
            let rawResponse = await fetch(`${ECOMMERCE_URI}/vouchers`, {
                method: 'POST',
                headers: {
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "voucher":code
                })
            })
            // console.log("rawResponse",rawResponse.status);
            if(rawResponse.status==201){
                let selection = await rawResponse.json();
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                props.storeSelection(selection)
                type=="voucher"?setDiscountCodeError(false):setGiftCertError(false)
                type=="voucher"?setDiscountCodeApplied(true):setGiftCertApplied(true)
            } else {
                type=="voucher"?setDiscountCodeError(t('invalidCode')):setGiftCertError(t('invalidCode'))
                // type=="voucher"?setDiscountCodeApplied(false):setGiftCertApplied(false)
                // if((type=="voucher" && discountCodeApplied) || (type=="giftcard" && giftCertApplied))
                removePromotion(type)
                // console.log(rawResponse.status)
                // console.log(await rawResponse.json())
            }
        } catch(err) {
            type=="voucher"?setDiscountCodeError(t('invalidCode')):setGiftCertError(t('invalidCode'))
            // type=="voucher"?setDiscountCodeApplied(false):setGiftCertApplied(false)
            // if((type=="voucher" && discountCodeApplied) || (type=="giftcard" && giftCertApplied))
                    removePromotion(type)
            // console.log(err)
        }
    }
    function codeChange(val,type){
        type=="voucher"?clearTimeout(applyDiscountCodeTimer):clearTimeout(applyGiftCertTimer)
        type=="voucher"?setDiscountCode(val):setGiftCertCode(val)
        type=="voucher"?localStorage.setItem("voucher",val):localStorage.setItem("giftcard",val)
        if(val){
            if(type=="voucher"){
                if(!val.startsWith("GC")){
                    applyCode(val,type)
                    // applyDiscountCodeTimer = setTimeout(()=>{
                    // },2000)
                }else{
                    setDiscountCodeError(t('invalidCode'))
                }
            } else {
                if(val.startsWith("GC")){
                    applyCode(val,type)
                    // applyGiftCertTimer = setTimeout(()=>{
                    // },2000)
                }else{
                    setGiftCertError(t('invalidCode'))
                }
            }
        } else {
            type=="voucher"?setDiscountCodeError(false):setGiftCertError(false)
            // type=="voucher"?setDiscountCodeApplied(false):setGiftCertApplied(false)
            // if((type=="voucher" && discountCodeApplied) || (type=="giftcard" && giftCertApplied))
                removePromotion(type)    
            setTimeout(() => {
            }, 2000);
        }
    }
    // useEffect(()=>{
    //     props?.selection?.selection?.selection?.discounts?.vouchers?.forEach(voucher=>{
    //         const token = localStorage.getItem(TOKEN_VAR_NAME)
    //         fetch(`${ECOMMERCE_URI}/vouchers`, {
    //             method: 'DELETE',
    //             headers: {
    //             'Accept': `*/*; api-token: ${token}`,
    //             'Content-Type': 'application/json'
    //             },
    //             body:{
    //                 "voucher":voucher.voucher
    //             }
    //         })
    //     })
    // },[props?.selection?.selection?.selection?.discounts?.vouchers])
    useEffect(()=>{
        let voucher = localStorage.getItem("voucher")
        let giftcard = localStorage.getItem("giftcard")
        if(voucher)
            codeChange(voucher,"voucher")
        if(giftcard)
            codeChange(giftcard,"giftcard")
    },[])
    return (
        <>
            <div className="inputs">
                <div><Input type="text" value={discountCode} onChangeValue={(e)=>codeChange(e.target.value,"voucher")} placeHolder={t('discountCode')} valid={discountCodeApplied} error={!!discountCodeError} errorMsg={discountCodeError} /></div>
                <div><Input type="text" value={giftCertCode} onChangeValue={(e)=>codeChange(e.target.value,"giftcard")} placeHolder={t('giftCard')} valid={giftCertApplied} error={!!giftCertError} errorMsg={giftCertError} /></div>
            </div>
            <style jsx>{`
                .inputs{
                    display:flex;
                    margin-right:-2.4rem;
                    margin-bottom:2.4rem;
                }
                .inputs div{
                    width:50%;
                    padding-right:2.4rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,{storeSelection})(Promotions)