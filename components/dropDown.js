import React, { useState,useEffect } from 'react'
import Caret from './caret'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Colors from './colors'
import {MOBILE_BREAKPOINT} from '../config'

export default function DropDown(props) {
    const [dropDownActive, setDropDownActive] = useState(false);
    const [defaultText, setDefaultText] = useState(props.defaultValue);

    // console.log(props.dropDownValuesAsProduct)
    function SingleProduceItem(props){
        return(
            <>
                <div className="singleProduceItem">
                    <div className="productImage">
                        <LazyLoadImage
                            alt="Image"
                            src={props.product.productImg}
                            width="100%"
                        />
                    </div>
                    <h1 className="anoRegular font16 productName">{props.product.productName}</h1>
                    <h2 className="anoRegular font16 productPrice grey">{props.product.productPrice}</h2>
                    <div className="colorAndLike">
                        <div><Colors colors={["#EAC786","#D5D1D1","#F2C2A4"]}/></div>
                        <div><img src="/images/favMobile.svg" alt='Favourite icon'/></div>
                    </div>
                </div>
                <style jsx>{`
                    .productImage{
                        margin-bottom:1.6rem;
                    }
                    .productName,.productPrice{
                        margin-bottom:0.8rem;
                    }
                    .colorAndLike{
                        display:flex;
                        justify-content: space-between;
                    }
                    @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                        .colorAndLike{
                            display:flex;
                            justify-content: space-between;
                        }
                    }
                `}</style>
            </>
        )
    }

    useEffect(() => {
        if(!!props.dropDownValuesAsProduct){
            if(dropDownActive){
                setDefaultText("Close")
            }else{
                setDefaultText(props.defaultValue)
            }
        }
    }, [dropDownActive])
    return (
        <>
            <div className={`dropDownContainer positionRelative ${props.fontSize} ${props.fontFamily} ${dropDownActive?"dropDownActive":""}`}>
                <div onClick={()=>setDropDownActive(!dropDownActive)} className="ddButton">
                    {!!props.headingText && <span>{props.headingText} : </span>}
                    {!!props.defaultValue && <span className={` defaultText underlineLR ${!!props.dropDownValuesAsProduct && dropDownActive?"active":""}`}>{defaultText}</span>}
                    <span className="sizeArrow"><Caret color="black" direction={`${dropDownActive?"up":"down"}`} width="0.1rem" length="0.6rem" marginBottom="0.4rem"/></span>
                </div>
                {!!props.dropDownValues &&
                 <ul className="dropDown listStyleNone pl0 m0">
                    {!!props.dropDownValues && props.dropDownValues.map((value,index)=>{
                        return(
                            <>
                                {defaultText != value && <li onClick={()=>{setDefaultText(value),setDropDownActive(false)}} className="value">{value}</li>}
                            </>
                        )
                    })}
                </ul>}
                {!!props.dropDownValuesAsProduct && 
                    <div className="products">
                        {props.dropDownValuesAsProduct.map((product,index)=>{
                            return(
                                <div key={index} className="product"><SingleProduceItem product={product}/></div>
                            )
                        })}
                    </div>
                }
            </div>   
            <style jsx>{`
                .dropDownContainer{
                    background:#ffffff;
                    display: inline-block;
                }
                .defaultText{
                    display: inline-block;
                }
                .products{
                    display:flex;
                    margin-right:-2.4rem;
                    height:0;
                    overflow:hidden;
                    transform:translateY(-1rem);
                    transition:all 0.3s ease-out;
                }
                .dropDownActive .products{
                    padding-top:2rem;
                    height:auto;
                    transform:translateY(0rem);
                    transition:all 0.3s ease-out;
                }
                .product{
                    padding-right:2.4rem;
                }
                .ddButton{
                    padding-bottom: 0.5rem;
                }
                .dropDownActive .ddButton{
                    padding-bottom: 0.5rem;
                }
                .value{
                    margin-bottom:0.5rem;
                }
                .value:last-child{
                    margin-bottom:0rem;
                }
                .ddButton .sizeArrow{
                    margin-left:0.8rem;
                }
                .ddButton,.value{
                    cursor:pointer;
                    width: auto;
                }
                .dropDown{
                    background:#ffffff;
                    position: absolute;
                    left: 0;
                    top: 100%;
                    padding-left:${props.paddingLeft};
                    height:0;
                    overflow:hidden;
                    transform:translateY(-1rem);
                    transition:all 0.3s ease-out;
                }
                .dropDownActive .dropDown{
                    height:auto;
                    transform:translateY(0rem);
                    transition:all 0.3s ease-out;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .products{
                        text-align:left;
                    }
                }
            `}</style>
        </>
    )
}
