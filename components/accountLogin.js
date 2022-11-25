import Input from "./input";
import Caret from "./caret";
import React, { useState, useEffect, useRef } from 'react'
import {TOKEN_VAR_NAME,MOBILE_BREAKPOINT} from '../config'
import { ECOMMERCE_URI } from "../branch-specific-config";
import { connect } from "react-redux";
import{storeSelection,showExploreMenu,showMyUnsaidMenu} from '../redux/actions'
import Loader from "./loader";
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

function Login(props){
    const [loginEmail,setLoginEmail] = useState("")
    const [loginEmailError,setLoginEmailError] = useState(true)
    const [loginEmailTouched,setLoginEmailTouched] = useState(false)
    const [loading,setLoading]=useState(false)
    const finalSubmitButtonRef = useRef();
    const [loginPassword,setLoginPassword] = useState("")
    const [loginPasswordError,setLoginPasswordError] = useState(true)
    const [loginPasswordTouched,setLoginPasswordTouched] = useState(false)
    const {t}=useTranslation('common');
    let signInError= loginPasswordError || loginEmailError;
    let btnContentSignIn = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('signIn')

    function onLoginEmailChange(e){
        setLoginEmail(e.target.value)
        validateLoginEmail(e.target.value)
        setLoginEmailTouched(true)
    }
    function onLoginPasswordChange(e){
        setLoginPassword(e.target.value);
        validateLoginPassword(e.target.value);
        setLoginPasswordTouched(true)
    }
    function validateLoginEmail(val){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(val.match(mailformat))
            setLoginEmailError(false)
        else
            setLoginEmailError(true)
    }

    function validateLoginPassword(val){
        let value = val.toString()
        if(value.length < 8)
            setLoginPasswordError(true)
        else
            setLoginPasswordError(false)
    }
    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            !signInError && finalSubmitButtonRef.current.click();
            return false;
        }
    }
    const [forgotPassword, setForgotPassword] = useState(false)
    async function handleSubmitLogin(){
        try {

            if(!signInError){
                setLoading(true)
                let token=localStorage.getItem(TOKEN_VAR_NAME);
                let rawResponse=await fetch(`${ECOMMERCE_URI}/login/${loginEmail}`,{
                    method:'POST',
                    headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-type':'application/json',
                    },
                    body:JSON.stringify({
                        password:loginPassword
                    })
                })
                if(rawResponse.status==200){
                    setLoading(false);
                    let selection= await rawResponse.json()
                    localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                    props.storeSelection(selection)
                    props.onSuccess(true)
                } else {
                    if(rawResponse.status===406){
                        setLoginPasswordError(true)
                    }
                    let response=await rawResponse.json()
                    setLoading(false);
                }
            }
            
        } catch (error) {
            setLoading(false);
        }
        
    }
    return(
        <>
            <div className="wrapper fadeInAnimationNew">
                <div className="signIn">
                    <h1 className="greet canelaThin font20 ">{t('welcomeMessage')}</h1>
                    <div className="signInContent anoHalfRegular font16 ">{t('SignInMessage')}</div>
                    <div className="inputComponentForm">
                        <div className="signInEmail "><Input enterKeyPressed={submitWhenEnter} error={loginEmailTouched && loginEmailError} errorMsg={t('invalidEmailError')} type="email" placeHolder={t('email')} onChangeValue={onLoginEmailChange} value={loginEmail} required={true}/></div>
                        <div className="signInPassword "><Input enterKeyPressed={submitWhenEnter} error={loginPasswordTouched && loginPasswordError} errorMsg={t('incorrectPasswordError')} type="password" placeHolder={t('password')} onChangeValue={onLoginPasswordChange} value={loginPassword} required={true}/></div>
                        <button ref={finalSubmitButtonRef} style={{animationDelay:"0.4s"}} className={`signInSubmitButton width-100 btn  anoRegular font20 white ${signInError?"btnInactive":"btnPrimary"}`} onClick={()=>handleSubmitLogin()}>{btnContentSignIn}</button>
                    </div>
                    {/* <Link></Link> */}
                    {!!props.exploreMenuLink ? <Link href={"/myunsaid/forgot-password/"}><a>
                        <h4 onClick={()=>props.setFP()} className=" forgetPassword anoRegular alignCenter">
                            <span>{t('forgotYourPassword')}</span>
                            <span className="arrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span>
                        </h4>                        
                    </a></Link>:
                     <h4 onClick={()=>props.setFP()} className=" forgetPassword anoRegular alignCenter">
                        <span>{t('forgotYourPassword')}</span>
                        <span className="arrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span>
                    </h4>
                    }
                </div>
            </div>
            <style jsx>{`
                .dobError{
                    margin-top:0.5rem;
                }

                .allTierContainer, .checkBoxSection, .orderHeadings{
                    display:flex;
                }
                .orderDetails .trackOrder, .needHelp{
                    cursor:pointer;
                }                
                .dotsContainer{
                    transform: translateY(-2px);
                    margin-right:4px;
                }
                .dots{
                    width: 4px;
                    height: 4px;
                    background: #787878;
                    display: inline-block;
                    margin-right: 4px;
                    border-radius: 50%;
                }
                .paymentCardImg{
                    width:2.6rem;
                    height:1.6rem;
                    margin-right:8px;
                }
                .giftBox.one, .giftCard, .giftBox.product, .deliveryDetailsHeading{
                    margin-bottom:2.4rem;
                }
                .userLoggedIn.default .tier3Wrapper{
                    padding-right:5.2rem;
                }
                .userLoggedIn .tier3Wrapper{
                    padding-right:0;
                }
                .thirdPartyLoginIcon{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .trackOrder{
                    margin-bottom:4.8rem;
                }
                .listOfOrders{
                    padding-bottom:10rem;
                }
                .singleOrder{
                    margin-bottom:2.4rem;
                }
                .activeOrder .shippedDate{
                    color:#000000;
                }
                .backButton{
                    margin-bottom:4.8rem;
                    cursor:pointer;
                }
                .backLabelFP{
                    margin-left:0.8rem;
                }
                .orderArrow{
                    position:absolute;
                    right:0;
                    top:0;
                }
                .orderNumber{
                    cursor:pointer;
                }
                .orderDetails .shippedDate{
                    margin-bottom:3.2rem;
                }
                .orderDetails .orderNumber{
                    margin-bottom:1.6rem;
                }
                .orderNumber, .orderPlaced{
                    margin-bottom:0.8rem;
                }
                .orderHeadings .orderWhere{
                    cursor:pointer;
                }
                .orderHeadings{
                    margin-bottom:3.6rem;
                }
                .orderHeadings .orderWhere.online{
                    margin-right:2.4rem;
                }
                .loggedIn .signInContent{
                    margin-bottom:4.8rem;
                }
                .sectionHeading, .sectionSubHeading, .loggedInMainHeading{
                    opacity:0;
                    animation:fadeUpAnimation 0.7s ease-out forwards; 
                }
                .loggedInSection{
                    padding-bottom: 4rem;
                }
                .subSection{
                    display:flex;
                    margin-bottom:4.8rem;
                }
                .subSection.services{
                    margin-bottom:9.2rem;
                }
                .subSection .sectionHeading{
                    width:30%;
                }
                .sectionSubHeadingLine{
                    width:70%;
                }
                .sectionSubHeading .arrowSymbol{
                    top:-2px;
                } 
                .sectionSubHeading .label{
                    display: inline-block;
                    cursor:pointer;
                }
                .sectionSubHeading{
                    margin-bottom:1.6rem;
                }
                .sectionSubHeading.three,
                .subSection.services .sectionSubHeading.two{
                    margin-bottom:0;
                }
                .loggedInMainHeading{
                    margin-bottom:4.8rem;
                }
                .trackOrder .signInContent span{
                    text-decoration:underline;
                    cursor:pointer;
                }
                .trackOrder .signInEmail{
                    margin-bottom:1.6rem;
                } 
                .trackOrder .inputComponentForm h4{
                    margin-bottom:4.8rem;
                    letter-spacing: 0.4px;
                }
                .giftCardStatus .forgetPassword{
                    margin-bottom:13.1rem;
                }
                .questionMark{
                    margin-left:2.4rem;
                }
                .checkAnotherGiftCard{
                    margin-bottom:3.5rem;
                }
                .giftCardDetails{
                    padding-bottom:1.6rem;
                    border-bottom:1px solid #787878;
                    margin-bottom:4.8rem;
                }
                .checkAnotherGiftCard, .applySameGiftCard{
                    width:100%;
                }
                .applySameGiftCard{
                    margin-bottom:3.5rem;
                }
                .giftCardMainLine{
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:1.8rem;
                }
                .tickOnGiftCard{
                    position:absolute;
                    right: 0;
                    bottom: 2px;
                }
                .orSeperation{
                    margin-bottom:2.4rem;
                }
                .register .signInEmail.lastName{
                    margin-bottom:3.2rem;
                }
                .checkBoxSection{
                    margin-bottom:3.2rem;
                }
                .checkBoxSection .checkBox{
                    margin-right:1.6rem;
                } 
                .checkBoxSection h4{
                    letter-spacing:0.5px;
                }
                .dobHeading{
                    display:flex;
                    //justify-content:center;
                    align-items:end;
                    margin-bottom:4.8rem;
                }
                .dobForm{
                    display:flex;
                    margin-bottom:4.8rem;
                    margin-right:-2.4rem;
                }
                .dobForm div{
                    padding-right:2.4rem;
                    width:33.33%;
                }
                .greet{
                    margin-bottom:1.6rem;
                }
                .signInContent{
                    margin-bottom:7.2rem;
                }
                .signInEmail, .signInPassword{
                    margin-bottom:4.8rem;
                }
                .resetPassword.firstError .signInEmail{
                    margin-bottom:7.8rem;
                }
                .resetPassword.secondError button,
                .resetPassword.firstError button{
                    pointer-events:none;
                }
                .signInSubmitButton{
                    margin-bottom:3.2rem;
                }
                .forgetPassword{
                    cursor:pointer;
                    margin-bottom:3.2rem;
                }
                .forgetPassword .arrow{
                    margin-left:0.8rem;
                }
                .socialLoginContainer{
                    margin-bottom:5.2rem;
                }
                .socialLoginHeading{
                    margin-bottom:2.4rem;
                }
                .socialLoginIcons{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                }
                .socialLoginIcon{
                    width:4.8rem;
                    height:4.8rem;
                    border-radius:50%;
                    background:#C4C4C4;
                    cursor:pointer;
                }
                .socialLoginIcon a{
                    width:100%;
                    height:100%;
                    display: inline-block;
                }
                .socialLoginIcon.one{
                    margin-right:2.4rem;
                }
                .allTierContainer .notLoggedIn,
                .allTierContainer .loggedInSection{
                    color:#787878;
                }
                .allTierContainer .notLoggedIn .heading .active,
                .allTierContainer.default .notLoggedIn,
                .allTierContainer .loggedInSection .sectionSubHeading .active,
                .allTierContainer.default .loggedInSection,
                .allTierContainer .loggedInSection .loggedInMainHeading{
                    color:#000000;
                }
                .defaultImg1{
                    text-align:center;
                }
                .defaultImg1 .storeImg{
                    opacity:0;
                    margin-bottom:4.8rem;
                    animation:fadeUpAnimation 0.7s ease-out forwards;
                }
                .defaultImg1 .storeName{
                    opacity:0;
                    //margin-bottom:8rem;
                    animation:fadeUpAnimation 0.7s ease-out forwards;
                }
                .tier1 .notLoggedIn > *{
                    opacity:0;
                    animation:fadeUpAnimation 0.7s ease-out forwards;
                }
                .mainContent{
                    padding-bottom:8.4rem;
                }
                .countryAndLang{
                    position:absolute;
                    padding-bottom: 4.8rem;
                    padding-top: 3rem;
                    bottom: 0;
                    background: #ffffff;
                    width: 28%;
                }
                .countryAndLang .country{
                    margin-right:3.2rem;
                    opacity:0;
                    animation:fadeUpAnimation 0.7s ease-out forwards;
                }
                .countryAndLang .dropDown{
                    margin-left:0.8rem;
                }
                .countryAndLang .lang{
                    opacity:0;
                    animation:fadeUpAnimation 0.7s ease-out forwards;
                }
                .orderContent{
                    letter-spacing: 0.4px;
                    margin-bottom:9.6rem;
                }
                .heading{
                    padding-bottom:1.6rem;
                    cursor:pointer;
                }
                .heading .label{
                    display:inline-block;
                }
                .heading.two{
                    margin-bottom:4.8rem;
                }
                .heading.five{
                    margin-bottom:0.8rem;
                }
                .arrowSymbol{
                    position:absolute;
                    right:0.2rem;
                    top:0;
                }
                .tier1,.tier3,.tier2{
                    height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                    width:33.333%;
                    position:relative;
                }
                .tier1Wrapper::-webkit-scrollbar, 
                .tier2Wrapper::-webkit-scrollbar,
                .tier3Wrapper::-webkit-scrollbar {
                    display: none;
                }
                .tier1Wrapper{
                    padding-top:16rem;
                    padding-right:5.2rem;
                    padding-bottom: 7.5rem;
                    overflow-y:scroll;
                    height:100%;
                    width:100%;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .tier1::after, .tier2::after{
                    position: absolute;
                    content: "";
                    top: 16rem;
                    right:0;
                    background: #787878;
                    width: 1px;
                    height: 0%;
                }
                .tier1::after{
                    animation:lineAnimation 0.3s ease-out forwards 1.3s;
                }
                .tier2::after{
                    animation:lineAnimation 0.3s ease-out forwards 1.9s;
                }
                .tier2Wrapper, .tier3Wrapper{
                    padding-top:16rem;
                    padding-right:5.2rem;
                    padding-left:5.2rem;
                    overflow-y:scroll;
                    height:100%;
                    width:100%;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .welcome{
                    margin-bottom:4.8rem;
                    color:#000000;
                }
                .countryAndLang, .country, .lang{
                    display:flex;
                }
                .closeLabel{
                    margin-right:0.8rem;
                }
                .storeImg1{
                    margin-bottom:4.8rem;
                }
                .storeName1{
                    text-align:center;
                }
                .logoDark{
                    width:104px;
                }
                @keyframes fadeUpAnimation{
                    0% {
                        opacity:0;
                        transform-origin:bottom;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity:1;
                        transform-origin:top;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        transform: translateY(0);
                    }
                }
                @keyframes lineAnimation{
                    from{
                        height: 0%;
                    }
                    to{
                        height:72%;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .closeLabel{
                        margin-right:0rem;
                    }
                    .navItemsMyUnsaid{
                        padding-top: 1.6rem;
                        padding-bottom: 1.6rem;
                        height:auto;
                    }
                    .allTierContainer{
                        display:block;
                    }
                    .tier1,.tier3,.tier2{
                        //height:${props.common.windowHeight}px;
                        width:100%;
                    }
                    .tier1::after, .tier2::after{
                        animation:none;
                        display:none;
                    }
                    .tier1Wrapper{
                        padding-top:8rem;
                        padding-right:0rem;
                        padding-bottom: 0rem;
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                    }
                    .tier3Wrapper,.tier2Wrapper{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    .mainContent{
                        padding-bottom:0rem;
                        font-size:2rem;
                    }
                    .welcome{
                        font-size:2rem;
                        margin-bottom:3.2rem;
                    }
                    .heading.two, .heading.five{
                        padding-bottom:0;
                    }
                    .countryAndLang.desktop{
                        display:none;
                    }
                    .countryAndLang{
                        width: 100%;
                        justify-content: space-between;
                        padding-bottom: 2.2rem;
                        padding-top: 2.2rem;
                        position:static;
                    }
                    .countryAndLang .dropDown{
                        padding-right:1px;
                    }
                    .tier2Wrapper .countryAndLang{
                        width:100%;
                    }
                    .tier2,.tier3{
                        position: absolute;
                        width: 100%;
                        top: 0;
                        left: 0;
                        background: #ffffff;
                        transform: translateX(100%);
                        transition:all 0.3s ease-out;
                    }
                    .tier2MobileActive .tier2,
                    .tier3MobileActive .tier3{
                        transform: translateX(0%);
                    }
                    .tier2Wrapper, .tier3Wrapper{
                        padding-top:7.2rem;
                        padding-right:3.6rem;
                        padding-left:3.6rem;
                    }
                    .userLoggedIn.default .tier3Wrapper{
                        padding-right:3.6rem;
                    }
                    .userLoggedIn .tier3Wrapper{
                        padding-right:3.6rem;
                    }
                    .cross{
                        display:none;
                    }
                    .backButton.mobile{
                        margin-bottom:3.2rem;
                    }
                    .greet{
                        font-size:2rem;
                        margin-bottom:0.8rem;
                    }
                    .signInContent{
                        letter-spacing: 0.5px;
                        margin-bottom:5.6rem;
                    }
                    .forgotPassword .backButton{
                        margin-bottom:3.2rem;
                    }
                    .allTierContainer .notLoggedIn,
                    .allTierContainer .loggedInSection{
                        color:#000000;
                    }
                    .navItemFirst{
                        opacity:0;
                    }
                    .socialLoginIcon{
                        width:3.2rem;
                        height:3.2rem;
                    }
                    .loggedInMainHeading{
                        font-size:2rem;
                        margin-bottom:3.2rem;
                    }
                    .subSection.services{
                        margin-bottom:4.8rem;
                    }
                    .orderArrow{
                        right:1px;
                    }
                    .loggedIn .signInContent{
                        margin-bottom:3.2rem;
                    }
                    .orderHeadings{
                        margin-bottom:3.2rem;
                    }
                }
            `}</style> 
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}

export default connect(mapStateToProps,{storeSelection,showExploreMenu,showMyUnsaidMenu})(Login);