import React,{useState} from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import GridViewProduct from '../components/gridViewProduct'
import SingleProduct from '../components/singleProduct'
import ShowMore from './showMore'
export default function productListing(props) {
    
    return (
        <>
         <div className="productListing ">
             <h2 className="categoryName anoHalfRegular alignCenter paddedContent">{props.productList.category}</h2>
             <h1 className="collectionName canelaThin alignCenter paddedContent">{props.productList.collection}</h1>
             {props.gridView?
                <>
                    <div className="gridView paddedContent">
                        { Array.isArray(props.productList.products) && props.productList.products.slice(0,productLength).map(product=>{
                            return(
                            <div className="singleProductGrid">
                                <GridViewProduct colors={true} colorSize={"2rem"} device={props.device} img1={product.img1} img2={product.img2}  productName={product.productName}  productPrice={product.productPrice}  viewProductSection={product.viewProductSection}  productSectionLink={product.productSectionLink}/>
                            </div>
                            )
                        })}
                    </div>        
                </>:
                <>
                    <div className="products">
                        {props.productList.products.slice(0,productLength).map(product=>{
                            return(
                            <div className="singleProduct">
                                <SingleProduct product={product} colors={true} colorSize={"2rem"} device={props.device} img1={product.img1} img2={product.img2}  productName={product.productName}  productPrice={product.productPrice}  viewProductSection={product.viewProductSection}  productSectionLink={product.productSectionLink}/>
                            </div>
                            )
                        })}
                    </div>
                </>
            }
         </div>  
         <style jsx>{`
            .categoryName{
                margin-bottom:3.2rem;
            }
            .collectionName{
                margin-bottom:6.4rem;
            }
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
            .singleProductGrid:last-child,
            .singleProductGrid:nth-last-child(2),
            .singleProductGrid:nth-last-child(3) {
                margin-bottom:0;
            }
            .singleProduct{
                margin-bottom:9.6rem;
            }
            .singleProduct:last-child{
                margin-bottom:0rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .singleProduct{
                    margin-bottom:2.8rem;
                }
                .singleProductGrid{
                    width:50%;
                    padding-right:2.3rem;
                }
                .gridView{
                    margin-right:-2.3rem;
                }
                .singleProductGrid{
                    margin-bottom:1.6rem;
                }
                .singleProductGrid:last-child{
                    margin-bottom:0rem;
                }
                .singleProductGrid:nth-child(3n){
                    margin-bottom:0rem;
                }
                .categoryName{
                    margin:0 0 1.6rem 0;
                    font-size:1.2rem;
                    letter-spacing:1px;
                }
                .collectionName{
                    margin-bottom:4.8rem;
                    font-size:3.2rem;
                    letter-spacing:1px;
                }
            }
         `}</style> 
        </>
    )
}
