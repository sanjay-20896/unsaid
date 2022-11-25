
import { useEffect, useRef, useState } from "react"
import { UNSAID_API} from "../branch-specific-config"
import { TOKEN_VAR_NAME } from "../config"
import {connect} from 'react-redux'
import {storeSelection} from '../redux/actions'
import Input from './input'
import Loader from './loader'
import Link from "next/link"
import useTranslation from 'next-translate/useTranslation'
function Register(props){
    const {t}=useTranslation('common');
    const [agreed,setAgreed] = useState(false)
    const [registerEmail, setRegisterEmail] = useState(null)
    const [emailError,setEmailError]=useState(true)
    const [emailErrorMsg, setEmailErrorMsg] = useState(t('invalidEmailError'))
    const [emailTouched,setEmailTouched]=useState(false)
    const [registerDetails, setRegisterDetails] = useState(false)
    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)
    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(true)
    const [lastNameTouched,setLastNameTouched] = useState(false)
    const [date, setDate] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [dobError,setDobError]=useState(false)
    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState(true)
    const [passwordTouched,setPasswordTouched] = useState(false)
    const [unexpectedError,setUnexpectedError] = useState(false)
    const [loading, setLoading] = useState(false)
    const registerEmailRef = useRef(null)
    const finalSubmitButtonRef = useRef(null)
    function validateEmail(val){
        // var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(val.match(mailformat)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }
    }
    function registerEmailInputValue(event){
        setRegisterEmail(event.target.value)
        validateEmail(event.target.value)
        setEmailTouched(true)
        setEmailErrorMsg(t('invalidEmailError'))
    }
    function handleKeyDown(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            !registerDetails && registerEmailRef.current.click();
            return false;
        }
    }
    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            !registerError && finalSubmitButtonRef.current.click();
            return false;
        }
    }
    function validateFirstName(val){
        if(val.length < 2){
            setFirstNameError(true)
        } else {
            setFirstNameError(false)
        }
    }
    function onFirstNameChange(e){
        setFirstName(e.target.value);
        validateFirstName(e.target.value)
        setFirstNameTouched(true)
    }

    function validateLastName(val){
        if(val.length < 1){
            setLastNameError(true)
        }else{
            setLastNameError(false)
        }
    }
    function onLastNameChange(e){
        setLastName(e.target.value);
        validateLastName(e.target.value);
        setLastNameTouched(true)
    }
    function validatePassword(val){
        let value = val.toString()
        if(value.length < 8)
            setPasswordError(true)
        else
            setPasswordError(false)
    }
    function onPasswordChange(e){
        setPassword(e.target.value);
        validatePassword(e.target.value);
        setPasswordTouched(true)
    }
    function registerEmailValidation(email){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.match(mailformat)){
            setRegisterDetails(true)
            setEmailError(false)
        }
        else{
            setRegisterDetails(false)
            setEmailError(true)
        }
    }
    function dateChange(val){
        setDate(val)
        setDobError(false)
    }
    function monthChange(val){
        setMonth(val)
        setDobError(false)
    }
    function yearChange(val){
        setYear(val)
        setDobError(false)
    }
    async function handleRequest(){
        try {
            if(!registerError){
                setLoading(true)
                setDobError(false)
                setUnexpectedError(false)
                var reqBody={
                    email:registerEmail,
                    password:password,
                    firstName:firstName,
                    lastName:lastName,
                }
                if(!!month && !!date && !!year){
                    let dob1 = `${month}/${date}/${year}`
                    reqBody["dob"] = dob1;
                }
                let response=await fetch(`${UNSAID_API}/api/auth/signup`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        },
                    body:JSON.stringify(
                        reqBody
                    ),
                })
                if(response.status==201){
                    setLoading(false)
                    let selection= await response.json()
                    // console.log("register success selection", selection);
                    localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                    props.storeSelection(selection)
                    if(props.success){
                        props.setSuccess(true)
                        window.scrollTo(0,0)
                    }
                }else{
                    setLoading(false)
                    let res=await response.json();
                    if(!!res.errors && !!res.errors.email){
                        setEmailError(true);
                    }
                    if(!!res.status && res.status==="email_exists"){
                        setEmailError(true);
                        setEmailErrorMsg(t('emailAlreadyRegistered'))
                    }
                    if(!!res.status && res.status==="server_error"){
                        setUnexpectedError(true)
                    }
                    if(!!res.errors && !!res.errors.firstName){
                        setFirstNameError(true)
                    }
                    if(!!res.errors && !!res.errors.lastName){
                        setLastNameError(true)
                    }
                    if(!!res.errors && !!res.errors.password){
                        setPasswordError(true)
                    }
                    if(!!res.errors && !!res.errors.dob){
                        setDobError(true)
                    }

                }
            }
        } catch (error) {
            setUnexpectedError(true)
            setLoading(false);
        }
    }
    let registerError= emailError || firstNameError || lastNameError || passwordError || dobError || !agreed
    let btnContentRegister = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('createAccount')
    return (
        <>   
            <div className="inputComponentForm">
                <div className="signInEmail registerEmail">
                    <Input error={emailTouched && emailError} errorMsg={emailErrorMsg} enterKeyPressed={handleKeyDown} value={registerEmail} type="email" placeHolder={t('email')} onChangeValue={registerEmailInputValue} required={true}/>
                </div>
                {registerDetails &&
                    <>
                        <div className="signInEmail firstName"><Input enterKeyPressed={submitWhenEnter} error={firstNameTouched && firstNameError} errorMsg={t('invalidName')} type="text" placeHolder={t('firstName')} onChangeValue={onFirstNameChange} value={firstName} required={true}/></div>
                        <div className="signInEmail lastName"><Input enterKeyPressed={submitWhenEnter} error={lastNameTouched && lastNameError} errorMsg={t('invalidName')} type="text" placeHolder={t('lastName')} onChangeValue={onLastNameChange} value={lastName} required={true}/></div>
                        <div className="DOB">
                            <div className="dobHeading font16 anoHalfRegular">
                                <div>{t('dob')}</div> 
                            </div>
                            <div className="dobForm">
                                <div><Input enterKeyPressed={submitWhenEnter} maxlength={2} type="number" placeHolder="DD" onChangeValue={(e)=>dateChange(e.target.value)} value={date}/></div>
                                <div><Input enterKeyPressed={submitWhenEnter} maxlength={2} type="number" placeHolder="MM" onChangeValue={(e)=>monthChange(e.target.value)} value={month}/></div>
                                <div><Input enterKeyPressed={submitWhenEnter} maxlength={4} type="number" placeHolder="YYYY" onChangeValue={(e)=>yearChange(e.target.value)} value={year}/></div>
                            </div>
                            {dobError && <div className="dobError error">{t('invalidDateOfBirth')}</div>}
                        </div>
                        <div className="signInEmail password"><Input enterKeyPressed={submitWhenEnter} password={true} error={passwordTouched && passwordError} errorMsg={t('PasswordLengthMessage')} type="password" placeHolder={t('password')} onChangeValue={onPasswordChange} value={password} required={true}/></div>
                        <div className="checkBoxSection">
                            <div className="checkBox">
                                <input type="checkbox" checked={agreed} value="I agree" onChange={()=>setAgreed(!agreed)} required />
                            </div>
                            <h4 className="anoHalfRegular">{t('privacyPolicyConsent1')} <a href="/privacy-policy" target="_blank">{t('privacyPolicyConsent2')}</a> {t('privacyPolicyConsent3')}</h4>
                        </div>
                    </>
                }
                {!registerDetails && <button ref={registerEmailRef} type="button" onClick={()=>registerEmailValidation(registerEmail)} className={`signInSubmitButton anoRegular btn width-100 font20 white ${emailError?"btnInactive":"btnPrimary"}`}>{t('continue')}</button>}
                {registerDetails && <button onClick={()=>handleRequest()} ref={finalSubmitButtonRef} className={`signInSubmitButton btn width-100 anoRegular font20 white ${registerError?"btnInactive":"btnPrimary"}`}>{btnContentRegister}</button>} 
                {unexpectedError &&
                    <div className="error unexpectedError">{t('UnexpectedErrorPleaseTryAgain')}</div>
                } 
            </div>  
            <style jsx>{`
                .checkBox input{
                    width:2.4rem;
                    height:2.4rem;
                }
                .signInEmail{
                    margin-bottom:4.8rem;
                }
                .signInEmail.lastName{
                    margin-bottom:3.2rem;
                }
                .dobHeading{
                    display:flex;
                    //justify-content:center;
                    align-items:end;
                    margin-bottom:4.8rem;
                }
                .questionMark{
                    margin-left:2.4rem;
                }
                .dobForm{
                    display:flex;
                    margin-right:-2.4rem;
                }
                .DOB{
                    margin-bottom:4.8rem;
                }
                .dobForm div{
                    padding-right:2.4rem;
                    width:33.33%;
                }
                .dobError{
                    margin-top:0.5rem;
                }
                .checkBoxSection{
                    display:flex;
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
                .signInSubmitButton{
                    margin-bottom:3.2rem;
                }
            `}</style>
        </>
    )
}
export default connect(null,{storeSelection})(Register)