import React, { useState } from 'react'
import ProductListing from '../components/productListingDynamic'
import ShowMore from '../components/showMore'
import {MOBILE_BREAKPOINT} from '../config'
export default function ListOfProducts(props) {
    const [exploreMore, setExploreMore] = useState(false)
    const length = exploreMore?props.data.length:`${props.data.length<3?props.data.length:-1}`;
    return (
        <>
         <div className={`allSets ${props.paddingBottom?"standardPaddingBottom":""} ${props.filterFixed?"filterFixed":""}`}>
            {props.data.map((productList,index)=>{
                return(
                    <div key={index} className="singleSet">
                        <ProductListing showF1={true} gridView={props.gridView} productList={productList} selectedColor={!!props.selectedColor?props.selectedColor:null} device={props.device} linkToPlpPage={props.linkToPlpPage} limit={props.limit}/>
                    </div>
                )
            })} 
            {/* {!exploreMore && length>props.data.length &&
                <ShowMore 
                    onclick={()=>setExploreMore(true)}
                    heading={`${props.text1} ${props && props.name?props.name:"products"} ${props.text2}`}
                    buttonText={`load more pieces`}
                />
            } */}
         </div>   
         <style jsx>{`
            .singleSet{
                margin-bottom:11.2rem;
            }
            .singleSet:nth-child(1){
                margin-top:15rem;
            }
            // .allSets.filterFixed .singleSet:nth-child(1){
            //     margin-top:60.8rem;
            // }
            .singleSet:last-child{
                margin-bottom:0rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .singleSet{
                    margin-bottom:9.6rem;
                }
                .singleSet:nth-child(1){
                    margin-top:10.6rem;
                }
                // .allSets.filterFixed .singleSet:nth-child(1){
                //     margin-top:30.4rem;
                // }
                .allSets{
                    padding-bottom:9.6rem
                }
            }
         `}</style>
        </>
    )
}
