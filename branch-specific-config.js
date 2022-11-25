module.exports = {
    plpPaths:[
        {
            filterType:"categories",
            filterValues:[
                {uri:"rings",id:2,name:'Rings'},
                {uri:"bracelets",id:3,name:'Bracelets'},
                {uri:"necklaces",id:11,name:'Necklaces'},
                {uri:'earrings',id:4,name:'Earrings'},
                {uri:'pendants',id:5,name:'Pendants'},
                {uri:"charms",id:14,name:'Charms'},
                {uri:"personalised-gifts",id:15,name:'Personalised gifts'},
                {uri:"summer-edit",id:25,name:'Summer Edit'},
                {uri:"head-chain",id:29,name:'Head Chain'},
                {uri:"nose-chain",id:30,name:'Nose Chain'},
            ],
        },
        {
            filterType:"collection",
            filterValues:[
                {uri:'nest-collection',centraUri:"nest",id:1,name:'Nest'},
                {uri:'crimson-collection',centraUri:"crimson",id:3,name:'Crimson'},
                {uri:'infinite-collection',centraUri:"infinite",id:4,name:'Infinite'},
                {uri:'supernova-collection',centraUri:"supernova",id:5,name:'Supernova'},
                {uri:'whirlwind-collection',centraUri:"whirlwind",id:13,name:'Whirlwind'},
                {uri:'meta-collection',centraUri:"meta",id:18,name:"Meta"},
                {uri:"tear-collection",centraUri:"tear",id:30,name:"Tear"},
                {uri:"phoenix-collection",centraUri:"phoenix",id:29,name:'Phoenix'},
                {uri:"bubble-collection",centraUri:"bubble",id:28,name:'Bubble'},
            ],
        },
        {
            filterType:"materials",
            filterValues:[
                {uri:'rose-gold',name:'Rose gold',id:1},
                {uri:'white-gold',name:'White gold',id:2},
                {uri:'yellow-gold',name:'Yellow gold',id:3},
                {uri:'silver',name:'Silver',id:4},
                {uri:'enamel',name:'Enamel',id:5},
                {uri:"two-tone-wy",name:"Two Tone WY",id:6}
            ]
        },
        {
            filterType:"gemstones",
            filterValues:[
                {uri:'diamond',id:1,name:'Diamond'},
                {uri:'yellow-diamond',id:2,name:'Yellow diamond'},
                {uri:'green-diamond',id:3,name:'Green diamond'},
                {uri:'pink-diamond',id:4,name:'Pink diamond'},
                {uri:'ruby',id:5,name:'Ruby'},
                {uri:"amethyst",id:6,name:'Amethyst'},
                {uri:'black-spinel',id:7,name:'Black spinel'},
                {uri:'malachite',id:8,name:'Malachite'},
                {uri:"pearl",id:9,name:'Pearl'}
            ],
        },
        {
            filterType:"style",
            filterValues:[
                {uri:'everyday',name:'Everyday',id:1},
                {uri:"bridal",name:'Bridal',id:2},
                {uri:"minimalist",name:'Minimalist',id:3},
                {uri:'statement',name:'Statement',id:4},
                {uri:'versatile',name:'Versatile',id:5},
                {uri:'christmas',name:'Christmas',id:6},
                {uri:'valentines',name:'Valentines',id:7},
                {uri:"mothers-day",name:"Mother's Day",id:8}
            ],
        },
        {
            filterType:'gifts',
            filterValues:[
                {uri:'for-her',name:'For her',id:1},
                {uri:'for-him',name:'For him',id:2},
                {uri:'unisex',name:'Unisex',id:3},
                
            ]
        },
    ],
    menuItems:[
        {
            id:1,
            label:"Home",
            tier2action:"default",
            tier3action:"default",
            group:"Find",
            hideInMobile:true
        },
        {   
            id:2,
            label:"Our store",
            tier2action:"stores",
            group:"Find",
            showCaret:true
        },
        {
            id:3,
            label:"Products",
            tier2action:"listItems",
            showCaret:true,
            listItems:[
                {
                    id:2,
                    label:"Rings",
                    uri:"rings",
                    heading:"See all Rings",
                    headingLinksTo:"/categories/rings",
                    seeAllLinksTo:"/categories/rings",
                    desc:"Subtle details, sculptural shapes and stackable styles. Explore our collection of rings.",
                    mainImg:"/images/productRings.jpg",
                    showCaret:true,
                    categoryId:2,
                    fetch:"products_by_category",
                },
                {
                    id:3,
                    label:"Necklaces",
                    uri:"necklaces",
                    heading:"See all Necklaces",
                    headingLinksTo:"/categories/necklaces",
                    seeAllLinksTo:"/categories/necklaces",
                    desc:'Explore minimal pendants, chain necklaces and vibrant styles designed to stand out.',
                    mainImg:"/images/menu-images/necklace.jpg",
                    showCaret:true,
                    categoryId:11,
                    fetch:"products_by_category",
                },
                {
                    id:4,
                    label:"Earrings",
                    uri:"earrings",
                    heading:"See all Earrings",
                    headingLinksTo:"/categories/earrings",
                    seeAllLinksTo:"/categories/earrings",
                    desc:"Bold shapes balanced with effortlessly stylish silhouettes. Explore our collection of earrings.",
                    mainImg:"/images/productsEarings.jpg",
                    showCaret:true,
                    categoryId:4,
                    fetch:"products_by_category"
                },
                {
                    id:5,
                    label:"Bracelets",
                    uri:"bracelets",
                    heading:"See all Bracelets",
                    headingLinksTo:"/categories/bracelets",
                    seeAllLinksTo:"/categories/bracelets",
                    desc:"Clean lines and lab grown diamond bangles. Explore our eclectic bracelets.",
                    mainImg:"/images/productsBracelet.jpg",
                    showCaret:true,
                    categoryId:3,
                    fetch:"products_by_category"
                },
                // {
                //     id:6,
                //     label:"Charms",
                //     uri:"charms",
                //     heading:"See all Charms",
                //     headingLinksTo:"/categories/charms",
                //     seeAllLinksTo:"/categories/charms",
                //     desc:"A symbol of everlasting connection. Explore a selection of timeless and playful charms.",
                //     mainImg:"/images/productsBracelet.jpg",
                //     showCaret:true,
                //     categoryId:14,
                //     fetch:"products_by_category"
                // },
                {
                    id:1,
                    label:'All products',
                    uri:"shop",
                    heading:'See all Products',
                    headingLinksTo:"/products",
                    seeAllLinksTo:"/products",
                    desc:"From modern to timeless lab grown diamond jewellery, explore all  products.",
                    mainImg:"/images/menu-images/all-products.jpg",
                    showCaret:true,
                    categoryId:1,
                    fetch:"products_by_category",
                    hideCountNumber:true,
                },
            ],
            group:"Shop"
        },
        {
            id:4,
            label:"Collections",
            tier2action:"listItems",
            showCaret:true,
            listItems:[
                {
                    id:222,
                    label:"Meta",
                    uri:"meta",
                    collectionId:18,
                    heading:"See all in Meta",
                    headingLinksTo:"/collections/meta-collection",
                    seeAllLinksTo:"/collections/meta-collection",
                    desc:"The shape of change.",
                    mainImg:'/images/menu-images/meta-collections.jpg',
                    showCaret:true,
                    fetch:"products_by_collection"
                },  
                {
                    id:132,
                    label:"Whirlwind",
                    uri:"whirlwind",
                    collectionId:13,
                    heading:"See all in Whirlwind",
                    headingLinksTo:"/collections/whirlwind-collection",
                    seeAllLinksTo:"/collections/whirlwind-collection",
                    desc:"Moments of beautiful chaos.",
                    mainImg:"/images/collectionWhirlwind.jpg",
                    showCaret:true,
                    fetch:"products_by_collection"
                },
                {
                    id:3,
                    label:"Supernova",
                    uri:"supernova",
                    collectionId:5,
                    heading:"See all in Supernova",
                    headingLinksTo:"/collections/supernova-collection",
                    seeAllLinksTo:"/collections/supernova-collection",
                    desc:"Life's transformative experiences.",
                    mainImg:"/images/menu-images/supernova-collection.jpg",
                    showCaret:true,
                    fetch:"products_by_collection"
                },   
                // {
                //     id:2,
                //     label:"Nest",
                //     uri:"nest",
                //     collectionId:1,
                //     heading:"See all in Nest",
                //     headingLinksTo:"/collections/nest-collection",
                //     seeAllLinksTo:"/collections/nest-collection",
                //     desc:"The safe spaces we call home.",
                //     mainImg:"/images/collectionNest.jpg",
                //     showCaret:true,
                //     fetch:"products_by_collection"
                // },
                {
                    id:5,
                    label:"Crimson",
                    uri:"crimson",
                    collectionId:3,
                    heading:"See all in Crimson",
                    headingLinksTo:"/collections/crimson-collection",
                    seeAllLinksTo:"/collections/crimson-collection",
                    desc:"The inner fire that ignites the soul.",
                    mainImg:"/images/collectionCrimson.jpg",
                    showCaret:true,
                    fetch:"products_by_collection"
                },
                {
                    id:6,
                    label:"Infinite",
                    uri:"infinite",
                    collectionId:4,
                    heading:"See all in Infinite",
                    headingLinksTo:"/collections/infinite-collection",
                    seeAllLinksTo:"/collections/infinite-collection",
                    desc:"The inner fire that enlightens the soul.",
                    mainImg:"/images/menu-images/infinite-collections.jpg",
                    showCaret:true,
                    fetch:"products_by_collection"
                },
                {
                    id:1,
                    label:'All Collections',
                    uri:'shop',
                    heading:'See all Collections',
                    headingLinksTo:"/collections",
                    seeAllLinksTo:"/collections",
                    desc:"Express your emotions with modern, lab grown diamond jewels.",
                    mainImg:"/images/menu-images/all-collections.jpg",
                    showCaret:true,
                    categoryId:1,
                    fetch:'products_by_category',
                    hideCountNumber:true
                    // headingLinksTo:'/collections'
                },    
            ],
            group:"Shop"
        },
        {
            id:6,
            label:"Gifts",
            showCaret:true,
            tier2action:"listItems",
            listItems:[
                {
                    id:1,
                    label:"For her",
                    uri:"for-her",
                    showCaret:true,
                    heading:"See all for Her",
                    headingLinksTo:"/gifts/for-her",
                    seeAllLinksTo:"/gifts/for-her",
                    desc:"Tell her story with modern lab grown diamond jewellery.",
                    mainImg:"/images/giftsHer.jpg",
                    fetch:"products_by_gender",
                    gender:"For her"
                },
                // {
                //     id:2,
                //     label:"For him",
                //     uri:"for-him",
                //     showCaret:true,
                //     heading:"See all for Him",
                //     headingLinksTo:"/gifts/for-him",
                //     seeAllLinksTo:"/gifts/for-him",
                //     desc:"Tell his story with jewellery he will cherish forever.",
                //     mainImg:"/images/giftsHim.jpg",
                //     fetch:"products_by_gender",
                //     gender:"For him"
                // },
                // {
                //     id:3,
                //     label:"Unisex",
                //     uri:"unisex",
                //     showCaret:true,
                //     heading:"See all Unisex",
                //     headingLinksTo:"/gifts/unisex",
                //     seeAllLinksTo:"/gifts/unisex",
                //     desc:"Express emotions with modern, lab grown diamond jewels.",
                //     mainImg:"/images/giftsUnisex.jpg",
                //     fetch:"products_by_gender",
                //     gender:"For her"
                // },
                // {
                //     id:4,
                //     label:"Christmas",
                //     uri:"christmas",
                //     showCaret:true,
                //     heading:"See all Christmas",
                //     headingLinksTo:"/style/christmas",
                //     seeAllLinksTo:"/style/christmas",
                //     desc:"Express your love with Christmas gift ideas.",
                //     mainImg:"/images/giftsChristmas.jpg",
                //     fetch:"products_by_style",
                //     style:'Christmas'
                // },
                {
                    id:5,
                    label:"Valentines",
                    uri:"valentine",
                    showCaret:true,
                    heading:"See all Valentine",
                    headingLinksTo:"/style/valentines",
                    seeAllLinksTo:"/style/valentines",
                    desc:"Express your love with our Valentine gift ideas",
                    mainImg:"/images/menu-images/explore-valentines.jpg",
                    fetch:"products_by_style",
                    style:'Valentines'
                }
                
            ],
            headingAndContent:[
                {
                    id:666,
                    showCaret:true,
                    label:"Gifting",
                    content:"Begin a new chapter with Unsaid. Personalise your gift with custom engraving, and choose from a selection of specially commissioned artwork for your jewel box and personal note.",
                    img:"/images/gift.jpg",
                    imgMobile:"/images/giftMobile.jpg",
                    tier3action:"imageAndText",
                    link:"/art-of-gifting"
                }
            ],
            group:"Shop"
        },
        {
            id:4536,
            label:"Materials",
            tier2action:"listItems",
            showCaret:true,
            listItems:[            
                {
                    id:234534,
                    label:"Rose Gold",
                    uri:"rose-gold",
                    heading:"See all Rose Gold",
                    headingLinksTo:"/materials/rose-gold",
                    seeAllLinksTo:"/materials/rose-gold",
                    desc:"Explore the warmth of rose gold.",
                    mainImg:"/images/menu-images/materials-rose-gold.jpg",
                    showCaret:true,
                    fetch:"products_by_material",
                    material:"Rose gold"
                },
                {
                    id:24536,
                    label:"White Gold",
                    uri:"white-gold",
                    heading:"See all White Gold",
                    headingLinksTo:"/materials/white-gold",
                    seeAllLinksTo:"/materials/white-gold",
                    desc:"Explore the gleam of white gold.",
                    mainImg:"/images/menu-images/materials-white-gold.jpg",
                    showCaret:true,
                    fetch:"products_by_material",
                    material:"White gold"
                },
                {
                    id:565367,
                    label:"Yellow Gold",
                    uri:"yellow-gold",
                    heading:"See all Yellow Gold",
                    headingLinksTo:"/materials/yellow-gold",
                    seeAllLinksTo:"/materials/yellow-gold",
                    desc:"Explore the glow of yellow gold.",
                    mainImg:"/images/materialsYellow.jpg",
                    showCaret:true,
                    fetch:"products_by_material",
                    material:"Yellow gold"
                },
                {
                    id:568456,
                    label:"Silver",
                    uri:"silver",
                    heading:"See all Silver",
                    headingLinksTo:"/materials/silver",
                    seeAllLinksTo:"/materials/silver",
                    desc:"Explore the lustre of silver.",
                    mainImg:"/images/materialsSilver.jpg",
                    showCaret:true,
                    fetch:"products_by_material",
                    material:"Silver"
                },
                // {
                //     id:523437,
                //     label:"Enamel",
                //     uri:"enamel",
                //     heading:"See all Enamel",
                //     headingLinksTo:"/materials/enamel",
                //     seeAllLinksTo:"/materials/enamel",
                //     desc:"Explore the richness of enamel.",
                //     mainImg:"/images/materialsEnamel.jpg",
                //     showCaret:true,
                //     fetch:"products_by_material",
                //     material:"Enamel"
                // }
            ],
            group:"Shop"
        },
        {
            id:9,
            label:"Our story",
            tier2action:"imageAndText",
            img:"/images/menu-images/our-story-desktop.jpg",
            imgMobile:"/images/menu-images/our-story-mobile.jpg",
            imgAndTextLink:"/our-story",
            text:"Our story",
            group:"Read",
        },
        {
            id:156362,
            label:"Responsibility",
            tier2action:"imageAndText",
            img:"/images/menu-images/responsibility-desktop.jpg",
            imgMobile:"/images/menu-images/responsibility-mobile.jpg",
            imgAndTextLink:"/responsibility",
            text:"Responsibility",
            group:"Read"
        },
        {
            id:10,
            label:"The library",
            tier2action:"imageAndText",
            img:"/images/menu-images/library-desktop.jpg",
            imgMobile:"/images/menu-images/library-mobile.jpg",
            imgAndTextLink:"/library",
            text:"The library",
            group:"Read",
        },
        {
            id:15143,
            label:"Gifting",
            tier2action:"imageAndText",
            img:"/images/menu-images/gifting-desktop.gif",
            imgMobile:"/images/menu-images/gifting-mobile.jpg",
            imgAndTextLink:"/art-of-gifting",
            text:"Gifting",
            group:"Read"
        },
        {
            id:1344352,
            label:"Lab grown diamonds",
            tier2action:"imageAndText",
            img:"/images/menu-images/lab-grown-diamond-desktop.jpg",
            imgMobile:"/images/menu-images/lab-grown-diamond-mobile.jpg",
            imgAndTextLink:"/lab-grown-diamonds",
            text:"Lab grown diamonds",
            group:"Read"
        },
        {
            id:13,
            label:"Customer care",
            showCaret:true,
            tier2action:"listItems",
            // link:"#",
            listItems:[
                {
                    id:1,
                    label:"Contact Unsaid",
                    headingLinksTo:'/contact-us'
                },
                {
                    id:2,
                    label:"Shipping & returns",
                    headingLinksTo:'/shipping-and-returns'
                },
                {
                    id:3,
                    label:"Payment information",
                    headingLinksTo:'/payment-information'
                },
                {
                    id:4,
                    label:"FAQ",
                    headingLinksTo:"/faq"
                },
            ], 
            // headingAndContent:[
            //     {
            //         id:6,
            //         showCaret:false,
            //         label:"FAQ",
            //         content:"Got a question? Check out our FAQ section. Still need help? Find out how to contact us.",
            //         link:'/faq'
            //     }
            // ],
            group:"Read"
        }
        
    ],
    ECOMMERCE_URI:`${process.env.NEXT_PUBLIC_ECOMMERCE_URI}`,
    UNSAID_API:`${process.env.NEXT_PUBLIC_API_URI}`,
    SANITY_PROJECT_ID:"16zaez6d",
    SANITY_DATASET:"production",

    ALGOLIA_INDICES:[
        {
            language:"en",
            indexName:process.env.NEXT_PUBLIC_ALGOLIA_EN
        },
        {
            language:"fr",
            indexName:process.env.NEXT_PUBLIC_ALGOLIA_FR
        }
],
    GTM_CONTAINER_ID:`${process.env.NEXT_PUBLIC_GTM_CONTAINER_ID}`,
    STRIPE_PK:`${process.env.NEXT_PUBLIC_STRIPE_PK}`,
    DEPLOY_URL:`${process.env.NEXT_PUBLIC_DEPLOY_URL}`,
    SANITY_PREVIEW_TOKEN:`${process.env.SANITY_PREVIEW_TOKEN}`
    
} 
