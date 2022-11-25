
const currency=[{name:'USD',symbol:'$'},{name:'EUR',symbol:'€'}]
const priceRange = [{min:300,max:1000,end:false,textMin:"300",textMax:"1000"},{min:1000,max:5000,end:false,textMin:"1000",textMax:"5000"},{min:5000,max:10000,end:false,textMin:"5000",textMax:"10 000"},{min:10000,max:100000,end:true,textMin:"10 000"}]
const collectionSortBy=[{name:'Curated',url:'curated'},{name:'Category',url:'category'}]
const sortBy=[{name:'Curated',url:'curated'},{name:'Category',url:'category'},{name:'Collection',url:'collection'}]
const allProductsSortingBy=[{name:'Category',uri:'category'},{name:'Collection',uri:'collection'}]
const newSortBy=[{name:'Low to High',uri:'low-to-high'},{name:'High to Low',uri:"high-to-low"},{name:'Popular',uri:"popular"},]
const newSortBy1_en=[{name:'Popular',uri:"popular"},{name:'Low to High',uri:'low-to-high'},{name:'High to Low',uri:"high-to-low"}]
const newSortBy1_fr=[{name:'Populaire',uri:"popular"},{name:'Prix croissants',uri:'low-to-high'},{name:'Prix décroissants',uri:"high-to-low"}]
const filterHeading_en=[{key:"categories",value:"Category"},{key:"collection",value:"Collection"},{key:"materials",value:"Materials"},{key:"gemstones",value:"Gemstone"},{key:"style",value:"Style"},{key:"gifts",value:"Gender"}]
const filterHeading_fr=[{key:"categories",value:"Category"},{key:"collection",value:"Collection"},{key:"materials",value:"Métal"},{key:"gemstones",value:"Pierre"},{key:"style",value:"Style"},{key:"gifts",value:"Genre"}]

const plpPageFilterData=[
    {
        heading:"Collection",
        filterItems:[
            {subHeading:"Beautiful Tear"},
            {subHeading:"Bubble"},
            {subHeading:"Crimson"},
            {subHeading:"Infinite"},
            {subHeading:"Nest"},
            {subHeading:"Parallel"},
            {subHeading:"Sunrise"},
            {subHeading:"Supernova"},
            {subHeading:"Whirlwind"},
        ]
    },  
    {
        heading:"Material",
        filterItems:[
            {subHeading:"Yellow gold"},
            {subHeading:"Rose gold"},
            {subHeading:"White gold"},
            {subHeading:"Sterling Silver"},
            {subHeading:"Enamel"},
        ]
    },
    {
        heading:"Gemstone",
        filterItems:[
            {subHeading:"White diamond"},
            {subHeading:"Green diamond"},
            {subHeading:"Yellow diamond"},
            {subHeading:"Pink diamond"},
            {subHeading:"Ruby"},
        ]
    },
    {
        heading:"Style",
        filterItems:[
            {subHeading:"Minimal"},
            {subHeading:"Statement pieces"},
            {subHeading:"Wedding"},
            {subHeading:"Classic"},
            {subHeading:"Avant garde"},
            {subHeading:"Bold"},
            {subHeading:"Strong"},
        ]
    },
    {
        heading:"Emotion",
        filterItems:[
            {subHeading:"Harmony"},
            {subHeading:"Hope"},
            {subHeading:"Joy"},
            {subHeading:"Passion"},
            {subHeading:"Strength"},
            {subHeading:"Trust"},
        ]
    },
    {
        heading:"Customise",
        filterItems:[
            {subHeading:"Diamond Selection"},
            {subHeading:"Engraving"},
        ]
    },
]


module.exports={
    plpPageFilterData,
    priceRange,
    collectionSortBy,
    sortBy,
    currency,
    allProductsSortingBy,
    newSortBy,
    newSortBy1_en,
    newSortBy1_fr,
    filterHeading_en,
    filterHeading_fr
}