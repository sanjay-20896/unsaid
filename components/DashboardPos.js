import React, { useState } from 'react'
import {ADMIN_TOKEN_VAR_NAME} from '../config'
import {UNSAID_API} from '../branch-specific-config'
import Loader from "../components/loader"

export default function DashboardPos() {
  const [posOrderId,setPosOrderId] = useState("");
  const [failedMessage,setOrderFetchFailedMessage] = useState("");
  const [orderDetails,setOrderDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [pdfSolutionInvoiceErrMessage,setPdfSolutionInvoiceErrMessage] = useState(null);
  const [pdfSolutionCertificateErrMessage,setPdfSolutionCertificateErrMessage] = useState(null);

  async function getPosOrderDetails(){
    try{
      setLoader(true);
      setOrderFetchFailedMessage("")
      setOrderDetails(null)
      let token=localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
      const rawResponse = await fetch(`${UNSAID_API}/api/pos-dashboard/getPosOrderDetails?token=${token}&orderId=${posOrderId}`,{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      })
      if(rawResponse.status==200){
        setLoader(false);
        let data=await rawResponse.json()
        setOrderDetails(data.orderDetails)
      }else{
        setLoader(false);
        let data=await rawResponse.json();
        throw{message:data?.message}
      }
    }catch(err){
      // console.log("catch error")
      // console.log(err);
      setLoader(false);
      setOrderDetails(null)
      setOrderFetchFailedMessage(`Could not get order - ${err?.message}`)
    }
  }
  async function downloadPosInvoice(){
      setLoader(true);
      setPdfSolutionInvoiceErrMessage(null);
      let token = localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
      let href=`${UNSAID_API}/api/pos-dashboard/getInvoice?orderId=${posOrderId}&token=${token}`
      let response = await fetch(`${UNSAID_API}/api/pos-dashboard/getInvoice?orderId=${posOrderId}&token=${token}`,{
          method: 'GET',
          headers:{
              'Content-Type': 'application/json'
          },
      })
      let data=await response.json();
      if(response.status==200){
          setLoader(false);
          setPdfSolutionInvoiceErrMessage(null);
          download(href,`Invoice-Order-${posOrderId}.pdf`)
      }else{
          setLoader(false);
          setPdfSolutionCertificateErrMessage(!!data?.errMsg ? data.errMsg : "Unable to process.");
      }
  }
  async function downloadPosCertificate(){
    // let token=localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
    // let href=`${UNSAID_API}/api/pos-dashboard/getJewelCertificate?orderId=${posOrderId}&token=${token}`
    // download(href,`JewelCertificate-Order-${posOrderId}.pdf`)
    setLoader(true);
    setPdfSolutionCertificateErrMessage(null);
    let token=localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
    let href=`${UNSAID_API}/api/pos-dashboard/getJewelCertificate?orderId=${posOrderId}&token=${token}`
    let rawResponse= await fetch(`${UNSAID_API}/api/pos-dashboard/getJewelCertificate?orderId=${posOrderId}&token=${token}`,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    })
    let data=await rawResponse.json();
    if(rawResponse.status==200){
        setLoader(false);
        download(href,`JewelCertificate-Order-${posOrderId}.pdf`);
    }else{
        setLoader(false);
        // console.log("data",data);
        setPdfSolutionCertificateErrMessage(!!data?.errMsg ? data.errMsg : "Unable to process.");
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
  async function generatePosInvoiceNumber(){
    try{
      setLoader(true);
      let token=localStorage.getItem(ADMIN_TOKEN_VAR_NAME);
      const rawResponse = await fetch(`${UNSAID_API}/api/pos-dashboard/generateInvoiceNumber?token=${token}&orderId=${posOrderId}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        },
      })
      if(rawResponse.status==200){
        setLoader(false);
        let data=await rawResponse.json()
        setOrderDetails(data)
      }else{
        setLoader(false);
        let data=await rawResponse.json();
        throw{message:data?.message}
      }
    }catch(err){
      setLoader(false);
      // console.log("could not generate invoice number")
      // console.log(err)
    }
  }
  return(
    <>
        <div className='dashboardOnline'>
            <div className="font16 getOrderId">
                <span>Enter order id:</span>
                <input type="text" value={posOrderId} onChange={(e)=>setPosOrderId(e.target.value)}/>
                <button className="btn btnPrimary anoRegular" type="button" onClick={()=>getPosOrderDetails()}>Get Details</button>
            </div>
            <div>{failedMessage}</div>
            {loader && <div className='loader'><Loader size={30} color="#787878"/></div>}
            {!!orderDetails &&
                <div className="orderDetails">
                    <h2 className="orderNo font16"><span className="labelSpan">Order number</span>: {orderDetails.orderId}</h2>
                    {!!orderDetails.invoiceNumber?
                        <div className='font16'>
                            <span className="labelSpan">Invoice number</span>
                            <span className="msgSpan">: {orderDetails.invoiceNumber}</span>
                            <button className='btn btnPrimary anoRegular' type="button" onClick={()=>downloadPosInvoice()}>Download invoice</button>  
                            <span className="error">{pdfSolutionInvoiceErrMessage}</span>
                        </div>
                        :
                        <div className='font16'>
                            <span className="labelSpan">Invoice number</span>
                            <span className="msgSpan">: </span>
                            <button className='btn btnPrimary anoRegular' type="button" onClick={()=>generatePosInvoiceNumber()}>Generate Invoice Number</button>
                        </div>
                    }
                    {!!orderDetails.invoiceNumber?
                        <div className='font16'>
                            <span className="labelSpan">Certificate</span>
                            <span className="msgSpan">: </span>
                            <button className='btn btnPrimary anoRegular' type="button" onClick={()=>downloadPosCertificate()}>Download certificate</button>  
                            <span className="error">{pdfSolutionCertificateErrMessage}</span>
                        </div>
                        :
                        <div className='font16'>
                            <span className="labelSpan">Certificate</span>
                            <span className="msgSpan">: Please generate invoice.</span>
                        </div>
                    }
                </div>
            }
        </div>
        <style>{`
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
