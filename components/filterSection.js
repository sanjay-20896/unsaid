import React, {useEffect, useState, useRef} from 'react'
import {MOBILE_BREAKPOINT,TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI } from '../branch-specific-config';
import { connect } from 'react-redux';
import {plpPaths} from '../branch-specific-config'
import { useRouter } from 'next/router';
import {getQueryVariable,getFilterData} from '../functions';
import {preventBodyScroll} from '../redux/actions'
import FilterBar from './filterBar'
import MobileFilter from './mobileFilter'
import { isFunction } from 'lodash';
import useTranslation from 'next-translate/useTranslation'

function FilterSection(props) {
    const {t}=useTranslation('common')
    const isInitialMount = useRef(true);
    const [filterShow, setFilterShow] = useState(false)
    const [activeFilters,setActiveFilters] = useState({})
    const [filterData,setFilterData]=useState(null);
    let centraFiltersData=filterData || props.filterData 
    const router=useRouter();
    function applyFilter(listItem,shouldApply){
        if(!shouldApply)
            return
        if(listItem.query=="material"){
            localStorage.setItem("preferredMetalChoice",listItem.uri);
        }
        let oldParamValue = getQueryVariable(listItem.query) //necklace
        if(!!oldParamValue){
            let originalOldParamValue=oldParamValue
            oldParamValue=decodeURI(oldParamValue)
            let urlParamsArray = oldParamValue.split(",")
            let i = urlParamsArray.findIndex(val=>val==listItem.uri) // 0
            if(i>-1){
                urlParamsArray.splice(i,1)
            }else{
                urlParamsArray.push(listItem.uri)
            }
            let newParamVal = urlParamsArray.join(",")
            let path=newParamVal==""?`${router.asPath.replace(`${listItem.query}=${originalOldParamValue}`,"")}` :`${router.asPath.replace(`${listItem.query}=${originalOldParamValue}`,`${listItem.query}=${newParamVal}`)}`
            // console.log(path.split("?")[1])
            if(path.split("?")[1]=="")
                path=path.replace("?","")
            if(path.split("?")[1]=="&")
                path=path.replace("&","")
            if(path.split("&")[1]=="")
                path=path.replace("&","")
            if(path.split("?")[2]=="&")
                path=path.replace("&","")
            if(path.split("?")[1]=="&")
                path=path.replace("&","")
            if(!path.split("?")[1])
                path=path.replace("?","")
            if(path.split("?&").length==2)
                path=path.replace("?&","?")
            if(path.split("?")[1] && path.split("?")[1].toString().endsWith("&")){
               path=path.slice(0,-1)
           }
            router.push(path,null,{shallow:true})
        }else{
            let path=router.asPath.includes("?")?`${router.asPath}&${listItem.query}=${listItem.uri}`:`${router.asPath}?${listItem.query}=${listItem.uri}`
            router.push(path,null,{shallow:true})
        }
       let newActiveFilters = JSON.parse(JSON.stringify(activeFilters))
        if(Array.isArray(newActiveFilters[listItem.query])){
            let index=newActiveFilters[listItem.query].findIndex(item=>item==listItem.uri)
            if(index>-1){
                newActiveFilters[listItem.query].splice(index,1)
            }else{
                newActiveFilters[listItem.query].push(`${listItem.uri}`);
            }
        }else{
            newActiveFilters[listItem.query]=[]
            newActiveFilters[listItem.query].push(`${listItem.uri}`);
        }
        // console.log(newActiveFilters)
        setActiveFilters(newActiveFilters)

    }
    function areFiltersApplied(){
        for(let i = 0;i<Object.keys(activeFilters).length;i++){
            let val = activeFilters[Object.keys(activeFilters)[i]]
            if(Array.isArray(val) && val.length > 0)
                return true
        }
        return false
    }
    async function fetchActiveFilterProducts(){
        // console.log("fetch active filtered products",activeFilters)
       let collectionIds=[];
       let categoryIds=[];
       let productStyle = Array.isArray(activeFilters["style"]) && activeFilters["style"].length > 0 ? activeFilters["style"]:[]
       let gemstone=Array.isArray(activeFilters["gemstones"]) && activeFilters["gemstones"].length>0?activeFilters["gemstones"]:[]
    //    console.log("gemstone",gemstone)
       let material=Array.isArray(activeFilters["material"]) && activeFilters["material"].length>0?activeFilters["material"]:[]
    //    console.log("material",material)
    //    console.log("active material",material)
       let collection=Array.isArray(activeFilters["collection"]) ? activeFilters["collection"]:[]
       let gender=Array.isArray(activeFilters["gender"]) && activeFilters["gender"].length>0? activeFilters["gender"]:[]
       let customisation_possible=Array.isArray(activeFilters["customisation_possible"]) && activeFilters["customisation_possible"].length>0 ?activeFilters["customisation_possible"][0]:""
       let engraving_possible=Array.isArray(activeFilters["engraving_possible"]) && activeFilters["engraving_possible"].length>0 ? activeFilters["engraving_possible"][0]:""
       
        categoryIds =   activeFilters["category"]?.length > 0
                        ?
                            props?.common?.plpPaths?.find(item=>item.filterType=="categories").filterValues.filter(c=>activeFilters["category"].includes(c.uri)).map(c=>c.id)
                        :
                            []
       collectionIds =  activeFilters["collection"]?.length > 0
                        ?
                        props?.common?.plpPaths?.find(item=>item.filterType=="collection").filterValues.filter(c=>activeFilters["collection"].includes(c.centraUri)).map(c=>c.id)
                        :
                            []
        // console.log("active filters",activeFilters["collection"],collectionIds)
       let products=null;
       let filter=null;
       let customRequest={
           "relatedProducts":true,
           "language":`${router.locale}`
       }

       if(engraving_possible){
           customRequest["engraving_possible"] = ["1"]
       }
       if(customisation_possible){
            customRequest["customisation_possible"] = ["1"]
       }
       if(categoryIds.length > 0)
        customRequest["categories"]=categoryIds
        if(collectionIds.length > 0)
        customRequest["collections"]=collectionIds
        if(productStyle.length>0)
        customRequest["product_style"]=productStyle
        if(gender.length>0)
        customRequest["product_gender"]=gender
        if(gemstone.length>0)
        customRequest["gemstones_available"]=gemstone
        if(material.length>0)
        customRequest["materials_available"]=material
    //    console.log("collection ids",collectionIds)
       if(props.filterType=="collection"){
        collectionIds.push(props.id)
        customRequest["collections"]=collectionIds
       }else if(props.filterType=="categories" && props.filterValue){
        categoryIds.push(props.id)
        customRequest["categories"]=categoryIds
       }else if(props.filterType=="materials"){
        material.push(props.name)
        customRequest["materials_available"] = material
       }else if(props.filterType=="gemstones"){
        gemstone.push(props.name)
        customRequest["gemstones_available"]=gemstone
       }else if(props.filterType=="style"){
        productStyle.push(props.name)
        customRequest["product_style"]=productStyle
       }else if(props.filterType=="gifts"){
        gender.push(props.name)
        customRequest["product_gender"]=gender
       }else{
        customRequest["collections"]=collectionIds
       }
    //    console.log("product fetching body",customRequest)
       let token=localStorage.getItem(TOKEN_VAR_NAME)
       let response=await fetch(`${ECOMMERCE_URI}/products`,{
           method:'POST',
           headers:{
            'Accept': `*/*; api-token: ${token}`,
            'Content-Type':'application/json',
           },
           body:JSON.stringify(
               customRequest
           )
       })
       if(response.status==200){
           let data=await response.json();
           products=data.products;
        //    console.log("fetched products",products)
           filter=getFilterData(data.filter)
           props.setFilteredProducts(products);
           setFilterData(filter)
       }else{
        //    console.log("invalid product request",response.status);
           let errBody=await response.json();
        //    console.log(errBody)
       }
    }
    function setActiveFiltersBasedOnUrlParams(){
        let category=!!getQueryVariable("category")?decodeURI(getQueryVariable("category")).split(','):"";
        let collection=!!getQueryVariable("collection")?decodeURI(getQueryVariable("collection")).split(','):"";
        let gender=!!getQueryVariable("gender")?decodeURI(getQueryVariable("gender")).split(','):"";
        let gemstones=!!getQueryVariable("gemstones")?decodeURI(getQueryVariable("gemstones")).split(','):"";
        let material=!!getQueryVariable("material")?decodeURI(getQueryVariable("material")).split(","):"";
        let customisation_possible=!!getQueryVariable("customisation_possible")?decodeURI(getQueryVariable("customisation_possible")):"";
        let engraving_possible=!!getQueryVariable("engraving_possible")?decodeURI(getQueryVariable("engraving_possible")):"";
        let style=!!getQueryVariable("style")?decodeURI(getQueryVariable("style")).split(","):"";
        // let filterQueryParams=router.query;
        // let category=filterQueryParams['category'] ? filterQueryParams['category'].split(','):""; 
        // let collection=filterQueryParams['collection'] ? filterQueryParams['collection'].split(',') :"";

        // let gender=filterQueryParams['gender']  ? filterQueryParams['gender'].split(','):""
        // let gemstone=filterQueryParams['gemstone'] ? filterQueryParams['gemstone'].split(','):""
        // let material=filterQueryParams['material'] ? filterQueryParams['material'].split(','):""
        // let customisation_possible=filterQueryParams['customisation_possible'] ? filterQueryParams['customisation_possible']:"";
        // let engraving_possible=filterQueryParams['engraving_possible'] ? filterQueryParams['engraving_possible']: "";
        // let style=filterQueryParams['style']?filterQueryParams['style'].split(','):"";
        let urlFilters={category,collection,gender,material,customisation_possible,engraving_possible,gemstones,style}
        // console.log("urlFilters",urlFilters)
        setActiveFilters(urlFilters)
        // activeFilters=JSON.parse(JSON.stringify(urlFilters));
        // fetchActiveFilterProducts()
        
        // console.log("creating activeFilters",activeFilters)
    }
    // console.log("activeFilters",activeFilters)
    useEffect(()=>{
        // console.log('active filters change',activeFilters)
        if(areFiltersApplied()){
            fetchActiveFilterProducts()
        }else{
            props.setFilteredProducts(null);
            setFilterData(null)
        } 
    },[activeFilters,props?.selection?.selection?.location?.country])
    useEffect(()=>{
        setActiveFiltersBasedOnUrlParams()
    },[])
    function generateString(){
        let subHeading;
        if(props.filterType=="categories"){
            subHeading=`showing ${activeFilters["collection"]? activeFilters["collection"].slice(0,activeFilters["collection"].length).toString():""} ${Array.isArray(activeFilters["collection"]) && activeFilters["collection"]?.length!=0 && (activeFilters["material"]?.length > 0 || activeFilters["style"]?.length > 0 || activeFilters["gemstones"]?.length > 0 || activeFilters["gender"]?.length > 0)? "in":" "} ${Array.isArray(activeFilters["material"]) && activeFilters["material"]?.length > 0 ?`${activeFilters["material"].slice(0,activeFilters["material"]?.length).toString()}${((activeFilters["style"] &&  activeFilters["style"]?.length>0 )|| (activeFilters["gender"] && activeFilters["gender"]?.length>0 ) || (activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0))? ",":" "}`:" "}${Array.isArray(activeFilters["style"]) && activeFilters["style"]?.length>0? `${activeFilters["style"].slice(0,activeFilters["style"].length).toString()}${(activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0) || (activeFilters["gender"] && activeFilters["gender"]?.length>0)?",":" "}`:""}${Array.isArray(activeFilters["gender"]) && activeFilters["gender"].length>0?`${activeFilters["gender"].slice(0,activeFilters["gender"].length).toString()}${Array.isArray(activeFilters["gemstones"]) && activeFilters["gemstones"]?.length>0?",":" "}`:""}${Array.isArray(activeFilters["gemstones"]) && activeFilters["gemstones"]?`${activeFilters["gemstones"].slice(0,activeFilters["gemstones"]?.length).toString()}`:" "}`
        }else if(props.filterType=="collection"){
            subHeading=`showing ${activeFilters["category"]? activeFilters["category"].slice(0,activeFilters["category"].length).toString():""} ${Array.isArray(activeFilters["category"]) && activeFilters["category"]?.length!=0 &&( activeFilters["material"]?.length > 0 || activeFilters["style"]?.length > 0 || activeFilters["gemstones"]?.length > 0 || activeFilters["gender"]?.length>0)? "in":" "} ${Array.isArray(activeFilters["material"]) && activeFilters["material"]?.length>0 ?`${activeFilters["material"].slice(0,activeFilters["material"]?.length).toString()}${((activeFilters["style"] && activeFilters["style"]?.length>0) || (activeFilters["gender"] &&activeFilters["gender"]?.length>0 )|| (activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0))?",":" "}`:" "}${Array.isArray(activeFilters["style"]) && activeFilters["style"]?.length>0? `${activeFilters["style"].slice(0,activeFilters["style"].length).toString()}${(activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0) || (activeFilters["gender"] &&  activeFilters["gender"]?.length>0)?",":" "}`:""}${Array.isArray(activeFilters["gender"]) && activeFilters["gender"].length>0?`${activeFilters["gender"].slice(0,activeFilters["gender"].length).toString()}${Array.isArray(activeFilters["gemstones"]) && activeFilters["gemstones"]?.length>0? ",":" "}`:""}${Array.isArray(activeFilters["gemstones"]) && activeFilters["gemstones"]?`${activeFilters["gemstones"].slice(0,activeFilters["gemstones"]?.length).toString()}`:" "}`
        }else{
            subHeading=`showing ${activeFilters["category"]? activeFilters["category"].slice(0,activeFilters["category"].length).toString():""} ${Array.isArray(activeFilters["category"]) && activeFilters["category"]?.length!=0 && (activeFilters["material"]?.length>0 || activeFilters["style"]?.length>0 || activeFilters["gemstones"]?.length>0 || activeFilters["gender"]?.length>0 || activeFilters["collection"]?.length>0)?"in" :" "} ${Array.isArray(activeFilters["collection"]) && activeFilters["collection"]?.length>0 ? `${activeFilters["collection"].slice(0,activeFilters["collection"].length).toString()}${((activeFilters["style"] && activeFilters["style"]?.length>0) || (activeFilters["gender"] && activeFilters["gender"]?.length>0) || (activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0) || (activeFilters["material"] && activeFilters["material"]?.length>0))?",":" "}`:" "}${Array.isArray(activeFilters["material"]) && activeFilters["materials"]?.length>0?`${activeFilters["material"].slice(0,activeFilters["material"]?.length).toString()}${((activeFilters["style"] && activeFilters["style"]?.length>0) || (activeFilters["gender"] && activeFilters["gender"]?.length>0)  || (activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0))?",":" "}`:""}${Array.isArray(activeFilters["style"]) && activeFilters["style"]?.length>0 ? `${activeFilters["style"].slice(0,activeFilters["style"].length).toString()}${(activeFilters["gemstones"] && activeFilters["gemstones"]?.length>0)||(activeFilters["gender"] && activeFilters["gender"]?.length>0)?",":" "}`:" "}${Array.isArray(activeFilters["gender"]) && activeFilters["gender"]?.length>0 ? `${activeFilters["gender"].slice(0,activeFilters["gender"].length).toString()}${(Array.isArray(activeFilters["gemstones"]) && activeFilters["gemstones"].length>0)||(Array.isArray(activeFilters["material"]) && activeFilters["material"].length>0)?",":" "}`:""}${Array.isArray(activeFilters["material"]) && activeFilters["material"].length>0 ? `${activeFilters["material"].slice(0,activeFilters["material"]?.length).toString()}${(activeFilters["material"] && activeFilters["material"]?.length>0)?",":" "}`:""}${activeFilters["material"] && activeFilters["material"]?.length>0 ? activeFilters["material"].slice(0,activeFilters["material"].length):""}`
        }
        return subHeading;
    }
    
    let heading=generateString()
    // console.log("activeFilters",activeFilters)
    let normalString=`${t('showingAllDesigns')}`
    function isFilterApplied({query,uri}){
        if(activeFilters[query] && Array.isArray(activeFilters[query])){
            let index=activeFilters[query].findIndex(item=>item==uri)
            if(index>-1){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
    // useEffect(()=>{
    //     setActiveFilters({})
    // },[props.filterValue])
    useEffect(() => {
        if (isInitialMount.current) {
           isInitialMount.current = false;
        } else {
            if(props.filterValue || props.filterType){
                setActiveFilters({})
            }
            // Your useEffect code here to be run on update
        }
    },[props.filterValue,props.filterType])
    useEffect(()=>{
        // console.log(activeFilters["material"])
        let material;
        if(activeFilters["material"]){
            if(activeFilters["material"].length>0){
                material=activeFilters["material"][activeFilters["material"].length-1]
                props.setPreferredMetal(material)
            }else{
                props.setPreferredMetal(null)
            }
        }
    },[activeFilters["material"]])
    return (
        <>
        {!!props.filterData &&
            <div className="showForMobile">
                <MobileFilter
                    mainHeading={props.mainHeading}
                    areFiltersApplied={areFiltersApplied}
                    heading={heading}
                    normalString={normalString}
                    subHeading={props.subHeading}
                    priceRange={props.priceRange}
                    selectedPriceRangeIndex={props.selectedPriceRangeIndex}
                    setSelectedPriceRangeIndex={props.setSelectedPriceRangeIndex}
                    sortBy={props.sortBy}
                    selectedSortValueIndex={props.selectedSortValueIndex}
                    setSelectedSortValueIndex={props.setSelectedSortValueIndex}
                    centraFiltersData={centraFiltersData}
                    filterType={props.filterType}
                    applyFilter={applyFilter}
                    isFilterApplied={isFilterApplied}
                    filterShow={filterShow}
                    setFilterShow={setFilterShow}
                    setActiveFilters={setActiveFilters}
                    activeFilters={activeFilters}
                    selectedPriceLists={props.selectedPriceLists}
                    setSelectedPriceLists={props.setSelectedPriceLists}
                    setPreferredMetal={props.setPreferredMetal}
                />
            </div>
        }
        <div className={`fixedFilter ${props.filterFixed?"show":""} paddedContent positionRelative ${props.common.showBrandNotification?"brandNotification":""}`}>
            <FilterBar 
                hideSortBy={props.hideSortBy}
                mainHeading={props.mainHeading} 
                areFiltersApplied={areFiltersApplied} 
                heading={heading} 
                normalString={normalString} 
                subHeading={props.subHeading}
                priceRange={props.priceRange}
                selectedPriceRangeIndex={props.selectedPriceRangeIndex}
                setSelectedPriceRangeIndex={props.setSelectedPriceRangeIndex}
                sortBy={props.sortBy}
                selectedSortValueIndex={props.selectedSortValueIndex}
                setSelectedSortValueIndex={props.setSelectedSortValueIndex}
                showView={true}
                changeView={props.onclick}
                static={props.static}
                centraFiltersData={centraFiltersData}
                filterType={props.filterType}
                applyFilter={applyFilter}
                isFilterApplied={isFilterApplied}
                filterData={props.filterData}
                fixed={true}
                animate={props.filterFixed}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                setActiveFilters={setActiveFilters}
                activeFilters={activeFilters}
                selectedPriceLists={props.selectedPriceLists}
                setSelectedPriceLists={props.setSelectedPriceLists}
                setPreferredMetal={props.setPreferredMetal}
            />
        </div>
        <div className={`filter positionRelative ${props.filterFixed?"hide":""} ${props.common.showBrandNotification?"brandNotification":""}`}>
            <FilterBar 
                hideSortBy={props.hideSortBy}
                mainHeading={props.mainHeading} 
                areFiltersApplied={areFiltersApplied} 
                heading={heading} 
                normalString={normalString} 
                subHeading={props.subHeading}
                priceRange={props.priceRange}
                selectedPriceRangeIndex={props.selectedPriceRangeIndex}
                setSelectedPriceRangeIndex={props.setSelectedPriceRangeIndex}
                sortBy={props.sortBy}
                selectedSortValueIndex={props.selectedSortValueIndex}
                setSelectedSortValueIndex={props.setSelectedSortValueIndex}
                showView={true}
                changeView={props.onclick}
                static={props.static}
                centraFiltersData={centraFiltersData}
                filterType={props.filterType}
                applyFilter={applyFilter}
                isFilterApplied={isFilterApplied}
                filterData={props.filterData}
                filterShow={filterShow}
                setFilterShow={setFilterShow}
                setActiveFilters={setActiveFilters}
                activeFilters={activeFilters}
                selectedPriceLists={props.selectedPriceLists}
                setSelectedPriceLists={props.setSelectedPriceLists}
                setPreferredMetal={props.setPreferredMetal}
            />
        </div>
        <style jsx>{`
            .filter.hide{
                opacity:0;
            }
            .dim{
                color:red;
            }
            .fixedFilter{
                position: fixed;
                padding-top:0px;
                top: ${props.common.showNavBar?props.common.navHeight:"0"}px;
                left: 50%;
                background: #ffffff;
                z-index: 10;
                width:100%;
                transform: translateX(-50%);
                transition:top 0.5s ease;
                // display:none;
                width:0;
                height:0;
                overflow:hidden;
                max-width:2000px;
            }
            .fixedFilter.show{
                // display:block;
                width:100%;
                height:auto;
                overflow:visible;
            }
            .fixedFilter.brandNotification{
                top: ${props.common.showNavBar?props.common.navHeight+28:"0"}px;
            }
            .rightSide{
                justify-content: flex-end;
                width:40%;
            }
            .rightSide div{
                cursor:pointer;
            }
            @keyframes fadeInAnimation{
                0% {
                    opacity:0;
                    transform: translate(-15px);
                }
                100% {
                    opacity:1;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    transform: translate(0);
                }
            }
            @keyframes textFoldingAnimation{
                    from{
                        opacity:0;
                        transform:translate(-10px, -10px);
                    }
                    to{
                        opacity:1;
                        transform:translate(0, 0);
                    }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .mobileFilterWindow{
                    display:block;
                }
                .listHeading span{
                    margin-left:0.8rem;
                }
            }
        `}</style>   
        </>
    )
}
function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}
export default connect(mapStateToProps,{preventBodyScroll})(FilterSection)