import Link from 'next/link';
import React, { useState } from 'react'
import BlackCheckBox from './BlackCheckBox';
import Input from "./input"
import {MOBILE_BREAKPOINT} from '../config'
import Loader from "./loader"
import { useRouter } from 'next/router'
import { UNSAID_API } from '../branch-specific-config'
import useTranslation from 'next-translate/useTranslation'
export default function WarrantyForm() {
    const {t}=useTranslation('common');
    const [firstName, setFirstName] = useState("");
    const [firstNameTouched, setFirstNameTouched] = useState(false);
    const [firstNameError, setFirstNameError] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastNameTouched, setLastNameTouched] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [dob, setDob] = useState("");
    const [dobTouched, setDobTouched] = useState(false);
    const [dobError, setDobError] = useState(false);
    const [gender, setGender] = useState("");
    const [serialNo, setSerialNo] = useState("");
    const [serialNoTouched, setSerialNoTouched] = useState(false);
    const [serialNoError, setSerialNoError] = useState(null);
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            submitForm();
            return false;
        }
    }
    function onFirstNameChange(e){
        setFirstName(e.target.value);
        setFirstNameTouched(true)
        if(e.target.value.length < 1){
            setFirstNameError(true)
        }else{
            setFirstNameError(false)
        }
    }
    function onLastNameChange(e){
        setLastName(e.target.value);
        setLastNameTouched(true)
        if(e.target.value.length < 1){
            setLastNameError(true)
        }else{
            setLastNameError(false)
        }
    }
    function onEmailChange(e){
        setEmail(e.target.value);
        setEmailTouched(true)
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(e.target.value.match(mailformat)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }
    }
    function onDobChange(e){
        // console.log("date value",e.target.value);
        setDob(e.target.value);
        setDobTouched(true);
        if(!!e.target.value) setDobError(false)
        else setDobError(true)
    }
    function onGenderChange(label){
        setGender(label)
    }
    function onSerialNoChange(e){
        setSerialNo(e.target.value);
        setSerialNoTouched(true)
        if(e.target.value.length < 4){
            setSerialNoError(t('enterValidSrNo'))
        }else{
            setSerialNoError(null)
        }
    }
    let options=[
        {label:t('male'), value:"male"},
        {label:t('female'), value:"female"},
        {label:t('nonBinary'), value:"nonBinary"},
    ]

    let error = firstNameError || lastNameError || emailError || dobError || !!serialNoError || !privacyCheck || !firstNameTouched
    let btnLabel = loader?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('activateWarranty')
    async function submitForm(){
        if(!error){
            setLoader(true);
            let bodyParams = {
                firstName,
                lastName,
                email,
                dob,
                gender,
                serialNo
            }
            let res=await fetch(`${UNSAID_API}/api/events/warranty-activation`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(bodyParams)
            })
            let resData=await res.json();
            if(res.status==200){
                router.push("/warranty-activation/confirmation");
            }
            if(res.status==404){
                setLoader(false);
                if(resData?.errMsg=="Jewel Exists"){
                    setSerialNoError("The warranty for this jewel has already been activated.");
                }else{
                    setSerialNoError("Please enter valid serial No.");
                }
            }
        }
    }
    return (
        <>
            <div className="warrantyForm">
                <div className="fn_ln">
                    <div className="firstName"><Input enterKeyPressed={submitWhenEnter} error={firstNameTouched && firstNameError} errorMsg={t('firstNameRequired')} type="text" placeHolder={t('firstName')} onChangeValue={onFirstNameChange} value={firstName} required={true}/></div>
                    <div className="lastName"><Input enterKeyPressed={submitWhenEnter} error={lastNameTouched && lastNameError} errorMsg={t('familyNameRequired')} type="text" placeHolder={t('familyName')} onChangeValue={onLastNameChange} value={lastName} required={true}/></div>
                </div>
                <div className="email"><Input enterKeyPressed={submitWhenEnter} error={emailTouched && emailError} errorMsg={t('invalidEmailError')} type="email" placeHolder={t('emailAddress')} onChangeValue={onEmailChange} value={email} required={true}/></div>
                <div className="dob_gn">
                    <div className="dob"><Input paddingRight="0rem" enterKeyPressed={submitWhenEnter} error={dobTouched && dobError} errorMsg={`DOB ${t('required')}`} type="date" placeHolder={t('dobWO')} onChangeValue={onDobChange} value={dob} required={true}/></div>
                    <div className="gender"><Input dropDownoptions={options} enterKeyPressed={submitWhenEnter} type="text" placeHolder={t('gender')} onChange={onGenderChange} value={gender} required={false}/></div>
                </div>
                <div className="serialNo"><Input enterKeyPressed={submitWhenEnter} error={serialNoTouched && !!serialNoError} errorMsg={serialNoError} type="text" placeHolder={t('jewelSerialNo')} onChangeValue={onSerialNoChange} value={serialNo} required={true} description={t('jewelSerialNoDesc')}/></div>
                <div className="privacyCheck">
                   <div className="leftCheck" onClick={()=>setPrivacyCheck(!privacyCheck)}><BlackCheckBox isChecked={privacyCheck}/></div>
                   <div className="rightCheck anoHalfRegular">{t('privacyPolicyConsent1')} <span><Link href="/privacy-policy"><a className="anoRegular underlineLR active">{t('privacyPolicyConsent2')}</a></Link></span> {t('privacyPolicyConsent3')}</div> 
                </div>
                <button onClick={()=>submitForm()} className={`btn ${error?"btnInactive":"btnPrimary"} width-100 anoRegular font20`}>{btnLabel}</button>
            </div>
            <style jsx>{`
                .fn_ln, .dob_gn{
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .fn_ln > div, .dob_gn > div{
                    width: calc(50% - 1.2rem);
                    margin-bottom: 4.8rem;
                }
                .email{
                    margin-bottom: 4.8rem;
                }
                .serialNo{
                    margin-bottom: 7.3rem;
                }
                .privacyCheck{
                    display: flex;
                    align-items: center;
                    margin-bottom: 5.2rem;
                }
                .leftCheck{
                    cursor: pointer;
                    padding-right: 1.3rem;
                }
                .rightCheck{
                    white-space: nowrap;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .privacyCheck{
                        align-items: flex-start;
                    }
                    .rightCheck{
                        white-space: normal;
                        line-height: 20px;
                        padding-top: 3px;
                    }
                }
            `}</style>
        </>    
    )
}
