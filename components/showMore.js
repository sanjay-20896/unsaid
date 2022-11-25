import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'

export default function showMore(props) {
    return (
        <>
         <div className="showMore">
            {!!props.heading && <div className="showMoreHeading font32 canelaThin">{props.heading}</div>}
            <div className="showMoreButton font20 "><button onClick={props.onclick} className="btn btnSecondary anoRegular">{props.buttonText}</button></div>
        </div>   
        <style jsx>{`
            .showMoreHeading, .showMoreButton{
                text-align:center;
            }
            .showMoreHeading{
                margin-bottom:4.8rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .showMore{
                    margin-top:${props.noMargin?"0":"9.6rem"};
                }
                .showMoreHeading{
                    font-size:2.4rem;
                    margin-bottom:3.2rem;
                    padding: 0 ${props.noPadding?"0":"20%"};
                }
                .showMoreHeading{
                    margin-bottom:3.2rem;
                }
            }
        `}</style>
        </>
    )
}
