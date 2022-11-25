import {connectHits} from 'react-instantsearch-dom';
import ProductListItemMenu from './ProductListItemMenu';
import ArticleListItemMenu from './articleListItemMenu'
import {smoothScrollTo} from '../functions'
import {useRef, useState,useEffect} from 'react'
import {MOBILE_BREAKPOINT} from '../config'
function Hits(props){
    const productHits=useRef(null);
    const articleHits=useRef(null);
    const [showProductResults,setShowProducts]=useState(true)
    const [showArticleResults,setShowArticles]=useState(false)
    let products = props.hits.filter(hit=>hit.dataType=="product")
    let articles = props.hits.filter(hit=>hit.dataType=="article")
    const  defaultProduct=products.length > 0 ? products[0]:null
    const defaultArticle=articles.length >0 ? articles[0]:null
    const [defaultSingleProduct, setDefaultSingleProduct]= useState(true)
    const [defaultSingleArticle,setDefaultSingleArticle]=useState(true)
    // const [defaultProduct,setDefaultProduct]=useState()
    // const [defaultArticle,setDefaultArticle]=useState()
    useEffect(()=>{
        if(products.length==0 && articles.length>0){
            setShowProducts(false)
            setShowArticles(true)
        }
    },[props.hits])
    return (
        <>
            <div className="hits"> 
                {props.hits.length > 0 &&
                    <div className="searchResultTitles">
                        {products.length > 0 &&
                            <div onClick={()=>{setShowProducts(true),setShowArticles(false)}} className={`productTitle anoRegular font16 underlineLR ${!!showProductResults?"bold active":""}`}>{products.length} products</div>
                        }
                        {articles.length > 0 &&
                            <div onClick={()=>{setShowArticles(true),setShowProducts(false)}}  className={`readsTitle anoRegular font16 underlineLR ${!!showArticleResults?"bold active":""}`}>{articles.length} reads</div>
                        }
                    </div>
                }
               {!!showProductResults && <div className="productHits" ref={productHits}>
                    {products.map((hit,index)=> {
                        // console.log(hit.uri,hit.sku,index)
                        return (
                            <div key={`productHit_${index}`} className="listItem">
                                <ProductListItemMenu showExcerpt={true} setPanelThreeOnHover={!props.noHover} product={hit} position={index+1} defaultProduct={defaultProduct} singleDefaultProduct={defaultSingleProduct} setSingleDefaultProduct={setDefaultSingleProduct}/>
                            </div>
                        )
                    })}
                </div>}
                {!!showArticleResults && <div className="articleHits" ref={articleHits}>
                    {articles.map((hit,index)=> {
                        return (
                            <div key={`articleHit_${index}`} className="listItem">
                                <ArticleListItemMenu article={hit} position={index+1} setPanelThreeOnHover={!props.noHover} defaultArticle={defaultArticle} defaultSingleArticle={defaultSingleArticle}  setDefaultSingleArticle={setDefaultSingleArticle}  />
                            </div>
                        )
                    })}
                </div>}
            </div>
            <style jsx>{`
                // .hits{
                //     padding-bottom:3.2rem;
                // }
                .searchResultTitles div.bold{
                    color:#0b0b0b;
                    font-weight:600;
                }
                .productHits .listItem:not(:last-child),.articleHits .listItem:not(:last-child){
                    margin-bottom:2.4rem;
                } 
                .searchResultTitles{
                    display:flex;
                    padding-top:2.5rem;
                    margin-bottom:3.2rem;
                }
                .searchResultTitles div{
                    margin-right:2.4rem;
                    color:#787878;
                }
                .underline:hover::after{
                    transform:scale(0);
                }
                .underline.active:hover::after{
                    transform:scale(1);
                }
                // .searchResultTitles div.productTitle{
                //     color:#000000;
                // }
                // .searchResultTitles div.readsTitle{
                //     color:#000000;
                // }
                .searchResultTitles div:last-child{
                    margin-right:0rem;
                }
                // .productTitle{
                //     color:#ffffff
                // }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .searchResultTitles{
                        padding-top:0rem;
                        margin-bottom:2.4rem;
                        padding-left:0rem;
                        padding-right:0rem;
                    }
                }
            `}</style>
        </>
    )
}
export default connectHits(Hits)