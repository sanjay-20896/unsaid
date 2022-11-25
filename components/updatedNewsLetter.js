import {useEffect,useRef,useState} from 'react'
import Input from './input'
import {connect} from 'react-redux'
import Link from "next/link"
import Loader from "./loader"
import { RULE_SECRET,RULE_URI } from '../config'
import {setShowNewsletterPopup,preventBodyScroll} from "../redux/actions"
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from "../config"
import {UNSAID_API} from "../branch-specific-config"
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
function UpdatedNewsLetter(props) {
    const {t}=useTranslation('common');
    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)
    const [country,setCountry] = useState("")
    const [countryError,setCountryError] = useState(true)
    const [countryTouched,setCountryTouched] = useState(false)
    const [email,setEmail] = useState("")
    const [emailError,setEmailError] = useState(true)
    const [emailTouched,setEmailTouched] = useState(false)
    const [buttonLabel, setButtonLabel] = useState(t('submit'))
    const [animationState, setAnimationState] = useState("")
    const handleClickOutsideRef = useRef(null);
    const router = useRouter()

    let shippingCountries = props?.selection?.selection?.countries?props.selection.selection.countries:[]
    let countryOptions = shippingCountries.map(country=>{
        return {label:country.name,value:country.country,states:country.states}
    })

    let anyErrors= firstNameError || countryError || emailError;

    function validateFirstName(val){
        if(val.length < 1)
            setFirstNameError("min")
        else
            setFirstNameError(false)
    }
    function onFirstNameChange(val){
        setFirstNameTouched(true)
        validateFirstName(val)
        setFirstName(val)
    }
    
    function validateEmail(val){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!val.match(mailformat))
            setEmailError(true)
        else
            setEmailError(false)
    }
    function onEmailChange(val){
        setEmailTouched(true)
        validateEmail(val)
        setEmail(val)
    }

    function validateCountry(val){
        if(val==""){
            setCountryError(true)
            return
        }
        let i = countryOptions.findIndex(country=>country.label.toLowerCase()==val.toLowerCase())
        if(i > -1){
            setCountryError(false)
        }else{
            setCountryError(true)
        }
    }
    function onCountryChange(val){
        setCountryTouched(true)
        validateCountry(val)
        setCountry(val)
    }

    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            subscribeNewsLetter(email,firstName,country)
            return false;
        }
    }

    async function subscribeNewsLetter(email,firstName,country){
        if(!anyErrors){
            setButtonLabel(<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>)
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
                setButtonLabel(t('success'))
                onUserSubmit();
            }
        }
    }
    
    useEffect(()=>{
        let newsletterPopTimeStamp=localStorage.getItem("popupnewsletter");
        let newsletterSubmit=localStorage.getItem("popupnewsletterSubmit");
        let specificPath = (router.pathname==="/library") || (router.pathname==="/library/[slug]") || (router.pathname==="/our-story")
        if(!newsletterSubmit){
            if(newsletterPopTimeStamp){
                // console.log("newsletterPopTimeStamp");
                let newsletterSetDate = new Date(parseInt(newsletterPopTimeStamp))
                let currentDate = new Date();
                const diffTime = Math.abs(currentDate - newsletterSetDate)
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if(diffDays < 10){
                    // console.log("diffdays",diffDays);
                    props.setShowNewsletterPopup(false);
                }else{
                    if(specificPath) turnOnNewsletterAfterScroll();
                    else{
                        const myTimeout = setTimeout(turnOnNewsletter, 60000);
                    }
                }
            }else{
                if(specificPath) turnOnNewsletterAfterScroll();
                else{
                    const myTimeout = setTimeout(turnOnNewsletter, 60000);
                }
            }
        }
    },[])
    
    function turnOnNewsletterAfterScroll(){
        let body = window.document.body;
        function handleScroll() {
            let newsletterPopTimeStamp=localStorage.getItem("popupnewsletter");
            let height = (body.getBoundingClientRect().height / 100) * 65;
            let topOfPage = -body.getBoundingClientRect().top;
            if(topOfPage > height && !newsletterPopTimeStamp) turnOnNewsletter()
        }
        
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        }
    }
    function turnOnNewsletter() {
        props.setShowNewsletterPopup(true);
    }
    function onUserSubmit(){
        localStorage.setItem("popupnewsletterSubmit",true);
        localStorage.setItem("popupnewsletter",Date.now().toString())
        props.setShowNewsletterPopup(false)
    }
    function accept(){
        localStorage.setItem("popupnewsletter",Date.now().toString())
        props.setShowNewsletterPopup(false)
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (handleClickOutsideRef.current && !handleClickOutsideRef.current.contains(event.target)) {
                accept();
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);
    useEffect(()=>{
        if(props.common.showNewsletterPopup){
            setAnimationState("before")
            setTimeout(()=>{
                setAnimationState("before after")
            },200)
        }
    },[props.common.showNewsletterPopup])
    
  return (
    <>
        <div ref={handleClickOutsideRef} className={`updatedNewsLetterContainer ${animationState}`}>
            <div className="left"><img className="width-100" src="/images/updatedNL.jpg" alt="Newsletter Image"/></div>
            <div className="right positionRelative">
                <div className="textContainer">
                    <h2 className="font24-notResponsive canelaThin headingText">{t('unsaidLetters')}</h2>
                    <p className="font16-notResponsive anoHalfRegular desc">{t('signUpForExclusivePreviews')}</p>
                </div>
                <div className="inputForm">
                    <div className="nameAndCountry">
                        <div className="nameInput">
                            <Input enterKeyPressed={submitWhenEnter} type="text" onChangeValue={(e)=>onFirstNameChange(e.target.value)} value={firstName} error={firstNameTouched && !!firstNameError} errorMsg={firstNameError=="min"?t('required'):t('addressCharacterLimitMessage')} placeHolder={t('firstName')} required={false}/>
                        </div>
                        <div className="countryInput">
                            <Input enterKeyPressed={submitWhenEnter} type="text" onChangeValue={(e)=>onCountryChange(e.target.value)} onChange={(val)=>onCountryChange(val)} options={countryOptions} value={country} error={countryTouched && !!countryError} errorMsg={countryError?t('chooseFromDropdown'):""} placeHolder={t('country')} required={false}/>
                        </div>
                    </div>
                    <div className="emailInput">
                        <Input enterKeyPressed={submitWhenEnter} type="email" onChangeValue={(e)=>onEmailChange(e.target.value)} value={email} error={emailTouched && !!emailError} errorMsg={emailError?t('invalidEmailError'):""} placeHolder={t('emailAddress')} required={true}/>
                    </div>
                    <p className="privacyPolicy anoRegular font12 grey">{t('newsletterTextBelowTextBoxPart1')} <Link href="/privacy-policy"><a className="black underlineLR active">{t('privacy-policy')}</a></Link></p>
                    <button onClick={()=>subscribeNewsLetter(email,firstName,country)} className={`btn width-100 anoRegular font20 fadeUpAnimation ${anyErrors?"btnInactive":"btnPrimary"}`}>{buttonLabel}</button>
                </div>
                <div className="cross positionAbsolute cursorPointer" onClick={()=>{accept()}}>
                    <img src="/images/cross.svg" alt="cross" width="16" height="16"/>
                </div>
            </div>
        </div>
        <style jsx>{`
            .cross{
                top: 16px;
                right: 14px;
                padding: 1rem;
            }
            .left img{
                display:block;
                height: 100%;
            }
            .updatedNewsLetterContainer{
                width: 89.7rem;
                display:flex;
                background: #F2F2F2;
                opacity:0;
            }
            .updatedNewsLetterContainer.before{
                transform:translateY(50px);
                opacity:0;
            }
            .updatedNewsLetterContainer.after{
                transform:translateY(0px);
                opacity:1;
                transition: all 0.5s ease-out;
            }
            .privacyPolicy{
                margin-bottom: 2.7rem;
            }
            .desc{
                line-height: 21px;
                letter-spacing: 0.5px;
            }
            .emailInput{
                margin-bottom: 1.8rem;
            }
            .nameAndCountry{
                display: flex;
                margin-right: -1.9rem;
                margin-bottom: 4rem;
            }
            .nameAndCountry > div{
                width: 50%;
                padding-right: 1.9rem;
            }
            .textContainer{
                margin-bottom: 5.7rem;
            }
            .headingText{
                margin-bottom: 1rem;
            }
            .updatedNewsLetterContainer .left img{
                display:block;
            }
            .left{
                width: 42.6%;
            }
            .right{
                width: 57.4%;
                padding: 7.1rem 6.7rem 4.1rem;
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .left{
                    display:none;
                }
                .right{
                    width: 100%;
                } 
                .updatedNewsLetterContainer{
                    width: 53.7rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .updatedNewsLetterContainer{
                    width: 100%;
                }
                .right{
                    padding: 8.3rem 3.6rem 5.4rem;
                } 
            }
        `}</style>
    </>
  )
}
function mapStateToProps({selection,common}){
    return {selection,common}
}
export default connect(mapStateToProps,{setShowNewsletterPopup,preventBodyScroll})(UpdatedNewsLetter)