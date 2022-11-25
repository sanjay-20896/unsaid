import React  from 'react'
import { MEDIUM_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT } from '../config';
export default function colors(props) {
    let allProducts = [].concat(props.product).concat(props.product.relatedProducts?props.product.relatedProducts:[])
    let uniqueColors = []
    allProducts.forEach(p=>{
        let condition = props?.currentSelectedProduct?.color?.color_hex_2?p?.color?.color_hex==props?.currentSelectedProduct?.color?.color_hex && p?.color?.color_hex_2==props?.currentSelectedProduct?.color?.color_hex_2:p?.color?.color_hex==props?.currentSelectedProduct?.color?.color_hex
        if(condition && uniqueColors.findIndex(cord_color=>cord_color?.hex==p?.cord_color?.hex)==-1){
            if(p.cord_color)
                uniqueColors.push(p.cord_color)
        }
    })
    function handleColorChange(colorHex){
        let c = uniqueColors.find(col=>col.hex==colorHex)
        props.cordColorClick(c)
    }
    return (
        <>
         {uniqueColors.length > 0 &&    
            <select className="anoRegular font16 select" onChange={(e)=>handleColorChange(e.target.value)} value={props?.currentSelectedProduct?.cord_color?.hex}>
                {uniqueColors.map(color=>{
                    return <option value={color.hex} key={color.hex}>{color.text}</option>
                })}
            </select>
         }
         <style jsx>{`
            .colors{
                display:inline-block;
            }
            .colorsFlex{
                display:flex;
            }
            .color{
                width:${props.colorsSize=="standard"?"2rem":"1rem"};
                height:${props.colorsSize=="standard"?"2rem":"1rem"};
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
                    width:${props.colorsSize=="standard"?"1.3rem":"1rem"};
                    height:${props.colorsSize=="standard"?"1.3rem":"1rem"};
                }
            }
         `}</style> 
        </>
    )
}


