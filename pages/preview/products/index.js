
import { ECOMMERCE_URI } from '../../../branch-specific-config';
import React from 'react'
import {getDynamicMenuAndFooterInfo} from "../../../functions"
import AllProductsPage from '../../../components/AllProductsPage';
import {trimProductsFromArray,trimProductsForCollection} from "../../../centraAttributeFiltering"
import useTranslation from 'next-translate/useTranslation'
export default function allProducts(props) {
    const {t}=useTranslation('common');
    return (
        <>
            {props.errors ? 
                <p>{t('unexpectedError')}</p>
                :
                <AllProductsPage {...props}/>
            }
        </>
    )
}
 

export async function getServerSideProps({locale}){
  let products=null;
  let filter=null;
  let errors=false;
  let commonProps;
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
                "uri":"shop",
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
              products,filter,commonProps
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