import React,{useState,useEffect, useRef} from 'react'
import Layout from './layout'
import { connect } from 'react-redux'
import PdpHeroModule from './pdpHeroModuleDynamic'
import TwoColumnImage from './twoColumnImageDynamic'
import TwoStepText from './twoStepTextAlt'
import ProductFeatures from './productFeaturesDynamic'
import HotspotModule from './hotspotModuleDynamic'
import ExploreProducts from './exploreProductsDynamic'
import GiftingSection from './giftingSectionDynamic'
import GalleryModal from './galleryModal'
import ProductImagesMobile from './productImagesMobile'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Sanity from '../sanity'
import { getNestedObject, getPriceBasedOnSelection,getQueryVariable,getProductImage ,getImageUrl,getPriceAsNumberBasedOnSelection,randomBannerSelector } from '../functions'
import DiamondAndColorCustomisationTemplate from './diamondAndColorCustomisationTemplate2'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT,SUB_NAV_HEIGHT_DESKTOP,SUB_NAV_HEIGHT_MEDIUM, SUB_NAV_HEIGHT_MOBILE,SUB_NAV_HEIGHT_TABLET,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,SITENAME,TOKEN_VAR_NAME} from '../config'
import Head from 'next/head';
import { useRouter } from 'next/router'
import {preventBodyScroll,standardGiftingAddToCart,setBundleInfo,addProductsToCache,showNavBar,setShowNotification,animateCart,fetchBundledProduct,showCart} from '../redux/actions'
import Like from '../components/likeProduct'
import Loader from '../components/loader'
import {productDetail,productDetailEcomm,onAddToCart} from '../gtmFunctions'
import {ECOMMERCE_URI, UNSAID_API} from "../branch-specific-config"
import product from './product'
import SEO from "./SearchEngineOptimisation"
import useTranslation from 'next-translate/useTranslation'

function productPage(props) {
    // console.log(props)
    const {t}=useTranslation('common');
    
    let variantProductInitial = null
    if(props.sku != props.product.sku){
        //search related products
        if(props.product.relatedProducts){
            variantProductInitial = props.product.relatedProducts.find(p=>p.sku==props.sku)
        }
    }
    const router = useRouter()
    const [customisationWindowShow,showCustomisationWindow] = useState(false)
    const [animateTwoStepText, setAnimateTwoStepText] = useState(false)
    const [sizeGuideOpen,setSizeGuideOpen] = useState(false)
    const [selectedItem,setSelectedItem] = useState(null)
    const [subNavigationShow, showSubNavigation] = useState(false)
    const [variantProduct,setVariantProduct] = useState(variantProductInitial)
    const [galleryModalShow,showGalleryModal] = useState({status:false,imageType:'v1'})
    
    const [color,setColor] = useState(props?.product?.color)
    const [cordColor,setCordColor] = useState(props?.product?.cord_color)
    const [initDone,setInitDone] = useState(false)
    const [addToCartMouse,addToCartMouseEnter] = useState(false)
    const [highlightSelectSize,setHighlightSelectSize] = useState(false)
    const sizeGuideTextRef = useRef(null)
    // const [previouslyVisitedPageLink,setPreviouslyVisitedPageLink] = useState("")
    const [desktopUpsellProducts,setDesktopUpsellProducts] = useState([])
    const [mobileUpsellProducts,setMobileUpsellProducts] = useState([])
    const [stockDetails,setStockDetails] = useState(null)
    // const [desktopProducts,setDesktopProducts] = useState([])
    // const [mobileProducts,setMobileProducts] = useState([])
    const twoStepTextRef=useRef()
    const featuresRef=useRef()
    const refToChangeNav=useRef()
    const subNavRef=useRef()
    let url="";
    function colorClick(color){
        // For normal products
        setColor(color)
    }
    function cordColorClick(color){
        setCordColor(color)
    }
    function setVariant(p){
        // for customisation product, if new uri is same, shallow route else change route
        if(props.product.customisation_possible=="1"){
            // console.log("customisation possible")
            if(!!p && p.uri==props.product.uri){
                // console.log("same uri")
                if(!!selectedItem && !!p.items){
                    let newSelectedItem = p.items.find(item=>item.name==selectedItem.name)
                    if(!!newSelectedItem)
                        setSelectedItem(newSelectedItem)
                }
                router.push(`/products/${props.product.uri}/${p.sku}`,null,{shallow:true})
            } else if(!!p && p.uri!=props.product.uri){
                // console.log("different uri")
                router.push(`/products/${p.uri}/${p.sku}`,null,{shallow:false})
            } 
            setVariantProduct(p?p:null)
        } else {
            // console.log("customisation not possible")
            let product = p?p:props.product
            if(!!selectedItem && !!product.items){
                let newSelectedItem = product.items.find(item=>item.name==selectedItem.name)
                if(!!newSelectedItem)
                    setSelectedItem(newSelectedItem)
            }
            setVariantProduct(p?p:null)
            if(p)
                router.push(`/products/${props.product.uri}/${p.sku}`,null,{shallow:true})
            else
                router.push(`/products/${props.product.uri}/${props.product.sku}`,null,{shallow:true})
        }
    }
    
    function sizeClicked(value){
        setSizeGuideOpen(false)
        let product = variantProduct || props.product
        let items = getNestedObject(product,["items"])
        if(items){
            let item = product.items.find(item=>{
                return item.name == value
            })
            if(item)
                setSelectedItem(item)
        }
    }
    function addToCart(scroll=false){
        if(addToCartEnabled){
            let {product} = props
            let giftingEnabled =  props?.product?.gifting_enabled
            // console.log("gifting status",giftingEnabled)
            let bundledProduct = false
            let relatedProducts = props?.product?.relatedProducts
            if(Array.isArray(relatedProducts))
                bundledProduct = relatedProducts.find(p=>p.relation=="Bundle")
            if(!!bundledProduct && !!giftingEnabled && !!selectedItem){
                let selectedProduct = variantProduct || props.product
                props.standardGiftingAddToCart(bundledProduct.product,props.gifting, product.product,selectedProduct,selectedItem.item,(bool)=>{
                    if(bool){
                        onAddToCart(selectedProduct,props.selection)
                        router.push(`/gifting?bundle=${bundledProduct.product}&jewel=${product.product}&item=${selectedItem.item}`)
                        props.showNavBar(true)
                        props.animateCart(true)
                        // props.showCart(true)
                        setTimeout(()=>{
                            props.animateCart(false)
                        },3000)
                    } else {
                        // console.log('add to cart fail')
                        props.showNavBar(true)
                        props.setShowNotification(t('unexpectedErrorAddingToCart'))
                        setTimeout(()=>{
                            props.setShowNotification(null)
                        },5000)
                    }
                })
            }
            else {
                // console.log('standard add to cart')
            }  
        } else {
            //close gallery modal
            //if disabled reason is size, scroll to select size and highlight select size
            if(scroll){
                showGalleryModal({status:false,imageType:"v1"})
                if(!!sizeGuideTextRef.current){
                    window.scrollTo({
                        top:sizeGuideTextRef.current.getBoundingClientRect().top,
                        behavior:"smooth"
                    })
                    setHighlightSelectSize(true)
                }
            }
        }
    }
    function scrollHandler() {
        if((twoStepTextRef.current.getBoundingClientRect().top) < 500 ){
            setAnimateTwoStepText(true)
        }
        if((refToChangeNav.current.getBoundingClientRect().top) < 0){
            showSubNavigation(true)
        }else{
            showSubNavigation(false)
        }
    }
    useEffect(()=>{
        if(props.common.pageTransitioning && window.innerWidth<=TABLET_PORTRAIT_BREAKPOINT) showSubNavigation(false)
    },[props.common.pageTransitioning])
    function setItem(){
        let items = getNestedObject(currentSelectedProduct,["items"])
        if(Array.isArray(items) && items.length == 1){
            setSelectedItem(items[0])
        }
    }
    function scrollToFeatures(){
        window.scrollTo({
            top:featuresRef.current.getBoundingClientRect().top - subNavRef.current.getBoundingClientRect().height,
            behavior:"smooth"
        })
    }
    useEffect(()=>{
        setItem()
    },[props.product])
    let bundleP = false
    let bundleId = null
    let relatedPs = props?.product?.relatedProducts
    if(Array.isArray(relatedPs))
        bundleP = relatedPs.find(p=>p.relation=="Bundle")
    if(!!bundleP)
        bundleId = bundleP.product
    // console.log(bundleP)
    let currentSelectedProduct = variantProduct || props.product
    let productImages = getNestedObject(currentSelectedProduct,["media","standard"])
    let variants = getNestedObject(props,["content","variants"])
    let variantContent = Array.isArray(variants)?variants.find(variant=>variant.variantId==currentSelectedProduct.product):null
    let hotspotModule = getNestedObject(props,["content","hotspotModule"])
    let customisationData = getNestedObject(props,["content","productCustomisationTemplate"])
    let productPrice = getPriceBasedOnSelection(currentSelectedProduct,props.selection)
    let text2 = currentSelectedProduct?.variant_sub_description_1_value
    let text1 = currentSelectedProduct?.variant_description_1_value
    let hotspotModuleVisible = getNestedObject(props,["content","hotspotModule","status","visible"])
    let productFeaturesVisible = getNestedObject(props,["content","productSpecs","status","visible"])
    let title=`${props.product.name} | ${props.product.brandName}`
    let description=`${props.product.excerpt}`
    let seoImage=getProductImage(currentSelectedProduct,"v1","high")
    let m1 = getProductImage(currentSelectedProduct,"m1","large")
    // console.log("model image 1",m1)
    let m1Blur = getProductImage(currentSelectedProduct,"m1","blur")
    let m1Mobile = m1
    let m1High = getProductImage(currentSelectedProduct,"m1","high")
    let m1BlurOriginal = m1Blur
    let m2 = getProductImage(currentSelectedProduct,"m2","large")
    // console.log("model image",m2)
    let m2Blur = getProductImage(currentSelectedProduct,"m2","blur")
    let m2Mobile = m2
    let m2High = getProductImage(currentSelectedProduct,"m2","high")
    let m2BlurOriginal = m2Blur
    let v1 = getProductImage(currentSelectedProduct,"v1","large")
    let v1Blur = getProductImage(currentSelectedProduct,"v1","blur")
    let v1High = getProductImage(currentSelectedProduct,"v1","high")
    let v2 = getProductImage(currentSelectedProduct,"v2","large")
    let v2Blur = getProductImage(currentSelectedProduct,"v2","blur")
    let v2Mobile = v2
    let v2High = getProductImage(currentSelectedProduct,"v2","high")
    let v2BlurOriginal = v2Blur
    let v3 = getProductImage(currentSelectedProduct,"v3","large")
    let v3Blur = getProductImage(currentSelectedProduct,"v3","blur")
    let v3Mobile = v3
    let v3High = getProductImage(currentSelectedProduct,"v3","high")
    let v3BlurOriginal = v3Blur
    let f1 = getProductImage(currentSelectedProduct,"f1","large")
    
    let f1Blur = getProductImage(currentSelectedProduct,"f1","blur")
    let f1Mobile = f1
    let f1High = getProductImage(currentSelectedProduct,"f1","high")
    let f1BlurOriginal = f1Blur
    // console.log("f1",f1,f1Blur)
    let p1 = getProductImage(currentSelectedProduct,"p1","standard")
    let p1Blur = getProductImage(currentSelectedProduct,"p1","blur")
    let threeDAvailable = currentSelectedProduct.three_d_available=="1"
    let m1Video = currentSelectedProduct.variant_product_model_video_1_url;
    let m2Video = currentSelectedProduct.variant_product_model_video_2_url;
    // console.log(m1Video,m2Video);
    // console.log(m1,m2)
    //console.log("current selected product :",currentSelectedProduct)
    //console.log("3d src code",currentSelectedProduct.three_d_src_code)
    if(!threeDAvailable && ((m1 && !m2) || (!m1 && m2))){
        m1=m1?m1:m2
        m1Blur=m1Blur?m1Blur:m2Blur
        m2 = v3
        m2Blur = v3Blur
        f1 = f1?f1:v2
        f1Blur = v2Blur
        v2 = null
        v3 = null
        //console.log("no three d available and either m1 or m2 missing")
    }
    
    if(threeDAvailable && ((m1 && !m2) || (!m1 && m2))){
        m1=m1?m1:m2
        m1Blur=m1Blur?m1Blur:m2Blur
        m2 = f1
        m2Blur = f1Blur
        //console.log("three d available and either m1 or m2 missing")
    }
    if(!m1 && !m2){
        m1 = v2
        m1Blur = v2Blur
        m2 = v3
        m2Blur = v3Blur
        v2 = null
        v3 = null
        //console.log("no m1 and m2")
    }
    function getAddToCartInfo(){
        let addToCartEnabled = true
        let disableReason = ""
        let addToCartContentOnMouseHover = addToCartContent
        if(loading){
            addToCartEnabled = false
            disableReason = "loading"
        }
        else if(!selectedItem){
            addToCartContentOnMouseHover = t('pleaseSelectSize')
            addToCartEnabled = false
            disableReason = "size"
        }
        return {addToCartEnabled,addToCartContentOnMouseHover,disableReason}
    }
    let loading = props.common.addingToCart || props.selection.gettingSelection || props?.gifting?.bundle[bundleId]?.fetchingBundleData
    let addToCartContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:`${getPriceBasedOnSelection(currentSelectedProduct,props.selection)} – ${t('addToCart')}`
    let {addToCartEnabled,addToCartContentOnMouseHover,disableReason} = getAddToCartInfo()
    let showAddToCartButton = props.product.gifting_enabled=="1" && !!props.gifting.bundle[bundleId]
    let subNavAddToCartContent = addToCartMouse?addToCartContentOnMouseHover:addToCartContent
    useEffect(()=>{
        props.preventBodyScroll(galleryModalShow.status);
    },[galleryModalShow.status])
    useEffect(()=>{
        props.preventBodyScroll(customisationWindowShow);
    },[customisationWindowShow])
    useEffect(()=>{
        if(initDone){
            if(color.color_hex_2){
                if(props?.product?.product_type_value=="cord"){
                    if(color.color_hex==props?.product?.color?.color_hex && color.color_hex_2==props?.product?.color.color_hex_2 && cordColor?.hex==props?.product?.cord_color?.hex){
                        setVariant(null)
                    } else {
                        let p=props?.product?.relatedProducts.find(rp=>{
                            return (
                                rp?.color?.color_hex==color.color_hex && rp?.cord_color?.hex==cordColor?.hex && rp?.color?.color_hex_2==color.color_hex_2
                            )
                        })                     
                        if(p)
                            setVariant(p)
                    }
                } else {
                    if(color.color_hex==props?.product?.color?.color_hex && color.color_hex_2==props?.product?.color?.color_hex_2){
                        setVariant(null)
                    } else {
                        let p=props?.product?.relatedProducts.find(rp=>rp.color.color_hex==color.color_hex && rp.color.color_hex_2==color.color_hex_2)
                        if(p)
                            setVariant(p)
                    }  
                }
            } else {
                if(props?.product?.product_type_value=="cord"){
                    if(color.color_hex==props?.product?.color?.color_hex && cordColor?.hex==props?.product?.cord_color?.hex){
                        setVariant(null)
                    } else {
                            let p = props?.product?.relatedProducts.find(rp=>
                                rp?.color?.color_hex==color.color_hex && rp?.cord_color?.hex==cordColor.hex
                            )
                            if(p)
                                setVariant(p)
                    }
                } else {
                    if(color.color_hex==props.product.color.color_hex && !color.color_hex_2){
                        setVariant(null)
                    } else {
                        //loop through related products and set variant to related product
                        let p = props?.product?.relatedProducts.find(rp=>rp?.color?.color_hex==color.color_hex)
                        if(p)
                            setVariant(p)
                    }
                }
            }
        }
    },[color,cordColor])
    useEffect(()=>{
        if(props?.product?.gifting_enabled && !!bundleId)
            props.fetchBundledProduct(bundleId)  
    },[props?.selection?.selection?.location?.country,props.product])
    function pdpAddToCartMouseEnter(bool){
        if(bool && !addToCartEnabled && disableReason=="size")
            setHighlightSelectSize(true)
        else
            setHighlightSelectSize(false)
    }
    const isInitialMount = useRef(true);
    useEffect(()=>{
        if (isInitialMount.current) {
            isInitialMount.current = false;
         } else {
            let variantProductToSet = null
            if(props.sku != props.product.sku){
                //search related products
                if(props.product.relatedProducts){
                    variantProductToSet = props.product.relatedProducts.find(p=>p.sku==props.sku)
                }
            }
            setVariantProduct(variantProductToSet)
         }
    },[props.product])
    useEffect(()=>{    
        productDetail(currentSelectedProduct)
        productDetailEcomm(currentSelectedProduct,props.selection)
    },[currentSelectedProduct])
    useEffect(() => {
        setItem()
        setInitDone(true)
        url=window.location.href;
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        }
    }, [])
    // useEffect(()=>{
    //     if(!props.common.pageTransitioning){
    //         props.showCart(false)
    //     }
    // },[props.common.pageTransitioning])
    
    useEffect(()=>{
        if(sizeGuideOpen){
            window.scrollTo({
                top: featuresRef.current.getBoundingClientRect().top + 350,
                behavior: 'smooth'
            });
        }
    },[sizeGuideOpen])
    useEffect(()=>{
        if(customisationWindowShow)
            props.preventBodyScroll(true)
        else
            props.preventBodyScroll(false)
    },[customisationWindowShow])
    // console.log("m1High",m1High)
    // console.log("m2High",m2High)
    // console.log("m1",m1,"m2",m2,"m2Video",m1Video,"m2Video",m2Video)
    // useEffect(()=>{
    //     console.log("window",window)
    // },[])
    function getPreviouslyVisitedLink(){
        let lastViewedPage=localStorage.getItem("previouslyVisitedPage");
        // let link=lastViewedPage
        lastViewedPage=lastViewedPage?.split("/")
        if(lastViewedPage?.includes("products")){
            return "products"
        }else if(lastViewedPage?.includes("categories")|| lastViewedPage?.includes("materials") || lastViewedPage?.includes("gemstones") || lastViewedPage?.includes("style") || lastViewedPage?.includes("gifts")){
            return "categories"
        }else if(lastViewedPage?.includes("collections") || lastViewedPage?.includes("collection")){
            return "collections"
        }else if(lastViewedPage?.includes("library")){
            return "library"
            // return "library"
        }else{
            return "external"
            // return "external"
        }
    }
  

    const chooseRandom = (arr, num = 1) => {
        const res = [];
        for(let i = 0; i < num; ){
           const random = Math.floor(Math.random() * arr.length);
           if(res.indexOf(arr[random]) !== -1){
              continue;
           };
           res.push(arr[random]);
           i++;
        };
        return res;
     };

    function getProducts(type,device,row,mainProduct,allProducts){
        let collection =mainProduct.collection;
        let category=mainProduct.category;
       
        let percentageVal = 0.25
       
        let row1Items=[];
        let row2Items=[];
        let mobileItems=[]
        if(type==="category"){
            if(device==="Desktop"){
                if(row==="row1"){
                    while(!(row1Items.length>3)){
                        if(percentageVal>1){
                            break;
                        }else{
                            let price=!!props.product.prices? getPriceAsNumberBasedOnSelection(props.product,props.selection):props.product.priceAsNumber
                            let higherPrice=price + (price * percentageVal)
                            let lowerPrice=price - (price * percentageVal)
                            
                            let selectedPriceRangeProducts=allProducts.filter((p)=>{
                                return p.priceAsNumber>=lowerPrice && p.priceAsNumber<=higherPrice
                            })
                            let categoryItems=selectedPriceRangeProducts.filter((p)=>{
                                return p.category===category && p.collection!=collection
                            })
                            row1Items=categoryItems.length>3 ? chooseRandom(categoryItems,3):categoryItems.slice(0,3)
                        }
                        percentageVal+=0.15;
                    }
                    if(row1Items.length!=3){
                       
                        row1Items=[]
                    }
                    // console.log("****",row1Items)
                    return row1Items
                    //get same category, different collection - random
                    // return row1Items
                }
                if(row==="row2"){
                    while(!(row2Items.length>3)){
                        if(percentageVal>1){
                            break;
                        }else{
                            let price=!!props.product.prices? getPriceAsNumberBasedOnSelection(props.product,props.selection):props.product.priceAsNumber
                            let higherPrice=price + (price * percentageVal)
                            let lowerPrice=price - (price * percentageVal)
                            let selectedPriceRangeProducts=allProducts.filter((p)=>{
                                return p.priceAsNumber>=lowerPrice && p.priceAsNumber<=higherPrice
                            })
                            let sameCollectionProducts=selectedPriceRangeProducts.filter((p)=>{
                                let additionalCondition=category!="14" && category!="3"?p.category!="3" && p.category!="14":true
                                return p.collection==collection && p.category!=category && additionalCondition
                            })
                            let product1;
                            let product2;
                            let product3;
                            if(category=="4"){
                                product1=sameCollectionProducts.filter((p)=>{
                                    p.category=="2"
                                }).length>0 ? randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    p.category=="2" 
                                })):null;
                            }else if(category=="2"){
                                product1=sameCollectionProducts.filter((p)=>{
                                    return p.catgeory=="4"
                                }).length>0 ? randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                   return p.category=="4"
                                })):null
                            }else{
                                product1=sameCollectionProducts.filter((p)=>{
                                    return p.category=="4" || p.category=="2"
                                }).length>0 ? randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    return p.category=="4" || p.category=="2"
                                })):null;
                            }
                            if(category=="11"){
                                product2=sameCollectionProducts.length>0 ?randomBannerSelector(sameCollectionProducts):null;
                            }else{
                                product2=sameCollectionProducts.filter(p=>{
                                    return p.category=="11"
                                }).length>0 ?randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    return p.category=="11" && product1?.product!=p.product
                                })):null
                            }
                            if(category=="4"){
                                product3=sameCollectionProducts.filter((p)=>{
                                    p.category=="2"
                                }).length>0 ? randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    p.category=="2"  && p.product!=product2?.product
                                })):null;
                            }else if(category=="2"){
                                product3=sameCollectionProducts.filter((p)=>{
                                    return p.catgeory=="4"
                                }).length>0 ? randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                   return p.category=="4" && p.product!=product2?.product
                                })):null
                            }else{
                                product3=sameCollectionProducts.filter((p)=>{
                                    return p.category=="4" || p.category=="2"
                                }).length>0 ? randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    return(p.category=="4" || p.category=="2") && p.product!=product2?.product
                                })):null;
                            }
                            if(!product1){
                                product1=randomBannerSelector(sameCollectionProducts)
                            }
                            if(!product2){
                                product2=randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    return p.product!=product1?.product
                                }))
                            }
                            if(!product3){
                                product3=randomBannerSelector(sameCollectionProducts.filter((p)=>{
                                    return p.product!=product2?.product
                                }))
                            }

                            if(!!product1 && !!product2 && !!product3){
                                row1Items=[].concat(product1).concat(product2).concat(product3)
                            }else{
                                row1Items=[]
                            }
                        }
                        percentageVal+=0.15 
                    }
                    if(row2Items.length!=3){
                       
                        row2Items=[]
                    }
                    return  row1Items;
                }
            }else {
                while(!(mobileItems.length>3)){
                    if(percentageVal>1){
                        break;
                    }else{
                       
                        let price=!!props.product.prices? getPriceAsNumberBasedOnSelection(props.product,props.selection):props.product.priceAsNumber
                        let higherPrice=price + (price * percentageVal)
                        let lowerPrice=price - (price * percentageVal)
                        let selectedPriceRangeProducts=allProducts.filter((p)=>{
                            return p.priceAsNumber>=lowerPrice && p.priceAsNumber<=higherPrice
                        })
                        
                        let categoryItems=selectedPriceRangeProducts.filter((p)=>{
                            return p.category===category && p.collection!=collection
                        })
                        let productSet1=categoryItems.length>3 ? chooseRandom(categoryItems,2):categoryItems.slice(0,2)
                        // console.log(productSet1)
                        let collectionItems=selectedPriceRangeProducts.filter((p)=>{
                            let additionalCondition=category!="14" && category!="3"?p.category!="3" && p.category!="14":true
                            return p.collection===collection && p.category!=category && additionalCondition
                        })
                        let productSet2=collectionItems.length>1 ? randomBannerSelector(collectionItems):collectionItems.slice(0,1)
                        // console.log(productSet2)
                        // if(productSet1.length!=2 && !productSet2){
                        //     mobileItems=[].concat(productSet1).concat(productSet2)
                        // }
                        mobileItems=[].concat(productSet1).concat(productSet2)
                        percentageVal+=0.15;
                }
                if(mobileItems.length!=3){
                    mobileItems=[]
                }
                return mobileItems
                }
            }   
            
        }else{
                if(device==="Desktop"){
                    if(row==="row1"){
                        while(!(row1Items.length>3)){
                            if(percentageVal>1){
                                break;
                            }else{
                                let price=!!props.product.prices? getPriceAsNumberBasedOnSelection(props.product,props.selection):props.product.priceAsNumber
                            let higherPrice=price + (price * percentageVal)
                            let lowerPrice=price - (price * percentageVal)
                            let selectedPriceRangeProducts=allProducts.filter((p)=>{
                                return p.priceAsNumber>=lowerPrice && p.priceAsNumber<=higherPrice
                            })
                            let collectionItems=selectedPriceRangeProducts.filter((p)=>{
                                return p.collection==collection && p.category!=category
                            })
                            row1Items=collectionItems.length>3?chooseRandom(collectionItems,3):collectionItems.slice(0,3);
                            }
                            percentageVal+=0.15;
                        }
                        if(row1Items.length!=3){
                            row1Items=[]
                        }
                        return row1Items
                    }
                    if(row==="row2"){
                       while(!(row2Items.length>3)){
                           if(percentageVal>1){
                               break;
                           }else{
                                let price=!!props.product.prices? getPriceAsNumberBasedOnSelection(props.product,props.selection):props.product.priceAsNumber
                                let higherPrice=price + (price * percentageVal)
                                let lowerPrice=price - (price * percentageVal)
                                let selectedPriceRangeProducts=allProducts.filter((p)=>{
                                    return p.priceAsNumber>=lowerPrice && p.priceAsNumber<=higherPrice
                                })
                                let categoryItems=selectedPriceRangeProducts.filter((p)=>{
                                    let additionalCondition=category!="14" && category!="3"?p.category!="3" && p.category!="14":true                                    
                                    return p.collection!=collection && p.category===category && additionalCondition
                                })
                                
                                let productSet=categoryItems.length>3 ? chooseRandom(categoryItems,3):categoryItems.slice(0,3)
                                row2Items=[].concat(productSet)
                                // row2Items=categoryItems.length>3? chooseRandom(categoryItems,3):categoryItems.slice(0,3);
                            }
                            percentageVal+=0.15
                       }
                       if(row2Items.length!=3){
                           row2Items=[]
                       }
                       return row2Items
                    }
                }else{
                   while(!(mobileItems.length>3)){
                       if(percentageVal>1){
                           break;
                       }else{
                        let price=!!props.product.prices? getPriceAsNumberBasedOnSelection(props.product,props.selection):props.product.priceAsNumber
                        let higherPrice=price + (price * percentageVal)
                        let lowerPrice=price - (price * percentageVal)
                        let selectedPriceRangeProducts=allProducts.filter((p)=>{
                            return p.priceAsNumber>=lowerPrice && p.priceAsNumber<=higherPrice
                        })
                        let collectionItems=selectedPriceRangeProducts.filter((p)=>{
                            return p.collection==collection && p.category!==category
                        })
                        let productSet1=collectionItems.length>2?chooseRandom(collectionItems,2):collectionItems.slice(0,2)
                        let categoryItems=selectedPriceRangeProducts.filter((p)=>{
                            let additionalCondition=category!="14" && category!="3"?p.category!="3" && p.category!="14":true 
                            return category==p.category && additionalCondition && collection!=p.collection                                   
                        })
                        let productSet2=categoryItems.length>1 ? randomBannerSelector(categoryItems):categoryItems.slice(0,1)
                        mobileItems=[].concat(productSet1).concat(productSet2)
                       }
                       percentageVal+=0.15
                   }
                   if(mobileItems.length!=3){
                       mobileItems=[]
                   }
                   return mobileItems
                }
            }
            
    }
    async function getUpsellProducts(){
        let previouslyVisitedPageLink=getPreviouslyVisitedLink()
        // let collection = props?.product?.collection;
        // let category=props?.product?.category;
        let allProducts=[];
        let token=localStorage.getItem(TOKEN_VAR_NAME)
        let response=await fetch(`${ECOMMERCE_URI}/products`,{
            method: "POST",
            headers:{
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify(
                {
                    "categories":[1],
                    "relatedProducts":true,
                    "language":`${router.locale}`
                }
            )
        })
        let data=await response.json()
        
        if(response.status==200){
            allProducts=data.products
        }
        let mobileItems=[];
        let desktopItems=[];
        // let initialPercentageIndex=0.25
        allProducts=allProducts.filter((p)=>{
            return !(p.product===props.product.product)
        })
        // console.log(allProducts)
        if(previouslyVisitedPageLink==="products" || previouslyVisitedPageLink==="categories" || previouslyVisitedPageLink==="external"){
            let desktopProductsRow1= getProducts("category","Desktop","row1",props.product,allProducts)
            // console.log("row1",desktopProductsRow1);
            let desktopProductsRow2 = getProducts("category","Desktop","row2",props.product,allProducts)
            // console.log("row2",desktopProductsRow2);
            if(desktopProductsRow1.length!=3 || desktopProductsRow2.length!=3){
                desktopItems=[]
            }else{
                desktopItems=[].concat(desktopProductsRow1).concat(desktopProductsRow2)
            }
            let mobileProducts=getProducts("category","Mobile",null,props.product,allProducts);
            if(mobileProducts.length!=3){
                mobileItems=[]
            }else{
                mobileItems=mobileProducts
            }
        } else {
            let desktopProductsRow1=getProducts("collection","Desktop","row1",props.product,allProducts);
            let desktopProductsRow2=getProducts("collection","Desktop","row2",props.product,allProducts);
            if(desktopProductsRow1.length!=3 || desktopProductsRow2.length!=3){
                desktopItems=[]
            }else{
                desktopItems=[].concat(desktopProductsRow1).concat(desktopProductsRow2)
            }
            let mobileProducts=getProducts("collection","mobile",null,props.product,allProducts);
            if(mobileProducts.length!=3){
                mobileItems=[]
            }else{
                mobileItems=[].concat(mobileProducts)
            }
        }
        // console.log("desktop",desktopItems);
        // console.log("mobile",mobileItems);
        if(desktopItems.length<6){
            // console.log("desktop products from explore products")
            setDesktopUpsellProducts(allProducts?.filter((product)=>product.collection===currentSelectedProduct.collection).slice(0,6))
            // setDesktopUpsellProducts(props.exploreProducts.slice(0,6))
        }else{
            setDesktopUpsellProducts(desktopItems)
        }
        if(mobileItems.length<3){
            // console.log("mobile products from explore products")
            // setMobileUpsellProducts(props.exploreProducts.slice(0,3))
            setMobileUpsellProducts(allProducts.filter((product)=>product.collection===currentSelectedProduct.collection).slice(0,3))
        }else{
            setMobileUpsellProducts(mobileItems)
        }
        
    }
    useEffect(()=>{
        getUpsellProducts()
    },[props?.selection?.selection?.location?.country,props.product])

    async function getStockDetails(eans){
        let response=await fetch(`${UNSAID_API}/api/getStockDetails`,{
            method: "POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"eans": eans})
        })
        let data=await response.json()
        // console.log("data res",data);
        if(data.ResponseStatus=="Success"){
            setStockDetails(data.ResponseData)
        }
    }
    useEffect(()=>{
        let eans = [];
        currentSelectedProduct?.items.forEach(item=>{
            eans.push(item.ean)
        })
        getStockDetails(eans);
    },[currentSelectedProduct])
    // console.log("stockDetails",stockDetails);
    return (
        <>
        {/* <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} key="title"/> 
            <meta property="og:description" content={`${description ? description:""}`} key="description"/>
            <meta property="og:type" content="website" key="article"/>
            <meta property="og:image" content={seoImage} key="productImage"/>
            <meta property="og:site_name" content={SITENAME} key="siteName"/>
            <meta property="og:url" content={url} key="url"/>
        </Head> */}
        <SEO title={title} description={description} image={seoImage}/>
         <Layout commonData={props.commonProps.commonData} showNav={subNavigationShow?"no":"yes"} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            <div ref={subNavRef} className={`subNavProduct paddedContent ${subNavigationShow?"show":""}`} key={`productPage_${props.product.product}`}>
                <div className="cartNav">
                    <div className="productName font20 hideForMobile">{currentSelectedProduct.name}</div>
                    {currentSelectedProduct.customisation_possible=="1" &&
                        <div onClick={()=>showCustomisationWindow(true)} className="customizeButton hideForMobile"><button className="btn btnSecondary anoRegular">{t('customise')}</button></div>
                    }
                    <div style={{animationDelay:"1.2s"}} className="addToCart">
                        <button className={`btn btnPrimary anoRegular ${props.common.addingToCart || highlightSelectSize?"black":""}`} onClick={()=>addToCart(true)} onMouseEnter={()=>addToCartMouseEnter(true)} onMouseLeave={()=>addToCartMouseEnter(false)}>{subNavAddToCartContent}</button>
                        <Like  className="favIcon" product={props.product}/>
                    </div>
                </div>
            </div>
            <div className="productPageWrapper" key={`productPage_${props.product.uri}`}>
                    <div className={`galleryModalProduct ${galleryModalShow.status?"show":""}`} key={`galleryModal_${currentSelectedProduct.product}`}>
                        <GalleryModal 
                            addToCartContent={addToCartContent}
                            addToCartContentOnMouseHover={addToCartContentOnMouseHover}
                            showAddToCartButton={showAddToCartButton}
                            // addToCartContent={addToCartContent} 
                            selectedItem={selectedItem}  
                            setSelectedItem={setSelectedItem} 
                            product={props.product} 
                            showGalleryModal={showGalleryModal} 
                            content={props.content} 
                            addToCart={addToCart}
                            galleryModal={galleryModalShow}
                            imageType={galleryModalShow.imageType} 
                            images={[
                                {type:"v1",imageFull:v1High,imageBlur:v1Blur},
                                {type:"v2",imageFull:v2High,imageBlur:v2Blur},
                                {type:"v3",imageFull:v3High,imageBlur:v3Blur},
                                {type:"m1",imageFull:m1High,imageBlur:m1Blur},
                                {type:"m2",imageFull:m2High,imageBlur:m2Blur},
                                {type:"f1",imageFull:f1High,imageBlur:f1Blur},
                            ]}
                        />
                    </div>
                    <div className="pdpHeroModule standardPaddingBottom">
                        <PdpHeroModule 
                            setHighlightSelectSize={setHighlightSelectSize}
                            sizeGuideTextRef={sizeGuideTextRef}
                            showShipBy={addToCartEnabled}
                            pdpAddToCartMouseEnter={pdpAddToCartMouseEnter}
                            highlightSelectSize={highlightSelectSize}
                            addToCartContent={addToCartContent}
                            addToCartContentOnMouseHover={addToCartContentOnMouseHover}
                            showAddToCartButton={showAddToCartButton}
                            bundleId = {bundleId}
                            v1 = {v1}
                            v1Blur = {v1Blur}
                            p1 = {p1}
                            p1Blur={p1Blur}
                            threeDAvailable={threeDAvailable}
                            setSelectedItem={setSelectedItem}
                            selectedItem={selectedItem}
                            scrollToFeatures={scrollToFeatures}
                            sizeGuideOpen={()=>setSizeGuideOpen(!sizeGuideOpen)}
                            product={props.product}
                            currentSelectedProduct={currentSelectedProduct}
                            colorClick={colorClick}
                            cordColorClick={cordColorClick}
                            showCustomisationWindow={showCustomisationWindow}
                            addToCart={addToCart}
                            sizeGuide={!!props.sizeGuide}
                            showGalleryModal={showGalleryModal}
                            imageClickOpensGalleryModal = {true}
                            sizeGuideData={props.sizeGuide}
                            stockDetails={stockDetails}
                        />
                        <div ref={refToChangeNav}></div>
                            <div className="hideForMobile" key={`two_col_img_${currentSelectedProduct.product}`}>
                                    <div className="twoColImg">
                                        <TwoColumnImage 
                                            img1={m1}
                                            img1Blur={m1Blur}
                                            img2={m2}
                                            img2Blur={m2Blur}
                                            alt1={currentSelectedProduct.name}
                                            alt2={currentSelectedProduct.name}
                                            showGalleryModal={showGalleryModal}
                                            imageClickOpensGalleryModal = {true}
                                            width={972}
                                            height={972}
                                            priority={true}
                                            m1Video={m1Video}
                                            m2Video={m2Video}
                                            imageType1={"m1"}
                                            imageType2={"m2"}
                                        />
                                    </div>
                            </div>
                    </div>
                    <div ref={twoStepTextRef} key={`twoStepText_${currentSelectedProduct.product}`}>
                        <div className="standardPaddingBottom twoStepText" key={`two_step_text_${currentSelectedProduct.product}`}>
                            <div className="additionalPaddingMobile">
                                <TwoStepText
                                    productPage={true} 
                                    animate={true}
                                    flexReverse={true}
                                    text2={text2}
                                    text1={text1}
                                />
                            </div>
                        </div>
                    </div>
                    {Array.isArray(productImages) &&
                        <div className="showForMobile threeImgSet" key={`product_images_mobile_${currentSelectedProduct.product}`}>
                            <ProductImagesMobile
                                v2={v2Mobile}
                                v2Blur={v2BlurOriginal}
                                imageType1={"v2"}
                                v3={v3Mobile} 
                                v3Blur={v3BlurOriginal}
                                imageType2={"v2"}
                                f1={f1Mobile}
                                f1Blur={f1BlurOriginal}
                                imageType3={"v2"}
                                m1={m1Mobile}
                                m1Blur={m1BlurOriginal}
                                imageType4={"m1"}
                                m2={m2Mobile}
                                m2Blur={m2BlurOriginal}
                                imageType5={"m2"}
                                productName={props.product.name}
                                productPrice={productPrice} 
                                showGalleryModal={showGalleryModal}
                            />
                        </div>
                    }
                    {!!v2 && !!v3 && 
                        <div className="hideForMobile imgAboveFeatures" key={`img_above_features_${currentSelectedProduct.product}`}>
                            <TwoColumnImage 
                                img1={v2}
                                img1Blur={v2Blur}
                                img2={v3} 
                                img2Blur={v3Blur}
                                alt1={currentSelectedProduct.name}
                                alt2={currentSelectedProduct.name}
                                width={858}
                                height={858}
                                imageClickOpensGalleryModal = {true}
                                showGalleryModal={showGalleryModal}
                                imageType1={"v2"}
                                imageType2={"v3"}
                            />
                        </div>
                    }
                    {/* {!!productFeaturesData && !!productFeaturesVisible && */}
                        <div ref={featuresRef} className="standardPaddingBottom" key={`features_${currentSelectedProduct.product}`}>
                            <ProductFeatures 
                                f1={f1}
                                f1Blur={f1Blur}
                                sizeGuide={props.sizeGuide}
                                currentSelectedProduct={currentSelectedProduct}
                                currentSize={selectedItem?selectedItem.name:""}
                                sizeClicked={sizeClicked}
                                sizeGuideOpen={sizeGuideOpen}
                                variantContent={variantContent}
                                status={productFeaturesVisible}
                                showGalleryModal={showGalleryModal}
                                imageClickOpensGalleryModal = {true}
                            />
                        </div>
                    {/* } */}
                    {!!props.inspiration &&
                        <div className="standardPaddingBottom">
                            <TwoColumnImage 
                                alt1={props.inspiration.title}
                                img1={getImageUrl(props.inspiration.image,858)}
                                img1Blur={getImageUrl(props.inspiration.image,20)}
                                withText={true}
                                smallText={props.inspiration.title}
                                largeText={props.inspiration.largeText}
                                content={props.inspiration.content}
                            />
                        </div>
                    }
                    {!!hotspotModule && !!hotspotModuleVisible &&
                        <div className="standardPaddingBottom">
                            <HotspotModule 
                                heading={hotspotModule.heading}
                                imgMobile={hotspotModule.mainImageMobile}
                                img= {hotspotModule.mainImageDesktop}
                                productTagging={hotspotModule.centraProductTagging}
                                productTaggingMobile={props.content.hotspotModule.centraProductTaggingMobile}
                            />
                        </div>
                    }
                    
                    <div className="standardPaddingBottom">
                        <ExploreProducts products={props.exploreProducts} desktopUpsellProducts={desktopUpsellProducts} mobileUpsellProducts={mobileUpsellProducts}  limitProducts={props.limitProducts} collection={props.product.collection} heading="Explore more "/>
                    </div>
                    
                    {!!props?.common?.globalSettings?.giftingSection?.status?.visible &&
                        <div className="standardPaddingBottom">
                            <GiftingSection 
                                heading={props.common.globalSettings.giftingSection.heading} 
                                dataMobile={props.common.globalSettings.giftingSection.giftCollection} 
                                data={props.common.globalSettings.giftingSection.giftCollection} 
                                class="unlock"
                                unlockedGiftingSection={true}
                                lazy={true}
                            />
                        </div>
                    }
                    {props.product.customisation_possible=="1" &&
                        <div className={`customViews ${customisationWindowShow?"show":""}`}>
                            {customisationWindowShow && props.product.customisation_template=="diamond_and_color" && !!customisationData &&
                                <DiamondAndColorCustomisationTemplate 
                                    showCustomisationWindow={showCustomisationWindow}
                                    customisationData = {customisationData}
                                    product={props.product}
                                    currentSelectedProduct={currentSelectedProduct}
                                    setVariant = {setVariant}
                                />
                            }
                        </div> 
                    }
                </div>
            <style jsx>{`
                .customizeButton{
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%, -50%);
                }
                .addToCart{
                    display:flex;
                    justify-content: center;
                    align-items: center;
                }
                .addToCart button{
                    margin-right:1.15rem;
                    min-width:28rem;
                }
                .addToCart button.black,.addToCart button:hover{
                    color:#ffffff;
                    background:#000000;
                }
                .cartNav{
                    height: ${SUB_NAV_HEIGHT_DESKTOP}px;
                    display: flex;
                    justify-content: space-between;
                    align-items:center;
                }
                .twoColImg{
                    margin-top:9.4rem;
                }
                .threeImgSet{
                    padding-bottom:4.8rem;
                }
                .imgAboveFeatures{
                    margin-bottom:2.4rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .twoColImg{
                        margin-top:7.6rem;
                    }
                    .cartNav{
                        height: ${SUB_NAV_HEIGHT_MEDIUM}px;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .cartNav{
                        height: ${SUB_NAV_HEIGHT_TABLET}px;
                    }
                    .addToCart button{
                        min-width:24rem;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .cartNav{
                        height: ${SUB_NAV_HEIGHT_TABLET}px;
                    }
                    .customizeButton{
                        padding-right:1rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .addToCart{
                        width:100%;
                    }
                    .cartNav{
                        height: ${SUB_NAV_HEIGHT_MOBILE}px;
                    }
                    .customViews{
                        height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                    } 
                    .galleryModalProduct{
                        height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                    }
                    .twoStepText{
                        padding-bottom:4.8rem;
                    }
                    .addToCart button{
                        margin-right:0rem;
                        padding:1.2rem 1rem;
                    }
                }
                @media screen and (max-width: 600px){
                    .addToCart button{
                        margin-right:0rem;
                    }
                }
            `}</style>
            
         </Layout>
         </>   
    )
}

function mapStateToProps({common,selection,gifting,cache}){
    return {common,selection,gifting,cache}
}
export default connect(mapStateToProps,{preventBodyScroll,standardGiftingAddToCart,setBundleInfo,addProductsToCache,showNavBar,setShowNotification,animateCart,fetchBundledProduct,showCart})(productPage)
