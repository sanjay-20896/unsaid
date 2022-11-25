const {trimProducts} = require('./centraAttributeFiltering')
// var numbers = [{variant_order_in_catalog_value:"4"}, {product:"b"}, {variant_order_in_catalog_value:"1"}, {variant_order_in_catalog_value:"8"}, {product:"a",variant_order_in_catalog_value:"9"}];
// numbers = numbers.map((number)=>{
//     if(!number.variant_order_in_catalog_value)
//         number.variant_order_in_catalog_value = 99999
//     return number
// })
// let arr = numbers.sort(function(a, b) {
//   return parseInt(a["variant_order_in_catalog_value"]) - parseInt(b["variant_order_in_catalog_value"]);
// });
let products = [
  {
    name:"product 1",
    sku:"12345",
    testAttr:"2324",
    excerpt:"This is product 1",
    media:["test1","test2","test3"],
    relatedProducts:[
      {
        name:"product 2",
        sku:"234",
        testAttr:"2324",
        excerpt:"This is product 2",
        media:["test3","test4","test5"],
        relation:"variant"
      },
      {
        name:"product 3",
        sku:"234",
        testAttr:"2324",
        excerpt:"This is product 2",
        media:["test3","test4","test5"],
        relation:"variant"
      }
    ]
  },
  {
    name:"product 2",
    sku:"a1s2d3",
    testAttr:"trtr",
    excerpt:"This is product 2",
    media:["test1","test2","test3"],
    relatedProducts:[
      {
        name:"product 3",
        sku:"234",
        testAttr:"2324",
        excerpt:"This is product 2",
        media:["test3","test4","test5"],
        relation:"variant"
      },
      {
        name:"product 4",
        sku:"234",
        testAttr:"2324",
        excerpt:"This is product 2",
        media:["test3","test4","test5"],
        relation:"variant"
      }
    ]
  },
  {
    name:"product 3",
    sku:"343434",
    testAttr:"gdgdg",
    excerpt:"This is product 3",
    media:["test1","test2","test3"],
    relatedProducts:[
      {
        name:"product 5",
        sku:"234",
        testAttr:"2324",
        excerpt:"This is product 2",
        media:["test3","test4","test5"],
        relation:"variant"
      },
      {
        name:"product 6",
        sku:"234",
        testAttr:"2324",
        excerpt:"This is product 2",
        media:["test3","test4","test5"],
        relation:"variant"
      }
    ]
  }
]
products=trimProducts(products,["name","sku","excerpt"])
// console.log("products",products[0].relatedProducts)