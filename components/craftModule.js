import React,{useState, useEffect} from 'react'
import ThreeStepText from '../components/threeStepText'
import {MOBILE_BREAKPOINT} from '../config'
import {connect} from 'react-redux'
import LazyLoad from 'react-lazyload'
import {FIXING_BUFFER_DESKTOP,FIXING_BUFFER_MOBILE} from '../config'
function craftModule(props) {
    const [fadeIn, setFadeIn] = useState("");
    const [fadeOut, setFadeOut] = useState("");
    const [unlock, setUnlock] = useState("");

    useEffect(()=>{
        props.class==="fadeIn"?setFadeIn("fadeIn"):setFadeIn(fadeIn)
        props.class==="fadeOut"?setFadeOut("fadeOut"):setFadeOut(fadeOut)
        props.class==="unlock"?setUnlock("unlock"):setUnlock(unlock)
    },[props.class])
    return (
        <>
        <div className={`wrapper ${props.fixedModule?"fixedModule":""} ${fadeIn} ${fadeOut} ${unlock}`}>
                <div className={`craftContainer positionRelative`}>
                    <div className="textOnImg white positionAbsolute">
                        <ThreeStepText lockState={true} fadeIn={true} smallText="The art of craft" largeText="The hands behind the craft" desc="Our jewellery is created in India by some of the country's most talented artisans and craftspeople. Learn more about those who give shape to your story."/>
                    </div>
                </div>   
         </div>
         <style jsx>{`
            .craftContainer{
                height: ${props.device=="mobile"?`calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`:`calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`};
                background-image: url(${props.device=="mobile"?"/images/craftMobile.jpg":"/images/craft.jpg"});
                background-size:cover;
                background-position:center center;
            }
            .wrapper.fixedModule{
                transition: transform 0.5s ease-out;
                transform: translateY(${FIXING_BUFFER_DESKTOP}px);
            }
            .wrapper.fadeIn{
                transform: translateY(0);
            }
            .wrapper.unlock{
                transform: translateY(0);
            }
            .textOnImg{
                width:47%;
                display:none;
                z-index:2;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                transition:all 0.3s ease-out;
            }
            .fadeIn .textOnImg{
                display:block;
            }
            .unlock .textOnImg{
                transform:translate(-50%, -55%);
                opacity:0;
                pointer-events:none;
            } 
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){  
                .textOnImg{
                    width:calc(100% - 6.4rem);
                }    
                .wrapper.fixedModule{
                    transform: translateY(${FIXING_BUFFER_MOBILE}px);
                }
                .wrapper.fadeIn{
                    transform: translateY(0);
                }
                .wrapper.unlock{
                    transform: translateY(0);
                }          
            }
         `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(craftModule)