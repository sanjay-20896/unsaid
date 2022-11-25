import React,{useEffect, useState} from 'react'
import GridViewProduct from '../components/gridViewProductDynamic'
import {MOBILE_BREAKPOINT} from '../config'
import ShowMore from '../components/showMore'
import SingleProduct from './product'
import { useRouter } from 'next/router'
import {SINGLE_VIEW_PRODUCT_INITIAL_NUMBER,GRID_VIEW_PRODUCT_INITIAL_NUMBER} from '../config'
import useTranslation from 'next-translate/useTranslation'
export default function SimpleProductListing(props) {
    const {t}=useTranslation('common');
    const [gridView, setGridView] = useState(false);
    const [productLength, setProductLength] = useState(3);
    function setToGridView(){
        setProductLength(productLength + 3)
    }
    const router=useRouter()
    let length1=GRID_VIEW_PRODUCT_INITIAL_NUMBER
    let length2=SINGLE_VIEW_PRODUCT_INITIAL_NUMBER
    // console.log("limit",props.limitProducts)
    // useEffect(()=>{
        
    // },[])
    return (
        <>
        <div className="standardPaddingBottom">
            <div className="gridView paddedContent hideForMobile">
                {Array.isArray(props.desktopUpsellProducts) && props.desktopUpsellProducts.map((product, index)=>{
                    return(
                        <>
                            <div className="singleProductGrid hideForMobile">
                                <GridViewProduct showF1={true} product={product}  selectedColor={props.selectedMaterial} colors={true} colorSize={"2rem"} colorsSize="standard" device={props.device} productName={product.name}  productPrice={product.price}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                            </div>
                        </>
                    )
                })}
                
            </div> 
            <div className="showForMobile">
                {Array.isArray(props.mobileUpsellProducts) && props.mobileUpsellProducts.map((product, index)=>{
                    return(
                        <>
                            <div className="singleProductGrid">
                                <SingleProduct showF1={true} product={product} selectedColor={props.selectedMaterial} colors={true} colorSize={"2rem"} colorsSize="standard" device={props.device} productName={product.name}  productPrice={product.price}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                            </div>
                        </>
                    )
                })}
            </div> 
        </div>
        {!gridView &&
           <div className="showMore">
            <ShowMore 
                    onclick={()=>router.push(props.uri)}
                    heading={`${t('experienceTheFullPart1')} ${props.name} ${t('experienceTheFullPart2')}`}
                    buttonText={`${t('unlock')} ${props.name}`}
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
