import cssVariables from '../data/cssVariables'
import Slider from 'react-slick'
import { useEffect, useRef, useState} from 'react'
import { connect } from 'react-redux'
import { MEDIUM_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT } from '../config'

function GiftingTopText(props){
    const giftingHeadings = useRef([]);
    const slider = useRef(null)
    const [minHeight,setMinHeight] = useState("auto")
    function itemClick(slideIndex){
        if(props.itemClick)
        props.itemClick(slideIndex)
    }
    let settings = {
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite:false
    }
    // useEffect(()=>{
    //     if(props.currentSlideIndex==2 && props.common.windowWidth<=TABLET_PORTRAIT_BREAKPOINT){
    //         slider.current.slickGoTo(1) 
    //     }
    //     else if(props.currentSlideIndex==3 && props.common.windowWidth<=TABLET_PORTRAIT_BREAKPOINT){
    //         slider.current.slickGoTo(2) 
    //     } else {
    //         if(props.common.windowWidth<=TABLET_PORTRAIT_BREAKPOINT)
    //         slider.current.slickGoTo(0)
    //     }
    // },[props.currentSlideIndex])  
    useEffect(()=>{
        setMinHeight("auto")
        setTimeout(()=>{
            let max = 0 
            for(let i=0;i<giftingHeadings.current.length;i++){
                if(giftingHeadings.current[i]?.getBoundingClientRect().height > max)
                    max = giftingHeadings.current[i].getBoundingClientRect().height
                // console.log(i,giftingHeadings.current[i].getBoundingClientRect().height)
            }
            setMinHeight(`${max}px`)
        },3000)
    },[props.common.windowWidth])  
    return (
        <>
        <div className={`${props.alreadyUnlocked?"alreadyUnlocked":""}`}>
            {/* {!!props.heading && <div className="heading anoHalfRegular paddedContent font20">{props.heading}</div>} */}
            <div className="">
                <div className="giftItems paddedContent giftingSectionTexts">
                    {props.data.map((slide,slideIndex)=>{
                        return (
                            <div onClick={()=>itemClick(slideIndex)} className={`giftItem ${props.currentSlideIndex===slideIndex?"":"grey"}`} key={`desktop_text_slide_${slideIndex}`}>
                                <div ref={el => giftingHeadings.current[slideIndex] = el} className="itemHeading one canelaThin font24">{slide.heading}</div>
                                <div className="itemDesc one anoHalfRegular font16">{slide.description}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {/* <div className="displayBlockOnlyInTablet">
                <div className="giftItemsSlider">
                    <Slider {...settings} ref={slider}>
                        {props.data.map((slide,slideIndex)=>{
                            return (
                                <div onClick={()=>itemClick(slideIndex)} className={`giftItem ${props.currentSlideIndex===slideIndex?"":"grey"}`} key={`desktop_text_slide_${slideIndex}`}>
                                    <div className="itemHeading one canelaThin font24">{slide.heading}</div>
                                    <div className="itemDesc one anoHalfRegular font16">{slide.description}</div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div> */}
        </div>
        <style jsx>{`
            .heading{
                margin-bottom:3.2rem;
                display:block;
            }
            .itemDesc{
                letter-spacing: 0.4px;
            }
            .giftItems{
                display:flex;
                margin-right:-2.4rem;
                margin-bottom:3.2rem;
            }
            .giftItem{
                padding-right:2.4rem;
                cursor:pointer;
                flex: 1 1 100%;
            }
            .giftItemsSlider{
                padding-left:${cssVariables.paddingLeftMobile};
            }
            .itemHeading{
                margin-bottom:2.4rem;
                min-height: ${minHeight};
            }
            .itemHeading,.itemDesc{
                opacity:0;
            }
            .alreadyUnlocked .itemHeading,.alreadyUnlocked .itemDesc{
                opacity:1;
            }
            .unlock .itemHeading{
                animation:textFadeInAnimation 0.5s ease-out;
                animation-fill-mode:forwards;
            }
            .unlock .itemDesc{
                animation:textFadeInAnimation 0.5s ease-out;
                animation-fill-mode:forwards;
            }
            @keyframes textFadeInAnimation{
                from{
                    opacity:0;
                    transform:translateY(2rem);
                }
                to{
                    opacity:1;
                    transform:translateY(0);
                }
            }
            @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .itemHeading {
                    margin-bottom: 1.8rem;
                }
            }
            @media only screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                // .itemHeading {
                //     margin-bottom: 1.8rem;
                // }
            }
            @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                // .itemHeading {
                //     margin-bottom: 1.8rem;
                // }
            }
        `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(GiftingTopText)