import Sanity from './../sanity'
import imageUrlBuilder from "@sanity/image-url"
import { MOBILE_BREAKPOINT } from '../config'
import Caret from './caret'
import DropDown from './dropdownDynamic'
const imageBuilder = imageUrlBuilder(Sanity)
const urlFor = source => imageBuilder.image(source)
import LazyImage from './lazyImage'
import {useState,useEffect,useRef} from 'react'
import {connect} from 'react-redux'
import {getImageUrl} from '../functions'
import { additionalPaddingLeftMobile, additionalPaddingRightMobile } from '../data/cssVariables'
function LinkItem(props){
    const [minHeadingHeight,setMinHeadingHeight] = useState("auto")
    const [minDescHeight,setMinDescHeight] = useState("auto")
    const headingRefs = useRef([])
    const descRefs = useRef([])
    useEffect(()=>{
        setMinHeadingHeight("auto")
        setMinDescHeight("auto")
        setTimeout(()=>{
            if(Array.isArray(props.data)){
                props.data.forEach((item,index)=>{
                    let headingHeight = headingRefs.current[index].clientHeight
                    let descHeight = descRefs.current[index].clientHeight
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
            }
        },3000)
    },[props.common.windowWidth])
    return(
        <>
        <div className="paddedContent">
            <div className="items">
                {Array.isArray(props.data) && props.data.map((item,index)=>{
                    return(
                        <>
                            <div className="item">
                                <div style={{minHeight:minHeadingHeight}} ref={el => headingRefs.current[index] = el} className="title additionalPaddingMobile canelaThin font24-notResponsive">{item.heading}</div>
                                <div style={{minHeight:minDescHeight}}  ref={el => descRefs.current[index] = el} className="desc additionalPaddingMobile hideForMobile font16-notResponsive anoHalfRegular">{item.description}</div>
                                <div className="imgcontainer">
                                     <LazyImage
                                        alt="Product image"
                                        originalSrc={getImageUrl(item.image,!!item.width? Math.ceil(item.width):644)}
                                        placeholderSrc={getImageUrl(item.image,20)}
                                        width={644}
                                        height={644}/>
                                </div>
                                <div className="desc showForMobile font16-notResponsive anoHalfRegular">{item.description}</div>
                                {props.linkType && <div className="linkWrap"><a className="link anoRegular font16-notResponsive" href={item.link}>{item.label}</a><span className="linkArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span></div>}
                                {!props.linkType && 
                                <div className="dropDown">
                                    <DropDown
                                        // headingText="heading"
                                        defaultValue={item.label}
                                        fontSize="font16-notResponsive"
                                        fontFamily="anoRegular"
                                        dropDownValuesAsProduct={!!item.dropdownProducts?item.dropdownProducts:null}      
                                    />
                                </div>}
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
        <style jsx>{`
            .item{
                padding-right:2.4rem;
                width:50%;
            }
            .linkArrow{
                margin-left:0.8rem;
            }
            .title{
                margin-bottom:1.6rem;
            }
            .desc{
                margin-bottom:3.2rem;
                padding-right: 33%;
            }
            .imgcontainer{
                margin-bottom:3.2rem;
            }
            .items{
                display:flex;
                margin-right:-2.4rem;
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .items{
                    display:block;
                    margin-right:0rem;
                }
                .item{
                    padding-right:0rem;
                    width:100%;
                    margin-bottom:4.8rem;
                }
                .item:last-child{
                    margin-bottom:0rem;
                }
                .title{
                    text-align:center;
                    margin-bottom:2.4rem;
                }
                .imgcontainer{
                    margin-bottom:2.4rem;
                }
                .desc{
                    margin-bottom:2.4rem;
                    padding-left:${additionalPaddingLeftMobile};
                    padding-right:${additionalPaddingRightMobile};
                    text-align:center;
                }
                .linkWrap{
                    text-align:center;
                }
            }
        `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(LinkItem)