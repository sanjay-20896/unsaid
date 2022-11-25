import {useEffect, useState} from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import Input from './input'
import Loader from './loader'
import { UNSAID_API } from '../branch-specific-config'
import useTranslation from 'next-translate/useTranslation'

export default function AppointmentForm(props){
    const {t}=useTranslation('common')
    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)
    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(false)
    const [lastNameTouched,setLastNameTouched] = useState(false)
    const [email,setEmail] = useState("")
    const [emailError,setEmailError] = useState(true)
    const [emailTouched,setEmailTouched] = useState(false)
    const [number,setNumber] = useState("")
    const [numberError,setNumberError] = useState(true)
    const [numberTouched,setNumberTouched] = useState(false)
    const [message,setMessage] = useState("")
    const [messageError,setMessageError] = useState(true)
    const [messageTouched,setMessageTouched] = useState(false)
    const [website,setWebsite] = useState("")
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [websiteStyles,setWebsiteStyles] = useState({})
    const [error,setError] = useState(false)
    
    function validateFirstName(val){
        if(val.length < 1)
            setFirstNameError("min")
        else if(val.length > 100)
            setFirstNameError("max")
        else
            setFirstNameError(false)
    }
    function onFirstNameChange(val){
        setFirstNameTouched(true)
        validateFirstName(val)
        setFirstName(val)
    }
    function validateLastName(val){
        if(val.length < 1)
            setLastNameError("min")
        else if(val.length > 100)
            setLastNameError("max")
        else
            setLastNameError(false)
    }
    function onLastNameChange(val){
        setLastNameTouched(true)
        validateLastName(val)
        setLastName(val)
    }
    function validateEmail(val){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(val.match(mailformat)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }
    }
    function onEmailChange(val){
        setEmailTouched(true)
        validateEmail(val)
        setEmail(val)
    }
    function validateNumber(val){
        if(val.length<8){
            setNumberError(true)
        }else{
            setNumberError(false)
        }
     }
    function onNumberChange(val){
        setNumberTouched(true)
        validateNumber(val)
        setNumber(val)
    }
    function validateMessage(val){
        if(val.length < 5)
            setMessageError("min")
        else if(val.length > 1000)
            setMessageError("max")
        else
            setMessageError(false)
    }
    function onMessageChange(val){
        setMessageTouched(true)
        validateMessage(val)
        setMessage(val)
    }
    let validationError = firstNameError || lastNameError || emailError || numberError || messageError
    async function handleSubmit(){
        try{
            if(!validationError && !loading){
                // console.log('handle submit')
                setLoading(true)
                setError(false)
                let reqBody = {
                    firstName,
                    lastName,
                    email,
                    number,
                    message,
                    website,
                    form:"Appointment Form"
                }
                let response = await fetch(`${UNSAID_API}/api/form/appointment`, {
                    method: 'POST',
                    headers: {
                    'Accept': `*/*`,
                    'Content-Type': 'application/json',
                    },
                    body:JSON.stringify(reqBody)
                }) 
                if(response.status==200){
                    setSuccess(true)
                } else if(response.status==411){
                    let res = await response.json()
                    if(res?.errors?.firstName){
                        setFirstNameError(res.errors.firstName[0])
                        setFirstNameTouched(true)
                    }
                    if(res?.errors?.lastName){
                        setLastNameError(res.errors.lastName[0])
                        setLastNameTouched(true)
                    }
                    if(res?.errors?.email){
                        setEmailError(res.errors.email[0])
                        setEmailTouched(true)
                    } 
                    if(res?.errors?.number){
                        setNumberError(res.errors.number[0])
                        setNumberTouched(true)
                    }
                    if(res?.errors?.message){
                        setMessageError(res.errors.message[0])
                        setMessageTouched(true)
                    }
                } else {
                    setError(true)
                }
                setLoading(false)
            }
        } catch(err){
            // console.log(err)
            setLoading(false)
            setError(true)
        }
    }
    useEffect(()=>{
        setWebsiteStyles({height:0,width:0,overflow:"hidden",padding:0,border:"none"})
    },[])
    let btnContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('send')
    return (
        <>
            {success?
                <div className="success anoHalfRegular font16-notResponsive">
                    {t('thankYouForReach')}
                </div>
                :
                <div>
                    <div className="firstAndLastName">
                        <div className="inputField"><Input type="text" onChangeValue={(e)=>onFirstNameChange(e.target.value)} value={firstName} error={firstNameTouched && !!firstNameError} errorMsg={firstNameError=="min"?t('firstNameRequired'):"Must be less than 100 characters"} placeHolder="First name" required={true}/></div>
                        <div className="inputField"><Input type="text" onChangeValue={(e)=>onLastNameChange(e.target.value)} value={lastName} error={lastNameTouched && !!lastNameError} errorMsg={lastNameError=="min"?t('firstNameRequired'):"Must be less than 100 characters"} placeHolder="Last name" required={true}/></div>
                    </div>
                    <div className="inputField"><Input type="email" onChangeValue={(e)=>onEmailChange(e.target.value)} value={email} error={emailTouched && !!emailError} errorMsg={emailError?"Invalid email":""} placeHolder={t('emailAddress')} required={true}/></div>
                    <div className="inputField last"><Input type="number" onChangeValue={(e)=>onNumberChange(e.target.value)} value={number} error={numberTouched && !!numberError} errorMsg={!!numberError && t('enterValidTelephoneNumber')} placeHolder={t('telephoneNumber')} required={true} /></div>
                    <div className="textAreaField">
                        <textarea className="anoHalfRegular font16-notResponsive" onChange={(e)=>onMessageChange(e.target.value)} value={message} error={messageTouched && !!messageError} id="" name="" rows="5" cols="50" placeholder={t('message')}></textarea>
                        {messageTouched && !!messageError &&
                            <div className="error">{messageError=="min"?t('messageRequired'):t('addressCharacterLimitMessage')}</div>
                        }
                    </div>
                    <input type="text" hidden value={website} style={websiteStyles} className="website" onChange={(e)=>setWebsite(e.target.value)} />
                    {/* <button className="sendButton white anoRegular font16-notResponsive cursorPointer">Send</button> */}
                    <button className={`btn sendButton ${validationError?"btnInactive":"btnPrimary"} white anoRegular width-100 font16-notResponsive cursorPointer`} onClick={()=>handleSubmit()}>{btnContent}</button>
                    {error &&
                        <div className="error unexpected alignCenter">{t('UnexpectedErrorPleaseTryAgain')}</div>
                    }
                    <div className="desc2 anoHalfRegular">I have read the <a href="privacy-policy">Privacy Policy</a> and consent to the processing of my data.</div>
                </div>
            }
            <style jsx>{`
                .desc2 a{
                    text-decoration: underline;
                }
                .unexpected{
                    margin-bottom:1rem;
                }
                .firstAndLastName{
                    display:flex;
                    margin-right:-2.4rem;
                    padding-top:4.8rem;
                }
                .firstAndLastName div{
                    width:50%;
                    padding-right:2.4rem;
                }
                .inputField{
                    margin-bottom:4.8rem;
                }
                .textAreaField{
                    margin-bottom:4.8rem;
                }
                .textAreaField textarea{
                    padding:1.6rem;
                    resize: none;
                    width: 100%;
                    border: 1px solid #787878;
                } 
                .sendButton{
                    font-size:1.6rem;
                    line-height:2.4rem;
                    margin-bottom:2.4rem;
                    min-height: 4.4rem;
                }
                // .sendButton{
                //     border: none;
                //     background: #787878;
                //     width: 100%;
                //     padding: 1.2rem 0;
                //     border-radius: 3.2rem;
                //     margin-bottom:2.4rem;
                // }
                .loader{
                    margin:auto;
                }
                .success{
                    margin-top:2.4rem;
                    animation: successAnimation 2s ease-out 1 forwards;
                    opacity:0;
                }
                @keyframes successAnimation {
                    from {
                        opacity:0;
                    } to {
                        opacity:1;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .firstAndLastName{
                        display:block;
                        margin-right:0;
                        //padding-top:4.8rem;
                    }
                    .firstAndLastName div{
                        width:100%;
                        padding-right:0rem;
                    }
                    .inputField.last{
                        margin-bottom:3.2rem;
                    }
                }
            `}</style>
        </>
    )
}