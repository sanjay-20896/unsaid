import Sanity from '../../../sanity'
import React from 'react'
import { ECOMMERCE_URI } from '../../../branch-specific-config'
import {getDynamicMenuAndFooterInfo} from "../../../functions"
import {trimProductsForCollection,trimProductForHotspot} from "../../../centraAttributeFiltering"
import CollectionPage from "../../../components/collectionPage"
import useTranslation from 'next-translate/useTranslation'
export default function CollectionsPage(props){
    // console.log("props",props);
    const {t}=useTranslation('common');
    return (
        <>
            {props.error?
                <p>{t('unexpectedError')}</p>
                :
                <CollectionPage {...props}/>
            }
        </>
    )
}

// export async function getStaticPaths({locales}){
//     let paths=[];
//     // let query=`*[_type=="collection"]{"slugParams":slug.current}`
//     // let collections=await Sanity.fetch(query);
//     let query="";
//     for(let i=0;i<locales.length;i++) {
//         if(locales[i]==="fr"){
//             query=`*[_type=="collections_fr"]{"slugParams":slug.current}`
//             let collections=await Sanity.fetch(query);
//             for(let i=0;i<collections.length;i++){
//                 paths.push({params:{slug:collections[i].slugParams},locale:"fr"})
//             }
//         }else{
//             query=`*[_type=="collections_en"]{"slugParams":slug.current}`
//             let collections=await Sanity.fetch(query);
//             for(let i=0;i<collections.length;i++){
//                 paths.push({params:{slug:collections[i].slugParams},locale:"en"})
//             }
//         }
//     }
//     // console.log("paths collection",paths);
//     return{
//         paths,
//         fallback:false
//     }

// }

export async function getServerSideProps({params,locale}){
    let content=null;
    let currentCollection=params.slug;
    let products=[]
    let filter=null;
    let commonProps=null
    try{
        if(currentCollection){
            let allProducts=null;
            let rawResponse = await fetch(`${ECOMMERCE_URI}/products`,{
            method: 'POST',
            headers:{
                'Accept':`*/*`,
                'Content-Type':'application/json',
                'Authorization':`Bearer ${process.env.centra_secret}`
            },
            body:JSON.stringify({
                "market": "1",
                "pricelist": "all",
                "relatedProducts":true,
                "uri":{
                "uri":`shop`,
                "for":[
                    "category"
                    ]
                },
                "language":`${locale}`
            })
            })
            let data = await rawResponse.json();
            if(rawResponse.status==200){
                allProducts=data.products
            }else{
                allProducts=[]
            }
            let query=`*[_type=="collections_${locale}" && slug.current=="${params.slug}"]{...,"exploreMore":exploreMore[]->{exploreMoreAttribute}}`
            content=await Sanity.fetch(query);
            content=Array.isArray(content)? content[0]:null;
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify({
                    "relatedProducts":true,
                    "market": "1",
                    "pricelist": "all",
                    "collections":[parseInt(content.collectionId)],
                    "language":`${locale}`
                })
            })
            if(response.status==200){
                let data=await response.json();
                products=data.products
                products=trimProductsForCollection(products)
                filter=data.filter
                
            } else {
                throw "COLLECTION_PRODUCTS_FETCH_ERROR"
            }
            if(Array.isArray(content?.collectionShopItem?.singleCollectionShopItem)){
                for(let i=0;i<content?.collectionShopItem?.singleCollectionShopItem?.length;i++){
                   
                    let data=content?.collectionShopItem?.singleCollectionShopItem[i]?.productUri;
                    let dropdownProducts=[];
                    for(let j=0;j<data?.length;j++){
                        let obj={};
                        
                        let p=allProducts.find((p)=>{return p.uri===data[j]})
                        if(p){
                            dropdownProducts.push(p)
                        }
                    }
                }
            } 
            if(Array.isArray(content?.shopTheLookDesktop?.shopTheLook)){
                for(let i=0;i<content?.shopTheLookDesktop?.shopTheLook?.length;i++){
                    let data=content?.shopTheLookDesktop?.shopTheLook[i]?.productTaging;
                    for(let j=0;j<data?.length;j++){
                        let p=allProducts.find((p)=>p.uri==data[j]?.url);
                        if(p){
                            data[j].product=trimProductsForCollection([p])
                        }
                    }
                }
            } 
            if(Array.isArray(content?.shopTheLookMobile?.shopTheLook)){
                for(let i=0;i<content?.shopTheLookMobile?.shopTheLook?.length;i++){
                    let data=content?.shopTheLookMobile?.shopTheLook[i]?.productTaging;
                    for(let j=0;j<data?.length;j++){
                        let p=allProducts.find((p)=>p.uri==data[j]?.url);
                        if(p){
                            data[j].product=trimProductsForCollection([p])
                        }
                    }
                }
            }
        }
        commonProps=await getDynamicMenuAndFooterInfo(locale);
        return{
            props:{content, currentCollection, products, filter, commonProps}
        }
    } catch(err){
        // console.log(err);
        return{
            props:{error:true}
        }
    }
}


