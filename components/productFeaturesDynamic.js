import React, { useState,useRef,useEffect } from 'react'
import Sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Expandable2 from '../components/expandable2';
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, SUB_NAV_HEIGHT_DESKTOP,SUB_NAV_HEIGHT_MEDIUM, SUB_NAV_HEIGHT_TABLET, TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { paddingLeftDesktop, paddingLeftMedium, paddingLeftMobile } from '../data/cssVariables';
import {connect} from 'react-redux'
import BlockContent from '@sanity/block-content-to-react'
import { serializers } from "../serialiser";
import SizeGuide from '../components/sizeGuide'
import LazyImage from './lazyImage'
import {getImageUrl} from "../functions"
import useTranslation from 'next-translate/useTranslation'
function ProductFeatures(props) {
    const {t}=useTranslation('common');
    const [imgLoaded, setImgLoaded] = useState(false)
    const [expandableActive, setExpandableActive] = useState([]);
    const [featuresImagePosition,setFeaturesImagePosition] = useState("top")
    const [fixImage,_setFixImage] = useState(true)
    const featuresRef=useRef()
    const featuresEndRef=useRef()
    const detailsRef=useRef()
    const deliveryAndReturns = useRef(null)
    const giftingAndPackaging = useRef(null)
    const careAndWarranty = useRef(null)
    const triggerLastLineRef=useRef();
    const fixImageRef = React.useRef(fixImage);
    const featuresImg = React.useRef(fixImage);
    const setFixImage = data => {
        fixImageRef.current = data;
        _setFixImage(data);
    };
    const scrollHandler = ()=> {
        if(detailsRef?.current?.getBoundingClientRect().height > window.innerHeight){
            let featuresTop = featuresRef.current.getBoundingClientRect().top
            let featuresEndTop = featuresEndRef.current.getBoundingClientRect().top
            // console.log('features end top',featuresEndTop)
            if(featuresTop < 500){
                setImgLoaded(true)
            }
            if((window.innerWidth > MOBILE_BREAKPOINT) && fixImageRef.current){
                let featuresImgHeight = featuresImg?.current?.getBoundingClientRect().height            
                let subNavHeight = SUB_NAV_HEIGHT_DESKTOP
                // console.log('bottom:',featuresImgHeight + subNavHeight)
                if(window.innerWidth <= MEDIUM_BREAKPOINT)
                    subNavHeight = SUB_NAV_HEIGHT_MEDIUM
                if(window.innerWidth <= TABLET_LANDSCAPE_BREAKPOINT)
                    subNavHeight = SUB_NAV_HEIGHT_TABLET
                if(featuresTop <= subNavHeight && featuresEndTop >= featuresImgHeight + subNavHeight){
                    // console.log('fixed')
                    setFeaturesImagePosition("fixed")
                } else if(featuresEndTop <= featuresImgHeight + subNavHeight) {
                    // console.log('bottom')
                    setFeaturesImagePosition("bottom")
                } else {
                    // console.log('top')
                    setFeaturesImagePosition("top")
                }        
            } else {
                setFeaturesImagePosition("top")
            }
        } else {
            setFeaturesImagePosition("top")
        }
    }
    useEffect(()=>{
        if(props.sizeGuideOpen){
            // let newExpandableActive = JSON.parse(JSON.stringify(expandableActive))
            // newExpandableActive.push("sizeGuide")
            setExpandableActive(["sizeGuide"])
        }
    },[props.sizeGuideOpen])
    useEffect(()=>{
        scrollHandler()
    },[expandableActive])
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, false);
        return () => {
            window.removeEventListener("scroll", scrollHandler, false);
        };
    }, []);
    // let specs = getNestedObject(props,["productFeaturesData","productSpecification"])
    let featuresImage = !!props.variantContent && props.variantContent.productFeaturesImage? getImageUrl(props.variantContent.productFeaturesImage,858):null
    if(!featuresImage){
        let standardMedia = props?.currentSelectedProduct?.media?.standard
        if(standardMedia)
            featuresImage = standardMedia[0]
    }
    function expandClick(name){
        let newExpandableActive = JSON.parse(JSON.stringify(expandableActive))
        let i = newExpandableActive.findIndex(activeName=>activeName==name)
        if(i > -1)
            newExpandableActive.splice(i,1)
        else
            newExpandableActive.push(name)
        setExpandableActive(newExpandableActive)
    }
    return (
        <>
         <div ref={featuresRef} className={`positionRelative paddedContent imgLoaded ${imgLoaded?"":""}`}>
            <div className="subNavReplicate"></div>
            <div className="features">
                <div className="featuresImage hideForMobile positionRelative">
                    <div className={`imgWrap ${featuresImagePosition}`}>
                        <div className="imgWrapper" ref={featuresImg}>
                            {!!props.f1 &&
                                <div className={`imgContainer`} onClick={()=>props.showGalleryModal({status:true,imageType:"f1"})}>
                                    <LazyImage 
                                        alt="Product Features"
                                        originalSrc={props.f1} 
                                        placeholderSrc={props.f1Blur}
                                        width={858} 
                                        height={858} 
                                        bgColor="transparent"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div ref={detailsRef} className="details">
                    <h2 style={{animationDelay:"0.1s"}} className="sectionHeading anoHalfRegular font20">{t('features')}</h2>
                    <h1 style={{animationDelay:"0.2s"}} className="mainHeading canelaThin font32">{props.currentSelectedProduct?.variant_description_2_value}</h1>
                    <h3 style={{animationDelay:"0.3s"}} className="content anoHalfRegular font16 mobileFont16" dangerouslySetInnerHTML={{__html: props.currentSelectedProduct?.variant_sub_description_2_value}}></h3>
                    <div ref={triggerLastLineRef} className="expandableSection">
                        {props.currentSelectedProduct?.product_more_details_value &&
                            <div onClick={()=>expandClick("moreDetails")} style={{animationDelay:"0.4s"}} key={`expandable_section_0`}>
                                <Expandable2 borderTop={true} expand={expandableActive.includes("moreDetails")} heading={t('moreDetails')} content={<div className="anoHalfRegular font16 mobileFont16" dangerouslySetInnerHTML={{__html: props.currentSelectedProduct.product_more_details_value}}></div>} />
                            </div>  
                        }
                        {!!props.sizeGuide &&
                            <div onClick={()=>expandClick("sizeGuide")} style={{animationDelay:"0.6s"}} key={`expandable_section_1`}>
                                <Expandable2 borderTop={true} expand={expandableActive.includes("sizeGuide")} heading={t('sizeGuide')} content={<SizeGuide sizeGuide={props.sizeGuide} currentSize={props.currentSize} sizeClicked={props.sizeClicked} />} />
                            </div>  
                        }
                        {props.common?.globalSettings?.deliveryAndReturns &&
                            <div ref={deliveryAndReturns} onClick={()=>expandClick("deliveryAndReturns")} style={{animationDelay:"0.8s"}} key={`expandable_section_deliveryAndReturns`}>
                                    <Expandable2 borderTop={true} expand={expandableActive.includes("deliveryAndReturns")} heading={props.common.globalSettings.deliveryAndReturns.heading} content={
                                            <div className="anoHalfRegular font16 mobileFont16 deliveryText">
                                                <BlockContent serializers={serializers} blocks={props.common.globalSettings.deliveryAndReturns.text} />
                                            </div>
                                        }
                                    />
                            </div>  
                        }
                        {props.common?.globalSettings?.giftingAndPackaging &&
                            <div ref={giftingAndPackaging} onClick={()=>expandClick("giftingAndPackaging")} style={{animationDelay:"1s"}} key={`expandable_section_giftingAndPackaging`}>
                                    <Expandable2 borderTop={true} expand={expandableActive.includes("giftingAndPackaging")} heading={props.common.globalSettings.giftingAndPackaging.heading} content={
                                            <div className="anoHalfRegular font16 mobileFont16">
                                                <BlockContent serializers={serializers} blocks={props.common.globalSettings.giftingAndPackaging.text} />
                                            </div>
                                        }
                                    />
                            </div>  
                        }
                        {props.common?.globalSettings?.careAndWarranty &&
                            <div ref={careAndWarranty} onClick={()=>expandClick("careAndWarranty")} style={{animationDelay:"1.2s"}} key={`expandable_section_careAndWarranty`}>
                                    <Expandable2 borderTop={true} borderBottom={true} expand={expandableActive.includes("careAndWarranty")} heading={props.common.globalSettings.careAndWarranty.heading} content={
                                            <div className="anoHalfRegular font16 mobileFont16">
                                                <BlockContent serializers={serializers} blocks={props.common.globalSettings.careAndWarranty.text} />
                                            </div>
                                        }
                                    />
                            </div>  
                        }
                    </div>
                </div>
            </div>
         </div> 
         <div ref={featuresEndRef}></div>  
         <style jsx>{`
            .features{
                display:flex;
                overflow: hidden;
            }
            .content{
                margin-bottom:4.8rem;
            }
            .featuresImage{
               background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
               width:50%; 
            }
            .imgWrap{
                position:absolute;
                left:0;
                width:100%;
            }
            .imgWrapper{
                padding-top: 112%; 
                width:100%;
            }
            
            .imgContainer{
                cursor: ${props.imageClickOpensGalleryModal?`url("/images/galleryOpen.svg"), auto`:"auto"};
                position:absolute;
                top:0;
                left:0;
                width:100%; 
                transform:translateY(2rem);
                opacity:0;
                transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .1s,transform 1.2s cubic-bezier(.215,.61,.355,1) .1s;
            }
            .imgWrap.top{
                top:0;
            }
            .imgWrap.bottom{
                bottom:1rem;
            }
            .imgWrap.fixed{
                position:fixed;
                top:${SUB_NAV_HEIGHT_DESKTOP}px;
                left:${paddingLeftDesktop};
                width:calc(50% - ${paddingLeftDesktop});
                z-index:101;
            }
            .imgLoaded .imgContainer{
               transform:translateY(0);
               opacity:1;
            }
            .details{
                padding:6.4rem 8%;
                width:50%;
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
                transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .0s,transform 1.2s cubic-bezier(.215,.61,.355,1) .0s;
                -ms-overflow-style: none;  
                scrollbar-width: none;  
            }
            .details::-webkit-scrollbar {
                display: none;
            }
            .details>*{
                opacity:0;
            }
            .imgLoaded .details>*{
                animation:fadeIn 1.2s cubic-bezier(.215,.61,.355,1) forwards;
            }
            .details .expandableSection>*{
                opacity:0;
            }
            .imgLoaded .details .expandableSection>*{
                animation:fadeIn 1.2s cubic-bezier(.215,.61,.355,1) forwards;
            }
            .sectionHeading{
                margin-bottom:3.2rem;
            }
            .mainHeading{
                margin-bottom:2.4rem;
            }
            @keyframes fadeIn{
                from{
                    opacity:0;
                    transform:translateY(1rem);
                }
                to{
                    opacity:1;
                    transform:translateY(0);
                }
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .imgWrap.fixed{
                    top:${SUB_NAV_HEIGHT_MEDIUM}px;
                    left:${paddingLeftMedium};
                    width:calc(50% - ${paddingLeftMedium});
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .imgWrap.fixed{
                    top:${SUB_NAV_HEIGHT_TABLET}px;
                    left:${paddingLeftDesktop};
                    width:calc(50% - ${paddingLeftDesktop});
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .imgWrap.fixed{
                    top:${SUB_NAV_HEIGHT_TABLET}px;
                    left:${paddingLeftMobile};
                    width:calc(50% - ${paddingLeftMobile});
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .details{
                    width:100%;
                    background: #ffffff;
                    padding:0 0;
                    height:auto;
                }
                .sectionHeading{
                    font-size:1.4rem;
                    line-height:2rem;
                    margin-bottom:1.6rem;
                }
                .mainHeading{
                    font-size:2.4rem;
                    margin-bottom:1.6rem;
                }
                .content{
                    margin-bottom:1.6rem;
                }
                .features{
                    min-height:auto;  
                }
                .fixContainer .features{
                    background:#ffffff;
                    position:static;
                    left:0;
                    top:5.2rem;
                    z-index:9;
                    padding:0 0rem;
                    height:auto;
                }
            }
         `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(ProductFeatures)