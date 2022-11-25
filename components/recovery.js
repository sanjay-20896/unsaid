import { UNSAID_API } from "../branch-specific-config";
import { useState } from 'react';
function recovery(props) {
    const [email,setEmail]=useState("")
    const [emailError,setEmailError]=useState(true)
    const [emailTouched,setEmailTouch]=useState(false)

   
    function validateEmail(val){
        if(val.length < 1)
            setEmailError(true)
        else
            setEmailError(false)
    }
    function onEmailChange(val){
        setEmail(val)
        validateEmail(val)
        setEmailTouch(true)
    }
    async function handleRequest(){
        let response=await fetch(`${UNSAID_API}/api/auth/reset-password-link`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
               email
            })
        })
        // console.log(response)
        if(response.status==200){
            let body=await response.json();
            // console.log(body)
        }else{
            // console.log(response.status)
        }

    }

    return(
        <>
        <div className="form-wrapper">
            emailID:<input type="email" onChange={(e)=>onEmailChange(e.target.value)} required value={email}/>
            {emailError=="false" && emailTouched==true && 
            <div>please enter a valid email</div>}
           <button className="btn btnSecondary" onClick={()=>handleRequest()}>reset</button>
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

export default recovery;
