import { connect } from 'react-redux'
import {ECOMMERCE_URI} from '../branch-specific-config'
import { useEffect, useState } from 'react'
import { getNestedObject } from '../functions'
import Loader from './loader'
import {setSiteReady, storeSelection} from '../redux/actions'
import {MOBILE_BREAKPOINT, TOKEN_VAR_NAME} from '../config'
import {UNSAID_API} from '../branch-specific-config'
import Input from './input'
import useTranslation from 'next-translate/useTranslation'
function Profile(props){
    const {t}=useTranslation('common');
    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)
    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(true)
    const [lastNameTouched,setLastNameTouched] = useState(false)
    const [email,setEmail] = useState("")
    const [emailError,setEmailError] = useState(true)
    const [emailTouched,setEmailTouched] = useState(false)
    const [emailErrorMsg,setEmailErrorMsg] = useState("")
    const [number,setNumber] = useState("")
    const [date, setDate] = useState(null)
    const [month, setMonth] = useState(null)
    const [year, setYear] = useState(null)
    const [dobError,setDobError] = useState(false)
    const [initDate,setInitDate] = useState(null)
    const [initMonth,setInitMonth] = useState(null)
    const [initYear,setInitYear] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [success,setSuccess] = useState(false)
    const [ready,setReady] = useState(false)
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
    function validateLastName(val){
        if(val.length < 1)
            setLastNameError("min")
        else
            setLastNameError(false)
    }
    function onLastNameChange(val){
        setLastNameTouched(true)
        validateLastName(val)
        setLastName(val)
    }
    function validateEmail(val){
        if(val.length < 1){
            setEmailErrorMsg(t('invalidEmailError'))
            setEmailError(true)
        }
        else
            setEmailError(false)
    }
    function onEmailChange(val){
        setEmailTouched(true)
        validateEmail(val)
        setEmail(val)
    }
    function onNumberChange(val){
        setNumber(val)
    }
    useEffect(()=>{
        if(props?.selection?.selection?.loggedIn){
            onFirstNameChange(props.selection.selection.loggedIn.firstName)
            onLastNameChange(props.selection.selection.loggedIn.lastName)
            onEmailChange(props.selection.selection.loggedIn.email)
            onNumberChange(props.selection.selection.loggedIn.phoneNumber)
        }
    },[props?.selection?.selection?.loggedIn])
    async function getCustomer(){
        let token = localStorage.getItem(TOKEN_VAR_NAME)
        let rawResponse = await fetch(`${UNSAID_API}/api/auth/getCustomer`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                token
            })
        })
        let response = await rawResponse.json()
        if(response?.dob){
            let month = response.dob.split("/")[0]
            let date = response.dob.split("/")[1]
            let year = response.dob.split("/")[2]
            setDate(date)
            setMonth(month)
            setYear(year)
            setInitDate(date)
            setInitMonth(month)
            setInitYear(year)
        }
        setReady(true)
    }
    useEffect(()=>{
        getCustomer()
    },[])
    let updateProfileEnabled = true
    if(firstNameError || lastNameError || emailError)
        updateProfileEnabled = false
    if(props.selection.selection.loggedIn.email==email &&
        props.selection.selection.loggedIn.firstName==firstName &&
        props.selection.selection.loggedIn.lastName==lastName &&
        props.selection.selection.loggedIn.phoneNumber==number &&
        initDate == date &&
        initMonth == month &&
        initYear == year
    )
        updateProfileEnabled = false
    async function updateProfile(){
            try{
                if(updateProfileEnabled){
                    setDobError(false)
                    setSuccess(false)
                    var reqBody={
                        "newEmail": email,
                        firstName:firstName,
                        lastName:lastName,
                        phoneNumber:number
                    }
                    if(!!month && !!date && !!year){
                        let dob1 = `${month}/${date}/${year}`
                        reqBody["dob"] = dob1;
                    }
                    let token = localStorage.getItem(TOKEN_VAR_NAME)
                    if(token)
                    reqBody["token"] = token
                    setLoading(true)
                    let rawResponse=await fetch(`${UNSAID_API}/api/auth/updateProfile`,{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify(reqBody)
                    })
                    if(rawResponse.status==200){
                        // console.log('success')
                        let selection = await rawResponse.json() 
                        // console.log(selection)
                        localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                        props.storeSelection(selection)
                        setInitDate(date)
                        setInitMonth(month)
                        setInitYear(year)
                        setSuccess(true)
                        setTimeout(()=>{
                            setSuccess(false)
                        },3000)
                    } else if(rawResponse.status==412){
                        throw "unexpected1"
                    } else if(rawResponse.status==409){
                        setEmailErrorMsg(t('emailExists'))
                        setEmailError(true)
                    } else if(rawResponse.status==411){
                        let result = await rawResponse.json()
                        if(result?.errors?.dob)
                            setDobError(true)
                        if(result?.errors?.newEmail){
                            setEmailErrorMsg(t('invalidEmailError'))
                            setEmailError(true)
                        }
                        //validation error
                        //dob
                    } else {
                        throw "unexpected2"
                    }
                    setLoading(false)
                }
            } catch(err) {
                // console.log(err)
                setError(true)
                setLoading(false)
            }
    }
    let btnContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('updateProfile')
    return (
        <>
            {
                <div className="rows">
                    <div className="row">
                        <div className="inputField">
                            <Input type="text" onChangeValue={(e)=>onFirstNameChange(e.target.value)} value={firstName} error={firstNameTouched && !!firstNameError} errorMsg={firstNameError=="min"?t('required'):t('addressCharacterLimitMessage')} placeHolder={t('firstName')} required={true}/>
                        </div>
                        <div className="inputField">
                            <Input type="text" onChangeValue={(e)=>onLastNameChange(e.target.value)} value={lastName} error={lastNameTouched && !!lastNameError} errorMsg={lastNameError=="min"?t('required'):""} placeHolder={t('lastName')} required={true} />
                        </div>
                    </div>
                    <div className="hideForMobile">
                        <div className="">
                            <div className="inputField1">
                                <Input type="email" onChangeValue={(e)=>onEmailChange(e.target.value)} value={email} error={emailTouched && !!emailError} errorMsg={emailErrorMsg} placeHolder={t('emailAddress')} required={true} disabled={true}/>
                            </div>
                            <div className="inputField1">
                                <Input type="text" onChangeValue={(e)=>onNumberChange(e.target.value)} value={number} error={false} placeHolder={t('phoneNumber')} />
                            </div>
                        </div>
                    </div>
                    
                    <div className="showForMobile">
                        <div className="">
                            <div className="inputField1 width-100">
                                <Input type="email" onChangeValue={(e)=>onEmailChange(e.target.value)} value={email} error={emailTouched && !!emailError} errorMsg={emailErrorMsg} placeHolder={t('emailAddress')} required={true} />
                            </div>
                        </div>
                        <div className="">
                            <div className="inputField1 width-100">
                                <Input type="text" onChangeValue={(e)=>onNumberChange(e.target.value)} value={number} error={false} placeHolder={t('phoneNumber')} required={true} />
                            </div>
                        </div>
                    </div>
                    <div className="dobWrapper">
                        <div className="dobHeading font16 anoHalfRegular">
                            <div>{t('dob')}</div> 
                        </div>
                        <div className="dobForm">
                            <div><Input maxlength={2} type="text" placeHolder="DD" onChangeValue={(e)=>setDate(e.target.value)} value={date}/></div>
                            <div><Input maxlength={2} type="text" placeHolder="MM" onChangeValue={(e)=>setMonth(e.target.value)} value={month}/></div>
                            <div><Input maxlength={4} type="text" placeHolder="YYYY" onChangeValue={(e)=>setYear(e.target.value)} value={year}/></div>
                        </div>
                        {dobError &&
                            <div className="dobError error">
                                {t('invalidDate')}
                            </div>
                        }
                    </div>
                    <div className="submitWrapper alignCenter">
                        <button onClick={()=>updateProfile()} className={`btn submit ${updateProfileEnabled?"btnPrimary":"btnInactive"} white anoRegular font16-notResponsive cursorPointer`}>{btnContent}</button>
                    </div>
                    {success &&
                        <div className="success alignCenter">
                            {t('profileUpdatedSuccessfully')}
                        </div>
                    }
                </div>
            }
            <style jsx>{`
                .inputField1{
                    margin-bottom:4rem;
                }
                .dobError{
                    margin-top:0.5rem;
                }
                .success{
                    margin-top:2.4rem;
                }
                .dobWrapper{
                    margin-bottom:2.4rem;
                }
                .submit{
                    margin:auto;
                    min-width: 21.1rem;
                }
                .unexpected{
                    margin-bottom:1rem;
                }
                .row{
                    display:flex;
                }
                .rows .row:not(:last-child){
                    margin-bottom:4.8rem;
                    padding-top:3rem;
                }
                .row div.full{
                    width:100%;
                }
                .row div{
                    width:50%;
                    padding-right:2.4rem;
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
                .loader{
                    margin:auto;
                }
                .dobHeading{
                    display:flex;
                    //justify-content:center;
                    align-items:end;
                    margin-bottom:4.8rem;
                }
                .dobForm{
                    display:flex;
                    margin-right:-2.4rem;
                }
                .dobForm div{
                    padding-right:2.4rem;
                    width:33.33%;
                }
                .questionMark{
                    margin-left:2.4rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{storeSelection})(Profile)