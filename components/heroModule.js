import React, { useEffect } from 'react'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import { connect } from 'react-redux';
import cssVariables, { paddingRightDesktop } from '../data/cssVariables'
import { useRouter } from 'next/router'
import {setLoggedIn} from '../redux/actions'

function heroModule(props) {
    const router = useRouter();
    useEffect(()=>{
        if(!!router.query.id && !!router.query.i){
            props.setLoggedIn(true);
        }else{
            props.setLoggedIn(false);
        }
    },[router])
    return (
       <>
        <div style={{height:`${props.common.windowHeight2}px`}} className={`container ${props.animation=="unlock"?"unlock":""}`}>
            <div className="videoContainer positionRelative">
                <video width="400" id={props.id} autoPlay muted playsInline loop>
                    <source src="/videos/homeVideo.mp4" type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
                {/* <img className="mainImg width-100"  src="/images/hero.png" /> */}
                <div className="textContainer positionAbsolute">
                    <h1 className="textOne white canelaThin">Say with </h1>
                    <div className="textTwo"><img className="width-100" src="/images/logo.png" alt="Unsaid Logo" /></div>
                </div>
            </div>
            <h2 className="font32 heroText canelaThin black alignCenter">
                <span className="heroTextItem one">Immortalise </span>
                <span className="heroTextItem two">your </span>
                <span className="heroTextItem three">story </span>
                <span className="heroTextItem four">in </span><br/>
                <span className="heroTextItem five">sustainably-crafted </span>
                <span className="heroTextItem six">jewellery.</span>
            </h2>
        </div>
        <style jsx>{`
            .container{
                background:#ffffff;
            }
            .textContainer{
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);            
            }
            .textOne{
                margin-bottom: 3.2rem;
                animation:textFadeInAnimation 0.5s ease-out 0.3s forwards;
                opacity:0;
                transform:translateY(2rem);
                font-size:3.2rem;
                line-height:4rem;
            }
            .textTwo{
                width: 20.8rem;
                height: 6.4rem;
                animation:textFadeInAnimation 0.5s ease-out 0.6s forwards;
                opacity:0;
                transform:translateY(2rem);
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
            .unlock .textContainer{
                opacity:0;
            }
            .videoContainer{
                margin:0 auto;
                text-align:center;
                width:100%;
                height:100%;
                overflow:hidden;
                transition:all 0.5s ease-out;
            }
            .videoContainer video{
                min-width: 100%; 
                min-height: 100%; 
              
                /* Setting width & height to auto prevents the browser from stretching or squishing the video */
                width: auto;
                height: auto;
              
                /* Center the video */
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .unlock .videoContainer{
                width:calc(100% - ${cssVariables.paddingLeftDesktop} - ${cssVariables.paddingRightDesktop});
                height:73%;
            }
            // .mainImg{
            //     height:100%;
            //     transition:all 0.5s ease-out;
            // }
            // .unlock .mainImg{
            //     height:113%;
            // }
            .heroText{
                margin-top:6.4rem;
            }
            .heroText .one{
                opacity:0;
            }
            .heroText .two{
                opacity:0;
            }
            .heroText .three{
                opacity:0;
            }
            .heroText .four{
                opacity:0;
            }
            .heroText .five{
                opacity:0;
            }
            .heroText .six{
                opacity:0;
            }
            .unlock .heroText .one{
                animation:heroTextAnime 0.4s ease-out 0.2s forwards;
            }
            .unlock .heroText .two{
                animation:heroTextAnime 0.4s ease-out 0.4s forwards;
            }
            .unlock .heroText .three{
                animation:heroTextAnime 0.4s ease-out 0.6s forwards;
            }
            .unlock .heroText .four{
                animation:heroTextAnime 0.4s ease-out 0.8s forwards;
            }
            .unlock .heroText .five{
                animation:heroTextAnime 0.4s ease-out 1s forwards;
            }
            .unlock .heroText .six{
                animation:heroTextAnime 0.4s ease-out 1.2s forwards;
            }
            @keyframes heroTextAnime{
                from{
                    opacity:0;
                }
                to{
                    opacity:1;
                }
            }
            @media only screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .unlock .videoContainer{
                    width:calc(100% - ${cssVariables.paddingLeftMedium} - ${cssVariables.paddingRightMedium});
                }
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .textOne{
                    font-size:2.8rem;
                    line-height:3.5rem;
                    margin-bottom:2.7rem;
                }
                .textTwo{
                    width:18.6rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .textOne{
                    font-size:1.6rem;
                    line-height:2.4rem;
                    margin-bottom:1.6rem;
                }
                .textTwo{
                    width: 15.6rem;
                    height: 4.8rem;
                }
                .unlock .videoContainer{
                    width:calc(100% - 7.2rem);
                }
                .container{
                    background:#ffffff;
                }
            }
        `}</style>
       </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setLoggedIn})(heroModule)

