import React, { useState, useEffect, useRef } from 'react'
import Caret from './caret'
import { connect } from 'react-redux';
import Link from 'next/link'
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import Input from './input'
import {orders} from '../data/menuBar'
import {UNSAID_API} from '../branch-specific-config'
import {useRouter} from 'next/router'
import { getTokenFromLocalStorage } from '../functions';
import {gettingSelection,storeSelection,setLoggedIn,logout,flash,updateCartLikes,updateLikes,syncLikes,syncCartLikes,showMyUnsaidMenu,setShowNotification,showExploreMenu,showLogin,showRegister} from '../redux/actions'
import {TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI } from '../branch-specific-config';
import {getNestedObject} from '../functions'
import Loader from './loader'
import CountryAndLanguage from './countryAndLanguage'
import MyOrders from './myOrders'
import SingleOrderMenu from './singleOrderMenu'
import UpdateProfile from './updateProfile'
import Register from './register'
import AccountLogin from './accountLogin';
import ForgotPassword from './forgotPassword' 
import AccountRegister from './accountRegister'
import ImageAndTextMenu from './imageAndTextMenu'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables';
import useTranslation from 'next-translate/useTranslation'

function MyUnsaidMenu(props) {
    const Router = useRouter()
    const {t}=useTranslation('common');
    const [passwordResetOne, setPasswordResetOne] = useState(null);
    const [passwordResetTwo, setPasswordResetTwo] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(true);
    const [repeatPasswordError, setRepeatPasswordError] = useState(true);
    const [newPasswordTouched, setNewPasswordTouched] = useState(false);
    const [repeatPasswordTouched, setRepeatPasswordTouched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imgHeight, setImgHeight] = useState("auto");

    const [myUnsaidMenu, setMyUnsaidMenu] = useState(false)
    const [defaultState, setDefaultState] = useState(true)
    const [index, setIndex] = useState(null)
    const [registerEmail, setRegisterEmail] = useState(null)
    const [registerDetails, setRegisterDetails] = useState(false)
    const [giftCardValue, setGiftCardValue] = useState(null)
    const [giftCardDetailsShow, setGiftCardDetailsShow] = useState(false)
    const [giftCardError, setGiftCardError] = useState(true)
    const [giftCardTouched, setGiftCardErrorTouched] = useState(false)
    const [date, setDate] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [ordersIndex, setOrdersIndex] = useState(null)
    const [orderDetails, setOrderDetails] = useState(null)
    const [tier2Mobile, setTier2Mobile] = useState(false)
    const [tier3Mobile, setTier3Mobile] = useState(false)

    const [emailError,setEmailError]=useState(true)
    const [emailErrorMsg, setEmailErrorMsg] = useState(t('invalidEmailError'))
    const [emailTouched,setEmailTouched]=useState(false)

    const [sessionToken,setSessionToken] = useState("")
    const [redirectPath,setRedirectPath] = useState("")

    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)

    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(true)
    const [lastNameTouched,setLastNameTouched] = useState(false)

    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState(true)
    const [passwordTouched,setPasswordTouched] = useState(false)

    const [loginEmail,setLoginEmail] = useState("")
    const [loginEmailError,setLoginEmailError] = useState(true)
    const [loginEmailTouched,setLoginEmailTouched] = useState(false)

    const [loginPassword,setLoginPassword] = useState("")
    const [loginPasswordError,setLoginPasswordError] = useState(true)
    const [loginPasswordTouched,setLoginPasswordTouched] = useState(false)

    const [fpEmail,setFpEmail]=useState("")
    const [fpEmailError,setFpEmailError]=useState(true)
    const [fpEmailTouched,setFpEmailTouch]=useState(false)
    const [fpMsg, setFpMsg] = useState(false)
    const [likedProducts,setLikedProducts]=useState(null)
    const [dobError,setDobError]=useState(false)
    const [initDate,setInitDate] = useState(null)
    const [initMonth,setInitMonth] = useState(null)
    const [initYear,setInitYear] = useState(null)
    const [clearAnimationDelayTime,setClearAnimationDelayTime]=useState(false)
    const registerEmailRef=useRef();
    const giftCardValidationButtonRef=useRef();


    // function closeMenu(){
    //     setDefaultState(true)
    //     setIndex(null)
    // }
    let signInError= loginPasswordError || loginEmailError;
    let btnContentSignIn = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('signIn')
    let btnContentFP = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('send')

    let resetPasswordError = newPasswordError || repeatPasswordError
    let btnContentForReset = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('reset')
    function validateLoginEmail(val){
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(val.match(mailformat))
            setLoginEmailError(false)
        else
            setLoginEmailError(true)
    }
    function onLoginEmailChange(e){
        setLoginEmail(e.target.value)
        validateLoginEmail(e.target.value)
        setLoginEmailTouched(true)
    }

    
    function validateLoginPassword(val){
        let value = val.toString()
        if(value.length < 8)
            setLoginPasswordError(true)
        else
            setLoginPasswordError(false)
    }
    function onLoginPasswordChange(e){
        setLoginPassword(e.target.value);
        validateLoginPassword(e.target.value);
        setLoginPasswordTouched(true)
    }
    useEffect(()=>{
        if(props.selection.openLogin){
            setIndex(1)
            setDefaultState(false)
        }
    },[props.selection.openLogin])
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
                    setIndex(null)
                }else{
                    // console.log('login unsuccessfull',rawResponse.status);
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
    
    // FP
   

   
    function validateFpEmail(val){
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(val.match(mailformat))
            setFpEmailError(false)
        else
            setFpEmailError(true)
    }
    function onFpEmailChange(e){
        setFpEmail(e.target.value)
        validateFpEmail(e.target.value)
        setFpEmailTouch(true)
        setFpMsg(false)
    }

    async function handleSubmitFP(){
        try {
            if(!fpEmailError){
                setLoading(true)
                let response=await fetch(`${UNSAID_API}/api/auth/reset-password-link`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                       email:fpEmail
                    })
                })
                if(response.status==200){
                    setLoading(false)
                    // props.showMyUnsaidMenu(false)
                    // props.setShowNotification("Password reset link sent to your e-mail")
                    let body=await response.json();
                    // console.log("pass",body)
                    if(!!body.status && body.status==="ok"){
                        setFpMsg(true)
                    }
                    if(!!body.status && body.status==="server error"){
                        setFpEmailError(true)
                    }
                }else{
                    setLoading(false)
                    let res=await response.json();
                    // console.log("fail",res);
                    if(!!res.errors && !!res.errors.email){
                        setFpEmailError(true);
                    }
                    
                }
            }
        } catch (error) {
            setLoading(false)
        }

    }
    //......
    //reset password...
    
    function validateNewPassword(val){
        if(val.length<8){
            setNewPasswordError(true)
        }else{
            setNewPasswordError(false)
        }
    }
    function newPasswordOne(e){
        setPasswordResetOne(e.target.value);
        validateNewPassword(e.target.value);
        setNewPasswordTouched(true)
    }
    function validateRepeatPassword(val){
        if(val!=passwordResetOne){
            setRepeatPasswordError(true)
        }else{
            setRepeatPasswordError(false)
        }
    }
    function newPasswordTwo(e){
            setPasswordResetTwo(e.target.value);
            validateRepeatPassword(e.target.value)
            setRepeatPasswordTouched(true)
    }
    async function handleSubmitResetPassword() {
        try {
            if(!resetPasswordError){
                setLoading(true);
                let response =await fetch(`${UNSAID_API}/api/auth/new-password`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        i:Router.query.i,
                        id:Router.query.id,
                        password:passwordResetOne,
                        repeatPassword:passwordResetTwo
                    })
                })
                if(response.status==200){
                    setLoading(false);
                    // props.showMyUnsaidMenu(false)
                    // props.setShowNotification("Password reset success")
                    let body=await response.json();
                    // console.log(body)
                    localStorage.setItem(TOKEN_VAR_NAME,body.selection.token)
                    props.storeSelection(body.selection)
                    if(body.status==="ok"){
                        props.setLoggedIn(false);
                        Router.push("/");
                    }
                }else{
                    setLoading(false);
                }
            }
        } catch (error) {
            setLoading(false);
        }
    }
    //....


    function handleKeyDownGiftCard(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            giftCardValidationButtonRef.current.click();
            return false;
        }
    }
    function setGiftCardValueFun(event){
        setGiftCardValue(event.target.value)
        setGiftCardErrorTouched(true)
        if(event.target.value==="GIFT-1234-1234"){
            setGiftCardError(false)
        }else{
            setGiftCardError(true)
        }
    }
    function giftCardValidation(giftCard){
        if(giftCard==="GIFT-1234-1234"){
            setGiftCardDetailsShow(true)
        }else{
            setGiftCardDetailsShow(false)
        }
    }

    useEffect(()=>{
        setRegisterDetails(false)
        setRegisterEmail(null)
        setGiftCardDetailsShow(false)
        setGiftCardValue(null)
        setFirstName("")
        setLastName("")
        setDate(null)
        setMonth(null)
        setYear(null)
        setPassword(null)
        setLoginPassword("")
        setLoginEmail("")
        setLoginPasswordTouched(false)
        setLoginEmailTouched(false)
        setEmailTouched(false)
        setEmailError(true)
        setFirstNameTouched(false)
        setFirstName(null)
        setLastNameTouched(false)
        setLastName(null)
        setPasswordTouched(false)
        setPassword(null)
        setFpEmailTouch(false)
        setFpEmail(null)
        setFpMsg(null)
        setForgotPassword(false)
        setPasswordResetOne(null)
        setPasswordResetTwo(null)
        setNewPasswordTouched(false)
        setRepeatPasswordTouched(false)
        setOrdersIndex(null)
    },[index])
    // function loadCalendaly(){
    //     if(!isCalendlyLoaded.current){
    //         isCalendlyLoaded.current = true
    //         let calendlyJs = document.createElement('script');
    //         calendlyJs.src = "https://assets.calendly.com/assets/external/widget.js";
    //         var calendlyStyle = document.createElement('link');
    //         calendlyStyle.rel = 'stylesheet';
    //         calendlyStyle.type = 'text/css';
    //         calendlyStyle.href = "https://assets.calendly.com/assets/external/widget.css";
    //         document.head.appendChild(calendlyStyle);
    //     }
    // }
    useEffect(()=>{
        if(props.common.showMyUnsaidMenu){
            // loadCalendaly()
            setMyUnsaidMenu(true)
            if(props.common.myUnsaidMenuIndex!==null){
                setTier2Mobile(true)
                setDefaultState(false)
                setIndex(2)
            }
        }
        if(!props.common.showMyUnsaidMenu){
            setMyUnsaidMenu(false)
            setDefaultState(true)
            setIndex(null)
            setRegisterDetails(false)
            setGiftCardDetailsShow(false)
            setOrderDetails(null)
            setOrdersIndex(null)
            setTier2Mobile(false)
            props.showLogin(false)
            props.showRegister(false)
            setClearAnimationDelayTime(false)
        }
    },[props.common.showMyUnsaidMenu])
  
    function orderDataSet(data){
        // console.log('order set',data)
        setOrderDetails(null)
        setTimeout(() => {
            setOrderDetails(data)
        }, 100);
    }
    useEffect(()=>{
        if(props.selection.openRegister){
            setIndex(2)
            setDefaultState(false)
        }
    },[props.selection.openRegister])
    
    useEffect(()=>{
        setSessionToken(getTokenFromLocalStorage())
        setRedirectPath(Router.pathname)
    },[])

    useEffect(()=>{
        setLoginPassword("")
        setLoginEmail("")
        setIndex(null)
        setDefaultState(true)
        setTier2Mobile(false)
        setTier3Mobile(false)
        
    },[!!getNestedObject(props.selection,['selection','loggedIn'])])

    useEffect(()=>{
        if(props.selection.loggedIn){
            setIndex(3);
            setDefaultState(false)
            setTier2Mobile(true)
        }
    },[props.selection.loggedIn])
    
    let imageHeight = props.common.windowHeight - (160 + 48 + 48);

    useEffect(() => {
        if(imageHeight <= 580){
            setImgHeight(imageHeight)
        }else{
            setImgHeight("auto");
        }
    }, [imageHeight])
    function showMyUnsaidMenu(){
        props.showMyUnsaidMenu(false);
        setTimeout(()=>{
            props.showExploreMenu(true)
        },500)
    }
    function onSuccess(state){
        if(state){
            setIndex(null)
        }
    }
    function performActions(index){
        setDefaultState(false)
        setIndex(index)
    }
    function onMenuItemClick(newIndex,customAction,isLink,noMobileAction){        
        if(!noMobileAction && newIndex!==index){
            setTier2Mobile(true)
        } 
        if(customAction=="calendly_init"){
            Calendly.initPopupWidget({url: 'https://calendly.com/unsaidstore'})
            return false
        }
        if(isLink)
            props.showMyUnsaidMenu(false)
        //this condition is necessary because mouse hover already takes care of the actions in desktops
        if(newIndex!==index)
            performActions(newIndex)
    }   
    function onMouseEnterMenuItem(newIndex){
        if(newIndex!==index)
            performActions(newIndex)   
    }
    function restoreBackToDefault(){
        setIndex(null)
        setDefaultState(true)
        setClearAnimationDelayTime(true)
    }
    return (
        <>
            <div className={`myUnsaidMenuWrapper width-100`}>
                {myUnsaidMenu &&
                <div className={`allTierContainer positionRelative paddedContent ${tier3Mobile?"tier3MobileActive":""} ${tier2Mobile?"tier2MobileActive":""} ${defaultState?"default":""} ${!!getNestedObject(props.selection,['selection','loggedIn'])?"userLoggedIn":""}` }>
                    <div style={{height:props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"}} className={`tier1`} onMouseEnter={()=>{setOrderDetails(null),setOrdersIndex(null)}}>
                        <div className="tier1Wrapper"> 
                            {!!getNestedObject(props.selection,['selection','loggedIn']) ? <></>: 
                                <div className="notLoggedIn">
                                    <h1 style={{animationDelay:"0.32s"}} onMouseEnter={()=>{restoreBackToDefault()}} className="welcome canelaThin font24">{t('welcomeToUnsaid')}</h1>
                                    <div onClick={()=>onMenuItemClick(1)} className= {`heading one positionRelative font20 canelaThin`} >
                                        <Link href={"/myunsaid/"}><a onClick={()=>{props.showMyUnsaidMenu(false)}}>
                                            <div  onMouseEnter={()=>onMouseEnterMenuItem(1)}  className={`label ${index===1?"active":""}`}>{t('signIn')}</div>
                                         </a></Link>
                                         <span className="arrowSymbol"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span>
                                    </div>
                                    <div onClick={()=>onMenuItemClick(2)}  className= {`heading two positionRelative font20 canelaThin`} >
                                        <Link href={"/myunsaid/register/"}><a onClick={()=>{props.showMyUnsaidMenu(false)}} ><div onMouseEnter={()=>onMouseEnterMenuItem(2)}  className={`label ${index===2?"active":""}`}>{t('register')}</div>
                                        </a></Link>
                                        <span className="arrowSymbol"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span>
                                    </div>
                                    <div style={{animationDelay:"0.38s"}} onMouseEnter={()=>{restoreBackToDefault()}} className="mainContent anoHalfRegular font16-notResponsive">{t('privacyMsgPart1')}<br/>{t('privacyMsgPart2')}</div>
                                </div>
                            }
                            {!!getNestedObject(props.selection,['selection','loggedIn']) &&
                                <div className="loggedInSection">
                                    <div style={{animationDelay:"0.2s"}} onMouseEnter={()=>{restoreBackToDefault()}} className="loggedInMainHeading canelaThin font24">My Unsaid</div>
                                    <div className={`subSection account`}>
                                        <div style={{animationDelay:"0.3s"}} className="sectionHeading font16 anoRegular" onMouseEnter={()=>{restoreBackToDefault()}}>{t('account')}</div>
                                        <div className="sectionSubHeadingLine">
                                             <div onClick={()=>onMenuItemClick(1)} style={{animationDelay:"0.6s"}} className= {`sectionSubHeading one positionRelative font20 canelaThin`}><div onMouseEnter={()=>onMouseEnterMenuItem(1)} className={`label ${index===1?"active":""}`}>{t('profile')}</div><span className="arrowSymbol cursorPointer" onMouseEnter={()=>onMouseEnterMenuItem(1)}><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span></div>
                                             <div onClick={()=>onMenuItemClick(2)} style={{animationDelay:"0.7s"}} className= {`sectionSubHeading two positionRelative font20 canelaThin`}><div onMouseEnter={()=>onMouseEnterMenuItem(2)} className={`label ${index===2?"active":""}`}>{t('orders')}</div><span className="arrowSymbol cursorPointer" onMouseEnter={()=>onMouseEnterMenuItem(2)}><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span></div>
                                             <div onClick={()=>props.logout()}  style={{animationDelay:"0.8s"}} className= {`sectionSubHeading three positionRelative font20 canelaThin`}><div onMouseEnter={()=>onMouseEnterMenuItem(3)} className={`label ${index===3?"active":""}`}>{t('signOut')}</div></div>
                                        </div>
                                    </div>
                                    <div className={`subSection services`}>
                                        <div style={{animationDelay:"0.4s"}} className="sectionHeading font16 anoRegular" onMouseEnter={()=>{restoreBackToDefault()}}>{t('services')}</div>
                                        <div className="sectionSubHeadingLine">
                                             <div style={{animationDelay:"0.9s"}} className= {`sectionSubHeading one positionRelative font20 canelaThin`} onClick={()=>onMenuItemClick(4,"calendly_init",false,true)}><div className={`label ${index===4?"active":""}`}  onMouseEnter={()=>onMouseEnterMenuItem(4)}>{t('requestAnAppointment')}</div></div>
                                             <div style={{animationDelay:"1s"}} className={`sectionSubHeading two positionRelative font20 canelaThin`} onClick={()=>onMenuItemClick(6,null,true,true)}>
                                                <Link href="/contact-us"><a onClick={()=>props.showMyUnsaidMenu(false)}>
                                                    <div className={`label ${index===5?"active":""}`} onMouseEnter={()=>onMouseEnterMenuItem(5)}>{t('contactUs')}</div>
                                                </a></Link>
                                            </div>
                                            <div style={{animationDelay:"1.1s"}} className={`sectionSubHeading three  faq positionRelative font20 canelaThin`} onClick={()=>onMenuItemClick(6,null,true,true)}>
                                                <Link href="/faq"><a onClick={()=>props.showMyUnsaidMenu(false)}>
                                                    <div className={`label ${index===6?"active":""}`} onMouseEnter={()=>onMouseEnterMenuItem(6)}>FAQ</div>
                                                </a></Link>
                                            </div>
                                            <div style={{animationDelay:"1.2s"}} className={`sectionSubHeading positionRelative store font20 canelaThin`} onClick={()=>onMenuItemClick(7,null,true,true)}>
                                                <Link href="/our-store"><a onClick={()=>props.showMyUnsaidMenu(false)}>
                                                    <div className={`label ${index===7?"active":""}`} onMouseEnter={()=>onMouseEnterMenuItem(7)}>{t('ourStore')}</div>
                                                </a></Link>
                                                <span className="arrowSymbol ourStoreCaret" onMouseEnter={()=>onMouseEnterMenuItem(7)}>
                                                    <Link href="/our-store"><a><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></a></Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="announcementTabletAndBelow">
                                <Link href="/lab-grown-diamonds"><a onClick={()=>props.showMyUnsaidMenu(false)}>
                                    <div className="defaultImgMobile">
                                        <img className="width-100" src="/images/menu-images/lab-grown-diamond-mobile.jpg"  />
                                    </div>

                                    <div className="imgHeading font16-notResponsive canelaThin">{t('labGrownDiamonds')}</div> 
                                </a></Link>
                                
                            </div>
                        </div>
                    </div>
                    <div style={{height:props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"}} className={`tier2 ${index && ![3,4,5,6,7].includes(index)?"showTab":""}`}>
                        <div className="tier2Wrapper">
                            <div className="secondPanelBackTab cursorPointer" onClick={()=>{setIndex(null)}}>
                                <span className="secondPanelBackCaret"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span>
                                <span className="secondPanelBackText anoRegular font16">{t('back1')}</span>
                            </div>
                            <div>
                                {!forgotPassword && <div style={{animationDelay:"0s"}} onClick={()=>{setTier2Mobile(false),setIndex(null)}} className="backButton showForMobile mobile font16 anoRegular fadeLeftToRightAnimation"><span className="backArrow"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span><span className="backLabelFP">{t('back1')}</span></div>}
                                {defaultState &&
                                    <div className="defaultImg1">
                                        <Link href="/lab-grown-diamonds"><a onClick={()=>props.showMyUnsaidMenu(false)}>
                                            <div style={{animationDelay:`${!!clearAnimationDelayTime?"0s":"0.86s"}`,height:imgHeight,overflow:"hidden"}} className="storeImg"><img className="width-100" src="/images/menu-images/lab-grown-diamond-desktop.jpg"/></div>
                                            <div style={{animationDelay:`${!!clearAnimationDelayTime?"0s":"0.86s"}`}} className="storeName canelaThin font20">{t('labGrownDiamonds')}</div>
                                        </a></Link>
                                    </div>
                                }
                                {!props?.selection?.selection?.loggedIn && index===1 && !forgotPassword &&
                                    <AccountLogin setFP={()=>setForgotPassword(true)} onSuccess={(state)=>{onSuccess(state)}}/>
                                }
                                {!props?.selection?.selection?.loggedIn && index===2 && 
                                    <AccountRegister />
                                }
                                {!props?.selection?.selection?.loggedIn && index===1 && forgotPassword && 
                                    <div className="signIn forgotPassword">
                                        <div style={{animationDelay:"0s"}} onClick={()=>{setForgotPassword(false), setFpEmail(null), setFpEmailError(false),setFpMsg(null)}} className="backButton font16 anoRegular fadeLeftToRightAnimation"><span className="backArrow"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span><span className="backLabelFP">{t('back1')}</span></div>
                                        <ForgotPassword />
                                    </div>
                                }
                                {!props?.selection?.selection?.loggedIn && index===3 &&
                                    <div className={`signIn resetPassword ${newPasswordTouched && newPasswordError?"firstError":""} ${repeatPasswordError?"secondError":""}`}>
                                        <h1 style={{animationDelay:"1.1s"}} className="greet canelaThin font20 fadeLeftToRightAnimation">{t('resetYourPassword')}</h1>
                                        <div style={{animationDelay:"1.2s"}} className="signInContent anoHalfRegular font16 fadeLeftToRightAnimation">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Blandit aliquam potenti et suspendisse dolor. Sed ultricies diam sagittis.</div>
                                        <div className="inputComponentForm">
                                            <div style={{animationDelay:"1.3s"}} className="signInEmail fadeLeftToRightAnimation"><Input error={newPasswordTouched && newPasswordError} password={true} errorMsg={"Password must be between 8 and 25 characters long"} type="password" placeHolder={t('newPassword')} onChangeValue={newPasswordOne} value={passwordResetOne}/></div>
                                            <div style={{animationDelay:"1.4s"}} className="signInPassword fadeLeftToRightAnimation"><Input error={repeatPasswordTouched && repeatPasswordError} errorMsg={"Password doesn’t match!"} type="password" placeHolder={t('repeatPassword')} onChangeValue={newPasswordTwo} value={passwordResetTwo}/></div>
                                            <button style={{animationDelay:"1.5s"}} className={`signInSubmitButton btn width-100 anoRegular font20 white fadeLeftToRightAnimation ${resetPasswordError?"btnInactive":"btnPrimary"}`} onClick={()=>handleSubmitResetPassword()}>{btnContentForReset}</button>
                                        </div>
                                    </div>
                                }
    
                                {!props?.selection?.selection?.loggedIn && index===4 && 
                                    <div className="signIn giftCardStatus">
                                        <h1 style={{animationDelay:"0s"}} className="greet canelaThin font20 fadeLeftToRightAnimation">{t('cardInformation')}</h1>
                                        <div style={{animationDelay:"0.1s"}} className="signInContent anoHalfRegular font16 fadeLeftToRightAnimation">{t('unsaidEmotionsMsg')}</div>
                                        <form className="inputComponentForm">
                                            <div style={{animationDelay:"0.2s"}} className="signInEmail registerEmail positionRelative fadeLeftToRightAnimation">
                                                <Input type="text" placeHolder="GIFT-XXXX-XXXX" placeHolderAfter="Gift card code" error={giftCardTouched && giftCardError} errorMsg={"Invalid card number!"} enterKeyPressed={handleKeyDownGiftCard} onChangeValue={setGiftCardValueFun}/>
                                                {giftCardDetailsShow && <div className="tickOnGiftCard"><img className="width-100" src="/images/Tick On.svg" /></div>}
                                            </div>
                                            {giftCardDetailsShow &&
                                            <>
                                                <div className="giftCardDetails">
                                                    <div className="giftCardMainLine">
                                                        <div className="giftAmountLabel anoRegular font16">Amount</div>
                                                        <div className="giftAmountValue anoRegular font20">€X,XXX</div>
                                                    </div>
                                                    <h4 className="anoRegular validity grey alignRight">Valid to March 31, 2022</h4>
                                                </div>
                                                <button className="btn btnPrimary anoRegular checkAnotherGiftCard">{t('checkAnother')}</button>
                                                <button className="btn btnSecondary anoRegular applySameGiftCard">{t('applyToCart')}</button>
                                            </>}
                                            {!giftCardDetailsShow && <button style={{animationDelay:"0.3s"}} ref={giftCardValidationButtonRef} onClick={()=>giftCardValidation(giftCardValue)} type="button" className={`btn width-100 signInSubmitButton anoRegular font20 white fadeLeftToRightAnimation ${giftCardError?"btnInactive":"btnPrimary"}`}>{t('checkGiftCard')}</button>}

                                        </form>
                                        <h4 style={{animationDelay:"0.4s"}} className="orSeperation alignCenter fadeLeftToRightAnimation">{t('or')}</h4>
                                        <h4 style={{animationDelay:"0.5s"}} className="forgetPassword anoRegular alignCenter fadeLeftToRightAnimation">
                                            <span>{t('buyGiftCard')}</span>
                                            <span className="arrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span>
                                        </h4>
                                    </div>
                                }
                                {!props?.selection?.selection?.loggedIn && index===5 && 
                                    <div className="signIn trackOrder">
                                        <h1 style={{animationDelay:"0s"}} className="greet canelaThin font20 fadeLeftToRightAnimation">{t('trackOrder')}</h1>
                                        <div style={{animationDelay:"0.1s"}} className="signInContent anoHalfRegular font16 fadeLeftToRightAnimation"><span>{t('signIn')}</span> {t('signInToSeeOrders')}</div>
                                        <form className="inputComponentForm">
                                            <div style={{animationDelay:"0.2s"}} className="signInEmail fadeLeftToRightAnimation"><Input type="text" placeHolder="Order number"/></div>
                                            <h4 style={{animationDelay:"0.3s"}} className="anoHalfRegular fadeLeftToRightAnimation">{t('charsNoSpace')}</h4>
                                            <div style={{animationDelay:"0.4s"}} className="signInEmail fadeLeftToRightAnimation"><Input type="text" placeHolder="Email or phone number"/></div>
                                            <h4 style={{animationDelay:"0.5s"}} className="anoHalfRegular fadeLeftToRightAnimation">{t('usedEmailAndNumber')}</h4>
                                            <button style={{animationDelay:"0.6s"}} type="submit" className="signInSubmitButton btn width-100 btnInactive anoRegular font20 white fadeLeftToRightAnimation">{t('applyOrderHistory')}</button>
                                        </form>
                                    </div>
                                }
                                {!!props?.selection?.selection?.loggedIn && index===2 && 
                                    <MyOrders orders={orders} ordersIndex={ordersIndex} setTier3Mobile={setTier3Mobile} setOrdersIndex={setOrdersIndex} orderDataSet={orderDataSet}/>
                                }
                                {!!props?.selection?.selection?.loggedIn && index===1 && 
                                    <div className="profileWrapper updateProfileWrapper">
                                        <UpdateProfile />
                                    </div>
                                }
                                {!!props?.selection?.selection?.loggedIn && index===7 && 
                                    <div className="profileWrapper">
                                        <ImageAndTextMenu img="/images/menu-images/our-store-desktop.jpg" imgMobile="/images/menu-images/our-store-mobile.jpg" text="Unsaid Store" linksTo="/our-store" lazy={true} />
                                    </div>
                                }
                            </div>
                            <div className="counAndLangContainer showForMobile">
                                <CountryAndLanguage fontClass="font16-notResponsive"/>
                            </div>
                        </div>
                    </div>

                    <div style={{height:props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"}} className={`tier3`}>
                        <div className="tier3Wrapper">
                            <div>
                                <div style={{animationDelay:"0s"}} onClick={()=>{setTier3Mobile(false)}} className="backButton showForMobile mobile font16 anoRegular fadeLeftToRightAnimation"><span className="backArrow"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span><span className="backLabelFP">{t('back1')}</span></div>
                                {defaultState &&
                                    <div className="defaultImg1">
                                        <Link href="/our-story"><a onClick={()=>props.showMyUnsaidMenu(false)}>
                                            <div style={{animationDelay:`${!!clearAnimationDelayTime?"0s":"0.88s"}`,height:imgHeight,overflow:"hidden"}} className="storeImg"><img className="width-100" src="/images/menu-images/our-story-desktop.jpg"/></div>
                                            <div style={{animationDelay:`${!!clearAnimationDelayTime?"0s":"0.86s"}`}} className="storeName canelaThin font20">{t('ourStory')}</div>
                                        </a></Link>
                                    </div>
                                }
                                {!!orderDetails && 
                                    <SingleOrderMenu orderDetails={orderDetails}/>
                                }
                            </div>
                            <div className="counAndLangContainer showForMobile">
                                <CountryAndLanguage fontClass="font16-notResponsive"/>
                            </div>
                        </div>
                    </div>
                    <div className="counAndLangContainer showForMobile">
                        <CountryAndLanguage fontClass="font16-notResponsive" />
                    </div>
                    <div className="countryAndLang desktop font16 anoRegular">
                        <CountryAndLanguage fontClass="font16-notResponsive" />
                    </div>
                </div>
                }
            </div>
                            
            <style jsx>{`
                .updateProfileWrapper{
                    padding-bottom: 10rem;
                }
                .announcementTabletAndBelow{
                    display:none;
                    margin-top: 3rem;
                }
                .defaultImgMobile{
                    margin-bottom:1.6rem;
                }
                .imgHeading{
                    margin-bottom:4rem;
                }
                .faq{
                    margin-top:1.6rem;
                }
                .store{
                    margin-top:1.6rem;
                }
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
                .loggedInSection{
                    padding-bottom: 4rem;
                }
                .subSection{
                    display:flex;
                    margin-bottom:4.8rem;
                }
                .subSection.services{
                    // margin-bottom:9.2rem;
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
                    margin-bottom:4.8rem;
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
                }
                .countryAndLang .dropDown{
                    margin-left:0.8rem;
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
                    padding-top:6rem;
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
                    top: 6rem;
                    right:0;
                    background: #787878;
                    width: 1px;
                    height: 0%;
                }
                .tier1::after{
                    animation:lineAnimation 0.15s ease-out forwards 0.2s;
                }
                .tier2::after{
                    animation:lineAnimation 0.15s ease-out forwards 0.2s;
                }
                .tier2Wrapper, .tier3Wrapper{
                    padding-top:6rem;
                    padding-right:5.2rem;
                    padding-left:5.2rem;
                    padding-bottom: ${defaultState || index===7 ?"0":"9.8rem"};
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
                @keyframes lineAnimation{
                    from{
                        height: 0%;
                    }
                    to{
                        height:72%;
                    }
                }
                .secondPanelBackTab{
                    display:none;
                }
                @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .ourStoreCaret{
                        display:none;
                    }
                }
                @media only screen and (max-width: 1025px){
                    .announcementTabletAndBelow{
                        display:block;
                    }
                    .exploreMenuContainer{
                        width:50%;
                    }
                    .thirdPanel{
                        width:50%;
                    }
                    .tier2{
                        position:absolute;
                        width:calc(50% - 6.4rem);
                        left:6.4rem;
                        transition: transform 0.15s linear;
                        transform:translateX(-100%) translateX(-6.4rem);
                        background:#ffffff; 
                    }
                    .tier2.showTab{
                        transform:translateX(0);
                    }
                    .tier1,.tier3{
                        width:50%;
                    }
                    .secondPanelBackTab{
                        display:block;
                        margin-bottom:2rem;
                    }
                    .secondPanelBackCaret{
                        margin-right:0.8rem;
                    }
                    .tier2Wrapper{
                        padding-left: 0;
                    }
                    .countryAndLang{
                        width: calc(50% - 6.5rem);
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .updateProfileWrapper{
                        padding-bottom: 5rem;
                    }
                    .counAndLangContainer{
                        padding-top:2.2rem;
                        padding-bottom:2.2rem;
                        position: fixed;
                        bottom: 0;
                        background: #ffffff;
                    }
                    .secondPanelBackTab{
                        display:none;
                    }
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
                        width:100%;
                    }
                    .tier1::after, .tier2::after{
                        animation:none;
                        display:none;
                    }
                    .tier1Wrapper{
                        padding-top:2rem;
                        padding-right:0rem;
                        padding-bottom: 8rem;
                        // display:flex;
                        // flex-direction:column;
                        // justify-content:space-between;
                    }
                    .tier3Wrapper,.tier2Wrapper{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }
                    .mainContent{
                        padding-bottom:0rem;
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
                        padding-top:2rem;
                        padding-right:${paddingLeftMobile};
                        padding-left:${paddingRightMobile};
                        padding-bottom:14rem;
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
export default connect(mapStateToProps,{gettingSelection,storeSelection,setLoggedIn,logout,flash,updateCartLikes,updateLikes,syncLikes,syncCartLikes,showMyUnsaidMenu,setShowNotification,showExploreMenu,showLogin,showRegister})(MyUnsaidMenu)


{/* <div className="showForMobile">
                    <div className="defaultImgMobile"><img className="width-100" src="/images/exploreMenuImg.png"/></div>
                    <div className="imgHeading font16 canelaThin">Easter egg hunt</div>
                    <div className="subscriptionFormDefault">
                        <form className="inputForm positionRelative font16 anoRegular">
                            <input type="text" id="fname" name="fname" placeholder="Sign up for our newsletter"/><br/>
                            <div className="submitButton"><Caret color="grey" direction="right" width="0.1rem" length="0.7rem"/></div>
                        </form>
                        <div className="signUpText mobile anoRegular">By signing up you agree to our <Link href="#"><a>privacy policy</a></Link> and <Link href="#"><a>terms and conditions</a></Link></div>
                    </div>
                </div>
                <div className="positionRelative">
                    <div className="countryAndLang font16 anoRegular">
                        <div className="country">
                            <div className="cName">Sweden - EUR €</div>
                            <div className="dropDown"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></div>
                        </div>
                        <div className="lang">
                            <div className="langName">English</div>
                            <div className="dropDown"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="storeWrapper defaultImg1">
                    <div className="storeImg"><img className="width-100" src="/images/frame1.png"/></div>
                    <div className="storeName canelaThin font20">Easter egg hunt</div>
                </div> */}
                {/* <div className="newsWrapper">
                    <div  className="storeWrapper defaultImg2">
                        <div className="storeImg1"><img className="width-100" src="/images/frame2.png"/></div>
                        <div className="storeName1 canelaThin font20">Sign up for our newsletter</div>
                    </div>
                </div> */}