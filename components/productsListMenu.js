import { MOBILE_BREAKPOINT, MAX_PRODUCTS_IN_MENU } from "../config";
import ProductListItemMenu from "./ProductListItemMenu";
import {connect} from 'react-redux'
import Link from 'next/link'
import {getCuratedProducts} from '../functions'
import {showExploreMenu} from '../redux/actions'
import Loader from './loader'
import LazyImage from "./lazyImage";
import { moreProducts } from "../data/staticData";
function ProductsListMenu(props){
    // console.log("product list menu",props.item)
    let products = props?.item?.products
    // if(props.item.fetch=="products_by_category"){
    //     products = props.products.filter(p=>{
    //         return p.categories.find(c=>c.category==props.item.categoryId)
    //     })
    // }
    // if(props.item.fetch=="products_by_collection"){
    //     products = props.products.filter(p=>{
    //         return p.collection==props.item.collectionId
    //     })
    // }
    // if(props.item.fetch=="products_by_gender"){
    //     products = props.products.filter(p=>{
    //         return p?.product_gender?.includes(props.item.gender)
    //     })
    // }
    // if(props.item.fetch=="products_by_material"){
    //     products = props.products.filter(p=>{
    //         return p?.materials_available?.includes(props.item.material)
    //     })
    // }
    // if(props.item.fetch=="products_by_style"){
    //     products=props.products?.filter(p=>{
    //         return p?.product_style?.includes(props.item.style)
    //     })
    // }

    // let countOfProducts = products.length
    // let products=null;
    // if(!!products)
    //     products = getCuratedProducts(products,"menu")
    // if(!!products && props.limitProducts)
    //     products = products.splice(0,MAX_PRODUCTS_IN_MENU)
    // // console.log("products",products)
    return (
        <>
            <div className="productsListMenu fadeInAnimationNew">
                {!!props.item && !!props.item.heading && 
                    <div className='seeAllLink hideForMobile'><Link href={props.item.seeAllLinksTo?props.item.seeAllLinksTo:"/"}><a className="canelaThin underlineLR font20" onClick={()=>props.showExploreMenu(false)}>{props.item.heading} {!props.item.hideCountNumber && <span> ({props.item.countOfProducts}) </span>}</a></Link></div>
                }
                {!!props.item && !!props.item.desc && 
                    <div className="productDesc font16 anoHalfRegular"><Link href={props.item.seeAllLinksTo?props.item.seeAllLinksTo:"/"}><a onClick={()=>props.showExploreMenu(false)}>{props.item.desc}</a></Link></div>
                }
                {!!props.item && !!props.item.mainImg && 
                    <div className="productMainImg">
                        <Link href={props.item.seeAllLinksTo?props.item.seeAllLinksTo:"/"}>
                            <a onClick={()=>props.showExploreMenu(false)}>
                                <LazyImage 
                                    alt={props?.item?.heading}
                                    originalSrc={props.item.mainImg}
                                    width={400} 
                                    height={172} 
                                />
                            </a>
                        </Link>
                    </div>
                }
                {/* {props.cache.fetchingAllProducts &&
                    <div className="alignCenter">
                        <div className="loader">
                            <Loader type="dots" size={8} color="#787878"/>
                        </div>
                    </div>
                } */}
                {!!products && products.length!=0 &&
                    <div className="productDetails">
                        {products.map((product,index)=>{
                            return (
                                <div key={`productlistdetailsmenu_${product.product}`} className="productListItem">
                                    <ProductListItemMenu staticPrice={true} selectedColor={props?.item?.activeColor}  showExcerpt={true} position={index+1} product={product} />
                                </div>
                            )
                        })}
                    </div>
                }
                {!!products && products.length!=0 &&
                    <Link href={props.item.seeAllLinksTo?props.item.seeAllLinksTo:"/"}>
                        <a onClick={()=>props.showExploreMenu(false)}>
                            <div className="viewAll alignCenter anoRegular font16-notResponsive">View all</div>
                        </a>
                    </Link>
                }
            </div>
            <style jsx>{`
                .loader{
                    margin:2rem auto;
                    width:0;
                }
                .viewAll{
                    margin:6rem 0 6rem 0;
                }
                .seeAllLink{
                    margin-bottom:0.8rem;
                }
                .productDesc{
                    margin-bottom:1.6rem;
                }
                .productDetails{
                    margin-top:2.4rem;
                }
                .productDetails .productListItem:not(:last-child){
                    margin-bottom:2.4rem;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}){
                    .seeAllLink{
                        text-align:center;
                        margin-top:3.2rem;
                        margin-bottom:3.2rem;
                    }
                    .productListItem{
                        margin-top:1.6rem;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({cache}){
    return {cache}
}
export default connect(mapStateToProps,{showExploreMenu})(ProductsListMenu)