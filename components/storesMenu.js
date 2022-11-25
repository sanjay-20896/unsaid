
import {connect} from 'react-redux'
import {setActiveTier2Item,setPanelThreeData,showExploreMenu} from '../redux/actions'
import ImageAndTextMenu from './imageAndTextMenu'
import {MOBILE_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,MEDIUM_BREAKPOINT,IPAD_BREAKPOINT} from '../config'
import {storeTimings} from '../data/menuBar'
import { useState,useEffect } from 'react'
import Caret from './caret'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import {getImageUrl} from "../functions"
function StoresMenu(props){
    const {t}=useTranslation('common');
    const [firstTab, setFirstTab] = useState("");
    const [secondTab, setSecondTab] = useState("");
    const [showTimings, setShowTimings] = useState(null);
    let storeTimings = props.storeDetails.storeTimings
    var currentdate = new Date();
    let dayValue = currentdate.getDay();
    var time = new Date();
    let hour = parseInt(time.toLocaleString('en-US', { hour: 'numeric', hour12: false }))
    let today = storeTimings.filter(day => day.dayId == dayValue);
    console.log("today",today);
    console.log("storeTimings",storeTimings)
    let num = 1;
    let nextDay;
    nextDayUpdate(num);
    function nextDayUpdate(num){
        if(dayValue+num >= 7){
            nextDay = storeTimings.filter(day => day.dayId == num-1);
        }else{
            nextDay = storeTimings.filter(day => day.dayId == dayValue+num);
        }
        checkStoreClosed();
    }
    function checkStoreClosed(){
        if(!!nextDay[0]?.closed && nextDay[0]?.closed){
            num++;
            // nextDayUpdate(num)
        }
    }

    let openFormat = 0;
    let closeFormat = 0;
    if(!!today[0]?.open && today[0]?.open.split(" ")[1] == "PM"){
        openFormat = 12;
    }
    if(!!today[0]?.close && today[0]?.close.split(" ")[1] == "PM"){
        closeFormat = 12;
    }
    useEffect(() => {
        function notClosed(){
            if(hour >= parseInt(today[0].open.split(" ")[0])+openFormat && hour < parseInt(today[0].close.split(" ")[0])+closeFormat){
                setFirstTab(t('open'));
                setSecondTab(`- ${t('closes')} ${today[0]?.close}`)
            }else if(hour < parseInt(today[0].open.split(" ")[0])+openFormat && hour < parseInt(today[0].close.split(" ")[0])+closeFormat){
                setFirstTab(t('closed'));
                setSecondTab(`- ${t('opensAt')} ${today[0]?.open}`)
            }else{
                if(!!nextDay[0]?.closed && nextDay[0]?.closed){
                    setFirstTab(nextDay[0].closedDescription);    
                    setSecondTab("")
                }else{
                    setFirstTab(t('closed'));
                    setSecondTab(`- ${t('opensAt')} ${nextDay[0]?.open}`)
                }
            }
        }
        
        if(!!today[0]?.closed && today[0]?.closed){
            setFirstTab(!!today[0]?.closedDescription ? today[0]?.closedDescription : t('closed'));
            if(!!nextDay[0]?.open) setSecondTab(`- ${t('opensAt')} ${nextDay[0]?.open}`)
            else setSecondTab("")
        }else{
            notClosed();
        }
    }, [])
    let store = props?.storeDetails;
    let index = props?.id
    // console.log("store",store);
    return (
        <>
            {/* {props.storeDetails.map((store,index)=>{
                return (
                    <> */}
                        {!!store.display && store.display &&
                            <div key={`store_${index}`} className={`store fadeInAnimationNew menu_store_${index} ${showTimings==index?"showTimings":""} ${props.type2?"type2":""}`} onMouseEnter={()=>{props.setActiveTier2Item(store);props.setPanelThreeData(<ImageAndTextMenu img={getImageUrl(store.storeImg)} text={store.storeName} link={store.link}  desktopWidth={233} desktopHeight={396} mobileWidth={303} mobileHeight={130} />)}}>
                                <Link href={!!store?.link ?  store?.link :"#"}>
                                    <a onClick={()=>props.showExploreMenu(false)}>
                                        {!!store.mobileStoreImg &&
                                            <div className="showForMobile storeImg">
                                                <img className="width-100" src={getImageUrl(store.mobileStoreImg)}/>    
                                            </div>
                                        }
                                    </a>
                                </Link> 
                                {!props.unlinkToPage ?<Link href={!!store?.link ?  store?.link :"#"}><a onClick={()=>props.showExploreMenu(false)}>
                                    <div className={`storeName canelaThin underlinedLink font20 ${props?.exploreMenu?.activeTier2Item?.id===store.id?"active":""}`}>{store.storeName}</div>
                                </a></Link>:
                                <div className={`storeName1  storeName underlinedLink canelaThin  font20 ${props?.exploreMenu?.activeTier2Item?.id===store.id?"active":""}`}>{store.storeName}</div>}
                                <div className="address hello anoHalfRegular">
                                    <div>{store.address1}</div>
                                    <div>{store.address2}</div>
                                    <div>{store.address3}</div>
                                </div>
                                <div className="phone  anoHalfRegular"><a href={`tel:${store.phoneNumber}`}>{store.phone}</a></div>
                                <div className="email  anoHalfRegular"><a href={`mailto:${store.email}`}>{store.email}</a></div>
                                {!!store?.storeClosed && store.storeClosed ?
                                    <div className="positionRelative timingWrapper">
                                        <div className="timings  anoRegular">{!!store?.textWhenClosed ? store.textWhenClosed : t('storeClosed')}</div>
                                    </div>
                                    :
                                    <div className="positionRelative timingWrapper">
                                        <div onClick={()=>setShowTimings(showTimings==index?null:index)} className="timings  anoRegular">{firstTab} <span className="grey">{secondTab}</span> <span className="arrow"><Caret color="black" direction={`${showTimings==index?"up":"down"}`} width="0.1rem" marginBottom="2px" length="0.6rem"/></span></div>
                                        <ul className="timingsList m0 listStyleNone pl0 anoRegular">
                                            {store.storeTimings.map((day,index)=>{
                                                return(
                                                    <>
                                                        <li key={index} className={`dayTiming ${dayValue == day.dayId?"currentDay":""}`}>
                                                            <span className="day">{day.day}</span>
                                                            {!!day.closed && day.closed ?
                                                                <span className="timing">{!!day.closedDescription?day.closedDescription:t('closed')}</span>
                                                                :
                                                                <span className="timing">{!!day.open && day.open} - {!!day.close && day.close}</span>
                                                            }
                                                        </li>
                                                    </>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                }
                            </div>
                        }
                    {/* </>
                )
            })} */}
            <style jsx>{`
                .address{
                    cursor:default;
                }
                .store{
                    margin-bottom:3rem;
                    cursor:pointer;
                }
                .timingWrapper,.timingsList{
                    background:#ffffff;
                }
                .timingsList{
                    cursor:default;
                    position:absolute;
                    height:0;
                    overflow:hidden;
                    transition:all 0.5s ease-out;
                    font-size:1.2rem;
                    padding-right:2rem;
                }
                .type2 .timingsList{
                    font-size:1.6rem;
                }
                .showTimings .timingsList{
                    height:auto;
                }
                .showTimings.store{
                    padding-bottom:21rem;
                }
                .arrow{
                    margin-left:0.8rem;
                }
                .timings{
                    margin-bottom:1.6rem;
                }
                .dayTiming{
                    margin-bottom:0.8rem;
                }
                .dayTiming.currentDay{
                    font-weight: bold;
                }
                .dayTiming.day,.dayTiming.timing{
                    text-decoration:underline;
                }
                .day{
                    width:12rem;
                    display:inline-block;
                }
                .storeName, .address {
                    margin-bottom:0.8rem;
                }
                .type2 .storeName{
                    font-size:2.4rem;
                    margin-bottom:1.6rem;
                }
                .type2 .timings span{
                    color:#000000;
                }
                .type2 .address{
                    margin-bottom:1.6rem;
                    line-height:23px;
                    font-size:1.6rem;
                }
                .type2 .phone,.type2 .email,.type2 .timings{
                    font-size:1.6rem;
                }
                .type2 .storeImg{
                    display:none;
                }
                
                .store .storeName{
                    display:inline-block;
                }
                // .phone{
                //     line-height: 20px;
                //     padding-bottom:1px;
                //     border-bottom:1px solid #0b0b0b;
                //     margin-right:68.25%;
                // }
                // .email{
                //     line-height: 20px;
                //     padding-bottom:1px;
                //     border-bottom:1px solid #0b0b0b;
                //     margin-right:55%;
                // }
                .phone,.email{
                    text-decoration:underline;
                }
                .email{
                    margin-bottom:1.6rem;
                }
                .type2 .email{
                    margin-bottom:2.3rem;
                }
                .underlinedLink{
                    display:inline-block;
                    position:relative;
                    cursor: pointer;
                }
                .underlinedLink::after{
                    content: '';
                    position: absolute;
                    bottom: 3px;
                    left: 0;
                    background-color: black;
                    height: 0.1rem;
                    width: 100%;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.3s ease-out;
                }
                .underlinedLink.active::after{
                    transform: scaleX(1);
                }   
                .storeImg{
                    margin-bottom:1.5rem;
                } 
                .storeName1{
                    cursor:default;
                }
                

                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    // .phone{
                    //     line-height: 20px;
                    //     padding-bottom:1px;
                    //     border-bottom:1px solid #0b0b0b;
                    //     margin-right:63%;
                    // }
                    // .email{
                    //     line-height: 20px;
                    //     padding-bottom:1px;
                    //     border-bottom:1px solid #0b0b0b;
                    //     margin-right:47%;
                    // }
                }
                @media screen and (max-width:${IPAD_BREAKPOINT}px){
                    // .phone{
                    //     line-height: 20px;
                    //     padding-bottom:1px;
                    //     border-bottom:1px solid #0b0b0b;
                    //     margin-right:54%;
                    // }
                    // .email{
                    //     line-height: 20px;
                    //     padding-bottom:1px;
                    //     border-bottom:1px solid #0b0b0b;
                    //     margin-right:35%;
                    // }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    // .phone{
                    //     line-height: 20px;
                    //     padding-bottom:1px;
                    //     border-bottom:1px solid #0b0b0b;
                    //     margin-right:70%;
                    // }
                    // .email{
                    //     line-height: 20px;
                    //     padding-bottom:1px;
                    //     border-bottom:1px solid #0b0b0b;
                    //     margin-right:58%;
                    // }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .type2 .address,.type2 .timingsList{
                        margin-bottom:0.8rem;
                        font-size:1.2rem;
                    }
                    .type2 .phone,.type2 .email,.type2 .timings{
                        font-size:1.2rem;
                    }
                    .showTimings.store{
                        padding-bottom:20rem;
                    }
                    .store{
                        margin-bottom:5.6rem;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({exploreMenu,selection}){
    return {exploreMenu,selection}
}
export default connect(mapStateToProps,{setActiveTier2Item,setPanelThreeData,showExploreMenu})(StoresMenu)