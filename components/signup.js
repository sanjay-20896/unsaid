import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {UNSAID_API} from '../branch-specific-config'
import { getTokenFromLocalStorage } from '../functions';
import {gettingSelection,storeSelection,updateCartLikes,updateLikes} from '../redux/actions'
import {useRouter} from 'next/router'
import { TOKEN_VAR_NAME } from '../config';
function Register(props) {
    const Router = useRouter()
    const [email,setEmail] = useState("")
    const [emailError,setEmailError] = useState(true)
    const [emailTouched,setEmailTouched] = useState(false)

    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState(true)
    const [passwordTouched,setPasswordTouched] = useState(false)
    
    const [firstName,setFirstName] = useState("")
    const [firstNameError,setFirstNameError] = useState(true)
    const [firstNameTouched,setFirstNameTouched] = useState(false)
    
    const [lastName,setLastName] = useState("")
    const [lastNameError,setLastNameError] = useState(true)
    const [lastNameTouched,setLastNameTouched] = useState(false)
    
    const [sessionToken,setSessionToken] = useState("")
    const [redirectPath,setRedirectPath] = useState("")
    function validateEmail(val){
        if(val.length < 1)
            setEmailError(true)
        else
            setEmailError(false)
    }
    function validatePassword(val){
        let value = val.toString()
        if(value.length < 4)
            setPasswordError(true)
        else
            setPasswordError(false)
    }
    function validateFirstName(val){
        if(val.length < 1){
            setFirstNameError(true)
        } else {
            setFirstNameError(false)
        }
    }
    function validateLastName(val){
        if(val.length < 1){
            setLastNameError(true)
        }else{
            setLastNameError(false)
        }
    }
    function onEmailChange(val){
        setEmail(val)
        validateEmail(val)
        setEmailTouched(true)
    }
    function onPasswordChange(val){
        setPassword(val);
        validatePassword(val);
        setPasswordTouched(true)
    }
    function onFirstNameChange(val){
        setFirstName(val);
        validateFirstName(val)
        setFirstNameTouched(true)
    }
    function onLastNameChange(val){
        setLastName(val);
        validateLastName(val);
        setLastNameTouched(true)
    }
    let dob="DD-MM-YYYY"
    async function handleRequest(){
       let response=await fetch(`${UNSAID_API}/api/auth/signup`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                },
            body:JSON.stringify({
                email:email,
                password:password,
                firstName:firstName,
                lastName:lastName,
            }),
            
       })
    //    console.log(response);
       if(response.status==200){
           let body=await response.json();
        //    console.log(body)
           let selection=`${body.selection? body.selection:""}`
        //    console.log(selection);
           localStorage.setItem(TOKEN_VAR_NAME,selection.token);
           props.storeSelection(selection);   
       }else{
        //    console.log(response.status)
       }
       
    }
    useEffect(()=>{
        setSessionToken(getTokenFromLocalStorage())
        setRedirectPath(Router.pathname)
    },[])
    return(
        <>
        <div className="form-wrapper">
           firstName:<input type="text" onChange={(e)=>onFirstNameChange(e.target.value)} value={firstName} required />
           {firstNameError=="false" && firstNameTouched==true &&
           <div>please enter a valid first name</div>}
           lastName:<input type="text" onChange={(e)=>onLastNameChange(e.target.value)} value={lastName} required/>
           {lastNameError=="false" && lastNameTouched==true &&
            <div>please enter a valid last name</div>}
            emailID:<input type="email" onChange={(e)=>onEmailChange(e.target.value)} required value={email}/>
            {emailError=="false" && emailTouched==true && 
            <div>please enter a valid email</div>}
            password:<input type="password" onChange={(e)=>onPasswordChange(e.target.value)} required  value={password}/>
            {passwordError=="false" && passwordTouched==true &&
            <div>Please enter a valid password</div>}
           <button className="btn btnSecondary" onClick={()=>handleRequest()}>Signup</button>
           <a className="btn btnSecondary" href={`${UNSAID_API}/api/auth/login/facebook?redirectPath=${encodeURI(redirectPath)}&sessionToken=${encodeURI(sessionToken)}`}>Login using Facebook</a>
           <a className="btn btnSecondary" href={`${UNSAID_API}/api/auth/social/login/google?redirectPath=${encodeURI(redirectPath)}&sessionToken=${encodeURI(sessionToken)}`}>Login using Google</a>
        </div>
        <style jsx>{`
        .form-wrapper{
           padding-left:50%;
           padding-right:50%;
        }
        `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default  connect(mapStateToProps,{gettingSelection,storeSelection,updateLikes,updateCartLikes})( Register);