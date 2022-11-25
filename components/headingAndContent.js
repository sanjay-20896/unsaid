import React from 'react'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT} from '../config'
import BlockContent from '@sanity/block-content-to-react'
import {serializers} from '../serialiser'
export default function HeadingAndContent(props) {
    // console.log("description")
    return (
        <>
            <div className="headingAndContent">
                <h1 className="heading canelaThin font40">{props.heading}</h1>
                {/* <p className="content anoHalfRegular font16">{props.content}</p> */}
                <div className="shippingContentString content anoHalfRegular font16-notResponsive">
                    {props.content}
                    {/* <BlockContent serializers={serializers} blocks={props.content}/> */}
                </div>
            </div>   
            <style jsx>{`
                .heading{
                    margin-bottom:2.4rem;
                }
                .content div p{
                    margin-bottom:1.2rem;
                }
                .shippingContentString.font16-notResponsive{
                    font-size: 1.6rem;
                    line-height: 2.6rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .heading{
                        font-size:2rem;
                    }
                }

            `}</style> 
        </>
    )
}
