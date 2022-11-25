import {useState,useEffect,useRef} from 'react'
import Story from '../components/story'
import SwipeableViews from 'react-swipeable-views'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import imageUrlBuilder from "@sanity/image-url";
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Sanity from './../sanity'
import { paddingLeftTabletPortrait } from '../data/cssVariables'
import BlockContent from '@sanity/block-content-to-react'
import {connect} from 'react-redux'
import {getImageUrl} from "../functions"
function ThreeColumnStory(props) {
    const [index, setIndex] = useState(0)
    const [minHeadingHeight,setMinHeadingHeight] = useState("auto")
    const [minDescHeight,setMinDescHeight] = useState("auto")
    const [minHeadingHeightMobile,setMinHeadingHeightMobile] = useState("auto")
    const [minDescHeightMobile,setMinDescHeightMobile] = useState("auto")
    const headingRefs = useRef([])
    const descRefs = useRef([])
    const headingMobileRefs = useRef([])
    const descMobileRefs = useRef([])
    let settings = {
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite:false
    }
    function handleChangeIndex(index){
        setIndex(index)
    }
    useEffect(()=>{
        setMinHeadingHeight("auto")
        setMinDescHeight("auto")
        setTimeout(()=>{
            if(Array.isArray(props.storyList)){
                props.storyList.forEach((item,index)=>{
                    let headingHeight = headingRefs?.current[index]?.clientHeight
                    let descHeight = descRefs?.current[index]?.clientHeight
                    // console.log('heading and sec height',headingHeight,descHeight)
                    let max = 0 
                    if(headingHeight > max)
                        max = headingHeight
                    setMinHeadingHeight(`${max}px`);
                    let maxDesc = 0 
                    if(descHeight > maxDesc)
                        maxDesc = descHeight
                    setMinDescHeight(`${maxDesc}px`);
                })
                props.storyList.forEach((item,index)=>{
                    let headingHeight = headingMobileRefs?.current[index]?.clientHeight
                    let descHeight = descMobileRefs?.current[index]?.clientHeight
                    let max = 0 
                    if(headingHeight > max)
                        max = headingHeight
                    setMinHeadingHeightMobile(`${max}px`);
                    let maxDesc = 0 
                    if(descHeight > maxDesc)
                        maxDesc = descHeight
                    setMinDescHeightMobile(`${maxDesc}px`);
                })    
            }
        },3000)
    },[props.common.windowWidth])
    return (
        <>
        <div className="hideForMobile">
            <div className="container paddedContent">
                <div className="stories ">
                    {Array.isArray(props.storyList) &&
                        props?.storyList.map((story,index)=>{
                            return(
                                <div className="story" key={story._id}>
                                    <Story refCallBackDesc={el => descRefs.current[index] = el} refCallBackHeading={el => headingRefs.current[index] = el} minHeadingHeight={minHeadingHeight} minDescHeight={minDescHeight} imgSrc={getImageUrl(story?.portraitImage,561)} placeholderSrc={getImageUrl(story?.portraitImage,20)} desc={!!story.articleDesc? <div className="desc anoHalfRegular font16-notResponsive"><BlockContent blocks={story?.articleDesc} serialiser={null}/></div>:<p></p>}  link={`/library/${story?.articleSlug?.current}`}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>   
        </div>
        <div className="showForMobile">
            <div className="stories mobile">
                <SwipeableViews style={{padding:"0 3.6rem 0 2rem"}} slideStyle={{padding:"0"}} index={index} onChangeIndex={(id)=>handleChangeIndex(id)} springConfig={{
                                duration: "0.9s",
                                easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
                                delay: "0s",}}>
                    {Array.isArray(props.storyList) &&
                        props?.storyList.map((story,id)=>{
                            return(
                                <div className="story" key={story._id}>
                                    <Story refCallBackDesc={el => descMobileRefs.current[id] = el} refCallBackHeading={el => headingMobileRefs.current[id] = el} minHeadingHeight={minHeadingHeightMobile} minDescHeight={minDescHeightMobile} imgSrc={urlFor(story?.portraitImage).quality(100).format("webp").url(400)} hideText={id==index-1?true:false} placeholderSrc={urlFor(story?.portraitImage).quality(100).format("webp").url(10)} desc={!!story?.articleDesc? <div className="desc anoHalfRegular font16-notResponsive"><BlockContent blocks={story?.articleDesc} serialiser={null}/></div>:<p></p>} link={`/library/${story?.articleSlug?.current}`}/>
                                </div>
                            )
                        })
                    }
                </SwipeableViews>
            </div>
        </div>
         <style jsx>{`
            .stories{
                display:flex;
                margin-right: -2.2rem;
            }
            .story{
                width:33.33%;
                padding-right:2.2rem;
            }
            .storyTablet{
                padding-right:2.4rem;
            }
            .tabletContainer{
                padding-left:${paddingLeftTabletPortrait}
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .story{
                    padding-right:1.8rem;
                }
                .stories{
                    margin-right:-1.8rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .stories{
                    display:block;
                }
                .story{
                    width:100%;
                    padding-right:2rem;
                }
            }
           
         `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(ThreeColumnStory)