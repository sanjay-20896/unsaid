import Layout from "./layout";
import { connect } from 'react-redux';
import {MOBILE_BREAKPOINT,TOKEN_VAR_NAME,BRAND, SITENAME,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,SINGLE_VIEW_PRODUCT_INITIAL_NUMBER,GRID_VIEW_PRODUCT_INITIAL_NUMBER} from '../config'
import {getNestedObject,getCollectionBasedProducts,getCategoryBasedProducts,getFilterData,getPriceAsNumberBasedOnSelection,getPriceBasedOnSelection,getCuratedProducts,getCuratedCategoryProducts,getCuratedCollectionProducts,getProductsfromLowToHigh,getProductsFromHighToLow,getDynamicMenuAndFooterInfo,getCuratedPersonalisedProducts,getplpCuratedProducts} from '../functions'
import ListOfProducts from './listOfProducts'
import FilterSection from './filterSection'
import React,{useEffect,useRef,useState} from 'react'
import { useRouter } from "next/router";
import {priceRange,newSortBy,newSortBy1_en,newSortBy1_fr} from '../data/productListingData'
import GridViewProduct from './gridViewProductDynamic'
import SingleProduct from './product'
import SEO from './SearchEngineOptimisation';
import { viewItemList } from '../gtmFunctions';
import useTranslation from 'next-translate/useTranslation'
function PlpComponent(props){
    const {t}=useTranslation('common');
    const router=useRouter();
    const isInitialMount = useRef(true);
    let matching=router.query["matching"]
    const [device, setDevice] = useState("");
    const [gridView, setGridView] = useState(true)
    const [filterSticky, setFilterSticky] = useState(false)
    const [filteredProducts,setFilteredProducts]=useState(null);
    const [selectedPriceRangeIndex,setSelectedPriceRangeIndex]=useState(null);
    const [selectedSortValueIndex,setSelectedSortValueIndex]=useState(0);
    const [exploreMore, setExploreMore] = useState(false);
    const [hideFilter, setHideFilter] = useState(false);
    const [selectedPriceLists,setSelectedPriceLists] = useState([])
    const [preferredMetal,setPreferredMetal]=useState(null)
    let selectedPriceRangeProducts=[]
    const filterRef=useRef();
    const pageContent=useRef();
    let newSortBy1 = newSortBy1_en;
    if(router.locale==="fr") newSortBy1=newSortBy1_fr
    let products=filteredProducts || props.products
    // if(props.filterValue==="personalised-gifts"){
    //     products=products.sort((a,b)=>{
    //         let valA=parseInt(a["product_personalised_order_value"])
    //         let valB=parseInt(b["product_personalised_order_value"])
    //         return valA - valB
    //     })
    // }
    if(!!matching){
        products=products.filter(p=>{
            return p.uri!==matching
        })
    }
    let productList=null;
    function getDefaultColorSwatch(){
        if(props.mainFilterType=="materials"){
            return props.name
        }else{

                return preferredMetal  
        } 
           
    }
    useEffect(() => {
        if(props.mainFilterType=="materials"){
            localStorage.setItem("preferredMetalChoice","");
        }else{
            if(!!props.cookieConsent.functional){
                let metalColorChoice=localStorage.getItem("preferredMetalChoice");
                if(!!metalColorChoice){
                    setPreferredMetal(metalColorChoice)
                }
            }
        }
    },[])
    // console.log(preferredMetal)
    let defaultColorSwatch=getDefaultColorSwatch() 
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
        products=selectedPriceRangeProducts
    }else{
        products=products
    }

    // if(props.filterValue==="personalised-gifts"){
    //     products=products.sort((a,b)=>{
    //         return b.product_personalised_order_value - a.product_personalised_order_value
    //     })
    // }else{
    //     products=products
    // }
    if(props.mainFilterType=="categories"){
        if(selectedSortValueIndex==0){
            if(props.filterValue=="personalised-gifts") productList=getplpCuratedProducts(products,"product_personalised_order_value")
            else if (props.filterValue=="summer-edit")productList=getplpCuratedProducts(products,"product_summer_edit_order_value")
            else productList=getplpCuratedProducts(products,"product_order_in_catalog_category_value")
        }else if(selectedSortValueIndex==1){
            productList=getProductsfromLowToHigh(products,props.selection)
        }else{
            productList=getProductsFromHighToLow(products,props.selection)
        }
    }else if(props.mainFilterType=="collection"){
        if(selectedSortValueIndex==0){
            productList=getplpCuratedProducts(products)
        }else if(selectedSortValueIndex==1){
            productList=getProductsfromLowToHigh(products,props.selection)
        }else{
            productList=getProductsFromHighToLow(products,props.selection)
        }
    }else if(props.mainFilterType=="materials"){
        if(selectedSortValueIndex==0){
            productList=getplpCuratedProducts(products,"product_order_in_catalog_materials_value")
        }else if(selectedSortValueIndex==1){
            productList=getProductsfromLowToHigh(products,props.selection)
        }else{
            productList=getProductsFromHighToLow(products,props.selection)
        }
    }else if(props.mainFilterType=="gemstones"){
        if(selectedSortValueIndex==0){
            productList=getplpCuratedProducts(products,"product_order_in_catalog_gemstones_value")

        }else if(selectedSortValueIndex==1){
            productList=getProductsfromLowToHigh(products,props.selection)
        }else{
            productList=getProductsFromHighToLow(products,props.selection)
        }
    }else if(props.mainFilterType=="style"){
        if(selectedSortValueIndex==0){
            productList=getplpCuratedProducts(products,"product_order_in_catalog_style_value")
        }else if(selectedSortValueIndex==1){
            productList=getProductsfromLowToHigh(products,props.selection)
        }else{
            productList=getProductsFromHighToLow(products,props.selection)
        }        
    }else if(props.mainFilterType=="gifts"){
        if(selectedSortValueIndex==0){
            productList=getplpCuratedProducts(products,"product_order_in_catalog_gifts_value")
        }else if(selectedSortValueIndex==1){
            productList=getProductsfromLowToHigh(products,props.selection)
        }else{
            productList=getProductsFromHighToLow(products,props.selection)
        }  
    }else{
            productList=null;
    }
    function scrollHandler() {
        if(window.innerWidth < MOBILE_BREAKPOINT){
            setDevice("mobile");
            if(filterRef.current.getBoundingClientRect().top - 8 <= 0 && pageContent.current.getBoundingClientRect().bottom < 0){
                setHideFilter(true)
            }else if((filterRef.current.getBoundingClientRect().top) - 8 <= 0 && pageContent.current.getBoundingClientRect().bottom > 0){
                setFilterSticky(true)
                setHideFilter(false)
            }else{
                setFilterSticky(false)
            }
        } else {
            setDevice("desktop");
            if(filterRef.current.getBoundingClientRect().top - 8 <= 0 && pageContent.current.getBoundingClientRect().bottom < 0){
                setHideFilter(true)
            }else if((filterRef.current.getBoundingClientRect().top) - 8 <= 0 && pageContent.current.getBoundingClientRect().bottom > 0){
                setFilterSticky(true)
                setHideFilter(false)
            }else{
                setFilterSticky(false)
            }
        }
    }
    useEffect(() => {
        url=window.location.href
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);
    useEffect(()=>{
        viewItemList(products,`${props.name} | Product listing page`)
    },[])

    useEffect(() => {
        function resizeHandler(){
            if(window.innerWidth>MOBILE_BREAKPOINT){
                setGridView(true)
            }
        }
        window.addEventListener("resize", resizeHandler, true);
        return () => {
            window.removeEventListener("resize", resizeHandler, true);
        };
    }, []);
    
    let filter=Array.isArray(props.filter)? props.filter:[];
    const plpFilterArray=getFilterData(filter,router.locale);
    let url=""
    let title=`${t('selectionOfPreciousPart1')} ${props.filterValue} ${props.mainFilterType} ${t('selectionOfPreciousPart2')} | ${BRAND}`;
    let description=t('plpSeoDesc')
    let seoImage=`/images/logoPic.png`
    const length = exploreMore?productList.length:SINGLE_VIEW_PRODUCT_INITIAL_NUMBER
    const length2 = exploreMore?productList.length:GRID_VIEW_PRODUCT_INITIAL_NUMBER
    let giftHeading=`${t('matchingPieceGiftPart1')} ${props.name} ${t('matchingPieceGiftPart2')}`
    let giftDescription=`Pssst, did you know that you can add two pieces in the same gift box? This is an exclusive Unsaid offer, and works for most of the pieces from one and the same collection.`
    let personalisationHeading;
    let personalisationText;
    if(props.filterValue==="personalised-gifts"){
        personalisationHeading=t('jewelsBetterWhenEngraved')
        personalisationText=`<p>${t('personalGiftingMsg')}</p> </br> <p>${t('characters18Available')}<p>`
    }else if(props.filterValue==="summer-edit"){
        personalisationHeading=`${t('hoopsPart1')}: <i>${t('hoopsPart2')}</i>`
        personalisationText=t('plpHeaderSummerEditDesc')
    }
    return (
       
        <>
        <SEO title={title} description={description} image={seoImage}/>
        <Layout commonData={props.commonProps.commonData} showNav={"yes"} noCartTextAnimation={!!matching} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            {!!matching && 
                <div className="gifting alignCenter paddedContent">
                    <div className="canelaThin font40 text1">{giftHeading}</div>
                    {/* <div  className="canelaThin font24 text2 ">{giftDescription}</div> */}
                </div>
            }
            {!!personalisationHeading && !!personalisationText &&
                <div className="gifting alignCenter paddedContent">
                    <div className="canelaThin font40 text1" dangerouslySetInnerHTML={{__html: personalisationHeading}}></div>
                    <div  className="canelaThin font24 text2 " dangerouslySetInnerHTML={{__html: personalisationText}}></div>
                </div>
            }
            <div ref={filterRef} className={`filterSection paddedContent ${hideFilter?"hideFilter":""}`} >
                <FilterSection 
                    onclick={()=>setGridView(!gridView)}
                    mainHeading={`${props.name}`}
                    subHeading={`(${products.length})`}
                    priceRange={priceRange} 
                    selectedPriceRangeIndex={selectedPriceRangeIndex}
                    setSelectedPriceRangeIndex={setSelectedPriceRangeIndex}
                    selectedSortValueIndex={selectedSortValueIndex}
                    setSelectedSortValueIndex={setSelectedSortValueIndex}
                    device={device}
                    sortBy={newSortBy1}
                    filterData={plpFilterArray}
                    filterFixed={filterSticky}
                    dynamic={true}
                    static={true}
                    filteredProducts={filteredProducts}
                    setFilteredProducts={setFilteredProducts}
                    filterType={props.mainFilterType}
                    filterValue={props.filterValue}
                    id={props.id}
                    name={props.name}
                    productList={products}
                    selectedPriceLists={selectedPriceLists}
                    setSelectedPriceLists={setSelectedPriceLists}
                    preferredMetal={preferredMetal}
                    setPreferredMetal={setPreferredMetal}
                />
            </div>
            {(selectedSortValueIndex == 0 || selectedSortValueIndex == 1 || selectedSortValueIndex == 2)?
                <div ref={pageContent} className="standardPaddingBottom">
                {gridView ?
                    <>
                        <div className="gridView paddedContent">
                            {productList.map((product,index)=>{
                                    // console.log(index)
                                    let productPrice=getPriceBasedOnSelection(product,props.selection)
                                    // console.log(product,index)
                                    return(
                                    <div className="singleProductGrid" key={product.sku}>
                                        {<GridViewProduct showF1={true} product={product}  selectedColor={defaultColorSwatch} colors={true} colorSize={"2rem"} device={props.device}    productName={product.name}  productPrice={productPrice?productPrice:product.price}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>}
                                    </div>
                                    )
                            })}
                        </div>   
                        {/* {!exploreMore && productList.length>GRID_VIEW_PRODUCT_INITIAL_NUMBER &&
                            <ShowMore 
                                onclick={()=>setExploreMore(true)}
                                heading={`Experience the full ${props.name} collection`}
                                buttonText={`Unlock more pieces`}
                            />
                        }      */}
                    </>:
                    <>
                        <div className="products">
                            {productList.map((product,index)=>{
                                // console.log(product)
                                let productPrice=getPriceBasedOnSelection(product,props.selection)
                                return(
                                <div className="singleProduct" key={product.sku}>
                                { <SingleProduct showF1={true} product={product} selectedColor={defaultColorSwatch} colors={true} colorSize={"2rem"} device={props.device}    productName={product.name}  productPrice={productPrice?productPrice:product.price}  viewProductSection={`View all ${product.categoryUri}`}  productSectionLink={`/products/${product.uri}`}/>}
                                </div>
                                )
                            })}
                        </div>
                        {/* {!exploreMore && productList.length>SINGLE_VIEW_PRODUCT_INITIAL_NUMBER &&
                            <ShowMore 
                                onclick={()=>setExploreMore(true)}
                                heading={`Experience the full ${props.name} collection`}
                                buttonText={`Unlock more pieces`}
                            />
                        } */}
                    </>
                }
                </div>:
                <div ref={pageContent}>
                    <ListOfProducts 
                        filterFixed={filterSticky} 
                        gridView={gridView} 
                        data={productList}
                        device={device}
                        name={props.name}
                        paddingBottom={true}
                        text1={t('showingMore')}
                        text2={t('products')}
                    />
                </div>
                } 
        </Layout>
        <style jsx>{`
            .gifting{
                padding-top:3.4rem;
                width:100%;
                padding-left:20%;
                padding-right:20%;
            }
            .text2{
               margin-top:2.5rem;
            }
            .hideFilter{
                opacity:0;
                pointer-events:none;
            }
            .productList{
                margin-top:2.4rem;
                padding-bottom:2.4rem;
            }
            .gridView{
                display:flex;
                margin-right:-2.4rem;
                flex-wrap: wrap;
                margin-bottom:${exploreMore?"0px":"0.9rem"};
            }
            .filterSection{
                margin-top:14rem;
                margin-bottom:8rem;
            }
            .singleProductGrid{
                width:33.33%;
                padding-right:2.4rem;
            }
            .singleProductGrid{
                margin-bottom:4.8rem;
            }
            .singleProductGrid:nth-last-child(-n+3) {
                margin-bottom:0rem;
            }
            .productsWrapper{
                padding-bottom:22.4rem;
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
                    margin-top:7.6rem;
                    margin-bottom:5.6rem;
                }
                .productsWrapper{
                    padding-bottom:9.6rem;
                }
                .singleProductGrid{
                    width:50%;
                    padding-right:2rem;
                }
                .gridView{
                    margin-right:-2rem;
                    margin-bottom:${exploreMore?"0px":"4rem"};
                }
                .singleProductGrid{
                    margin-bottom:2.2rem;
                }
                .singleProductGrid:nth-last-child(-n+2) {
                    margin-bottom:0rem;
                }
                .singleProductGrid:nth-child(3n){
                    margin-bottom:2.2rem;
                }
                .gifting{
                   padding-top:9.6rem;
                   padding-bottom:9.6rem;
                   padding-left:5%;
                   padding-right:5%;
                }
            }
            
        `}</style>
           
        </>
    )

}
function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}

export default connect(mapStateToProps,null)(PlpComponent)