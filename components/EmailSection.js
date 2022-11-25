import {useEffect, useRef, useState} from 'react'
import {ADMIN_TOKEN_VAR_NAME} from '../config'
import {UNSAID_API} from '../branch-specific-config'
import Loader from './loader'
import differenceBy from 'lodash/differenceBy'

export default function EmailSection(props) {
    const inputCheckBoxRef = useRef([]);
    const [scenario, setScenario] = useState(null);
    const [stockItems, setStockItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const [orderActivities, setOrderActivities] = useState(props.orderActivity);
    const [errorMsg, setErrorMsg] = useState(null);
    let orderId = props.orderId;
    let allProducts = [];
    let inStockItems = [];
    let outOfStockItems = [];

    function updateArray(){
        for(let i=0; i<props.orderDetails?.items?.length; i++){
            let obj = {};
            obj.productEAN = props.orderDetails?.items[i]?.ean;
            obj.name = props.orderDetails?.items[i]?.name;
            obj.inStock = inputCheckBoxRef?.current[i]?.checked
            allProducts[i] = obj;
        }
        for(let i=0; i<allProducts.length; i++){
            if(allProducts[i].inStock){
                inStockItems.push(allProducts[i]);
            }else{
                outOfStockItems.push(allProducts[i]);
            }
        }
        checkScenario();
    }

    function handleCheckBox(e,id,ean){
        for(let i=0; i<props.orderDetails?.items?.length; i++){
            let obj = {};
            obj.productEAN = props.orderDetails?.items[i]?.ean;
            obj.name = props.orderDetails?.items[i]?.name;
            obj.inStock = inputCheckBoxRef?.current[i]?.checked
            allProducts[i] = obj;
        }
        
        inStockItems = [];
        outOfStockItems = [];
        for(let i=0; i<allProducts.length; i++){
            if(allProducts[i].inStock){
                inStockItems.push(allProducts[i]);
            }else{
                outOfStockItems.push(allProducts[i]);
            }
        }
        checkScenario();
    }

    function checkScenario(){
        // console.log("allProducts",allProducts);
        // console.log("inStockItems",inStockItems);
        // console.log("outOfStockItems",outOfStockItems);
        setStockItems(inStockItems);
        if(inStockItems.length === 0 && outOfStockItems.length > 0) setScenario("outOfStock")
        else if(inStockItems.length > 0 && outOfStockItems.length === 0) setScenario("inStock")
        else setScenario("partialStocks")
    }

    useEffect(()=>{
        updateArray();
    },[])
    
    async function sendEmail(){
        if(stockItems.length>0){
            try{
                setLoader(true);
                setErrorMsg(null);
                let token = localStorage.getItem(ADMIN_TOKEN_VAR_NAME)
                const rawResponse = await fetch(`${UNSAID_API}/api/dashboard/${props.endPoint}`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        token,
                        orderId,
                        stockItems
                    })
                })  
                let data = await rawResponse.json();
                if(rawResponse.status==200){
                    setStockItems([]);
                    setLoader(false);
                    setOrderActivities(data.orderActivityInDb);
                } else {
                    setLoader(false);
                    setErrorMsg("Something went wrong. Try again!");
                }
            } catch(err){
                setLoader(false);
                setErrorMsg("Something went wrong. Try again!");
                // console.log("err",err);
            } 
        }
    }
    
    let reversActivityList = orderActivities?.activities.slice().reverse();
    let stockItemsShipped = reversActivityList?.filter((item)=> item.activityType === props.filter && !!item.activityData.date);

    // console.log("activityList",stockItemsShipped);

    return (
        <>
            <div>
                {loader && <div className='loader'><Loader size={30} color="#787878"/></div>}
                {!!errorMsg && <div className='errorMsg error'>{errorMsg}</div>}
                <div className='shippingEmails mailSection'>
                    <p className="emailsHeading anoRegular font20">{props.heading} :</p>
                    <ul className="listStyleNone">
                        {!!props?.orderDetails?.items && props.orderDetails.items.map((item, index)=>{
                            let mailSentItem = stockItemsShipped?.find(stockItemShipped=>{
                                return stockItemShipped?.activityData?.shippedItems?.find(i=> i.productEAN === item.ean)
                            })
                            return(
                                <>
                                    {!mailSentItem &&
                                        <li key={index}>
                                            <input ref={el => inputCheckBoxRef.current[index] = el} onChange={(e)=>handleCheckBox(e,index,item.ean)} type="checkbox" id={`${props.id}-item${index}`} name={`${props.id}-item${index}`} value={item.ean}/>
                                            <label className="font16" for={`${props.id}-item${index}`}>{item.name} - {item.ean} - (Qty : {item.qty})</label>
                                        </li>
                                    }
                                </>
                            )
                        })}
                    </ul>
                    <details className='dropDownForShippedEmailSent'>
                        <summary className="font16">Items for which mail already been sent.</summary>
                        <ul className="listStyleNone">
                        {!!props?.orderDetails?.items && props.orderDetails.items.map((item, index)=>{
                            let mailSentItem = stockItemsShipped?.find(stockItemShipped=>{
                                return stockItemShipped?.activityData?.shippedItems?.find(i=> i.productEAN === item.ean)
                            })
                            var recentlyShippedEmailDateDetails = new Date(mailSentItem?.activityData?.date); 
                            var recentlyShippedEmailDateAndTime = "Last Sent: " + recentlyShippedEmailDateDetails.getDate() + "/"+ (recentlyShippedEmailDateDetails.getMonth()+1)  + "/" + recentlyShippedEmailDateDetails.getFullYear() + " @ "  + recentlyShippedEmailDateDetails.getHours() + ":"  + recentlyShippedEmailDateDetails.getMinutes() + ":" + recentlyShippedEmailDateDetails.getSeconds();
                            return(
                                <>
                                    {!!mailSentItem &&
                                        <li key={index}>
                                            <input ref={el => inputCheckBoxRef.current[index] = el} onChange={(e)=>handleCheckBox(e,index,item.ean)} type="checkbox" id={`${props.id}-item${index}`} name={`${props.id}-item${index}`} value={item.ean}/>
                                            <label className="font16" for={`${props.id}-item${index}`}>{item.name} - {item.ean} - (Qty : {item.qty}) --------- {recentlyShippedEmailDateAndTime}</label>
                                        </li>
                                    }
                                </>
                            )
                        })}
                    </ul>
                    </details>
                    <div className="emailButtons">
                        <div>
                            <button className={`btn ${stockItems.length>0?"btnSecondary":"btnInactive"} anoRegular`} type="button" onClick={()=>sendEmail()}>{props.buttonLabel}</button>
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
