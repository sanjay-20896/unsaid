import { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {UNSAID_API} from '../branch-specific-config'
import {monthNames,dateSuffixes,monthNames_fr} from '../data/staticData'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
function ShipsBy(props){
    const router= useRouter()
    const {t}=useTranslation('common');
    const [stock,setStock] = useState(props.checkStockAvailability)
    function getShipByDate(){
        let daysToAdd = stock?(props?.currentSelectedProduct?.engraving_possible=="1"?props?.common?.globalSettings?.numberOfDaysInStockEngraving:props?.common?.globalSettings?.numberOfDaysInStock):props?.common?.globalSettings?.numberOfDaysNoStock
        let shipByDate = new Date()
        shipByDate.setDate(shipByDate.getDate() + parseInt(daysToAdd))
        let dateSuffix = "th"
        for(let i=0;i<Object.keys(dateSuffixes).length;i++){
            let suffix = Object.keys(dateSuffixes)[i]
            let dateSuffixValues = dateSuffixes[suffix]
            if(dateSuffixValues.includes(shipByDate.getDate())){
                dateSuffix = suffix
                break
            }
        }
        if(router.locale=="fr"){
            return `${monthNames_fr[shipByDate.getMonth()]} ${shipByDate.getDate()}${dateSuffix}`
        }else{
            return `${monthNames[shipByDate.getMonth()]} ${shipByDate.getDate()}${dateSuffix}` 
        }
       
    }
    useEffect(()=>{
        setStock(props.checkStockAvailability) 
    },[props.checkStockAvailability])
    // useEffect(()=>{
    //     if(props.currentSelectedProduct && props.selectedItem && props.common.globalSettings){
    //         getStock()
    //     }
    // },[props.currentSelectedProduct,props.selectedItem,props.common.globalSettings])
    return (
        <>
            <div className="wrapper">
                {stock!="not set" &&
                    <div className="anoRegular ship">
                        <span className="grey smallUnderlineBlack">{t('shipsBy')} {getShipByDate()}, {t('fromOur')} </span> <span className="smallUnderlineBlack">{props.stockLocation}</span>
                    </div>
                }
            </div>
            <style jsx>{`
                span{
                    line-height: 25px;
                    cursor: default;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,{})(ShipsBy)