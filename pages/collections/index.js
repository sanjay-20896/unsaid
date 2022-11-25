
import Sanity from '../../sanity'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {getDynamicMenuAndFooterInfo} from "../../functions"
import {getImageUrl} from "../../functions"
import AllCollectionsListing from "../../components/allCollectionsListing"
import useTranslation from 'next-translate/useTranslation'
export default function AllCollections(props){
    const {t}=useTranslation('common');
    return (
        <>
            {props.errors &&
                <p>{t('unexpectedError')}</p>
            }
            {!!props.content && 
                <AllCollectionsListing  {...props}/>
            }
        </>
    )
}
export async function getStaticProps({params,locale}){
    let content=null;
    let errors=false
    let commonProps=null;
    let query1=`*[_type=="allCollections_${locale}"]{seo,"CollectionsListing":collectionsList[]->{allCollectionAttributes}}`;
    try{
        content=await Sanity.fetch(query1);
        content=Array.isArray(content)? content[0]:null;
        commonProps=await getDynamicMenuAndFooterInfo(locale);
        return {props:{content,commonProps}}
    }catch(err){
        // console.log(err);
        errors=true
        return{props:{errors}}
    }
}