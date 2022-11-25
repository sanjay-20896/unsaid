import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'

export default function Notification(props) {
    return (
        <>
            <div className="brandNotification positionRelative paddedContent">
                <p className="msg anoRegular font16 white">{props.msg}</p>
                <div onClick={props.onclick} className="cross positionAbsolute"><img src="/images/crossWhite.svg" alt="cross" className="width-100"/></div>
            </div>  
            <style jsx>{`
                .brandNotification{
                    background: #000000;
                    height:4.8rem;
                    width:100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }
                .msg{
                    cursor:pointer;
                    margin-right:6.4rem;
                }
                .cross{
                    width:1.2rem;
                    height:1.2rem;
                    top:50%;
                    right:6.4rem;
                    transform:translateY(-65%);
                    cursor:pointer;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .cross{
                        right:3.6rem;
                    }
                    .brandNotification{
                        justify-content: left;
                    }
                }
            `}</style> 
        </>
    )
}
