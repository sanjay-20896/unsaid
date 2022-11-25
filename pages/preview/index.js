import React from 'react'
import Sanity from '../../sanity1'
import { ECOMMERCE_URI } from '../../branch-specific-config'
import {getDynamicMenuAndFooterInfo,getImageUrl} from '../../functions'
import {trimProductForSingleProduct} from "../../centraAttributeFiltering"
import Home from "../../components/home"
import useTranslation from 'next-translate/useTranslation'
export default function Index(props){
const {t}=useTranslation('common');
return (
  <>
    {props.error &&
      <p>{t('unexpectedError')}</p>
    }
    {!!props.content && !!props.commonProps && 
      <Home {...props}/>
    }
  </>
)
}
export async function getServerSideProps({params,locale}){
  let content=null;
  let query=`*[_id=="homepage_${locale}"]{...,"articleList":LibraryBlock.articlesList[]->}`;
  let commonProps = null
  try{
    let allProducts=null;
    let rawResponse = await fetch(`${ECOMMERCE_URI}/products`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${process.env.centra_secret}`
      },
      body:JSON.stringify({
        "market": "1",
        "pricelist": "all",
        "relatedProducts":true,
        "uri":{
          "uri":"shop",
          "for":[
              "category"
          ]
        },
        "language":`${locale}`
      })
    })
    let data =await rawResponse.json()
    if(rawResponse.status==200){
      allProducts=data.products
    }else{
      allProducts=[]
    }
    content=(await Sanity.fetch(query))
    content=Array.isArray(content) ? content[0] : null
    commonProps=await getDynamicMenuAndFooterInfo(locale)
    let productIdsToFetch = []
    if(content!==null){
      if(Array.isArray(content?.productSection?.product) && content?.productSection?.product?.length>0){
        for(let i=0;i<content.productSection.product.length;i++){
          let uri=content.productSection.product[i].uri
          let product=allProducts.find((p)=>{
            return p.uri==uri
          });
          if(product){
            let fullProduct=trimProductForSingleProduct(product,"Home")
            content.productSection.product[i].product=fullProduct
          }
        }
      }
      for(let i=0;i<content.collectionsSection.collections.length;i++){
        for(let k=0;k<content.collectionsSection.collections[i].productTaging.length;k++){
          let uri=content.collectionsSection.collections[i].productTaging[k].url;
          let taggedProduct=allProducts.find(p=>{
            return p.uri==uri
          })
          
          if(taggedProduct){
            let singleProductItem={}
            singleProductItem.name=taggedProduct.name
            singleProductItem.uri=taggedProduct.uri
            singleProductItem.prices=!!taggedProduct.prices?taggedProduct.prices:{}
            content.collectionsSection.collections[i].productTaging[k].taggedProduct=singleProductItem
          }
        }
        // add product info to mobile hotspot module
        for(let k=0;k<content.collectionsSection.collections[i].productTagingMobile.length;k++){
          // let id=content.collectionsSection.collections[i].productTagingMobile[k].id;
          let uri=content.collectionsSection.collections[i].productTagingMobile[k].url;
          let taggedProduct=allProducts.find(p=>{
            return p.uri==uri
          })
          if(taggedProduct){
            let singleProductItem={}
            singleProductItem.name=taggedProduct.name
            singleProductItem.uri=taggedProduct.uri
            singleProductItem.prices=!!taggedProduct.prices?taggedProduct.prices:{}
            content.collectionsSection.collections[i].productTagingMobile[k].taggedProduct=singleProductItem
          }
        }
      }
    } else {
      // console.log("unable to fetch CMS Data")
    }
    return{
        props:{content,commonProps}
    }
    }catch(err){
      // console.log("************error************",err)
      return{ props:{error:true} }
    } 
}