import React, {useState} from 'react'
import Story from '../components/story'
import {storyData} from '../data/staticData'
import SwipeableViews from 'react-swipeable-views'
import {MOBILE_BREAKPOINT} from '../config'
import Slider from 'react-slick'
import { paddingLeftDesktop, paddingLeftTabletPortrait } from '../data/cssVariables'
export default function threeColumnStory(props) {
    const [index, setIndex] = useState(0)
    let settings = {
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite:false
    }
    let handleChangeIndex = index => {
        setIndex(index)
    }
    return (
        <>
        {props.device=="desktop" &&
            <div className="container paddedContent">
                <div className="stories ">
                    {
                        storyData.map(story=>{
                            return(
                                <div className="story"><Story imgSrc={story.img} heading={story.heading} desc={story.desc} link={story.link}/></div>
                            )
                        })
                    }
                </div>
            </div>   
        }
        {props.device=="mobile" &&
            <div className="paddedContent">
                <div className="stories ">
                    <SwipeableViews style={{padding:"0 1.6rem 0 0"}} slideStyle={{padding:"0px"}} index={index} onChangeIndex={()=>handleChangeIndex} springConfig={{
                                    duration: "0.9s",
                                    easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
                                    delay: "0s",}}>
                    {
                        storyData.map(story=>{
                            return(
                                <div className="story"><Story imgSrc={story.img} heading={story.heading} desc={story.desc} link={story.link}/></div>
                            )
                        })
                    }
                    </SwipeableViews>
                </div>
            </div>
        }
        {props.device=="tablet" &&
            <div className="tabletContainer">
                <Slider {...settings}>
                    {
                        storyData.map(story=>{
                            return(
                                <div className="storyTablet"><Story imgSrc={story.img} heading={story.heading} desc={story.desc} link={story.link}/></div>
                            )
                        })
                    }
                </Slider>
            </div>
        }
         <style jsx>{`
            .stories{
                display:flex;
                margin-right: -2.4rem;
            }
            .story{
                width:33.33%;
                padding-right:2.4rem;
            }
            .storyTablet{
                padding-right:2.4rem;
            }
            .tabletContainer{
                padding-left:${paddingLeftTabletPortrait};
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .stories{
                    display:block;
                    //padding-left:3.6rem;
                }
                .story{
                    width:100%;
                    //padding-right:1.6rem;
                }

            }
           
         `}</style>
        </>
    )
}
