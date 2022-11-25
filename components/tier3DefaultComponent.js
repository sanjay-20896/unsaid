import {useState,useEffect, useRef} from 'react'
import Caret from './caret'
import { connect } from 'react-redux';
import Loader from './loader'
import {RULE_SECRET,RULE_URI} from '../config'
import Link from 'next/link'
import LazyImage from './lazyImage';
import {UNSAID_API} from "../branch-specific-config"
import useTranslation from 'next-translate/useTranslation'

function Tier3DefaultComponent(props){
    const {t}=useTranslation('common');
    const [newsletter,showNewsletter] = useState(false)
    const [imgHeight, setImgHeight] = useState("auto");
    
    const [email,setEmail]=useState("")
    const [emailError,setEmailError]=useState(true)
    const [emailTouched,setEmailTouched]=useState(false)
    const [loading,setLoading]=useState(false)
    
    const [notification,setNotification]=useState("")
    const [success,setSuccess]=useState(false)
   
    const submitEmailButtonRef = useRef();
    let imageHeight = props.common.windowHeight - (160 + 48 + 48);
    const btnForNewsLetter= loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="black"/></span>:<Caret color="grey" direction="right" width="0.1rem" length="1rem"/>

    useEffect(() => {
        // if(imageHeight <= 580){
        //     setImgHeight(imageHeight)
        // }else{
        //     setImgHeight("auto");
        // }
        setImgHeight(imageHeight)
    }, [imageHeight])
    function onChangeEmail(value){
        // console.log(value);
        setEmail(value)
        validateEmail(value)
        setEmailTouched(true)
        setNotification(null)
    }
    function validateEmail(val){
        var mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(val.match(mailformat)){
            setEmailError(false)
        }else{
            setEmailError(true)
        }
    }
    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            subscribeNewsLetter(email)
            return false;
        }
    }
    async function subscribeNewsLetter(email){
        setLoading(true)
        if(emailError===true){
            setNotification(t('invalidEmailError'))
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
                setNotification(t('newslettersubscriptionSuccess'))
                setSuccess(true)
                setEmail("")
            }else{
                setLoading(false)
                setNotification(t('unableToSubscribeNewsletter'))
            }
        }
        
    }
    return (
        <>
            <div className={`subscribe fadeInAnimationNew ${newsletter?"newsletter":""}`} onMouseEnter={()=>showNewsletter(true)} onMouseLeave={()=>showNewsletter(false)}>
                <div className="newsWrapper">
                    <div className="alignCenter defaultImg2">
                        <div style={{height:imgHeight,overflow:"hidden"}} className="storeImg1">
                            <LazyImage
                            alt="Product image"
                            originalSrc={props?.defaultItems?.img}
                            width={233}
                            height={396}/>
                        </div>
                        <div className="storeName1 canelaThin font20">{props?.defaultItems?.title}</div>
                    </div>
                </div>
                <div className="subscriptionForm">
                    <div className="subscriptionHeading font20 canelaThin">{t('joinOurCommunity')}</div>
                    <div className="inputForm positionRelative font16 anoRegular">
                        <input onKeyDown={e=>submitWhenEnter(e)} type="email" value={email} placeholder={t('signUpNewsletter')} onChange={(e)=>onChangeEmail(e.target.value)}/><br/>
                        <div ref={submitEmailButtonRef} className="submitButton" onClick={()=>{subscribeNewsLetter(email)}}>{btnForNewsLetter}</div>
                        {!!notification && 
                            <div className="success-newsletter">{notification}</div>
                        } 
                    </div>
                    <div className="signUpText anoRegular">{t('newsletterTextBelowTextBoxPart1')} <Link href="/privacy-policy"><a>{t('privacy-policy')}</a></Link> {t('and')} <Link href="/terms-and-conditions"><a>{t('terms-and-conditions')}</a></Link></div>
                </div>
                
            </div>
            <style jsx>{`
                .success-newsletter{
                    margin-top:1rem;
                }
                .storeImg1{
                    margin-bottom:4.8rem;
                }
                .storeName1{
                    text-align:center;
                }
                .subscribe .newsWrapper{
                    opacity:1;
                    transform-origin:bottom;
                    transform:translateY(0);
                    transition:all 0.7s ease-out;
                    cursor:pointer;
                }
                .subscribe.newsletter .newsWrapper{
                    opacity:0;
                    pointer-events:none;
                    transform-origin:top;
                    transform:translateY(-1rem);
                }
                // .defaultImg2{
                //     opacity:0;
                //     animation:fadeUpAnimation 0.15s ease-out forwards ${props.noAnimationDelay?"0s":"0.2s"}; 
                // }
                .subscriptionForm{
                    text-align:center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 100%;
                    z-index: -9;
                }
                .newsletter .subscriptionForm{
                    z-index: 9;
                }
                .subscriptionForm .subscriptionHeading{
                    opacity:0;
                    transform-origin:bottom;
                    transform:translateY(2rem);
                    transition:all 0.5s ease-out;
                }
                .newsletter .subscriptionForm .subscriptionHeading{
                    opacity:1;
                    transform-origin:top;
                    transform:translateY(0);
                }
                .subscriptionForm .inputForm{
                    opacity:0;
                    transform-origin:bottom;
                    transform:translateY(2rem);
                    transition:all 0.5s ease-out 0.2s;
                }
                .newsletter .subscriptionForm .inputForm{
                    opacity:1;
                    transform-origin:top;
                    transform:translateY(0);
                }
                .subscriptionForm .signUpText{
                    opacity:0;
                    transform-origin:bottom;
                    transform:translateY(2rem);
                    transition:all 0.5s ease-out 0.3s;
                }
                .newsletter .subscriptionForm .signUpText{
                    opacity:1;
                    transform-origin:top;
                    transform:translateY(0);
                }
                .subscriptionHeading{
                    margin-bottom:1.6rem;
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
                    top: 1.3rem;
                    right: ${loading?"3.5rem":"1.2rem"};
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
                @keyframes fadeUpAnimation{
                    0% {
                        opacity:0;
                        transform-origin:bottom;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity:1;
                        transform-origin:top;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        transform: translateY(0);
                    }
    
                }
            `}</style>
        </>
    )
}

function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(Tier3DefaultComponent)