module.exports={
    trimProductsFromArray:(products,location)=>{
         let data=null;
        if(location=="collection"){
            if(Array.isArray(products)){
                let productList=[]
                for(let i=0;i<products.length;i++){
                    data=module.exports.trimSingleProductForCollectionPage(products[i])
                    productList.push(data)
                }
                return productList;
            }
        }else if(location=="product"){
            data=module.exports.trimSingleProductForProductPage(products[i])
        }else{
            if(Array.isArray(products)){
                for(let i=0;i<products.length;i++){
                    data=module.exports.trimSingleProductForArticlePage(products[i])
                }
            }
        }
    },
    trimSingleProductProductSection:(product)=>{
        let obj={};
        let allowedCentraAttributes=["name","uri","sku","product","color","productSku","prices","variant_product_model_video_1_url","variant_product_model_video_2_url","variantName","product_type_value","number_of_diamonds_text","cord_color","customisation_possible","relation","media"]
        for(let i=0;i<allowedCentraAttributes.length;i++){
            if(product[allowedCentraAttributes[i]])
                obj[allowedCentraAttributes[i]]=product[allowedCentraAttributes[i]]
        }
        
        let media={"standard":product.media.standard,"blur":product.media.blur}
        obj.media=media
        let relatedProducts=[];
        let related=product.relatedProducts.filter((product)=>product.relation==="variant")
        for(let i=0; i<related.length; i++){
            let singleRelatedProduct=related[i];
            let newObj=module.exports.trimSingleProductForRelatedProducts(singleRelatedProduct,allowedCentraAttributes)
            relatedProducts.push(newObj);
        }
        obj.relatedProducts=relatedProducts;
        return obj
    },
    trimSingleProductForRelatedProducts:(singleProduct,allowedCentraAttributes)=>{
        let obj={};
        for(let i=0;i<allowedCentraAttributes.length;i++){
            if(singleProduct[allowedCentraAttributes[i]])
                obj[allowedCentraAttributes[i]] = singleProduct[allowedCentraAttributes[i]]
        }
        let media={"standard":singleProduct.media.standard,"blur":singleProduct.media.blur}
        obj.media=media
        return obj;
    },
    trimSingleProductForCollectionPage:(product)=>{
        let obj={};
        let allowedCentraAttributes=["name","uri","sku","product","color","productSku","prices","variant_product_model_video_1_url","variant_product_model_video_2_url","variantName","product_type_value","number_of_diamonds_text","cord_color","customisation_possible","materials_available","gemstones_available","product_gender","product_style","collectionName","categoryName","variant_order_in_catalog_value","product_personalised_order_value","variant_product_scaling_desktop_value"];
        for(let i=0;i<allowedCentraAttributes.length;i++){
            if(product[allowedCentraAttributes[i]])
                obj[allowedCentraAttributes[i]]=product[allowedCentraAttributes[i]]
        }
        let media={"standard":product.media.standard,"blur":product.media.blur}
        obj.media=media
        let relatedProducts=[];
        let related=product.relatedProducts.filter((product)=>product.relation==="variant")
        for(let i=0; i<related.length; i++){
            let singleRelatedProduct=related[i];
            let newObj=module.exports.trimSingleProductForRelatedProducts(singleRelatedProduct,allowedCentraAttributes)
            relatedProducts.push(newObj);
        }
        obj.relatedProducts=relatedProducts;
        return obj;
    },
    trimSingleProductForProductPage:(product) =>{
        let obj={};
        let allowedCentraAttributes=["product","name","uri","sku","productSku","excerpt","prices","categoryName","items","media","color","product_more_details_value","three_d_available","size_guide_code","three_d_available","three_d_src_code","variant_description_1_value","variant_description_2_value","variant_sub_description_1_value","variant_sub_description_2_value","gifting_enabled"];
        for(let i=0;i<allowedCentraAttributes.length;i++){
            if(product[allowedCentraAttributes[i]])
                obj[allowedCentraAttributes[i]]=product[allowedCentraAttributes[i]]
        }
        let relatedProducts=[];
        let bundleProduct=product.relatedProducts.filter((p)=>p.relation==="Bundle")
        // console.log("bundle product",bundleProduct)
        let related=product.relatedProducts.filter((product)=>product.relation==="variant")
        for(let i=0;i<related.length;i++){
            let singleRelatedProduct=related[i];
            let newObj=module.exports.trimSingleProductForRelatedProducts(singleRelatedProduct,allowedCentraAttributes)
            relatedProducts.push(newObj);
        }
        relatedProducts.push(bundleProduct[0]);
        obj.relatedProducts = relatedProducts
        return obj
    },
    trimProduct: (product,allowedAttributes,mediaTypes,addRelatedProducts,addBundleRelatedProducts)=>{
        let trimmedProduct={};
        for(let i=0;i<allowedAttributes.length;i++){
            if(product[allowedAttributes[i]])
                trimmedProduct[allowedAttributes[i]]=product[allowedAttributes[i]]
            if(allowedAttributes[i]=="media" && Array.isArray(mediaTypes)){
                let mediaObj = {}
                for(let k=0;k<mediaTypes.length;k++){
                    if(product["media"][mediaTypes[k]])
                        mediaObj[mediaTypes[k]] = product["media"][mediaTypes[k]]
                }
                trimmedProduct["media"] = mediaObj
            }
        }
        if(addRelatedProducts){
            let relatedProducts = []
            if(addBundleRelatedProducts){
                let bundleProduct=product.relatedProducts.find(p=>p.relation=="Bundle")
                if(bundleProduct)
                    relatedProducts.push(bundleProduct)
            }
            let variants = product.relatedProducts.filter(p=>p.relation=="variant")
            for(let i = 0;i<variants.length;i++){
                let newObj = module.exports.trimProduct(variants[i],allowedAttributes,mediaTypes,false,false)
                relatedProducts.push(newObj)
            }
            trimmedProduct.relatedProducts = relatedProducts
        }
        return trimmedProduct
    },
    trimProducts:(products,allowedAttributes,mediaTypes,addRelatedProducts,addBundleRelatedProducts)=>{
        return products.map(product=>{
            return module.exports.trimProduct(product,allowedAttributes,mediaTypes,addRelatedProducts,addBundleRelatedProducts)
        })
    },
    trimProductsForMenu: (products)=>{
        return module.exports.trimProducts(products,["name","uri","sku","prices","color","excerpt","media"],["thumb"],true,false)
    },
    trimProductsForCollection: (products)=>{
        return module.exports.trimProducts(products,["name","uri","sku","product","media","color","productSku","prices","variant_product_model_video_1_url","variant_product_model_video_2_url","variantName","product_type_value","number_of_diamonds_text","cord_color","customisation_possible","materials_available","gemstones_available","product_gender","product_style","collectionName","categoryName","variant_order_in_catalog_value","product_personalised_order_value","variant_product_scaling_desktop_value","variant_product_scaling_mobile_value","product_order_in_catalog_category_value","product_order_in_catalog_materials_value","product_order_in_catalog_gifts_value","product_order_in_catalog_gemstones_value","product_order_in_catalog_style","product_summer_edit_order_value"],["standard","medium"],true,false)
    },
    trimProductForHotspot: (product)=>{
        return module.exports.trimProduct(product,["name","uri","prices"],null,true,false)
    },
    trimProductForSingleProduct: (product)=>{
        return module.exports.trimProduct(product,["name","categoryName","uri","sku","product","color","media","productSku","prices","variant_product_model_video_1_url","variant_product_model_video_2_url","variantName","product_type_value","number_of_diamonds_text","cord_color","customisation_possible","relation"],["standard"],false,false)
    }
}