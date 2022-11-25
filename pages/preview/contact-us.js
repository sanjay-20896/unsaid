import React, { useState } from 'react'
import Layout from '../../components/layout'
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../../config'
import ContactForm from '../../components/contactForm'
import Sanity from '../../sanity1';
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import SEO from '../../components/SearchEngineOptimisation'
import Expandable2 from '../../components/expandable2'
import LazyImage from '../../components/lazyImage'
import {getDynamicMenuAndFooterInfo} from "../../functions"
import {getImageUrl} from "../../functions"
import { paddingLeftMobile, paddingRightMobile } from '../../data/cssVariables'
import useTranslation from 'next-translate/useTranslation'
export default function Contact(props) {
    const [dropOne, setDropOne] = useState(false);
    const [dropTwo, setDropTwo] = useState(false);
    let seo=props.content.seo;
    const {t}=useTranslation('common');
    return (
        <>
            <SEO
            title={seo.title}
            description={seo.description}
            image={ getImageUrl(seo.image)}
            />
            <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
                <div className={`contactPage standardPaddingBottom ${dropOne?"dropOne":""} ${dropTwo?"dropTwo":""}`}>
                    <h1 className="cantactLabel canelaThin font40 alignCenter">{props.content.name}</h1>
                    <div className="detailsContainer">
                        <div className="left">
                            <div className="leftTop">
                                <div className="callUs ">
                                    <h2 className="anoHalfRegular font16">{t('callUs')}</h2>
                                    <h2 className="canelaThin font16-notResponsive"><a href={`tel:${props.content.contactNumber}`}>{props.content.contactNumber}</a></h2>
                                </div>
                                <div className="writeToUs">
                                    <h2 className="anoHalfRegular font16">{t('writeToUs')}</h2>
                                    <h2 className="canelaThin font16-notResponsive"><a href={`mailto:${props.content.email}`}>{props.content.email}</a></h2>
                                </div>
                            </div>
                            <div className="storeImage hideForMobile">
                                <LazyImage 
                                    alt="Unsaid Store"
                                    originalSrc={getImageUrl(props.content.imageDesktop,710)} 
                                    placeholderSrc={getImageUrl(props.content.imageDesktop,20)}
                                    width={710} 
                                    height={710} 
                                />
                            </div>
                            <div className="storeImage showForMobile">
                                <LazyImage 
                                    alt="Unsaid Store"
                                    originalSrc={getImageUrl(props.content.imageMobile,500)} 
                                    placeholderSrc={getImageUrl(props.content.imageMobile,20)}
                                    width={500} 
                                    height={279} 
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div className="headingContent">
                                <h1 className="rightHeading canelaThin font24">{t('sendUsQuestion')}</h1>
                                <p className="desc anoHalfRegular font16">{props.content.question}</p>
                            </div>
                            {/* <Expandable2  borderBottom={true} headingFont="anoRegular" headingFontSize="font20" headingFontSizeMobile="2rem" headingLineHeightMobile="2.8rem" setExpand={(bool)=>{setDropOne(bool);setDropTwo(false)}} expand={dropOne} heading="Request an appointment" content={<AppointmentForm text={props.content.belowSubmitText}/>} /> */}
                            <Expandable2  borderBottom={true} headingFont="anoRegular" headingFontSize="font20" headingFontSizeMobile="2rem" headingLineHeightMobile="2.8rem" setExpand={(bool)=>{setDropTwo(bool);setDropOne(false)}} expand={dropTwo} heading={t('writeToUs')} content={<ContactForm text={props.content.belowSubmitText}/>} />
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .contactPage{
                        padding-top:11.2rem;
                    }
                    .writeToUsLabel{
                        padding-top:2.4rem;
                    }
                    .writeToUsForm{
                        border-bottom:1px solid #787878;
                        padding-bottom:2.4rem;
                    }
                    .dropTwo .writeToUsForm{
                        border-bottom:none;
                        padding-bottom:0;
                    }                    
                    .appintmentDetails, .writeToUsFormDetails{
                        height:0;
                        overflow:hidden;
                        transform:translateY(-2rem);
                        transition:all 0.3s ease-out;
                    }
                    .dropTwo .writeToUsFormDetails{
                        height:auto;
                        transform:translateY(0rem);
                    }
                    .dropOne .appintmentDetails{
                        height:auto;
                        transform:translateY(0rem);
                    }
                    .dropOne .appointment{
                        padding-bottom:4.8rem;
                    }                   
                    .appointment{
                        border-bottom:1px solid #787878;
                        padding-bottom:2.4rem;
                    }
                    .appointmentLabel{
                        padding:2.4rem 0 0;
                    }
                    .appointmentLabel::after, .writeToUsLabel::after{
                        content: '';
                        position: absolute;
                        background: black;
                        width: 1px;
                        height: 24px;
                        top:24px;
                        //top: 50%;
                        right: 12px;
                        transform: rotate(0deg);
                        transition:all 0.3s ease-out;
                    }
                    .appointmentLabel::before, .writeToUsLabel::before{
                        content: '';
                        position: absolute;
                        background: black;
                        width: 1px;
                        height: 24px;
                        top:24px;
                        //top: 50%;
                        right: 12px;
                        opacity:1;
                        transform: rotate(90deg);
                        transition:all 0.3s ease-out;
                    }
                    .dropOne .appointmentLabel::before, .dropTwo .writeToUsLabel::before{
                        opacity:0;
                    }
                    .dropOne .appointmentLabel::after, .dropTwo .writeToUsLabel::after{
                        transform: rotate(-90deg);
                    }
                    .headingContent{
                        margin-bottom:3.2rem;
                    }
                    .rightHeading{
                        margin-bottom:2.4rem;
                    }
                    .leftTop{
                        display:flex;
                        justify-content:space-between;
                        margin-bottom:2.4rem;
                    }
                    .left, .right{
                        width:50%;
                    }
                    .left{
                        padding-right:1.2rem;
                    }
                    .right{
                        padding-left:12.3rem;
                        padding-top:3.6rem;
                    }
                    .callUs h2:nth-child(1), .writeToUs h2:nth-child(1){
                        margin-bottom:0.8rem;
                    }
                    .cantactLabel{
                        margin-bottom:11.2rem;
                    }
                    .detailsContainer{
                        padding:0 12.15%;
                        display:flex;
                    }
                    @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                        .right{
                            width:45%;
                        }
                        .left{
                            width:55%;
                            padding-right:0rem;
                        }
                        .right{
                            padding-left:6rem;
                        }
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .appointmentLabel,.writeToUsLabel{
                            font-size:2rem;
                            line-height: 2.8rem;
                        }
                        .contactPage{
                            padding-top:4.8rem;
                        }
                        .cantactLabel{
                            margin-bottom:4.8rem;
                        }
                        .detailsContainer{
                            padding-left:${paddingLeftMobile};
                            padding-right:${paddingRightMobile};
                            display:block;
                        }
                        .leftTop{
                            display:block;
                            margin-bottom:3.2rem;
                        }
                        .callUs{
                            margin-bottom:3.2rem;
                        }
                        .left, .right{
                            width:100%;
                        }
                        .left{
                            padding-right:0rem;
                        }
                        .right{
                            padding-left:0rem;
                            padding-top:0rem;
                        }
                        .storeImage{
                            margin-bottom:3.2rem;
                        }
                        .headingContent{
                            margin-bottom:0rem;
                            padding-bottom:4.8rem;
                            border-bottom:1px solid #787878;
                        }
                        .rightHeading{
                            font-size:2.4rem;
                            line-height:3.2rem;
                        }
                        .desc{
                            font-size:1.6rem;
                            line-height:2.4rem;
                        }
                    }
                `}</style> 
            </Layout>  
        </>
    )
}

export async function getServerSideProps({locale}){
    let content=null;
    let query=`*[_id=="contactPage_${locale}"]`;
    let error=false;
    let commonProps=null;
    try{
        commonProps=await getDynamicMenuAndFooterInfo(locale);
        content=await Sanity.fetch(query);
        content=Array.isArray(content)?content[0]:content;
        return{
            props:{content,commonProps}
        }
    }catch(err){
        console.log(err)
        error=true;
        return {
            props:{error}
        }
    }
}