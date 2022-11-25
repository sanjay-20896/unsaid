import {useEffect, useRef, useState} from 'react'
import {ADMIN_TOKEN_VAR_NAME} from '../config'
import {UNSAID_API} from '../branch-specific-config'
import Loader from '../components/loader'
import differenceBy from 'lodash/differenceBy'

export default function ShippingEmails(props) {
    const [loader, setLoader] = useState(false);
    const [orderActivities, setOrderActivities] = useState(props.orderActivity);
    const [errorMsg, setErrorMsg] = useState(null);
    let orderId = props.orderId;
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
          // console.log('order shipped email send error')
          // console.log(err)
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
                <div className="emailButtons">
                    <div>
                        <button className='btn btnSecondary anoRegular' type="button" onClick={()=>sendMarketingEmail()}>{!!recentlySentMarketingEmailDetails?"Resend":"Send"} Marketing Email</button>
                        {!!recentlySentMarketingEmailDetails && <span>{recentlySentMarketingEmailDateAndTime}</span>}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .errorMsg{
                    position: absolute;
                    top: 23px;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .emailButtons{
                    padding: 0rem 0 0 4rem;
                }
                span{
                    font-size: 14px;
                }
                .loader{
                    position: absolute;
                    top: 1.5rem;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .emailButtons button{
                    margin-bottom: 1rem;
                    min-width: 38rem;
                }
            `}</style>
        </>
    )
}
