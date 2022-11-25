
import Layout from './layout'
import BlockContent from '@sanity/block-content-to-react'
import { MOBILE_BREAKPOINT ,SITENAME, TABLET_LANDSCAPE_BREAKPOINT,MEDIUM_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config';
import Link  from 'next/dist/client/link';
import Caret from './caret';
import Expandable2 from './expandable2';
import HeadingAndContent from './headingAndContent';
import React, { useState,useEffect } from 'react'
import SEO from './SearchEngineOptimisation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {getImageUrl} from "../functions"
import { paddingLeftMobile, paddingRightMobile, paddingLeftTabletLandscape, paddingRightTabletLandscape, paddingLeftTabletPortrait, paddingRightTabletPortrait  } from '../data/cssVariables';
const serializers={
    types:{
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
                                        <div className="subField">
                                            <Expandable2  
                                                // borderBottom={true} 
                                                headingSmallMobile={true}
                                                heading={subField.subHeading} 
                                                headingFont="anoRegular" 
                                                headingFontSize="font20" 
                                                setExpand={(bool)=>{expandableActive==subField._key?setExpandableActive(null):setExpandableActive(subField._key)}} 
                                                expand={expandableActive==subField._key} 
                                                content={subField.answer?
                                                    <div className="font16-notResponsive anoHalfRegular">
                                                        <BlockContent blocks={subField.answer}/>
                                                    </div>
                                                    :
                                                    <p></p>
                                                } 
                                                borderTop={subIndex===0 ? false : true } 
                                                borderBottom={subIndex===(field.details.length - 1)}
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
                        // if(field.heading && field.description)
                            return(
                                <div className="singleField">
                                    <HeadingAndContent
                                        heading={field.subHeading}
                                        content={!!field.description?<BlockContent blocks={field.description} />:<p></p>}
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
            // console.log("serialiser",p)

            let data=p.node.shippingDetails;
            return (
                <>
                <div className="wrapper">
                    {Array.isArray(data) && data.map((field,index)=>{
                        // console.log("single shipping data",field,index)
                        // if(field.heading && field.content)
                        return(
                            <div className="singleField">
                                <HeadingAndContent
                                    heading={field.subHeading}
                                    content={!!field.description?<BlockContent blocks={field.description}/>:<p></p>}
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
        }
    }
}
function CustomerCarePage(props){
    // console.log(props)
    let seo=props?.content?.seo
    return(
        <>

         <SEO
              title={seo.title}
              description={seo.description}
              image={ getImageUrl(seo.image)} 
            />
        <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            <div className="shippingAndReturns standardPaddingBottom">
                <div className="topDesc">
                    <h1 className="headingLabel canelaThin font40 alignCenter">{props.content.alternativeTitle?props.content.alternativeTitle:props.content.title}</h1>
                    {props?.content?.description &&
                        <p className="message anoHalfRegular font16 alignCenter">{props.content.description}</p>
                    }
                    {props.slug=="payment-information" && <div className="paymentIcons">
                        {Array.isArray(props.content.imageList) &&  props.content.imageList.map((icon,index)=>{
                            return(
                                <>
                                    {/* <div className="paymentIcon"></div> */}
                                    <div className="paymentIcon">
                                        <LazyLoadImage 
                                        src={getImageUrl(icon,93) }
                                        effect="blur"
                                        placeholderSrc={getImageUrl(icon,20)}
                                        width="100%"/>
                                        </div>
                                </>
                            )
                        })}
                    </div>}
                </div>
                <div className="content">
                    {/* CMS BlockContent data goes here */}
                    <BlockContent serializers={serializers} blocks={props.content.content}/>
                </div>
               {!!props.content.label && !!props.content.link && <Link href={props.content.link}><a className="alignCenter"><div className="paymentPageLink anoRegular font16-notResponsive">{props.content.label}<span><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.1rem"/></span></div></a></Link>}
            </div>
            <style jsx>{`
                .shippingAndReturns{
                    padding-top:6.4rem;
                }
                .paymentIcons{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    margin-top:4.8rem;
                }
                .paymentIcon{
                    width:68px;
                    height:34px;
                    margin-right:1.6rem;
                }
                .paymentIcon:last-child{
                    margin-right:0rem;
                }
                .message{
                    // width:29.3%;
                    width:100%;
                    // margin:0 auto 4.8rem;
                }
                .paymentPageLink span{
                    margin-left:0.8rem;
                }
                .headingLabel{
                    margin-bottom:2.4rem;
                }
                // .topDesc{
                //     margin-bottom:11.2rem;
                // }
                .content,.topDesc{
                    padding-top:11.2rem;
                    width:858px;
                    max-width:100%;
                    margin:auto;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .headingLabel{
                        font-size:4rem;       
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .headingLabel{
                        // font-size:3.6rem;
                    }
                    .content, .topDesc{
                        width:100%;
                        padding-left:${paddingLeftTabletLandscape};
                        padding-right:${paddingRightTabletLandscape};
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .content, .topDesc{
                        width:100%;   
                    }
                    .content, .topDesc{
                        padding-left:${paddingLeftTabletPortrait};
                        padding-right:${paddingRightTabletPortrait};
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .shippingAndReturns{
                        padding-top:4.8rem;
                    }
                    .paymentIcons{
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                    .paymentIcon{
                        width:64px;
                        height:32px;
                        margin-right:1.4rem;
                        margin-bottom:1.6rem;
                    }
                    .paymentIcon:nth-child(4n){
                        margin-right:0rem;
                    }
                    .message{
                        width:100%;
                    }
                    .headingLabel{
                        margin-bottom:1.6rem;
                        font-size:3.2rem;
                        line-height:4rem;
                    }
                    .topDesc{
                        margin-bottom:6.4rem;
                    }
                    .content,.topDesc{
                        padding-top:8rem;
                        padding-left:${paddingLeftMobile};
                        padding-right:${paddingRightMobile};
                    }
                }
            `}</style>
        </Layout>
        </>
    )
}


export default CustomerCarePage;