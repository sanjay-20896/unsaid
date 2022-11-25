import React, {useState, useEffect, useRef} from 'react'
import Layout from '../../components/layout'
import { connect } from 'react-redux'
import StoreSubNavigation from '../../components/storeSubNavigation'
import StoresMenu from '../../components/storesMenuStatic'
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../../config'
import { useRouter } from 'next/router'
import LazyImage from '../../components/lazyImage'
import SEO from '../../components/SearchEngineOptimisation'
import {getDynamicMenuAndFooterInfo, getImageUrl} from "../../functions"
import { paddingLeftMobile, paddingRightMobile } from '../../data/cssVariables'
import useTranslation from 'next-translate/useTranslation'
function store(props) {
    const router = useRouter();
    const {t}=useTranslation('common');
    const [hideFilter, setHideFilter] = useState(false)
    const [filterSticky, setFilterSticky] = useState(false)
    const filterRef = useRef();
    const pageContent = useRef();
    let storeDetails = props?.common?.menuItems?.menu?.find(item => item.tier2action=="stores").storeDetails;
    
    function scrollHandler() { 
        if(filterRef?.current?.getBoundingClientRect().top <= 0 && pageContent?.current?.getBoundingClientRect().bottom <= 100){
            setHideFilter(true)
        }else if(filterRef?.current?.getBoundingClientRect().top <= 0 && pageContent?.current?.getBoundingClientRect().bottom > 100 ){
            setFilterSticky(true)
            setHideFilter(false)
        }else{
            setFilterSticky(false)
            setHideFilter(false)
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

    function scrollTo(){
        pageContent.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    let title=t('ourStore')
    let description=title;
    let image="/images/store1.png"
    return (
        <>
        <SEO title={title} description={description} image={image}/>
        <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            <div ke={`store_${router.locale}`} className={`store standardPaddingBottom ${hideFilter?"hideSubNav":""} ${filterSticky?"subNavFix":""}`} ref={pageContent}>
                <div className="showForMobile mobileDetails paddedContent">
                    <div className="leftCol1">
                        <div className="listHeading anoHalfRegular">{t('callUs')}</div>
                        <div className="listValue anoHalfRegular phone font16-notResponsive"><a href={`tel:32484929295`}>+32 484 929 295</a></div>
                    </div>
                    <div className="leftCol2">
                        <div className="listHeading anoHalfRegular">{t('writeToUs')}</div>
                        <div className="listValue anoHalfRegular email font16-notResponsive"><a href={`mailto:hello@unsaid.com`}>hello@unsaid.com</a></div>
                    </div>
                </div>
                {!!storeDetails && !!storeDetails.storeDetails &&
                    <div ref={filterRef} className="subNav">
                        <StoreSubNavigation
                            subNavFix={filterSticky}
                            scrollToAppointment={()=>scrollTo()}
                            storeDetails={storeDetails.storeDetails}
                        />
                    </div>
                }
                {!!storeDetails && !!storeDetails.storeDetails &&
                    <>
                        {storeDetails.storeDetails.map((store,id)=>{
                            return(
                                <>
                                    {store?.display && 
                                        <div key={id} className={`storeDetails ${id===0?"one":""}`}>
                                            <div className="left">
                                                <LazyImage 
                                                    alt="Unsaid Store Antwerp"
                                                    originalSrc={getImageUrl(store.storeImgStorePage)} 
                                                    placeholderSrc={getImageUrl(store.storeImgStorePage,10)}
                                                    width={427} 
                                                    height={516} 
                                                />
                                            </div>
                                            <div className="right positionRelative">
                                                <StoresMenu 
                                                    type2={true}
                                                    // storeDetails={stores3}
                                                    // unlinkToPage={true}
                                                    // storeTimings={storeTimings2}
                                                    store={store}
                                                />
                                            </div>
                                        </div>
                                    }
                                </>
                            )
                        })}
                    </>
                }
            </div>
            <style jsx>{`
                .phone,.email{
                    cursor:pointer;
                }
                .store{
                    padding-top:11.2rem;
                }
                .hideSubNav .subNav{
                    display:none;
                }
                .widget{
                    background:#F5F5F5;
                    height:53.4rem;
                    width:100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .storeDetails{
                    display:flex;
                    align-items:center;
                    margin-top:11.2rem;
                }
                .subNavFix .storeDetails.one{
                    margin-top:16.4rem;
                }
                .left{
                    padding-right:12px;
                }
                .right{
                    padding-left:12.3rem;
                }
                .left,.right{
                    width:50%;
                }
                .storeDetails{
                    padding:0 12.15%;
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .right{
                        padding-left:8.3rem;
                    }
                    .storeDetails{
                        padding:0 6.15%;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .store.standardPaddingBottom{
                        padding-bottom: 20rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .store{
                        padding-top:4.8rem;
                    }
                    .store.standardPaddingBottom{
                        padding-bottom: 8.8rem;
                    }
                    .storeDetails{
                        display:block;
                        margin-top:4.8rem;
                    }
                    .left,.right{
                        width:100%;
                    }
                    .right{
                        padding-left:0rem;
                    }
                    .left{
                        padding-right:0px;
                        margin-bottom:2rem;
                    }
                    .subNavFix .storeDetails.one{
                        margin-top:12.4rem;
                    }
                    .storeDetails{
                        padding-left: ${paddingLeftMobile};
                        padding-right: ${paddingRightMobile};
                    }
                    .listHeading{
                        margin-bottom:0.4rem;
                    }
                    .leftCol1 .listValue{
                        margin-bottom:3.2rem;
                    }
                    .leftCol2 .listValue{
                        margin-bottom:3.4rem;
                    }
                }
            `}</style>
        </Layout>
        </>
    )
}
function mapStateToProps({common,exploreMenu}){
    return {common,exploreMenu}
}
export default connect(mapStateToProps,null)(store);

export async function getServerSideProps({locale}){
    let error = false
    let commonProps=null
    try{
        commonProps = await getDynamicMenuAndFooterInfo(locale)
        return {props:{commonProps}}
    }catch(err){
        error = true
        return {
            props:{
                error
            }
        }

    }
}