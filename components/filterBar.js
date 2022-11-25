import { useEffect, useRef, useState } from "react";
import Caret from './caret'
import { connect } from 'react-redux'
import FilterList from './filterList'
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,MEDIUM_BREAKPOINT} from '../config'
import { currency } from "../data/productListingData";
import { useRouter } from "next/router";
import { propTypes } from "@sanity/block-content-to-react";
import useTranslation from 'next-translate/useTranslation'

function Filter(props){
    const {t}=useTranslation('common')

    // console.log(props)
    const router=useRouter()
    const [sortDropDown, setSortDropDown] = useState(false)
    const [priceSortingDropdown,setPriceListDropdown]=useState(false)
    const sortByRef=useRef();
    const priceDropDownRef=useRef();
    const [activeIndex,setActiveIndex]=useState(false)

    useEffect(() => {
        function handleClickOutside(event) {
            if (sortByRef.current && !sortByRef.current.contains(event.target)) {
                setSortDropDown(false)
            }
            if (priceDropDownRef.current && !priceDropDownRef.current.contains(event.target)) {
                setPriceListDropdown(false)
            }
        }
        if(!props.hideSortBy){
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }
    }, []);
    
    function clearFilterParams(){
        props.setActiveFilters({})
        router.replace(window.location.pathname,null,{shallow:true})
        props.setSelectedPriceLists([])
        props.setPreferredMetal(null)
    }
    let currencyName=props?.selection?.selection?.selection?.currency
    let currentCurency=currency.find((item)=>item.name==currencyName)
    // console.log(currentCurency)
    let symbol=!!currentCurency?currentCurency.symbol:"$"
    function handlePriceFilter(index){
        // console.log("handle filter",index)
        // console.log("pricelist",props.selectedPriceLists)
        if(props.selectedPriceLists.includes(index)){
            // console.log("if index is present in state value")
            let slicedIndex=props.selectedPriceLists.findIndex((i)=>{
                return i==index;
            })
            // console.log("sliced index",slicedIndex)
            if(slicedIndex>-1){
                props.selectedPriceLists.splice(slicedIndex,1);
            }
          
            props.setSelectedPriceLists(JSON.parse(JSON.stringify(props.selectedPriceLists)))
            // console.log(props.selectedPriceLists)
        }else{
            // console.log("index is not present in state value")
            
            props.selectedPriceLists.push(index);
            props.setSelectedPriceLists(JSON.parse(JSON.stringify(props.selectedPriceLists)))
            // console.log(props.selectedPriceLists)
        }
    }
    // console.log("price",props.priceRange)
    // props.areFiltersApplied()
    return (
        <>
            <div className={`filterLine positionRelative ${props.fixed?"fixed":""} ${props.animate?"animate":""}`}>
                <div onClick={()=>{props.setFilterShow(!props.filterShow)}} className="leftSide font40 canelaThin"><span className="black">{props.mainHeading}, </span><span className="grey">{`${props.areFiltersApplied() && props.heading?props.heading:props.normalString} ${props.subHeading?props.subHeading:""}`}</span></div>
                <div className="rightSide anoRegular font16">
                    <div onClick={()=>{props.setFilterShow(!props.filterShow)}} ref={priceDropDownRef} className={`priceRange hideForMobile positionRelative ${priceSortingDropdown?"sortshow":""}`}>
                        <h4 className={`sort positionRelative`}>{t('filter')}<span><Caret color="black" direction={`${priceSortingDropdown?"up":"down"}`} width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></h4>
                    </div>
                    {!props.hideSortBy &&
                        <div ref={sortByRef} className={`positionRelative hideForMobile ${sortDropDown?"sortshow":""}`}>
                            <div onClick={()=>setSortDropDown(!sortDropDown)}><h4  className="positionRelative sort">{t('sortBy')} : {props.sortBy[props.selectedSortValueIndex].name} <span><Caret color="black" direction={`${sortDropDown?"up":"down"}`} width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></h4></div>
                            <ul className={`sortDropDown pl0 m0 listStyleNone`}>
                                {props.sortBy.map((value, index)=>{
                                    let delay=(((index+1)*0.1)).toString();
                                    return(
                                        <>
                                            {index != props.selectedSortValueIndex && 
                                                <li style={{animationDelay:`${delay}s`}} key={index} onClick={()=>{props.setSelectedSortValueIndex(index), setSortDropDown(false)}}>{value.name}</li>
                                            }
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    {props.showView && 
                        <h4 className="changeView mobile showForMobile cursorPointer" onClick={props.changeView}>{t('view')}</h4>
                    }
                </div>
            </div>
            {!!props.filterData &&
                <div className={`filterSection hideForMobile ${props.fixed?"paddedContent":""} filterPositionAbsolute ${props.filterShow?"show":""}`}>
                    {Array.isArray(props.centraFiltersData) && !!props.centraFiltersData && props.centraFiltersData.map((data,index)=>{
                        if(data.filterType!=props.filterType)
                        return(
                            <div key={index} className="col">
                                <FilterList filterShow={props.filterShow} indexValue={index} columnData={data} applyFilter={props.applyFilter} isFilterApplied={props.isFilterApplied} activeFilters={props.activeFilters}/>
                            </div>
                        )
                    })}
                    <div>
                        <h1 style={{animationDelay:"0.7s"}} className="priceHeading canelaThin font24">{t('price')}</h1>
                        <ul style={{animationDelay:"0.7s"}} className="pricelists pl0 mo listStyleNone">
                        {Array.isArray(props.priceRange) && props.priceRange.map((price,index)=>{
                            let priceString=`${price.textMin}${symbol} - ${price.textMax}${symbol}`
                            if(price.end===true){
                                priceString=`> ${price.textMin}${symbol}`
                            }else{
                                priceString=priceString
                            }
                            return(
                                <li key={index} onClick={()=>handlePriceFilter(index)} className={`font16  priceItem ${!!props.selectedPriceLists.includes(index)?"active anoRegular":"anoHalfRegular"}`}>{priceString}</li>
                            )
                        })}
                        </ul>
                    </div>
                     <div className="close canelaThin font24">
                        <span onClick={()=>props.setFilterShow(false)}><span className="cross"></span><span>{t('close')}</span></span>
                        <div className="clearButton"><button className="btn btnSecondary anoRegular" onClick={()=>{clearFilterParams(),props.setSelectedPriceRangeIndex(null)}}>{t('clearFilter')}</button></div>
                    </div>
                </div>
            }
            <style jsx>{`
                .clearButton button {
                    padding: 1rem 1.2rem;
                }
                .close{
                    display: flex;
                    align-items: center;
                }
                .clearButton{
                    margin-left:2rem;
                }
                .active{
                    font-weight:bold;
                }
                .priceHeading{
                    margin-bottom:2.4rem;
                }
                .priceItem{
                    margin-bottom:1.6rem;
                    cursor:pointer;
                    white-space: nowrap;
                }
                .filterLine{
                    justify-content:space-between;
                    align-items: baseline;
                    border-bottom:0.1rem solid #787878;
                    padding-bottom:0.7rem;
                    padding-top:0rem;
                }
                .filterLine.fixed{
                    padding-top:0.8rem;
                }
                .filterLine, .rightSide{
                    display:flex;
                }
                .leftSide{
                    cursor:pointer;
                    flex:1 1 100%;
                }
                .rightSide{
                    justify-content: flex-end;
                    flex: 1 0 auto;
                }
                .rightSide div{
                    cursor:pointer;
                }
                .priceRange{
                    margin-right:3.2rem;
                }
                .priceRange span, .sort span{
                    margin-left:0.8rem;
                }
                .priceRange .sortDropDown li{
                    padding-left:1rem;
                    padding-right:1rem;
                }
                .priceRange .sortDropDown{
                    width:-webkit-fill-available;
                }
                .sortDropDown{
                    position:absolute;
                    top: 27px;
                    left:auto;
                    right:0;
                    background:white;
                    box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
                    z-index:9;
                    width:101%;
                    padding-top:0rem;
                    height:0;
                    overflow:hidden;
                    min-width:max-content;
                }
                .sortDropDown li{
                    margin-bottom:3.2rem;
                    padding-left:7.2rem;
                    padding-right:2rem;
                    cursor:pointer;
                }
                .fixed .sortDropDown::after{
                    top: 4px;
                }
                .fixed .sortDropDown{
                    top: 32px;
                } 
                .sortshow .sortDropDown::after{
                    width:100%;
                }
                .sortshow .sortDropDown{
                    padding-top:2.8rem;
                    height:auto;
                    z-index: 99;
                }
                .sortDropDown::after{
                    content:"";
                    position:absolute;
                    background:#000000;
                    left:0;
                    top: 9px;
                    width:0%;
                    height:2px;
                    z-index:99;
                    transition:all 0.3s ease-out;
                }
                .sort{
                    pointer-events:${props.filterShow?"none":"visible"};
                }
                .filterSection{
                    height:0;
                    overflow:hidden;
                    display:flex;
                    margin-right:-2.4rem;
                    padding-bottom:0rem;
                    pointer-events:none;
                    transition:height 0.15s linear, transform 0.15s linear;
                }
                .filterSection.show{
                    padding-top:4.8rem;
                    padding-bottom:10rem;
                    pointer-events:visible;
                    height:auto;
                }
                .filterPositionAbsolute{
                    position: absolute;
                    width: calc(100% + 1px);
                    top: 100%;
                    left: -1px;
                    background: white;
                    z-index: 10;
                }
                .close{
                    position:absolute;
                    bottom:3rem;
                    left:50%;
                    transform:translateX(-50%);
                    cursor:pointer;
                    pointer-events:visible;
                }
                .cross{
                    position:relative;
                    margin-right: 24px;
                    display: inline;
                    top: -1px;
                }
                .cross::after{
                    position: absolute;
                    content: "";
                    top: 50%;
                    left: 0;
                    background: black;
                    width: 2rem;
                    height: 0.1rem;
                    transform: rotate(45deg) translateY(-50%);
                }
                .cross::before{
                    position: absolute;
                    content: "";
                    top: 50%;
                    left: 0;
                    background: black;
                    width: 2rem;
                    height: 0.1rem;
                    transform: rotate(-45deg) translateY(-50%);
                }
                .col{
                    width:16.66%;
                    padding-right:2.4rem;
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
                @media screen and (max-width: 1000px){
                    .priceRange, .sort {
                        margin-right: 2.2rem;
                    }
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .fixed .sortDropDown::after{
                        top: 2px;
                    }
                    .sortDropDown::after{
                        top: 7px;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .sortDropDown::after{
                        top: 4px;
                    }
                    .fixed .sortDropDown::after{
                        top: 9px;
                    }
                    .fixed .sortDropDown{
                        top: 2.7rem;
                    }
                    .sortDropDown li{
                        padding-left:5.7rem;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .leftSide{
                        width:50%;
                    }
                    .rightSide{
                        width:50%;
                    }
                    .sortDropDown{
                        top: 25.5px;
                    }
                    .fixed .sortDropDown{
                        top: 2.1rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .filterSection{
                        display:none;
                    }
                    .leftSide{
                        width:100%;
                        padding-right:1.5rem;
                        line-height: 2.4rem;
                        font-size: 1.6rem;
                    }
                    .rightSide{
                        width:auto;
                    }
                    .fixed .rightSide .changeView.mobile{
                        display:block;
                    }
                    .sort::after{
                        content:none;
                    }
                    .filterLine{
                        padding-bottom:0rem;
                    }
                }
            `}</style>
        </>
    )
}

function mapStateToProps({common,selection}){
    return {common,selection}
}


export default connect(mapStateToProps,{})(Filter)