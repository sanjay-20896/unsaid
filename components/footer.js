import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Caret from '../components/caret'
import FooterMobile from '../components/footerMobile'
import { TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT ,RULE_URI,RULE_SECRET} from '../config'
import Loader from './loader'
import { connect } from 'react-redux'
import CountryAndLanguage from './countryAndLanguage'
import {showCookieDetails,setShowCookies,showNavBar} from '../redux/actions'
import {UNSAID_API} from "../branch-specific-config"
import LanguageSwitch from "./LanguageSwitch"
import useTranslation from 'next-translate/useTranslation'

function footer(props) {
    const {t}=useTranslation('common')
    const [email,setEmail]=useState("")
    const [emailError,setEmailError]=useState(true)
    const [emailTouched,setEmailTouched]=useState(false)
    const [loading,setLoading]=useState(false)
    
    const [notification,setNotification]=useState("")
    const [success,setSuccess]=useState(false)
    const submitEmailButtonRef = useRef();

    function onChangeEmail(value){
        setEmail(value)
        validateEmail(value)
        setEmailTouched(true)
    }
    function validateEmail(val){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(val.match(mailformat)){
            setEmailError(false)
            setNotification(null)
        }else{
            setEmailError(true)
            setNotification(t('invalidEmailError'))
        }
    }
    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            subscribeNewsLetter(email)
            return false;
        }
    }
    const btnForNewsLetter= loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:<Caret color="grey" direction="right" width="0.1rem" length="1rem"/>

    async function subscribeNewsLetter(email){
        setLoading(true)
        if(emailError===true){
            setNotification(t('invalidEmailError'))
            setLoading(false)
            setSuccess(false)
        }else{
             let response = await fetch(`${UNSAID_API}/api/form/newsletter`, {
                method: 'POST',
                headers: {
                'Accept': `*/*`,
                'Content-Type': 'application/json',
                },
                body:JSON.stringify({email})
            }) 
            let body=await response.json();
            if(response.status==200){
                setLoading(false)
                setNotification(t('newslettersubscriptionSuccess'))
                setSuccess(true)
                setEmail("")
            }else{
                setLoading(false)
                setSuccess(false)
                setNotification(t('newslettersubscriptioNFail'))
            }
        }
    }
    // console.log("state value",success===true)
    let year=new Date().getFullYear();
    // console.log("year",year)
    return (
        <>
            <div className="desktopFooter">
                <div className={`footer white paddedContent positionRelative ${props.class}`}>                    
                    <div className="footerContainer container anoRegular">
                        <div className="leftSection">
                            <div className="logoWrapper">
                                <div className="logo"><img className="width-100" src="/images/logo.png" alt='logo' width="416" height="128" /></div>
                            </div>
                            <div className="heading font20">{props?.footer?.newsletter?.text1}</div>
                            <div className="content font16">{props?.footer?.newsletter?.text2}</div>
                            <div className="inputForm positionRelative anoRegular">
                                <input onKeyDown={e=>submitWhenEnter(e)} type="email" className="blackInput anoRegular" value={email} placeholder={t('signUpNewsletter')} onChange={(e)=>{onChangeEmail(e.target.value)}}/><br/>
                                <div ref={submitEmailButtonRef} className="submitButton" onClick={()=>{subscribeNewsLetter(email)}}>{btnForNewsLetter}</div>
                                {!!notification && 
                                    <div className="success-newsletter">{notification}</div>
                                }  
                            </div>
                            <div className="signUpText">{t('newsletterTextBelowTextBoxPart1')} <a className="text-decoration" href="/privacy-policy" target="_blank"> {t('privacy-policy')}</a> {t('newsletterTextBelowTextBoxPart2')} <a className="text-decoration" href="/terms-and-conditions" target="_blank">{t('terms-and-conditions')}</a></div>
                        </div>
                        <div className="rightSection">
                            <div className="col1">
                                <div className="heading font20">{props?.footer?.footerColumn1?.heading}</div>
                                <ul className="items">
                                    {Array.isArray(props?.footer?.footerColumn1?.items) && props?.footer?.footerColumn1?.items.map((item)=>{
                                        if(item.link){
                                            return (<>
                                                <li className="item"><Link href={item?.link ? item.link:"#"}><a>{item?.label}</a></Link></li>
                                           </>)
                                        }
                                        if(!item.link){
                                            return (
                                                <>
                                                <li className="item"><a className="cursorPointer" onClick={(e)=>{e.preventDefault();props.setShowCookies(true);props.showCookieDetails(true);}}>{item?.label}</a></li>
                                                </>
                                            )
                                        }
                                    }) 
                                    }
                                </ul>
                            </div>
                            <div className="col2">
                                <div className="heading font20">{props?.footer?.footerColumn2?.heading}</div>
                                <ul className="items">
                                    {Array.isArray(props?.footer?.footerColumn2?.items) && props?.footer?.footerColumn2?.items.map((item)=>{
                                         return (<>
                                            <li className="item"><Link href={!!item?.link ? item?.link:"#"}><a>{item?.label}</a></Link></li>
                                       </>)
                                    })}
                                </ul>
                            </div>
                            <div className="col3">
                                <div className="heading font20">{t('localization')}</div>
                                <div className="footerCountrySelect anoRegular font16-notResponsive">
                                    <div><span className="font16">{t('country')}: </span><CountryAndLanguage CaretMarginBottom="4px" caret={true} caretColor={"white"} noAnimation={true} fontClass="font16" /></div>
                                    <div className="languageSwitchFooter"><span className="font16">{t('language')}: </span><LanguageSwitch CaretMarginBottom="4px" fontClass="font16" caret={true} caretColor={"white"}/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bottomContent font16">
                        <div className="column1 ">
                            <div>&copy; Unsaid {year}</div>
                        </div>
                        <div className="column2">
                            <ul className="services">
                                <li className="service"><Link href={!!props?.footer?.legal1?.link ? props?.footer?.legal1?.link : "#"}><a>{props?.footer?.legal1?.label}</a></Link></li>
                                <li className="service"><Link href={!!props?.footer?.legal2?.link ? props?.footer?.legal2?.link:"#"}><a>{props?.footer?.legal2?.label}</a></Link></li>
                                <li className="service"><Link href={!!props?.footer?.legal3?.link ? props?.footer?.legal3?.link:"#"}><a>{props?.footer?.legal3?.label}</a></Link></li>
                                <li className="socialLink one"><a href={!!props?.footer?.pinterestLink ? props?.footer?.pinterestLink: "#"} target="_blank"><img className="width-100" src="/images/Pinterest.png" alt='Social icons' width="49" height="48"/></a></li>
                                <li className="socialLink two"><a href={!!props?.footer?.facebookLink ? props?.footer?.facebookLink:"#"} target="_blank"><img className="width-100" src="/images/facebook.png" alt='Social icons' width="47" height="48"/></a></li>
                                <li className="socialLink three"><a href={!!props?.footer?.instagramLink ? props?.footer?.instagramLink: "#"} target="_blank"><img className="width-100" src="/images/insta.png" alt='Social icons' width="47" height="48"/></a></li>
                                <li className="socialLink four"><a  href={!!props?.footer?.youtubeLink ? props?.footer?.youtubeLink:"#"} target="_blank"><img className="width-100" src="/images/youtube.png" alt='Social icons' width="69" height="48" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobileFooter">
                <FooterMobile footer={props.footer}/>
            </div>
            <style jsx>{`
                .text-decoration {
                    text-decoration:underline;
                }
                .footerCountrySelect > div{
                    display: flex;
                    align-items: center;
                }
                .footerCountrySelect > div > span{
                    margin-right: 5px;
                    white-space: nowrap;
                }
                .languageSwitchFooter{
                    margin-top:2.4rem;
                }
                .desktopFooter{
                    background:#000000;
                }
                .leftSection .heading{
                    margin-bottom:2.2rem;
                }
                .services{
                    justify-content:space-between;
                }
                .column1,.column2{
                    width:50%;
                }
                .success-newsletter{
                    margin-bottom:1rem;
                    margin-top:1rem;
                }
                .mobileFooter{
                    display:none;
                }
                .desktopFooter{
                    display:block;
                }
                .footerContainer{
                    display:flex;
                    padding-bottom:16.4rem;
                }
                .footer{
                    overflow:hidden;
                    padding-top:10rem;
                    max-width:2000px;
                    margin:auto;
                }
                .bottomContent{
                    display:flex;
                    width: -moz-available;
                    border-top: 1px solid #787878;
                    padding-top:3.4rem;
                    padding-bottom:4.4rem;
                    left: 0;
                    position: absolute;
                    bottom: 0;
                    margin-left: 6.4rem;
                    margin-right: 6.4rem;
                    width: -webkit-fill-available;
                    transform: translateY(100%);
                    justify-content:space-between;
                    animation:bottomContentFadeIn 0.5s ease-out 0.3s forwards;
                }
                .socialLink img{
                    height:auto;
                }
                .socialLink.one{
                    height:2.4rem;
                    width:2.4rem;
                }
                .socialLink.two{
                    height:2.4rem;
                    width:2.4rem;
                }
                .socialLink.three{
                    height:2.4rem;
                    width:2.4rem;
                }
                .socialLink.four{
                    height: 24px;
                    width: 33.7px;
                }
                .content{
                    margin-bottom:2rem;
                }
                .inputForm{
                    margin-bottom:1.6rem;
                } 
                .logo{
                    width:15.6rem;
                    height:4.6rem;
                    margin-bottom:4.6rem;
                }
                .logo img{
                    height:auto;

                }
                .leftSection{
                    width:50%;
                }
                .rightSection{
                    width:50%;
                }
                .leftSection > *{
                    width:70%;
                }
                .rightSection, .services, .socialLinks{
                    display:flex;
                }
                .services, .socialLinks{
                    margin:0;
                }
                .col1, .col2, .col3{
                    width:33.33%;
                    padding-right:2.4rem;
                }
                .heading{
                    margin-bottom:3.2rem;
                }
                ul{
                    padding-left: 0;
                    margin:0;
                    list-style: none;
                }
                .item{
                    margin-bottom:2.4rem;
                    font-size:1.6rem;
                }
                .leftSection input{
                    background: black;
                    border: 1px solid grey;
                    padding: 2rem 3.3rem 2rem 2rem;
                    width: 100%;
                    font-size: 1.6rem;
                    line-height:2.4rem;
                    color:#FFFFFF;
                    letter-spacing: 1px;
                }
                .submitButton{
                    position: absolute;
                    top: ${loading?"3px":"4px"};
                    right: ${loading?"3rem":"1rem"};
                    -ms-transform: translateY(-50%);
                    cursor: pointer;
                    padding:2rem;
                }
                @keyframes textFadeInAnimation{
                    from{
                        opacity:0;
                        transform:translateY(2rem);
                    }
                    to{
                        opacity:1;
                        transform:translateY(0);
                    }
                }
                @keyframes textFoldingAnimation{
                    from{
                        opacity:0;
                        transform:translate(-20px, -20px);
                    }
                    to{
                        opacity:1;
                        transform:translate(0, 0);
                    }
                }
                @keyframes bottomContentFadeIn{
                    from{
                        transform:translateY(100%);
                    }
                    to{
                        
                        transform:translateY(0%);
                    }
                }
                @media only screen and (max-width: 1390px){
                  
                }
                @media only screen and (max-width: 1286px){
                    
                }
                @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .leftSection > *{
                        width:90%;
                    }
                    .leftSection{
                        width:40%;
                    }
                    .rightSection{
                        width:60%;
                    }
                    .item{
                        margin-bottom:2.4rem;
                        font-size:1.2rem;
                    }
                    .heading{
                        font-size:1.6rem;
                    }
                    .column1{
                        width:30%;
                    }
                    .column2{
                        width:70%;
                    }
                }
                @media only screen and (max-width: 1062px){
                    .bottomContent{
                        padding-bottom:2.4rem;
                    }
                }
                @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .desktopFooter{
                        display:none;
                    }
                    .mobileFooter{
                        display:block;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}

export default connect(mapStateToProps,{showCookieDetails,setShowCookies,showNavBar})(footer)
