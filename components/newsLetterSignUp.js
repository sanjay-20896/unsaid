import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Caret from './caret'
import Loader from './loader'
import {UNSAID_API} from "../branch-specific-config"

export default function NewsLetterSignUp(props) {
    const [email,setEmail]=useState("")
    const [emailError,setEmailError]=useState(true)
    const [emailTouched,setEmailTouched]=useState(false)
    const [loading,setLoading]=useState(false)
    
    const [notification,setNotification]=useState("")
    const [success,setSuccess]=useState(false)
    const submitEmailButtonRef = useRef();

    function onChangeEmail(value){
        setEmail(value)
        validateEmail(value)
        setEmailTouched(true)
    }
    function validateEmail(val){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(val.match(mailformat)){
            setEmailError(false)
            setNotification(null)
        }else{
            setEmailError(true)
            setNotification("Please enter a valid email address.")
        }
    }
    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            subscribeNewsLetter(email)
            return false;
        }
    }
   
    const btnForNewsLetter= loading ?<span className="inlineBlock loader"><Loader type="dots" size={8} color="black"/></span>:<Caret color="grey" direction="right" width="0.1rem" length="1rem"/>

    async function subscribeNewsLetter(email){
        setLoading(true)
        if(emailError===true){
            setNotification("Please enter a valid email address.")
            setLoading(false)
            setSuccess(false)
        }else{
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
                setLoading(false)
                setNotification("Successfully subscribed to the newsletter.")
                setSuccess(true)
                setEmail("")
            }else{
                setLoading(false)
                setNotification("Unable to subscribe to newsletter.")
            }
        }
    }

    return (
        <>
            <div className="subscriptionFormDefault">
                <form className="inputForm positionRelative font16 anoRegular">
                    <input onKeyDown={e=>submitWhenEnter(e)} type="email" value={email} placeholder="Sign up for our newsletter" onChange={(e)=>onChangeEmail(e.target.value)}/>
                    <div ref={submitEmailButtonRef} className="submitButton" onClick={()=>subscribeNewsLetter(email)}>{btnForNewsLetter}</div>
                    {!!notification && 
                        <div className="success-newsletter">{notification}</div>
                    }
                </form>
                <div className="signUpText mobile anoRegular">By signing up you agree to our <Link href="/privacy-policy"><a>privacy policy</a></Link> and <Link href="/terms-and-conditions"><a>terms and conditions</a></Link></div>
            </div>   
            <style jsx>{`
                .success-newsletter{
                    margin-top:1rem;
                    margin-bottom:1rem;
                }
                .inputForm input{
                    color:black;
                    background: white;
                    border: 1px solid grey;
                    padding: 1.2rem 2.5rem 1.2rem 1.2rem;
                    width: 100%;
                    font-size: 1.6rem;
                    line-height:2.4rem;
                    letter-spacing: 1px;
                }
                .inputForm{
                    margin-bottom:1.6rem;
                }
                .submitButton{
                    position: absolute;
                    top: 1.6rem;
                    right: ${loading?"3.3rem":"1.2rem"};
                    cursor: pointer;
                    height: 2rem;
                }
                .signUpText{
                    line-height:2rem;
                    letter-spacing:0.1rem;
                }
                .signUpText a{
                    text-decoration:underline;
                }
            `}</style>
        </>
    )
}
