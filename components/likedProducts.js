import { MOBILE_BREAKPOINT } from "../config"
import {connect} from 'react-redux'
import Like from './likeProduct'
import {getPriceBasedOnSelection,getProductImage} from '../functions'
import {showWishlist} from '../redux/actions'
import Link from 'next/link'
import LazyImage from './lazyImage'
function LikedProducts(props){
    // console.log("likes array from selection",props.cache)
    let productIds=props.selection.likesArray?props.selection.likesArray:[]
    let products = []
    productIds.forEach(productId=>{
        if(props.cache.products[productId])
            products.push(props.cache.products[productId])
    })
    // console.log("liked products",products)

    return (
        <>
            <div className="allLikedProducts">
                {products.map((product,index)=>{
                    // console.log("single product",product)
                    let productPrice = !!product.prices?getPriceBasedOnSelection(product,props.selection):product.price
                    let productImage = getProductImage(product,"v1","medium")
                    return(
                                <div className="likedProduct anoRegular font16" key={`likedProduct_${index}`}>
                                    <div className="productImg positionRelative">
                                        
                                            <Link href={`/products/${product.uri}`}>
                                                <a onClick={()=>props.showWishlist(false)}>
                                                    {!!productImage &&
                                                    <LazyImage
                                                    alt="Product image"
                                                    originalSrc={productImage}
                                                    width={201.25}
                                                    height={201.25}/>
                                                        // <img className="width-100" src={productImage}/>
                                                    }
                                                </a>
                                            </Link>
                                        <div className="favIcon">
                                            <Like noPadding={true} product={product} />
                                        </div>
                                    </div>
                                    <Link href={`/products/${product.uri}`}>
                                        <a onClick={()=>props.showWishlist(false)}>
                                            <div>
                                                <div className="productName black">{product.name}</div>
                                                <div className="productPrice grey">{productPrice}</div>
                                            </div>
                                        </a>
                                    </Link>
                                    {/* <div className="productDetails grey">{product.excerpt}</div> */}
                                    {/* <button className="btn btnSecondary anoRegular font16">Add to cart</button> */}
                                </div>
                    )
                })}
            </div>
            <style jsx>{`
                .allLikedProducts{
                    display:block;
                    margin-right:0px;
                    flex-wrap: wrap;
                }
                .allLikedProducts, .productsHavingGiftBox{
                    display:flex;
                    flex-wrap: wrap;
                } 
                .likedProduct{
                    width:50%;
                    padding-right:24.5px;
                    margin-bottom:3.2rem;
                }
                .likedProduct button{
                    width:100%;
                }
                .productImg, .productName{
                    margin-bottom:0.8rem;
                }
                .favIcon{
                    position:absolute;
                    top:8px;
                    right:8px;
                }
                .productDetails,.productPrice{
                    margin-bottom:2.4rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .likedProduct{
                        width:100%;
                        padding-right:0px;
                        margin-bottom:3.2rem;
                    }
                }
            `}</style> 
        </>  
    )
}
function mapStateToProps({selection,cache}){
    return {selection,cache}
}
export default connect(mapStateToProps,{showWishlist})(LikedProducts)