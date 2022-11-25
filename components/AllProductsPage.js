import Layout from './layout'
import {MOBILE_BREAKPOINT,TOKEN_VAR_NAME,BRAND, SITENAME,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,SINGLE_VIEW_PRODUCT_INITIAL_NUMBER,GRID_VIEW_PRODUCT_INITIAL_NUMBER} from '../config';

import React,{useEffect,useRef,useState} from 'react'
import { priceRange,sortBy } from '../data/productListingData';
import {getCategoryBasedProducts,getCollectionBasedProducts,getCuratedProducts,getFilterData,getPriceAsNumberBasedOnSelection,getPriceBasedOnSelection} from '../functions'
import Head from 'next/head';
import ListOfProducts from './listOfProducts';
import FilterSection from './filterSection'
import { connect } from 'react-redux';
import SEO from './SearchEngineOptimisation';
import { viewItemList } from '../gtmFunctions';
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router';

function AllProducts(props){
    const {t}=useTranslation('common')

    // console.log(props.products)
    const [device, setDevice] = useState("");
    const [gridView, setGridView] = useState(true)
    const [filterSticky, setFilterSticky] = useState(false)
    const [filteredProducts,setFilteredProducts]=useState(null);
    const [selectedPriceRangeIndex,setSelectedPriceRangeIndex]=useState(null);
    const [selectedSortValueIndex,setSelectedSortValueIndex]=useState(0);
    const [exploreMore, setExploreMore] = useState(false);
    const [hideFilter, setHideFilter] = useState(false);
    const [selectedPriceLists,setSelectedPriceLists] = useState([])
    const [selectedMaterial,setSelectedMaterial]=useState(null)
    let selectedPriceRangeProducts=[]
    const filterRef=useRef();
    const pageContent=useRef();
    const router = useRouter()
    // let centraProducts=props.products.filter((p)=>{
    //     return p.bundleInfo===props.products.bundleInfo;
    // })
    let products=filteredProducts || props.products
    // if(selectedPriceRangeIndex===null){
    //     products=products
    // }else{
    //     products = products.filter(p=>{
    //         let price=p.prices ?getPriceAsNumberBasedOnSelection(p,props.selection):p.priceAsNumber
    //         return price >= priceRange[selectedPriceRangeIndex].min && price <= priceRange[selectedPriceRangeIndex].max
    //     })
    // }
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
    let productList=null;
    productList=getCategoryBasedProducts(products)
    function scrollHandler() {
        // console.log("top",filterRef.current.getBoundingClientRect().top)
        // console.log("bottom",pageContent.current.getBoundingClientRect().bottom)
        if(window.innerWidth < MOBILE_BREAKPOINT){
            setDevice("mobile");
            if(filterRef.current.getBoundingClientRect().top <= 0 && pageContent.current.getBoundingClientRect().bottom < 0){
                // setFilterSticky(false)
                setHideFilter(true)
            }else if((filterRef.current.getBoundingClientRect().top) <= 0 && pageContent.current.getBoundingClientRect().bottom > 0){
                setFilterSticky(true)
                setHideFilter(false)
            }else{
                setFilterSticky(false)
            }
        } else {
            setDevice("desktop");
            if(filterRef.current.getBoundingClientRect().top <= 0 && pageContent.current.getBoundingClientRect().bottom < 0){
                // setFilterSticky(false)
                setHideFilter(true)
            }else if((filterRef.current.getBoundingClientRect().top) <= 0 && pageContent.current.getBoundingClientRect().bottom > 0){
                setFilterSticky(true)
                setHideFilter(false)
            }else{
                setFilterSticky(false)
            }
        }
        // console.log(filterRef.current.getBoundingClientRect().top,pageContent.current.getBoundingClientRect().bottom);
    }
    useEffect(() => {
        url=window.location.href
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);
    //plp filterdata
    let filter=Array.isArray(props.filter)? props.filter:[];
    const filterData=getFilterData(filter,router.locale);
    // console.log(filterData)

    //seo parameters
    let url=""
    let title=`A selection of products that express your precious memories  | ${BRAND}`;
    let description=`Rings, precious gifts, enagement rings, wedding band, wedding gift, anniversary gift, birthday gift, celebration, gifts, memories, luxury gifts, gifting, fine jewelry`
    let seoImage=`/images/logoPic.png`
    const length = exploreMore?productList.length:SINGLE_VIEW_PRODUCT_INITIAL_NUMBER
    const length2 = exploreMore?productList.length:GRID_VIEW_PRODUCT_INITIAL_NUMBER
    useEffect(()=>{
        viewItemList(products,"All Products")
    },[])
    // console.log("product list",productList)
    return(
        <>
        {/* <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} key="title"/>
            <meta property="og:description" content={description} key="description"/>
            <meta property="og:type" content="website" key="type"/>
            <meta property="og:image" content={seoImage} key="image"/>
            <meta property="og:site_name" content={SITENAME} key="siteName"/>
            <meta property="og:url" content={url} key="url"/>
        </Head> */}
        <SEO title={title} description={description} image={seoImage}/>
        <Layout commonData={props.commonProps.commonData} showNav={"yes"}>
        <div ref={filterRef} className={`filterSection paddedContent ${hideFilter?"hideFilter":""}`} >
                <FilterSection 
                    onclick={()=>setGridView(!gridView)}
                    mainHeading={!!props.name? props.name:`${t('allProducts')}`}
                    subHeading={`(${products.length})`}
                    priceRange={priceRange} 
                    selectedPriceRangeIndex={selectedPriceRangeIndex}
                    setSelectedPriceRangeIndex={setSelectedPriceRangeIndex}
                    selectedSortValueIndex={selectedSortValueIndex}
                    setSelectedSortValueIndex={setSelectedSortValueIndex}
                    device={device}
                    sortBy={sortBy}
                    filterData={filterData}
                    filterFixed={filterSticky}
                    dynamic={true}
                    static={true}
                    filteredProducts={filteredProducts}
                    setFilteredProducts={setFilteredProducts}
                    filterType={props.mainFilterType?props.mainFilterType:"categories"}
                    filterValue={props.filterValue}
                    hideSortBy={true}
                    id={props.id}
                    name={`${t('allProducts')}`}
                    productList={products}
                    selectedPriceLists={selectedPriceLists}
                    setSelectedPriceLists={setSelectedPriceLists}
                    // selectedMaterial={selectedMaterial}
                    // setSelectedMaterial={setSelectedMaterial}
                    preferredMetal={selectedMaterial}
                    setPreferredMetal={setSelectedMaterial}
                />
            </div>
                <div ref={pageContent}>
                    <ListOfProducts 
                        filterFixed={filterSticky} 
                        gridView={gridView} 
                        data={productList}
                        device={device}
                        name={"all"}
                        paddingBottom={true}
                        text1={t('showMore')}
                        text2={`products`}
                        linkToPlpPage={true}
                        selectedColor={selectedMaterial}
                        limit={props.limit}
                        
                    />
                </div>
            
        </Layout>
        <style jsx>{`
            .gifting{
                padding-top:22.4rem;
                padding-bottom:22.4rem;
                width:100%;
                padding-left:20%;
                padding-right:20%;
            }
            .text1{
                padding-bottom:2.5rem;
            }
            .text2{
               
            }
            .filterSection{
                margin-top:32rem;
            }
            .hideFilter{
                display:none;
            }
            .productList{
                margin-top:2.4rem;
                padding-bottom:2.4rem;
            }
            .gridView{
                display:flex;
                margin-right:-2.4rem;
                flex-wrap: wrap;
                margin-bottom:${exploreMore?"0px":"11.2rem"};
            }
            .filterSection{
                margin-top:9.6rem;
                margin-bottom:5.6rem;
            }
            .singleProductGrid{
                width:33.33%;
                padding-right:2.4rem;
            }
            .singleProductGrid{
                margin-bottom:4.8rem;
            }
            .singleProductGrid:last-child{
                margin-bottom:0;
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
                    margin-top:16rem;
                }
                .productsWrapper{
                    padding-bottom:9.6rem;
                }
                .singleProductGrid{
                    width:50%;
                    padding-right:2.3rem;
                }
                .gridView{
                    margin-right:-2.3rem;
                }
                .singleProductGrid{
                    margin-bottom:1.6rem;
                }
                .singleProductGrid:last-child{
                    margin-bottom:0rem;
                }
                .singleProductGrid:nth-child(3n){
                    margin-bottom:0rem;
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
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{})(AllProducts);