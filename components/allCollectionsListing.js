import Layout from './layout'
import SingleCollectionItem from './SingleCollectionItem'
import SEO from './SearchEngineOptimisation';
import {getImageUrl} from "../functions"
function AllCollectionsListing(props){
    // console.log("AllCollections",props.content)
    let seo=props?.content?.seo
    return(
        <>
        <SEO title={seo.title} description={seo.description} image={getImageUrl(seo.image)}/>
        <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            {Array.isArray(props.content.CollectionsListing) && props.content.CollectionsListing.map((collection)=>{ 
                let singleCollection=collection.allCollectionAttributes
                return(
                    <SingleCollectionItem 
                        imageDesktopOriginalSrc={getImageUrl(singleCollection.imageDesktop,1312)}
                        imageDesktopPlaceholderSrc={getImageUrl(singleCollection.imageDesktop,20)}
                        imageMobileOriginalSrc={getImageUrl(singleCollection.imageMobile,303)}
                        imageMobilePlaceholderSrc={getImageUrl(singleCollection.imageMobile,20)}
                        alt={singleCollection.name}
                        collectionName={singleCollection.name}
                        label={singleCollection.label}
                        link={singleCollection.link}
                        />
                )
            })}
        </Layout>
        </>
    )
}

export default AllCollectionsListing
