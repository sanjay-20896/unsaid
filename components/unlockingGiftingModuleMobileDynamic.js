import React from 'react'
import { connect } from 'react-redux'
import {FIXING_BUFFER_DESKTOP, FIXING_BUFFER_MOBILE} from '../config'
import {paddingLeftMobile} from '../data/cssVariables'
import ThreeStepText from '../components/threeStepText'
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import {getImageUrl} from "../functions"
import Sanity from './../sanity'
function giftingSection(props) {
    let giftingSectionHeight = `calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`
    let lockedImageHeight = props.class=="unlock"?"43.4rem":`calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`
    return (
       <>
        <div className={`giftingSection container ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="fadeOut"?"fadeOut":""} ${props.class=="unlock"?"unlock":""} positionRelative`} style={{height:giftingSectionHeight}}>     
            <div className="lockedImageMobile positionAbsolute" style={{height:lockedImageHeight}}>
                <div className="dark-overlay"></div>
            </div>
            <div className="textOnImg white positionAbsolute">
                <ThreeStepText lockState={true} fadeIn={true} smallText={props.pageMainHeading} largeText={props.pageSubHeading} desc={props.pageDescription}/>
            </div>  
        </div>
        <style jsx>{`
            .container{
                transition: transform 0.5s ease-out;
                transform: translateY(${FIXING_BUFFER_MOBILE}px);
            }
            .container.fadeIn{
                transform: translateY(0);
            }
            .container.unlock{
                transform: translateY(0);
            }
            .lockedImageMobile{
                background-image:url(${ getImageUrl(props.lockedImage)});
                background-size:cover;
                background-position:center center;
                z-index:1;
                top:0;
                left:0;
                width:100%;
                transition:all 0.5s ease-out 0.4s;
            }
            .unlock .lockedImageMobile{
                top:5.2rem;
                left:${paddingLeftMobile};
                width:24.5rem;
            }
            .unlock .dark-overlay{
                opacity:0;
            }
            .textContent{
                margin-bottom:3.2rem;
            }
            .textOnImg{
                width: calc(100% - 6.4rem);
                z-index: 5;
                top: 50%;
                left: 50%;
                display: none;
                transform: translate(-50%,-50%);
                transition: all 0.3s ease-out;
            }
            .fadeIn .textOnImg{
                display:block;
            }
            .unlock .textOnImg{
                transform:translate(-50%, -55%);
                opacity:0;
                pointer-events:none;
            }
        `}</style>
       </>
    )
}

function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(giftingSection)
