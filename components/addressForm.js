import {useEffect, useState} from 'react'
import Input from './input'
import {connect} from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

function AddressForm(props){
    const {t}=useTranslation('common')

    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)
    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(true)
    const [lastNameTouched,setLastNameTouched] = useState(false)
    const [email,setEmail] = useState("")
    const [emailError,setEmailError] = useState(true)
    const [emailTouched,setEmailTouched] = useState(false)
    const [number,setNumber] = useState("")
    const [address1,setAddress1] = useState("")
    const [address1Error,setAddress1Error] = useState(true)
    const [address1Touched,setAddress1Touched] = useState(false)
    const [address2,setAddress2] = useState("")
    const [country,setCountry] = useState("")
    const [countryError,setCountryError] = useState(true)
    const [countryTouched,setCountryTouched] = useState(false)
    const [state,setState] = useState("")
    const [stateTouched,setStateTouched] = useState(false)
    const [stateError,setStateError] = useState(true)
    const [city,setCity] = useState("")
    const [cityError,setCityError] = useState(true)
    const [cityTouched,setCityTouched] = useState(false)
    const [zipCode,setZipCode] = useState("")
    const [zipCodeError,setZipCodeError] = useState(true)
    const [zipCodeTouched,setZipCodeTouched] = useState(false)
    let stateRequired = false
    let states = null
    let countryIndex = props.countryOptions.findIndex(c=>c.label.toLowerCase()==country.toLowerCase())
    if(countryIndex > -1 && Array.isArray(props.countryOptions[countryIndex].states)){
        stateRequired = true
        states = props.countryOptions[countryIndex].states.map(s=>{return {label:s.name,value:s.state}})
    }
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
    function onNumberChange(val){
        setNumber(val)
    }
    function validateAddress1(val){
        if(val.length < 1)
            setAddress1Error(true)
        else
            setAddress1Error(false)
    }
    function onAddress1Change(val){
        setAddress1Touched(true)
        validateAddress1(val)
        setAddress1(val)
    }
    function onAddress2Change(val){
        setAddress2(val)
    }
    function validateCountry(val){
        //must be in list of countries
        if(val==""){
            setCountryError(true)
            return
        }
        let i = props.countryOptions.findIndex(country=>country.label.toLowerCase()==val.toLowerCase())
        if(i > -1){
            setCountryError(false)
        }
        else
            setCountryError(true)
    }
    function onCountryChange(val){
        setCountryTouched(true)
        validateCountry(val)
        setCountry(val)
        setState("")
    }
    function validateState(val){
        if(stateRequired){
            let i = states.findIndex(s=>s.label.toLowerCase()==val.toLowerCase())
            if(i > -1)
                setStateError(false)
            else
                setStateError(true)
        } else {
            setStateError(false)
        }
    }
    function onStateChange(val){
        setStateTouched(true)
        validateState(val)
        setState(val)
    }
    function validateCity(val){
        if(val.length < 1)
            setCityError(true)
        else
            setCityError(false)
    }
    function onCityChange(val){
        setCityTouched(true)
        validateCity(val)
        setCity(val)
    }
    function validateZipCode(val){
        if(val.length < 1)
            setZipCodeError(true)
        else
            setZipCodeError(false)
    }
    function onZipCodeChange(val){
        setZipCodeTouched(true)
        validateZipCode(val)
        setZipCode(val)
    }
    useEffect(()=>{
        let selector = props.type=="billing"?"address":"shippingAddress"
        if(props?.selection?.selection?.selection[selector].firstName){
            setFirstName(props.selection.selection.selection[selector].firstName)
            validateFirstName(props.selection.selection.selection[selector].firstName)
        }
        if(props?.selection?.selection?.selection[selector].lastName){
            setLastName(props.selection.selection.selection[selector].lastName)
            validateLastName(props.selection.selection.selection[selector].lastName)
        }
        if(props?.selection?.selection?.selection[selector].email){
            setEmail(props.selection.selection.selection[selector].email)
            validateEmail(props.selection.selection.selection[selector].email)
        }
        if(props?.selection?.selection?.selection[selector].phoneNumber){
            setNumber(props.selection.selection.selection[selector].phoneNumber)
        }
        if(props?.selection?.selection?.selection[selector].country){
            let c = props.countryOptions.find(co=>co.value==props.selection.selection.selection[selector].country)
            if(c){
                onCountryChange(c.label)
                if(c.states){
                    
                    let s = c.states.find(s=>s.state==props?.selection?.selection?.selection[selector].state)
                    if(s){
                        setTimeout(()=>{
                            // setState(s.name)
                            // validateState(s.name)
                            onStateChange(s.name)
                        },1000)
                    } 
                }
            }
        }
        if(props?.selection?.selection?.selection[selector].city){
            setCity(props.selection.selection.selection[selector].city)  
            validateCity(props.selection.selection.selection[selector].city) 
        }
        if(props?.selection?.selection?.selection[selector].address1){
            setAddress1(props.selection.selection.selection[selector].address1)
            validateAddress1(props.selection.selection.selection[selector].address1)   
        }
        if(props?.selection?.selection?.selection[selector].address2){
            setAddress2(props.selection.selection.selection[selector].address2)   
        }
        if(props?.selection?.selection?.selection[selector].zipCode){
            setZipCode(props.selection.selection.selection[selector].zipCode)  
            validateZipCode(props.selection.selection.selection[selector].zipCode) 
        }
    },[props?.selection?.selection?.selection?.shippingAddress,props?.selection?.selection?.selection?.address])
    useEffect(()=>{
        if(stateRequired){
            // console.log('use effect state required',firstNameError || lastNameError || address1Error || countryError || stateError || cityError || zipCodeError)
            props.setValidationStatus(firstNameError || lastNameError || emailError || address1Error || countryError || stateError || cityError || zipCodeError)
        } else {
            // console.log('use effect state not required',firstNameError || lastNameError || address1Error || countryError || cityError || zipCodeError)
            props.setValidationStatus(firstNameError || lastNameError || emailError || address1Error || countryError || cityError || zipCodeError)
        }
        // if(props.values?.firstName!=firstName || props.values?.lastName!=lastName || props.values?.email!=email || props.values?.number!=number || props.values?.address1!=address1 || props.values?.address2!=address2 || props.values?.country!=country || props.values?.state!=state || props.values?.city!=city || props.values?.zipCode!=zipCode)
            props.setValues({firstName,lastName,email,number,address1,address2,country,state,city,zipCode})
    },[firstNameError,lastNameError,emailError,address1Error,countryError,stateError,cityError,zipCodeError,firstName,lastName,email,number,address1,address2,country,state,city,zipCode])
    return (
        <>
            <div className="rows">
                <div className="row">
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onFirstNameChange(e.target.value)} value={firstName} error={firstNameTouched && !!firstNameError} errorMsg={firstNameError=="min"?t('required'):t('addressCharacterLimitMessage')} placeHolder={t('firstName')} required={true}/>
                    </div>
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onLastNameChange(e.target.value)} value={lastName} error={lastNameTouched && !!lastNameError} errorMsg={lastNameError=="min"?t('required'):""} placeHolder={t('lastName')} required={true} />
                    </div>
                </div>
                <div className="row">
                    <div className="inputField">
                        <Input type="email" onChangeValue={(e)=>onEmailChange(e.target.value)} value={email} error={emailTouched && !!emailError} errorMsg={emailError?"Invalid email":""} placeHolder={t('emailAddress')} required={true}/>
                    </div>
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onNumberChange(e.target.value)} value={number} error={false} placeHolder={t('phoneNumber')} required={false}/>
                    </div>
                </div>
                <div className="row">
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onAddress1Change(e.target.value)} value={address1} error={address1Touched && !!address1Error} errorMsg={address1Error?t('required'):""} placeHolder={`${t('address')} 1`} required={true} />
                    </div>
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onAddress2Change(e.target.value)} value={address2} error={false} placeHolder={`${t('address')} 2`} />
                    </div>
                </div>
                <div className="row">
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onCountryChange(e.target.value)} onChange={(val)=>onCountryChange(val)} options={props.countryOptions} value={country} error={countryTouched && !!countryError} errorMsg={countryError?t('chooseFromDropdown'):""} placeHolder={t('country')} required={true}/>
                    </div>
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onStateChange(e.target.value)} onChange={(val)=>onStateChange(val)} options={states} value={state} error={stateTouched && !!stateError} errorMsg={stateError?t('invalidState'):""} placeHolder="State" required={stateRequired} />
                    </div>
                </div>
                <div className="row">
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onCityChange(e.target.value)} value={city} error={cityTouched && !!cityError} errorMsg={cityError?t('required'):""} placeHolder={t('city')} required={true} />
                    </div>
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onZipCodeChange(e.target.value)} value={zipCode} error={zipCodeTouched && !!zipCodeError} errorMsg={zipCodeError?t('required'):""} placeHolder={t('postalCode')} required={true}/>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .unexpected{
                    margin-bottom:1rem;
                }
                .row{
                    display:flex;
                }
                .rows .row:not(:last-child){
                    margin-bottom:4.8rem;
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
            `}</style>
        </>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,null)(AddressForm)