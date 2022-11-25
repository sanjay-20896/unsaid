// import {  productListingPageData,plpPageFilterData} from '../data/staticData';
import { connect } from 'react-redux';
import {getDynamicMenuAndFooterInfo} from '../../functions'
import React from 'react'
import {plpPaths,ECOMMERCE_URI,UNSAID_API} from '../../branch-specific-config'
import {trimProductsForCollection} from "../../centraAttributeFiltering"
import PlpComponent from "../../components/PlpComponent";
function plp(props){
    // console.log("plpprops",props);
    // console.log("menuitems",props?.common?.menuItems);
    return(
        <>
            {props.error ?
                <p>Unexpected error</p>
                :
                <PlpComponent {...props}/>
            }
        </>
    )
}
function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}

export default connect(mapStateToProps,null)(plp)


export async function getServerSideProps({params,locale}){
    let products=null;
    let filter=null;
    let productCount=0;
    let slug=params.slug;
    let name=""
    let id="";
    let commonProps=null
    try{
        commonProps=await getDynamicMenuAndFooterInfo(locale);
        let plpData=commonProps.commonData.plpPaths;
        if(slug[0]=="categories"){
            let categoryReqBody={
                "market":"1",
                "pricelist":"all",
                "relatedProducts":true,
                "uri":{
                    "uri":`${slug[1]}`,
                    "for":[
                        "category"
                    ]
                },
            "language":`${locale}`
            }
            let categoryValues=plpData.find(item =>item.filterType=="categories").filterValues;
            let categoryName=categoryValues.find(item =>item.uri==slug[1]).name;
            let categoryId=categoryValues.find(item=>item.uri==slug[1]).id;
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                    categoryReqBody
                )
            })
            if(response.status==200){
                let data=await response.json()
                products=!!data.products && Array.isArray(data.products) && data.products.length > 0 ?data.products:[]
                productCount=data.productCount
                filter=data.filter
                name=categoryName
                id=categoryId;
                products=trimProductsForCollection(products)
            }else{
                throw "could not fetch category products"
            }
        }else if(slug[0]=="collection"){ 
            let collectionValues = plpData.find(item=>item.filterType=="collection").filterValues
            let collectionId = collectionValues.find(item=>item.uri==slug[1]).id
            let collectionName=collectionValues.find(item=>item.uri==slug[1]).name
            let collectionReqBody={
                "market":"1",
                "collections":[collectionId],
                "pricelist":"all",
                "relatedProducts":"true",
                "language":`${locale}`
            }
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                    collectionReqBody
                )
            })
            
            if(response.status==200){
                let data=await response.json()
                products=data.products
                productCount=data.productCount
                filter=data.filter;
                name=collectionName;
                id=collectionId
                products=trimProductsForCollection(products)
            }else{
                throw "could not fetch category products"
            }
        }else if(slug[0]=="materials"){
            let materialValues=plpData.find(item=>item.filterType=="materials").filterValues
            let materialName=materialValues.find(item=>item.uri==slug[1]).name;
            let materialReqBody={
                "relatedProducts":true,
                "market":"1",
                "pricelist":"all",
                "materials_available": [materialName],
                "language":`${locale}`
            }
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                    materialReqBody
                )
            })
            if(response.status==200){
                let data=await response.json();
                products=data.products
                productCount=data.productCount
                filter=data.filter;
                name=materialName;
                products=trimProductsForCollection(products)
            }else{
                throw "could not fetch category products"
            }

        }else if(slug[0]=="gemstones"){
            let gemstoneValues=plpData.find(item=>item.filterType=="gemstones").filterValues
            let gemstoneName=gemstoneValues.find(item=>item.uri==slug[1]).name;
            let gemstoneReqBody={
                "relatedProducts":true,
                "market":"1",
                "pricelist":"all",
                "gemstones_available":[gemstoneName.toString()],
                "language":`${locale}`
            }
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                    gemstoneReqBody
                )
            })
            if(response.status==200){
                let data=await response.json();
                products=data.products
                productCount=data.productCount
                filter=data.filter;
                name=gemstoneName;
                products=trimProductsForCollection(products)
            }else{
                throw "could not fetch category products"
            }
        }else if(slug[0]=="style"){
            let styleValues=plpData.find(item=>item.filterType=="style").filterValues
            let styleName=styleValues.find(item=>item.uri==slug[1]).name;
            let styleReqBody={
                "relatedProducts":true,
                "market":"1",
                "pricelist":"all",
                "product_style":[styleName.toString()],
                "language":`${locale}`
            }
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                    styleReqBody
                )
            })
            if(response.status==200){
                let data=await response.json();
                products=data.products
                productCount=data.productCount
                filter=data.filter;
                name=styleName;
                products=trimProductsForCollection(products)
            }else{
                throw "could not fetch category products" 
            }

        }else if(slug[0]=="gifts"){
            let genderValues=plpData.find(item=>item.filterType=="gifts").filterValues;
            let genderName=genderValues.find(item=>item.uri==slug[1]).name;
            let genderReqBody={
                "relatedProducts":true,
                "market":"1",
                "pricelist":"all",
                "product_gender":[genderName.toString()] ,
                "language":`${locale}`
            }
            let response=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept':`*/*`,
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${process.env.centra_secret}`
                },
                body:JSON.stringify(
                    genderReqBody
                )
            })
            if(response.status==200){
                let data=await response.json();
                products=data.products
                productCount=data.productCount
                filter=data.filter;
                name=genderName;
                products=trimProductsForCollection(products)
            }else{
                throw "could not fetch category products"  
            }
        }else{
            // console.log('invalid slug')
        }
        return{props:{products,id,filter,productCount,name,mainFilterType:slug[0],filterValue:slug[1],commonProps}}
    }catch(err){
        console.log(err)
        return{
            props:{
                error:true 
            }
        }
    }
}

