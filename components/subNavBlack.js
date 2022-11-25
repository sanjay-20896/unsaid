import React from 'react'
import { HEADER_HEIGHT_DESKTOP,HEADER_HEIGHT_TABLET,HEADER_HEIGHT_MOBILE,MOBILE_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT, MEDIUM_BREAKPOINT, HEADER_HEIGHT_MEDIUM } from '../config'
import Caret from './caret'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {getQueryVariable} from '../functions'
import useTranslation from 'next-translate/useTranslation'
export default function SubNavBlack(props) {
    const router = useRouter()
    const {t}=useTranslation('common')
    function back(){
        // if(getQueryVariable("payment")=="failed" && !!localStorage.getItem("checkoutBackPath"))
        //     router.push(localStorage.getItem("checkoutBackPath"))
        // else
            router.back()
    }
    return (
        <>
            <div className="subNavBlack paddedContent">
                <div onClick={() => back()} className="backButton anoRegular font16 white cursorPointer">
                    <span className="arrowBack"><Caret color="white" direction="left" width="0.1rem" length="0.7rem" marginBottom="0.2rem"/></span>
                    <span>{t('back1')}</span>
                </div>
                <div className="navItemMiddle cursorPointer">
                    <Link href="/"><a><img src="/images/logoMobileBlack.svg" className="showForMobile" alt="Mobile Logo Dark" /></a></Link>
                    <Link href="/"><a><img src="/images/logoWhiteDesktop.svg" className="hideForMobile logoDark" alt="Logo Dark"/></a></Link>
                </div>
                <div className="price font20 anoRegular white">
                    {/* {props.text} */}
                </div>
            </div>   
            <style jsx>{`
                .subNavBlack{
                    height:${HEADER_HEIGHT_DESKTOP}px;
                    background:#000000;
                    display:flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .backButton .arrowBack{
                    margin-right:0.8rem;
                }
                @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .subNavBlack{
                        height:${HEADER_HEIGHT_MEDIUM}px;
                    }
                }
                @media only screen and (max-width:${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .subNavBlack{
                        height:${HEADER_HEIGHT_TABLET}px;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .subNavBlack{
                        height:${HEADER_HEIGHT_MOBILE}px;
                    }
                }
            `}</style>
        </>
    )
}
