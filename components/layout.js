import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import {connect} from 'react-redux'
import {setWindow,setShopTheLookProducts,setMode,setWindow2,gettingSelection,storeSelection,updateLikes,showNavBar,addProductsToCache,fetchBundledProduct,updateCartLikes,preventBodyScroll,setShowNotification,setShowBrandNotification,showCart,showWishlist,showMyUnsaidMenu,showExploreMenu,setGlobalSettings,syncLikes,syncCartLikes,pageTransitioning,setPlpPaths,setMenuData,setLanguages,setMenuDataFetchStart,setActiveTier1Item} from '../redux/actions'
import { HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MEDIUM,HEADER_HEIGHT_TABLET, MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TOKEN_VAR_NAME,MOBILE_BREAKPOINT,HEADER_HEIGHT_MOBILE, LOCAL_LIKES_VAR_NAME, LOCAL_GIFTS_VAR_NAME, TABLET_PORTRAIT_BREAKPOINT } from '../config'
import { ECOMMERCE_URI,GTM_CONTAINER_ID,UNSAID_API } from '../branch-specific-config'
import Cart from './cart'
import Wishlist from './wishList'
import ExploreMenu from './exploreMenu'
import MyUnsaidMenu from './myUnsaidMenu'
import BrandNotification from './brandNotification'
import Notification from './notification'
import Sanity from '../sanity'
import Cookies from './cookies'
import { withRouter } from 'next/router'
import UpdatedNewsLetter from './updatedNewsLetter'
import {onPageView} from '../gtmFunctions'
import ShopTheLookPopup from "./ShopTheLookPopup"
import Head from 'next/head'
class Layout extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            ready:false,
            footerAnimation:"",
            brandNotification:true,
            banner:null,
            loadThirdPartyJS:false,
            mouseXPosition:0,
            mouseYPosition:0,
            navHeightValue:null
        }
        this.footer = React.createRef()
        this.navBarRef = React.createRef()
        this.lastScrollTop = 0
        this.pageTransitionLoaderTimer = null
    }
    windowResize = ()=>{
        const navHeight = this.navBarRef.current?.getBoundingClientRect().height;
        this.setState({navHeightValue:navHeight})
        this.props.setWindow(window.innerWidth,window.innerHeight)
        let mode = window.innerWidth<window.innerHeight?"portrait":"landscape"
        if(mode != this.props.common.mode){
            this.props.setWindow2(window.innerWidth,window.innerHeight)
        }
        this.props.setMode(mode)
    }
    getGlobalSettings= async ()=>{
        let globalSettings=this?.props?.commonData?.globalSettings;
        if(!!globalSettings) this.props.setGlobalSettings(globalSettings)
        if(globalSettings?.notification?.text){
            let notificationCloseTimeStampString = localStorage.getItem("notificationCloseTimeStamp")
            if(notificationCloseTimeStampString){
                let cookieSetDate = new Date(parseInt(notificationCloseTimeStampString))
                let currentDate = new Date()
                const diffTime = Math.abs(currentDate - cookieSetDate)
                let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                if(diffDays > 1)
                    this.props.setShowBrandNotification(true)
            } else {
                this.props.setShowBrandNotification(true)
            }
        }
    }
    
    handleScroll = ()=>{
        if(this.footer.current && this.footer.current.getBoundingClientRect().top < (this.props.common.windowHeight/2))
            this.setState({footerAnimation:"unlock"})
        var st = window.pageYOffset || document.documentElement.scrollTop
        if(st > 100){
            if (st > this.lastScrollTop){
                // downscroll code
                if(!this.props.common.preventNavHiding)
                    this.props.showNavBar(false)
            } else {
                this.props.showNavBar(true)
            }
        } else {
            this.props.showNavBar(true)
        }
        this.lastScrollTop = st <= 0 ? 0 : st
    }
    updateReducerWithLocalLikes=()=>{
        let currentLikes=localStorage.getItem(LOCAL_LIKES_VAR_NAME)
        let likesArray=!!currentLikes && Array.isArray(JSON.parse(currentLikes))? JSON.parse(currentLikes):[]
        // let likesArray=JSON.parse(currentLikes);
        
        if(Array.isArray(likesArray)){
            this.props.updateLikes(likesArray,false,false,this.props.cookieConsent.functional)
        }
    }
    updateReducerWithGiftLikes = async()=>{
        let cartItemString=localStorage.getItem(LOCAL_GIFTS_VAR_NAME);
        let cartItems=!!cartItemString && Array.isArray(JSON.parse(cartItemString))?JSON.parse(cartItemString):[];
        // console.log(cartItems);
        if(Array.isArray(cartItems)){
            this.props.updateCartLikes(cartItems,false,false,this.props.cookieConsent.functional)
        }
    }
    async getPlpPaths(){
        this.props.setPlpPaths(this?.props?.commonData?.plpPaths)
    }
    async getMenuItems(){
        this.props.setMenuDataFetchStart(true)
        let response=await fetch(`${UNSAID_API}/api/website/menu/${this.props.router.locale}`,{
            method: 'GET',
        })
        let data=await response.json();
        if(response.status===200){
            this.props.setMenuData(data);
            this.props.setActiveTier1Item(null);
            this.props.setMenuDataFetchStart(false);
        }else{
            this.props.setMenuData(null)
        }
    }
    async getLikedProductsAndStoreInCache(){
        let currentLikes=localStorage.getItem(LOCAL_LIKES_VAR_NAME)
        let productIds=!!currentLikes && Array.isArray(JSON.parse(currentLikes))? JSON.parse(currentLikes):[]
        if(productIds.length){
            const token=localStorage.getItem(TOKEN_VAR_NAME);
            const rawResponse=await fetch(`${ECOMMERCE_URI}/products`,{
                method:'POST',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "products":productIds,
                    "language":`${this.props.router.locale}`
                })
            })
            if(rawResponse.status==200){
                let result = await rawResponse.json()
                this.props.addProductsToCache(result.products)
            }
        }
    }
    getGiftingProductsAndStoreInCache=async()=>{
        let cartItems=localStorage.getItem(LOCAL_GIFTS_VAR_NAME);
        cartItems = !!cartItems && Array.isArray(JSON.parse(cartItems))? JSON.parse(cartItems):[]
        if(Array.isArray(cartItems)){
            cartItems.forEach((cartItem)=>{
                let bundle=cartItem.bundleId;
                if(!!bundle){
                    if(!this.props.gifting.bundle[bundle])
                    this.props.fetchBundledProduct(bundle)
                }
            })
        }
    }
    pageTransitionLoader(){
        this.props.router.events.on('routeChangeStart', () => {
            localStorage.setItem("previouslyVisitedPage",window.location.href)
            this.pageTransitionLoaderTimer = setTimeout(()=>{
                this.props.pageTransitioning(true)
            },1000)
        });
        this.props.router.events.on('routeChangeComplete', () => {
            clearTimeout(this.pageTransitionLoaderTimer)
            this.props.pageTransitioning(false)
            this.props.preventBodyScroll(false)
        });
        this.props.router.events.on('routeChangeError', () => {
            clearTimeout(this.pageTransitionLoaderTimer)
            this.props.pageTransitioning(false)
        })
    }
    // addProductsToCacheFromCommonProps(){
    //     if(Array.isArray(this.props?.commonProps?.allProducts)){
    //         this.props.addProductsToCache(this.props.commonProps.allProducts)
    //         this.props.commonProps.allProducts.forEach(p=>{
    //             if(p.relatedProducts)
    //                 this.props.addProductsToCache(p.relatedProducts)
    //         })
    //         //console.log("added all products to cache",this.props.commonProps.allProducts.length)
    //     }
    // }
    updatePositionOfMouse=(event)=>{
        const { pageX, pageY, clientX, clientY } = event;
        this.setState({mouseXPosition:clientX})
        this.setState({mouseYPosition:clientY})
    }
    apiRequests(){
        if(!this.props.selection.selection && this.props.doNotGetSelection!="yes"){
            this.getSelection()
        }
        this.getMenuItems()
        this.getGiftingProductsAndStoreInCache()
        this.getGlobalSettings()
        this.getLikedProductsAndStoreInCache()
        this.getPlpPaths()
        // this.getLanguages()
    }
    componentDidMount(){
        setTimeout(()=>{
            const navHeight = this.navBarRef.current?.getBoundingClientRect().height;
            this.setState({navHeightValue:navHeight})
        },1000)
        // this.setState({ height });
        setTimeout(()=>{
            this.setState({ready:true})
        },200)
        setTimeout(()=>{
            this.setState({loadThirdPartyJS:true})
        },3000)
        this.pageTransitionLoader()
        this.props.setWindow(window.innerWidth,window.innerHeight)
        this.props.setWindow2(window.innerWidth,window.innerHeight)
        this.props.setMode(window.innerWidth<window.innerHeight?"portrait":"landscape")
        this.updateReducerWithLocalLikes();
        this.updateReducerWithGiftLikes();
        window.addEventListener('resize',this.windowResize)
        window.addEventListener('scroll',this.handleScroll)
        // this.getMenuItems()
        if((this.props.waitToStartApiRequests=="yes" && this.props.shouldStartApiRequests) || this.props.waitToStartApiRequests!="yes"){
            this.apiRequests()
        }
        // this.addProductsToCacheFromCommonProps()
        document.addEventListener("mousemove", this.updatePositionOfMouse, false);
        document.addEventListener("mouseenter", this.updatePositionOfMouse, false);
        // localStorage.setItem("lastViewedPage",window.location.href);
    }
    componentWillUnmount(){
        window.removeEventListener('resize',this.windowResize)
        window.removeEventListener('scroll',this.handleScroll)

        document.removeEventListener("mousemove", this.updatePositionOfMouse);
        document.removeEventListener("mouseenter", this.updatePositionOfMouse);
    }
    getBundleProductsAndStoreInCache = async (selection)=>{
        if(Array.isArray(selection?.selection?.items)){
            selection.selection.items.forEach(lineItem=>{
                let bundle = lineItem?.product?.product
                if(!!bundle){
                    if(!this.props.gifting.bundle[bundle])
                        this.props.fetchBundledProduct(bundle)
                }
            })
        }   
    }
    // componentDidUpdate()
    getSelection = async ()=>{
        try{
            this.props.gettingSelection(true);
            const token=localStorage.getItem(TOKEN_VAR_NAME);
            const rawResponse=await fetch(`${ECOMMERCE_URI}/selection`,{
                method:'GET',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if(rawResponse.status==200){
                // console.log("got selection")
                let selection = await rawResponse.json();
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                //if selection items are bundles, fetch products and store in cache
                this.getBundleProductsAndStoreInCache(selection)
                this.props.storeSelection(selection)
                onPageView({selection})
            }
            this.props.gettingSelection(false)
        } catch(err) {
            // console.log(err)
            this.props.gettingSelection(false)
        }
    }
    componentDidUpdate(prevProps){
        // console.log("prev props",prevProps);
        if(this.props.common.pageTransitioning!=prevProps.common.pageTransitioning && window.innerWidth<=TABLET_PORTRAIT_BREAKPOINT){
            if(this.props.common.pageTransitioning){
                this.props.preventBodyScroll(true)
                this.props.showNavBar(true)
            }
            else{
                this.props.preventBodyScroll(false)
            }
        } 
        if(this.props.common.shopTheLookActive!=prevProps.common.shopTheLookActive){
            if(this.props.common.shopTheLookActive){
                this.props.preventBodyScroll(true)
            }else{
                this.props.preventBodyScroll(false)
            }
        }
        if(this.props.common.showExploreMenu!=prevProps.common.showExploreMenu){
            if(this.props.common.showExploreMenu){
                this.props.preventBodyScroll(true)
            }
            else{
                this.props.preventBodyScroll(false)
            }
        } 
        if(this.props.common.showMyUnsaidMenu!=prevProps.common.showMyUnsaidMenu){
            if(this.props.common.showMyUnsaidMenu){
                this.props.preventBodyScroll(true)
            }
            else{
                this.props.preventBodyScroll(false)
            }
        }
        if(this.props.common.showCart!=prevProps.common.showCart){
            if(this.props.common.showCart){
                this.props.preventBodyScroll(true)
            }
            else {
                this.props.preventBodyScroll(false)
            }
        }
        if(this.props.common.showWishlist!=prevProps.common.showWishlist){
            if(this.props.common.showWishlist){
                this.props.preventBodyScroll(true)
            }
            else{
                this.props.preventBodyScroll(false)
            }     
        }
        if(this.props?.selection?.selection?.location?.country != prevProps?.selection?.selection?.location?.country){
            //when country changes update likes
            this.getLikedProductsAndStoreInCache()
        }
        if(this.props?.selection?.selection?.loggedIn != prevProps.selection?.selection?.loggedIn){
            if(this.props?.selection?.selection?.loggedIn){
                this.getBundleProductsAndStoreInCache(this.props.selection.selection)
                this.props.syncLikes(this.props.cookieConsent.functional)
                this.props.syncCartLikes(this.props.cookieConsent.functional)
            }
        }
        if(prevProps.shouldStartApiRequests!=this.props.shouldStartApiRequests){
            if(this.props.shouldStartApiRequests)
                this.apiRequests()
        }
        if(prevProps.router.locale!=this.props.router.locale){
            this.getMenuItems();
            this.getGlobalSettings()
            this.getPlpPaths();
        }
    }
    overlayClick(){
        if(this.props.common.showCart)
            this.props.showCart(false)
        if(this.props.common.showWishlist)
            this.props.showWishlist(false)
        if(this.props.common.shopTheLookActive){
            this.props.setShopTheLookProducts(false,null)
        }
    }
    closeBrandNotification(){
        localStorage.setItem("notificationCloseTimeStamp",Date.now().toString())
        this.props.setShowBrandNotification(false)
        setTimeout(()=>{
            const navHeight = this.navBarRef.current?.getBoundingClientRect().height;
            this.setState({navHeightValue:navHeight})
        },1000)
    }
    
    render(){
        return (
            <>
                <div key={this.props.router.locale} className={`wrapper ${this.props.common.showCookies && this.props.showCookie!="no"?"showCookies":""} positionRelative ${this.props.common.showCart || this.props.common.showWishlist?"translateMainContent":""} ${this.props.common.shopTheLookActive?"shopTheLookPopupActive":""}`}>
                    <Head>
                        <meta name='p:domain_verify' content='1hflkjsf903kjm32fjm3ad' key="pinterest" />
                        <meta name="p:domain_verify_2" content="2cf158ca69dafef32116009db58a6105" key="pinterest2" />
                    </Head>
                    <div className="darkOverlay" onClick={()=>this.overlayClick()}></div>
                    <div className={`exploreMenu ${this.props.common.showExploreMenu?"show":""}`} >
                        <ExploreMenu  menuItems={!!this?.props?.common?.menuItems?.menu ? this.props.common.menuItems.menu:[]}  />
                    </div>
                    <div className={`myUnsaidMenu ${this.props.common.showMyUnsaidMenu?"show":""}`}>
                        <MyUnsaidMenu />
                    </div>
                    <div style={{height:this.props.common.windowHeight?this.props.common.windowHeight:"100vh"}} className={`cart ${this.props.common.showCart?"show":""}`}>
                        <Cart noCartTextAnimation={this.props.noCartTextAnimation}/>
                    </div>
                    <div style={{height:this.props.common.windowHeight?this.props.common.windowHeight:"100vh"}} className={`wishList ${this.props.common.showWishlist?"show":""}`}>
                        <Wishlist />
                    </div>
                    <div style={{height:this.props.common.windowHeight?this.props.common.windowHeight:"100vh"}} className={`shopTheLookPopupSection`}>
                        <ShopTheLookPopup/>
                    </div>
                    <div ref={this.navBarRef} className={`navBar ${this.state.ready?"ready":""} ${this.props.showNav!="no" && this.props.common.showNavBar?"show":""}`}>
                        {this.props?.common?.globalSettings?.notification &&  this.props.common.showBrandNotification &&
                            <div>
                                <BrandNotification onclick={()=>this.closeBrandNotification()} notification={this.props.common.globalSettings.notification} />
                            </div>
                        }
                        <Navbar customized={this.props.customized} cartNavBar={this.props.cartNavBar}/>
                        {!!this.props.common.showNotification && <div><Notification onclick={()=>this.props.setShowNotification(null)} msg={this.props.common.showNotification}/></div>}
                    </div>
                    <div style={{top:`${this.state.mouseYPosition}px`,left:`${this.state.mouseXPosition}px`}} className={`pageLoader ${this.props.common.pageTransitioning?"show":""}`}></div>
                    <div className={`loaderOverlay ${this.props.common.pageTransitioning?"show":""}`}></div>
                    <div className={`mainContent positionRelative ${this.state.ready?"ready":""}`}>
                            {this.props.children}
                    </div>
                    <div className="cookiesWrapper">
                        <Cookies/>
                    </div>
                    {this.props.footer!=false && 
                        <div ref={this.footer} className="footerWrapper">
                            <Footer class={this.state.footerAnimation} footer={this?.props?.commonData?.footer}/>
                        </div>
                    }
                    <div style={{paddingTop:`${this.props.common.showNavBar?this.state.navHeightValue:0}px`}} className={`newsletterWrapper ${this.props.common.showNewsletterPopup?"show":""}`}><UpdatedNewsLetter/></div>
                </div>
                <style jsx>{`
                    .shopTheLookPopupSection{
                        position:fixed;
                        top:0;
                        right:0;
                        z-index: 101;
                        transform: translateX(100%);
                        transition: all 0.2s ease-out;
                    }
                    .shopTheLookPopupActive .shopTheLookPopupSection{
                        transform: translateX(0%);
                        transition: all 0.2s ease-out;
                    }
                    .newsletterWrapper{
                        position: fixed;
                        z-index: 9;
                        top: 0;
                        justify-content: center;
                        align-items: center;
                        height: var(--window-height);
                        width: 100%;
                        background: rgba(0, 0, 0, 0.55);
                        display: none;
                    }
                    .newsletterWrapper.show{
                        display: flex;
                    }
                    .exploreMenu, .myUnsaidMenu{
                        height:${this.props.common.windowHeight?this.props.common.showBrandNotification?`calc(${this.props.common.windowHeight}px - 8rem - 2.8rem)`:`calc(${this.props.common.windowHeight}px - 8rem)`:"calc(100vh - 8rem)"};
                        top:${this.props.common.showBrandNotification?"10.8rem":"8rem"};
                    }
                    .loaderOverlay,.loaderOverlay.show{
                        display:none;
                    }
                    .pageLoader {
                        position: fixed;
                        z-index: 998;
                        border: 0.25rem solid #f3f3f3;
                        border-radius: 50%;
                        border-top: 0.25rem solid #000000;
                        border-right: 0.25rem solid #000000;
                        width: 3rem;
                        height: 3rem;
                        display:none;
                    }
                    .pageLoader.show{
                        display:block;
                        animation: pageLoaderSpin 1s linear infinite;
                        transition:right 0.5s ease;
                    }
                    /* Safari */
                    @-webkit-keyframes pageLoaderSpin {
                        0% { -webkit-transform: rotate(0deg); }
                        100% { -webkit-transform: rotate(360deg); }
                    }
                      
                    @keyframes pageLoaderSpin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .wrapper{
                        overflow:hidden;
                        width:100%;
                        background:#ffffff;
                    }
                    .translateMainContent .darkOverlay,.shopTheLookPopupActive .darkOverlay{
                        background:#00000091;
                        position:absolute;
                        width:100%;
                        height:100%;
                        z-index:100;
                        opacity:1;
                        pointer-events:auto;
                    }
                    .darkOverlay{
                        pointer-events:none;
                    }
                    .translateMainContent .navBar{
                        transform:translateX(-40%);
                    }
                    .translateMainContent .mainContent{
                        transform:translateX(-40%);
                    }
                    .mainContent{
                        padding-top:${this.props.mainContentPadding!="no"?`calc(${HEADER_HEIGHT_DESKTOP}px + ${!!this.props.common.showBrandNotification?"2.8rem":"0px"})`:"0px"};
                    }
                    @media only screen and (max-width:${MEDIUM_BREAKPOINT}px){
                        .translateMainContent .navBar{
                            transform:translateX(-45%);
                        }
                        .translateMainContent .mainContent{
                            transform:translateX(-45%);
                        }
                        .pageLoader {
                            right:${this.props.common.showCart || this.props.common.showWishlist?"calc(2rem + 45%)":"2rem"};
                        }
                        .mainContent{
                            padding-top:${this.props.mainContentPadding!="no"?`calc(${HEADER_HEIGHT_MEDIUM}px + ${!!this.props.common.showBrandNotification?"2.8rem":"0px"})`:"0px"};
                        }
                        .exploreMenu,.myUnsaidMenu{
                            height:${this.props.common.windowHeight?this.props.common.showBrandNotification?`calc(${this.props.common.windowHeight}px - 7.2rem - 2.8rem)`:`calc(${this.props.common.windowHeight}px - 7.2rem)`:"calc(100vh - 7.2rem)"};
                            top:${this.props.common.showBrandNotification?"10rem":"7.2rem"};
                        }
                    }
                    @media only screen and (max-width:${TABLET_LANDSCAPE_BREAKPOINT}px){
                        .translateMainContent .navBar{
                            transform:translateX(-60%);
                        }
                        .translateMainContent .mainContent{
                            transform:translateX(-60%);
                        }
                        .pageLoader {
                            right:${this.props.common.showCart || this.props.common.showWishlist?"calc(2rem + 50%)":"2rem"};
                        }
                        .mainContent{
                            padding-top:${this.props.mainContentPadding!="no"?`calc(${HEADER_HEIGHT_TABLET}px + ${!!this.props.common.showBrandNotification?"2.8rem":"0px"})`:"0px"};
                        }
                        .exploreMenu,.myUnsaidMenu{
                            height:${this.props.common.windowHeight?this.props.common.showBrandNotification?`calc(${this.props.common.windowHeight}px - 6.2rem - 2.8rem)`:`calc(${this.props.common.windowHeight}px - 6.2rem)`:"calc(100vh - 6.2rem)"};
                            top:${this.props.common.showBrandNotification?"9rem":"6.2rem"};
                        }
                    }
                    @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                        .pageLoader {
                            top: 17% !important;
                            left: calc(50% - 1.5rem) !important;
                        }
                        .loaderOverlay{
                            display:none;
                            position: fixed;
                            width: 100%;
                            height: 100%;
                            background: #ffffff;
                            z-index: 50;
                        }
                        .loaderOverlay.show{
                            display:block;
                        }
                    }
                    @media only screen and (max-width:${MOBILE_BREAKPOINT}px){
                        .newsletterWrapper{
                            justify-content: flex-end;
                            align-items: flex-end;
                            z-index: 99;
                        }
                        .shopTheLookPopupSection{
                            width: 100%;
                        }
                        .translateMainContent .mainContent{
                            transform:translateX(-100%);
                        }
                        .translateMainContent .navBar{
                            transform:translateX(-100%);
                        }
                        .mainContent{
                            padding-top:${this.props.mainContentPadding!="no"?`calc(${HEADER_HEIGHT_MOBILE}px + ${!!this.props.common.showBrandNotification?"4.6rem":"0px"})`:"0px"};
                        }
                        .cart,.wishList{
                            width:100%;
                        }
                        .exploreMenu,.myUnsaidMenu{
                            height:${this.props.common.windowHeight?this.props.common.showBrandNotification?`calc(${this.props.common.windowHeight}px - 5.6rem - 2.8rem)`:`calc(${this.props.common.windowHeight}px - 5.6rem)`:"calc(100vh - 5.6rem)"};
                            top:${this.props.common.showBrandNotification?"8.4rem":"5.6rem"};
                        }
                        .navbar {
                            z-index:${this.props.common.showNavBar==false?"9":"99"}; 
                        }
                    }
                `}</style>
                <style jsx global>{`
                    body{
                        overflow-y: ${this.props.common.preventBodyScroll?"hidden !important":"auto"};
                        height:${this.props.common.preventBodyScroll?"100% !important":"auto"};
                        cursor:${this.props.common.pageTransitioning?"none":"auto"};
                    }
                    body, body *{
                        cursor:${this.props.common.pageTransitioning?"none":""};
                    }
                    .cookiesWrapper{
                        z-index: ${!!this.props.hideCookies?"-1":"9"};
                    }
                    :root {
                        --window-height-2:${this.props.common.windowHeight2?`${this.props.common.windowHeight2}px`:"100vh"};
                        --window-height:${this.props.common.windowHeight?`${this.props.common.windowHeight}px`:"100vh"};
                        --header-height-desktop-rem: 8rem;
                        --padding-left-desktop-rem: 6.3rem;
                        --padding-right-desktop-rem: 6.3rem;
                        --padding-left-medium-rem:5.6rem;
                        --padding-right-medium-rem:5.6rem;
                        --padding-left-tablet-landscape-rem:6.4rem;
                        --padding-right-tablet-landscape-rem:6.4rem;
                        --padding-left-tablet-portrait-rem:2rem;
                        --padding-right-tablet-portrait-rem:2rem;
                        --medium-breakpoint: 1280px;
                        --header-height-medium-rem:7.2rem;
                        --header-height-tablet-rem:6.2rem;
                        --header-height-mobile-rem:5.6rem;
                    }
                `}</style>
            </>
        )
    }
}
function mapStateToProps({common,selection,gifting,cookieConsent}){
    return {common,selection,gifting,cookieConsent}
}
export default connect(mapStateToProps,{setWindow,setShopTheLookProducts,setWindow2,setMode,gettingSelection,storeSelection,showNavBar,updateLikes,addProductsToCache,fetchBundledProduct,updateCartLikes,setShowNotification,setShowBrandNotification,showWishlist,showCart,showMyUnsaidMenu,showExploreMenu,setGlobalSettings,syncCartLikes,syncLikes,pageTransitioning,preventBodyScroll,setPlpPaths,setMenuData,setLanguages,setMenuDataFetchStart,setActiveTier1Item})(withRouter(Layout))
