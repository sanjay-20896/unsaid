import {MOBILE_BREAKPOINT,TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI } from '../branch-specific-config'
import Caret from '../components/caret'
import { useEffect, useState } from 'react'
import Loader from '../components/loader'
import {getReadableDate} from '../functions'
import {connect} from 'react-redux'
import {fetchBundledProduct} from '../redux/actions'
import useTranslation from 'next-translate/useTranslation'
function MyOrders(props){
    const {t}=useTranslation('common');
    const [orders,setOrders] = useState(null)
    const [ordersError,setOrdersError] = useState(true)
    const [ordersLoading,setOrdersLoading] = useState(false)
    async function fetchOrders(){
        try {
            setOrdersLoading(true)
            setOrdersError(false)
            let token = localStorage.getItem(TOKEN_VAR_NAME)
            const rawResponse = await fetch(`${ECOMMERCE_URI}/orders`,{
                method:'POST',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(rawResponse.status==200){
                let data = await rawResponse.json()
                if(Array.isArray(data.orders)){
                    setOrders(data.orders)
                    for(let i=0;i<data.orders.length;i++){
                        data.orders[i].items.forEach(lineItem=>{
                            let bundle = lineItem?.item?.split("-")[0]
                            if(!!bundle){
                                if(!props.gifting.bundle[bundle]){ 
                                    props.fetchBundledProduct(bundle)
                                }
                            }
                        })
                    }
                }
            }else{
                throw "order fetch status not 200"
            }
            setOrdersLoading(false)
        } catch (error) {
            // console.log(error)
            setOrdersError(true)
            setOrdersLoading(false)
        }
    }
    useEffect(()=>{
        fetchOrders()
    },[])
    function mouseEnterOrClick(index,order){
        if(props.ordersIndex!=index){
            props.setTier3Mobile(true)
            props.setOrdersIndex(index)
            props.orderDataSet(order)  
        }
    }
    return (
        <>
            <div className="signIn loggedIn">
                <h1 className="greet canelaThin font20 ">{t('ordersAndPurchases')}</h1>
                <div className="signInContent anoHalfRegular font16 ">{t('ordersDesc')} <a className="email" href="mailto:hello@unsaid.com">hello@unsaid.com</a></div>
                {!ordersLoading && !ordersError && !!orders &&
                    <div className="ordersList">
                        <div className="orderHeadings "> 
                            <h1 className="orderWhere online black underlineLR active anoRegular font16">{t('onlineOrders')}</h1>
                        </div>
                        {!!orders.length>0 ?
                            <div className="listOfOrders">
                                {orders.map((order,index)=>{
                                    return(
                                        <div key={index} className={`singleOrder  ${props.ordersIndex===index?"activeOrder":""}`}>
                                            <div onClick={()=>mouseEnterOrClick(index,order)} onMouseEnter={()=>mouseEnterOrClick(index,order)} className={`orderNumber positionRelative anoRegular font16-notResponsive grey`}>
                                                <span className={`orderLabel underlineLR ${props.ordersIndex===index?"active black":""}`}>{t('order')} #{order.order}</span>
                                                <span className="orderArrow"><Caret color="black" direction="right" width="0.1rem" length="0.7rem" marginBottom="0.2rem"/></span>
                                            </div>
                                            <h4 className="orderPlaced anoRegular grey">{getReadableDate(order.date)}</h4>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className="canelaThin msg">{t('noOnlineOrders')}</div>
                        }
                    </div>
                }
                {ordersLoading &&
                    <div className="fullHeightVerticalCenter2 alignCenter">
                        <Loader type="dots" size={8} color="#787878"/>
                    </div>
                }
                {ordersError &&
                    <div className="anoHalfRegular font16 error">{t('ordersFetchFail')}</div>
                }
            </div>
            <style jsx>{`
                .email{
                    text-decoration:underline;
                }
                .msg{
                    font-size:1.8rem;
                }
                .loggedIn .signInContent{
                    margin-bottom:4.8rem;
                }
                .greet{
                    margin-bottom:1.6rem;
                }
                .orderHeadings{
                    display:flex;
                    margin-bottom:3.6rem;
                }
                .orderHeadings .orderWhere{
                    cursor:pointer;
                }
                .orderHeadings .orderWhere.online{
                    margin-right:2.4rem;
                }
                .singleOrder{
                    margin-bottom:2.4rem;
                }
                .activeOrder .shippedDate{
                    color:#000000;
                }
                .orderNumber{
                    cursor:pointer;
                    
                }
                .orderNumber, .orderPlaced{
                    margin-bottom:0.8rem;
                }
                .orderNumber .orderLabel{
                    padding-bottom: 5px;
                }
                .orderArrow{
                    position:absolute;
                    right:0;
                    top:0;
                }
                .activeOrder .shippedDate{
                    color:#000000;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .loggedIn .signInContent{
                        letter-spacing: 0.5px;
                        margin-bottom:3.2rem;
                    }
                    .greet{
                        font-size:2rem;
                        margin-bottom:0.8rem;
                    }
                    .orderHeadings{
                        margin-bottom:3.2rem;
                    }
                    .orderArrow{
                        right:1px;
                    }
                } 
            `}</style>
        </>
    )
}
function mapStateToProps({gifting}){
    return {gifting}
}
export default connect(mapStateToProps,{fetchBundledProduct})(MyOrders)