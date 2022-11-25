 import Link from 'next/link'
import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import { paddingRightMobile } from '../data/cssVariables'
import { connect } from 'react-redux'
// import {showCookieDetails,setShowCookies,showNavBar} from '../redux/actions'

function BrandNotification(props) {
    // console.log("brand notification",props)
    return (
        <>
            <div className="brandNotification positionRelative paddedContent">
                {!!props?.notification?.url ?
                    <p className="msg anoRegular textCenter">
                        <Link href={props.notification.url}><a className="link smallUnderlineBlack">{props.notification.text}</a></Link>
                    </p>
                    :
                    <p className="msg anoRegular textCenter">{props.notification.text}</p>
                }
                <div onClick={props.onclick} className="cross positionAbsolute"><img src="/images/cross.svg" alt="cross" className="width-100" width="16" height="16" /></div>
            </div>  
            <style jsx>{`
                .link{
                    cursor:pointer;
                    display: inline-block;
                }
                .brandNotification{
                    background: ${props.notification.backgroundColor};
                    min-height:2.8rem;
                    width:100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .msg{
                    color:${props.notification.textColor};
                }
                .cross{
                    width:2rem;
                    height:2rem;
                    padding: 0.4rem;
                    top:50%;
                    right:6rem;
                    transform: translateY(-58%);
                    cursor:pointer;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .cross{
                        width:3rem;
                        height:3rem;
                        right: 13px;
                        transform: translateY(-50%);
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: center;
                    }
                    .brandNotification{
                        min-height:4.6rem;
                    }
                    .brandNotification{
                        justify-content: center;
                    }
                    .link{
                        width:100%;
                        text-align:center;
                    }
                }
            `}</style> 
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}

export default connect(mapStateToProps,{})(BrandNotification)