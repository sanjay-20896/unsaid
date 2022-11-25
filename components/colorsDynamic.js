import React,{ useEffect}  from 'react'
import { MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT } from '../config';
import {getNestedObject} from '../functions'
import useTranslation from 'next-translate/useTranslation'

export default function colors(props) {
    const {t}=useTranslation('common')

    // console.log("default val",props.defaultColorSwatch)
    let allProducts = [].concat(props.product).concat(props.product.relatedProducts)
    let currentColorText = props?.currentSelectedProduct?.color?.color_text
    //get unique colors from all products
    let uniqueColors = []
    allProducts.forEach(p=>{
        if(p.color && uniqueColors.findIndex(color=>color.color_text==p.color.color_text)==-1 ){
            uniqueColors.push(p.color)
        }
    })
    return (
        <>
         {uniqueColors.length > 0 &&
            <div>
                <div className="colors">
                    <div className="colorsFlex">   
                        {uniqueColors.map(color=>{
                            // console.log(color)
                            let myStyle;
                            if(!!color.color_hex && color.color_hex_2){
                                myStyle={
                                    background:`linear-gradient(to right,${color.color_hex} 50%,${color.color_hex_2} 50%)`
                                }
                            }
                            if(!!color.color_hex && !color.color_hex_2){
                                myStyle={
                                    background:color.color_hex
                                }
                            }
                            return (
                            <>
                            <div onClick={()=>{props.colorClick(color)}} style={myStyle} className={`color cursorPointer background ${color.color_text==props?.currentSelectedProduct?.color?.color_text ?"select":""}`}></div>
                            </>
                            )
                        })}               
                    </div>
                </div>  
                {props.showColorName && !!currentColorText && <h3 className="colorName font16 anoRegular grey">{currentColorText}</h3>}
            </div>
         }
         <style jsx>{`
            .colors{
                display:inline-block;
            }
            .colorsFlex{
                display:flex;
            }
            .color{
                width:${props.colorsSize=="standard"?"1.2rem":"1rem"};
                height:${props.colorsSize=="standard"?"1.2rem":"1rem"};
                border-radius:50%;
                margin-right:${!!props.marginRight?props.marginRight:"1rem"};
            }
            .color:last-child{
                margin-right:0rem;
            }
            .color.select{
                border: 1px solid #787878;
            }
            @media only screen and (max-width:${MEDIUM_BREAKPOINT}px){
                .color{
                    width:${props.colorsSize=="standard"?"1.8rem":"1rem"};
                    height:${props.colorsSize=="standard"?"1.8rem":"1rem"};
                }
            }
            @media only screen and (max-width:${TABLET_LANDSCAPE_BREAKPOINT}px){
                .color{
                    width:${props.colorsSize=="standard"?"1.3rem":"1rem"};
                    height:${props.colorsSize=="standard"?"1.3rem":"1rem"};
                }
            }
            @media only screen and (max-width:${TABLET_PORTRAIT_BREAKPOINT}px){
                .color{
                    width:1.2rem;
                    height:1.2rem;
                }
            }
         `}</style> 
        </>
    )
}


