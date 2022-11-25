import React, { useState, useEffect, useRef } from 'react'
import {curated_en, curated_fr, suggested, clusterResults} from '../data/menuBar'
import Caret from '../components/caret'
import { connect } from 'react-redux';
import Link from 'next/link'
import {MOBILE_BREAKPOINT,ALGOLIA_APP_ID,ALGOLIA_API_KEY, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import Colors from './colorsDynamic'
import Loader from './loader'
import algoliasearch from 'algoliasearch/lite';
import {setSearch,setSearchQuery,showExploreMenu,setIndexValue,setIndexValue2,setPanelTwoData,setPanelThreeData,setActiveTier2Item,setActiveTier1Item,showSearchWindow,preventBodyScroll,fetchAllMenuProducts,setMenuProductsPricelist} from './../redux/actions'
import { InstantSearch,connectAutoComplete } from 'react-instantsearch-dom';
import SearchBox from './searchBox'
import Hits from './hits'
import Tier2DefaultComponent from './tier2DefaultComponent'
import Tier3DefaultComponent from './tier3DefaultComponent'
import MenuItemsGroupWise from './menuItemsGroupWise'
import CountryAndLanguage from './countryAndLanguage'
import MenuNavItems from './menuNavItems'
import SearchResults from './searchResults'
import HitsError from './hitsError'
import NewsLetterSignUp from './newsLetterSignUp'
import { ALGOLIA_INDICES,menuItems} from '../branch-specific-config'
import LanguageSwitch from './LanguageSwitch';
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

function ExploreMenu(props) {
    // console.log("exploremenu",props);
    const {t}=useTranslation('common');
    const router = useRouter();
    let curated = curated_en;
    if(router.locale=="fr") curated = curated_fr;
    let tier2DefaultItems=!!props?.common?.menuItems?.menu ? props.common.menuItems.menu.find(item =>item.tier2action=="default" && item.tier3action=="default").defaultTier2 :null
    let tier3DefaultItems=!!props?.common?.menuItems?.menu ? props.common.menuItems.menu.find(item =>item.tier2action=="default" && item.tier3action=="default").defaultTier3:null
    const [defaultData, setDefaultData] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)
    const [searchPanelOneData, setSearchPanelOneData] = useState(curated)
    const [searchProductsVisible, setSearchProductsVisible] = useState(true)
    const [searchProductsVisibleMobile, setSearchProductsVisibleMobile] = useState(true)
    const [mobileResultsOff, setMobileResultsOff] = useState(true)
    const [searchCrossActive, setSearchCrossActive] = useState(false)
    const [searchResultsError,setSearchResultsError] = useState(false)
    const [init,setInit] = useState(true)
    const clearInputRef=useRef();
    const clearInputRef1=useRef();
    function searchResult(event){
        if(event.target.value==="cluster"){
            if(window.innerWidth <= MOBILE_BREAKPOINT){
                setMobileResultsOff(false)
            }
            setSearchCrossActive(true)
            setSearchProductsVisibleMobile(true)
            setSearchProductsVisible(true)
            setSearchLoader(false);
            props.setPanelTwoData(clusterResults)
        }else if(event.target.value==="1234"){
            // setSearchCrossActive(true)
            // setSearchProductsVisibleMobile(true)
            // setSearchProductsVisible(true)
            // setSearchLoader(false);
            // setPanelTwoData(clusterResults)
            setSearchResultsError(true)
            setSearchCrossActive(true)
            setMobileResultsOff(true)
        }else{
            setSearchLoader(true);
            props.setPanelTwoData(null);
            setSearchCrossActive(false);
        }
    }
    function currentList(id){
        if(props?.exploreMenu?.activeTier2Item?.id==id){
            props.setIndexValue2(0);
        }else{
            props.setIndexValue2(id)
        }
        
    }
    
    useEffect(()=>{
        if(props.common.showExploreMenu){
            setDefaultData(true)
            props.setPanelTwoData(<Tier2DefaultComponent defaultItems={tier2DefaultItems} />)
            props.setPanelThreeData(<Tier3DefaultComponent defaultItems={tier3DefaultItems} />)
            setTimeout(()=>{
                setInit(false)
            },1000)
        }
        if(!props.common.showExploreMenu){
            // setPanelTwo(false)
            setDefaultData(false)
            props.setActiveTier1Item(null)
            props.setActiveTier2Item(null)
            props.setPanelTwoData(null)
            props.setPanelThreeData(null)
            setInit(true)
            // setPanelThreeHide(true)
            props.showSearchWindow(false)
            setSearchPanelOneData(curated)
            setSearchProductsVisible(true)
            setSearchProductsVisibleMobile(true)
            setMobileResultsOff(true)
        }
    },[props.common.showExploreMenu,props.common.menuDataFetchStart])

    const algoliaClient=algoliasearch(ALGOLIA_APP_ID,ALGOLIA_API_KEY)
    //   const searchClient = algoliasearch(
    //     ALGOLIA_APP_ID,
    //     ALGOLIA_API_KEY
    //   );
    const searchClient = {
        search(requests) {
        if (requests.every(({ params }) => params.query.length < 4 )) {
            return Promise.resolve({
            results: requests.map(() => ({
                hits: [],
                nbHits: 0,
                nbPages: 0,
                page: 0,
                processingTimeMS: 0,
            })),
            });
        } 
            return algoliaClient.search(requests);
        }
    }
    function mouseEnterPanelOne(){
        // if(props?.exploreMenu?.activeTier1Item?.tier3action!="default")
        // console.log('mouse enter panel 1',props?.exploreMenu?.activeTier1Item!=null,props?.exploreMenu?.activeTier1Item?.tier3action!="default",(props.common.showSearchWindow && !props.common.searchQuery))
        if((props?.exploreMenu?.activeTier1Item!=null && props?.exploreMenu?.activeTier1Item?.tier3action!="default") || (props.common.showSearchWindow && !props.common.searchQuery))
            props.setPanelThreeData(null)
        props.setActiveTier2Item(null)
    }
    function searchBarClick(){
        // console.log('search bar click')
        props.showSearchWindow(true)
        props.setPanelThreeData(null)
        props.setActiveTier1Item(null)
        props.setActiveTier2Item(null)
        props.setPanelTwoData(<SearchResults />)
    }
    function backFromSearch(){
        props.showSearchWindow(false),
        props.setActiveTier1Item(null)
        props.setActiveTier2Item(null)
        props.setPanelTwoData(<Tier2DefaultComponent defaultItems={tier2DefaultItems} />)
        props.setPanelThreeData(<Tier3DefaultComponent defaultItems={tier3DefaultItems} />)
    }
    const Autocomplete = ({ hits, currentRefinement, refine }) => {
        // console.log('autocomplete hits',hits)
        function clickSuggestion(val){
            // props.setSearchQuery(val)
            // refine(val)
        }
        let slicedHits = hits.slice(0,3)
        return (
            <>
                <div>
                    {/* {hits.map(hit => (
                        <li key={hit.objectID}>{hit.name}</li>
                    ))} */}
                    {slicedHits.map((hit,index)=>{
                        let delay3=(((index+1)*0.1)).toString();
                        return(
                            <h1 key={hit.objectID} onClick={()=>clickSuggestion(hit.name)} style={{animationDelay:`${delay3}s`}} className="searchPanelOneresult canelaThin font20 cursorPointer">{hit.name}</h1>
                        )
                    })}
                </div>
                <style jsx>{`
                        .searchPanelOneresult{
                            margin-bottom:1.6rem;
                        }
                        .searchPanelOneresult{
                            opacity:0;
                            animation:fadeUpAnimation 1s ease forwards;
                        }
                        @keyframes fadeUpAnimation{
                            0% {
                                opacity:0;
                                transform-origin:bottom;
                                transform: translateY(15px);
                            }
                            100% {
                                opacity:1;
                                transform-origin:top;
                                -webkit-backface-visibility: hidden;
                                backface-visibility: hidden;
                                transform: translateY(0);
                            }
                        }
                `}</style>
            </>
        )
    }
    
    // useEffect(()=>{
    //     if(props.common.showExploreMenu){
            //when explore menu is opened
            //if selection is set and pricelist is not same or selection is not set
            // if((props?.selection?.selection?.location && props?.cache?.menuProductsPriceList!=props?.selection?.selection?.location.pricelist) || !props?.selection?.selection?.location){
            //     if(props?.selection?.selection?.location)
            //         props.setMenuProductsPricelist(props?.selection?.selection?.location?.pricelist)
            // }
            // props.fetchAllMenuProducts()
    //     }
    // },[props.common.showExploreMenu,props?.selection?.selection])
    let searchIndex = ALGOLIA_INDICES.find(index=>index.language==router.locale).indexName
    // console.log('searchIndex',searchIndex)
    return (
        <>
            <InstantSearch 
                searchClient={searchClient} 
                indexName={searchIndex} 
                stalledSearchDelay={500} 
                onSearchStateChange={searchState => {
                // console.log('search state change',searchState)
            }}>
            {props.common.menuDataFetchStart ?
                <div className="menuLoadingLoader"><Loader type="dots" size={8} color="#787878"/></div>
                :
                <>
                    <div className={`exploreMenuWrapper paddedContent ${props.common.showExploreMenu?"exploreActive":""} ${props.common.showSearchWindow?"searchWindowActive":""} ${searchResultsError?"searchError":""}`}>
                    {defaultData && 
                    <>
                        <div className={`exploreMenuContainer ${props.exploreMenu.activeTier1Item===null?"default":""}`} onMouseEnter={()=>mouseEnterPanelOne()}>
                            <div className="showForMobile">
                                {!props.common.showSearchWindow && 
                                    <div onClick={()=>searchBarClick()} className="searchBarMobile canelaThin positionRelative">
                                        <div className="searchLogoMobile"><img className="width-100" src="/images/searchLogo.png"/></div>
                                        <form>
                                            <input type="text" placeholder="Search"/>
                                        </form>
                                    </div>
                                }
                            </div>
                            {!props.common.showSearchWindow &&
                                <MenuItemsGroupWise menuItems={!!props.common.menuItems.menu ?   props.common.menuItems.menu:[]}  />
                            }
                            {props.common.showSearchWindow &&
                                <div className="searchPanelOne" onMouseEnter={()=>{props.setPanelThreeData(null);setActiveTier2Item(null)}}>
                                    <div onClick={()=>{backFromSearch(),props.setSearchQuery("")}} className="backToExplore">
                                        <span className="backToExploreArrow"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span>
                                        <span className="backToExploreLabel anoRegular font16">{t('back1')}</span>
                                    </div>
                                    <div className={`searchTextBox positionRelative`}>
                                        <div className="searchForm">
                                            <SearchBox showReset={false}/>
                                        </div>
                                        {!!props.common.searchQuery && <div onClick={()=>props.setSearchQuery("")} className="crossForSearchMobile"><img src="/images/cross.svg" width="16" height="16" alt='cross'/></div>}
                                        {!props.common.searchQuery && <button className="searchSubmit cursorPointer" type="submit"><Caret color="black" direction="right" width="0.1rem" length="1rem" marginBottom="0.2rem"/></button>}
                                            <HitsError />
                                    </div>
                                    <div className="searchPanelOneData">
                                        
                                        <h2 className="searchPanelOneHeading anoRegular font16">{props.common.searchQuery.length < 4?curated.heading:""}</h2>
                                        {props.common.searchQuery.length < 4?
                                            <div>
                                                {!!searchPanelOneData && searchPanelOneData.results.map((result,index)=>{
                                                    let delay3=(((index+1)*0.1)+0.2).toString();
                                                    return(
                                                        <h1 key={`searchSuggestion_${index}`} onClick={()=>props.setSearchQuery(result.result)} style={{animationDelay:`${delay3}s`}} className="searchPanelOneresult canelaThin font20 cursorPointer">{result.result}</h1>
                                                    )
                                                })}
                                            </div>
                                        :
                                            <></>
                                        }
                                    </div>
                                    <div className="showForMobile searchResultsMobile">
                                        <SearchResults />
                                    </div>
                                </div>
                            }
                            {!props?.common?.showSearchWindow &&
                                <div>
                                
                                    <div className="announcementTabletAndBelow">
                                    <Link href={!!tier2DefaultItems?.link ? tier2DefaultItems.link:"#"} ><a onClick={()=>props.showExploreMenu(false)}>
                                        <div className="defaultImgMobile"><img className="width-100" src={tier2DefaultItems?.imgMobile}/></div>
                                        <div className="imgHeading font16-notResponsive canelaThin">{tier2DefaultItems?.title}</div>
                                    </a></Link>
                                    </div>
                                    <div className="showForMobile">
                                        <NewsLetterSignUp/>
                                    </div>
                            </div>
                            }   
                        </div>
                    </>
                    } 
                    <div className={`secondPanel ${props.exploreMenu.activeTier1Item && props.exploreMenu.activeTier1Item.id!=1?"showTab":""} ${props?.exploreMenu?.activeTier1Item?.tier2action==="default"?"setDefault":""} ${!!props.exploreMenu.panelThreeData && !init ?"panelThreeLine":""} ${(props?.exploreMenu?.activeTier1Item?.tier2action!="default" && props.exploreMenu.activeTier1Item!=null && props?.exploreMenu?.activeTier1Item?.tier2action!="imageAndText")?"userExploring":""}`}>
                        <div className="secondPanelWrapper">
                            <div className="secondPanelBackTab cursorPointer" onClick={()=>{props.setActiveTier1Item(null);props.setPanelTwoData(null);props.setActiveTier2Item(null);props.setPanelThreeData(null);}}>
                                <span className="secondPanelBackCaret"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span>
                                <span className="secondPanelBackText anoRegular font16">{t('back1')}</span>
                            </div>
                            <div className="secondTier positionRelative">
                                {!!props.exploreMenu.panelTwoData && 
                                    <div>
                                        {props.exploreMenu.panelTwoData}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`thirdPanel ${props?.exploreMenu?.activeTier1Item?.tier3action=="default"?"setDefault":""} ${!!props.exploreMenu.panelThreeData?"active":""} ${!props.exploreMenu.panelThreeData?"hide":""}`}>
                        <div className="thirdPanelWrapper">
                            <div className="thirdTier positionRelative">
                                {!!props.exploreMenu.panelThreeData &&
                                        <div>
                                            {props.exploreMenu.panelThreeData}
                                        </div>
                                }
                                <div className="searchResultsTab">
                                    {props.common.showSearchWindow && 
                                        <SearchResults noHover={true}/>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`mobilePanel paddedContent showForMobile ${props.exploreMenu.activeTier1Item!=null?"show":""}`}>
                        <div>
                            <div onClick={()=>props.setActiveTier1Item(null)} className="backButton font12 anoRegular"><span className="backArrow"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span><span className="backLabel">Back</span></div>
                            {!!props.exploreMenu.panelTwoData && 
                                <div>
                                    {props.exploreMenu.panelTwoData}
                                </div>
                            }
                            {!!props.exploreMenu.panelTwoData && !!props.exploreMenu.panelTwoData.listItems && props.exploreMenu.panelTwoData.listItems.map((item, index)=>{
                                let delay=((index+1)*0.1).toString();
                                return(
                                    <div className="listItemsMobile" key={`panelTwoListItem_${index}`}>   
                                        <div onClick={()=>{currentList(item.id)}} style={{animationDelay:`${delay}s`}} className= {`subHeading grey positionRelative font20 canelaThin ${props?.exploreMenu?.activeTier2Item?.id===item.id?"current":""} `}><div  className="inlineBlock underlinedLink">{item.label}</div> {!!item.items && <span className="plusWrapper"><span className="plus"></span></span>}</div>
                                        {props?.exploreMenu?.activeTier2Item?.id===item.id &&
                                        <>
                                        {!!props.exploreMenu.panelThreeData && !!props.exploreMenu.panelThreeData.desc && 
                                            <div className="productDesc anoHalfRegular">{props.exploreMenu.panelThreeData.desc}</div>
                                        }
                                        {!!props.exploreMenu.panelThreeData && !!props.exploreMenu.panelThreeData.mainImg && 
                                            <div className="productMainImg"><img className="width-100" src={props.exploreMenu.panelThreeData.mainImg}/></div>
                                        }
                                        {!!props.exploreMenu.panelThreeData && !!props.exploreMenu.panelThreeData.items && props.exploreMenu.panelThreeData.items.map((product,index)=>{
                                            // console.log("product item",product,index)
                                            let delay2=(((index+1)*0.1)+(0.2)).toString();
                                            return(
                                                <>
                                                {(index <= 3) && 
                                                <div style={{animationDelay:`${delay2}s`}} className="productDetails">
                                                    <div className="productLeft">
                                                        <Link href={!!product?.linksTo ?product.linksTo:"#"}><a><div className="productName underlineLR canelaThin font16-notResponsive">{product.productName}</div></a></Link>

                                                        <div className="priceAndColor">
                                                            <div className="productPrice anoRegular">{product.price}</div>
                                                            <div className="colorVariant"><Colors colors={["#EAC786","#D5D1D1","#F2C2A4"]}/></div>
                                                        </div>
                                                    </div>
                                                    <Link href={!!product?.linksTo ?product.linksTo:"#"}><a>
                                                        <div className="productRight">
                                                            <img className="width-100" src={product.img}/>
                                                        </div> 
                                                    </a></Link>
                                                
                                                    {/* <Hits hitComponent={Hit} /> */}
                                                </div>}
                                                </>
                                            )
                                        })}
                                        {!!props.exploreMenu.panelThreeData && !!props.exploreMenu.panelThreeData.items && !!props.exploreMenu.panelThreeData.label && <div className="seeAllLink"><Link href={props.exploreMenu.panelThreeData.headingLinksTo}><a>See all in {props.exploreMenu.panelThreeData.label} <div className="seeAllArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="1px"/></div></a></Link></div>}
                                        </>
                                        }  
                                    </div>    
                                )
                            })}
                        </div>
                    </div>
                    </div>
                    <div className="countryAndLang langSwap desktop anoRegular">
                        <div><CountryAndLanguage fontClass="font16-notResponsive" caret={true} caretColor={"black"}/></div>
                        <div><LanguageSwitch fontClass="font16-notResponsive" caret={true} caretColor={"black"}/></div>
                    </div>
                    <div className="countryAndLangMobile font16-notResponsive anoRegular paddedContent showForMobile">
                        {/* <CountryAndLanguage fontClass="font16-notResponsive" /> */}
                        <div><CountryAndLanguage CaretMarginBottom="4px" fontClass="font16-notResponsive" caret={true} caretColor={"black"}/></div>
                        <div><LanguageSwitch CaretMarginBottom="4px" fontClass="font16-notResponsive" caret={true} caretColor={"black"}/></div>
                    </div>
                </>
            }
            </InstantSearch>     
            <style jsx>{`
            .announcementTabletAndBelow{
                display:none;
            }
            .countryAndLang.langSwap{
                justify-content: space-between;
            }
            .countryAndLang.langSwap div:first-child{
                width: 40%;
                padding-right: 1rem;
            }
            .countryAndLang.langSwap div:last-child{
                width: auto;
                padding-right: 4rem;
            }
            .secondPanelBackTab{
                display:none;
            }

            .countryAndLang{
                display:flex;
            }
            .searchWindowActive .secondTier{
                overflow-y:scroll;
                padding-left:0;
                padding-right:0;
            }
            .loader{
                position:absolute;
                top:32.1rem;
                left:50%;
                transform:translateX(-50%);
            }
            .menuLoadingLoader{
                position:fixed;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
            }
            .backToExplore{
                padding-left:2px;
                margin-bottom:11.2rem;
                cursor:pointer;
            }
            .searchWindowActive .backToExplore{
                opacity:0;
                animation:fadeUpAnimation 0.3s ease forwards 0.2s;
            }
            .backToExploreLabel{
                margin-left:0.8rem;
            }
            .searchTextBox input{
                border:none;
                width:80%;
            }
            .searchTextBox{
                padding-right:4rem;
                margin-bottom:4.8rem;
            }
            .searchWindowActive .searchTextBox{
                //opacity:0;
                //animation:fadeUpAnimation 0.1s ease forwards 0.7s;
            }
            .searchTextBox .searchForm{
                border-bottom:1px solid #000000;
                position:relative;
                width:0;
            }
            .searchError .searchTextBox .searchForm{
                border-bottom:1px solid #BF2012;
            }
            .searchWindowActive .searchTextBox .searchForm{
                animation:textFormWidth 0.15s ease forwards 0.1s;
            }
            @keyframes textFormWidth{
                from{
                    width:0;
                }
                to{
                    width:100%;
                }
            }
            .searchSubmit{
                position:absolute;
                right:0;
                bottom:0.8rem;
                border: none;
                background: transparent;
            }
            .searchPanelOneHeading{
                margin-bottom:3.2rem;
            }
            .searchPanelOneresult{
                margin-bottom:1.6rem;
            }
            .searchWindowActive .searchPanelOneresult{
                opacity:0;
                animation:fadeUpAnimation 0.15s ease forwards;
            }
            .inputForm input{
                color:black;
                background: white;
                border: 1px solid grey;
                padding: 1.2rem 2.5rem 1.2rem 1.2rem;
                width: 100%;
                font-size: 1.6rem;
                line-height:2.4rem;
                letter-spacing: 1px;
            }
            .inputForm{
                margin-bottom:1.6rem;
            }
            .submitButton{
                position:absolute;
                top: 50%;
                right: 1.2rem;
                transform: translateY(-50%);
                cursor:pointer;
            }
            .exploreMenuContainer.default div{
                color:#000000;
            }
            .exploreActive .secondPanelWrapper::after{
                content:'';
                background:#787878;
                position:absolute;
                height:0%;
                width:1px;
                top:6rem;
                left:0rem;
                animation:lineAnimation 0.15s ease-out forwards 0.2s;
            }
            .exploreActive .secondPanelWrapper::before{
                content:'';
                background:#787878;
                position:absolute;
                height:0%;
                width:1px;
                top:6rem;
                right:0rem;
                animation:lineAnimation 0.15s ease-out forwards 0.2s;
            }
            .exploreMenuWrapper{
                display:flex;
            }
            .subHeading{
                opacity:0;
                animation:fadeInAnimation 1s ease forwards;
            }
            .secondTier{
                padding-top:8rem;
            }
            .secondTier::-webkit-scrollbar {
                display: none;
            }
            .secondTier {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .seeAllLink{
                margin-bottom:0.8rem;
            }
            .secondPanel{
                height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                width:34.33%;
                background:#FFFFFF;
                top:0;
                left:100%;
                //transform:translateX(-0%);
                transition:all 1s ease-out;
            }
            .thirdPanel{
                height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                width:33.33%;
                background:#FFFFFF;
                left:200%;
                transition:all 1s ease;
                overflow-y:scroll;
            }
            .thirdPanel::-webkit-scrollbar {
                display: none;
            }
            .thirdPanel {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .thirdPanelWrapper{
                padding-top:6rem;
                padding-left:5.2rem;
                padding-right:4rem;
                //padding-bottom:8rem;
            }
            .thirdPanel.hide{
                //transform:translateX(-300%);
            }
            .countryAndLang.desktop{
                //margin-bottom:4.8rem;
                position: absolute;
                bottom: 0rem;
                left:6.4rem;
                background:#ffffff;
                // height:12rem;
                padding-top:2.4rem;
                padding-bottom:2.4rem;
                width:calc(33.33% - 6.4rem);
            }
            .exploreMenuContainer{
                width:32.33%;
                background:#FFFFFF;
                overflow-y:scroll;
                padding-top:6rem;
                padding-right: 1.2rem;
                padding-bottom:11.2rem;
                height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .exploreMenuContainer::-webkit-scrollbar {
                display: none;
            }
            .heading, .subHeading{
                margin-bottom:1.6rem;
                cursor:pointer;
            }
            .current.heading{
                color:#000000;
            }
            .current.subHeading{
                color:#000000;
            }
            .heading:last-child{
                margin-bottom:0rem;
            }
            .underlinedLink::after{
                transform: scaleX(1);
                transform-origin: left;
            }
            .secondPanelWrapper{
                height:100%;
                width:100%;
                position:relative;
            }
            .secondTier{
                height:100%;
                width:100%;
                padding-top:6rem;
                overflow-y:scroll;
                padding-left:5.2rem;
                padding-right:5.2rem;
                //padding-bottom:8rem;
            }
            .secondPanel.userExploring .secondTier{
                padding-top:18rem;
                padding-bottom: 10rem;
            }
            .seeAllLink{
                opacity:0;
                animation:fadeInAnimation 1s ease forwards 0s; 
            }
            .productDesc{
                opacity:0;
                animation:fadeInAnimation 1s ease forwards 0.1s; 
            }
            .productMainImg{
                opacity:0;
                animation:fadeInAnimation 1s ease forwards 0.2s; 
            }
            .productDetails{
                opacity:0;
                animation:fadeInAnimation 1s ease forwards; 
            }
            .priceAndColor{
                display:flex;
                align-items: center;
            }
            .productPrice{
                color:#787878;
                margin-right:2.4rem;
                letter-spacing:0.5px;
            }
            .productContent{
                letter-spacing: 0.5px;
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
            @keyframes fadeUpAnimation{
                0% {
                    opacity:0;
                    transform-origin:bottom;
                    transform: translateY(15px);
                }
                100% {
                    opacity:1;
                    transform-origin:top;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden;
                    transform: translateY(0);
                }
            }
            @keyframes lineAnimation{
                0% {
                    height:0;
                }
                100% {
                    height:72%;                    
                }
            }
            .crossForSearchMobile{
                font-size: 3rem;
                display: inline-block;
                position: absolute;
                right: 0;
                top: 8px;
                cursor:pointer;
            }
            .searchResultsTab{
                display:none;
            }
            @media only screen and (max-width: 1025px){
                .searchResultsTab{
                    display:block;
                }
                .announcementTabletAndBelow{
                    display:block;
                }
                .exploreMenuContainer{
                    width:50%;
                }
                .thirdPanel{
                    width:50%;
                }
                .secondPanel{
                    padding-top: 6rem;
                    position:absolute;
                    width:calc(50% - 6.4rem);
                    left:6.4rem;
                    transition: transform 0.15s linear;
                    transform:translateX(-100%) translateX(-6.4rem);
                }
                .secondPanel.showTab{
                    transform:translateX(0);
                }
                .exploreActive .secondPanelWrapper::after{
                    display:none;
                }
                .secondPanel.userExploring .secondTier {
                    padding-top: 6rem;
                    padding-left: 0;
                    padding-bottom: 20rem;
                }
                .secondPanel.userExploring{
                    padding-top:6rem;
                }
                .secondPanelBackTab{
                    display:block;
                    padding-left: 0;
                    padding-right: 5.2rem;
                }
                .secondPanelBackCaret{
                    margin-right:0.8rem;
                }
                .exploreActive .secondPanelWrapper::before {
                    top: 0;
                }
                @keyframes lineAnimation{
                    0% {
                        height:0;
                    }
                    100% {
                        height:85%;                    
                    }
                }
            }
            @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .secondPanel{
                    width:calc(50% - 2rem);
                    left:2rem;
                }
                .countryAndLang.desktop{
                    left:2rem;
                }
            }
            @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .exploreActive .countryAndLangMobile{
                    display:block;
                }
                .countryAndLangMobile > div:first-child{
                    width: 45%;
                }
                .countryAndLangMobile{
                    position:fixed;
                    bottom:0;
                    left:0;
                    z-index:1000;
                    padding-top:2.2rem;
                    padding-bottom:2.2rem;
                    background:#ffffff;
                    width:100%;
                    display: flex;
                    justify-content: space-between;
                }
                .mobileNav .closeButton{
                    font-size:1.6rem;
                    line-height:2.4rem;
                }
                .exploreMenuContainer{
                    padding-top: 1.6rem;
                    padding-left: 0;
                    padding-right: 0;
                    padding-bottom: 17rem;
                }
                .crossForSearchMobile{
                    top: 3px;
                }
                .searchSubmit{
                    padding-right: 2px;
                }
                .backToExplore{
                    margin-bottom:3.2rem;
                }
                .carecontent{
                    font-size:1.2rem;
                    letter-spacing:1px;
                }
                .heading{
                    padding-right:1px;
                }
                .items{
                    display:flex;
                    margin-bottom:3.2rem;
                }
                .logoInMenu{
                    height:2.4rem;
                    width:1.2rem;
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                }
                .searchBarMobile input{
                    border:none;
                    padding: 0;
                    font-size:1.6rem;
                    padding:0 0 0.5rem 0;
                    margin-left: 3.2rem;
                    position:relative;
                    line-height: 24px;
                    width: calc(100% - 5rem);
                }
                .searchBarMobile{
                    margin-bottom:4rem;
                    border-bottom: 1px solid #000000;
                }
                .searchError .searchBarMobile{
                    border-bottom: none;
                }
                .searchLogoMobile{
                    position:absolute;
                    top:3px;
                    left:0;
                    width:1.6rem;
                    height:1.6rem;
                }
                .defaultImgMobile{
                    margin-bottom:1.6rem;
                }
                .exploreMenuWrapper{
                    display:flex;
                    overflow-x:hidden;
                }
                .exploreMenuContainer{
                    width:100%;
                }
                .searchWindowActive.exploreMenuWrapper{
                    display:block;
                } 
                .searchWindowActive .exploreMenuContainer{
                    padding-bottom:0;
                    height:100%;
                }
                .searchWindowActive .searchBarMobile{
                    margin-bottom:3.2rem;
                }
                .secondPanel, .thirdPanel{
                    width:100%;
                }
                .thirdPanel, .secondPanel{
                    display:none;
                }
                .mobilePanel{
                    padding-bottom: 8rem;
                    padding-top:1.6rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: white;
                    width: 100%;
                    height: 100%;
                    transform: translateX(100%);
                    transition:all 0.15s linear;
                    overflow:scroll;
                }
                .mobilePanel.show{
                    transform: translateX(0%);
                }
                .backArrow{
                    margin-right:0.8rem;
                }
                .backButton{
                    margin-bottom:3.2rem;
                }
                .storeImg{
                    margin-bottom:1.6rem;
                }
                .subHeading{
                    color:black;
                }
                .plusWrapper{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
                .plus{
                    position:relative;
                }
                .plus::after{
                    position:absolute;
                    content:"";
                    top:50%;
                    right:0;
                    transform:translateY(-50%);
                    height:1px;
                    width:2rem;
                    background:#000000;
                    transition:all 0.3s ease-out;
                }
                .plus::before{
                    position:absolute;
                    content:"";
                    top:50%;
                    right:1rem;
                    transform:translate(50%, -50%);
                    height:2rem;
                    width:1px;
                    background:#000000;
                    transition:all 0.3s ease-out;
                }
                .subHeading.current .plus::after{
                    opacity:0;
                } 
                .subHeading.current .plus::before{
                    transform:rotate(90deg) translateX(-1rem);
                }
                .productDetails{
                    margin-top:1.6rem;
                }
                .seeAllLink{
                    text-align:center;
                    margin-top:3.2rem;
                    margin-bottom:3.2rem;
                }
                .seeAllArrow{
                    display:inline-block;
                    margin-left:0.8rem;
                }
                .countryAndLang.desktop{
                    display:none;
                }
                .countryAndLang{
                    //position:static;
                    font-size:1.2rem;
                    margin-top:4.8rem;
                    margin-bottom:0rem;
                    padding:2.2rem 0rem;
                    padding-right:2px;
                    background:white;
                    justify-content:space-between;
                }
                .imgHeading{
                    margin-bottom:4rem;
                }
                .signUpText{
                    line-height:2rem;
                    letter-spacing:0.1rem;
                }
                .signUpText a{
                    text-decoration:underline;
                }
                .mobilePanel{
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                }
                .productPrice{
                    color: #787878;
                }
            }
            `}</style>  
        </>
    )
}
function mapStateToProps({common,exploreMenu,cache,selection}){
    return {common,exploreMenu,cache,selection}
}
export default connect(mapStateToProps,{setSearch,setSearchQuery,showExploreMenu,setIndexValue,setIndexValue2,setPanelTwoData,setPanelThreeData,setActiveTier2Item,setActiveTier1Item,showSearchWindow,preventBodyScroll,fetchAllMenuProducts,setMenuProductsPricelist})(ExploreMenu)