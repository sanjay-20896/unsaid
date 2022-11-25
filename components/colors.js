import React, { useState } from 'react'
import { MEDIUM_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT } from '../config';
export default function Colors(props) {
    const [currentColor, setCurrentColor] = useState(0);
    return (
        <>
         <div className="colors">
            <div className="colorsFlex">
                {/* {props.colors.map((color,index)=>{
                    return(
                        <div onClick={()=>props.setVariantProduct()} style={{background:color}} className={`color ${index===currentColor?"select":""}`}></div>
                    )
                })} */}
                {props.colors[0]=="#EAC786" && 
                (
                        <div onClick={()=>{props.settingVariantProduct("#EAC786"),setCurrentColor(0)}} style={{background:props.colors[0]}} className={`color cursorPointer ${currentColor==0?"select":""}`}></div>
                )}
                {props.colors[1]=="#D5D1D1" && 
                    (
                        <div onClick={()=>{props.settingVariantProduct("#D5D1D1"),setCurrentColor(1)}} style={{background:props.colors[1]}} className={`color cursorPointer ${currentColor==1?"select":""}`}></div>
                    )}
                {props.colors[2]=="#F2C2A4" && 
                    (
                        <div onClick={()=>{props.settingVariantProduct("#F2C2A4"),setCurrentColor(2)}} style={{background:props.colors[2]}} className={`color cursorPointer ${currentColor==2?"select":""}`}></div>
                    )}
            </div>
         </div>  
         {props.showColorName && <h3 className="colorName font16 anoRegular grey">18K yellow gold</h3>}
         <style jsx>{`
            .colors{
                display:inline-block;
                margin-bottom:${!!props.marginBottom ? props.marginBottom:"0"};
            }
            .colorsFlex{
                display:flex;
            }
            .color{
                width:${props.colorsSize=="standard"?"2rem":"0.8rem"};
                height:${props.colorsSize=="standard"?"2rem":"0.8rem"};
                border-radius:50%;
                margin-right:${!!props.marginRight?props.marginRight:"0.8rem"};
                cursor: pointer !important;
            }
            .color:last-child{
                margin-right:0rem;
            }
            .color.select{
                border: 1px solid #787878;
            }
            @media only screen and (max-width:${MEDIUM_BREAKPOINT}px){
                .color{
                    width:${props.colorsSize=="standard"?"1.8rem":"0.8rem"};
                    height:${props.colorsSize=="standard"?"1.8rem":"0.8rem"};
                }
            }
            @media only screen and (max-width:${TABLET_LANDSCAPE_BREAKPOINT}px){
                .color{
                    width:${props.colorsSize=="standard"?"1.5rem":"0.8rem"};
                    height:${props.colorsSize=="standard"?"1.5rem":"0.8rem"};
                }
            }
            @media only screen and (max-width:${TABLET_PORTRAIT_BREAKPOINT}px){
                .color{
                    width:${props.colorsSize=="standard"?"1.2rem":"0.8rem"};
                    height:${props.colorsSize=="standard"?"1.2rem":"0.8rem"};
                }
            }
         `}</style> 
        </>
    )
}


