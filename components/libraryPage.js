import Sanity from '../sanity'
import imageUrlBuilder from "@sanity/image-url"
const imageBuilder = imageUrlBuilder(Sanity)
import LazyImage from './lazyImage'
const urlFor = source => imageBuilder.image(source)
import Articles from './articleLayout'
import Link from 'next/link'
import { MOBILE_BREAKPOINT } from '../config'
import React, { useEffect, useRef, useState } from 'react'
import  { useRouter } from 'next/router'
import {smoothScrollTo,getQueryVariable,getImageUrl} from '../functions'
import { paddingLeftMobile } from '../data/cssVariables'
import useTranslation from 'next-translate/useTranslation'

export default function LibraryPage(props) {
    // console.log("jdlksj",props);
    const router=useRouter()
    const [fetchedArticles,setFetchedArticles]=useState(null)
    const navbar=useRef()
    const topContent=useRef()
    const {t}=useTranslation('common');
    let articles = fetchedArticles || props.article;
    // let sortArticles = articles.sort((a, b) => {return a["articleSortByAll"] - b["articleSortByAll"]});
    let articlesListWithSortId = [];
    for(let i=0;i<articles.length;i++){
        if(!!articles[i].articleSortByAll){
            articlesListWithSortId.push(articles[i])
        }
    }
    for(let i=0;i<articles.length;i++){
        if(!articles[i].articleSortByAll){
            articles[i].articleSortByAll = articlesListWithSortId.length + 1
            articlesListWithSortId.push(articles[i])
        }
    }
    let sortArticles = articlesListWithSortId.sort((a, b) => {return a.articleSortByAll - b.articleSortByAll});
    // async function getArticles(){
    //     let data=null;
    //     if(props.categorySlug=="all"){
    //         let query1=`*[_type=="library"]{_createdAt,_updatedAt,articleTitle,articleDescription,landscapeImage,portraitImage,articleSlug,articleTag[]->,category[]->}`
    //         data=await Sanity.fetch(query1);
    //         data=Array.isArray(data)?data:null;
    //     }else{
    //         let query2=`*[_type=="articleCategory" && categorySlug.current=="${props.categorySlug}"]{
    //             "relatedArticles": *[_type=='library' && references(^._id)]{_createdAt,_updatedAt,articleTitle,articleDescription,landscapeImage,portraitImage,articleSlug,articleTag[]->,category[]->,readTime}
    //           }`
    //         data=await Sanity.fetch(query2);
    //         data=Array.isArray(data)?data[0].relatedArticles:null
    //     }
    //     setFetchedArticles(data)
    // }
    useEffect(()=>{
    // getArticles()
    // console.log("scroll value",router.query.scroll)
    //    if(router.query.scroll==="true"){
    //     //    smoothScrollTo(navbar)
    //         navbar.current.scrollIntoView()
    //    }
    let variable=getQueryVariable("scroll")
    // console.log(variable)
        if(variable==="true"){
            window.scrollTo(0,topContent.current.getBoundingClientRect().bottom)
        }
    },[])
    function changeCategory(link){
        router.push(link,null,{shallow:true})
    }
    return (
        <>
        <div className="">
            <div className="topContent" ref={topContent}>
                <div className="imageWrapper paddedContent hideForMobile">
                    <LazyImage 
                        alt="Library all articles"
                        originalSrc={getImageUrl(props.data.imageDesktop,1749)} 
                        placeholderSrc={getImageUrl(props.data.imageDesktop,20)}
                        width={1749} 
                        height={750} 
                    />
                </div>
                <div className="imageWrapper showForMobile paddedContent">
                    <LazyImage 
                        alt="Library all articles"
                        originalSrc={getImageUrl(props.data.imageMobile,500)} 
                        placeholderSrc={getImageUrl(props.data.imageMobile,20)}
                        width={303} 
                        height={538} 
                    />
                </div>
                <div className="font40 alignCenter canelaThin heading">{props.data.heading}</div>
                <div className="alignCenter desc font24 canelaThin">{props.data.description}</div>
            </div>
            
            <div className="libraryCategoryNavbar positionRelative" ref={navbar}>
                <ul className="navItems font24 grey canelaThin">
                    {!!props.category && Array.isArray(props.category) && props.category.map((item,i)=>{
                        
                        let link
                        if(item.categorySlug.current=="all"){
                            link="/library?scroll=true"
                            // route(link)
                        }else{
                            link=`/library/${item.categorySlug.current}?scroll=true`
                            // route(link)
                        }
                        // console.log(link)
                        return(
                            <li className={`navItem underlineLR ${item.categorySlug.current==props.categorySlug?"active":""}`}>
                               {/* <Link href={link}> */}
                                    <a onClick={()=>changeCategory(link)}>
                                    {/* <span onClick={()=>changeCategory(link)}> */}
                                        {item.category}
                                    {/* </span> */}
                                    </a>
                                {/* </Link> */}
                            </li>
                        )
                    })}   
                    <li className="navItemLast">
                        &nbsp;&nbsp;&nbsp;
                    </li>
                </ul>
            </div>
            {!!articles.length >0 ? <Articles articles={sortArticles} initialArticlesFetchedCount={props.article.length} categorySlug={props.categorySlug}/> :<div className="canelaThin black msg alignCenter">{t('noArticlesMsg')}</div>}
        </div>
        <style jsx>{`
            .msg{
                margin-top:13rem;
                margin-bottom:15rem;
                font-size:2.3rem;
                width:100%
            }
            .navItemLast{
                display:none;
            }
            .heading{
                margin-bottom:2.4rem;
            }
            .sortByDropDown{
                position: absolute;
                left: 0;
                padding-left: 63px;
                height:0;
                overflow:hidden;
                background:#ffffff;
                transform:translateY(-1rem);
                transition:all 0.3s ease-out;
            }
            .sortByDropDownActive .sortByDropDown{
                height:auto;
                transform:translateY(0rem);
                transition:all 0.3s ease-out;
            }
            .sortByFilter .dropdownArrow{
                margin-left:0.8rem;
            }
            .sortByFilter{
                background:#ffffff;
                position: absolute;
                top: 50%;
                right: 12.5%;
                transform: translateY(-50%);
                cursor:pointer;
            }
            .imageWrapper{
                margin-bottom:4.8rem;
            }
            .desc{
                padding: 0px 28%;
                margin-bottom:6.4rem; 
            }
            .libraryCategoryNavbar{
                margin-bottom:4.8rem;
                padding: 12px 0;
            }
            .navItems{
                list-style:none;
                display:flex;
                justify-content:center;
                margin:0;
            }
            .navItem{
                margin-right:4.8rem;
                cursor:pointer;
            }
            .navItem.active{
                color:#000000;
            }
            .navItem:last-child{
                margin-right:0;
            }
            
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .heading{
                    margin-bottom:2.4rem;
                }
                .desc{
                    padding: 0px 10%;
                    margin-bottom:4.8rem;  
                }
                .sortByDropDown{
                    padding-left: 4.9rem;
                    padding-right: 2rem;
                }
                .sortByFilter{
                    top: 0.8rem;
                    left:3.6rem;                
                    transform: translateY(0);
                    cursor:pointer;
                }
                .libraryCategoryNavbar{
                    margin-bottom: 4.8rem;
                    padding: 4.4rem 0 12px;
                }
                .wrapper{
                    margin-bottom:4.8rem;
                }
                .navItem{
                    margin-right:2.4rem;
                    cursor:pointer; 
                }
                .navItemLast{
                    display:inline-block;
                }
                .navItems{
                    width:100%;
                    padding-left: ${paddingLeftMobile};
                    justify-content: flex-start;
                    -webkit-overflow-scrolling: touch;
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;  /* Firefox */
                    overflow-x:scroll;
                }
                .navItems::-webkit-scrollbar { 
                    display: none;  /* Safari and Chrome */
                }
                .navItemLastButOne{
                    margin-right:0;
                }
                .mobileWrapper{
                    width:100%
                }
            }
        `}</style>
        </>
    )
}