import React, { useRef, useState } from 'react'
import ThreeStepText from './threeStepText'
import SingleProduct from '../components/singleProduct'
import GridViewProduct from '../components/gridViewProduct'
import {MOBILE_BREAKPOINT} from '../config'
import ShowMore from '../components/showMore'
import FilterSection from '../components/filterSection'

export default function collectionPageProduct(props) {
    const [gridView, setGridView] = useState(false);

    const filterLineRef=useRef();

    function setToGridView(){
        setGridView(!gridView)
        filterLineRef.current.scrollIntoView({ 
            behavior: "smooth", 
            block: "nearest"
         })
    }
    return (
        <>
         <div className="productsWrapper">
            <div className="paddedContent">
                <div className="additionalPaddingMobile">
                    <ThreeStepText smallText="Timeless sanctuary" largeText="Meet the collection" largerDesc={true} desc="The sentimental design of striking diamonds and gold disks evokes a place where you will always find love and comfort."/>
                </div>
                <div ref={filterLineRef} className="filterSection">
                    <FilterSection 
                        onclick={()=>setGridView(!gridView)}
                        mainHeading={"Nest"}
                        subHeading={"showing all designs (54)"}
                        priceRange={"€450 - €5,400"} 
                        sortBy={["Collection", "Curated", "Category"]} 
                        device={props.device} 
                        static={true}
                    />
                </div>
            </div>
            {gridView?
                <>
                    <div className="gridView paddedContent">
                        {props.products.map(product=>{
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
                        {props.products.slice(0,4).map(product=>{
                            return(
                            <div className="singleProduct">
                                <SingleProduct product={product} colors={true} colorSize={"2rem"} device={props.device} img1={product.img1} img2={product.img2}  productName={product.productName}  productPrice={product.productPrice}  viewProductSection={product.viewProductSection}  productSectionLink={product.productSectionLink}/>
                            </div>
                            )
                        })}
                    </div>
                    {!gridView &&
                        <ShowMore 
                            onclick={()=>setToGridView()}
                            heading="Experience the full Nest collection..."
                            buttonText={`Unlock ${props.products.length - 4} more pieces`}
                        />
                    }
                </>
            }
         </div> 
         <style jsx>{`

            
            .gridView{
                display:flex;
                margin-right:-2.4rem;
                flex-wrap: wrap;
            }
            .filterSection{
                margin-top:9.6rem;
                margin-bottom:5.6rem;
            }
            .singleProductGrid{
                width:33.33%;
                padding-right:2.4rem;
            }
            .singleProductGrid{
                margin-bottom:4.8rem;
            }
            .singleProductGrid:last-child{
                margin-bottom:0;
            }
            .productsWrapper{
                padding-bottom:22.4rem;
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
                .filterSection{
                    margin-top:0rem;
                }
                .productsWrapper{
                    padding-bottom:9.6rem;
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
            }
         `}</style>  
        </>
    )
}
