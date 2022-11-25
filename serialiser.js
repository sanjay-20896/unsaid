import React, { useState,useEffect } from 'react'
import Sanity from './sanity'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Quote from "./components/quote"
import TextArray from "./components/textArray"
import ImageColumn  from "./components/imageColumn"
import ImageShop from './components/imageShop'
import ImageRightQuote from './components/imageLeftQuote'
import ImageLeftQuote from './components/imageRightQuote'
import ArticleLinkItem from './components/articleLinkItem'
import ArticleVideoSection from './components/articleVideoSection'
import StoryTelling from './components/storyTelling'
import GiftingTextAndImage from './components/GiftingTextAndImage'
import ImageShopWithTopText from './components/ImageShopWithTopText'
import ImageSlider from './components/imageSlider'
import HotspotModule from './components/hotspotModuleDynamic';
import Expandable from './components/expandable';
import HeadingAndContent from './components/headingAndContent';
import RichContentCards from './components/RichContentCards';
import ExploreProducts from './components/exploreProductsDynamic'
import TwoColumnData from './components/twoColumnData'
import Space  from './components/space';
import { MOBILE_BREAKPOINT,SANITY_WEBP_STRING,SANITY_STRING } from './config';
import ArticlePassion from './components/articlePassion';
import ContentItem from './components/contentItem';
import Video from './components/video';
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from './branch-specific-config'
import SingleImage from './components/singleImage';
import BlockContent from '@sanity/block-content-to-react'
import {getImageUrl} from "./functions"
import RichTextArray from "./components/RichTextArray"
import { paddingLeftMobile, paddingRightMobile } from './data/cssVariables';
import Link from "next/link"
import CollectionsDynamic from './components/collectionsDynamic';
import AllBoxListing from './components/AllBoxListing';
import useTranslation from 'next-translate/useTranslation'

export const serializers = 
{
    marks: {
        link: (p)=>{
            return (
                <>
                    {!!p.mark.href ?  
                        <Link href={p.mark.href}><a className="serialiserA underlineLR active">{p.children}</a></Link>
                    :
                        <a className='serialiserA underlineLR active' href={p.mark.link} target="_blank">{p.children}</a>
                    }
                </>
            )
        } 
    },
    types:{
        giftBoxCollection:(p)=>{
            // console.log("giftBoxCollection",p.node);
            return(
                <>
                    <div className="giftBoxCollection standardPaddingBottom">
                        <div><AllBoxListing data={p.node.giftBoxes} marginBottom="type110"/></div>
                    </div>
                </>
            )
        },
        giftingPageSlider:(p)=>{
            // console.log("giftingPageSlider",p.node);
            let collections=[];
            p.node?.giftingSteps.forEach(item => {
                let obj={
                    description:item.description,
                    heading:item.title,
                    imageDesktop:item.image,
                    imageMobile:item.image,
                    imageTablet:item.image,
                    navItem:item.label,
                }
                collections.push(obj)
            });
            return(
                <>
                    <div className="slider standardPaddingBottom">
                        <CollectionsDynamic objectFitCover={true} collections={collections} />
                    </div>
                </>
            )
        },
        storyTelling:(p)=>{
            let images=[];
            !!p.node.story.imageCollection && p.node.story.imageCollection.forEach(image=>{
                let obj = {};
                obj.img1=getImageUrl(image.potraitImage)
                obj.img=getImageUrl(image.potraitImage,310)
                obj.imgPlaceholder=getImageUrl(image.potraitImage,20)
                obj.imgWidth=199
                obj.imgHeight=353
                images.push(obj)
            })
            let imageDetails=[];
            !!p.node.story.imageCollection && p.node.story.imageCollection.forEach(image=>{
                let obj2 = {};
                obj2.belowText=image.text;
                obj2.linkText=image.label;
                obj2.link=image.url;
                imageDetails.push(obj2)
            })
            
            return(
                <div className="standardPaddingBottom">
                    <ArticlePassion
                        smallText={p.node.story.title}
                        largeText={p.node.story.mainDescription}
                        desc={p.node.story.subDescription}
                        images={images.length>0 ? images : ""}
                        imageDetails={imageDetails}
                    />
                </div> 
            )
        },
        storyDataSection:(p)=>{
            // console.log("story data section",p.node)
            return (
                <>
                    {p.node?.storyData &&
                        <div className="standardPaddingBottom">
                            <ContentItem
                                items={p.node.storyData}
                            />
                        </div>
                    }
                </>
            )
        },
        videoDescription:(p)=>{
            // console.log("video description",p.node)
            return (
                <>
                {!!p.node?.videoAndDescription &&
                <div>
                    <TwoColumnData giftData={p.node.videoAndDescription}/>
                    <Space height="22.4rem" mobileHeight="9.6rem"/> 
                </div>}
               
                </>
            )
        },
        content:(p)=>{
            
            // console.log("explore items",p)
            return (
                <>
                {/* <div className="standardPaddingBottom">
                    {!!p.node?.items && p.node?.heading &&
                        <ExploreProducts moreCollections={p.node?.items} heading={p.node?.heading}/>}
                </div> */}
                </>

            )
        },
        columndata:(p)=>{
            // console.log("column data",p.node)
            return (
                <>
                     {!!p.node?.columnData &&
                     <div id={p.node.scrollToId} className='standardPaddingBottom'>
                        <RichContentCards
                            richContentCards={p.node?.columnData}
                        />
                    </div>}
                </>
            )
        },
        quote:(p)=>{
            // console.log("that only",p)
            return (
                <div className="standardPaddingBottom textArrayCenter">
                    <Quote
                        quote={!!p.node?.quotes?.quoteContent ? <BlockContent blocks={p.node.quotes.quoteContent}/>:<p></p>}
                        quoteDesc={!!p.node?.quotes?.desc ? <BlockContent blocks={p.node.quotes.desc}/>:<p></p>}
                        name={p.node?.quotes?.author}
                        quotefontSizeMobile={32}
                    />
                </div>
            )
        },
        textCollection:(p)=>{
            return(
                <>
                <div className="standardPaddingBottom">
                {Array.isArray(p.node.singleText) && p.node.singleText.map((item,index)=>{
                    if(!!item){
                        if(item.position=="center"){
                            return (
                                <>
                                {!!item.textArray && 
                                    <div className="text1 item textArrayCenter">
                                        <TextArray text={item.textArray} descFontSize="font20-notResponsive" textAlignLeft={item?.textAlignLeft}/>
                                    </div>
                                    }    
                                </>
                            )
                        }
                    }
                }
                )}
                </div>
                <style jsx>{`
                .item{
                    margin-bottom:10rem;
                }
                .standardPaddingBottom .item:last-child{
                    margin-bottom:0;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .item{
                        margin-bottom:8rem;
                    }
                }
                
                `}</style>
                </>
            )
        },
        textField:(p)=>{
            if(p.node.position==="center")
            return(
                <>
                    {!!p.node?.textArray && 
                        <div id={p.node.scrollToId} className="text1 standardPaddingBottom textArrayCenter">
                            <TextArray text={p.node?.textArray} descFontSize="font20-notResponsive" textAlignLeft={p.node?.textAlignLeft}/>
                        </div>
                    }
                </>
            )
            else if(p.node.position==="left"){
                return (
                    <>
                        {!!p.node?.textArray && 
                            <div id={p.node.scrollToId} className="text2 standardPaddingBottom textArrayLeft">
                                <TextArray text={p.node.textArray} textAlignLeft={p.node.textAlignLeft} descFontSize="font20"/>
                            </div>
                        }
                    </>
                )
            }
            else{
                return null;
            }
        },
        richTextField:(p)=>{
            // console.log("rich text",p.node)
            if(p.node.position==="center"){
                return (
                    <>
                    {!!p.node?.richTextArray  && 
                    
                        <div className="text1 standardPaddingBottom textArrayCenter">
                            <RichTextArray  text={p.node.richTextArray} textAlignLeft={p.node.textAlignLeft} descFontSize="font20"/>
                        </div>}
                    </>
                )
            }else if(p.node.position==="left"){
                return (
                    <>
                    {!!p.node?.richTextArray  && 
                    <div className="text1 standardPaddingBottom textArrayLeft">
                        <RichTextArray  text={p.node.richTextArray} textAlignLeft={p.node.textAlignLeft} descFontSize="font20"/>
                    </div>}
                    </>
                )
            }else{
                return null;
            }
        },
        imageField:(p)=>{
            // console.log("image field",p.node)
            return (
                <>
                    <div id={p.node.scrollToId} className="standardPaddingBottom">
                       {!!p.node?.images && <ImageColumn images={p.node.images}/>}
                    </div>
                </>
            )
        },
        imageQuote:(p)=>{
            // console.log("image quote",p.node)
            if(p.node.imagePosition=="right"){
                return (
                    <>
                        <div id={p.node.scrollToId} className={`${p.node?.largeImage ? "largeImage":""} rightImgQuote rightImage standardPaddingBottom`}>
                            {!!p.node &&
                                <ImageLeftQuote
                                    largeImage={!!p.node?.largeImage && p.node?.largeImage}
                                    paddingTop={true}
                                    quote={!!p.node.quotes.quoteContent ? <BlockContent blocks={p.node.quotes?.quoteContent}/>:<p></p>}
                                    quoteDesc={!!p.node?.quotes?.desc ? <BlockContent blocks={p.node?.quotes?.desc}/> :<p></p>}
                                    authorRichText={!!p.node?.quotes?.authorRichText && <BlockContent blocks={p.node?.quotes?.authorRichText}/>}
                                    name={p.node.quotes.author}
                                    img={getImageUrl(p.node.authorImageDesktop,!!p.node.width?Math.ceil(p.node.width):309)}
                                    imgPlaceholder={getImageUrl(p.node.authorImageDesktop,20)}
                                    quotefontSizeMobile={32}
                                    height={p.node.height}
                                    width={p.node.width}
                            />}
                        </div>
                        <style jsx>{`
                            .rightImgQuote{
                                padding-left:16%;
                                padding-right:16%;
                            }
                            .rightImgQuote.largeImage {
                                padding-left:10%;
                                padding-right:0%;
                            }
                            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                                .rightImgQuote{
                                    padding-left:${paddingLeftMobile};
                                    padding-right:${paddingRightMobile};
                                }
                                .rightImgQuote.largeImage {
                                    padding-left:${paddingLeftMobile};
                                    padding-right:${paddingRightMobile};
                                }
                            }
                        `}</style>
                    </>
                )
            }else if(p.node.imagePosition=="left"){
                return (
                    <>
                        <div id={p.node.scrollToId} className="rightImgQuote standardPaddingBottom">
                           {p.node && 
                           <ImageRightQuote
                                paddingTop={false}
                                quote={!!p.node.quotes.quoteContent ? <BlockContent blocks={p.node.quotes?.quoteContent}/>:<p></p>}
                                quoteDesc={!!p.node?.quotes?.desc ? <BlockContent blocks={p.node?.quotes?.desc}/> :<p></p>}
                                name={p.node.quotes.author}
                                img={getImageUrl(p.node.authorImageDesktop,!!p.node.width?Math.ceil(p.node.width):309)}
                                imgPlaceholder={getImageUrl(p.node.authorImageDesktop,20)}
                                quotefontSizeMobile={32}
                                height={p.node.height}
                                width={p.node.width}
                            />}
                        </div>
                        <style jsx>{`
                            .rightImgQuote{
                                padding-left:19.9%;
                                padding-right:19.9%; 
                            }
                            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                                .rightImgQuote{
                                    padding-left:0;
                                    padding-right:${paddingRightMobile};
                                }
                            }
                        `}</style>
                    </>
                )
            }else{
                return null;
            }
            
        },
        imageShop:(p)=>{
            return (
                <>
                    <div className="standardPaddingBottom imageShop"><ImageShop data={!!p.node.imageFields ? p.node.imageFields:""} label={!!p.node.label  ? p.node.label:'#'} dropDownProducts={dropDownProducts}/></div>
                    <style jsx>{`
                        @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                            .imageShop{
                                padding-bottom:4.8rem;
                            }
                        }
                    `}</style>
                </>
            )
        },
        articleItem:(p)=>{
            // console.log("article item",p.node)
            return (
                <>
                    <div className="standardPaddingBottom">
                      {p.node?.articleItem &&  
                      <ArticleLinkItem data={p.node.articleItem} linkType={p.node.linkType=="pageLink"?true:false}/>}
                    </div>
                </>
            )
        },
        imageShopWithBottomText:(p)=>{
            // console.log("image shop with bottom text",p.node)
            return (
                <>
                   {p.node  && 
                       <div className="standardPaddingBottom">
                       <div className="standardPaddingBottom2">{p.node.imageFields && <ImageShop data={!!p.node.imageFields?p.node.imageFields:null} label={!!p.node.label?p.node.label:""} dropDownProducts={!!p.node.dropdownProducts?p.node.dropdownProducts:null}/>}</div>
                       {!!p.node.textArray && <div className={`${p.node.position==="center"?"textArrayCenter":"textArrayLeft"}`}><TextArray  text={p.node.textArray} descFontSize="font20" textAlignLeft={p.node.textAlignLeft}/></div>}
                   </div>}
                </>
            )
        },
        imageShopWithTopText:(p)=>{
            // console.log("imageShopwith top text",p.node)
            return(
                <>
                {p.node &&
                 <div className="standardPaddingBottom">
                     <ImageShopWithTopText text={p.node.textArray} images={p.node.imageFields} descFontSize="font20" textAlignLeft={p.node.textAlignLeft} label={!!p.node.label?p.node.label:""} dropdownProducts={!!p.node.dropdownProducts?p.node.dropdownProducts:null}/>
                </div>}
                </>
            )
        },
        videoContainer:(p)=>{
        //    console.log("image and text element",p.node)
            return(
                <>
                    <div className="standardPaddingBottom">
                            <ArticleVideoSection
                                data={p.node}
                                landScape={p?.node?.layout=="landscape"}  
                            />
                    </div>
                </>
            )    
        },
        textArrayWithImages:(p)=>{
            
            return(
                <>
                {p.node?.textArray && p.node?.images &&
                    <div className="standardPaddingBottom">
                        <div className={`standardPaddingBottom2 ${p?.node?.position==="center"?"textArrayCenter":"textArrayLeft"}`}>
                            <TextArray  text={p.node.textArray} descFontSize="font20" textAlignLeft={p.node.textAlignLeft}/>
                        </div>
                        <div>
                            <ImageColumn images={p.node.images}/>
                        </div>
                    </div>
                }
                </>
            )
        },
        giftingInformation:(p)=>{
            // console.log(p.node)
                return(
                    <>
                        {!!p.node?.giftInfo && p.node?.giftInfo?.title && p.node?.giftInfo?.mainDesc && p.node?.giftInfo?.subDesc && p.node?.giftInfo?.caption && p.node?.giftInfo?.bigImg && p.node.giftInfo.smallImg &&
                            <div className="standardPaddingBottom">
                            <StoryTelling
                               smallText={p.node.giftInfo.title}
                               largeText={p.node.giftInfo.mainDesc}
                               desc={p.node.giftInfo.subDesc}
                               caption={p.node.giftInfo.caption}
                               bigImage={getImageUrl(p.node.giftInfo.bigImg,867)}
                               bigImagePlaceHolder={getImageUrl(p.node.giftInfo.bigImg,20)}
                               bigImageWidth={867}
                               bigImageHeight={488}
                               smallImage={getImageUrl(p.node.giftInfo.smallImg,199)}
                               smallImagePlaceholder={getImageUrl(p.node.giftInfo.smallImg,199)}
                               smallImageWidth={199}
                               smallImageHeight={265}
                               topTextLeftAlignForMobile={true}
                            />
                        </div>}
                    </>
                ) 
            
        },
        imageSlider:(p)=>{
            // console.log("image slider",p.node)
            return(
                <>
                <div className="standardPaddingBottom">
                       {p.node?.sliderItem &&
                        <ImageSlider
                            text={p.node.textArray}
                            img1={getImageUrl(p.node.sliderItem[0].image,310)}
                            img1Placeholder={getImageUrl(p.node.sliderItem[0].image,310)}
                            img1Width={310}
                            img1Height={412}
                            img1Name={p.node.sliderItem[0].caption}
                            img2={getImageUrl(p.node.sliderItem[1].image,562)}
                            img2Placeholder={getImageUrl(p.node.sliderItem[1].image,20)}
                            img2Width={562}
                            img2Height={749}
                            img2Name={p.node.sliderItem[1].caption}
                            img3={getImageUrl(p.node.sliderItem[2].image,310)}
                            img3Placeholder={getImageUrl(p.node.sliderItem[2].image,20)}
                            img3Name={p.node.sliderItem[2].caption}
                            img3Width={310}
                            img3Height={412}

                        />}
                    </div>
                </>
            )
        },
        imageWithProductTagging:(p)=>{
            //    console.log("hotspot module",p.node)
                return (
                    <>
                     <div className="standardPaddingBottom">
                        {p.node?.heading && p.node?.mainImageDesktop && p.node?.mainImageMobile && p.node?.centraProductTagging && p.node?.centraProductTaggingMobile &&
                        <HotspotModule 
                            heading={p.node.heading}
                            imgMobile={p.node.mainImageMobile}
                            img={p.node.mainImageDesktop}
                            productTagging={p.node.centraProductTagging}
                            productTaggingMobile={p.node.centraProductTaggingMobile}
                        />}
                    </div>
                    </>
                )
        },
        videoElement:(p)=>{
        //    console.log(p.node)
            let placeholderDesktopFullUrl=getImageUrl(p.node?.video?.placeholderDesktop,p.node.video.widthDesktop)
            let placeholderDesktopBlurUrl=getImageUrl(p.node?.video?.placeholderDesktop,20)
            let placeholderMobileFullUrl=getImageUrl(p.node?.video?.placeholderMobile,p.node.video.widthDesktop)
            let placeholderMobileBlurUrl=getImageUrl(p.node?.video?.placeholderMobile,20)
            let idDesktop=p.node?.video?.videoDesktop?.asset?._ref;
            // console.log(idDesktop)
            let idMobile=p.node?.video?.videoMobile?.asset?._ref;
            // console.log(idMobile)
            let videoDesktop,videoMobile;
            // console.log( SANITY_DATASET)
            if(idDesktop){
                videoDesktop=buildFileUrl(parseAssetId(idDesktop),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
            }
            if(idMobile){
                videoMobile=buildFileUrl(parseAssetId(idMobile),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET});
            }
            // console.log(videoMobile);
            // console.log(videoDesktop)
            return (
                <>
               {!!p.node.video && <div id={p.node.scrollToId} className="standardPaddingBottom">
                    <div className="paddedContent hideForMobile banner">
                        <Video placeholderDesktopFullUrl={placeholderDesktopFullUrl} placeholderDesktopBlurUrl={placeholderDesktopBlurUrl} videoUrl={videoDesktop} playButtonPresent={p.node.video.playButtonPresent} controls={p.node.video.controls} autoplay={p.node.video.autoplay} muted={p.node.video.muted} loop={p.node.video.loop} width={p.node.video.widthDesktop} height={p.node.video.heightDesktop} />
                    </div>
                    <div className="showForMobile">
                        <Video placeholderMobileFullUrl={placeholderMobileFullUrl} placeholderMobileBlurUrl={placeholderMobileBlurUrl} videoUrl={videoMobile} playButtonPresent={p.node.video.playButtonPresent} controls={p.node.video.controls} autoplay={p.node.video.autoplay} muted={p.node.video.muted} loop={p.node.video.loop} width={p.node.video.widthMobile} height={p.node.video.heightMobile} restrictedHeightAndWidth={p.node.video.restrictedHeightAndWidth} /> 
                    </div>
                </div>
                }
                <style jsx>{`
                    .banner{
                        padding-left:10%;
                        padding-right:10%;
                    }
                `}</style>
                </>
            )
        },
        faq:(p)=>{
            // console.log("faq",p.node)
            // console.log("serialiser data",p.node.faqData[0])
            let faqData= Array.isArray(p.node.faqData)  && p.node.faqData.length>0? p.node.faqData:[]
            
            const [expandableActive,setExpandableActive] = useState(null);
            return (
                <>
                <div className="container">
                    { Array.isArray(faqData) &&faqData.map((field,index)=>{
                        if(field.details)
                        return (
                            <div className="singleField">
                                <h1 className="fieldHeading canelaThin font32">{field.heading}</h1>
                                {Array.isArray(field.details) && field.details.map((subField,subIndex)=>{
                                    return(
                                        <div className="subField" onClick={()=>setExpandableActive(subField._key)}>
                                            <Expandable 
                                                headingSmallMobile={true}
                                                expandableActive={expandableActive} 
                                                indexValue={subField._key} 
                                                content={subField.content} 
                                                heading={subField.subHeading} 
                                                answer={!!subField.answer ? subField.answer: ""}
                                                headingFont="anoRegular"
                                                headingFontSize="font20"
                                                borderTop={subIndex===0 ? false : true } 
                                                borderBottom={subIndex===(field.details.length - 1) ? true : false}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
                <style jsx>{`
                    .singleField{
                        margin-bottom:11.2rem;
                    }
                    .singleField:last-child{
                        margin-bottom:0rem;
                    }
                    .fieldHeading{
                        margin-bottom:3.2rem;
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .singleField{
                            margin-bottom:8rem;
                        }
                        .fieldHeading{
                            margin-bottom:2.4rem;
                        }
                    }                
                `}</style>
                </>
            )
        },
        paymentData:(p)=>{
            // console.log("serialiser data",p.node.paymentDetails)
            let data=p.node.paymentDetails
            return (
                <>
                <div className="wrapper">
                    {Array.isArray(data) && data.map((field,index)=>{
                        if(field.heading && field.content)
                            return(
                                <div className="singleField">
                                    <HeadingAndContent
                                        heading={field.subHeading}
                                        content={field.content}
                                    />
                                </div>
                            )
                    })}
                </div>
                <style jsx>{`
                    .singleField{
                        margin-bottom:11.2rem;
                    }
                    .singleField:last-child{
                        margin-bottom:0rem;
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .singleField{
                            margin-bottom:8rem;
                        }
                    }
                `}</style>
                </>
            )
        },
        shippingData:(p)=>{
            // console.log(p)
            let data=p.node.shippingDetails;
            return (
                <>
                <div className="wrapper">
                    {Array.isArray(data) && data.map((field,index)=>{
                        if(field.heading && field.content)
                        return(
                            <div className="singleField">
                                <HeadingAndContent
                                    heading={field.subHeading}
                                    content={field.content}
                                />
                            </div>
                        )
                    })}
                </div>
                <style jsx>{`
                    .singleField{
                        margin-bottom:11.2rem;
                    }
                    .singleField:last-child{
                        margin-bottom:0rem;
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .singleField{
                            margin-bottom:8rem;
                        }
                    }
                `}</style>
                </>
            )
        },
        threeTextAndImage:(p)=>{
            // console.log("gifting",p.node)
            return(
                <>
                         {!!p.node?.giftInfo && p.node?.giftInfo?.mainDesc && p.node?.giftInfo?.subDesc && p.node?.giftInfo?.bigImg &&
                             <div className="giftingTextAndImage standardPaddingBottom">
                             <GiftingTextAndImage
                                 shortHeading={p.node.giftInfo.title}
                                 bigHeading={p.node.giftInfo.mainDesc}
                                 desc={p.node.giftInfo.subDesc}
                                 image={getImageUrl(p.node.giftInfo.bigImg,1453)}
                                 imagePlaceholder={getImageUrl(p.node.giftInfo.bigImg,20)}
                             />
                         </div>}
                </>
            )
        },
        singleImage:(p)=>{
            return (
                <>  
                   {!!p.node.image && p.node.height && p.node.width && 
                   <div className="standardPaddingBottom">
                    <SingleImage fullBleed={p.node.fullBleed} image={p.node.image} height={p.node.height} width={p.node.width}/>
                   </div> }
                </>
            )
        },
        exploreMore:(p)=>{
            // console.log("explore more",p.node.exploreItems)
            const {t}=useTranslation('common');
            let items=[]
            for(let i=0;i<p.node.exploreItems.length;i++){
                let obj={}
                obj.title=p.node.exploreItems[i].exploreMoreAttribute.title
                obj.description=p.node.exploreItems[i].exploreMoreAttribute.description
                obj.image=p.node.exploreItems[i].exploreMoreAttribute.image
                obj.link=p.node.exploreItems[i].exploreMoreAttribute.link
                items.push(obj)
            }
            // console.log("items",items)
            return (
                <>
                <div id={p.node.scrollToId} className="standardPaddingBottom">
                    {!!p.node?.exploreItems && 
                        <ExploreProducts moreCollections={items} heading={t('exploreMore')}/>}
                </div>
                </>
            )
        },
        exploreMore_en:(p)=>{
            const {t}=useTranslation('common');
            let items=[]
            for(let i=0;i<p.node.exploreItems.length;i++){
                let obj={}
                obj.title=p.node.exploreItems[i]?.exploreMoreAttribute?.title
                obj.description=p.node.exploreItems[i]?.exploreMoreAttribute?.description
                obj.image=p.node.exploreItems[i]?.exploreMoreAttribute?.image
                obj.link=p.node.exploreItems[i]?.exploreMoreAttribute?.link
                items.push(obj)
            }
            return (
                <>
                <div id={p.node.scrollToId} className="standardPaddingBottom">
                    {!!p.node?.exploreItems && 
                        <ExploreProducts moreCollections={items} heading={t('exploreMore')}/>}
                </div>
                </>
            )
        },
        exploreMore_fr:(p)=>{
            const {t}=useTranslation('common');
            let items=[]
            for(let i=0;i<p.node.exploreItems.length;i++){
                let obj={}
                obj.title=p.node.exploreItems[i]?.exploreMoreAttribute?.title
                obj.description=p.node.exploreItems[i]?.exploreMoreAttribute?.description
                obj.image=p.node.exploreItems[i]?.exploreMoreAttribute?.image
                obj.link=p.node.exploreItems[i]?.exploreMoreAttribute?.link
                items.push(obj)
            }
            return (
                <>
                <div id={p.node.scrollToId} className="standardPaddingBottom">
                    {!!p.node?.exploreItems && 
                        <ExploreProducts moreCollections={items} heading={t('exploreMore')}/>}
                </div>
                </>
            )
        }
    }
}