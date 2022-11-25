import Layout from './layout'
import Space from './space'
import Sanity from '../sanity'
import PageHeaderContent from './pageHeaderContent'
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
import { connect } from 'react-redux'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import SEO from './SearchEngineOptimisation'
import {serializers} from '../serialiser'
import {getImageUrl} from "../functions"

function RichContentPage(props) {
    
    let pageHeader={
        articleBannerType:!!props?.content?.articleBannerType ? props?.content?.articleBannerType:"image",
        title:props?.content?.title,
        description:props?.content?.description,
        desktopImageUrl:props?.content?.imageDesktop ?getImageUrl(props.content.imageDesktop,2624):null, //1476
        desktopBlurUrl:props?.content?.imageDesktop? getImageUrl(props.content.imageDesktop,20):null,
        mobileImageUrl:props?.content?.imageMobile ? getImageUrl(props.content.imageMobile,606):null, 
        mobileBlurUrl:props?.content?.imageMobile ? getImageUrl(props.content.imageMobile,20) :null,//1076
        video:props?.content?.video
    }
    let seo=props?.content?.seo;
    return(
        <>
            <SEO
              title={seo?.title}
              description={seo?.description}
              image={urlFor(seo?.image).quality(100).url()} 
            />
            <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
                <Space height={"6.5rem"} mobileHeight={"4.8rem"}/>
                {!!pageHeader &&
                    <div className="standardPaddingBottom">
                        <PageHeaderContent data={pageHeader}/>  
                    </div>
                }
               {!!props?.content?.content &&
                <BlockContent blocks={props.content.content} serializers={serializers}/>}
            </Layout>
        </>
    )
    
}

function mapStateToProps({common,selection}){
    return {common,selection}
}

export default connect(mapStateToProps,{})(RichContentPage);