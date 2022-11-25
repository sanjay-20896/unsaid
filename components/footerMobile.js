import React, { useState,useRef } from 'react'
import Link from 'next/link'
import Caret from '../components/caret'
import { RULE_URI ,RULE_SECRET} from '../config'
import Loader from './loader'
import { connect } from 'react-redux'
import CountryAndLanguage from './countryAndLanguage'
import {showCookieDetails,setShowCookies,showNavBar} from '../redux/actions'
import {UNSAID_API} from "../branch-specific-config"
import LanguageSwitch from './LanguageSwitch'
import useTranslation from 'next-translate/useTranslation'

function FooterMobile(props) {
    const {t}=useTranslation('common');
    const [showRow1, setShowRow1] = useState(false)
    const [showRow2, setShowRow2] = useState(false)
    const [email,setEmail]=useState("")
    const [emailError,setEmailError]=useState(true)
    const [emailTouched,setEmailTouched]=useState(false)
    const [loading,setLoading]=useState(false)
    const [success,setSuccess]=useState(true)
    const [notification,setNotification]=useState("")
    const submitEmailButtonRef = useRef();
// console.log("footer mobile", props);
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
            setNotification(t('invalidEmailError'));
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
            setNotification(t('invalidEmailError'));
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
    // console.log("state value",success)
    let year=new Date().getFullYear();
    return (
        <>
            <div className={`footer white paddedContent unlock positionRelative ${props.class}`}>
                <div className="topHeading alignCenter">
                    <div className="tagLine font16-notResponsive canelaThin">{t('sayItWith')}</div>
                    <div className="logo"><img className="width-100" alt='logo' src="/images/logo.png" width="416" height="128" /></div>
                </div>
                <div className="row3 anoRegular">
                    <div className="heading font20-notResponsive">{props?.footer?.newsletter?.text1}</div>
                    <div className="content font16-notResponsive">{props?.footer?.newsletter?.text2}</div>
                </div>
                <div>
                    <div className="inputForm positionRelative">
                        <input onKeyDown={e=>submitWhenEnter(e)} type="email" className="blackInput" placeholder={t('signUpNewsletter')} value={email} onChange={(e)=>{onChangeEmail(e.target.value)}}/><br/>
                        <div ref={submitEmailButtonRef} className="submitButton" onClick={()=>{subscribeNewsLetter(email)}} >{btnForNewsLetter}</div>
                    </div>
                    {!!notification && 
                        <div className="success-newsletter">{notification}</div>
                    }
                    <div className="signUpText">{t('newsletterTextBelowTextBoxPart1')} <a  className="text-decoration" href="/privacy-policy" target="_blank">{t('privacy-policy')}</a> {t('newsletterTextBelowTextBoxPart2')} <a className="text-decoration"  href="/terms-and-conditions" target="_blank">{t('terms-and-conditions')}</a></div>
                </div>
                <div>
                 
                    <div className={`row1 positionRelative ${showRow1?"showRow1":""}`}>
                        <div className="heading font20-notResponsive" onClick={()=>setShowRow1(!showRow1)}>{props?.footer?.footerColumn1?.heading}</div>
                        <ul className="items">
                            {Array.isArray(props?.footer?.footerColumn1?.items) && props?.footer?.footerColumn1?.items.map((item)=>{
                                if(item.link){
                                    return (<>
                                        <li className="item"><Link href={!!item?.link ? item.link:"#"}><a>{item?.label}</a></Link></li>
                                    </>)
                                }
                                if(!item.link){
                                    return (
                                        <>
                                        <li className="item"><a className="cursorPointer" onClick={(e)=>{e.preventDefault();props.setShowCookies(true);props.showCookieDetails(true);}}>{item?.label}</a></li>
                                        </>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    <div className={`row2 ${showRow2?"showRow2":""}`}>
                        <div className="heading font20-notResponsive" onClick={()=>setShowRow2(!showRow2)}>{props?.footer?.footerColumn2?.heading}</div>
                        <ul className={`items`}>
                            {Array.isArray(props?.footer?.footerColumn2?.items) && props?.footer?.footerColumn2?.items.map((item)=>{
                                    return (<>
                                        <li className="item"><Link href={!!item?.link ? item.link:"#"}><a>{item?.label}</a></Link></li>
                                    </>)
                            })}
                        </ul>
                    </div>
                    <div className="row4 anoRegular">
                        <div className="heading font20-notResponsive">{t('location')}</div>
                        {/* <ul className="itemsOfLocation">
                            <li className="item"><Link href="#"><a>Shipping: Sweden-SEK</a></Link></li>
                            <li className="item"><Link href="#"><a>Language: English</a></Link></li>
                        </ul> */}
                        <div className="footerCountrySelect anoRegular font16-notResponsive">
                            <div><span>{t('country')}: </span><CountryAndLanguage noAnimation={true} fontClass="font16-notResponsive" /></div>
                            <div><span>{t('language')}: </span><LanguageSwitch fontClass="font16-notResponsive" caretColor={"white"}/></div>
                        </div>
                    </div>
                    <div className="row5">
                        <ul className="socialLinks">
                            <li className="socialLink"><a href={!!props?.footer?.pinterestLink ? props.footer.pinterestLink:"#"} target="_blank"><img className="width-100" src="/images/Pinterest.png" width="49" height="48" /></a></li>
                            <li className="socialLink"><a href={!!props?.footer?.facebookLink ? props.footer.facebookLink:"#"} target="_blank"><img className="width-100" src="/images/facebook.png" width="47" height="48" /></a></li>
                            <li className="socialLink"><a href={!!props?.footer?.instagramLink ? props.footer.instagramLink:"#"} target="_blank"><img className="width-100" src="/images/insta.png" width="47" height="48" /></a></li>
                            <li className="socialLink"><a href={!!props?.footer?.youtubeLink? props?.footer?.youtubeLink:"#"} target="_blank"><img className="width-100" src="/images/youtube.png" width="69" height="48" /></a></li>
                        </ul>
                    </div>
                    <div className="row6">
                        <ul className="services1">
                            <li className="service one aliginCenter"><Link href={!!props?.footer?.legal1?.link ? props?.footer?.legal1?.link: "#"}><a>{props.footer?.legal1?.label}</a></Link></li>
                            {/* <li className="service two"><Link href="#"><a>Imprint</a></Link></li> */}
                        </ul>
                        <ul className='services2'>
                            <li className="service"><Link href={!!props?.footer?.legal2?.link ? props?.footer?.legal2?.link:"#"}><a>{props?.footer?.legal2?.label}</a></Link></li>
                            <li className="service"><Link href={!!props?.footer?.legal3?.link ? props?.footer?.legal3?.link:"#"}><a>{props?.footer?.legal3?.label}</a></Link></li>
                        </ul>
                    </div>
                    <div className="alignCenter copyRight">&copy; Unsaid {year}</div>
                </div>
            </div>
            <style jsx>{`
                .text-decoration{
                    text-decoration: underline;
                }
                .one{
                    text-align:center;
                    display: inline-block;
                    width: 100%;
                }
                .footerCountrySelect{
                    margin-top:3.2rem;
                }
                .footerCountrySelect > div{
                    display: flex;
                }
                .footerCountrySelect > div:first-child{
                    margin-bottom: 3.2rem;
                }
                .footerCountrySelect > div > span{
                    margin-right: 5px;
                }
                .success-newsletter{
                    margin-bottom:1.6rem;
                    margin-top:1.6rem;
                }
                .footerContainer{
                    display:block;
                }
                .footer{
                    background:#000000;
                    overflow:hidden;
                }
                .topHeading{
                    padding:5rem 0 10rem;
                }
                .signUpText{
                    margin-bottom:4.8rem;
                }
                .logo{
                    width:15.6rem;
                    height:4.8rem;
                    margin:1.6rem auto 0;
                }
                .logo img{
                    height:auto;
                }
                .row1, .row2{
                    border-top:0.1rem solid #787878;
                    border-bottom:0.1rem solid #787878;
                    padding:2.4rem 0;
                }
                .row2{
                    border-top:none;
                    margin-bottom:3.2rem;
                }
                .item{
                    font-size:1.6rem;
                    margin-bottom:2.4rem;
                }
                .item:nth-child(1){
                    margin-top:3.2rem;
                }
                .item:last-child{
                    margin-bottom:0rem;
                }
                .items{
                    position:absolute;
                    transform:translateY(-10%);
                    height:0;
                    z-index:-9;
                    transition:all 0.3s ease-out;
                }
                .showRow1 .items, .showRow2 .items{
                    height:auto;
                    position:static;
                    transform:translateY(0%);
                }
                .row1 .heading, 
                .row2 .heading{
                    position:relative;
                }
                .row1 .heading::after,
                .row2 .heading::after{
                    position:absolute;
                    content:"";
                    top:50%;
                    right:0;
                    transform:translateY(-50%);
                    height:0.15rem;
                    width:2.4rem;
                    background:#FFFFFF;
                    transition:all 0.3s ease-out;
                }
                .row1 .heading::before,
                .row2 .heading::before{
                    position:absolute;
                    content:"";
                    top:50%;
                    right:1.2rem;
                    transform:translate(50%, -50%);
                    height:2.4rem;
                    width:0.15rem;
                    background:#FFFFFF;
                    transition:all 0.3s ease-out;
                }
                .showRow1.row1 .heading::after{
                    opacity:0;
                } 
                .showRow1.row1 .heading::before{
                    transform:rotate(90deg) translateX(-1rem);
                }
                .showRow2.row2 .heading::after{
                    opacity:0;
                } 
                .showRow2.row2 .heading::before{
                    transform:rotate(90deg) translateX(-1rem);
                }
                .row3{
                    margin-bottom:3.2rem;
                }
                .row3 .heading{
                    margin-bottom:3.2rem;
                }
                .row4, .row5{
                    border-bottom:0.1rem solid #787878;
                    padding-bottom:3.2rem;
                    margin-bottom:3.2rem;
                }
                .socialLinks{
                    display:flex;
                    justify-content: center;
                }
                .socialLink{
                    margin-right:3rem
                }
                .socialLink img{
                    height:auto;
                }
                .socialLink:nth-child(1){
                    height: 15.4px;
                    width: 15.46px;
                }
                .socialLink:nth-child(2){
                    width:15.42px;
                    height :16px;
                }
                .socialLink:nth-child(3){
                    width:15.42px;
                    height :16px;
                }
                .socialLink:nth-child(4){
                    width:20.46px;
                    height :16px;
                    margin-right:0rem
                }
                .services1{
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom:1.6rem;
                    padding:0 3.8rem;
                    justify-content:space-between;
                }
                .services2{
                    display: flex;
                    flex-wrap: wrap;
                    justify-content:center;
                }
                .services2 > li:nth-child(1){
                    margin-right:1.6rem;
                }
                .service{
                    font-size:1.6rem;
                }
                .service a{
                    display:inline-block;
                }
                .row6{
                    margin-bottom:4.8rem;
                }
                .copyRight{
                    margin-bottom:4.8rem;
                    font-size:1.6rem;
                }
                .inputForm{
                    margin-bottom:1.6rem;
                }
                ul{
                    padding-left: 0;
                    margin:0;
                    list-style: none;
                }
                .inputForm input{
                    background: black;
                    border: 1px solid grey;
                    padding: 1.2rem 2.5rem 1.2rem 1.2rem;
                    width: 100%;
                    font-size: 1.6rem;
                    line-height:2.4rem;
                    color:#FFFFFF;
                    letter-spacing: 1px;
                }
                .submitButton{
                    position:absolute;
                    top: ${loading?"50%":"53%"};
                    right: ${loading?"2rem":"0px"};
                    transform: translateY(-50%);
                    cursor:pointer;
                    padding:1.5rem;
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
                        transform:translate(-2rem, -2rem);
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
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}

export default connect(mapStateToProps,{showCookieDetails,setShowCookies,showNavBar})(FooterMobile)
