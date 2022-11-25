import React, {useEffect, useState} from 'react'
import SwipeableViews from 'react-swipeable-views';
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import SimpleProductListing from './simpleProductListingDynamic'
import imageUrlBuilder from "@sanity/image-url";
import Sanity from './../sanity'
import { connect } from 'react-redux';
import { plpPaths } from '../branch-specific-config';
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {setFilterStickyGlobal} from '../redux/actions'
import LazyImage from './lazyImage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import TextAndArrowCta from './textAndArrowCta'
import { paddingLeftMobile } from '../data/cssVariables';
import { getImageUrl } from "./../functions"
function ExploreProducts(props) {
    // console.log("explore ",props)
    let collectionId=!!props.collection?props.collection:null
    let collectionFilterValues=props?.common?.plpPaths.find(data=>data.filterType=="collection")
    collectionFilterValues = collectionFilterValues?collectionFilterValues.filterValues:[]
    let collectionData=collectionFilterValues.find(c=>c.id==collectionId)
    // console.log(collectionData)
    let collectionUri=!!collectionData? collectionData.uri:null
    let name=!!collectionData ? collectionData.name:null
    let uri=`/collections/${collectionUri}`
    let selectedMaterial=null;
    useEffect(() => {
        if(props.cookieConsent.functional){
            let metalColorChoice=localStorage.getItem("preferredMetalChoice");
            if(!!metalColorChoice){
                selectedMaterial=metalColorChoice
                // products=products.filter(p=>{
                //     return p.materials_available.includes(metalColorChoice)
                // })
            }else{
                selectedMaterial=null;
            }
        }
        
    },[])
    // console.log("collection uri",collectionUri)
    // console.log("collection data",collectionData)
    // console.log("explore uri",uri)
    const [index, setIndex] = useState(0)
    const [indexMobile, setIndexMobile] = useState(0)
    const [activeIndex,setActiveIndex]=useState(0)
    const [autoPlay,setAutoplay]=useState(true)
    const router=useRouter()

    
    // const indexRef = React.useRef(index);
    // const setIndex = data => {
    //     indexRef.current = data;
    //     _setMyState(data);
    // };

    let autoPlayTimer;
    function getDevice(){
        let device = ""
        if(props.common.windowWidth <= MOBILE_BREAKPOINT)
            device = "mobile"
        else if(props.common.windowWidth > MOBILE_BREAKPOINT && props.common.windowWidth <= TABLET_PORTRAIT_BREAKPOINT)
            device = "tab_portrait"
        else 
            device = "desktop"
        return device
    }
    let device=getDevice()

    function handleChangeIndex(index){
        setIndex(index)
    }
    function handleChangeIndexMobile(index){
        setIndexMobile(index)
    }
    function autoSlide(){
        if(!!props.moreCollections){
            if(index>=0 && index<props.moreCollections.length-1){
                setIndex(index+1)
            }
            if(index===props.moreCollections.length-1){
                setIndex(0)
            }
        }
        
    }
    // useEffect(()=>{
    //     if(autoPlay){
    //         autoPlayTimer=setTimeout(()=>autoSlide(),3000)
    //     }
    // },[index])
    let springConfig={
        duration: "0.3s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    let stylePadding={};
    let slidePadding={};

    
    if(device==="desktop"){
        stylePadding={
            padding:"0 37.4rem 0 6.4rem"
        }
        slidePadding={
            padding:"0 24px 0 0"
        }
    }else if(device==="tab_portrait"){
        stylePadding={
            padding:"0 22.4rem 0 6.4rem"
        }
        slidePadding={
            padding:"0 1.6rem 0 0"
        }
    }else{
        stylePadding={
            padding:"0 2.4rem 0 3.6rem"
        }
        slidePadding={
            padding:"0 1.6rem 0 0"
        }
    }
    let style={}
    function handleClick(i,href){
        setAutoplay(false)
        clearTimeout(autoPlayTimer)
        setIndex(i)
        // router.push(!!href?href:"#")
        if(index==i){
            // location.href = href;
            router.push(!!href?href:"#")
        }
    }
    
    return (
        <>
         <div className= {`exploreProducts ${!!props.products?"productPage":""}`}>
            <div className="exploreHeading font32 canelaThin">{props.heading}</div>
            <div className="showForMobile sliderModifyMobile">
            {!!props.moreCollections &&
                <SwipeableViews style={stylePadding} slideStyle={slidePadding} index={indexMobile} onChangeIndex={(i)=>handleChangeIndexMobile(i)} springConfig={springConfig}>
                    {Array.isArray(props.moreCollections) && props.moreCollections.map((collection,i)=>{
                        return(
                            <div className={`collectionWrapper ${i==indexMobile-1?"previous":""}`} style={Object.assign({},style.stylePadding,style.slidePadding)} key={`moreCollectionsItem_${i}`}>
                                <Link href={!!collection?.link?collection.link:"#"}><a>
                                    <div>
                                        <div className="imgWrapper" >
                                            <LazyImage 
                                                alt={collection.title}
                                                originalSrc={getImageUrl(collection.image,1304)}
                                                placeholderSrc={getImageUrl(collection.image,20)}
                                                width={1304} 
                                                height={733} 
                                            />
                                        </div>
                                        <div className="collectionHeading font20 canelaThin black">{collection.title}</div>
                                        {/* <div className="collectionContent font16-notResponsive anoRegular grey">{collection.description}</div> */}
                                    </div>
                                </a></Link>
                            </div>
                        )
                    })}
                </SwipeableViews>
            }
            </div>
            <div className="hideForMobile sliderModifyDesktop">
            {!!props.moreCollections &&
                <SwipeableViews style={stylePadding} slideStyle={slidePadding} index={index} onChangeIndex={(i)=>handleChangeIndex(i)} enableMouseEvents>
                    {Array.isArray(props.moreCollections) && props.moreCollections.map((collection,index)=>{
                        return(
                            // <Link href={collection.link}><a>
                            <>
                            <div onClick={()=>{handleClick(index,collection.link)}} className="collectionWrapper cursorPointer" key={`moreCollectionsItemDesktop_${index}`}>
                                <div className="imgWrapper">
                                    <LazyImage 
                                        alt={collection.title}
                                        originalSrc={getImageUrl(collection.image,2000)}
                                        placeholderSrc={getImageUrl(collection.image,20)}
                                        // width={1304} 
                                        // height={733} 
                                        width={2000} 
                                        height={1124} 
                                        
                                    />
                                </div>
                                <div className="collectionHeading font20 canelaThin black" >{collection.title}</div>
                                {/* <div className="collectionContent font16-notResponsive anoRegular grey">{collection.description}</div>
                                <Link href={collection.link}><a>
                                <div className="font16 readMore">
                                    <TextAndArrowCta text="Read more" />
                                </div>
                                </a></Link> */}
                            </div>
                            </>
                        )
                    })}
                </SwipeableViews>
            }
            </div>
         </div>  
            {!!props.desktopUpsellProducts && props.mobileUpsellProducts && 
                <div>
                    <SimpleProductListing products={props.products} desktopUpsellProducts={props.desktopUpsellProducts} mobileUpsellProducts={props.mobileUpsellProducts}  limitProducts={props.limitProducts} uri={uri} name={name} selectedMaterial={selectedMaterial}/>
                </div>    
            } 
         <style jsx>{`
            .exploreProducts{
                padding-left:6.4rem;
                //padding-right:4.44%;
            }
            .sliderModifyDesktop{
                margin-left:-6.4rem;
            }
            .exploreHeading{
                margin-bottom:3.2rem;
            }
            .imgWrapper{
                margin-bottom:3.2rem;
                // cursor:default;
            }
            .collectionHeading{
                margin-bottom:1.2rem;
                // cursor:default;
            }
            .collectionContent{
                // cursor:default;
            }
            .readMore{
                margin-top:1.2rem;
            }
            .collectionWrapper{
                padding-right:2.4rem;
            }
            .collectionWrapper:last-child{
                padding-right:0rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .exploreProducts{
                    padding-left:${paddingLeftMobile};
                }
                .collectionWrapper.previous .collectionHeading,
                .collectionWrapper.previous .collectionContent{
                    opacity:0;
                    transition:opacity 0.3s ease-out 0.3s;
                }
                .sliderModifyMobile{
                    margin-left:-3.6rem;
                }
                .exploreHeading{
                    margin-bottom:2.4rem;
                }
                .productPage .exploreHeading{
                    margin-bottom:3.2rem;
                }
                .collectionContent{
                    letter-spacing:0.5px;
                }
                .imgWrapper{
                    margin-bottom:1.6rem;
                }
            }
         `}</style>
        </>
    )
}

function mapStateToProps({common,selection,cookieConsent}){
    return {common,selection,cookieConsent}
}

export default connect(mapStateToProps,{setFilterStickyGlobal})(ExploreProducts)