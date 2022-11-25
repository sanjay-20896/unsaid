import Sanity from '../sanity';
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Link from 'next/link';
import LazyImage from './lazyImage'
import {getImageUrl} from "../functions"
import useTranslation from 'next-translate/useTranslation'

export default function MosaicLandscape(props){
    const {t}=useTranslation('common');
    let date=((props.article._createdAt).split('T'))
    let newDate=date[0];
    newDate=newDate.split('-');
    let index=newDate[1]
    const monthObj ={
        '01':'January',
        '02':'February',
        '03':'March',
        '04':'April',
        '05':'May',
        '06':'June',
        '07':'July',
        '08':'August',
        '09':'September',
        '10':'October',
        '11':'November',
        '12':'December',
    }
    let articleDate=`${monthObj[index]} ${newDate[2] ? newDate[2] : ""}, ${newDate[0] ? newDate[0]: newDate[0]}`
    return(
        <>
             <div className="wrapper">
                <div className="mainHeading anoRegular font16 grey">{props.article.category[0].category} - {props.article.articleTag[0].tagname}</div>
                <Link href={`/library/${props.article.articleSlug.current}`}><a>
                <div className="articleTitle canelaThin font20 ">{props.article.articleTitle}</div>
                <div className="imageWrapper">
                    <LazyImage 
                        alt={props.article.articleTitle}
                        originalSrc={getImageUrl(props.article.landscapeImage,710)} 
                        placeholderSrc={getImageUrl(props.article.landscapeImage,710)}
                        width={710} 
                        height={416} 
                    />
                </div>
                </a></Link>
                <div className="dateInfo anoRegular font16 grey">
                    <div>{!!props.article.date?props.article.date:articleDate}</div>
                    <div>{props.article.readTime} {t('read')}</div>
                </div>
            </div>
            <style jsx>{`
                .articleTitle,.imageWrapper{
                    margin-bottom:1.6rem;
                }
                .mainHeading{
                    margin-bottom:0.8rem;
                }
                .dateInfo{
                    display:flex;
                    width:100%;
                    justify-content:space-between;
                
                }
            `}
            </style>
        </>
    )
}