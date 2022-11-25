
import {useState} from 'react'
import Layout from './layout'
import HeroModuleAlt from "./heroModuleAlt2"
import Collections from './collectionsDynamic'
import ThreeColumnStory from './threeColumnStoryDynamic'
import GiftingSection from './giftingSectionDynamic'
import ThreeStepText from './threeStepText'
import SingleProduct from './singleProduct'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT,MEDIUM_BREAKPOINT} from '../config'
import {setWindow} from "../redux/actions"
import {getPriceBasedOnSelection,getImageUrlNew} from '../functions'
import SEO from './SearchEngineOptimisation'
import Link from 'next/link'
import NewVideoSection from './NewVideoSection'
import RandomBanner from './RandomBanner'
import GridViewProduct from '../components/gridViewProductDynamic'
import CollectionProductDynamic from './collectionProductDynamic'
import useDevice from '../hooks/useDevice'
function Home(props){
        let {deviceName} = useDevice();
        let productList = (props?.content?.productSection?.product)
        // console.log("productsList",productList)
        // console.log(props)
        let newAdSection = props.content?.pageSection
        // console.log("productsList",props)
        const [shouldStartApiRequests,startApiRequests] = useState(true)
        return (
            <>
              <SEO
                title={props.content.seo.title}
                description={props.content.seo.description}
                image={getImageUrlNew(props.content.seo.image,1000,75,"jpg")} 
              />
              <Layout commonData={props.commonProps.commonData}  waitToStartApiRequests="yes" shouldStartApiRequests={shouldStartApiRequests}>
                <div className="wrapper positionRelative">
                    {/* <div className="heroModule">
                        <HeroModuleAlt
                          id="unlockedVideo" 
                          pageHeading={props?.content?.hero?.pageMainHeading} 
                          pageLogo={props?.content?.hero?.logo} 
                          desc={props.content.hero.desc} 
                          video={props.content.videoUrl} 
                          videoMobile={props.content.videoUrlMobile} 
                          videoTablet={props.content.videoUrlTablet} 
                          placeholderDesktop={props?.content?.hero?.banner?.placeholderDesktop}
                          placeholderMobile={props?.content?.hero?.banner?.placeholderMobile}
                          randomBanner={props?.content?.hero?.randomBanner}
                          heroImageDesktop={props?.content?.hero?.banner?.placeholderMobile}
                          heroImage={props?.content?.hero?.heroImage}
                          afterHeroLoad={()=>startApiRequests(true)}
                        />
                    </div> */}
                    <div>
                      <RandomBanner fullBleed={false} fullBleedMobile={true}  media={props?.content?.heroModule?.randomBanner} desc={props.content.heroModule.desc}/>
                    </div>
                    <div className="collections standardPaddingBottom">
                        <Collections heading={props?.content?.collectionsSection?.heading} collections={props?.content?.collectionsSection?.collections} />
                    </div>
                    <div className="standardPaddingBottom">
                      <NewVideoSection data={props.content.VideoWithCta}/>
                    </div>
                    <div className="productsSection gridView">
                          <div className="paddedContent productsSectionText">
                              <div className="additionalPaddingMobile">
                                <ThreeStepText largeText={props?.content?.productSection?.subHeading} largerDesc={true} desc={props?.content?.productSection?.description} />
                              </div>
                          </div>
                          <div className="singleProductsWrapper standardPaddingBottom paddedContent">
                            {!!productList && productList.length>0 && productList.map((item,index)=>{
                              // console.log(item)
                              let standardProductImages = Array.isArray(item?.product?.media?.standard)?item?.product?.media?.standard:"";
                              if(!!item?.product){
                                return(
                                  // <></>

                                  <div className="singleProductItem" key={item._key}>
                                    {/* <SingleProduct product={item.product} productLink={`/products/${item.product.uri}`} desc={item.product.excerpt} img1={!!standardProductImages ?standardProductImages[1]:"" } id={item.product.product} img2={!!standardProductImages ? standardProductImages[0]:"" } firstProduct={false} productName={item.product.name? item.product.name :""} productPrice={item.product? getPriceBasedOnSelection(item.product,props.selection) :""} viewProductSection={ item.label ? item.label:""} productSectionLink={item.link? item.link:"#" }/> */}
                                    <GridViewProduct hideColors={true} productNameSizeMobile={"16px"} hideLikeButton={true} showF1={true} product={item.product}  productName={item.product.name}  productPrice={item.product? getPriceBasedOnSelection(item.product,props.selection) :""}  viewProductSection={item.label?item.label:""}  productSectionLink={item.link? item.link:"#"}/>
                                  </div>
                                )
                              }
                            })}
                          </div>    
                    </div>
                    {!!newAdSection && 
                      <div className={`CollectionProductDynamic ${deviceName!="mobile"?"paddedContent":""} standardPaddingBottom`}>
                        <CollectionProductDynamic showHeadingInMobile={true} layoutReverse={true} linkLabel={newAdSection.label} linksTo={!!newAdSection?.link?newAdSection?.link:"#"} productImage={newAdSection.imageDesktop} productImageMobile={newAdSection.imageMobile} productHeading={newAdSection.heading} productDesc={newAdSection.description} />
                      </div>
                    }
                    <div className="story standardPaddingBottom">
                        <div className="paddedContent libraryThreeStepText">
                          <div className="additionalPaddingMobile">
                            <ThreeStepText largeText={props?.content?.LibraryBlock?.subHeading} largerDesc={true} desc={props?.content?.LibraryBlock?.description} />
                          </div>
                        </div>
                        <ThreeColumnStory storyList={props?.content?.articleList} />
                        <Link href={props?.content?.LibraryBlock?.link}><a>
                          <div className="alignCenter button exploreTheLibrary"><button className="btn btnSecondary anoRegular" href={props?.content?.link}>{props?.content?.LibraryBlock?.label}</button></div>
                        </a></Link>
                    </div>
                    {/* <div className="standardPaddingBottom">
                      <GiftingSection lazy={true} heading={props?.content?.gifting?.mainHeading} data={props?.content?.gifting?.giftCollection} dataMobile={props?.content?.gifting?.giftingCollection} unlockedGiftingSection={true}/>
                    </div> */}
                    <div className="standardPaddingBottom">
                      <NewVideoSection data={props.content.singleImageOrVideo}/>
                    </div>
                </div>
                <style jsx>{`
                    .standardPaddingBottom{
                      padding-bottom: 12.8rem;
                    }
                    .productsSection.gridView .singleProductsWrapper{
                      display: flex;
                      justify-content: space-between;
                    }
                    .productsSection.gridView .singleProductItem{
                      width: 23.5%;
                      padding-bottom: 0;
                    }
                    .productsSectionText{
                      padding-bottom:8.6rem;
                    }
                    .exploreTheLibrary{
                        margin-top:6rem;
                    }
                    .libraryThreeStepText{
                      margin-bottom:6rem;
                    }
                    .collections{
                      padding-top:9.6rem;
                      padding-bottom: 12.8rem;
                    }
                    @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                      .libraryThreeStepText{
                        margin-bottom:8.5rem;
                      }
                      .productsSectionText {
                        padding-bottom: 9rem;
                      }
                    }
                    @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                      .libraryThreeStepText{
                        margin-bottom:7.3rem;
                      }
                      .productsSectionText {
                        padding-bottom: 7.5rem;
                      }
                    }
                    @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                      .libraryThreeStepText{
                        margin-bottom:5.4rem;
                      }
                    }
                    @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                      .collections{
                        padding-top:6.6rem;
                      }
                    }
                    @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                      .singleProductsWrapper{
                        margin-top:4.8rem;
                      }
                      .standardPaddingBottom{
                        padding-bottom: 9.6rem;
                      }
                      .exploreTheLibrary{
                          margin-top:2.4rem;
                      }
                      .collections{
                        padding-top:3.6rem;
                        padding-bottom: 9.6rem;
                      }
                      .productsSectionText{
                        padding-bottom:0rem;
                      }
                      .libraryThreeStepText{
                        margin-bottom:4.8rem;
                      }
                      .productsSection.gridView .singleProductsWrapper{
                        margin-top: 2rem;
                        display: block;
                      }
                      .productsSection.gridView .singleProductItem{
                        width: 100%;
                        margin-bottom: 3rem;
                      }
                      .productsSection.gridView .singleProductItem:last-child{
                        margin-bottom: 0rem;
                      }
                    }
                  `}
                </style>
              </Layout>
            </>
          )
}
function mapStateToProps({common,selection}){
  return {common,selection}
}
export default connect(mapStateToProps,{setWindow})(Home)