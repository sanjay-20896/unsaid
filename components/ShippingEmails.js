import {useEffect, useRef, useState} from 'react'
import {ADMIN_TOKEN_VAR_NAME} from '../config'
import {UNSAID_API} from '../branch-specific-config'
import Loader from '../components/loader'
import differenceBy from 'lodash/differenceBy'
import EmailSection from './EmailSection'

export default function ShippingEmails(props) {
    const [loader, setLoader] = useState(false);
    const [orderActivities, setOrderActivities] = useState(props.orderActivity);
    const [errorMsg, setErrorMsg] = useState(null);
    async function sendMarketingEmail(){
        try{
            setLoader(true);
            setErrorMsg(null);
            let token = localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
            const rawResponse = await fetch(`${UNSAID_API}/api/dashboard/marketingEmail`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    token,
                    orderId,
                })
            })  
            let data = await rawResponse.json();
            if(rawResponse.status==200){
                setLoader(false);
                setOrderActivities(data.orderActivityInDb);
            } else {
                setLoader(false);
                setErrorMsg("Something went wrong. Try again!");
                // console.log("outside");
            }
        } catch(err){
            setLoader(false);
            setErrorMsg("Something went wrong. Try again!");
            // console.log("err",err);
        } 
    }
    
    let reversActivityList = orderActivities?.activities.slice().reverse();

    let recentlySentMarketingEmailDetails = reversActivityList?.find((item)=> item.activityType === "Marketing Email" && !!item.activityData.date);
    var recentlySentMarketingEmailDateDetails = new Date(recentlySentMarketingEmailDetails?.activityData?.date); 
    var recentlySentMarketingEmailDateAndTime = "Last Sent: " + recentlySentMarketingEmailDateDetails.getDate() + "/"+ (recentlySentMarketingEmailDateDetails.getMonth()+1)  + "/" + recentlySentMarketingEmailDateDetails.getFullYear() + " @ "  + recentlySentMarketingEmailDateDetails.getHours() + ":"  + recentlySentMarketingEmailDateDetails.getMinutes() + ":" + recentlySentMarketingEmailDateDetails.getSeconds();
    return (
        <>
            <div>
                {loader && <div className='loader'><Loader size={30} color="#787878"/></div>}
                {!!errorMsg && <div className='errorMsg error'>{errorMsg}</div>}
                {!!props?.orderDetails && props.orderDetails.deliveryMethod==="Store Pickup" && 
                    <EmailSection {...props} heading="Order Available for Pickup" buttonLabel="Send Email" endPoint="sendSPEmail" id="sp" filter="Store Pickup"/>
                }
                {!!props?.orderDetails && props.orderDetails.deliveryMethod==="DHL Standard" && 
                    <EmailSection {...props} heading="Shipping Emails" buttonLabel="Send Shipping Email" endPoint="sendOrderShippedEmail" id="os" filter="Shipped Email"/>
                }
                {/* <EmailSection {...props} heading="Shipping Emails" buttonLabel="Send Shipping Email" endPoint="sendOrderShippedEmail" id="os" filter="Shipped Email"/> */}
                <EmailSection {...props} heading="Production Started Emails (Please send after 72 hrs)" buttonLabel="Send Production Started Email" endPoint="productionStartedEmail" id="ps" filter="Production Started"/>
                <EmailSection {...props} heading="Production Update Emails (Please send after 3 weeks)" buttonLabel="Send Production Update Email" endPoint="productionOngoingEmail" id="pu" filter="Production Ongoing Update"/>
                <div className='productionStartedEmails mailSection'>
                    <p className="emailsHeading anoRegular font20">Marketing Emails :</p>
                    <div className="emailButtons">
                        <div>
                            <button className='btn btnSecondary anoRegular' type="button" onClick={()=>sendMarketingEmail()}>{!!recentlySentMarketingEmailDetails?"Resend":"Send"} Marketing Email</button>
                            {!!recentlySentMarketingEmailDetails && <span>{recentlySentMarketingEmailDateAndTime}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .mailSection{
                    margin-bottom: 5rem;
                }
                .mailSection > ul{
                    margin-top: 2rem;
                }
                .emailButtons{
                    padding: 2rem 0 0 4rem;
                }
                .dropDownForShippedEmailSent{
                    padding-left: 4rem;
                    margin-top: 2rem;
                }
                .errorMsg{
                    position: absolute;
                    top: 23px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                span{
                    font-size: 14px;
                }
                .loader{
                    position: fixed;
                    top: 50%;
                    left: 10%;
                }
                .emailButtons button{
                    margin-bottom: 1rem;
                    min-width: 38rem;
                }
                .selectHeading{
                    margin-bottom: 2rem;
                }
                ul li{
                    margin-bottom: 1rem;
                }
                ul li:last-child{
                    margin-bottom: 0rem;
                }
                input{
                    margin: 0 10px 0 0;
                    cursor: pointer;
                }
                label{
                    cursor: pointer;
                }
            `}</style>
        </>
    )
}
