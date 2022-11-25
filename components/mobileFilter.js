import {connect} from 'react-redux'
import Caret from './caret'
import {useState} from 'react'
import { currency } from '../data/productListingData'
import { useRouter } from 'next/router'
function MobileFilter(props){
    const router= useRouter()
    // console.log("selection",props.selection.selection.selection.currency)
    let currencyName=props?.selection?.selection?.selection?.currency
    let currentCurency=currency.find((item)=>item.name==currencyName)
    let symbol=!!currentCurency ? currentCurency.symbol :"$"
    const [activeFilterDropdown,setActiveFilterDropdown] = useState(null)
    const [activeCurrencyIndex,setActiveCurrencyIndex]=useState(null)
    // function handlePriceFilter(index){
    //     if(activeCurrencyIndex==index){
    //         setActiveCurrencyIndex(null)
    //         props.setSelectedPriceRangeIndex(null)
    //     }else{
    //         setActiveCurrencyIndex(index)
    //         props.setSelectedPriceRangeIndex(index)
    //     }
    // }
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
    // function clearFilterParams(){
    //     props.setActiveFilters({})
    //     router.replace(window.location.pathname,null,{shallow:true})
    //     if(props.selectedPriceRangeIndex!=null){
    //         setActiveCurrencyIndex(null)
    //     }
    // }
    function clearFilterParams(){
        props.setActiveFilters({})
        router.replace(window.location.pathname,null,{shallow:true})
        props.setSelectedPriceLists([])
        props.setPreferredMetal(null)
        // setActiveIndex(false) 
        // if(props.selectedPriceRangeIndex!=null){
        //     setActiveCurrencyIndex(false)
        // }
    }
    // console.log(props.heading)
    return (
        <>
            <div className={`mobileFilterWindow ${props.filterShow?"show":""}`} style={{height:props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"}}>
                <div className="mobileFilter paddedContent">
                    <div className={`filterLine`}>
                        <h1 className="leftSide mobile font16-notResponsive canelaThin"><span className="black">{props.mainHeading} </span><span className="grey">{`${props.heading?props.heading:props.normalString}${props.subHeading?props.subHeading:""}`}</span></h1>
                    </div>
                    <div className="content anoRegular font16-notResponsive">
                        <div className={`filterItemWrapper ${activeFilterDropdown=="sortBy"?"showFilter":""}`}>
                            <h4 onClick={()=>setActiveFilterDropdown(activeFilterDropdown=="sortBy"?null:"sortBy")} className="filterTypeHeading">Sort by: {props.sortBy[props.selectedSortValueIndex].name} <span><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></h4>
                            <ul className={`filterList pl0 m0 listStyleNone`}>
                                {props.sortBy.map((value, index)=>{
                                    return(
                                        <>
                                            {index != props.selectedSortValueIndex &&
                                                <li className="anoHalfRegular" key={index} onClick={()=>props.setSelectedSortValueIndex(index)}>{value.name}</li>
                                            }
                                        </>
                                    )
                                })}
                            </ul> 
                        </div>
                        
                        {!!props.centraFiltersData && Array.isArray(props.centraFiltersData) && props.centraFiltersData.map((data,index)=>{
                            let delay=((((index+1)*0.1)+(0.1))).toString();
                            if(data.filterType!=props.filterType)
                            return(
                                <div className={`filterItemWrapper ${activeFilterDropdown==`centraFilter_${index}`?"showFilter":""}`}>
                                    <h4 onClick={()=>{setActiveFilterDropdown(activeFilterDropdown==`centraFilter_${index}`?null:`centraFilter_${index}`)}} style={{animationDelay:`${delay}s`}} className="filterTypeHeading">{data.heading} <span><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span></h4>
                                    <ul className={`filterList pl0 m0 listStyleNone`}>
                                        {data.filterItems.map((item,num)=>{
                                            return(
                                                <li key={`itemsxt_${num}`} className={`font16-notResponsive ${!!item.count? "":"disabled"} ${props.isFilterApplied(item)==true? "active anoRegular" :"anoHalfRegular"}` } onClick={()=>props.applyFilter(item,!!item.count)}>{item.subHeading}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                        <div className={`filterItemWrapper ${activeFilterDropdown=="price"?"showFilter":""}`}>
                            <h4 onClick={()=>setActiveFilterDropdown(activeFilterDropdown=="price"?null:"price")} className="filterTypeHeading">{`Price`}<span><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></h4>
                            <ul className={`filterList pl0 m0 listStyleNone`}>
                                {props.priceRange.map((range,index)=>{  
                                    
                                    let priceString=`${range.min}${symbol} - ${range.max}${symbol}`
                                    if(range.end===true){
                                        priceString=`>${range.min}${symbol}`
                                    }else{
                                        priceString=priceString
                                    }
                                    return(
                                     
                                           <li key={index} onClick={()=>{handlePriceFilter(index)}} className={`font16  priceItem ${!!props.selectedPriceLists.includes(index)?"active anoRegular":"anoHalfRegular"}`}>{priceString}</li>
                                
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div onClick={()=>props.setFilterShow(false)} className="closeMobile positionAbsolute canelaThin font24">
                        <span className="cross"></span>
                    </div>
                    <div className="filterButtons">
                        <div className="clearButton "><button className="btn btnSecondary anoRegular" onClick={()=>{clearFilterParams(),props.setSelectedPriceRangeIndex(null)}}>Clear filter</button></div>
                        <div className="showButton alignRight"><button className="btn btnPrimary anoRegular" onClick={()=>props.setFilterShow(false)}>Show {props.subHeading}</button></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .priceItem{
                    cursor:pointer;
                    margin-bottom:1.6rem;
                }
                .active{
                    font-weight:bold;
                }
                .content{
                    padding-top:4rem;
                }
                .filterList li.disabled{
                    color:#c7c7c7;
                }
                .filterList{
                    height:0;
                    overflow:hidden;
                    padding-left:0.8rem;
                    // transform:translateY(-3rem);
                    transition:all 0.3s ease-out;
                }
                .filterList li{
                    margin-bottom:2.4rem;
                }
                .filterLine{
                    justify-content:space-between;
                    align-items: baseline;
                    border-bottom:0.1rem solid #787878;
                    padding-bottom:0.8rem;
                    display:flex;
                }
                .showFilter .filterList{
                    // pointer-events:visible;
                    transform:translateY(0rem);
                    height:auto;
                    padding-top:2.6rem;
                }
                .leftSide{
                    cursor:pointer;
                    width:100%;
                    font-size: 2.4rem;
                    line-height: 3.2rem;
                }
                .mobileFilterWindow::-webkit-scrollbar {
                    display: none;
                }
                .filterItemWrapper{
                    margin-bottom:2.6rem;
                }
                .filterTypeHeading{
                    font-size:1.6rem;
                }
                .filterTypeHeading span{
                    margin-left:0.8rem;
                }
                .closeMobile{
                    top:2.4rem;
                    right:3.6rem;
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
                .filterButtons{
                    display:flex;
                    justify-content:space-between;
                    margin:1.2rem 0 2rem 0;
                }
                .clearButton button, .showButton button{
                    letter-spacing: 0.2px;
                    font-size:1.6rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{})(MobileFilter)