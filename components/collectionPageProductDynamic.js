import React, { useRef, useState,useEffect } from 'react'
import ThreeStepText from './threeStepText'
import SingleProduct from '../components/product'
import GridViewProduct from '../components/gridViewProductDynamic'
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,SINGLE_VIEW_PRODUCT_INITIAL_NUMBER, GRID_VIEW_PRODUCT_INITIAL_NUMBER} from '../config'
import ShowMore from '../components/showMore'
import FilterSection from '../components/filterSection'
import {getPriceBasedOnSelection,getFilterData,getCategoryBasedProducts,getPriceAsNumberBasedOnSelection,getCuratedProducts,getCuratedCategoryProducts,getCuratedCollectionProducts,getProductsfromLowToHigh,getProductsFromHighToLow,formatPrice} from '../functions'
import { connect } from 'react-redux'
import {priceRange,collectionSortBy,newSortBy1_en,newSortBy1_fr} from './../data/productListingData'
import {setFilterStickyGlobal} from '../redux/actions'
import {viewItemList} from '../gtmFunctions'
import {trimProductsFromArray} from "../centraAttributeFiltering"
import lodashChunk from 'lodash/chunk'
import ShopTheLook from './ShopTheLook'
import useDevice from '../hooks/useDevice'
import { useRouter } from 'next/router'
// import Like from '../components/likeProduct'
function CollectionPageProduct(props) {
    const [gridView, setGridView] = useState(true);
    const [filteredProducts,setFilteredProducts]=useState(null);
    const [selectedPriceRangeIndex,setSelectedPriceRangeIndex]=useState(null);
    const [selectedSortValueIndex,setSelectedSortValueIndex]=useState(0);
    const [exploreMore, setExploreMore] = useState(false)
    const [hideFilter, setHideFilter] = useState(false)
    const [filterSticky, setFilterSticky] = useState(false)
    const [selectedPriceLists,setSelectedPriceLists] = useState([])
    const [selectedMaterial,setPreferredMetal]=useState(null)
    const router = useRouter();
    let newSortBy1 = newSortBy1_en;
    if(router.locale==="fr") newSortBy1=newSortBy1_fr
    let {deviceName} = useDevice();
    let selectedPriceRangeProducts=[]
    let products=filteredProducts || props.products
    if(selectedPriceLists.length>0){
        for(let i=0;i<selectedPriceLists.length;i++){
            let object=products.filter(p=>{
                let price=p.prices?getPriceAsNumberBasedOnSelection(p,props.selection):p.priceAsNumber
                return price >=priceRange[selectedPriceLists[i]].min && price<=priceRange[selectedPriceLists[i]].max
            })
            for(let j=0;j<object.length;j++){
                selectedPriceRangeProducts.push(object[j])
            }
        }
        // console.log(selectedPriceRangeProducts)
        products=selectedPriceRangeProducts
    }else{
        products=products
    }
    useEffect(() => {
        if(props.cookieConsent.functional){
            let metalColorChoice=localStorage.getItem("preferredMetalChoice");
            if(!!metalColorChoice){
                setPreferredMetal(metalColorChoice)
                products=products.filter(p=>{
                    return p.materials_available.includes(metalColorChoice)
                })
            }else{
                setPreferredMetal(null)
            }
        }
    },[])
    let productList=[]
    if(selectedSortValueIndex==0){
        productList=getCuratedProducts(products)
    }else if(selectedSortValueIndex==1){
        productList=getProductsfromLowToHigh(products,props.selection)
    }else{
        productList=getProductsFromHighToLow(products,props.selection)
    }
// console.log(props.cookieConsent)
    useEffect(() => {
        if(props.cookieConsent.functional){
            let metalColorChoice=localStorage.getItem("preferredMetalChoice");
            if(!!metalColorChoice){
                setPreferredMetal(metalColorChoice)
                // products=products.filter(p=>{
                //     return p.materials_available.includes(metalColorChoice)
                // })
            }else{
                setPreferredMetal(null)
            }
        }
        
    },[])
    const filterRef=useRef()
    const pageContent=useRef()
    const mainContent=useRef()
    let filter=Array.isArray(props.filter)? props.filter:[]
    // console.log(filter)
    const filterData=getFilterData(filter,router.locale)
    const length = exploreMore?productList.length:SINGLE_VIEW_PRODUCT_INITIAL_NUMBER
    const length2 = exploreMore?productList.length:GRID_VIEW_PRODUCT_INITIAL_NUMBER
    function scrollHandler() { 
        if(window.innerWidth <= MOBILE_BREAKPOINT){
            if(filterRef?.current?.getBoundingClientRect().top - 8 <= 0 && pageContent?.current?.getBoundingClientRect().bottom <= 100){
                setHideFilter(true)
            }else if(filterRef?.current?.getBoundingClientRect().top - 8 <= 0 && pageContent?.current?.getBoundingClientRect().bottom > 100 ){
                setFilterSticky(true)
                setHideFilter(false)
            }else{
                setFilterSticky(false)
                setHideFilter(false)
            }
        } else {
            if(filterRef?.current?.getBoundingClientRect().top - 8 <= 0 && pageContent?.current?.getBoundingClientRect().bottom <= 100){
                setHideFilter(true)
            }else if(filterRef?.current?.getBoundingClientRect().top - 8 <= 0 && pageContent?.current?.getBoundingClientRect().bottom > 100 ){
                setFilterSticky(true)
                setHideFilter(false)
            }else{
                setFilterSticky(false)
                setHideFilter(false)
            }
        }
    }
    
    useEffect(() => {
        setTimeout(()=>{
            window.addEventListener("scroll", scrollHandler);
        },1500)
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, []);
    useEffect(()=>{
        viewItemList(products,`${props.name} | Collection`)
    },[])
    // console.log(selectedMaterial)
    let splitProductsToDisplay;
    if(deviceName!="mobile") splitProductsToDisplay = lodashChunk(productList, 4);
    else splitProductsToDisplay = lodashChunk(productList, 6);
    let shopTheLookId=-1;
    let shopTheLookItem;
    // console.log("splitProductsToDisplay",splitProductsToDisplay)
    return (
        <>
         <div className="productsWrapper" ref={mainContent}>
            <div className="paddedContent">
                <div className="additionalPaddingMobile">
                    <ThreeStepText smallText={props.mainHeading} largeText={props.subHeading} largerDesc={true} desc={props.description} />
                </div>
                <div ref={filterRef} className={`filterSection ${hideFilter?"hide":""}`}>
                    <FilterSection 
                        onclick={()=>setGridView(!gridView)}
                        mainHeading={`${props.name}`}
                        subHeading={`(${products.length})`}
                        priceRange={priceRange} 
                        selectedPriceRangeIndex={selectedPriceRangeIndex}
                        setSelectedPriceRangeIndex={setSelectedPriceRangeIndex}
                        selectedSortValueIndex={selectedSortValueIndex}
                        setSelectedSortValueIndex={setSelectedSortValueIndex}
                        sortBy={newSortBy1}
                        static={true}
                        filterData={filterData}
                        filteredProducts={filteredProducts}
                        filterFixed={filterSticky}
                        setFilteredProducts={setFilteredProducts}
                        filterType="collection"
                        filterValue={props.currentCollection}
                        id={props.id}
                        productList={products}
                        // selectedPriceRangeIndexArray={selectedPriceRangeIndexArray}
                        selectedPriceLists={selectedPriceLists}
                        setSelectedPriceLists={setSelectedPriceLists}
                        selectedMaterial={selectedMaterial}
                    setPreferredMetal={setPreferredMetal}
                    />
                </div>
            </div>
            {(selectedSortValueIndex == 0 || selectedSortValueIndex==1 || selectedSortValueIndex==2 ) &&
                <>
                <div ref={pageContent}>
                {gridView ?
                    <>
                        {(!!props.shopTheLookDesktop && !!props.shopTheLookMobile) ?
                            <>
                                {deviceName!="mobile" ?
                                    <div className="paddedContent">
                                    {!!splitProductsToDisplay && splitProductsToDisplay.map((productSet,id)=>{
                                        if(!(id%2==0)){
                                            shopTheLookId+=1;
                                            if(shopTheLookId < props?.shopTheLookDesktop.length){
                                                shopTheLookItem=props?.shopTheLookDesktop[shopTheLookId]
                                            }
                                        }
                                        while (productSet.length < 4) {
                                            productSet.push({empty:true})
                                        }
                                        return( 
                                            <>
                                                {id % 2 == 0 ?
                                                    <div className="gridView">
                                                        {productSet.map((product,index)=>{
                                                            let productPrice=getPriceBasedOnSelection(product,props.selection)
                                                            return(
                                                                <>
                                                                    {!product?.empty ?
                                                                        <div className="singleProductGrid" key={`singleProductGrid-${product.product}`}>
                                                                            <GridViewProduct showF1={true} product={product} selectedColor={selectedMaterial!=null && selectedMaterial!=undefined?selectedMaterial:null} colors={true} colorSize={"2rem"} productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                                                                        </div>
                                                                        :
                                                                        <div className="singleProductGrid" key={index}></div>
                                                                    }
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                    :
                                                    <>
                                                        {shopTheLookId < props?.shopTheLookDesktop.length ?
                                                            <div className="shopTheLookSection">
                                                                <ShopTheLook shopTheLookId={shopTheLookId} shopTheLookItem={shopTheLookItem} productSet={productSet} selectedColor={selectedMaterial!=null && selectedMaterial!=undefined?selectedMaterial:null}/>
                                                            </div>
                                                            :
                                                            <div className="gridView">
                                                                {productSet.map((product,index)=>{
                                                                    let productPrice=getPriceBasedOnSelection(product,props.selection)
                                                                    return(
                                                                        <>
                                                                            {!product?.empty ?
                                                                                <div className="singleProductGrid" key={`singleProductGrid-${product.product}`}>
                                                                                    <GridViewProduct showF1={true} product={product} selectedColor={selectedMaterial!=null && selectedMaterial!=undefined?selectedMaterial:null} colors={true} colorSize={"2rem"} productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                                                                                </div>
                                                                                :
                                                                                <div className="singleProductGrid" key={index}></div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>
                                                        }
                                                    </>
                                                }
                                                
                                            </>
                                        )
                                    })}
                                    </div>
                                    :
                                    <div className="">
                                        {!!splitProductsToDisplay && splitProductsToDisplay.map((productSet,id)=>{
                                            if(id < props.shopTheLookMobile.length){
                                                shopTheLookItem=props.shopTheLookMobile[id]
                                            }else{
                                                shopTheLookItem=null
                                            }
                                            return(
                                                <>
                                                    <div className="shopTheLookSection">
                                                        <ShopTheLook shopTheLookId={id} shopTheLookItem={shopTheLookItem} productSet={productSet} selectedColor={selectedMaterial!=null && selectedMaterial!=undefined?selectedMaterial:null}/>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                }
                            </> 
                            :
                                <div className="paddedContent">
                                    {!!splitProductsToDisplay && splitProductsToDisplay.map((productSet,id)=>{
                                        while (productSet.length < 4) {
                                            productSet.push({empty:true})
                                        }
                                        return( 
                                            <>
                                                <div className="gridView">
                                                    {productSet.map((product,index)=>{
                                                        let productPrice=getPriceBasedOnSelection(product,props.selection)
                                                        return(
                                                            <>
                                                                {!product.empty ?
                                                                    <div className="singleProductGrid" key={`singleProductGrid-${product.product}`}>
                                                                        <GridViewProduct showF1={true} product={product} selectedColor={selectedMaterial!=null && selectedMaterial!=undefined?selectedMaterial:null} colors={true} colorSize={"2rem"} productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                                                                    </div>
                                                                    :
                                                                    <div className="singleProductGrid" key={index}></div>
                                                                }
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                        }
                    </>
                    :
                    <>
                        <div className="products">
                            {Array.isArray(productList) && productList.map(product=>{
                                let productPrice=getPriceBasedOnSelection(product,props.selection)
                                // console.log(product)
                                return(
                                    <div className="singleProduct" key={`singleProduct-${product.product}`}>
                                        <SingleProduct product={product} selectedColor={selectedMaterial!=null && selectedMaterial!=undefined?selectedMaterial:null}  colors={true} colorSize={"2rem"}  productName={product.name}  productPrice={productPrice?productPrice:formatPrice(product.price)}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>
                                    </div>
                                )
                            })}
                        </div>
                        {/* {!exploreMore  && productList.length>SINGLE_VIEW_PRODUCT_INITIAL_NUMBER && 
                            <ShowMore 
                                onclick={()=>setExploreMore(true)}
                                heading={`Experience the full  ${props.name} collection`}
                                buttonText={`Load more pieces`}
                            />
                        } */}
                    </>
                }
                 </div>
                </>
            }
         </div> 
         <style jsx>{`
            .productList{
                margin-top:2.4rem;
                padding-bottom:2.4rem;
            }
            .gridView{
                display:flex;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-bottom:${exploreMore?"0px":"0rem"};
            }
            .filterSection{
                margin-top: 11.2rem;
                margin-bottom:6.4rem;
            }
            .singleProductGrid{
                width: calc(25% - 2rem);
            }
            .singleProductGrid{
                margin-bottom:4.8rem;
            }
            .singleProductGrid:nth-last-child(-n+3){
                //margin-bottom:0;
            }
            .productsWrapper{
                padding-bottom:7.6rem;
            }
            .singleProduct{
                margin-bottom:9.6rem;
            }
            .singleProduct:last-child{
                margin-bottom:0rem;
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .singleProduct{
                    margin-bottom:9rem;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .singleProduct{
                    margin-bottom:7rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .singleProduct{
                    margin-bottom:2.8rem;
                }
                .filterSection{
                    margin-top:5.4rem;
                    margin-right: 1.6rem;
                    margin-left: 1.6rem;
                    margin-bottom: 3.2rem;
                }
                .productsWrapper{
                    padding-bottom:2.8rem;
                }
                .singleProductGrid{
                    width:calc(50% - 1.15rem);
                    margin-bottom:2.8rem;
                }
            }
         `}</style>  
        </>
    )
}



function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}

export default connect(mapStateToProps,{setFilterStickyGlobal})(CollectionPageProduct)