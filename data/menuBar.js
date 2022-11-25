const currencySymbols = {
    "USD":"$",
    "EUR":"€",
    "GBP":"£"
}
const stores = [
    {
        id:1,
        storeName:"Unsaid store",
        address1:"De Burburestraat 20",
        address2: "2000 Antwerp,",
        address3:"Belgium",
        phone:"+32 484 92 92 95",
        phoneNumber:"32484929295",
        email:"hello@unsaid.com",
        timings:"Closes 5 PM",
        storeImg:"/images/menu-images/our-store-desktop.jpg",
        mobileStoreImg:"/images/menu-images/our-store-mobile.jpg",
        link:'/our-store'
    }
]
const stores2 = [
    {
        id:1,
        storeName:"Antwerp Store",
        address1:"De Burburestraat 20",
        address2:"2000 Antwerpen,",
        address3:"Belgium",
        phone:"+32 484 92 92 95",
        phoneNumber:"32484929295",
        email:"hello@unsaid.com",
        timings:"Closes 8 PM",
        // storeImg:"/images/menu-images/our-store-desktop.jpg",
        storeImg:"/images/store-image-antwerp.jpg",
        mobileStoreImg:"/images/menu-images/our-store-mobile.jpg",
        link:'/our-store',
    },
]


const stores3 =[
    {
        id:1,
        storeName:"Le Printemps Paris",
        address1:"64 Bd Haussmann",
        address2:"75009 Paris",
        address3:"France",
        phone:"+33 6 95 11 99 76",
        phoneNumber:"33695119976",
        email:"printemps@unsaid.com",
        timings:"Closes 5 PM",
        storeImg:"/images/Paris-store.png",
        mobileStoreImg:"/images/Paris-store-mobile.png",
        link:'/our-store',
    }
]

 const stores4=[
     {
         id:1,
         storeName:"Le Bon Marché Paris",
         address1:"24 Rue de Sèvres",
         address2:"75007 Paris",
         address3:"France",
         phone:"+33 1 44 39 80 00",
         phoneNumber:"33144398000",
         email:"hello@unsaidlibrary.com",
         timings:"Closes 5 PM",
         storeImg:"/images/Le-Bon-store.png",
         mobileStoreImg:"/images/le-bon-mobile.png",
         link:'/our-store',
     }
 ]
 const storeTimings = [
    {
        dayId:1,
        day:"Monday",
        open:"10 AM",
        close:"5 PM"
    },
    {
        dayId:2,
        day:"Tuesday",
        open:"10 AM",
        close:"5 PM",
    },
    {
        dayId:3,
        day:"Wednesday",
        open:"10 AM",
        close:"5 PM",
    },
    {
        dayId:4,
        day:"Thursday",
        open:"10 AM",
        close:"5 PM",
    },
    {
        dayId:5,
        day:"Friday",
        open:"10 AM",
        close:"5 PM",
    },
    {
        dayId:6,
        day:"Saturday",
        closed:true,
    },
    {
        dayId:0,
        day:"Sunday",
        closed:true
    }
]
const storeTimings1 = [
    {
        dayId:1,
        day:"Monday",
        closed:true,
    },
    {
        dayId:2,
        day:"Tuesday",
        closed:true,
    },
    {
        dayId:3,
        day:"Wednesday",
        closed:true,
    },
    {
        dayId:4,
        day:"Thursday",
        closed:true,
    },
    {
        dayId:5,
        day:"Friday",
        closed:true,
    },
    {
        dayId:6,
        day:"Saturday",
        closed:true,
    },
    {
        dayId:0,
        day:"Sunday",
        closed:true
    }
]
const storeTimings2 = [
    {
        dayId:1,
        day:"Monday",
        open:"10 AM",
        close:"8 PM"
    },
    {
        dayId:2,
        day:"Tuesday",
        open:"10 AM",
        close:"8 PM",
    },
    {
        dayId:3,
        day:"Wednesday",
        open:"10 AM",
        close:"8 PM",
    },
    {
        dayId:4,
        day:"Thursday",
        open:"10 AM",
        close:"8 PM",
    },
    {
        dayId:5,
        day:"Friday",
        open:"10 AM",
        close:"8 PM",
    },
    {
        dayId:6,
        day:"Saturday",
        open:"10 AM",
        close:"8 PM",
    },
    {
        dayId:0,
        day:"Sunday",
        open:"11 AM",
        close:"8 PM",
    }
]
const curated_en ={
        heading:"Most Searched",
        results:[
            {result:"Contact us"},
            {result:"Lab Grown Diamond"},
            {result:"Rings"},
            
        ]
    }
const curated_fr ={
        heading:"Les plus recherchés",
        results:[
            {result:"Nous contacter"},
            {result:"Diamants cultivés en laboratoire"},
            {result:"Bagues"},
            
        ]
    }
const suggested = {
        heading:"Suggested searches",
        results:[
            {result:"Cluster designs"},
            {result:"Nest Diamond Cluster"},
            {result:"Meet the designer behind Clustered ..."},
            {result:"Top 5 cluster products"},
        ]
    }



let productDetail={
        productName:"Nest Diamond Cluster Ring",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price:"€3,400",
        img:"/images/product-2b.png",
        linksTo:"#",
        giftImg:"/images/searchResultLink.png",
        giftHeading:"Nest Diamond Cluster Earring"
    }

let products=[]
for (let i = 0; i < 32; i++) {
    products.push(productDetail)
}


const clusterResults = {
    products,
    reads:[
        {
            readHeading:"Menu item",
            readContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus pretium vitae non.",
            giftImg:"/images/searchResultLink.png",
            giftHeading:"Nest Diamond Cluster Earring",
            linksTo:"#",
        },
        {
            readHeading:"Menu item",
            readContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus pretium vitae non.",
            giftImg:"/images/searchResultLink.png",
            giftHeading:"Nest Diamond Cluster Earring",
            linksTo:"#",
        },
        {
            readHeading:"Menu item",
            readContent:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus pretium vitae non.",
            giftImg:"/images/searchResultLink.png",
            giftHeading:"Nest Diamond Cluster Earring",
            linksTo:"#",
        }
    ]
}

const orders=[
    {
        orderNumber:"Order #0094",
        placed:"March 3, 2021",
        delivered:"Shipped on March 4, 2021",
        details:{
            giftBoxImage:"/images/giftBoxImage.png",
            giftBoxDetail:"Daniel Baretto",
            giftCardImage:"/images/giftCardImage.png",
            giftCardDetail1:"[Detail]",
            giftCardDetail2:"Kelly Anna",
            productImage:"/images/product-1b.jpg",
            productDetail1:"Size 48, Yellow gold",
            productDetail2:"“Engraving text”",
            productPrice:"€3,500",
            deliveryName:"[Name]",
            deliveryAddress1:"[Address line 1]",
            deliveryAddress2:"[Address line 2]",
            deliveryAddress3:"[Address line 3]",
            deliveryCountry:"[Country]",
            deliveryTelephone:"[Telephone]",
            billingAdd1:"Billing Address line 1",
            billingAdd2:"Billing Address line 1",
            billingAdd3:"Billing Address line 1",
            billingCountry:"Billing Country",
            emailAddress:"[email address]",
        }
    },
    {
        orderNumber:"Order #0094",
        placed:"March 3, 2021",
        delivered:"Shipped on March 4, 2021",
        details:{
            giftBoxImage:"/images/giftBoxImage.png",
            giftBoxDetail:"Daniel Baretto",
            giftCardImage:"/images/giftCardImage.png",
            giftCardDetail1:"[Detail]",
            giftCardDetail2:"Kelly Anna",
            productImage:"/images/product-1b.jpg",
            productDetail1:"Size 48, Yellow gold",
            productDetail2:"“Engraving text”",
            productPrice:"€3,500",
            deliveryName:"[Name]",
            deliveryAddress1:"[Address line 1]",
            deliveryAddress2:"[Address line 2]",
            deliveryAddress3:"[Address line 3]",
            deliveryCountry:"[Country]",
            deliveryTelephone:"[Telephone]",
            billingAdd1:"Billing Address line 1",
            billingAdd2:"Billing Address line 1",
            billingAdd3:"Billing Address line 1",
            billingCountry:"Billing Country",
            emailAddress:"[email address]",
        }
    },
    {
        orderNumber:"Order #0094",
        placed:"March 3, 2021",
        delivered:"Shipped on March 4, 2021",
        details:{
            giftBoxImage:"/images/giftBoxImage.png",
            giftBoxDetail:"Daniel Baretto",
            giftCardImage:"/images/giftCardImage.png",
            giftCardDetail1:"[Detail]",
            giftCardDetail2:"Kelly Anna",
            productImage:"/images/product-1b.jpg",
            productDetail1:"Size 48, Yellow gold",
            productDetail2:"“Engraving text”",
            productPrice:"€3,500",
            deliveryName:"[Name]",
            deliveryAddress1:"[Address line 1]",
            deliveryAddress2:"[Address line 2]",
            deliveryAddress3:"[Address line 3]",
            deliveryCountry:"[Country]",
            deliveryTelephone:"[Telephone]",
            billingAdd1:"Billing Address line 1",
            billingAdd2:"Billing Address line 1",
            billingAdd3:"Billing Address line 1",
            billingCountry:"Billing Country",
            emailAddress:"[email address]",
        }
    },
    {
        orderNumber:"Order #0094",
        placed:"March 3, 2021",
        delivered:"Shipped on March 4, 2021",
        details:{
            giftBoxImage:"/images/giftBoxImage.png",
            giftBoxDetail:"Daniel Baretto",
            giftCardImage:"/images/giftCardImage.png",
            giftCardDetail1:"[Detail]",
            giftCardDetail2:"Kelly Anna",
            productImage:"/images/product-1b.jpg",
            productDetail1:"Size 48, Yellow gold",
            productDetail2:"“Engraving text”",
            productPrice:"€3,500",
            deliveryName:"[Name]",
            deliveryAddress1:"[Address line 1]",
            deliveryAddress2:"[Address line 2]",
            deliveryAddress3:"[Address line 3]",
            deliveryCountry:"[Country]",
            deliveryTelephone:"[Telephone]",
            billingAdd1:"Billing Address line 1",
            billingAdd2:"Billing Address line 1",
            billingAdd3:"Billing Address line 1",
            billingCountry:"Billing Country",
            emailAddress:"[email address]",
        }
    },
    {
        orderNumber:"Order #0094",
        placed:"March 3, 2021",
        delivered:"Shipped on March 4, 2021",
        details:{
            giftBoxImage:"/images/giftBoxImage.png",
            giftBoxDetail:"Daniel Baretto",
            giftCardImage:"/images/giftCardImage.png",
            giftCardDetail1:"[Detail]",
            giftCardDetail2:"Kelly Anna",
            productImage:"/images/product-1b.jpg",
            productDetail1:"Size 48, Yellow gold",
            productDetail2:"“Engraving text”",
            productPrice:"€3,500",
            deliveryName:"[Name]",
            deliveryAddress1:"[Address line 1]",
            deliveryAddress2:"[Address line 2]",
            deliveryAddress3:"[Address line 3]",
            deliveryCountry:"[Country]",
            deliveryTelephone:"[Telephone]",
            billingAdd1:"Billing Address line 1",
            billingAdd2:"Billing Address line 1",
            billingAdd3:"Billing Address line 1",
            billingCountry:"Billing Country",
            emailAddress:"[email address]",
        }
    },
    {
        orderNumber:"Order #0094",
        placed:"March 3, 2021",
        delivered:"Shipped on March 4, 2021",
        details:{
            giftBoxImage:"/images/giftBoxImage.png",
            giftBoxDetail:"Daniel Baretto",
            giftCardImage:"/images/giftCardImage.png",
            giftCardDetail1:"[Detail]",
            giftCardDetail2:"Kelly Anna",
            productImage:"/images/product-1b.jpg",
            productDetail1:"Size 48, Yellow gold",
            productDetail2:"“Engraving text”",
            productPrice:"€3,500",
            deliveryName:"[Name]",
            deliveryAddress1:"[Address line 1]",
            deliveryAddress2:"[Address line 2]",
            deliveryAddress3:"[Address line 3]",
            deliveryCountry:"[Country]",
            deliveryTelephone:"[Telephone]",
            billingAdd1:"Billing Address line 1",
            billingAdd2:"Billing Address line 1",
            billingAdd3:"Billing Address line 1",
            billingCountry:"Billing Country",
            emailAddress:"[email address]",
        }
    }
]


const cartProducts=[
    {
        giftBoxImage:"/images/giftBoxImage.png",
        giftBoxDetail:"Daniel Baretto",
        // giftCardImage:"/images/giftCardImage.png",
        giftCardImage:"/images/giftBoxImage.png",
        giftCardDetail1:"Kelly Anna",
        giftCardDetail2:"[Detail]",
        products:[
            {
                productName:"[Name]",
                productImage:"/images/product-1b.jpg",
                productDetail1:"[Detail]",
                productDetail2:"[Detail]",
                productPrice:3500,
            },
            {
                productName:"[Name]",
                productImage:"/images/product-1b.jpg",
                productDetail1:"[Detail]",
                productDetail2:"[Detail]",
                productPrice:3500,
            },
            
        ],
        
    },
    {
        giftBoxImage:"/images/giftBoxImage.png",
        giftBoxDetail:"Daniel Baretto",
        // giftCardImage:"/images/giftCardImage.png",
        giftCardImage:"/images/giftBoxImage.png",
        giftCardDetail1:"Kelly Anna",
        giftCardDetail2:"[Detail]",
        products:[
            {
                productName:"[Name]",
                productImage:"/images/product-1b.jpg",
                productDetail1:"[Detail]",
                productDetail2:"[Detail]",
                productPrice:3500,
            },
        ],
        
    },
]

module.exports={
    curated_en,
    curated_fr,
    suggested,
    clusterResults,
    orders,
    cartProducts,
    stores,
    currencySymbols,
    stores2,
    storeTimings1,
    storeTimings2,
    stores4,
    stores3,
    storeTimings
}