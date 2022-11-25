import {getPriceAsNumberBasedOnSelection} from './functions'
import { UNSAID_API } from './branch-specific-config'
export function viewItemList(products,type){
    let items = products.map(product=>{
        return {
            item_name:product.name,
            item_id:product.product,
            item_category:product.categoryName?product.categoryName[0]:"",
            item_category2:product.collectionName,
            item_variant:product.variantName,
            item_list_id:product.productSku,
        }
    })
    window.dataLayer.push({ecommerce:null})
    window.dataLayer.push({
        event: "view_item_list",
        item_list_name: type,
        ecommerce:{
            items
        }
    })
}
export function onProductClick(product,selection,where){
        window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        window.dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
            'click': {
                        'actionField': {'list': where},      // Optional list property.
                        'products': [{
                            'name': product.name,                      // Name or ID is required.
                            'id': product.product,
                            'price': !!product.prices? getPriceAsNumberBasedOnSelection(product,selection):product.price,
                            'category': product?.categoryName?product?.categoryName[0]:"",
                            'variant': product.variantName,
                        }]
                    }
            }
        })
}
export function productImpression(product,selection,where){
    // console.log("productImpression",product)
    window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window.dataLayer.push({
        'event':'productImpression',
        'productName':`${product.name} ${product.variantName} ${product.sku}`,
        'productSku': product.sku
    })
}
export function productDetail(product){
    window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window.dataLayer.push({
        'event':'productDetail',
        'productName':`${product.name} ${product.variantName} ${product.sku}`,
        'productSku': product.sku
    })
}
export function productDetailEcomm(product,selection){
        window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        window.dataLayer.push({
            'ecommerce': {
                'detail': {
                    'products': [{
                            'name': product.name,
                            'id': product.product,
                            'price': !!product.prices? getPriceAsNumberBasedOnSelection(product,selection):product.price,
                            'category': product.categoryName?product.categoryName[0]:"",
                            'variant': product.variantName
                    }]
                }
            }
        })
}
function gtmAddToCart(product,selection){
    window.dataLayer.push({ ecommerce: null })  // Clear the previous ecommerce object.
    window.dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
                'currencyCode': selection?.selection?.selection?.currency,
                'add': {                                // 'add' actionFieldObject measures.
                    'products': [{                        //  adding a product to a shopping cart.
                        'name': product.name,
                        'id': product.product,
                        'price': !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                        'category': product.categoryName?product.categoryName[0]:"",
                        'variant': product.variantName,
                        'quantity': 1
                    }]
                }
        }
    })
    window.dataLayer.push({ ecommerce: null })  
    window.dataLayer.push({
        'event':'addToCartCustom',
        'productName':`${product.name} ${product.variantName} ${product.sku}`,
        'productSku': product.sku
    })
}
function fbAddToCart(product,selection){
    const dataToSendFb = {
        "action_source": "website",
        "event_source_url": window?.location?.href?window.location.href:null,
        "client_user_agent": window?.navigator?.userAgent?window.navigator.userAgent:null,
        "content_type": "product",
        "content_ids": `["${product.product}"]`,
        "fn":selection?.selection?.loggedIn?selection.selection.loggedIn.firstName:""
    }
    // console.log("data to send fb",dataToSendFb)
    fetch(`${UNSAID_API}/api/events/addToCart`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dataToSendFb)
    })
}
export function onAddToCart(product,selection){
    gtmAddToCart(product,selection)
    fbAddToCart(product,selection)
}
function gtmCheckout(products){
    window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window.dataLayer.push({
        'event': 'checkout',
        'ecommerce': {
            'checkout': {
                'actionField': {'step': 1},
                products
            }
        }
    });
}
function fbCheckout(selection){
    const dataToSendFb = {
        "action_source": "website",
        "event_source_url": window?.location?.href?window.location.href:null,
        "client_user_agent": window?.navigator?.userAgent?window.navigator.userAgent:null,
        "fn":selection?.selection?.loggedIn?selection.selection.loggedIn.firstName:"",
    }
    // console.log("data to send fb checkout",dataToSendFb)
    fetch(`${UNSAID_API}/api/events/initiateCheckout`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dataToSendFb)
    })
}
export function onCheckout(products,selection){
    gtmCheckout(products)
    fbCheckout(selection)

}
export function onPageView(selection){
    try{
        const dataToSendFb = {
            "action_source": "website",
            "event_source_url": window?.location?.href?window.location.href:null,
            "client_user_agent": window?.navigator?.userAgent?window.navigator.userAgent:null,
            "em":selection?.selection?.loggedIn?selection.selection.loggedIn.email:"",
            "fn":selection?.selection?.loggedIn?selection.selection.loggedIn.firstName:"",
            "zp":selection?.selection?.selection?.address?.zipCode?selection.selection.selection.address.zipCode:"",
            "country":selection?.selection?.location?.country?selection.selection.location.country.toLowerCase():""
        }
        // console.log("data to send fb page view",dataToSendFb)
        fetch(`${UNSAID_API}/api/events/pageView`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(dataToSendFb)
        })
    } catch(err){
        // console.log(err)
    }
}
export function onAddToCartMultiple(productsArray,cache,selection){
    let products = productsArray.map(item=>{
        let metaData = JSON.parse(item.comment)
        let {selectedJewelProductId} = metaData
        let product = cache.products[selectedJewelProductId]
        return {
                'name': product.name,
                'id': product.product,
                'price': !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                'category': product.categoryName?product.categoryName[0]:"",
                'variant': product.variantName,
                'quantity': 1
        }
    })
    // console.log("add to cart gtm multiple",products)
    window.dataLayer.push({ ecommerce: null });  
    window.dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
            'currencyCode': selection?.selection?.selection?.currency,
            'add': {                                
                products
            }
        }
    })
    products.forEach(product=>{
        window.dataLayer.push({ ecommerce: null })  
        window.dataLayer.push({
            'event':'addToCartCustom',
            'productName':`${product.name} ${product.variantName} ${product.sku}`,
            'productSku': product.sku
        })
    })
}
export function onRemoveFromCart(cartItems,selection,cache){
        try{
            let products = cartItems.map(item=>{
                let metaData = JSON.parse(item.comment)
                let {selectedJewelProductId} = metaData
                let product = cache.products[selectedJewelProductId]
                return { 
                    'name':product.name,
                    'id': product.product,
                    'price': !!product.prices?getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                    'brand': "Unsaid",
                    'category': product.categoryName?product.categoryName[0]:"",
                    'variant': product.variantName,
                    'quantity': item.quantity
                }
            })
            let objToPush = {
                'event': 'removeFromCart',
                'ecommerce': {
                        'currencyCode': selection?.selection?.selection?.currency,
                        'remove': {
                            'products': products
                        }
                }
            }
            // console.log("on remove from cart",products,objToPush)
            window.dataLayer.push({ ecommerce: null })
            window.dataLayer.push(objToPush)
            // console.log("on remove from cart data layer",window.dataLayer)
            products.forEach(product=>{
                window.dataLayer.push({ ecommerce: null })  
                window.dataLayer.push({
                    'event':'removeFromCartCustom',
                    'productName':`${product.name} ${product.variantName} ${product.sku}`,
                    'productSku': product.sku
                })
            })
        } catch(err){
            // console.log("on remove from cart error",err)
        }
}
export function onRemoveSingleItemFromCart(item,cache,selection){
    let metaData = JSON.parse(item.comment)
    let {selectedJewelProductId} = metaData
    let product = cache.products[selectedJewelProductId]
    let products = [{ 
        'name':product.name,
        'id': product.product,
        'price': !!product.prices?getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
        'brand': "Unsaid",
        'category': product.categoryName?product.categoryName[0]:"",
        'variant': product.variantName,
        'quantity': item.quantity
    }]
    window.dataLayer.push({ ecommerce: null });  
    window.dataLayer.push({
        'event': 'removeFromCart',
        'ecommerce': {
                'currencyCode': selection?.selection?.selection?.currency,
                'remove': {
                'products': products
            }
        }
    })
    window.dataLayer.push({ ecommerce: null })  
    window.dataLayer.push({
        'event':'removeFromCartCustom',
        'productName':`${product.name} ${product.variantName} ${product.sku}`,
        'productSku': product.sku
    })
}
export async function onAddWishlistGiftToCart(giftItem,cache,selection){
    let metaData = JSON.parse(giftItem.comment)
    let {selectedJewelProductId} = metaData
    let product = cache.products[selectedJewelProductId]
    let products = [{
            'name': product.name,
            'id': product.product,
            'price': !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
            'category': product.categoryName?product.categoryName[0]:"",
            'variant': product.variantName,
            'quantity': 1
    }]
    window.dataLayer.push({ ecommerce: null });  
    window.dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
            'currencyCode': selection?.selection?.selection?.currency,
            'add': {                                
                products
            }
        }
    })
    window.dataLayer.push({ ecommerce: null })  
    window.dataLayer.push({
        'event':'removeFromCartCustom',
        'productName':`${product.name} ${product.variantName} ${product.sku}`,
        'productSku': product.sku
    })
}
export function onAddToWishlist(product,selection){
    let dataLayerObj = {
        'event': 'addToWishlist',
        'ecommerce': { 
                'add': {
                    products:[
                        {
                            name: product.name,
                            id: product.product,
                            price: !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                            currencyCode: selection?.selection?.selection?.currency,
                            category: product.categoryName?product.categoryName[0]:"",
                            variant: product.variantName,
                            quantity: 1
                        }
                    ]
                }
        }
    }
    // console.log("add to wishlist",dataLayerObj)
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(dataLayerObj)
}
export function onRemoveFromWishlist(product,selection){
    let dataLayerObj = {
        'event': 'removeFromWishlist',
        'ecommerce': { 
                'remove': {
                    products:[
                        {
                            name: product.name,
                            id: product.product,
                            price: !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                            currencyCode: selection?.selection?.selection?.currency,
                            category: product.categoryName?product.categoryName[0]:"",
                            variant: product.variantName,
                            quantity: 1
                        }
                    ]
                }
        }
    }
    // console.log("remove from wishlist",dataLayerObj)
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(dataLayerObj)
}
export function onStandardGifting(product,selection,item){
    let sizeItem = product.items.find(itm=>itm.item==item)
    let size = sizeItem?sizeItem.name:""
    let dataLayerObj = {
        'event': 'standardGifting',
        'ecommerce': { 
                'add': {
                    products:[
                        {
                            name: product.name,
                            id: product.product,
                            price: !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                            currencyCode: selection?.selection?.selection?.currency,
                            category: product.categoryName?product.categoryName[0]:"",
                            variant: product.variantName,
                            quantity: 1,
                            size,
                            engrave:"",
                            box:"Unsaid",
                            card:"Unsaid",
                            personalNote:""
                        }
                    ]
                }
        }
    }
    // console.log("standard gifting",dataLayerObj)
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(dataLayerObj)
}
export function onUpdateCart(product,selection,personalisation,item){
    let sizeItem = product.items.find(itm=>itm.item==item)
    let size = sizeItem?sizeItem.name:""
    let dataLayerObj = {
        'event': 'personalGifting',
        'ecommerce': { 
                'add': {
                    products:[
                        {
                            name: product.name,
                            id: product.product,
                            price: !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                            currencyCode: selection?.selection?.selection?.currency,
                            category: product.categoryName?product.categoryName[0]:"",
                            variant: product.variantName,
                            quantity: 1,
                            size,
                            engrave:personalisation.engravingText?personalisation.engravingText:"",
                            box:personalisation.boxName,
                            card:personalisation.cardName,
                            personalNote:personalisation.noteText
                        }
                    ]
                }
        }
    }
    // console.log("personal gifting gifting",dataLayerObj)
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(dataLayerObj)
}
export function onProceedToCheckout(selection,cache){
    let cartItems = selection?.selection?.selection?.items
    if(cartItems){
        let products = cartItems.map(cartItem=>{
            let metaData = JSON.parse(cartItem.comment)
            let {selectedJewelProductId,boxChoice,cardChoice,noteText,engravingText,selectedItem} = metaData
            let product = cache.products[selectedJewelProductId]
            let boxProduct = cache.products[boxChoice.split("-")[0]]
            let box = boxProduct?.name?boxProduct.name:""
            let cardProduct = cache.products[cardChoice.split("-")[0]]
            let card = cardProduct?.name?cardProduct.name:""
            let sizeItem = product.items.find(itm=>itm.item==selectedItem)
            let size = sizeItem?sizeItem.name:""
            return {
                    name: product.name,
                    id: product.product,
                    price: !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                    currencyCode: selection?.selection?.selection?.currency,
                    category: product.categoryName?product.categoryName[0]:"",
                    variant: product.variantName,
                    quantity: 1,
                    size,
                    engrave:engravingText,
                    box,
                    card,
                    personalNote:noteText
            }
        })
        let dataLayerObj = {
            'event': 'proceedToCheckout',
            'ecommerce': { 
                    'add': {
                        products
                    }
            }
        }
        // console.log("proceedToCheckout",dataLayerObj)
        window.dataLayer.push({ ecommerce: null })
        window.dataLayer.push(dataLayerObj)
    } 
}
function gtmProceedToPayment(selection,cache){
    let cartItems = selection?.selection?.selection?.items
    if(cartItems){
        let products = cartItems.map(cartItem=>{
            let metaData = JSON.parse(cartItem.comment)
            let {selectedJewelProductId,boxChoice,cardChoice,noteText,engravingText,selectedItem} = metaData
            let product = cache.products[selectedJewelProductId]
            let boxProduct = cache.products[boxChoice.split("-")[0]]
            let box = boxProduct?.name?boxProduct.name:""
            let cardProduct = cache.products[cardChoice.split("-")[0]]
            let card = cardProduct?.name?cardProduct.name:""
            let sizeItem = product.items.find(itm=>itm.item==selectedItem)
            let size = sizeItem?sizeItem.name:""
            return {
                    name: product.name,
                    id: product.product,
                    price: !!product.prices ? getPriceAsNumberBasedOnSelection(product,selection):product.priceAsNumber,
                    currencyCode: selection?.selection?.selection?.currency,
                    category: product.categoryName?product.categoryName[0]:"",
                    variant: product.variantName,
                    quantity: 1,
                    size,
                    engrave:engravingText,
                    box,
                    card,
                    personalNote:noteText
            }
        })
        let dataLayerObj = {
            'event': 'proceedToPayment',
            'ecommerce': { 
                'add': {
                    products
                }
            }
        }
        // console.log("proceedToPayment",dataLayerObj)
        window.dataLayer.push({ ecommerce: null })
        window.dataLayer.push(dataLayerObj)
    }
}
export function fbProceedToPayment(selection){
    const dataToSendFb = {
        "action_source": "website",
        "event_source_url": window?.location?.href?window.location.href:null,
        "client_user_agent": window?.navigator?.userAgent?window.navigator.userAgent:null,
        "fn":selection?.selection?.selection?.address?.firstName?selection.selection.selection.address.firstName:"",
        "em":selection?.selection?.selection?.address?.email?selection.selection.selection.address.email:"",
    }
    // console.log("fb proceed",dataToSendFb)
    fetch(`${UNSAID_API}/api/events/proceedToPayment`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dataToSendFb)
    })
}
export function onProceedToPayment(selection,cache){
    gtmProceedToPayment(selection,cache) 
    // fbProceedToPayment(selection)
}
function gtmOrderConfirmation(products){
    let dataLayerObj = {
        'event': 'orderConfirmation',
        'ecommerce': { 
            'add': {
                products
            }
        }
    }
    window.dataLayer.push({ ecommerce: null })
    window.dataLayer.push(dataLayerObj)
}
function fbOrderConfirmation(selection,orderInfo){
    // console.log("fb order confirm",selection,orderInfo)
    let content_ids = orderInfo.items.map(item=>{
        let metaData = JSON.parse(item.comment)
        let {selectedJewelProductId} = metaData
        return `'${selectedJewelProductId}'`
    })
    let content_ids_string = content_ids.join(",")
    // console.log("product ids",content_ids_string)
    const dataToSendFb = {
        "action_source": "website",
        "event_source_url": window?.location?.href?window.location.href:null,
        "client_user_agent": window?.navigator?.userAgent?window.navigator.userAgent:null,
        "fn":orderInfo?.address?.firstName?orderInfo.address.firstName:"",
        "content_type": "product",
        "content_ids": `[${content_ids_string}]`,
        "zp":orderInfo?.address?.zipCode?orderInfo.address.zipCode:"",
        "country":orderInfo?.address?.country?orderInfo.address.country:"",
        "value":orderInfo?.totals.grandTotalPriceAsNumber?orderInfo?.totals.grandTotalPriceAsNumber:0,
        "currency":orderInfo.currency
    }
    // console.log("data to send",dataToSendFb)
    fetch(`${UNSAID_API}/api/events/purchase`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(dataToSendFb)
    })
}
export function onOrderConfirmation(products,selection,orderInfo){
    gtmOrderConfirmation(products)
    fbOrderConfirmation(selection,orderInfo)
}