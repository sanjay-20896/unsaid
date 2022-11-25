export const SET_WINDOW = "SET_WINDOW"
export const SET_WINDOW_2 = "SET_WINDOW_2"
export const SET_MODE = "SET_MODE"
export const NUMBER_OF_SECTIONS = "NUMBER_OF_SECTIONS"
export const SITE_READY = "SITE_READY"
export const CUSTOM_WINDOW = "CUSTOM_WINDOW"
export const GETTING_SELECTION="GETTING_SELECTION"
export const STORE_SELECTION="STORE_SELECTION"
export const UPDATE_LIKES = "UPDATE_LIKES"
export const CART_LIKES ="CART_LIKES"
export const LOGGEDIN="LOGGEDIN"
export const SHOW_NAV_BAR="SHOW_NAV_BAR"
export const LOGGED_IN="LOGGED_IN"
export const SHOW_FLASH = "SHOW_FLASH"
export const SET_BUNDLE_INFO = "SET_BUNDLE_INFO"
export const SET_ENGRAVING_TEXT = "SET_ENGRAVING_TEXT"
export const SET_BOX_CHOICE = "SET_BOX_CHOICE"
export const SET_CARD_CHOICE = "SET_CARD_CHOICE"
export const SET_NOTE_TEXT = "SET_NOTE_TEXT"
export const ADD_PRODUCTS = "ADD_PRODUCTS"
export const PREVENT_BODY_SCROLL = "PREVENT_BODY_SCROLL"
export const FETCHING_BUNDLED_PRODUCT = "FETCHING_BUNDLED_PRODUCT"
export const FETCH_BUNDLED_PRODUCT_ERROR = "FETCH_BUNDLED_PRODUCT_ERROR"
export const GETTING_SEARCH="GETTING_SEARCH"
export const SHOW_CART = "SHOW_CART"
export const SHOW_WISHLIST = "SHOW_WISHLIST"
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY"
export const SAVE_TEMP="SAVE_TEMP"
export const SHOW_EXPLORE_MENU = "SHOW_EXPLORE_MENU"
export const SHOW_MYUNSAID_MENU = "SHOW_MYUNSAID_MENU"
export const SET_INDEX_VALUE="SET_INDEX_VALUE"
export const SET_INDEX_VALUE2="SET_INDEX_VALUE2"
export const SET_PANEL_TWO_DATA="SET_PANEL_TWO_DATA"
export const SET_PANEL_THREE_DATA="SET_PANEL_THREE_DATA"
export const SET_ACTIVE_TIER1_ITEM="SET_ACTIVE_TIER1_ITEM"
export const SET_ACTIVE_TIER2_ITEM="SET_ACTIVE_TIER2_ITEM"
export const SET_MENU_PRODUCTS_PRICELIST="SET_MENU_PRODUCTS_PRICELIST"
export const SET_MENU_PRODUCTS="SET_MENU_PRODUCTS"
export const SHOW_SEARCH_WINDOW="SHOW_SEARCH_WINDOW"
export const MAIN_NOTIFICATION="MAIN_NOTIFICATION"
export const ADDING_TO_CART="ADDING_TO_CART"
export const BRAND_NOTIFICATION="BRAND_NOTIFICATION"
export const SET_GLOBAL_SETTINGS="SET_GLOBAL_SETTINGS"
export const CHANGING_COUNTRY="CHANGING_COUNTRY"
export const CHANGING_SHIPPING_METHOD="CHANGING_SHIPPING_METHOD"
export const FILTER_STICKY="FILTER_STICKY"
export const ANIMATE_HEART="ANIMATE_HEART"
export const ANIMATE_CART="ANIMATE_CART"
export const COOKIES_SHOW="COOKIES_SHOW"
export const OPEN_LOGIN="OPEN_LOGIN"
export const OPEN_REGISTER="OPEN_REGISTER"
export const SHOW_COOKIE_DETAILS="SHOW_COOKIE_DETAILS"
export const SET_PERFORMANCE_COOKIE="SET_PERFORMANCE_COOKIE"
export const SET_FUNCTIONAL_COOKIE="SET_FUNCTIONAL_COOKIE"
export const SET_TARGETING_COOKIE="SET_TARGETING_COOKIE"
export const LOADING_MENU_PRODUCTS="LOADING_MENU_PRODUCTS"
export const USER_HAS_SET_COOKIE_CONSENT="USER_HAS_SET_COOKIE_CONSENT"
export const PAGE_TRANSITIONING="PAGE_TRANSITIONING"
export const FETCHING_ALL_PRODUCTS="FETCHING_ALL_PRODUCTS"
export const SET_All_PRODUCTS="SET_ALL_PRODUCTS"
export const SET_ADMIN_LOGGED_IN="SET_ADMIN_LOGGED_IN"
export const SET_ADMIN_LOGGING_IN="SET_ADMIN_LOGGING_IN"
export const PREVENT_NAV_HIDING="PREVENT_NAV_HIDING"
export const SHOW_NEWSLETTER_POPUP="SHOW_NEWSLETTER_POPUP"
export const GIFT_EDIT_FROM_SUMMARY="GIFT_EDIT_FROM_SUMMARY"
export const SHOP_THE_LOOK_PRODUCTS="SHOP_THE_LOOK_PRODUCTS"
export const SET_PLP_PATHS="SET_PLP_PATHS"
export const SET_MENU_DATA="SET_MENU_DATA"
export const SET_LANGUAGES="SET_LANGUAGES"
export const SET_MENU_FETCH_START="SET_MENU_FETCH_START"
import { getTokenFromLocalStorage } from '../functions';
import { LOCAL_GIFTS_VAR_NAME, LOCAL_LIKES_VAR_NAME, TOKEN_VAR_NAME} from '../config'
import { ECOMMERCE_URI,UNSAID_API } from '../branch-specific-config'
import isEqual from 'lodash/isEqual'
// import { plpPaths } from '../branch-specific-config'
export function setMenuDataFetchStart(bool){
    return {
        type:SET_MENU_FETCH_START,
        bool
    }
}
export function setMenuData(menuItems){
    return {
        type:SET_MENU_DATA,
        menuItems
    }
}
export function setPlpPaths(plpPaths){
    return {
        type:SET_PLP_PATHS,
        plpPaths
    }
}
export function setLanguages(languages){
    return {
        type:SET_LANGUAGES,
        languages
    }
}
export function setShopTheLookProducts(bool,products){
    return {
        type:SHOP_THE_LOOK_PRODUCTS,
        bool,
        products
    }
}
export function setGiftEditFromSummary(bool){
    return {
        type:GIFT_EDIT_FROM_SUMMARY,
        bool
    }
}
export function setShowNewsletterPopup(bool){
    return {
        type:SHOW_NEWSLETTER_POPUP,
        bool
    }
}
export function preventNavHide(bool){
    return {
        type:PREVENT_NAV_HIDING,
        bool
    }
}
export function setAdminLoggedIn(token){
    return {
        type:SET_ADMIN_LOGGED_IN,
        token
    }
}
export function setAdminLoggingIn(bool){
    return {
        type:SET_ADMIN_LOGGING_IN,
        bool
    }
}
export function pageTransitioning(bool){
    return {
        type:PAGE_TRANSITIONING,
        bool
    }
}
export function setFunctionalCookie(bool){
    // console.log('functional',bool)
    return {
        type:SET_FUNCTIONAL_COOKIE,
        bool
    }   
}
export function setPerformanceCookie(bool){
    return {
        type:SET_PERFORMANCE_COOKIE,
        bool
    }   
}
export function setTargetingCookie(bool){
    return {
        type:SET_TARGETING_COOKIE,
        bool
    }
}
export function showCookieDetails(bool){
    return{
        type:SHOW_COOKIE_DETAILS,
        bool
    }
}
export function showLogin(bool){
    return{
        type:OPEN_LOGIN,
        bool
    }
}
export function showRegister(bool){
    return{
        type:OPEN_REGISTER,
        bool
    }
}
export function changingShippingMethod(bool){
    return {
        type:CHANGING_SHIPPING_METHOD,
        bool
    }
}
export function changeShippingMethod(shippingMethod,cb){
    return async dispatch=>{
        try{
            dispatch(changingShippingMethod(true))
            let token = localStorage.getItem(TOKEN_VAR_NAME)
            const rawResponse = await fetch(`${ECOMMERCE_URI}/shipping-methods/${shippingMethod}`,{
                method:'PUT',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            if(rawResponse.status==200){
                let selection = await rawResponse.json()
                // console.log("shipping method changed",selection,shippingMethod)
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                dispatch(storeSelection(selection))
                if(cb)
                    cb(true)
            } else {
                throw "SHIPPING response status not 200"
            }
            dispatch(changingShippingMethod(false))
        } catch(err) {
            dispatch(changingShippingMethod(false))
            if(cb)
                cb(false)
        }
    }
}
export function changingCountry(bool){
    return {
        type:CHANGING_COUNTRY,
        bool
    }
}
export function userHasSetCookieConsent(bool){
    return {
        type:USER_HAS_SET_COOKIE_CONSENT,
        bool
    }
}
export function setShowCookies(bool){
    return {
        type:COOKIES_SHOW,
        bool
    }
}
export function setFilterStickyGlobal(bool){
    return {
        type:FILTER_STICKY,
        bool
    }
}
export function updateAddresses(shippingAddressValues,billingAddressValues,sameBillingAddress,override,situation,selection,cb=null){
    return async dispatch=>{
        try{
        // console.log("update address entered")
        if(selection?.selection?.selection){
            let shippingCountries = selection?.selection?.countries?selection.selection.countries:[]
            let countryOptions = shippingCountries.map(country=>{
                return {label:country.name,value:country.country,states:country.states}
            })
            /* Create shipping address in centra format */
            let countryCode = null
            if(override)
                countryCode = override.countryCode
            else{
                let i = countryOptions.findIndex(c=>c.label.toLowerCase()==shippingAddressValues?.country?.toLowerCase())
                if(i > -1)
                    countryCode = countryOptions[i].value
            }
            let countryCodeSetThroughLocation = false
            if(!countryCode){
                //check if location is set
                if(selection?.selection?.location?.country)
                    countryCode = selection.selection.location.country
                countryCodeSetThroughLocation = true
                // console.log("country code set through location", countryCode)
                // some flag that no shipping country code but set through location

            }
            let stateRequired = false
            let states = []
            let countryIndex = countryOptions.findIndex(c=>c.value==countryCode)
            if(countryIndex > -1 && Array.isArray(countryOptions[countryIndex].states)){
                stateRequired = true
                states = countryOptions[countryIndex].states.map(s=>{return {label:s.name,value:s.state}})
            }
            let stateCode = null
            // console.log("state required",stateRequired)
            // In case of store pick up
            if(override)
                stateCode = override.stateCode
            else if(stateRequired && shippingAddressValues?.state){
                let i = states.findIndex(s=>s.label.toLowerCase()==shippingAddressValues?.state?.toLowerCase())
                if(i > -1)       
                    stateCode = states[i].value
            }
            let shouldUpdate = false
            if(situation=="onChangeHandler"){    
                if(countryCode && selection.selection.selection.shippingAddress.country!=countryCode){
                    shouldUpdate = true
                }
                if(stateRequired && countryCode && stateCode && stateCode!=selection.selection.selection.shippingAddress.state){
                    shouldUpdate = true   
                }
            }
            // console.log("situation",situation)
            // console.log("should update",shouldUpdate)
            if(situation=="onChangeHandler" && !shouldUpdate){
                // console.log("onchange and no update required")
                dispatch(changingCountry(false))
                return {type:"NOEVENT"}
            }
            let shippingAddress = {
                "email": shippingAddressValues.email?shippingAddressValues.email:"",
                "firstName": shippingAddressValues.firstName?shippingAddressValues.firstName:"",
                "lastName": shippingAddressValues.lastName?shippingAddressValues.lastName:"",
                "address1": shippingAddressValues.address1?shippingAddressValues.address1:"",
                "address2": shippingAddressValues.address2?shippingAddressValues.address2:"",
                "zipCode": shippingAddressValues.zipCode?shippingAddressValues.zipCode:"",
                "city": shippingAddressValues.city?shippingAddressValues.city:"",
                "country": countryCode?countryCode:"",
            }
            shippingAddress.phoneNumber = shippingAddressValues?.number?shippingAddressValues.number:""
            if(stateRequired)
                shippingAddress.state = stateCode?stateCode:""
            /* Create shipping address in centra format end*/
            
            /* Old shipping address in Centra format */
            let oldShippingAddress = {
                email:selection.selection.selection.shippingAddress.email?selection.selection.selection.shippingAddress.email:"",
                firstName:selection.selection.selection.shippingAddress.firstName?selection.selection.selection.shippingAddress.firstName:"",
                lastName:selection.selection.selection.shippingAddress.lastName?selection.selection.selection.shippingAddress.lastName:"",
                address1:selection.selection.selection.shippingAddress.address1?selection.selection.selection.shippingAddress.address1:"",
                address2:selection.selection.selection.shippingAddress.address2?selection.selection.selection.shippingAddress.address2:"",
                zipCode:selection.selection.selection.shippingAddress.zipCode?selection.selection.selection.shippingAddress.zipCode:"",
                city:selection.selection.selection.shippingAddress.city?selection.selection.selection.shippingAddress.city:"",
                country:selection.selection.selection.shippingAddress.country?selection.selection.selection.shippingAddress.country:"",
                phoneNumber:selection.selection.selection.shippingAddress.phoneNumber?selection.selection.selection.shippingAddress.phoneNumber:""
            }
            if(selection.selection.selection.shippingAddress.state)
                oldShippingAddress.state=selection.selection.selection.shippingAddress.state
            /* Create billing address in centra format*/
            let stateRequiredBilling = false
            let statesBilling = []
            let countryIndexBilling = countryOptions.findIndex(c=>c.label.toLowerCase()==billingAddressValues?.country?.toLowerCase())
            if(countryIndexBilling > -1 && Array.isArray(countryOptions[countryIndexBilling].states)){
                stateRequiredBilling = true
                statesBilling = countryOptions[countryIndexBilling].states.map(s=>{return {label:s.name,value:s.state}})
            }
            let stateCodeBilling = null
            if(stateRequiredBilling && billingAddressValues?.state){
                let i = statesBilling.findIndex(s=>s.label.toLowerCase()==billingAddressValues?.state?.toLowerCase())
                if(i > -1)       
                    stateCodeBilling = statesBilling[i].value
            }  
            let countryCodeBilling = null
            let j = countryOptions.findIndex(c=>c.label.toLowerCase()==billingAddressValues?.country?.toLowerCase())
            if(j > -1)
                countryCodeBilling = countryOptions[j].value
            let address =  sameBillingAddress?{
                // "newsletter": false,
                "email": shippingAddressValues.email?shippingAddressValues.email:"",
                "firstName": shippingAddressValues.firstName?shippingAddressValues.firstName:"",
                "lastName": shippingAddressValues.lastName?shippingAddressValues.lastName:"",
                "address1": shippingAddressValues.address1?shippingAddressValues.address1:"",
                "address2": shippingAddressValues.address2?shippingAddressValues.address2:"",
                "zipCode": shippingAddressValues.zipCode?shippingAddressValues.zipCode:"",
                "city": shippingAddressValues.city?shippingAddressValues.city:"",
                // "country": countryCodeSetThroughLocation?"":(countryCode?countryCode:""),
                "country": countryCode?countryCode:"",
            }:{
                // "newsletter": false,
                "email": billingAddressValues?.email?billingAddressValues.email:"",
                "firstName": billingAddressValues?.firstName?billingAddressValues.firstName:"",
                "lastName": billingAddressValues?.lastName?billingAddressValues.lastName:"",
                "address1": billingAddressValues?.address1?billingAddressValues.address1:"",
                "address2": billingAddressValues?.address2?billingAddressValues.address2:"",
                "zipCode": billingAddressValues?.zipCode?billingAddressValues.zipCode:"",
                "city": billingAddressValues?.city?billingAddressValues.city:"",
                "country": countryCodeBilling?countryCodeBilling:"",
            }
            if(sameBillingAddress){
                address.phoneNumber = shippingAddressValues?.number?shippingAddressValues.number:""
                if(stateRequired)
                    address.state = stateCode?stateCode:""
            } else {
                address.phoneNumber = billingAddressValues?.number?billingAddressValues.number:""
                if(stateRequiredBilling)
                    address.state = stateCodeBilling?stateCodeBilling:""
            }
            /* Create billing address in Centra format end*/
            
            /* Old billing address in Centra format */
            let oldBillingAddress = {
                email:selection.selection.selection.address.email?selection.selection.selection.address.email:"",
                firstName:selection.selection.selection.address.firstName?selection.selection.selection.address.firstName:"",
                lastName:selection.selection.selection.address.lastName?selection.selection.selection.address.lastName:"",
                address1:selection.selection.selection.address.address1?selection.selection.selection.address.address1:"",
                address2:selection.selection.selection.address.address2?selection.selection.selection.address.address2:"",
                zipCode:selection.selection.selection.address.zipCode?selection.selection.selection.address.zipCode:"",
                city:selection.selection.selection.address.city?selection.selection.selection.address.city:"",
                country:selection.selection.selection.address.country?selection.selection.selection.address.country:"",
                phoneNumber:selection.selection.selection.address.phoneNumber?selection.selection.selection.address.phoneNumber:""
            }
            if(selection.selection.selection.address.state)
                oldBillingAddress.state=selection.selection.selection.address.state
            // console.log("updating address")
            // console.log("country code set through location", countryCodeSetThroughLocation)
            // console.log("stateRequired", stateRequired)
            // console.log("stateCode", stateCode)
            // console.log("countryCode",countryCode)
            // console.log("new")
            // console.log(shippingAddress,address)
            // console.log("old")
            // console.log(oldShippingAddress,oldBillingAddress)
            // if country code is set through location, state code is not mandatory for update
            if( (!isEqual(oldShippingAddress,shippingAddress) || !isEqual(oldBillingAddress,address)) 
                // && ((!countryCodeSetThroughLocation && stateRequired && stateCode) || (!countryCodeSetThroughLocation && !stateRequired) || (countryCodeSetThroughLocation))
                && !!countryCode
            ){
                // console.log("updating payment fields...")
                dispatch(changingCountry(true))
                let token = localStorage.getItem(TOKEN_VAR_NAME)
                let rawResponse=await fetch(`${ECOMMERCE_URI}/payment-fields`,{
                    method:'PUT',
                    headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(
                        {address,shippingAddress}
                    )
                })
                if(rawResponse.status==200){
                    let selection = await rawResponse.json()
                    /* The if condition prevents the weird UI glitch of changing shipping methods multiple times */
                    // if(situation!="storePickup" && situation!="shippingMethodSelection")
                        dispatch(storeSelection(selection))
                    dispatch(changingCountry(false))
                    if(cb)
                        cb(true)
                        
                } else {
                    // console.log("error updating address")
                    dispatch(changingCountry(false))
                    if(cb)
                        cb(false)
                    return {type:"NOEVENT"}
                }
            } else {
                dispatch(changingCountry(false))
                if(cb)
                    cb(true)
            }
        } else {
            dispatch(changingCountry(false))
                if(cb)
                    cb(true)
        }
        } catch(err){
            dispatch(changingCountry(false))
            console.log(err)
            if(cb)
                cb(false)
            return {type:"NOEVENT"}
            
        }
    }
}
export function changeSelectionCountry(country,state,stateRequired,cb){
    return async dispatch=>{
        try{
            dispatch(changingCountry(true))
            let path = stateRequired && !!state?`${ECOMMERCE_URI}/countries/${country}/states/${state}`:`${ECOMMERCE_URI}/countries/${country}`
            let token = localStorage.getItem(TOKEN_VAR_NAME)
            const rawResponse = await fetch(path,{
                method:'PUT',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            // console.log('path',path)
            // console.log('change country response',rawResponse.status)
            if(rawResponse.status==200){
                // show cart animation
                let selection = await rawResponse.json()                
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                dispatch(storeSelection(selection))
                cb(true)
            } else {
                //throw error
                // console.log(await rawResponse.json())
                cb(false)
                throw "cart response status not 200"
            }
            dispatch(changingCountry(false))
        } catch(err) {
            // console.log(err)
            cb(false)
            dispatch(changingCountry(false))
        }
    }
}
export function setGlobalSettings(globalSettings){
    return{
        type:SET_GLOBAL_SETTINGS,
        globalSettings
    }
}
export function showSearchWindow(bool){
    return {
        type:SHOW_SEARCH_WINDOW,
        bool
    }
}
export function addingToCart(bool){
    return {
        type:ADDING_TO_CART,
        bool
    }
}
export function setMenuProductsPricelist(pricelist){
    return {
        type:SET_MENU_PRODUCTS_PRICELIST,
        pricelist
    }
}
export function setMenuProducts(uri,products){
    return {
        type:SET_MENU_PRODUCTS,
        uri,
        products
    }
}
export function loadingMenuProducts(uri,bool){
    return {
        type:LOADING_MENU_PRODUCTS,
        uri,
        bool
    }
}
export function fetchingAllProducts(bool){
    return {
        type:FETCHING_ALL_PRODUCTS,
        bool
    }
}
export function setAllProducts(products){
    return {
        type:SET_All_PRODUCTS,
        products
    }
}
export function fetchAllMenuProducts(){
    return async dispatch=>{
        dispatch(fetchingAllProducts(true))
        const token=localStorage.getItem(TOKEN_VAR_NAME);
        let response=await fetch(`${ECOMMERCE_URI}/products`,{
            method:'POST',
            headers:{
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify(
                {
                    "categories":[1],
                    "relatedProducts":true
                }
            )
        })
        if(response.status==200){
            let data = await response.json()
            dispatch(setAllProducts(data.products))
        } else {
            // console.log("could not all fetch products menu")
        }
        dispatch(fetchingAllProducts(false))
    }
}
export function fetchProductsMenu(item,type){
    return async dispatch=>{
        let {uri,collectionId} = item
        dispatch(loadingMenuProducts(uri,true))
        let reqBody={
            "relatedProducts":true,
            "uri":{
                "uri":`${uri}`,
                "for":[
                    "category"
                ]
            }
        }
        if(type=="products_by_collection"){
            reqBody={
                "relatedProducts":true,
                "collections":[collectionId],
            }
        }
        if(type=="products_by_material"){
            reqBody={
                "relatedProducts":true,
                "materials_available": [item.material]
            }
        }
        if(type=="products_by_gender"){
            reqBody={
                "relatedProducts":true,
                "product_gender": [item.gender]
            }
        }
        //category based fetching
        const token=localStorage.getItem(TOKEN_VAR_NAME);
        let response=await fetch(`${ECOMMERCE_URI}/products`,{
            method:'POST',
            headers:{
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify(
                reqBody
            )
        })
        if(response.status==200){
            let data = await response.json()
            // console.log('got products',type,data)
            dispatch(setMenuProducts(uri,data.products))
        } else {
            // console.log("could not fetch products menu")
        }
        dispatch(loadingMenuProducts(uri,false))
    }
}
export function setActiveTier1Item(item){
    return {
        type:SET_ACTIVE_TIER1_ITEM,
        item
    }
}
export function setActiveTier2Item(item){
    return {
        type:SET_ACTIVE_TIER2_ITEM,
        item
    }
}
export function setIndexValue(indexValue){
    return {
        type:SET_INDEX_VALUE,
        indexValue
    }
}
export function setIndexValue2(indexValue2){
    return {
        type:SET_INDEX_VALUE2,
        indexValue2
    }
}
export function setPanelTwoData(panelTwoData){
    return {
        type:SET_PANEL_TWO_DATA,
        panelTwoData
    }
}
export function setPanelThreeData(panelThreeData){
    return {
        type:SET_PANEL_THREE_DATA,
        panelThreeData
    }
}
export function showExploreMenu(bool){
    return {
        type:SHOW_EXPLORE_MENU,
        bool
    }
}
export function showMyUnsaidMenu(bool,index=null){
    return {
        type:SHOW_MYUNSAID_MENU,
        bool,
        index
    }
}
export function setSearchQuery(val){
    // console.log('set search',val)
    return {
        type:SET_SEARCH_QUERY,
        val
    }
}
export function showCart(bool){
    return {
        type:SHOW_CART,
        bool
    }
}
export function showWishlist(bool){
    return {
        type:SHOW_WISHLIST,
        bool
    }
}
export function tempSaveCartItem(items){
    return{
        type:SAVE_TEMP,
        items
    }
}

export function preventBodyScroll(bool){
    return {
        type:PREVENT_BODY_SCROLL,
        bool
    }
}
export function fetchingBundledProduct(bool,id){
    return {
        type:FETCHING_BUNDLED_PRODUCT,
        bool,
        id
    }
}
export function fetchBundledProductError(bool,id){
    return {
        type:FETCH_BUNDLED_PRODUCT_ERROR,
        bool,
        id
    }
}
export function setSearch(bool){
    return{
        type:GETTING_SEARCH,
        bool
    }
}
export function setShowNotification(msg){
    return {
        type:MAIN_NOTIFICATION,
        msg
    }
}
export function setShowBrandNotification(bool){
    return {
        type:BRAND_NOTIFICATION,
        bool
    }
}
export function fetchBundledProduct(bundle){
    return async dispatch =>{ 
        try{
            dispatch(fetchingBundledProduct(true,bundle))
            dispatch(fetchBundledProductError(false,bundle))
            const token=localStorage.getItem(TOKEN_VAR_NAME);
            let bundleResponse = await fetch(`${ECOMMERCE_URI}/bundles/${bundle}`,{
                method:'POST',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    includeSectionProducts: "true"
                })
            })
            if(bundleResponse.status==200){
                let data = await bundleResponse.json()
                let sections = data?.bundle?.bundleInfo?.sections
                if(sections?.length < 3)
                    throw "min 3 sections not available"
                let sectionProducts = data.sectionProducts
                // console.log("section prr", sectionProducts);
                if(!Array.isArray(sectionProducts))
                    throw "section products not available in bundle response"
                let productsToFetch = sections[2].products
                let reqBody = {
                    "products":productsToFetch,
                    "relatedProducts":true
                }
                let rawResponseProduct = await fetch(`${ECOMMERCE_URI}/products`, {
                    method: 'POST',
                    headers: {
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(reqBody)
                })
                if(rawResponseProduct.status==200){
                    let result = await rawResponseProduct.json()
                    if(result.products){
                        dispatch(addProductsToCache(result.products))
                    }
                    result?.products?.forEach(p=>{
                        //find in section products p, and replace section product with p
                        let i=sectionProducts.findIndex(sectionProduct=>sectionProduct.product==p.product)
                        if(i>-1)
                            sectionProducts[i] = p
                        if(p.relatedProducts){
                            dispatch(addProductsToCache(p.relatedProducts))
                        }
                    })
                }
                let onlyCordProductIndex = sectionProducts.findIndex(p=>p.product_type_value=="onlycord")
                if(onlyCordProductIndex > -1){
                    let res = await fetch(`${ECOMMERCE_URI}/products`,{
                        method:'POST',
                        headers:{
                            'Accept': `*/*; api-token: ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            "products":[sectionProducts[onlyCordProductIndex].product],
                            "relatedProducts":true
                        })
                    })
                    if(res.status==200){    
                        let productResponse = await res.json()
                        let cordOnlyProduct = productResponse.products[0]
                        if(cordOnlyProduct)
                            sectionProducts[onlyCordProductIndex] = cordOnlyProduct
                        if(Array.isArray(cordOnlyProduct.relatedProducts)){
                            dispatch(addProductsToCache(cordOnlyProduct.relatedProducts))
                        }
                    }
                }
                // console.log('adding to cache section products',sectionProducts)
                dispatch(addProductsToCache(sectionProducts))
                dispatch(setBundleInfo(bundle,data))     
            } else {
                throw "bundle product fetch response is not 200"
            }
            dispatch(fetchingBundledProduct(false,bundle))
        } catch(error){
            // console.log("Fetch bundled product error:",error)
            dispatch(fetchBundledProductError(true,bundle))
            dispatch(fetchingBundledProduct(false,bundle))
        }
    }
}
// export function fetchBundledProduct(bundle){
//     return async dispatch =>{ 
//         try{
//             dispatch(fetchingBundledProduct(true,bundle))
//             dispatch(fetchBundledProductError(false,bundle))
//             const token=localStorage.getItem(TOKEN_VAR_NAME);
//             let bundleResponse = await fetch(`${ECOMMERCE_URI}/bundles/${bundle}`,{
//                 method:'POST',
//                 headers:{
//                     'Accept': `*/*; api-token: ${token}`,
//                     'Content-Type': 'application/json'
//                 },
//                 body:JSON.stringify({
//                     includeSectionProducts: "true"
//                 })
//             })
//             if(bundleResponse.status==200){
//                 let data = await bundleResponse.json()
//                 dispatch(setBundleInfo(bundle,data))     
//             } else {
//                 throw "bundle product fetch response is not 200"
//             }
//             dispatch(fetchingBundledProduct(false,bundle))
//         } catch(error){
//             // console.log("Fetch bundled product error:",error)
//             dispatch(fetchBundledProductError(true,bundle))
//             dispatch(fetchingBundledProduct(false,bundle))
//         }
//     }
// }
function updateCartNotificationSuccess(jewelProduct,router,plpPaths){
    console.log("plp config data",plpPaths)
    return async dispatch => {
        let collectionId = jewelProduct.collection
        let collectionFilterValues = plpPaths.find(data=>data.filterType=="collection")
        collectionFilterValues = collectionFilterValues?collectionFilterValues.filterValues:[]
        let collectionData = collectionFilterValues.find(c=>c.id==collectionId)
        let collectionUri=collectionData?collectionData.uri:null
        if(collectionUri){
            dispatch(showCart(true))
            router.push(`/collection/${collectionUri}?matching=${jewelProduct.uri}`)
        }
    }
}
function updateCartNotificationError(){
    return async dispatch => {
        dispatch(showNavBar(true))
        dispatch(setShowNotification("Unexpected error in updating cart."))
        setTimeout(()=>{
            dispatch(setShowNotification(null))
        },3000)
    }
}
function updateAddBundleToCart(gifting,personalisation,bundleId,jewel,jewelProduct,item,router,silent,cb,plpPaths){
    return async dispatch=>{
        let giftBoxSection = gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[0]
        let postCardSection = gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[1]
        let jewelSection =  gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[2]
        let comment = JSON.stringify({mainJewelProductId:jewel,selectedJewelProductId:parseInt(item.split("-")[0]),boxChoice:personalisation.bundle[bundleId].boxChoice,cardChoice:personalisation.bundle[bundleId].cardChoice,selectedItem:item,engravingText:!!personalisation?.bundle[bundleId]?.engravingText?personalisation.bundle[bundleId].engravingText:"",noteText:!!personalisation?.bundle[bundleId]?.noteText?personalisation.bundle[bundleId].noteText:""})
        let sections = [
            {
                section: giftBoxSection.section,
                item: personalisation.bundle[bundleId].boxChoice
            },
            {
                section: postCardSection.section,
                item: personalisation.bundle[bundleId].cardChoice
            },
            {
                section: jewelSection.section,
                item: item
            }
        ]
        if(jewelProduct.product_type_value=="cord"){
            //in onlycord product and related products, find cord color and metal color matching selected jewel product
            let cordOnlyProduct = gifting.bundle[bundleId].bundleInfo.sectionProducts.find(p=>p.product_type_value=="onlycord")
            if(cordOnlyProduct){
                let matchingCordProduct = null
                if(
                    jewelProduct?.color?.color_hex==cordOnlyProduct?.color?.color_hex &&
                    jewelProduct?.cord_color?.hex==cordOnlyProduct?.cord_color?.hex
                ){
                    matchingCordProduct = cordOnlyProduct
                } else {
                    //look through related products
                    if(Array.isArray(cordOnlyProduct.relatedProducts)){
                        matchingCordProduct = cordOnlyProduct.relatedProducts.find(p=>
                            jewelProduct?.color?.color_hex==p?.color?.color_hex &&
                            jewelProduct?.cord_color?.hex==p?.cord_color?.hex
                        )
                    }
                }
                
                let cordSection =  gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[3]
                // console.log('cordSection',cordSection)
                sections.push({
                    section: cordSection.section,
                    item: matchingCordProduct?.items[0]?.item
                })
            }
        }
        let reqBody = {
            item:gifting.bundle[bundleId].bundleInfo.bundle.items[0].item,
            comment:comment,
            sections
        }
        dispatch(addBundleToCart(gifting.bundle[bundleId].bundleInfo.bundle.items[0].item,reqBody,(bool)=>{
            if(bool){
                if(!!cb)
                    cb(true)
                if(!silent)
                    dispatch(updateCartNotificationSuccess(jewelProduct,router,plpPaths));
            } else {
                if(!!cb)
                    cb(false)
                if(!silent)
                    dispatch(updateCartNotificationError())
            }
        }))
    }
}
export function updateCart(selection,gifting,personalisation,bundleId,jewel,jewelProduct,item,router,silent,cb,plpPaths){
    return async dispatch => {
        try{
            let cartItems = selection?.selection?.selection?.items
            if(Array.isArray(cartItems)){
                let editCartItem = cartItems.find(lineItem=>{
                    if(lineItem.comment){
                        let comment = JSON.parse(lineItem.comment)
                        if( jewel==comment.mainJewelProductId &&
                            jewelProduct.product==comment.selectedJewelProductId &&
                            item==comment.selectedItem
                        )
                        return true
                    } else {
                        return false
                    }
                })
                if(!!editCartItem){
                    // let comment = JSON.parse(editCartItem.comment)
                    // console.log("*********************************")
                    // console.log("new card choice",personalisation.bundle[bundleId].cardChoice)
                    // console.log("old card choice",comment.cardChoice)
                    // console.log("new box choice",personalisation.bundle[bundleId].boxChoice)
                    // console.log("old box choice",comment.boxChoice)
                    // let personalisationEngravingText = personalisation.bundle[bundleId].engravingText?personalisation.bundle[bundleId].engravingText:""
                    // let personalisationNoteText = personalisation.bundle[bundleId].noteText?personalisation.bundle[bundleId].noteText:""
                    // console.log("new engravingText",personalisationEngravingText)
                    // console.log("old engravingText",comment.engravingText)
                    // console.log("new noteText",personalisationNoteText)
                    // console.log("old noteText",comment.noteText)
                    // console.log("*********************************")
                    // if(
                    //     personalisation.bundle[bundleId].cardChoice == comment.cardChoice
                    //     && personalisation.bundle[bundleId].boxChoice == comment.boxChoice
                    //     && personalisationEngravingText == comment.engravingText
                    //     && personalisationNoteText == comment.noteText
                    // ){
                    //     console.log("no update required")
                    //     return
                    // }
                    let token = localStorage.getItem(TOKEN_VAR_NAME)
                    const rawResponse = await fetch(`${ECOMMERCE_URI}/lines/${editCartItem.line}`,{
                        method:'DELETE',
                        headers:{
                            'Accept': `*/*; api-token: ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    if(rawResponse.status==200){
                        dispatch(updateAddBundleToCart(gifting,personalisation,bundleId,jewel,jewelProduct,item,router,silent,cb,plpPaths))
                    } else {
                        let data=await rawResponse.json()
                        throw "delete line item response not 200"
                    }   
                } else {
                    throw "line item not found"
                } 
            } else {
                throw "cart is empty"
            }
        } catch(err){
            console.log(err)
            if(!!cb)
                cb(false)
            if(!silent)
                dispatch(updateCartNotificationError())
        }
    }
}
export function standardGiftingAddToCart(bundleId,gifting,mainJewelProductId,selectedProduct,selectedItem,cb=null){
    return async dispatch =>{
        // console.log('standard gifting add to cart',bundleId,gifting)
        let giftBoxSection = gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[0]
        let postCardSection = gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[1]
        let jewelSection =  gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[2]
        let defaultGiftBoxItem = null
        let defaultPostCardItem = null
        // giftBoxSection.products.forEach(productId=>{
        //     let defaultGiftBoxProduct = gifting.bundle[bundleId].bundleInfo.sectionProducts.find(p=>p.product==productId)
        //     defaultGiftBoxItem = !!defaultGiftBoxProduct?defaultGiftBoxProduct.items[0].item:null
        // })
        let defaultGiftBoxProduct = gifting.bundle[bundleId].bundleInfo.sectionProducts.find(p=>
            p.is_standard_gifting_option=="1" && giftBoxSection.products.includes(parseInt(p.product))
        )
        
        defaultGiftBoxItem = !!defaultGiftBoxProduct?defaultGiftBoxProduct.items[0].item:null        
        let defaultPostCardProduct = gifting.bundle[bundleId].bundleInfo.sectionProducts.find(p=>
            p.is_standard_gifting_option=="1" && postCardSection.products.includes(parseInt(p.product))
        )
        defaultPostCardItem = !!defaultPostCardProduct?defaultPostCardProduct.items[0].item:null
        let comment = JSON.stringify({mainJewelProductId,selectedJewelProductId:selectedProduct.product,boxChoice:defaultGiftBoxItem,cardChoice:defaultPostCardItem,selectedItem,engravingText:"",noteText:""})
        let sections = [
            {
                section: giftBoxSection.section,
                item: defaultGiftBoxItem
            },
            {
                section: postCardSection.section,
                item: defaultPostCardItem
            },
            {
                section: jewelSection.section,
                item: selectedItem
            }
        ]
        
        if(selectedProduct.product_type_value=="cord"){
            //in onlycord product and related products, find cord color and metal color matching selected jewel product
            let cordOnlyProduct = gifting.bundle[bundleId].bundleInfo.sectionProducts.find(p=>p.product_type_value=="onlycord")
            if(cordOnlyProduct){
                let matchingCordProduct = null
                if(
                    selectedProduct?.color?.color_hex==cordOnlyProduct?.color?.color_hex &&
                    selectedProduct?.cord_color?.hex==cordOnlyProduct?.cord_color?.hex
                ){
                    matchingCordProduct = cordOnlyProduct
                } else {
                    //look through related products
                    if(Array.isArray(cordOnlyProduct.relatedProducts)){
                        matchingCordProduct = cordOnlyProduct.relatedProducts.find(p=>
                            selectedProduct?.color?.color_hex==p?.color?.color_hex &&
                            selectedProduct?.cord_color?.hex==p?.cord_color?.hex
                        )
                    }
                }
                let cordSection =  gifting.bundle[bundleId].bundleInfo.bundle.bundleInfo.sections[3]
                sections.push({
                    section: cordSection.section,
                    item: matchingCordProduct?.items[0]?.item
                })
            }
        }
        let reqBody = {
            item:gifting.bundle[bundleId].bundleInfo.bundle.items[0].item,
            comment:comment,
            sections
        }
        // console.log("add to cart req body",reqBody)
        dispatch(addBundleToCart(gifting.bundle[bundleId].bundleInfo.bundle.items[0].item,reqBody,cb))
    }
}
export function addBundleToCart(bundleItem,reqBody,cb){
    // console.log('cb****',cb)
    return async dispatch =>{
        try{
            dispatch(addingToCart(true))
            let token = localStorage.getItem(TOKEN_VAR_NAME)
            const rawResponse = await fetch(`${ECOMMERCE_URI}/items/bundles/${bundleItem}`,{
                method:'POST',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(reqBody)
            })
            // console.log(rawResponse.status)
            if(rawResponse.status==201){
                // show cart animation
                if(cb)
                    cb(true)
                // console.log('added to cart')
                let selection = await rawResponse.json()
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                dispatch(storeSelection(selection))
                // dispatch(flash("Added to cart","default"))
            } else {
                //throw error
                if(cb)
                    cb(false)
                // console.log(await rawResponse.json())
                throw "cart response status not 201"
                
            }
            dispatch(addingToCart(false))
        } catch(err) {
            dispatch(addingToCart(false))
            console.log(err)
            if(cb)
                cb(false)
        }   
    }
}
export function addProductsToCache(products){
    return {
        type:ADD_PRODUCTS,
        products
    }
}
export function setBundleInfo(id,bundleInfo){
    return {
        type:SET_BUNDLE_INFO,
        id,
        bundleInfo
    }
}
export function setEngravingText(id,engravingText){
    return {
        type:SET_ENGRAVING_TEXT,
        id,
        engravingText
    }
}
export function setBoxChoice(id,boxChoice,boxName){
    return {
        type:SET_BOX_CHOICE,
        id,
        boxChoice,
        boxName
    }
}
export function setCardChoice(id,cardChoice,cardName){
    return {
        type:SET_CARD_CHOICE,
        id,
        cardChoice,
        cardName
    }
}
export function setNoteText(id,noteText){
    return {
        type:SET_NOTE_TEXT,
        id,
        noteText
    }
}
export function syncLikes(cookieConsent){
    return async dispatch =>{
        let token=localStorage.getItem(TOKEN_VAR_NAME)
        let response = await fetch(`${UNSAID_API}/api/likes`,{
            method:'POST',
            headers:{
                'Content-type':'application/json', 
            },
            body:JSON.stringify({
                token
            })
        })
        if(response.status==200){
            let remoteLikes = await response.json()            
            let localLikes = JSON.parse(localStorage.getItem(LOCAL_LIKES_VAR_NAME))
            localLikes = Array.isArray(localLikes)?localLikes:[]
            // console.log('localLikes',localLikes)
            // console.log('remoteLikes',remoteLikes)
            let combinedLikes = localLikes.concat(remoteLikes.filter(remoteId => localLikes.findIndex(id=>id==remoteId) == -1))
            // console.log('combinedLikes',combinedLikes)
            dispatch(updateLikes(combinedLikes,true,false,cookieConsent))
            if(combinedLikes.length){
                const rawResponse=await fetch(`${ECOMMERCE_URI}/products`,{
                    method:'POST',
                    headers:{
                        'Accept': `*/*; api-token: ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "products":combinedLikes
                    })
                })
                if(rawResponse.status==200){
                    let result = await rawResponse.json()
                    dispatch(addProductsToCache(result.products))
                }
            }
        }
    }
}

export function syncCartLikes(cookieConsent){
    return async dispatch=>{
        let token=localStorage.getItem(TOKEN_VAR_NAME)
        let response =await fetch(`${UNSAID_API}/api/giftLikes`,{
            method:'POST',
            headers:{
                'Content-type':'application/json', 
            },
            body:JSON.stringify({
                token
            })
        })
        if(response.status==200){
            let remoteCartLikes = await response.json();
            // console.log("cart likes from server",remoteCartLikes)
            let localCartLikes=JSON.parse(localStorage.getItem(LOCAL_GIFTS_VAR_NAME))
            localCartLikes=Array.isArray(localCartLikes)?localCartLikes:[]
            // console.log('localCartLikes',localCartLikes)
            // console.log('remoteCartLikes',remoteCartLikes)
            let combinedLikes=localCartLikes.concat(remoteCartLikes.filter(like=>localCartLikes.findIndex(l=>l.line==like.line)== -1 ))
            // console.log("combined likes ",combinedLikes)
            dispatch(updateCartLikes(combinedLikes,true,false,cookieConsent))
            if(combinedLikes.length){
                combinedLikes.forEach((cartItem)=>{
                    let bundle=cartItem.bundleId;
                    if(!!bundle){
                        dispatch(fetchBundledProduct(bundle))
                    }
                })
            }
        }
    }
}
export function restoreItems(backupItems,gifting,cookieConsent,cartItems,cb=null){
    return async dispatch=>{
        for(let i=0;i<backupItems.length;i++){
            let giftItem = backupItems[i]
            let metaData = JSON.parse(giftItem.comment)
            let {boxChoice,cardChoice,selectedItem} = metaData
            let giftBoxSection = gifting.bundle[giftItem.bundleId].bundleInfo.bundle.bundleInfo.sections[0]
            let postCardSection = gifting.bundle[giftItem.bundleId].bundleInfo.bundle.bundleInfo.sections[1]
            let jewelSection =  gifting.bundle[giftItem.bundleId].bundleInfo.bundle.bundleInfo.sections[2]
            let comment = giftItem.comment
            let reqBody = {
                item:giftItem.item,
                comment:comment,
                sections:[
                    {
                        section: giftBoxSection.section,
                        item: boxChoice
                    },
                    {
                        section: postCardSection.section,
                        item: cardChoice
                    },
                    {
                        section: jewelSection.section,
                        item: selectedItem
                    }
                ]
            }
            // console.log('restore items',reqBody)
            dispatch(addBundleToCart(giftItem.item,reqBody,cb))
            let giftsInWishlist = JSON.parse(JSON.stringify(cartItems))
            giftsInWishlist = giftsInWishlist.filter(gift=>{
                //if gift line present in backup items, dont include
                return backupItems.findIndex(backupItem=>backupItem.line==gift.line) == -1
            })
            dispatch(updateCartLikes(giftsInWishlist,true,false,cookieConsent))
        }
        //remove
    }
}
function sendLikesToRemote(likesArray){
    let token=localStorage.getItem(TOKEN_VAR_NAME)
    fetch(`${UNSAID_API}/api/like`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            token,
            likesArray
        })
    })
}
function updateLikes2(likesArray){
    return{
        type:UPDATE_LIKES,
        likesArray
    }
}
export function updateLikes(likesArray,sendToRemote,showNotification,cookieConsent){
    return async dispatch =>{
        if(cookieConsent){
            localStorage.setItem(LOCAL_LIKES_VAR_NAME,JSON.stringify(likesArray));
        }
        if(sendToRemote){
            sendLikesToRemote(likesArray)
        }
        dispatch(updateLikes2(likesArray))
        if(showNotification){
            dispatch(showNavBar(true))
            dispatch(animateHeart(true))
            setTimeout(()=>{
                dispatch(animateHeart(false))
            },1500)
        }
    }
}
function sendGiftLikedToRemote(cartItems){
    // console.log("giftlike")
    let token=localStorage.getItem(TOKEN_VAR_NAME)
    fetch(`${UNSAID_API}/api/giftLike`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            token,
            giftItems:cartItems
        })
    })
}
function updateCartLikes2(cartItems){
    return{
        type:CART_LIKES,
        cartItems
    }
}
function animateHeart(bool){
    return {
        type:ANIMATE_HEART,
        bool
    }
}
export function animateCart(bool){
    return {
        type:ANIMATE_CART,
        bool
    }
}
export function updateCartLikes(cartItems,sendToRemote,showNotification,cookieConsent){
    return dispatch=>{
        if(cookieConsent)
            localStorage.setItem(LOCAL_GIFTS_VAR_NAME,JSON.stringify(cartItems))
        if(sendToRemote){
            sendGiftLikedToRemote(cartItems);
        }

        if(showNotification){
            dispatch(showNavBar(true))
            dispatch(animateHeart(true))
            setTimeout(()=>{
                dispatch(animateHeart(false))
            },1500)
        }
        dispatch(updateCartLikes2(cartItems))
    }
}
export function isLoggedIn(bool){
    return{
        type:LOGGEDIN,
        bool
    }
}
export function setSiteReady(bool){
    return {
        type:SITE_READY,
        bool
    }
}
export function showNavBar(bool){
    return {
        type:SHOW_NAV_BAR,
        bool
    }
}
export function setCustomizeWindow(bool){
    return {
        type:CUSTOM_WINDOW,
        bool
    }
}
export function setWindow(windowWidth,windowHeight){
    return {
        type:SET_WINDOW,
        windowWidth,
        windowHeight,
    }
}
export function setWindow2(windowWidth,windowHeight){
    return {
        type:SET_WINDOW_2,
        windowWidth,
        windowHeight
    }
}
export function setMode(mode){
    // console.log(mode)
    return {
        type:SET_MODE,
        mode
    }
}
export function numberOfSections(value){
    return{
        type:NUMBER_OF_SECTIONS,
        value
    }
}
export function gettingSelection(bool) {
    return {
        type:GETTING_SELECTION,
        bool
    }
}
export function storeSelection(selection){
    return {
        type:STORE_SELECTION,
        selection
    }
}
export function setLoggedIn(bool){
    return {
        type:LOGGED_IN,
        bool
    }
}
export function flash(flashMessage,flashMessageType){
    return {
        type:SHOW_FLASH,
        flashMessage,
        flashMessageType
    }
}
export function logout(){
    // console.log("logout1");
    return async dispatch =>{
        try{
            // console.log("logout2");
            let token = getTokenFromLocalStorage()
            const rawResponse = await fetch(`${ECOMMERCE_URI}/logout`, {
                method: 'POST',
                headers: {
                'Accept': `*/*; api-token: ${token}`,
                'Content-Type': 'application/json'
                }
            }) 
            if(rawResponse.status==200){
                let result = await rawResponse.json();
                // console.log("logout",result);
                dispatch(storeSelection(result))
            } else {
                throw "error"
            }

        } catch(err) {
            // console.log("error",err);
            dispatch(flash("Unexpected error: Could not logout","error"))
            setTimeout(()=>{
                dispatch(flash("",""))
            },3000)
        }
    }
}