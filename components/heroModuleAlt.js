import {useState,useEffect} from 'react'
import { MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { connect } from 'react-redux'
import { paddingLeftDesktop, paddingRightDesktop, paddingLeftMedium, paddingRightMedium, paddingLeftTabletLandscape, paddingRightTabletLandscape, paddingLeftTabletPortrait, paddingRightTabletPortrait, paddingLeftMobile, paddingRightMobile } from '../data/cssVariables'
import imageUrlBuilder from "@sanity/image-url"
import Sanity from './../sanity'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source)
import {showMyUnsaidMenu,setLoggedIn} from '../redux/actions'
import {getImageUrl} from '../functions'
function HeroModuleDynamic(props) {
    let placeholderDesktopFullUrl = props.placeholderDesktop?getImageUrl(props.placeholderDesktop,1440):null
    let placeholderMobileFullUrl = props.placeholderMobile?getImageUrl(props.placeholderMobile,500):null
    const [placeholderDesktop,setPlaceholderDesktop] = useState(null)
    const [placeholderMobile,setPlaceholderMobile] = useState(null)
    useEffect(()=>{
        let placeholderDesktopFull = new Image()
        if(placeholderDesktopFullUrl){
            placeholderDesktopFull.onload = ()=>{
                setPlaceholderDesktop(placeholderDesktopFullUrl)
            }
            placeholderDesktopFull.src = placeholderDesktopFullUrl 
        }
        let placeholderMobileFull = new Image()
        if(placeholderMobileFullUrl){
            placeholderMobileFull.onload = ()=>{
                setPlaceholderMobile(placeholderMobileFullUrl)
            }
            placeholderMobileFull.src = placeholderMobileFullUrl 
        }
    },[])
    return (
       <>
        <div className="container">
            <div className="videoContainer positionRelative">
                <iframe className="hideForMobile" src="https://player.vimeo.com/video/671905942?h=06e4c875cd&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;background=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                <iframe className="showForMobile" src="https://player.vimeo.com/video/671906380?h=90e6e14f34&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;background=1" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h2 className="font32 heroText canelaThin black alignCenter paddedContent">
                {props.desc}
            </h2>
        </div>
        <style jsx>{`
            .container{
                background:#ffffff;
                height:100vh;
                min-height:100vh;
            }
            .videoContainer{
                --videoRatio: calc(16 / 9);
                --videoRatioMobile: calc(690 / 1498);
                margin:0 auto;
                text-align:center;
                width:calc(100% - ${paddingLeftDesktop} - ${paddingRightDesktop});
                height: calc(100vh - 19rem);
                overflow:hidden;
                background-image:url(${placeholderDesktop?placeholderDesktop:"none"});
                background-repeat: no-repeat;
                background-size: cover;
            }
            .videoContainer iframe{
                padding: 0;
                margin: 0;
                position: absolute;
                --w: 100vw;
                --h: calc(var(--w) / var(--videoRatio));
                height: var(--h);
                width: var(--w);
                top: calc(50% - (var(--h) / 2));
                left: 0;
                width: var(--w);
                height: var(--h);
            }
            @media (max-aspect-ratio: 16/9) {/*the viewport is too narrow for the full video */
                .videoContainer iframe {
                  --h: 100vh;
                  --w: calc(var(--h) * var(--videoRatio));
                  top: 0;
                  left: calc(50% - (var(--w) / 2));
                }
            }
            .heroText{
                margin-top:4.7rem;
                padding: 0 29%;
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .videoContainer{
                    width:calc(100% - ${paddingLeftMedium} - ${paddingRightMedium});
                }
                .heroText {
                    padding: 0 33%;
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .videoContainer{
                    width:calc(100% - ${paddingLeftTabletLandscape} - ${paddingRightTabletLandscape});
                }
                .heroText {
                    padding: 0 30%;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .videoContainer{
                    width:calc(100% - ${paddingLeftTabletPortrait} - ${paddingRightTabletPortrait});
                }
                .heroText {
                    padding: 0 25.5%;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .videoContainer{
                    width:calc(100% - ${paddingLeftMobile} - ${paddingRightMobile});
                    height: calc(100vh - 15rem);
                    background-image:url(${placeholderMobile?placeholderMobile:"none"});
                }
                .videoContainer iframe {
                    --w: calc(100vw - ${paddingLeftMobile} - ${paddingRightMobile});
                    --h: calc(var(--w) / var(--videoRatioMobile));
                    left: 0;
                    top: calc(50% - (var(--h) / 2));
                }
                .container{
                    background:#ffffff;
                }
                .heroText{
                    padding: 0 3.6rem;
                    margin-top:3.4rem;
                }
            }
            @media screen and (min-width: 1373px){
                .heroText{
                    padding: 0 33%;
                }
            }
            @media screen and (min-width: 1696px){
                .heroText{
                    padding: 0 36%;
                }
            }
        `}</style>
       </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setLoggedIn,showMyUnsaidMenu})(HeroModuleDynamic)