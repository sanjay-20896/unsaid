import React,{useEffect, useState,useEffect} from 'react'
import GridViewProduct from '../components/gridViewProduct'
import {MOBILE_BREAKPOINT} from '../config'
import ShowMore from '../components/showMore'
import SingleProduct from './singleProduct'
import { useRouter } from 'next/router'

export default function simpleProductListing(props) {
    const [gridView, setGridView] = useState(false);
    const [productLength, setProductLength] = useState(3);
    function setToGridView(){
        setProductLength(productLength + 3)
    }
    const router=useRouter()
    useEffect(()=>{
        if(productLength===props.products.length){
            setGridView(true)
        }
    },[productLength])
    // console.log("simple product listing",props.uri)
    
    return (
        <>
         <div className="gridView paddedContent hideForMobile">
            {props.products.slice(0,productLength).map((product,index)=>{
                return(
                    <>
                        <div key={index} className="singleProductGrid hideForMobile">
                            <GridViewProduct  product={product} colors={true} colorSize={"2rem"} device={props.device} img1={product.img1} img2={product.img2}  productName={product.productName}  productPrice={product.productPrice}  viewProductSection={product.viewProductSection}  productSectionLink={product.productSectionLink}/>
                        </div>
                    </>
                )
            })}
        </div> 
        <div className=" showForMobile">
            {props.products.slice(0,productLength).map((product,index)=>{
                return(
                    <>
                        <div key={index} className="singleProductGrid">
                            <SingleProduct product={product} colors={true} colorSize={"2rem"} device={props.device} img1={product.img1} img2={product.img2}  productName={product.productName}  productPrice={product.productPrice}  viewProductSection={product.viewProductSection}  productSectionLink={product.productSectionLink}/>
                        </div>
                    </>
                )
            })}
        </div> 
        {!gridView &&
           <div className="showMore">
            <ShowMore 
                    onclick={()=>setToGridView()}
                    heading="Experience the full Nest collection..."
                    buttonText={`Unlock Nest`}
                />
           </div>
        }   
        <style jsx>{`
            .gridView{
                display:flex;
                margin-right:-2.4rem;
                flex-wrap: wrap;
            }
            .singleProductGrid{
                width:33.33%;
                padding-right:2.4rem;
            }
            .singleProductGrid{
                margin-bottom:4.8rem;
            }
            .singleProductGrid:nth-last-child(1),
            .singleProductGrid:nth-last-child(2),
            .singleProductGrid:nth-last-child(3){
                margin-bottom:0;
            }
            
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .singleProductGrid{
                    width:100%;
                    padding-right:0rem;
                }
                .gridView{
                    margin-right:0rem;
                }
                .singleProductGrid{
                    margin-bottom:3.2rem;
                }
                .singleProductGrid:nth-last-child(1){
                    margin-bottom:0;
                }
                .singleProductGrid:nth-last-child(2),
                .singleProductGrid:nth-last-child(3){
                    margin-bottom:3.2rem;
                }
            }
        `}</style>
        </>
    )
}
