import { MOBILE_BREAKPOINT,TOKEN_VAR_NAME} from "../config";
import Caret from '../components/caret'
import GiftBoxMenu from '../components/giftBoxMenu'
import { UNSAID_API } from "../branch-specific-config";
import Link from 'next/link'
import {useEffect, useState} from 'react'
import Loader from '../components/loader'
import {removeDecimalZeros} from '../functions'
import useTranslation from 'next-translate/useTranslation'
export default function SingleOrderMenu(props){
    const {t}=useTranslation('common');
    const [invoiceGenerated,setInvoiceGenerated]=useState(false)
    const [downloadingInvoice,setDownloadingInvoice] = useState(false)
    const [downloadingCertificate,setDownloadingCertificate] = useState(false)
    const [checkingInvoiceStatus,setCheckingInvoiceStatus] = useState(true)
    function download(type,url,filename){
        if(type=="invoice")
            setDownloadingInvoice(true)
        if(type=="certificate")
            setDownloadingCertificate(true)
        fetch(url).then((t)=>{
            return t.blob().then((b)=>{
                var a=document.createElement("a");
                a.href=URL.createObjectURL(b);
                a.setAttribute("download",filename);
                a.click()
                if(type=="invoice")
                    setDownloadingInvoice(false)
                if(type=="certificate")
                    setDownloadingCertificate(false)
            })
        })
    }
    async function downloadInvoice(){
        let order=props.orderDetails.order
        let token = localStorage.getItem(TOKEN_VAR_NAME)
        let href=`${UNSAID_API}/api/myUnsaidInvoice?orderId=${order}&token=${token}`
        download("invoice",href,`Invoice-${order}.pdf`)
    }
    async function downloadCertificate(){
        let order=props.orderDetails.order;
        let token=localStorage.getItem(TOKEN_VAR_NAME)
        let href=`${UNSAID_API}/api/myUnsaidCertificate?orderId=${order}&token=${token}`
        download("certificate",href,`JewelCertificate-${order}.pdf`)
    } 
    async function checkIfInvoiceIsGenerated(){
        try{
            setCheckingInvoiceStatus(true)
            let orderId=props.orderDetails.order;
            let response=await fetch(`${UNSAID_API}/api/isInvoiceGenerated?orderId=${orderId}`,{
                method:'GET',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                },
            })
            if(response.status===200){
                let data = await response.json()
                if(data.invoiceGenerated)
                    setInvoiceGenerated(true)
                else
                    setInvoiceGenerated(false)
            }
            else
                setInvoiceGenerated(false)
            setCheckingInvoiceStatus(false)
        } catch(err) {
            setInvoiceGenerated(false)
            setCheckingInvoiceStatus(false)
        }
    }
    useEffect(()=>{
        // console.log("order details change")
        checkIfInvoiceIsGenerated()
    },[props?.orderDetails?.order])
    let downloadInvoiceBtnContent = downloadingInvoice?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('downloadInvoice')
    let downloadCertificateBtnContent = downloadingCertificate?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('downloadCertificate')
    return (
        <>
            <div className="orderDetails">
                <div style={{animationDelay:"0s"}} className={`orderNumber cursorPointer  positionRelative anoRegular font20 black`}>
                    <span className={`orderLabel`}>{props.orderDetails.order}</span>
                </div>
                <div style={{animationDelay:"0.1s"}} className="orderPlaced  anoRegular font16-notResponsive grey">{props.orderDetails.placed}</div>
                {props?.orderDetails?.shipments[0] &&
                    <div style={{animationDelay:"0.3s"}} className="trackOrder cursorPointer  font16 anoRegular">
                        <a style={{marginRight:"0.8rem"}} target="_blank" href={`https://www.dhl.com/in-en/home/tracking/tracking-express.html?submit=1&tracking-id=${props.orderDetails.shipments[0].trackingId}`}>{t('trackYourOrder')}</a>
                        <span><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span>
                    </div>
                }
                <div className="giftBoxesMenu">
                    <GiftBoxMenu order={props.orderDetails}/>
                </div>
                <div className="deliveryDetails anoRegular">
                    <div style={{animationDelay:"0.8s"}} className="deliveryDetailsHeading font16 ">{t('delivery')}</div>
                    <h4 style={{animationDelay:"0.9s"}} className="customerName grey ">{props.orderDetails.shippingAddress.firstName} {props.orderDetails.shippingAddress.lastName} </h4>
                    <h4 style={{animationDelay:"1s"}} className="add1 grey ">{props.orderDetails.shippingAddress.address1}</h4>
                    {props.orderDetails?.shippingAddress?.address2 &&
                        <h4 style={{animationDelay:"1.1s"}} className="add2 grey ">{props.orderDetails.shippingAddress.address2}</h4>
                    }
                    <h4 style={{animationDelay:"1.3s"}} className="country grey ">{props.orderDetails.shippingAddress.countryName}</h4>
                    {props.orderDetails?.shippingAddress?.phoneNumber &&
                        <h4 style={{animationDelay:"1.4s"}} className="telephone grey ">{props.orderDetails.shippingAddress.phoneNumber}</h4>
                    }
                </div>
                <div className="paymentDetails anoRegular">
                    <div style={{animationDelay:"1.5s"}} className="paymentDetailsHeading font16 ">{t('Payment')}</div>
                    <h4 style={{animationDelay:"1.6s"}} className="paymentMethod ">{t('paymentMethod')}</h4>
                    <div style={{animationDelay:"1.7s"}} className="paymentCardNumber ">
                        <h4 style={{animationDelay:"1.4s"}} className="grey ">{props.orderDetails.paymentMethodName}</h4>
                    </div>
                    <h4 style={{animationDelay:"1.8s"}} className="bAdd1 grey ">{props.orderDetails.address.address1}</h4>
                    {props.orderDetails?.address?.address2 &&
                        <h4 style={{animationDelay:"1.9s"}} className="bAdd2 grey ">{props.orderDetails.address.address2}</h4>
                    }
                    {/* <h4 style={{animationDelay:"2s"}} className="bAdd3 grey ">{props.orderDetails.details.billingAdd3}</h4> */}
                    <h4 style={{animationDelay:"2.1s"}} className="billingCountry grey ">{props.orderDetails.address.countryName}</h4>
                    <h4 style={{animationDelay:"2.2s"}} className="emailId ">{t('confirmEmailAddress')}</h4>
                    <h4 style={{animationDelay:"2.3s"}} className="emailAddValue grey ">{props.orderDetails.address.email}</h4>
                    <div style={{animationDelay:"2.4s"}} className="shippingLine ">
                        <h4 className="shippingEx grey">{props.orderDetails.shippingMethodName}</h4>
                        <h4 className="shippingPrice grey">{props.orderDetails.totals.shippingPriceAsNumber==0?t('free'):props.orderDetails.totals.shippingPrice}</h4>
                    </div>
                    <div style={{animationDelay:"2.4s"}} className="shippingLine ">
                        <h4 className="shippingEx grey">{t('sub-total')}</h4>
                        <h4 className="shippingPrice grey">{`${props.orderDetails.totals.grandTotalPrice.substring(0,1)}${removeDecimalZeros((props.orderDetails.totals.itemsTotalPriceAsNumber - props.orderDetails.totals.grandTotalPriceTaxAsNumber).toFixed(2))}`}</h4>
                    </div>
                    <div style={{animationDelay:"2.4s"}} className="shippingLine ">
                        <h4 className="shippingEx grey">{t('Tax')}</h4>
                        <h4 className="shippingPrice grey">{`${props.orderDetails.totals.grandTotalPrice.substring(0,1)}${removeDecimalZeros(props.orderDetails.totals.grandTotalPriceTaxAsNumber.toFixed(2))}`}</h4>
                    </div>
                    {props?.orderDetails?.totals?.totalDiscountPrice &&
                        <div style={{animationDelay:"2.4s"}} className="shippingLine ">
                            <h4 className="shippingEx grey">{t('discount')}</h4>
                            <h4 className="shippingPrice grey">{props?.orderDetails?.totals?.totalDiscountPrice?.substring(0,1)}{removeDecimalZeros(props.orderDetails.totals.totalDiscountPriceAsNumber.toFixed(2))}</h4>
                        </div>
                    }
                    <div style={{animationDelay:"2.5s"}} className="totalPrice ">
                        <h4 className="totalPriceLabel grey">{t('totalWithVAT')}</h4>
                        <div className="priceValue grey font20">{`${props.orderDetails.totals.grandTotalPrice.substring(0,1)}${removeDecimalZeros(props.orderDetails.totals.grandTotalPriceAsNumber.toFixed(2))}`}</div>
                    </div>
                    {invoiceGenerated && !checkingInvoiceStatus && 
                        <>
                            <button  className={`downloadButton  btn btnPrimary anoRegular font20 width-100 alignCenter ${downloadingInvoice?"downloading":""}`} onClick={()=>downloadInvoice()}>{downloadInvoiceBtnContent}</button>
                            <button className={`downloadButton  btn btnPrimary anoRegular font20 width-100 alignCenter ${downloadingCertificate?"downloading":""}`} onClick={()=>downloadCertificate()}>{downloadCertificateBtnContent}</button>
                        </>
                    }
                    <Link href="/contact-us"><a>
                        <div style={{animationDelay:"2.8s"}} className="cursorPointer  alignCenter font16 anoRegular">
                            <span style={{marginRight:"0.8rem"}}>{t('needHelp')}</span>
                            <span><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span>
                        </div>
                    </a></Link>
                </div>
            </div>
            <style jsx>{`
                .downloadButton{
                    margin-bottom:3.2rem;
                }
                .downloadButton.downloading{
                    background:#000000 !important;
                }
                .totalPrice{
                    margin-bottom:4.8rem;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
                .shippingLine, .totalPrice{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
                .orderDetails{
                    padding-bottom:4.8rem;
                }
                .orderNumber{
                    margin-bottom:1.6rem;
                }
                .orderNumber .orderLabel{
                    padding-bottom: 5px;
                }
                .orderPlaced{
                    margin-bottom:0.8rem;
                }
                .giftBoxesMenu{
                    margin-top:4.8rem;
                }
                .deliveryDetails h4, .bAdd1, .bAdd2, .bAdd3, .emailId{
                    margin-bottom:0.8rem;
                }
                .deliveryDetails h4.telephone{
                    margin-bottom:0rem;
                }
                .deliveryDetails{
                    padding-top:2.4rem;
                    padding-bottom:2.4rem;
                    border-bottom:1px solid #787878;
                }
                .deliveryDetailsHeading,.paymentDetailsHeading,.billingCountry,.emailAddValue,.shippingLine{
                    margin-bottom:2.4rem;
                }
                .paymentDetails{
                    padding-top:2.4rem;
                }
                .paymentMethod{
                    margin-bottom:1rem;
                }
                .paymentCardNumber{
                    margin-bottom:2.4rem;
                    display:flex;
                    align-items:center;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .orderNumber{
                        font-size:2rem;
                    }
                }
            `}</style>
        </>
    )
}