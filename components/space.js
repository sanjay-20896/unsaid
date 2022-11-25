import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'

export default function space(props) {
    return (
        <>
         <div className="freeSpace"></div>
         <style jsx>{`
            .freeSpace{
                height:${props.height}
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .freeSpace{
                    height:${!!props.mobileHeight?props.mobileHeight:props.height}
                } 
            }
         `}</style>   
        </>
    )
}
