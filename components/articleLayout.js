import { useState,useEffect } from "react";
import {MOBILE_BREAKPOINT} from '../config';
import { paddingLeftMobile, paddingRightMobile } from "../data/cssVariables";
import FourArticleLayout from "./fourArticleLayout";
import ShowMore from "./showMore";
import useTranslation from 'next-translate/useTranslation'

export default function articles(props){
    const {t}=useTranslation('common')
    const [loadMore, setLoadMore] = useState(props.articles.length);
    const [hideLoadMore, setHideLoadMore] = useState(false);
    function loadMoreFun(){
        if(loadMore >= props.articles.length){
            setHideLoadMore(true)
        }else{
            // setHideLoadMore(false)
            setLoadMore(loadMore+4)
        }
    }

    let input = props.articles.slice(0,loadMore);
    let allArticles = []
    let size = 4;

    for (let i = 0;  i < input.length; i += size) {
        allArticles.push(input.slice(i, i + size))
    }
    // useEffect(() => {
    //     if(allArticles.length<2){
    //         setHideLoadMore(false)
    //     }else{
    //         setHideLoadMore(true)
    //     }
    // }, [allArticles])   
    return (
        <>
            <div className="articleLayout">
                <div className="standardPaddingBottom">
                    {!!allArticles && allArticles.map((articleSet,index)=>{
                        return(
                            <div key={index} className="fourArticleSet"> 
                                <FourArticleLayout
                                    articleSet={articleSet}
                                />
                            </div>
                        )
                    })}
                </div>
                {hideLoadMore &&
                <div className="standardPaddingBottom">
                    <ShowMore
                        heading={t('storiesShapedInGold')}
                        buttonText={t('unlockMoreStories')}
                        onclick={()=>loadMoreFun()}
                        noMargin={true}
                        noPadding={true}
                    />
                </div>}
            </div>
            <style jsx>{`
                .articleLayout{
                    padding:0 12.15% 0;
                }
                .fourArticleSet{
                    margin-bottom:6.4rem;
                }
                .fourArticleSet:last-child{
                    margin-bottom:0rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .articleLayout{
                        padding-left:${paddingLeftMobile};
                        padding-right:${paddingRightMobile};
                    }
                    .fourArticleSet{
                        margin-bottom:4.8rem;
                    }
                }
            `}</style>
        </>
    )
}

// this should only happen on component mount so there should be nothing in the array
    // async function loadMore(){
    //     let articles=null;
    //     let allQuery=`*[_type=="library"]{_createdAt,_updatedAt,articleDescription,articleLandscapeImageForDesktop,articlePotraitImageForDesktop,articleLandscapeImageForDesktop,articleSlug,articleTag[]->,category[]->,articleTitle,articleType,readTime}[${offset} ... ${offset+UNLOCK_ARTICLES_COUNT}]`;
    //     let categoryQuery=`*[_type=="articleCategory" && categorySlug.current=="${props.categorySlug}"]{
    //         "relatedArticles": *[_type=='library' && references(^._id)][${offset} ... ${offset+UNLOCK_ARTICLES_COUNT}}]{_createdAt,_updatedAt,articleDescription,articleLandscapeImageForDesktop,articlePotraitImageForDesktop,articleSlug,articleTag[]->,category[]->,readTime}
    //       `
    //     if(props.categorySlug==="all"){
    //         //run sanity and get all articles
    //         articles=await Sanity.fetch(allQuery);
    //         console.log(articles);
            
    //     }else{
    //         //run sanity and get category articles
    //         articles=await Sanity.fetch(categoryQuery);
    //         articles=articles[0].relatedArticles;
    //         console.log(articles);
    //     }
    //     setArticleCategory(articles);
    //     // if articles length > UNLOCK ARTICLE COUNT then hide unlock
    //     // increase offset, Add articles.length to offset
    //     // store the additional articles in state so that they can be rendered in the UI
    //     if(articleByCategory.length>UNLOCK_ARTICLES_COUNT){
    //         setHideUnlock(true);
    //         // setOffset(offset + articleByCategory.length);
    //         //setArticleCategory(articles)
            
    //     }

    //     //spliting the data into 2 columns for desktop 
    //     console.log(articleByCategory);

    //     // let column1data=[];
    //     // let column2data=[];
    //     // for(let i=0;i<articleByCategory.length;i++){
    //     //     if(i%2==0){
    //     //         column1data.push(articleByCategory[i])
    //     //     }else{
    //     //         column2data.push(articleByCategory[i])
    //     //     }
    //     // }
    //     // console.log("col1",column1data.length);
    //     // console.log("col2",column2data.length);
    // //     return(
    // //        <>
    // //        <div className="hideForMobile">
    // //             <div className="container">
    // //                  <div className="row">
    // //                      <div className="column">
    // //                      {!!column1data && Array.isArray(column1data) && column1data.map((article,index)=>{
    // //                      if(index%2==0){
    // //                          return(
    // //                              <div className="article"  >
    // //                                  <div className="portrait">
    // //                                      <MosaicPortrait article={article} />
    // //                                  </div>
    // //                              </div>
    // //                          )
    // //                      } else {
    // //                          return (
    // //                              <div className="article"  >
    // //                                  <div className="landscape">
    // //                                      <MosaicLandscape article={article}  />
    // //                                 </div>
    // //                             </div>
    // //                         )
    // //                      }
    // //                  })} 
    // //                     </div>
    // //                     <div className="column column2">
    // //                     {!!column2data && Array.isArray(column2data) && column2data.map((article,index)=>{
    // //                      if(index%2==0){
    // //                              return(
    // //                                 <div className="article"  >
    // //                                      <div className="landscape">
    // //                                          <MosaicLandscape article={article} />
    // //                                      </div>
    // //                                  </div>
    // //                              )
    // //                          } else {
    // //                              return (
    // //                                  <div className="article portrait-wrapper" >
    // //                                      <div className="portrait">
    // //                                          <MosaicPortrait article={article} />
    // //                                      </div>
    // //                                  </div>
    // //                              )
    // //                          }
    // //                  })} 
    // //                      </div>
    // //                 </div>
    // //             </div>
    // //          </div>
    // //          <div className="showForMobile">
    // //             <div className="wrapper">
    // //                 {!!articleByCategory && Array.isArray(articleByCategory) && articles.map((article,index)=>{
    // //                  if(index%2==0){
    // //                      return(
    // //                          <>
    // //                              <div className="article"  >
    // //                                  <div className="portrait">
    // //                                      <MosaicPortrait article={article} key={article._id}/>
    // //                                  </div>
    // //                              </div>
    // //                          </>
    // //                      )

    // //                  }else{
    // //                      return(
    // //                          <>
    // //                             <div className="article" >
    // //                                      <div className="landscape">
    // //                                          <MosaicLandscape article={article} key={article._id}/>
    // //                                      </div>
    // //                             </div>
    // //                          </>
    // //                      )
    // //                  }
    // //              })}
    // //             </div> 
    // //         </div>
    // //         <style jsx>{`
    // //         .row{
    // //             display: flex;
    // //             flex-direction: row;
    // //             flex-wrap: wrap;
    // //             width: 100%;
    // //         }
    // //         .column{
    // //             display:flex;
    // //             flex-direction:column;
    // //             flex-wrap:wrap;
    // //             width:50%
    // //         }
    // //         .portrait{
    // //             width:60%;
    // //         }
    // //         .column2 .portrait-wrapper{
    // //             display:flex;
    // //             justify-content:flex-end;
    // //         }
    // //         .wrapper{
    // //             margin-top:4.8rem;
    // //             margin-bottom:9.6rem;
    // //         }
    // //         .article{
    // //             // padding-bottom:2rem;
    // //         }

            
            
            
    // //         `}</style>

    // //        </>
    // //     )
    //  }