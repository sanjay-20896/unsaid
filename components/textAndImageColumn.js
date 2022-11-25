import React from 'react'
import ImageColumn from './imageColumn'
import TextArray from './textArray'
import {MOBILE_BREAKPOINT} from '../config'

export default function TextAndImageColumn(props) {
    return (
        <>
            <div className="textAndImageColumn">
                <div className="textArray standardPaddingBottom2"><TextArray text={props.text} textAlignLeft={true} descFontSize="font20"/></div>
                {/* <div><div className="imageCol"><ImageColumn images={props.images}/></div></div> */}
            </div>  
            <style jsx>{`
                .textArray{
                    padding:0 35%;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .textArray{
                        padding:0 3.6rem;
                    }
                }
            `}</style> 
        </>
    )
}
