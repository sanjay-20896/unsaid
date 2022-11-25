import {TOKEN_VAR_NAME,HIDE_CATEGORY_ITEMS,MAX_PRODUCTS_IN_MENU} from './config'
import {UNSAID_API} from './branch-specific-config'
import Sanity from './sanity'
import {ECOMMERCE_URI} from "./branch-specific-config"
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {trimProductsForMenu} from './centraAttributeFiltering'
import {filterHeading_en,filterHeading_fr} from "./data/productListingData"
let numberMonthMapping = {
    "01":"January",
    "02":"February",
    "03":"March",
    "04":"April",
    "05":"May",
    "06":"June",
    "07":"July",
    "08":"August",
    "09":"September",
    "10":"October",
    "11":"November",
    "12":"December"
    
}
module.exports = {
    formatMoney:(number, decPlaces, decSep, thouSep) =>{
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
        thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
        var j = (j = i.length) > 3 ? j % 3 : 0;
     
        return sign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
     },
    randomBannerSelector:(items)=>{
        let n = Math.floor(Math.random()*items.length)
        //console.log("random number",n)
        let randomItem=items[n]
        return randomItem
    },
    getImageUrl:(imagePath,width)=>{
        if(!!width){
            return urlFor(imagePath).width(width).quality(100).format("webp").url()
        }else{
            return urlFor(imagePath).quality(100).format("webp").url()
        }
    },
    getImageUrlNew:(imagePath,width,quality,format)=>{
        if(width){
            return urlFor(imagePath).width(width).quality(quality?quality:100).format(format?format:"webp").url()
        }else{
            return urlFor(imagePath).quality(quality?quality:100).format(format?format:"webp").url()
        }
    },
    getDynamicMenuAndFooterInfo:async (locale)=>{
        try{
            const res = await fetch(`${UNSAID_API}/api/website/common-data/${locale}`,{
              method:'GET',
              headers:{
                'Content-Type': 'application/json'
              },
            })
            if(res.status==200){
              let data=await res.json()
              return {commonData:data}
            }
          }catch(err){
            // console.log("could not fetch common data")
            console.log(err)
          }
    },
    smoothScroll:{
        timer: null,
        stop: ()=> {
          clearTimeout(this.timer);
        },
        scrollTo: function(dist, duration, callback) {
          var settings = {
            duration,
            easing: {
              outQuint: function (x, t, b, c, d) {
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
              }
            }
          };
          var percentage;
          var startTime;
          //var node = document.getElementById(id);
          var nodeTop = dist;
        //   var nodeHeight = node.offsetHeight;
          var nodeHeight = 0;
          var body = document.body;
          var html = document.documentElement;
          var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight
          );
          var windowHeight = window.innerHeight
          var offset = window.pageYOffset;
          var delta = nodeTop - offset;
          var bottomScrollableY = height - windowHeight;
          var targetY = (bottomScrollableY < delta) ?
            bottomScrollableY - (height - nodeTop - nodeHeight + offset):
            delta;
          startTime = Date.now();
          percentage = 0;
          if (this.timer) {
            clearInterval(this.timer);
          }
          function step () {
            var yScroll;
            var elapsed = Date.now() - startTime;
            if (elapsed > settings.duration) {
              clearTimeout(this.timer);
            }
            percentage = elapsed / settings.duration;
            if (percentage > 1) {
              clearTimeout(this.timer);
              if (callback) {
                callback();
              }
            } else {
              yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
              window.scrollTo(0, yScroll);
              this.timer = setTimeout(step, 10);
            }
          }
          this.timer = setTimeout(step, 10);
        }
    },
    getProductImage(product,position,quality){
        let media = product?.media
        let urls = !!media && media[quality]?media[quality]:null
        let imageUrl = null
        if(urls){
            //https://unsaid.centraqa.com/client/dynamic/images/180_08377e0c23-u1rg1-18k-r_f1_unsaid-supernova-ring_.jpg
            imageUrl = urls.find(url=>{
                let parts = url.split("_")
                // console.log(parts)
                return parts[2] == position
            })
        }
        return imageUrl
    },
    getReadableDate: (date)=>{
        let dateStr = date.split(" ")[0]
        let dateArr = dateStr.split("-")
        let year = dateArr[0]?dateArr[0]:""
        let month = dateArr[1]?dateArr[1]:"" 
        let day = dateArr[2]?dateArr[2]:""
        let monthText = numberMonthMapping[month]
        return `${day} ${monthText} ${year}`
    },
    getObjectToPushToWishlist(cartItem){
        let date=new Date()
        let dd=String(date.getDate()).padStart(2,'0')
        let mm=String(date.getMonth() + 1).padStart(2,'0')
        let yyyy=date.getFullYear()
        date= mm + '/' + dd + '/' + yyyy;
        return {
            date,
            item:cartItem.item,
            bundle:cartItem.bundle,
            comment:cartItem.comment,
            bundleId:cartItem.product.product,
            line:cartItem.line
        }
    },
    getTokenFromLocalStorage: ()=>{
        let token = localStorage.getItem(TOKEN_VAR_NAME)
        token = token && token!="null"?token:""
        return token;
    },
    getNestedObject: (nestedObj, pathArr) => {
        return pathArr.reduce((obj, key) =>
            (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
    },
    removeDecimalZeros(price){
        let splitPrice = price.toString().split(".")
        if(splitPrice[1] && parseInt(splitPrice[1])==0)
            return splitPrice[0]
        return price
    },
    formatPrice(price){
        if(price){
            let i = price.indexOf(".")
            if(i>-1)
                return price.substring(0,price.indexOf("."))
            else
                return price
        } else {
            return ""
        }
    },
    getPriceBasedOnSelection:(product,selection)=>{
        try{
            if(selection){
                let pricelist = selection?.selection?.location?.pricelist
                if(pricelist){
                    return module.exports.formatPrice(product?.prices[pricelist]?.price)
                }
                else{
                    throw "no pricelist"
                }
                    
            } else {
                throw "no selection"
            }
        } catch(err) {
            return ""
        }
    },
    smoothScrollTo:(ref)=>{
        ref.current.scrollIntoView({
            behavior: "smooth",
        })
    },
    getPriceListCodeBasedOnSelection:(selection)=>{
    
        try{
            if(selection){
                let priceList=selection?.selection?.location?.priceList
                if(priceList)
                    return priceList
                else
                    throw "err"
            }else{
                throw "err"
            }
        }catch{
            return ""
        }
    },
    getProductsfromLowToHigh:(products,selection)=>{
        // console.log("selection",selection)
        let productList=products.sort((a,b)=>{
            let valA=!!a.prices? module.exports.getPriceAsNumberBasedOnSelection(a,selection):a.priceAsNumber;
            let valB=!!b.prices? module.exports.getPriceAsNumberBasedOnSelection(b,selection):b.priceAsNumber;
            // console.log("ValA",valA)
            // console.log("ValB",valB)
            return valA - valB 
        })

        return productList
    },
    getProductsFromHighToLow: (products,selection)=>{
        let productList=products.sort((a,b)=>{
            let valA=!!a.prices? module.exports.getPriceAsNumberBasedOnSelection(a,selection):a.priceAsNumber;
            let valB=!!b.prices? module.exports.getPriceAsNumberBasedOnSelection(b,selection):b.priceAsNumber;
            // console.log("ValA",valA)
            // console.log("ValB",valB)
            return valB - valA 
        })

        return productList
    },
    getProductBasedOnColor: (color,product)=>{
        let allProducts = [product]
        if(Array.isArray(product.relatedProducts)){
            allProducts = allProducts.concat(product.relatedProducts.filter(p=>p.relation=="variant"))
        }
        return allProducts.find(p=>p?.color?.color_text==color)
    },
    getProductBasedOnColorAndDiamonds: (color,numberOfDiamonds,product)=>{
        let allProducts = [product]
        if(Array.isArray(product.relatedProducts)){
            allProducts = allProducts.concat(product.relatedProducts.filter(p=>p.relation=="variant"))
        }
        return allProducts.find(p=>p?.color?.color_text==color && p.number_of_diamonds_text==numberOfDiamonds)
    },
    getColorOptions:(product)=>{
        let allProducts = [product]
        let colorOptions = []
        if(Array.isArray(product.relatedProducts)){
            allProducts = allProducts.concat(product.relatedProducts.filter(p=>p.relation=="variant"))
        }
        allProducts.forEach(p=>{
            if(p?.color?.color_text && !colorOptions.includes(p.color.color_text)){
                colorOptions.push(p.color.color_text)
            }
        })
        return colorOptions
    },
    getProductBasedOnColorAndCordColor:(color,cordColor,product)=>{
        // console.log('get product based on color and cord color',color,cordColor,product)
        let allProducts = [product]
        if(Array.isArray(product.relatedProducts)){
            allProducts = allProducts.concat(product.relatedProducts.filter(p=>p.relation=="variant"))
        }
        return allProducts.find(p=>p?.color?.color_text==color && p?.cord_color?.text==cordColor)
    },
    getPriceAsNumberBasedOnSelection:(product,selection)=>{
        try{
            if(selection){
                let priceList=module.exports.getNestedObject(selection,["selection","location","pricelist"])
                if(priceList)
                    return product.prices[priceList].priceAsNumber
                else
                    throw "err"
            }else{
                throw "err"
            }
        }catch{
            return ""
        }
    },
    getQueryVariable: (variable)=>{
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    },
    getProductIndexBasedOnItem: (item,productsArray)=>{
        let i = productsArray.findIndex(p=>{
            if(Array.isArray(p.items)){
                let i = p.items.findIndex(itm=>itm.item==item)
                if(i>-1)
                    return true
                else
                    return false
            } 
            return false
        })
        return i
    },
    getCuratedProducts:(productsList,location)=>{
        let orderByString = location=="menu"?"variant_order_in_explore_menu_value":"variant_order_in_catalog_value"
        productsList = productsList.map((p)=>{
            if(!p[orderByString])
                p[orderByString] = 9999999
            return p
        })
        
        let curatedProducts=productsList.sort((a,b)=>{
            let valA=parseInt(a[orderByString]);
            let valB=parseInt(b[orderByString])
            return valA - valB
        })
        
        return curatedProducts;  
    },
    getCuratedPersonalisedProducts:(productsList) =>{
        let curatedProducts=productsList.sort((a,b)=>{
            return parseInt(a["product_personalised_order_value"]) - parseInt(b["product_personalised_order_value"])
        })
        return curatedProducts;
    },
    getplpCuratedProducts:(productsList,attribute) =>{
        let curatedProducts;
        if(attribute==="product_order_in_catalog_category_value"){
            curatedProducts=productsList.sort((a,b)=>{
                return parseInt(a[attribute]) - parseInt(b[attribute])
            });
        }else if(attribute==="product_order_in_catalog_materials_value"){
            curatedProducts=productsList.sort((a,b)=>{
                return parseInt(a[attribute]) - parseInt(b[attribute]);
            })
        }else if(attribute==="product_order_in_catalog_gifts_value"){
            curatedProducts=productsList.sort((a,b)=>{
                return parseInt(a[attribute]) - parseInt(b[attribute]);
            })
        }else if(attribute==="product_order_in_catalog_gemstones_value"){
            curatedProducts=productsList.sort((a,b)=>{
                return parseInt(a[attribute]) - parseInt(b[attribute]);
            })
        }else if(attribute==="product_order_in_catalog_style_value"){
            curatedProducts=productsList.sort((a,b)=>{
                return parseInt(a[attribute]) - parseInt(b[attribute]);
            })
        }else if(attribute==="product_personalised_order_value"){
            curatedProducts=module.exports.getCuratedPersonalisedProducts(productsList);
        }else{
            curatedProducts=module.exports.getCuratedProducts(productsList)
        }
        return curatedProducts
    },
    getCuratedCollectionProducts:(productsList)=>{
        let curatedProducts=productsList.sort((a,b)=>{
            return a["product_order_in_catalog_value"]-b["product_order_in_catalog_value"]
        })
        let collectionNames=[]
        let sortedProducts=[]
        for(let i=0;i<curatedProducts.length;i++) {
            if(!collectionNames.includes(curatedProducts[i].collectionName)){
                collectionNames.push(curatedProducts[i].collectionName)
            }
        }
        for(let i=0;i<collectionNames.length;i++) {
            sortedProducts.push({name:collectionNames[i],
            products:Array.isArray(curatedProducts) && curatedProducts.filter((product)=>{
                return product.collectionName==collectionNames[i]
            })})
        }
        return sortedProducts
        // console.log(collectionNames);
    },
    getCuratedCategoryProducts:(productsList)=>{
        let curatedProducts=productsList.sort((a,b)=>{
            return a["product_order_in_catalog_value"]-b["product_order_in_catalog_value"]
        })
        let categoryNames=[]
        let sortedProducts=[]
        for(let i=0;i<curatedProducts.length;i++){
            if(Array.isArray(curatedProducts[i].categoryName) && !categoryNames.includes(curatedProducts[i].categoryName[0])){
                categoryNames.push(curatedProducts[i].categoryName[0])
            }
        }

        for(let i=0;i<categoryNames.length;i++){
            sortedProducts.push({name:categoryNames[i],
            products:Array.isArray(curatedProducts) && curatedProducts.filter((product)=>{
                return Array.isArray(product.categoryName) && product.categoryName[0]==categoryNames[i]
            })})
        }
        return sortedProducts
    },
    // getCategoryBasedProductsNew:(productList)=>{
    //     let categories=[]
    //     let sortedProducts=[]
    //     console.log("input products",productList)
    //     for(let i=0;i<productList.length;i++){
    //         if(!categories.includes(productList[i]["category"])){
    //             categories.push(productList[i]["category"])
    //         }
    //     }
    //     console.log(categories)
    // },
    getCollectionBasedProducts:(productsList)=>{
            let  sortedProducts=[]
            let collectionNames=[]
            for(let i=0;i<productsList.length;i++) {
                if(!collectionNames.includes(productsList[i].collectionName)){
                    collectionNames.push(productsList[i].collectionName)
                }
            }
            for(let i=0;i<collectionNames.length;i++) {
                sortedProducts.push({name:collectionNames[i],
                type:"collections",
                products:Array.isArray(productsList) && productsList.filter((product)=>{
                    return product.collectionName==collectionNames[i]
                })})
            }
            return sortedProducts
    },
    getCategoryBasedProducts:(productsList)=>{
            let sortedProducts=[]
            let categoryNames=[]
            for(let i=0;i<productsList.length;i++){
                if(Array.isArray(productsList[i].categoryName) && !categoryNames.includes(productsList[i].categoryName[0])){
                    categoryNames.push(productsList[i].categoryName[0])
                }
            }
            for(let i=0;i<categoryNames.length;i++){
                sortedProducts.push({name:categoryNames[i],
                type:"categories",
                products:Array.isArray(productsList) && productsList.filter((product)=>{
                    return Array.isArray(product.categoryName) && product.categoryName[0]==categoryNames[i]
                })})
            }
            return sortedProducts
    },
    getFilterData:(filter,locale)=>{
        let collectionHeading="";
        let categoryHeading="";
        let materialHeading="";
        let gemstoneHeading="";
        let styleHeading="";
        let genderHeading="";
        if(locale=="fr"){
            categoryHeading=filterHeading_fr.find((head)=>head.key=="categories").value;
            collectionHeading=filterHeading_fr.find((head)=>head.key=="collection").value;
            materialHeading=filterHeading_fr.find((head)=>head.key=="materials").value;
            gemstoneHeading=filterHeading_fr.find((head)=>head.key=="gemstones").value;
            styleHeading=filterHeading_fr.find((head)=>head.key=="style").value;
            genderHeading=filterHeading_fr.find((head)=>head.key=="gifts").value
        }else{
            categoryHeading=filterHeading_en.find((head)=>head.key=="categories").value;
            collectionHeading=filterHeading_en.find((head)=>head.key=="collection").value;
            materialHeading=filterHeading_en.find((head)=>head.key=="materials").value;
            gemstoneHeading=filterHeading_en.find((head)=>head.key=="gemstones").value;
            styleHeading=filterHeading_en.find((head)=>head.key=="style").value;
            genderHeading=filterHeading_en.find((head)=>head.key=="gifts").value
        }
        // console.log(filter)
        let collectionData=filter?.find(item=> item.field=="collections")?.values
        let categoryData=filter?.find(item=> item.field=="categories")?.values
        categoryData=!! categoryData && categoryData.filter((category)=>{
            return category?.data?.category!=="9" && category?.data?.category!=="10" && category?.data?.category!=="1" && category?.data?.category!=="14" && category?.data?.category!=="15" && category?.data?.category!=="16" && category?.data?.category!=="25" && category?.data?.category!=="7" && category?.data?.category!=="31"
        })
        // console.log("filter category data",filteredCategory)
        let materialData=filter?.find(item=>item.field=="materials_available")?.values
        let gemstoneData=filter?.find(item=>item.field=="gemstones_available")?.values
        // console.log(gemstoneData)[]
        let styleData=filter?.find(item=>item.field=="product_style")?.values
        let genderData=filter?.find(item=>item.field=="product_gender")?.values
        return [
            {
                filterType:"categories",
                heading:categoryHeading,
                filterItems:categoryData?categoryData.map(filterItem=>{
                    return {count:filterItem.count, subHeading:filterItem.data.name[0],uri:filterItem.data.uri,id:parseInt(filterItem.data.category),query:"category"}
                }):[]
            },
            {
                filterType:"collection",
                heading:collectionHeading,
                filterItems:collectionData?collectionData.map(filterItem=>{
                    let priority=10;
                    if(filterItem?.data?.name==="Meta"){
                        priority=1
                    }else if(filterItem?.data?.name==="Supernova"){
                        priority=2
                    }else if(filterItem?.data?.name==="Crimson"){
                        priority=3
                    }else if(filterItem?.data?.name==="Whirlwind"){
                        priority=4
                    }else if(filterItem?.data?.name==="Infinite"){
                        priority=5
                    }else{
                        priority=6
                    }
                    return {count:filterItem.count,subHeading:filterItem.data.name,uri:filterItem.data.uri,id:parseInt(filterItem.data.collection),query:"collection",priority:priority}
                }).sort((a,b)=> {return a["priority"]-b["priority"]}):[]
            },
            {
                filterType:"materials",
                heading:materialHeading,
                filterItems:materialData?materialData.map(filterItem=>{
                    let priority=10
                    if(filterItem?.data==="Rose gold" || filterItem?.data==="Or rose"){
                        priority=1
                    }else if(filterItem?.data==="White gold" || filterItem?.data==="Or blanc"){
                        priority=2
                    }else if(filterItem?.data==="Yellow gold" || filterItem?.data==="Or jaune"){
                        priority=3
                    }else if(filterItem?.data==="Enamel" || filterItem?.data==="Email"){
                        priority=5
                    }else{
                        priority=6
                    }
                    return {count:filterItem.count,subHeading:filterItem.data,uri:filterItem.value,query:"material",priority}
                }).sort((a,b)=> {return a["priority"]-b["priority"]}):[]
            },
            {   
                filterType:"gemstones",
                heading:gemstoneHeading,
                filterItems:gemstoneData?gemstoneData.map(filterItem=>{
                    let priority=100
                    if(filterItem?.data==="Diamond" || filterItem?.data==="Diamant"){
                        priority=1
                    }else if(filterItem?.data==="Ruby" || filterItem?.data==="Rubis"){
                        priority=2
                    }else if(filterItem?.data=="Black Spinel" || filterItem?.data==="Noir spinel"){
                        priority=3
                    }else if(filterItem?.data=="Amethyst" || filterItem?.data==="Amethyst"){
                        priority=4
                    }else if(filterItem?.data=="Pearl" || filterItem?.data=="Perle"){
                        priority=5
                    }else if(filterItem?.data=="Malachite" || filterItem?.data=="Malachite"){
                        priority=6
                    }else{
                        priority=7
                    }
                    return {count:filterItem.count,subHeading:filterItem.data,uri:filterItem.value,query:"gemstones",priority}
                }).sort((a,b)=> {return a["priority"]-b["priority"]}):[]
            },
            {   
                filterType:"style",
                heading:styleHeading,
                filterItems:styleData?styleData.map(filterItem=>{
                    let priority=10
                    if(filterItem.data==="Bridal" || filterItem.data=="Fiançailles/mariage"){
                        priority=1
                    }else if(filterItem.data==="Statement" || filterItem.data=="Grand Modèle"){
                        priority=2
                    }else if(filterItem.data==="Minimalist" || filterItem.data=="Minimaliste"){
                        priority=3
                    }else if(filterItem.data==="Everyday" || filterItem.data=="Pour tous les jours"){
                        priority=4
                    }else if(filterItem.data==="Versatile" || filterItem.data=="Versatile"){
                        priority=5
                    }else if(filterItem.data==="Valentines"){
                        priority=6
                    }else{
                        priority=7
                    }
                    return {count:filterItem.count,subHeading:filterItem.data,uri:filterItem.value,query:"style",priority}
                }).sort((a,b)=> {return a["priority"]-b["priority"]}):[]
            },
            {
                filterType:"gifts",
                heading:genderHeading,
                filterItems:genderData?genderData.map(filterItem=>{
                    let priority=10;
                    if(filterItem.value==="For her" ||  filterItem.value=="Pour elle"){
                        priority=1
                    }else if(filterItem.value==="For him" ||  filterItem.value=="Pour lui"){
                        priority=2
                    }else if(filterItem.value==="Unisex" || filterItem.value=="Unisexe"){
                        priority=3
                    }else{
                        priority=4
                    }
                    return {count:filterItem.count,uri:filterItem.value,query:"gender",subHeading:filterItem.data,priority}
                }).sort((a,b)=> {return a["priority"]-b["priority"]}):[]
            }
        ]
        
    },
    getLikedProducts: async (token)=>{
        // let likes=null;
        // try{
            // fetch(`${UNSAID_API}/api/likes`,{
            //     method:'POST',
            //     headers:{
            //         'Content-type':'application/json',
            //     },
            //     body:JSON.stringify({
            //         "token":token
            //     })
            // }).then(response=>response.json())
            // .then(data=>{
            //     console.log(data)
            //     // getLikes(data.likedProducts)
            //     return data.likedProducts
            //     // return data.likedProducts;
            // }).catch(err=>{
            //     console.log(err)
            //     return err
            // })
            return fetch(`${UNSAID_API}/api/likes`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json', 
                },
                body:JSON.stringify({
                    "token":token
                })
            })
        // }catch(err){
        //     console.log(err)
        // }
       
    }
}



// {subHeading:"Diamond Selection",query:"diamondSelectionAvailiable"},{subHeading:"Engraving",query:'engravingPossible'},