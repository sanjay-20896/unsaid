import { connect } from 'react-redux';
import {getDynamicMenuAndFooterInfo} from '../../functions'
import React from 'react'
import {plpPaths,ECOMMERCE_URI,UNSAID_API} from '../../branch-specific-config'
import {trimProductsForCollection} from "../../centraAttributeFiltering"
import AllProductsPage from '../../components/AllProductsPage';

function Christmas(props){
    // console.log("plpprops",props);
    // console.log("menuitems",props?.common?.menuItems);
    return(
        <>
           {props.errors ? 
                <p>{t('unexpectedError')}</p>
                :
                <AllProductsPage {...props}/>
            }
        </>
    )
}
function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}

export default connect(mapStateToProps,null)(Christmas)


// export async function getStaticProps({locale}){
//     let products=null;
//     let filter=null;
//     let productCount=0;
//     // let slug=params.slug;
//     let name=""
//     let id="";
//     let commonProps=null;
//     try{
//         commonProps=await getDynamicMenuAndFooterInfo(locale);
//         let requestBody={
//             "market":"1",
//             "pricelist":"all",
//             "relatedProducts":true,
//             "uri":{
//                 "uri":`christmas`,
//                 "for":[
//                     "category"
//                 ]
//             },
//         "language":`${locale}`
//         }
//         let response=await fetch(`${ECOMMERCE_URI}/products`,{
//             method:'POST',
//             headers:{
//                 'Accept':`*/*`,
//                 'Content-Type':'application/json',
//                 'Authorization':`Bearer ${process.env.centra_secret}`
//             },
//             body:JSON.stringify(
//                 requestBody
//             )
//         })
//         let christmasProducts=await response.json();
//         if(response.status==200){
//             products=christmasProducts.products;
//             filter=christmasProducts.filter;
//             name="Christmas",
//             id=31;
//             productCount=christmasProducts.productCount;
//             products=trimProductsForCollection(products)
//         }else{
//             throw "could not fetch category products"
//         }
//         return {
//             props:{
//                 commonProps,id,productCount,products,name,mainFilterType:"categories",filterValue:"Christmas",filter
//             }
//         }
//     }catch(err){
//         console.log(err);
//         return {props:{
//             error:true
//         }}

//     }
// }



export async function getStaticProps({locale}){
    let products=null;
    let filter=null;
    let errors=false;
    let commonProps;
    let id=31
    try{
        let response=await fetch(`${ECOMMERCE_URI}/products`,{
            method:'POST',
            headers:{
                'Accept':`*/*`,
                'Content-Type':'application/json',
                'Authorization':`Bearer ${process.env.centra_secret}`
            },
            body:JSON.stringify({
              "market":"1",
              "pricelist":"all",
              "relatedProducts":true,
              "uri":{
                  "uri":"christmas",
                  "for":[
                      "category"
                  ]
              },
              "language":`${locale}`
            })
        })
        if(response.status==200){
            let data=await response.json()
            products=data.products;
            products=trimProductsForCollection(products)
          //   products=trimProductsFromArray(products,"collection")
            filter=data.filter
        }else{
            // console.log("product fetch unsuceessful")
          //   let errInfo=await response.json()
            // console.log("status of response",response.status)
            // console.log(errInfo)
        }
        commonProps=await getDynamicMenuAndFooterInfo(locale);
        return{
            props:{
                products,id:31,filter,productCount:products.length,limit:false,name:"Christmas",mainFilterType:"categories",filterValue:"christmas",commonProps,
            }
        }
    }catch(err){
        // console.log(err);
        errors=true
        return{
            props:{
                errors
            }
        }
  
    }
  }