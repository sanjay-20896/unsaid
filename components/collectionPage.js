import Layout from './layout'
import TwoStepText from './twoStepText'
import GiftingSection from './giftingSectionDynamic'
import CollectionPageProduct from './collectionPageProductDynamic'
import HotspotModule from './hotspotModuleDynamic'
import ExploreProducts from './exploreProductsDynamic'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import SEO from './SearchEngineOptimisation';
import CollectionVideoFrame from './collectionVideoFrame';
import {getImageUrl} from "../functions"
import CollectionShopItem from './CollectionShopItem'
import ImageOrVideo from './ImageOrVideo'
import useTranslation from 'next-translate/useTranslation'
function CollectionPage(props) {
    const {t}=useTranslation('common');
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
    let device = getDevice();
    let bannerType=props?.content?.heroModule?.collectionBannerType
    let exploreItems=[];
    for(let i=0;i<props.content?.exploreMore?.length;i++){
        let obj={};
        obj.title=props?.content?.exploreMore[i].exploreMoreAttribute?.title
        obj.image=props.content.exploreMore[i].exploreMoreAttribute?.image
        obj.description=props.content.exploreMore[i].exploreMoreAttribute?.description
        obj.link=props.content.exploreMore[i].exploreMoreAttribute?.link
        exploreItems.push(obj)
    }
    return(
        <>
            {props?.content?.seo && 
                <SEO
                    title={props.content.seo.title}
                    description={props.content.seo.description}
                    image={getImageUrl(props.content.seo.image)} 
                />
            }
            <Layout commonData={props.commonProps.commonData} mainContentPadding="no" waitToStartApiRequests="yes" shouldStartApiRequests={true}>
                <div key={props.currentCollection}>
                    <div className="collectionFrame standardPaddingBottom">
                        <CollectionVideoFrame 
                            collectionHeading={props?.content?.name}
                            bannerType={bannerType}
                            video={props?.content?.heroModule?.video}
                            desktopImage={!!props?.content?.heroModule?.imageDesktop? getImageUrl(props.content.heroModule.imageDesktop,!!props?.content?.heroModule?.desktopWidth ? props?.content?.heroModule?.desktopWidth: 1312):null}
                            desktopPlaceholderImage={!!props?.content?.heroModule?.imageDesktop? getImageUrl(props?.content?.heroModule?.imageDesktop,20):null}
                            desktopWidth={!!props?.content?.heroModule?.desktopWidth ? props?.content?.heroModule?.desktopWidth: 1440}
                            desktopHeight={!!props?.content?.heroModule?.desktopHeight ? props?.content?.heroModule?.desktopHeight:644}
                            mobileImage={!!props?.content?.heroModule?.imageMobile?getImageUrl(props.content.heroModule?.imageMobile,!!props?.content?.heroModule?.mobileWidth ? props?.content?.heroModule?.mobileWidth: 303):null}
                            mobilePlaceholderImage={!!props?.content?.heroModule?.imageMobile ? getImageUrl(props.content.heroModule?.imageMobile,20):null}
                            mobileWidth={!!props?.content?.heroModule?.mobileWidth ? props?.content?.heroModule?.mobileWidth: 303}
                            mobileHeight={!!props?.content?.heroModule?.mobileHeight ? props?.content?.heroModule?.mobileHeight: 492}
                        />
                    </div>
                    <div className="twoStepText standardPaddingBottom">
                    {!!props?.content?.text1 && !!props?.content?.text2 &&
                        <TwoStepText 
                            animate={true}
                            text1={props.content.text1}
                            text2={props.content.text2}
                        />
                    }
                    </div>
                    {/* <div className="standardPaddingBottom">
                        {!!props?.content?.giftingSection?.giftCollection && 
                            <GiftingSection data={props?.content?.giftingSection?.giftCollection} />
                        }
                    </div> */}
                    {!!props?.content?.collectionShopItem &&
                        <div className="standardPaddingBottom">
                            <CollectionShopItem data={props?.content?.collectionShopItem}/>
                        </div>
                    }
                    <div>
                        {!!props.products &&
                            <CollectionPageProduct shopTheLookDesktop={props.content.shopTheLookDesktop.shopTheLook} shopTheLookMobile={props.content.shopTheLookMobile.shopTheLook} device={device} mainHeading={props.content.mainHeading}  subHeading={props.content.subHeading} description={props.content.description} name={!!props.content.filterName?props.content.filterName:props.content.name} id={props.content.collectionId} collectionHeading="The Nest collection"  products={props.products} currentCollection={props.currentCollection} filter={props.filter} />
                        }
                    </div>
                    {/* {!!props?.content?.hotspotModule &&
                        <div className="standardPaddingBottom">
                            <HotspotModule 
                                heading={props.content.hotspotModule.heading}
                                imgMobile={props?.content?.hotspotModule?.mainImageMobile}  
                                img= {props?.content?.hotspotModule?.mainImageDesktop}
                                productTagging={props?.content?.hotspotModule?.centraProductTagging}
                                productTaggingMobile={props.content.hotspotModule.centraProductTaggingMobile}
                            />
                        </div>
                    } */}
                    {!!props?.content?.craftmanshipSection &&
                        <div className="standardPaddingBottom">
                            <h2 className="craftsHeading font20 canelaThin paddedContent">{props?.content?.craftmanshipSection.title}</h2>
                            <ImageOrVideo data={props?.content?.craftmanshipSection}/>
                        </div>
                    }
                    <div className="standardPaddingBottom">
                        <ExploreProducts device={device} moreCollections={exploreItems} heading={t('exploreMore')}/>
                    </div>
                </div>
                <style jsx>{`
                    .craftsHeading{
                        margin-bottom: 3.4rem;
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .craftsHeading{
                            margin-bottom: 2.4rem;
                            font-size: 1.2rem;
                            line-height:2rem;
                        }
                    }
                `}</style>
            </Layout>
        </>
    )
}

function mapStateToProps({common,selection}){
    return {common,selection}
}

export default connect(mapStateToProps,null)(CollectionPage)