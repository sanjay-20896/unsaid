import {connect} from 'react-redux'
import {MOBILE_BREAKPOINT} from '../config'
import {useState,useEffect,useRef} from 'react'
import Link from 'next/link'
import {getPriceBasedOnSelection,getProductImage,formatPrice} from '../functions'
import Colors from './colorsDynamic'
import ImageAndTextMenu from './imageAndTextMenu'
import {setPanelThreeData, showExploreMenu} from '../redux/actions'
import LazyImage from './lazyImage'
import useOnScreen from '../hooks/useOnScreen'
import {productImpression} from '../gtmFunctions'
function ProductListItemMenu(props){
    const wrapperRef = useRef(null)
    const [variantProduct,setVariantProduct] = useState(null)
    let hasVariants= props.product && props.product.relatedProducts && Array.isArray(props.product.relatedProducts) && props.product.relatedProducts.length>0? true:false
    let currentProduct = variantProduct || props.product
    let v1 = getProductImage(currentProduct,"v1","standard")
    function mouseEnter(){
        if(props.setPanelThreeOnHover){
            props.setSingleDefaultProduct(false)
            props.setPanelThreeData(<ImageAndTextMenu img={v1} text={currentProduct?.name} link={`/products/${currentProduct?.uri}/${currentProduct?.sku}`} desktopHeight={858} desktopWidth={858} />)
        }
    }
    // function mouseLeave(){
    //     if(props.setPanelThreeOnHover){
    //         let v1Image = getProductImage(props.defaultProduct,"v1","standard")
    //         props.setPanelThreeData(<ImageAndTextMenu img={v1Image} text={props?.defaultProduct?.name} link={`/products/${props?.defaultProduct?.uri}/${props?.defaultProduct?.sku}`} desktopHeight={858} desktopWidth={858}/>)
    //     }
    // }
    useEffect(() => {
        if(!!props?.singleDefaultProduct){
            let v1Image = getProductImage(props.defaultProduct,"v1","standard")
            props.setPanelThreeData(<ImageAndTextMenu img={v1Image} text={props?.defaultProduct?.name} link={`/products/${props?.defaultProduct?.uri}/${props?.defaultProduct?.sku}`} desktopHeight={858} desktopWidth={858} />)
        } 
    },[props?.singleDefaultProduct])
    useEffect(()=>{
        if(props.selectedColor!=null && props.selectedColor!=undefined){
            // console.log("use effect running")
            if(props?.product?.color?.color_text==props.selectedColor){
                // console.log("current selected product")
                // console.log(props.product.color.color_text)
                // console.log(props.selectedColor)
                // console.log(props.product)
                setVariantProduct(null)
                // console.log("variant product selected")
            }else{
                if(props?.product?.product_type_value=="cord"){
                   
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props?.selectedColor && rp?.cord_color?.hex==props?.product?.cord_color?.hex)
                    if(p){
                        // console.log("cord product")
                        // console.log(p?.color?.color_text)
                        // console.log(props.selectedColor)
                        // console.log(p)
                        setVariantProduct(p)
                        // console.log("variant product selected")

                    }
                }else if(props?.product?.customisation_possible=="1"){
                    
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props.selectedColor && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text)
                    if(p){
                        // console.log("customisation possible")
                        // console.log(p?.color?.color_text)
                        // console.log(props.selectedColor)
                        // console.log(p)
                        setVariantProduct(p)
                        // console.log("variant product selected")

                    }
                }else{
                    
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_text==props.selectedColor)
                    if(p){
                        // console.log("normal products")
                        // console.log(p?.color?.color_text)
                        // console.log(props.selectedColor)
                        // console.log(p)
                        setVariantProduct(p)
                        // console.log("variant product selected")

                    }
                }
            }
        }
    },[props.selectedColor])
    function colorClick(color){
        // console.log(color)
        if(color.color_hex_2){
            if(color.color_hex==props?.product?.color?.color_hex && color.color_hex_2==props?.product?.color?.color_hex_2){
                setVariantProduct(null)
            }else{
                if(props?.product?.product_type_value=="cord"){
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex && rp?.color?.color_hex_2==color.color_hex_2 && rp?.cord_color?.hex==props?.product?.cord_color?.hex
                    )
                    if(p)
                        setVariantProduct(p)
                }else if(props.product.customisation_possible=="1"){
                    let p=props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text && rp?.color?.color_hex_2==props?.product?.color?.color_hex_2
                    )
                    if(p)
                        setVariantProduct(p)
                }else{
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color?.color_hex && rp?.color?.color_hex_2==color?.color_hex_2
                        )
                    // console.log(p)
                    if(p)
                        setVariantProduct(p)
                }
            }
        }else{
            if(color?.color_hex==props?.product?.color?.color_hex){
                setVariantProduct(null)
            }else{
                if(props?.product?.product_type_value=="cord"){
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex  && rp?.cord_color?.hex==props?.product?.cord_color?.hex
                    )
                    if(p)
                        setVariantProduct(p)
                }else if(props.product.customisation_possible=="1"){
                    let p=props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex && rp?.number_of_diamonds_text==props.product.number_of_diamonds_text 
                    )
                    if(p)
                        setVariantProduct(p)
                }else{
                   
                    let p= props?.product?.relatedProducts.find(rp=>
                        rp?.color?.color_hex==color.color_hex
                        )
                    if(p)
                        setVariantProduct(p)
                }
            }
        }
    }
    let productUri=`/products/${props.product.uri}/${props.product.sku}` 
    if(variantProduct){
        productUri=`/products/${props.product.uri}/${variantProduct.sku}`
    }
    let v1Thumb = getProductImage(currentProduct,"v1","thumb")
    const isOnScreen = useOnScreen(wrapperRef)
    useEffect(()=>{
        if(isOnScreen){
            productImpression(currentProduct,props.selection,"Single product in dropdown")
        }
    },[isOnScreen,currentProduct])
    return(
        <div key={currentProduct.sku}  ref={wrapperRef} onMouseEnter={()=>mouseEnter()}>
            <div className={`productDetails fadeInAnimationNew ${props.position===1?"firstItem":""}`}>
                <div className="productLeft" key={currentProduct.sku}>
                    <Link href={productUri}><a onClick={()=>props.showExploreMenu(false)}><div className="productName inlineBlock canelaThin font16-notResponsive">{props.product.name}</div></a></Link>
                    <Link href={productUri}><a onClick={()=>props.showExploreMenu(false)}>
                        {props.showExcerpt && props.product.excerpt &&
                            <div className="productContent anoHalfRegular">{props.product.excerpt}</div>
                        }  
                    </a></Link>   
                    <div className="priceAndColor">
                        <div className="productPrice anoRegular">{props.product.prices?getPriceBasedOnSelection(props.product,props.selection):formatPrice(props.product.price)}</div>
                        <div className="colorVariant">
                            {hasVariants && <Colors showColorName={false} colorsSize="small" product={props.product} currentSelectedProduct={currentProduct} colorClick={colorClick}/>}
                        </div>
                    </div>
                </div>
                
                <div className="productRight" key={currentProduct.sku}>
                    <Link href={productUri}><a onClick={()=>props.showExploreMenu(false)}>
                        {!!v1Thumb &&
                            <LazyImage 
                                alt="Unsaid Store Antwerp"
                                originalSrc={v1Thumb}
                                width={200} 
                                height={200} 
                                background={true} 
                            />
                        }
                    </a></Link>   
                </div>
            </div>
            <style jsx>{`
                .productDetails{
                    display:flex;
                }
                .productContent{
                    margin-bottom:0.8rem;
                    letter-spacing:0.5px;
                }
                .searchProductResults .productDetails:last-child{
                    margin-bottom:4.8rem;
                }
                .productLeft{
                    width:77%;
                    padding-right:1.6rem;
                }
                .productName{
                    margin-bottom:0.8rem;
                }
                .productRight{
                    width:23%;
                }
                .productDesc{
                    margin-bottom:1.6rem;
                }
                .priceAndColor{
                    display:flex;
                    align-items: center;
                }
                .productPrice{
                    color:#787878;
                    margin-right:1rem;
                    letter-spacing:0.5px;
                    width: 6rem;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .productPrice{
                        color: #787878;
                    }
                }
            `}</style>
        </div>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,{setPanelThreeData,showExploreMenu})(ProductListItemMenu)