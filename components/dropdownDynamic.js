import React, { useState,useEffect } from 'react'
import Caret from './caret'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Colors from './colorsDynamic'
import {MOBILE_BREAKPOINT} from '../config'
import Link from 'next/link';
import Like from '../components/likeProduct'
import { connect } from 'react-redux';
import {getPriceBasedOnSelection,formatPrice} from '../functions'
import SingleProductItem from './singleProductItem';
import GridViewProductDynamic from './gridViewProductDynamic';
import useTranslation from 'next-translate/useTranslation'

function DropDown(props) {
    const {t}=useTranslation('common')
    const [dropDownActive, setDropDownActive] = useState(false);
    const [defaultText, setDefaultText] = useState(props.defaultValue);
    // console.log("dropdown products",props)
    
    
    useEffect(() => {
        if(!!props.dropDownValuesAsProduct || !!props.dropDownValuesAsProductType2){
            if(dropDownActive){
                setDefaultText("Close")
            }else{
                setDefaultText(props.defaultValue)
            }
        }
    }, [dropDownActive])
    return (
        <>
            <div className={`dropDownContainer positionRelative ${props.fontSize} ${props.fontFamily} ${dropDownActive?"active":""}`}>
                <div onClick={()=>setDropDownActive(!dropDownActive)} className="ddButton">
                    {!!props.headingText && <span>{props.headingText} : </span>}
                    {!!props.defaultValue && <span className={` underlineLR ${!!props.dropDownValuesAsProduct && dropDownActive?"active":""}`}>{defaultText}</span>}
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
                                <div key={index} className="product"><SingleProductItem product={product}/></div>
                            )
                        })}
                    </div>
                }
                {!!props.dropDownValuesAsProductType2 && 
                    <div className="products">
                        {props.dropDownValuesAsProductType2.map((product,index)=>{
                            let productPrice=getPriceBasedOnSelection(product,props.selection)
                            return(
                            <div className="product" key={index}>
                                <GridViewProductDynamic showF1={false} product={product} selectedColor={null} colors={true} colorSize={"2rem"} productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                            </div>
                            )
                        })}
                    </div>
                }
            </div>   
            <style jsx>{`
                .dropDownContainer{
                    background:#ffffff;
                    display: inline-block;
                    width:100%;
                }
                .products{
                    //display:none;
                    height:0;
                    overflow:hidden;
                    transform:translateY(-1rem);
                    transition:all 0.3s ease-out;
                    flex-flow:row wrap;
                    justify-content:space-between;
                }
                .active .products{
                    display:flex;
                    padding-top:2rem;
                    height:auto;
                    transform:translateY(0rem);
                    transition:all 0.3s ease-out;
                }
                .product{
                    width: calc(50% - 1.4rem);
                }
                .ddButton{
                    padding-bottom: 0.5rem;
                }
                .active .ddButton{
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
                    .product{
                        width:50%;
                    }
                }
            `}</style>
        </>
    )
}


function mapStateToProps({common,selection}){
    return {common,selection}
}


export default connect(mapStateToProps,null)(DropDown)