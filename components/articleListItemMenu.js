import {MOBILE_BREAKPOINT} from '../config'
import Link from 'next/link'
import Sanity from '../sanity';
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import ImageAndTextMenu from './imageAndTextMenu'
import {setPanelThreeData, showExploreMenu} from '../redux/actions'
import { connect } from 'react-redux';
import {getImageUrl} from "./../functions"
import { useEffect } from 'react';
function ArticleListItemMenu(props){
    // console.log(props)
    let delay2=(((props.position)*0.1)+(0.2)).toString();
    function mouseEnter(){
        props.setDefaultSingleArticle(false)
        if(props.setPanelThreeOnHover){
            props.setPanelThreeData(<ImageAndTextMenu img={getImageUrl(props?.article?.searchImage)}  text={props?.article?.title} link={`${props?.article?.link}`} lazy={true}/>)
        }
    }
    useEffect(()=>{
        if(!!props?.defaultSingleArticle){
            props.setPanelThreeData(<ImageAndTextMenu img={getImageUrl(props?.defaultArticle?.searchImage)} text={props?.defaultArticle?.title} link={`${props?.defaultArticle?.link}`} lazy={true}/>)
        }
    },[props?.defaultSingleArticle])
    // console.log("article",props.article)
    return(
        <div key={`articleHit_${props.position}`} onMouseEnter={()=>mouseEnter()} >
            <div className="articleHit">
                <div style={{animationDelay:`${delay2}s`}} className={`readCard ${props.position===1?"firstItem":""}`} >
                    <Link href={`${props.article.link}`}><a onClick={()=>props.showExploreMenu(false)}><h1 className="readCardHeading canelaThin underlinedLink font20">{props.article.title}</h1></a></Link>
                    <Link href={`${props.article.link}`}><a onClick={()=>props.showExploreMenu(false)}><h1 className="readCardContent anoHalfRegular font16">{props.article.description}</h1></a></Link>
                </div>
                {/* <div style={{animationDelay:`${delay2}s`}} className={`readCard ${props.position===1?"firstItem":""}`}>
                    <Link href={`/library/${props.article.articleSlug.current}`}><a onClick={()=>props.showExploreMenu(false)}><h1 className="readCardHeading canelaThin underlinedLink font20">{props.article.articleTitle}</h1></a></Link>
                    <Link href={`/library/${props.article.articleSlug.current}`}><a onClick={()=>props.showExploreMenu(false)}><h1 className="readCardContent anoHalfRegular font16">{props.article.articleDescription}</h1></a></Link>
                </div> */}

            </div>
            <style jsx>{`
                .readCardHeading{
                    margin-bottom:0.8rem;
                    cursor:pointer;
                }
                .readCard{
                    margin-bottom:2.4rem;
                }
                // .articleHit .readCard:last-child{
                //     margin-bottom: 23rem;
                // }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .readCardHeading{
                        font-size:2rem;
                    }
                }
            `}</style>
        </div>
    )
}

function mapStateToProps({selection}){
    return {selection}
}

export default connect(mapStateToProps,{setPanelThreeData,showExploreMenu})(ArticleListItemMenu)