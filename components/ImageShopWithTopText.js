import React from 'react'
import TextArray from './textArray'
import {MOBILE_BREAKPOINT} from '../config'
import ImageShop from './imageShop'

export default function ImageShopWithTopText(props) {
    // console.log(props.dropdownProducts)
    return (
        <>
            <div>
                {!!props.text && <div className="textArray standardPaddingBottom2 textArrayCenter"><TextArray text={props.text} textAlignLeft={props.textAlignLeft} descFontSize={props.descFontSize}/></div>}
                <div className="imageShop"><ImageShop data={props.images} label={props.label} dropDownProducts={!!props.dropdownProducts?props.dropdownProducts:null}/></div>
            </div>
        </>
    )
}
