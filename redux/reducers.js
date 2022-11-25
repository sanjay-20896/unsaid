import {SET_MENU_FETCH_START,SET_LANGUAGES,SET_MENU_DATA,SET_PLP_PATHS,SHOP_THE_LOOK_PRODUCTS,GIFT_EDIT_FROM_SUMMARY,SHOW_NEWSLETTER_POPUP, PREVENT_NAV_HIDING,SET_ADMIN_LOGGED_IN,SET_ADMIN_LOGGING_IN, SET_All_PRODUCTS,FETCHING_ALL_PRODUCTS,PAGE_TRANSITIONING,USER_HAS_SET_COOKIE_CONSENT,LOADING_MENU_PRODUCTS,FETCH_BUNDLED_PRODUCT_ERROR, SET_PERFORMANCE_COOKIE,SET_FUNCTIONAL_COOKIE,SET_TARGETING_COOKIE,SHOW_COOKIE_DETAILS,OPEN_LOGIN,OPEN_REGISTER,COOKIES_SHOW,ANIMATE_CART,ANIMATE_HEART,FILTER_STICKY,CHANGING_SHIPPING_METHOD,CHANGING_COUNTRY, SET_GLOBAL_SETTINGS,BRAND_NOTIFICATION,ADDING_TO_CART,SHOW_SEARCH_WINDOW,SET_MENU_PRODUCTS,SET_MENU_PRODUCTS_PRICELIST,SET_ACTIVE_TIER1_ITEM, SET_ACTIVE_TIER2_ITEM, SET_PANEL_TWO_DATA,SET_PANEL_THREE_DATA,SET_INDEX_VALUE,SET_INDEX_VALUE2,SHOW_EXPLORE_MENU,SHOW_MYUNSAID_MENU, SET_SEARCH_QUERY,SHOW_CART,SHOW_WISHLIST,FETCHING_BUNDLED_PRODUCT,PREVENT_BODY_SCROLL,SET_BUNDLE_INFO,SET_ENGRAVING_TEXT,SET_BOX_CHOICE,SET_CARD_CHOICE,SET_NOTE_TEXT,SHOW_FLASH,SHOW_NAV_BAR,SET_WINDOW, NUMBER_OF_SECTIONS,SET_WINDOW_2,SET_MODE,SITE_READY,GETTING_SELECTION,STORE_SELECTION,CUSTOM_WINDOW,UPDATE_LIKES,LOGGED_IN,ADD_PRODUCTS,CART_LIKES, GETTING_SEARCH,SAVE_TEMP,MAIN_NOTIFICATION} from './actions'
import { combineReducers } from 'redux';
import {HEADER_HEIGHT_DESKTOP,HEADER_HEIGHT_MEDIUM,HEADER_HEIGHT_TABLET,HEADER_HEIGHT_MOBILE,MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,MOBILE_BREAKPOINT} from '../config'
import mapKeys from 'lodash/mapKeys'
function commonReducer(state={menuDataFetchStart:false,shopTheLookActive:false,shopTheLookProducts:null,showNewsletterPopup:false,giftEditFromSummary:false,preventNavHiding:false,pageTransitioning:false,userHasSetCookieConsent:false,myUnsaidMenuIndex:null,showCookieDetails:false,showCookies:false,filterSticky:false,globalSettings:null,showCart:false,showWishlist:false,changinShippingMethod:false,changingCountry:false,banner:{},showBrandNotification:false,addingToCart:false,showSearchWindow:false,showMyUnsaidMenu:false,showExploreMenu:false,searchQuery:"",preventBodyScroll:false,showNavBar:true,mode:"landscape",siteReady:false,navHeight:0,windowWidth:0,windowHeight:0,windowWidth2:0,windowHeight2:0,flashMessage:"",flashMessageType:"normal",searchShown:false,showNotification:null,plpPaths:[],menuItems:{},languages:[]},action){
	switch(action.type){
		case SHOP_THE_LOOK_PRODUCTS:
			return  Object.assign({},state,{shopTheLookActive:action.bool,shopTheLookProducts:action.products})
		case SHOW_NEWSLETTER_POPUP:
			return  Object.assign({},state,{showNewsletterPopup:action.bool})
		case GIFT_EDIT_FROM_SUMMARY:
			return Object.assign({},state,{giftEditFromSummary:action.bool})
		case PREVENT_NAV_HIDING:
			return Object.assign({},state,{preventNavHiding:action.bool})
		case USER_HAS_SET_COOKIE_CONSENT:
			return Object.assign({},state,{userHasSetCookieConsent:action.bool})
		case PAGE_TRANSITIONING:
			return Object.assign({},state,{pageTransitioning:action.bool})
		case FILTER_STICKY:
			return Object.assign({},state,{filterSticky:action.bool})
		case CHANGING_SHIPPING_METHOD:
			return Object.assign({},state,{changinShippingMethod:action.bool})
		case CHANGING_COUNTRY:
			return Object.assign({},state,{changingCountry:action.bool})
		case ADDING_TO_CART:
			return Object.assign({},state,{addingToCart:action.bool})
		case SHOW_SEARCH_WINDOW:
			return Object.assign({},state,{showSearchWindow:action.bool})
		case SHOW_EXPLORE_MENU:
			return Object.assign({},state,{showExploreMenu:action.bool})
		case SHOW_MYUNSAID_MENU:
			return Object.assign({},state,{showMyUnsaidMenu:action.bool,myUnsaidMenuIndex:action.index})
		case SET_SEARCH_QUERY:
			return Object.assign({},state,{searchQuery:action.val})
		case SHOW_CART:
			return Object.assign({},state,{showCart:action.bool})
		case SHOW_WISHLIST:
			return Object.assign({},state,{showWishlist:action.bool})
		case PREVENT_BODY_SCROLL:
			return Object.assign({},state,{preventBodyScroll:action.bool})
		case SHOW_NAV_BAR:
			return Object.assign({},state,{showNavBar:action.bool})
		case SET_MODE:
			return Object.assign({},state,{mode:action.mode})
		case SITE_READY:
			return Object.assign({},state,{siteReady:action.bool})
		case CUSTOM_WINDOW:
			return Object.assign({},state,{customWindow:action.bool})
		case SHOW_FLASH:
			return Object.assign({},state,{flashMessage:action.flashMessage,flashMessageType:action.flashMessageType})
		case SET_WINDOW_2:
			return Object.assign({},state,{windowWidth2:action.windowWidth,windowHeight2:action.windowHeight})
		case SET_WINDOW:
			var navHeight = HEADER_HEIGHT_DESKTOP
			if(action.windowWidth <= MEDIUM_BREAKPOINT)
				navHeight = HEADER_HEIGHT_MEDIUM
			if(action.windowWidth <= TABLET_LANDSCAPE_BREAKPOINT)
				navHeight = HEADER_HEIGHT_TABLET
			if(action.windowWidth <= MOBILE_BREAKPOINT)
				navHeight = HEADER_HEIGHT_MOBILE
			return Object.assign({},state,{siteReady:true,navHeight,windowWidth:action.windowWidth,windowHeight:action.windowHeight})
		case NUMBER_OF_SECTIONS:
			return Object.assign({},state,{numOfSection:action.value})
		case GETTING_SEARCH:
			return Object.assign({},state,{searchShown:action.bool})
		case MAIN_NOTIFICATION:
			return Object.assign({},state,{showNotification:action.msg})
		case BRAND_NOTIFICATION:
			return Object.assign({},state,{showBrandNotification:action.bool})
		case SET_GLOBAL_SETTINGS:
			return Object.assign({},state,{globalSettings:action.globalSettings})
		case COOKIES_SHOW:			
			return Object.assign({},state,{showCookies:action.bool})
		case SHOW_COOKIE_DETAILS:
			return Object.assign({},state,{showCookieDetails:action.bool})
		case SET_PLP_PATHS:
			return Object.assign({},state,{plpPaths:action.plpPaths})
		case SET_MENU_DATA:
			return Object.assign({},state,{menuItems:action.menuItems})
		case SET_LANGUAGES:
			return Object.assign({},state,{languages:action.languages})
		case SET_MENU_FETCH_START:
			return Object.assign({},state,{menuDataFetchStart:action.bool})
		default:
			return state;
	}
}
function exploreMenu(state={activeTier1Item:null,activeTier2Item:null,indexValue:0,indexValue2:0,panelTwoData:null,panelThreeData:null},action){
	switch(action.type){
		case SET_ACTIVE_TIER1_ITEM:
			return Object.assign({},state,{activeTier1Item:action.item})
		case SET_ACTIVE_TIER2_ITEM:
			return Object.assign({},state,{activeTier2Item:action.item})
		case SET_INDEX_VALUE2:
			return Object.assign({},state,{indexValue2:action.indexValue2})
		case SET_INDEX_VALUE:
			return Object.assign({},state,{indexValue:action.indexValue})
		case SET_INDEX_VALUE2:
			return Object.assign({},state,{indexValue2:action.indexValue2})
		case SET_PANEL_TWO_DATA:
			return Object.assign({},state,{panelTwoData:action.panelTwoData})
		case SET_PANEL_THREE_DATA:
			return Object.assign({},state,{panelThreeData:action.panelThreeData})
		default:
			return state;
	}
}
function cacheReducer(state={fetchingAllProducts:false,allProducts:[],products:{},menuProducts:{},loadingMenuProducts:{},menuProductsPriceList:null},action){
	switch(action.type){
		case SET_All_PRODUCTS:
			return Object.assign({},state,{allProducts:action.products})
		case FETCHING_ALL_PRODUCTS:
			return Object.assign({},state,{fetchingAllProducts:action.bool})
		case SET_MENU_PRODUCTS_PRICELIST:
			return Object.assign({},state,{menuProductsPriceList:action.pricelist})
		case SET_MENU_PRODUCTS:
			var newMenuProducts = Object.assign({},state.menuProducts,{[action.uri]:action.products})
			return Object.assign({},state,{menuProducts:newMenuProducts})
		case LOADING_MENU_PRODUCTS:
			var newLoadingMenuProducts = Object.assign({},state.loadingMenuProducts,{[action.uri]:action.bool})
			return Object.assign({},state,{loadingMenuProducts:newLoadingMenuProducts})
		case ADD_PRODUCTS:
			let newProducts = Object.assign({},state.products,mapKeys(action.products,"product"))
				return Object.assign({},state,{products:newProducts})
		default:
			return state;
	}
}
function selectionReducer(state={openLogin:false,animateCart:false,animateHeart:false,items:[],gettingSelection:false,selection:null,likesArray:[],cartItems:[],clearBackupItems:false},action){
	switch(action.type){
		case ANIMATE_CART:
			return Object.assign({},state,{animateCart:action.bool})
		case ANIMATE_HEART:
			return Object.assign({},state,{animateHeart:action.bool})
		case GETTING_SELECTION:
			return Object.assign({},state,{gettingSelection:action.bool})
		case STORE_SELECTION:
			return Object.assign({},state,{selection:action.selection})
		case UPDATE_LIKES:
			return Object.assign({},state,{likesArray:action.likesArray})
		case LOGGED_IN:
			return Object.assign({},state,{loggedIn:action.bool})
		case CART_LIKES:
			return Object.assign({},state,{cartItems:action.cartItems})
		case OPEN_LOGIN:
			return Object.assign({},state,{openLogin:action.bool})
		case OPEN_REGISTER:
			return Object.assign({},state,{openRegister:action.bool})
		case SAVE_TEMP:
			// var newBackUpItems = JSON.parse(JSON.stringify(state.backupItems))
			// newBackUpItems.push(action.item)
			return Object.assign({},state,{backupItems:action.items})
			
		default:
			return state;
	}

}
function giftingReducer(state={bundle:{}},action){
	switch(action.type){
		case FETCH_BUNDLED_PRODUCT_ERROR:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{fetchBundledProductError:action.bool})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		case FETCHING_BUNDLED_PRODUCT:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{fetchingBundleData:action.bool})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		case SET_BUNDLE_INFO:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{bundleInfo:action.bundleInfo})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		default:
			return state
	}
}
function personalisationReducer(state={bundle:{}},action){
	switch(action.type){
		case SET_ENGRAVING_TEXT:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{engravingText:action.engravingText})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		case SET_BOX_CHOICE:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{boxChoice:action.boxChoice,boxName:action.boxName})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		case SET_CARD_CHOICE:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{cardChoice:action.cardChoice,cardName:action.cardName})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		case SET_NOTE_TEXT:
			var oldBundleData = state.bundle[action.id]?state.bundle[action.id]:{}
			var newBundleData = Object.assign({},oldBundleData,{noteText:action.noteText})
			var stateCopy = JSON.parse(JSON.stringify(state))
			stateCopy.bundle[action.id] = newBundleData
			return stateCopy
		default:
			return state
	}
}
function cookiesReducer(state={performance:true,functional:true,targeting:true},action){
	switch(action.type){
		case SET_PERFORMANCE_COOKIE:
			return Object.assign({},state,{performance:action.bool})
		case SET_FUNCTIONAL_COOKIE:
			return Object.assign({},state,{functional:action.bool})
		case SET_TARGETING_COOKIE:
			return Object.assign({},state,{targeting:action.bool})
		default:
			return state
	}
}
function adminReducer(state={token:"",loggingIn:false},action){
	switch(action.type){
		case SET_ADMIN_LOGGING_IN:
			return Object.assign({},state,{loggingIn:action.bool})
		case SET_ADMIN_LOGGED_IN:
			return Object.assign({},state,{token:action.token})
		default:
			return state
	}
}
const combinedReducer = combineReducers({
	common:commonReducer,
	selection:selectionReducer,
	gifting:giftingReducer,
	personalisation:personalisationReducer,
	cache:cacheReducer,
	cookieConsent:cookiesReducer,
	admin:adminReducer,
	exploreMenu
});
export default combinedReducer;
