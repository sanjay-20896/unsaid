import NewsLetterSignUp from "./newsLetterSignUp";
import Input from "./input";
import {MOBILE_BREAKPOINT} from "../config"
import { useEffect, useState } from "react";
import ShowMore from "./showMore"
import {useRouter} from "next/router";
import RadioButton from "./radioButton"
import {connect} from 'react-redux'
import {setShowNewsletterPopup,preventBodyScroll} from "../redux/actions"
import useTranslation from 'next-translate/useTranslation'

function newsletter(props){
    const {t}=useTranslation('common');
    const [success,setSuccess]=useState(false)
    const [radioButtonIndex,setRadioButtonIndex] = useState(1);
    useEffect(()=>{
        props.preventBodyScroll(props.common.showNewsletterPopup)
    },[props.common.showNewsletterPopup])
    useEffect(()=>{
        let newsletterPopTimeStamp=localStorage.getItem("popupnewsletter")
        if(newsletterPopTimeStamp){
            let newsletterSetDate = new Date(parseInt(newsletterPopTimeStamp))
            let currentDate = new Date();
            const diffTime = Math.abs(currentDate - newsletterSetDate)
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            if(diffDays > 180)
                props.setShowNewsletterPopup(false)
        }else{
            props.setShowNewsletterPopup(true);
        }
    },[])
    function accept(){
        localStorage.setItem("popupnewsletter",Date.now().toString())
        props.setShowNewsletterPopup(false)
        props.preventBodyScroll(false)
    }
    return (
        <>
        {success==false ? <div className="wrapper">
            <div className="imageWrapper hideForMobile">
                <img src="/images/newsletterPopupDesktop.png" alt="Image" className="width-100" />
            </div>
            <div className="imageWrapper  showForMobile">
                <div className="positionRelative"><img src="/images/newsletter.png" alt="Image" className="width-100" /></div>
                <div className="cross positionAbsolute" onClick={()=>{accept()}}>
                    <img src="/images/cross.svg" alt="cross" width="16" height="16" />
                </div>
            </div>
            <div className="newsletter">
                <div className="cross hideForMobile" onClick={()=>{accept()}}>
                    <img src="/images/cross.svg" alt="cross" width="16" height="16"/>
                </div>
                 <div className="font24 canelaThin text1">{t('joinUnsaidFamily')}</div>
                 <div className="font16 anoHalfRegular text2">{t('newsletterMsg')}</div>
                 <div className="radioButton">
                    <div className="radio-1 one font16 anoHalfRegular">
                            <span onClick={()=>setRadioButtonIndex(1)}>
                                <RadioButton 
                                    id={1}
                                    radioIndex={radioButtonIndex}
                                />
                            </span>
                            <span>
                                {t('women')}
                            </span>
                    </div>
                    <div className="radio-1 font16 anoHalfRegular">
                            <span onClick={()=>setRadioButtonIndex(2)}>
                                <RadioButton 
                                    id={2}
                                    radioIndex={radioButtonIndex}
                                />
                            </span>
                            <span>
                                {t('Men')}
                            </span>
                    </div>
                 </div>
                 <NewsLetterSignUp success={success} setSuccess={setSuccess} />
            </div>
        </div>:
        <div className="success-container">
             <ShowMore 
                onClick={()=>accept()} 
                heading={t('tqForSubscribingStayTuned')}
                buttonText={t('continueShopping')}/>
        </div>
       }
        <style jsx>{`
            .imageWrapper{
                padding-right:5%;
            }
            .success-container{
                background:white;
                margin-top:18.8rem;
                margin-bottom:22.8rem;
                margin-left:37.9rem;
                margin-right:37.9rem;
            }
            .msg{
                margin-bottom:5.8rem;
                padding-left:10%;
                padding-right:10%
            }
            .wrapper{
                margin-right:-5%;
                // margin-left:-5%;
                background:white;
                display:flex;
            }
            .newsletter{
                padding-right:5%;
                padding-top:5%;
            }
            .radioButton{
                display:flex; 
                margin-bottom:3.1rem;
                align-items:center;
                justify-content:space-around;
            }
            .radio-1{
                display:flex; 
            }
            .radio-1 span:nth-child(1){
                display: inherit;
                margin-right:1rem;
            }
            .text1{
                margin-bottom:1.6rem
            }
            .text2{
                margin-bottom:3rem;
            }
            .cross{
                text-align: -webkit-right;
                // text-align: right;
                cursor:pointer;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .wrapper{
                    display:block;
                    margin-right:0;
                    width:fit-content;
                }
                .imageWrapper{
                    padding-right:0;
                    // position:relative;
                }
                .newsletter{
                    padding-top:1rem;
                    padding-left:2rem;
                    padding-right:2rem;
                    // padding-bottom:4.8rem;
                }
                .radioButton{
                    margin-left:6.4rem;
                    margin-right:6.4rem
                }
                .msg{
                    margin-bottom:6.1rem;
                    padding-left:21%;
                    padding-right:21%;
                }
                .success-container{
                    margin-top:32.6rem;
                    margin-bottom:33.8rem;
                    margin-left:2rem;
                    margin-right:2rem;
                }
                .radio-1 span:nth-child(1){
                    display: inherit;
                    margin-right:1rem;
                }
                .cross{
                    // position:absolute;
                    right:25px;
                    transform: translateX(-50%);
                }
                .text1,.text2,.radioButton{
                    text-align:center;
                }
            }
        `}</style>
        </>
    )
}

function mapStateToProps({cache,selection,common,gifting,cookieConsent}){
    return {cache,selection,common,gifting,cookieConsent}
}

export default connect(mapStateToProps,{setShowNewsletterPopup,preventBodyScroll})(newsletter)