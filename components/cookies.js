import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import Switch from './switch';
import {userHasSetCookieConsent,setShowCookies,showCookieDetails,setPerformanceCookie,setFunctionalCookie,setTargetingCookie,showNavBar,preventBodyScroll} from '../redux/actions'
import {MOBILE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'

function Cookies(props) {
    const {t}=useTranslation('common')

    useEffect(()=>{
        if(props.common.windowWidth < MOBILE_BREAKPOINT) props.showNavBar(!props.common.showCookieDetails);
        props.preventBodyScroll(props.common.showCookieDetails);
    },[props.common.showCookieDetails])
    useEffect(()=>{
        let cookieTimeStampString = localStorage.getItem("cookieConsentTimeStamp")
        if(cookieTimeStampString){
            let cookieSetDate = new Date(parseInt(cookieTimeStampString))
            let currentDate = new Date()
            const diffTime = Math.abs(currentDate - cookieSetDate)
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if(diffDays > 180)
                props.setShowCookies(true)
        } else {
            props.setShowCookies(true)
        }
    },[])
    function accept(){
        // props.userHasSetCookieConsent(true)
        localStorage.setItem("cookieConsentTimeStamp",Date.now().toString())
        props.setShowCookies(false)
        props.preventBodyScroll(false);
    }
    return (
        <>
            <div className={`cookies ${props.common.showBrandNotification?"showBrandNotification":""} ${props.common.showCookieDetails?"cookieDetailsOpen":""}`}>
                <div className="cookieDetails font16-notResponsive positionRelative paddedContent">
                    <div className="points">
                        <div className="cookieList anoHalfRegular">
                            <span className="anoRegular">{t('strictCookies')}: </span>
                            <span>{t('strictCookiesDesc')}</span>
                        </div>
                        <div className="cookieList anoHalfRegular">
                            <span className="anoRegular">{t('performanceCookies')}: </span>
                            <span>{t('performanceCookiesDesc')}</span>
                        </div>
                        <div className="cookieList anoHalfRegular">
                            <span className="anoRegular">{t('functionalCookies')}: </span>
                            <span>{t('functionalCookiesDesc')}</span>
                        </div>
                        <div className="cookieList anoHalfRegular">
                            <span className="anoRegular">{t('targettingCookies')}: </span>
                            <span>{t('targettingCookiesDesc')}</span>
                        </div>
                    </div>
                    <div className="switchButtons">
                        <div className="headingMobile showForMobile anoRegular font16-notResponsive">{t('manageConsent')}</div>
                        <div className="switchWrapper">
                            <Switch
                                text={t('strictCookies')}
                                inActive={true}
                                on={true}
                                onSwitch={(state)=>console.log()}
                            />
                        </div>
                        <div className="switchWrapper">
                            <Switch
                                text={t('performanceCookies')}
                                onSwitch={()=>props.setPerformanceCookie(!props.cookieConsent.performance)}
                                on={props.cookieConsent.performance}
                            />
                        </div>
                        <div className="switchWrapper">
                            <Switch
                                text={t('functionalCookies')}
                                on={props.cookieConsent.functional}
                                onSwitch={()=>props.setFunctionalCookie(!props.cookieConsent.functional)}
                            />
                        </div>
                        <div className="switchWrapper">
                            <Switch
                                text={t('targettingCookies')}
                                on={props.cookieConsent.targeting}
                                onSwitch={()=>props.setTargetingCookie(!props.cookieConsent.targeting)}
                            />
                        </div>
                    </div>
                    <div className="showForMobile">
                        <button className="width-100 anoRegular font16-notResponsive btn btnPrimary" onClick={()=>props.showCookieDetails(false)}>{t('confirmChoice')}</button>
                    </div>
                    
                    <img onClick={()=>{props.showCookieDetails(false),props.showNavBar(true)}} src="/images/cross.svg" className="cross" alt="cross" width="16" height="16"/>
                </div>
                
                <div className="cookieSubNav anoRegular font16 paddedContent">
                    <div onClick={()=>props.showCookieDetails(!props.common.showCookieDetails)} className="left">
                        {t('cookieExperience')}
                        <span className="plus positionRelative"></span>
                    </div>
                    <div onClick={()=>accept()} className="right">
                        <div className="hideForMobile">{`${props.cookieConsent.performance && props.cookieConsent.functional && props.cookieConsent.targeting?t('accept'):t('accept')}`}</div>
                        <div className="showForMobile">{t('accept')}</div>
                    </div>
                </div>
            </div> 
            <style jsx>{`
                .cookieSubNav{
                    padding-top:2rem;
                    padding-bottom:2rem;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }
                .left,.right{
                    letter-spacing: 0.03em;
                }
                .cross{
                    position:absolute;
                    top:2.4rem;
                    right:4rem;
                    cursor:pointer;
                }
                .switchButtons{
                    display:flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    padding-right:4rem;
                }
                .cookieDetails{
                    padding-top:0;
                    padding-bottom:0;
                    letter-spacing: 0.03em;
                    height:0;
                    overflow:hidden;
                    transition:all 0.5s ease-out;
                }
                .cookieDetailsOpen .cookieDetails{
                    padding-top:4.8rem;
                    padding-bottom:3.8rem;
                    height:auto;
                    transition:all 0.5s ease-out;
                }
                .points{
                    margin-bottom:6.4rem;
                }
                .cookieSubNav div{
                    cursor:pointer;
                }
                .plus{
                    margin-left:1.6rem;
                }
                .plus::after,.plus::before{
                    content:'';
                    position:absolute;
                    width:1.6rem;
                    height:1px;
                    background:#000000;
                    top:50%;
                    left:50%;
                }
                .plus::before{
                    transform:translate(-50%,-50%);
                    opacity:1;
                    transition:all 0.5s ease-out;
                }
                .plus::after{
                    transform:translate(-50%,-50%) rotate(90deg);
                    transition:all 0.5s ease-out;
                }
                .cookieDetailsOpen .plus::after{
                    transform:translate(-50%,-50%) rotate(0deg);
                }
                .cookieDetailsOpen .plus::before{
                    opacity:0;
                }
                .right{
                    text-decoration:underline;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .left{
                        padding-right: 5%;
                    }
                    .plus::after,.plus::before{
                        width:0.8rem;
                        height:1px;
                    }
                    .plus{
                        margin-left:0.8rem;
                    }
                    .cookieSubNav{
                        padding-top:1.4rem;
                        padding-bottom:1.4rem;
                        align-items: flex-start;
                    }
                    .cookieDetailsOpen .cookieDetails{
                        overflow-y:scroll;
                        -ms-overflow-style: none;  /* IE and Edge */
                        scrollbar-width: none;  /* Firefox */
                        height:calc(${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"} - 6.8rem);
                        padding-top:${props.common.showNavBar?"12rem":"6.4rem"};
                        padding-bottom:4.8rem;
                        transition:all 0.3s ease-out;
                    }
                    .cookieDetailsOpen .cookieDetails::-webkit-scrollbar {
                        display: none;
                    }
                    .cookieDetails{
                        transition:all 0.3s ease-out;
                    }
                    .cross{
                        top:${props.common.showNavBar?"8rem":"2.4rem"};
                    }
                    .showBrandNotification .cross{
                        top:${props.common.showNavBar?"10.8rem":"2.4rem"};
                    }
                    .showBrandNotification.cookieDetailsOpen .cookieDetails{
                        padding-top:${props.common.showNavBar?"14.8rem":"6.4rem"};
                    }
                    .switchButtons{
                        display:block;
                        padding-right:0rem;
                        margin-bottom:4.8rem;
                    }
                    .points{
                        margin-bottom:5.8rem;
                    }
                    .headingMobile{
                        padding-bottom:3.2rem;
                        border-bottom:1px solid #787878;
                    }
                    .switchWrapper{
                        padding:2rem 0;
                        border-bottom:1px solid #787878;
                    }
                }
            `}</style>  
        </>
    )
}
function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}
export default connect(mapStateToProps,{userHasSetCookieConsent,setShowCookies,showCookieDetails,setPerformanceCookie,setFunctionalCookie,setTargetingCookie,showNavBar,preventBodyScroll})(Cookies)