import React, { useState } from 'react'
import {ADMIN_TOKEN_VAR_NAME} from '../config'
import {UNSAID_API} from '../branch-specific-config'
import Loader from "../components/loader"
import Expandable from './expandable2'
import ShippingEmails from './ShippingEmails'
import MarketingEmails from "./MarketingEmails"

export default function DashboardOnline() {
    const [orderId,setOrderId] = useState("");
    const [failedMessage,setOrderFetchFailedMessage] = useState("");
    const [orderDetails,setOrderDetails] = useState(null);
    const [orderInfo,setOrderInfo] = useState(null);
    const [loader, setLoader] = useState(false);
    const [pdfSolutionInvoiceErrMessage,setPdfSolutionInvoiceErrMessage] = useState(null);
    const [pdfSolutionCertificateErrMessage,setPdfSolutionCertificateErrMessage] = useState(null);
    const [showShippingEmails, setShowShippingEmails] = useState(false);

    async function getOrderDetails(){
        try{
            setLoader(true);
            setOrderFetchFailedMessage("");
            setOrderDetails(null);
            let token = localStorage.getItem(ADMIN_TOKEN_VAR_NAME);
            const rawResponse = await fetch(`${UNSAID_API}/api/dashboard/getOrderDetails`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    token,
                    orderId
                })
            })    
            if(rawResponse.status==200){
                let data = await rawResponse.json()
                // console.log(data)
                // console.log("data",data)
                let productInactive = data?.orderDetails?.orderInfo?.items.find((item)=> item?.name==undefined);
                if(!!productInactive){
                    setLoader(false)
                    setOrderDetails(null)
                    setOrderFetchFailedMessage(`Sorry, Some of the ordered product/s are now Inactive.`)
                }else{
                    setLoader(false)
                    setOrderDetails(data.orderDetails)
                    setOrderInfo(data.orderDetails.orderInfo)
                }
            } else {
                setLoader(false)
                let data = await rawResponse.json()
                throw {message:data?.message}
            }
        } catch(err){
            // console.log('catch error')
            // console.log(err)
            setLoader(false)
            setOrderDetails(null)
            setOrderFetchFailedMessage(`Could not get order: ${err?.message}`)
        }
    }
    async function generateInvoiceNumber(){
        try{
            setLoader(true);
            let token = localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
            const rawResponse = await fetch(`${UNSAID_API}/api/dashboard/generateInvoiceNumber`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    token,
                    orderId
                })
            })    
            if(rawResponse.status==200){
                setLoader(false);
                let data = await rawResponse.json()
                // console.log("generated invoice number",data.orderDetails)
                setOrderDetails(data.orderDetails)
            } else {
                setLoader(false);
                let data = await rawResponse.json()
                throw {message:data?.message}
            }
        } catch(err){
            setLoader(false);
          // console.log('could not generate invoice number')
          // console.log(err)
        }
    }
    async function downloadInvoice(){
        setLoader(true);
        setPdfSolutionInvoiceErrMessage(null);
        let token = localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
        let href=`${UNSAID_API}/api/dashboard/generateInvoice?orderId=${orderId}&token=${token}`
        let response = await fetch(`${UNSAID_API}/api/dashboard/generateInvoice?orderId=${orderId}&token=${token}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        if(response.status==200){
            setLoader(false);
            setPdfSolutionInvoiceErrMessage(null);
            download(href,`Invoice-Order-${orderId}.pdf`)
        }else{
            setLoader(false);
            setPdfSolutionInvoiceErrMessage("Unable to process the order.")
        }
    }
    async function downloadCertificate(){
        setLoader(true);
        let token=localStorage.getItem(ADMIN_TOKEN_VAR_NAME);
        let href=`${UNSAID_API}/api/dashboard/generateJewelCertificate?orderId=${orderId}&token=${token}`
        let rawResponse= await fetch(`${UNSAID_API}/api/dashboard/generateJewelCertificate?orderId=${orderId}&token=${token}`,{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json'
          },
        })
        if(rawResponse.status==200){
            setLoader(false);
            download(href,`JewelCertificate-Order-${orderId}.pdf`)
        }else{
            setLoader(false);
            setPdfSolutionCertificateErrMessage("Unable to process.")
        }
    }
    function download(url,filename){
        fetch(url).then((t)=>{
            return t.blob().then((b)=>{
                var a=document.createElement("a");
                a.href=URL.createObjectURL(b);
                a.setAttribute("download",filename);
                a.click()
            })
        })
    }
    function timeDifference(date1,date2) {
        var difference = date1.getTime() - date2.getTime();
    
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24
    
        var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60
    
        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60
    
        var secondsDifference = Math.floor(difference/1000);
    
        // console.log('difference = ' + 
        //   daysDifference + ' day/s ' + 
        //   hoursDifference + ' hour/s ' + 
        //   minutesDifference + ' minute/s ' + 
        //   secondsDifference + ' second/s ');

        if(daysDifference>0){
            return daysDifference + ' day/s ago'
        }else if(hoursDifference>0){
            return hoursDifference + ' hour/s ago'
        }else if(minutesDifference>0){
            return minutesDifference + ' minute/s ago'
        }else{
            return secondsDifference + ' second/s ago'
        }
    }
    // console.log("orderDetails",orderDetails);
    let orderPlacedActivity = orderDetails?.orderActivity?.activities?.find((item)=> item.activityType === "Order Confirmation" && !!item.activityData.date);
    var orderPlacedDataVal = new Date(orderPlacedActivity?.activityData?.date); 
    var orderPlacedDataAndTime = orderPlacedDataVal.getDate() + "/"+ (orderPlacedDataVal.getMonth()+1)  + "/" + orderPlacedDataVal.getFullYear() + " @ "  + orderPlacedDataVal.getHours() + ":"  + orderPlacedDataVal.getMinutes() + ":" + orderPlacedDataVal.getSeconds();
    let date2 = orderPlacedActivity?.activityData?.date;
    let date1 = Date.now();
    let timeDiff = timeDifference(new Date(date1),new Date(date2));
  return (
    <>
        <div className='dashboardOnline'>
            <div className="font16 getOrderId">
                <span>Enter order id:</span>
                <input type="text" value={orderId} onChange={(e)=>setOrderId(e.target.value)}/>
                <button className="btn btnSecondary anoRegular" type="button" onClick={()=>getOrderDetails()}>Get Details</button>
            </div>
            <div style={{marginTop: "30px"}} className='error'>{failedMessage}</div>
            {loader && <div className='loader'><Loader size={30} color="#787878"/></div>}
            {!!orderDetails &&
                <div className="orderDetails">
                    <h2 className="orderNo font16"><span className="labelSpan">Order number</span>: {orderDetails.orderId}</h2>
                    {!!orderDetails.invoiceNumber?
                        <div className='font16'>
                            <span className="labelSpan">Invoice number</span>
                            <span className="msgSpan">: {orderDetails.invoiceNumber}</span>
                            <button className='btn btnSecondary anoRegular' type="button" onClick={()=>downloadInvoice()}>Download invoice</button>  
                            <span className="error">{pdfSolutionInvoiceErrMessage}</span>
                        </div>
                        :
                        <div className='font16'>
                            <span className="labelSpan">Invoice number</span>
                            <span className="msgSpan">: </span>
                            <button className='btn btnSecondary anoRegular' type="button" onClick={()=>generateInvoiceNumber()}>Generate Invoice Number</button>
                        </div>
                    }
                    {!!orderDetails.invoiceNumber?
                        <div className='font16'>
                            <span className="labelSpan">Certificate</span>
                            <span className="msgSpan">: </span>
                            <button className='btn btnSecondary anoRegular' type="button" onClick={()=>downloadCertificate()()}>Download certificate</button>  
                            <span className="error">{pdfSolutionCertificateErrMessage}</span>
                        </div>
                        :
                        <div className='font16'>
                            <span className="labelSpan">Certificate</span>
                            <span className="msgSpan">: Please generate invoice.</span>
                        </div>
                    }
                    {!!orderPlacedActivity && !!orderPlacedDataVal && !!orderPlacedDataAndTime &&
                        <div className='font16'>
                            <span className="">Order Placed Date and Time: </span>
                            <span className="">{orderPlacedDataAndTime} ({!!timeDiff && timeDiff})</span>
                        </div>
                    }
                    <div className="manageEmailsSection">
                        <Expandable headingFont="anoRegular" headingSmallMobile={true} content={<ShippingEmails orderId={orderDetails.orderId} orderActivity={!!orderDetails?.orderActivity ? orderDetails.orderActivity : null} orderDetails={orderInfo}/>} expand={showShippingEmails} setExpand={(bool)=>setShowShippingEmails(bool)} heading="Manage Emails" borderBottom={true} />
                    </div>
                </div>
            }
            
        </div>
        <style>{`
            .manageEmailsSection{
                padding-top: 10rem;
                margin-bottom: 4rem;
            }
            .orderDetails > *{
                margin-bottom: 1rem;
            }
            .loader{
                position: absolute;
                top: 11rem;
                left: 50%;
                transform: translateX(-50%);
            }
            .msgSpan{
                width: 20rem;
                display: inline-block;
            }
            .labelSpan{
                width: 13rem;
                display: inline-block;
                white-space: nowrap;
            }
            .orderDetails{
                margin-top: 5rem;
            }
            .getOrderId span{
                margin-right: 10px;
            }
            .getOrderId input{
                border: 1px solid black;
                padding: 10px;
                font-size: 16px;
                margin: 0 10px;
            }
            .getOrderId button, .orderDetails button{
                font-size: 16px;
                padding: 0.5rem 3.2rem;
                margin-right: 1rem;
            }
        `}</style>
    </>
  )
}
