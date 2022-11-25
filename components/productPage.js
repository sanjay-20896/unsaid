import React,{useState,useEffect, useRef} from 'react'
import Layout from '../components/layout'
import { connect } from 'react-redux'
import PdpHeroModule from '../components/pdpHeroModule'
import TwoColumnImage from '../components/twoColumnImage'
import Space from '../components/space'
import TwoStepText from '../components/twoStepText'
import ProductFeatures from '../components/productFeatures'
import {sizeData} from '../data/staticData'
import HotspotModule from '../components/hotspotModule'
import ExploreProducts from '../components/exploreProducts'
import {collectionPageProducts,pdPageGifting,productTaggingCollection} from '../data/staticData'
import GiftingSection from '../components/giftingSection'
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import ThreeImgSet from '../components/threeImgSet'
function productPage(props) {
    // console.log("pdp page props",props)
    const [animateTwoStepText, setAnimateTwoStepText] = useState(false)
    const [sizeGuideOpen,setSizeGuideOpen] = useState(false)
    const [sizeValue, setSizeValue] = useState(44)
    const [changeNav, setChangeNav] = useState(false)

    const twoStepTextRef=useRef();
    const featuresRef=useRef();
    const refToChangeNav=useRef();

    function sizeValueUpdate(value){
        setSizeGuideOpen(false)
        setSizeValue(value)
    }
    function scrollHandler() {
        if((twoStepTextRef.current.getBoundingClientRect().top) < 500 ){
            setAnimateTwoStepText(true)
        }
        if((refToChangeNav.current.getBoundingClientRect().top) < 0){
            setChangeNav(true)
        }else{
            setChangeNav(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);

    useEffect(()=>{
        if(sizeGuideOpen){
            window.scrollTo({
                top: featuresRef.current.getBoundingClientRect().top + 350,
                behavior: 'smooth'
              });
        }
    },[sizeGuideOpen])
    function getDevice(){
        let device = ""
        if(props.common.windowWidth <= MOBILE_BREAKPOINT)
          device = "mobile"
        else if(props.common.windowWidth > MOBILE_BREAKPOINT && props.common.windowWidth <= TABLET_PORTRAIT_BREAKPOINT)
          device = "tablet"
        else 
          device = "desktop"
        return device
    }
    let device = getDevice()
    return (
         <Layout commonData={props.commonProps.commonData} cartNavBar={changeNav} customized={props.customized} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            <>
            {props.common.siteReady &&
                <div className="productPageWrapper">
                <div className="pdpHeroModule">
                    <PdpHeroModule 
                        sizeUpdateInFeatures={(val)=>setSizeValue(val)}
                        sizes={sizeData}
                        device={device}
                        customized={props.customized}
                        mainProductImg="/images/static3d.jpg"
                        sizeGuideOpen={()=>setSizeGuideOpen(!sizeGuideOpen)}
                    />
                    <Space height="0rem" mobileHeight={"9.6rem"}/>
                </div>
                <div ref={refToChangeNav} className="hideForMobile">
                    <div className="twoColImg">
                        <TwoColumnImage 
                            img1="/images/ringOne.png"
                            img2="/images/ringtwo.png" 
                            galleryModal={true}
                            galleryBigImages={["/images/gs1.png","/images/gs2.png","/images/gs3.png"]}
                            gallerySmallImage1="/images/pd-ring1.png"
                            gallerySmallImage2="/images/pd-ring2.png" 
                        />
                    </div>
                    <Space height="22.4rem" mobileHeight={"9.2rem"}/>
                </div>
                <div ref={twoStepTextRef}>
                    <TwoStepText
                        productPage={true} 
                        animate={animateTwoStepText}
                        flexReverse={true}
                        text2="Maximal minimalism"
                        text1="Five brilliant-cut round sustainably-crafted diamonds  set on a satin-finished gold disk"
                    />
                    <Space height="22.4rem" mobileHeight={"4.8rem"}/>
                </div>
                <div className="showForMobile">
                    <ThreeImgSet
                        img1="/images/pd-ring1.png"
                        img2="/images/pd-ring2.png" 
                        img3="/images/ringOne.png"
                        galleryModal={true}
                        galleryImages={["/images/pd-ring1.png", "/images/ringOne.png", "/images/pd-ring1.png","/images/pd-ring2.png"]}
                    />
                    <Space height="22.4rem" mobileHeight={"4.8rem"}/>
                </div>
                {!props.customized && 
                <div className="hideForMobile">
                    <TwoColumnImage 
                        img1="/images/pd-ring1.png"
                        img2="/images/pd-ring2.png" 
                        galleryModal={true}
                        galleryBigImages={["/images/gs1.png","/images/gs2.png","/images/gs3.png"]}
                        gallerySmallImage1="/images/pd-ring1.png"
                        gallerySmallImage2="/images/pd-ring2.png" 
                    />
                    <Space height="2.4rem" mobileHeight={"9.2rem"}/>
                </div>}
                <div ref={featuresRef}>
                    <ProductFeatures 
                        currentSize={sizeValue}
                        sizeValueUpdate={sizeValueUpdate}
                        sizeGuideOpen={sizeGuideOpen}
                        productSizes={sizeData} 
                        img="/images/featureImg.png"
                        mainHeading="The sentimental design of the striking diamond."
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a eu in eros. Pharetra mauris, hac nisl diam. Massa est integer nisi, pellentesque vel. Quis."
                    />
                    <Space height="22.4rem" mobileHeight={"9.6rem"}/>
                </div>
                <div>
                    <TwoColumnImage 
                        img1="/images/product7.png"
                        withText={true}
                        smallText="The inspiration"
                        largeText="Representing what keeps you rooted"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut sit donec sit id tristique. Ipsum sit consectetur nulla lacus, pulvinar. Sit id potenti faucibus vel suspendisse tempus massa. Placerat duis viverra."
                    />
                    <Space height="22.4rem" mobileHeight={"9.6rem"}/>
                </div>
                {props.customized && 
                <div>
                    <HotspotModule 
                        device={device} 
                        imgMobile1="/images/hotspotMobile.png"  
                        imgMobile2="/images/hotspotMobile.png"  
                        img="/images/hotspotCollections.png" 
                        productTagging={productTaggingCollection}
                    />
                    <Space height="22.4rem" mobileHeight={"9.6rem"}/>
                </div>}
                <div>
                    <ExploreProducts products={collectionPageProducts} />
                    <Space height="22.4rem" mobileHeight={"9.6rem"}/>
                </div>
                <div>
                    <GiftingSection heading={"The gift of storytelling"} dataMobile={pdPageGifting} data={pdPageGifting} device={device} class={"unlock"} unlockedGiftingSection={true}/>
                    <Space height="22.4rem" mobileHeight={"9.6rem"}/>
                </div>
            </div>
            }
            <style jsx>{`
                .twoColImg{
                    margin-top:2.5rem;
                }
            `}</style>
            </>
         </Layout>   
    )
}

function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(productPage)