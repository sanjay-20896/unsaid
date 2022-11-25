import Layout from "./layout"
import InputFieldsThree from './inputFieldsThree'
import BlockContent from '@sanity/block-content-to-react'
import { MOBILE_BREAKPOINT } from "../config";
import { ECOMMERCE_URI, menuItems } from "../branch-specific-config"
import PageHeaderContent from './pageHeaderContent'
import { useRouter } from 'next/router'
import ShowMore from './showMore'
import SEO from "./SearchEngineOptimisation";
import { serializers } from "../serialiser";
import { connect } from "react-redux";
import Sanity from '../sanity';
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {getDynamicMenuAndFooterInfo,getImageUrl} from "../functions"
import useTranslation from 'next-translate/useTranslation'
export default function SingleArticlePage(props){
    // console.log("SingleArticlePage",props);
    const {t}=useTranslation('common');
    let articleBannerType=props.content.mediaType;
    const router = useRouter();
    let dates=(props?.content?._createdAt).split('T')
    let newDate=dates[0];
    newDate=newDate.split('-');
    let index=newDate[1];
    const monthObj ={
        '01':'January',
        '02':'February',
        '03':'March',
        '04':'April',
        '05':'May',
        '06':'June',
        '07':'July',
        '08':'August',
        '09':'September',
        '10':'October',
        '11':'November',
        '12':'December',
    }
    let date=`${monthObj[index]} ${newDate[2] ? newDate[2] : ""}, ${newDate[0] ? newDate[0]: newDate[0]}`
    let pageHeader={
        articleBannerType:articleBannerType,
        title:props.content.articleTitle,
        description:!!props.content.articleDesc?<BlockContent blocks={props.content.articleDesc}/>:<p></p>,
        mainHeading:!!props.content.articleHeading && <BlockContent blocks={props.content.articleHeading}/>,
        desktopImageUrl:getImageUrl(props.content.articleDesktopImage),
        mobileImageUrl: getImageUrl(props.content.articleMobileImage),
        video:props?.content?.video
    }
    //console.log(pageHeader)
    let link;
    if(props.content.category[0].categorySlug.current=="all"){
        link="/library"
    }else{
        link=`/library/${props?.content?.category[0].categorySlug.current}`
    }
    // console.log("menu layout props",props)
    return(
        <>
            {!!props.content.seo && 
                <SEO
                    title={props.content.seo.title}
                    description={props.content.seo.description}
                    image={getImageUrl(props.content.seo.image)}
                />
            }
            <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
                <div className="articlePages standardPaddingBottom" key={`pageHeader-${props.content._id}`}>
                    <div className="pageHeader">
                        <PageHeaderContent 
                            data={pageHeader}
                        />
                    </div>
                    <div className="standardPaddingBottom inputFieldsThree" >
                        <InputFieldsThree 
                            date={props?.content?.date ? props?.content?.date :date} 
                            tag={props.content.articleTag[0].tagname} 
                            category={props.content.category[0].category} 
                            readTime={props.content.readTime}
                        />
                    </div>
                    <div className="">
                        <BlockContent 
                            serializers={serializers} 
                            blocks={props.content.content}
                        />
                    </div>
                    <ShowMore
                        heading={!!props.content?.exploreMoreText && props.content?.exploreMoreText}
                        buttonText={t('exploreTheLibrary')}
                        onclick={()=>router.push(link)}
                        noMargin={true}
                    />
                </div>
            </Layout>
            <style jsx>{`
                .description{
                    padding-left:27.6%;
                    padding-right:27.6%;
                    padding-bottom:6.4rem;
                }
                .pageHeader{
                    margin-bottom:3.2rem;
                }
                .articlePages{
                    padding-top:6.4rem;
                }
                .banner{
                    padding-bottom:3.2rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .description{
                        font-size:2.4rem;
                        padding-bottom:4.9rem;
                        padding-left:3.6rem;
                        padding-right:3.6rem;
                        font-family: CanelaThin, sans-serif;
                    }
                    .articlePages{
                        padding-top:4.8rem;
                    }
                    .pageHeader{
                        margin-bottom:1.6rem;
                    }
                    .inputFieldsThree{
                        padding-bottom:6.4rem;
                    }
                }
            `}
            </style>
        </>
    )
}
