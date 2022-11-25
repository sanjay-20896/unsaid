import React, { useState, useEffect } from 'react'
import {MOBILE_BREAKPOINT} from '../config'
export default function Switch(props) {
    return (
        <>
            <div className={`switch ${props.inActive?"inactive":""} ${props.on?"switchOn":""}`}>
                <div className="text">{props.text}</div>
                <div onClick={()=>{!!props.onSwitch && props.onSwitch()}} className="buttonWrapper positionRelative anoRegular">
                    <span className="on positionAbsolute">ON</span>
                    <span className="ball positionAbsolute"></span>
                    <span className="off positionAbsolute">OFF</span>
                </div>
            </div>   
            <style jsx>{`
                .buttonWrapper{
                    width:4.8rem;
                    height:1.8rem;
                    border-radius: 20px;
                    font-size:8px;
                    margin-left:2rem;
                    background:#ffffff;
                    color:#000000;
                    cursor:pointer;
                    border: 0.5px solid #000000;
                    transition:all 0.3s ease-out;
                }
                .inactive .text{
                    color:#787878;
                }
                .switchOn .buttonWrapper{
                    background:#000000;
                    color:#F9F9F9;
                }
                .switchOn .ball{
                    left:3.1rem;
                    background:#F2F2F2;
                    transition:all 0.3s ease-out;
                }
                .ball{
                    width:1.4rem;
                    height:1.4rem;
                    border-radius: 50%;
                    left:0.2rem;
                    top:50%;
                    transform:translateY(-50%);
                    background:#000000;
                    transition:all 0.3s ease-out;
                }
                .inactive .ball{
                    background:#F2F2F2;
                }
                .on,.off{
                    top:50%;
                    transform:translateY(-46%);
                }
                .on{
                    left:11px;
                    opacity:0;
                    transition:all 0.3s ease-out;
                }
                .switchOn .on{
                    opacity:1;
                }
                .switchOn .off{
                    opacity:0;
                }
                .off{
                    right:9px;
                    opacity:1;
                    transition:all 0.3s ease-out;
                }
                .inactive .buttonWrapper{
                    pointer-events:none;
                    background:#C4C4C4;
                    color:#EEECE3;
                    border: none;
                }
                .switch{
                    display:flex;
                    align-items: center;
                }
                span{
                    display:inline-block;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .switch{
                        justify-content:space-between;
                    }
                }
            `}</style>
        </>
    )
}
