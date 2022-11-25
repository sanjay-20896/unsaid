import React from 'react'
import { connect } from 'react-redux'
import ProductPage from '../../../components/productPageDynamic'
import {ECOMMERCE_URI} from '../../../branch-specific-config'
import Sanity from '../../../sanity1'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
import {getDynamicMenuAndFooterInfo} from "../../../functions"
import useTranslation from 'next-translate/useTranslation'
function Product(props) {
    const {t}=useTranslation('common');
    return (
        <>
        <div>
            {props.error?
                <div>
                    <p>{t('unexpectedError')}</p>
                    <div>{props.errorMsg}</div>
                </div>
                :
                <ProductPage commonProps={props.commonProps} customized={props.product.customisation_possible} content={props.content} product={props.product} exploreProducts={props.exploreProducts} sizeGuide={props.sizeGuide} inspiration={props.inspiration} sku={props.sku} limitProducts={props.limitProducts} upsellProductList={props.upsellProductList}/>  
            } 
        </div>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(Product)

export async function getServerSideProps({params,locale}){
    let content=null
    let product=null
    let sizeGuide=null
    let inspiration=null
    let uri = params.slug[0]?params.slug[0]:null
    let sku = params.slug[1]?params.slug[1]:null   
    let commonProps;
    try{
        if(uri){
            let reqBody = {
                "relatedProducts":true,
                "market":"1",
                "pricelist":"all",
                "uri": {
                    "uri": `${uri}`,
                    "for": [
                    "product"
                    ]
                },
                "language": locale
            }
           
            const rawResponse = await fetch(`${ECOMMERCE_URI}/products`, {
                method: 'POST',
                headers: {
                  'Accept': `*/*`,
                  'Content-Type': 'application/json',
                  'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                  reqBody
                )
            });  
            if(rawResponse.status==200){
                let result = await rawResponse.json()
                // allProducts = result.products[0]
                product=result.products[0]
            } else {
                // console.log("could not fetch product")
                throw "Could not fetch products"
            }
            //fetch size guide
            if(product.size_guide_code){
                // console.log("size code",product.size_guide_code)
                // let sizeCode=product?.size_guide_code.toLowerCase()
                let sizeGuideQuery;
                if(locale=="en"){
                    sizeGuideQuery=`*[_type=="sizeGuide" && category=="${product?.size_guide_code}"]`
                }else{
                    sizeGuideQuery=`*[_type=="sizeGuideFr" && category=="${product?.size_guide_code}"]`
                }
                let sizeGuideResult = await Sanity.fetch(sizeGuideQuery);
                sizeGuide = Array.isArray(sizeGuideResult)? sizeGuideResult[0]:null;
                // console.log('has size guide code')
                // console.log(sizeGuide)
            }
            if(product.collectionUri){
                let inspirationQuery=`*[_type=="collections_${locale}" && centraUri=="${product.collectionUri}"]{"inspiration":collectionInspiration}`
                let inspirationResult = await Sanity.fetch(inspirationQuery)
                inspiration = Array.isArray(inspirationResult) && inspirationResult.length > 0? inspirationResult[0].inspiration:null;
            }
            commonProps=await getDynamicMenuAndFooterInfo(locale);
        } else {
            throw "no uri"
        }
        return{
            props:{
                content:content?content:null,
                product:product?product:null,
                sku:sku?sku:product.sku,
                sizeGuide:sizeGuide?sizeGuide:null,
                inspiration:inspiration?inspiration:null,
                commonProps
            }
        }
    } catch(err){
        console.log(err)
        return{
            props:{
                error:true,
                errorMsg:err
            }
        }
    }
    
}