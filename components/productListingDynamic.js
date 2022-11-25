import React,{useState,useEffect} from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import GridViewProduct from '../components/gridViewProductDynamic'
import SingleProduct from '../components/product';
import { getPriceBasedOnSelection} from '../functions'
import { connect } from 'react-redux';
import ShowMore from './showMore';
import { plpPaths } from '../branch-specific-config';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'
function productListing(props) {
    const {t}=useTranslation('common');
    const [gridView, setGridView] = useState(false);
    const [productLength, setProductLength] = useState(3);
    function setToGridView(){
        setProductLength(productLength + 3)
    }
    useEffect(()=>{
        if(productLength===props.productList.products){
            setGridView(true)
        }
    },[productLength])
    const router=useRouter()
    let categoryUrl
    let category=props.common.plpPaths.find(item=>item.filterType==props.productList.type)
    category=category?.filterValues
    categoryUrl=category?.find(item=>item.name==props.productList.name)
    categoryUrl=categoryUrl?.uri
    return (
       
        <>
         <div className="productListing ">
             <h2 className="categoryName canelaThin font32 alignCenter paddedContent">{props.productList.name}</h2>
             {props.gridView?
                <div className="gridView paddedContent">
                    { Array.isArray(props.productList.products) && !!props.limit ?props.productList.products.slice(0,productLength).map((product,index)=>{
                        let productPrice=getPriceBasedOnSelection(product,props.selection)
                        return (
                        <div className="singleProductGrid" key={`singlePG_${product.product}`}>
                            <GridViewProduct showF1={props.showF1} colors={true} colorSize={"2rem"} selectedColor={!!props.selectedColor?props.selectedColor:null} product={product} device={props.device}  productName={product.name}  productPrice={productPrice?productPrice:product.price}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                        </div>
                        )
                    })
                    :
                    props.productList.products.map((product,index)=>{
                        let productPrice=getPriceBasedOnSelection(product,props.selection)
                        return (
                        <div className="singleProductGrid" key={`singlePG_${product.product}`}>
                            <GridViewProduct showF1={props.showF1} colors={true} colorSize={"2rem"} selectedColor={!!props.selectedColor?props.selectedColor:null} product={product} device={props.device}  productName={product.name}  productPrice={productPrice?productPrice:product.price}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                        </div>
                        )
                    })
                }
                </div>        
                :
                <div className="products">
                    {props.productList.products.slice(0,productLength).map((product,index)=>{
                        let productPrice=getPriceBasedOnSelection(product,props.selection)
                        // console.log("media",product.media.index)
                        return (
                            <div className="singleProduct" key={`singleP_${product.product}`}>
                                <SingleProduct product={product} colors={true} colorSize={"2rem"} selectedColor={!!props.selectedColor?props.selectedColor:null}  device={props.device} productName={product.name}  productPrice={productPrice?productPrice:product.price}  viewProductSection={`${t('viewAll')} ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                            </div>
                        )
                    })}
                </div>
            }
            {props.limit===false ? 
            <>
            </>
            :
            props.linkToPlpPage===undefined || props.linkToPlpPage===false   ?
                <div>
                    {!gridView &&
                        <div className="showMore">
                            <ShowMore 
                                onclick={()=>setToGridView()}
                                heading={`${t('experienceFullProductPart1')} ${props.productList.name} ${t('experienceFullProductPart2')}`}
                                buttonText={t('unlockPieces')}
                            />
                        </div>
                    }
                </div>
            : 
                <div className="showMore">
                    {!!categoryUrl &&
                        <ShowMore 
                            onclick={()=>{router.push(`/categories/${categoryUrl}`)}}
                            buttonText={`${t('seeMore')} ${props.productList.name}`}
                        />
                    }
                </div>
            }
            {/* {props.linkToPlpPage===undefined || props.linkToPlpPage===false   ?
                <div>
                    {!gridView &&
                        <div className="showMore">
                            <ShowMore 
                                onclick={()=>setToGridView()}
                                heading={`${t('experienceFullProductPart1')} ${props.productList.name} ${t('experienceFullProductPart2')}`}
                                buttonText={t('unlockPieces')}
                            />
                        </div>
                    }
                </div>
            : 
                <div className="showMore">
                    {!!categoryUrl &&
                        <ShowMore 
                            onclick={()=>{router.push(`/categories/${categoryUrl}`)}}
                            buttonText={`${t('seeMore')} ${props.productList.name}`}
                        />
                    }
                </div>
            } */}
         </div>  
         <style jsx>{`
            .showMore{
                margin-top:12.2rem;
            }
            .categoryName{
                margin-bottom:9.6rem;
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
            .singleProductGrid:nth-last-child(-n+3) {
                margin-bottom:0;
            }
            .singleProduct{
                margin-bottom:9.6rem;
            }
            .singleProduct:last-child{
                margin-bottom:0rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .showMore{
                    margin-top:9.8rem
                }
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

function mapStateToProps({common,selection}){
    return {common,selection}
}


export default connect(mapStateToProps,null)(productListing)