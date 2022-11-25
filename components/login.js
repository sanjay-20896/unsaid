import { useState } from "react"
import { ECOMMERCE_URI } from "../branch-specific-config"
import {TOKEN_VAR_NAME} from '../config'
import {gettingSelection,storeSelection,updateCartLikes,updateLikes} from '../redux/actions'
import {connect} from 'react-redux';
function login(props){
    const [email,setEmail] = useState("")
    const [emailError,setEmailError] = useState(true)
    const [emailTouched,setEmailTouched] = useState(false)

    const [password,setPassword] = useState("")
    const [passwordError,setPasswordError] = useState(true)
    const [passwordTouched,setPasswordTouched] = useState(false)

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
    async function handleSubmit(){
        let token=localStorage.getItem(TOKEN_VAR_NAME);
        let rawResponse=await fetch(`${ECOMMERCE_URI}/login/${email}`,{
            method:'POST',
            headers:{
                'Accept': `*/*; api-token: ${token}`,
                'Content-type':'application/json',
                
            },
            body:JSON.stringify({
                password:password
            })
        })
        if(rawResponse.status==200){
            let selection= await rawResponse.json()
            localStorage.setItem(TOKEN_VAR_NAME,selection.token)
            props.storeSelection(selection)
            // props.updateLikes(likes,props?.selection?.selection?.loggedIn,false,props.cookieConsent.functional)
            // props.updateCartLikes(props.selection.cartItems,props.selection.selection.loggedIn)
            // props.updateLikes(props.selection.likesArray,props.selection.selection.loggedIn
        }else{
            let response=await rawResponse.json()
        }
    }
    return(
        <>
         <div className="form-wrapper">
            emailID:<input type="email" onChange={(e)=>onEmailChange(e.target.value)} required value={email}/>
            {emailError=="false" && emailTouched==true && 
            <div>Please enter a valid email</div>}
            password:<input type="password" onChange={(e)=>onPasswordChange(e.target.value)} required  value={password}/>
            {passwordError=="false" && passwordTouched==true &&
            <div>Please enter a valid password</div>}
           <button className="btn btnSecondary" onClick={()=>handleSubmit()}>Login</button>
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

function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}

export default connect(mapStateToProps,{gettingSelection,storeSelection,updateCartLikes,updateLikes})(login)