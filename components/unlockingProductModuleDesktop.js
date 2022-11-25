import { useEffect, useRef, useState } from 'react'
import ThreeStepText from './threeStepText'
import { connect } from 'react-redux';
import {FIXING_BUFFER_DESKTOP} from '../config'

function unlockingProductModuleDesktop(props) {
    const [imgContainerHeight,setImgContainerHeight] = useState(0)
    const heightCalc = useRef(null)
    useEffect(()=>{
        setImgContainerHeight(`${heightCalc.current.getBoundingClientRect().width}px`)
    },[])
    let img1ContainerHeight = `calc(${props.common.windowHeight}px - ${props.common.navHeight}px)`
    if(props.class=="unlock")
        img1ContainerHeight = imgContainerHeight?imgContainerHeight:`calc(100vh  - 13rem)`
    let img2ContainerHeight = imgContainerHeight?imgContainerHeight:`calc(100vh  - 13rem)`
    return (
        <>
            <div className={`container positionRelative ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="fadeOut"?"fadeOut":""} ${props.class=="unlock"?"unlock":""}`} style={{height:`calc(${props.common.windowHeight}px - ${props.common.navHeight}px)`}}>
                <div className="imgWrapper positionRelative">
                    <div className="img1Container" style={{height:img1ContainerHeight}}></div>
                    <div className={`img2Container positionRelative`} style={{height:img2ContainerHeight}}>
                        <div className="favouriteIcon"><img src="/images/favourite.svg" alt='favourite icon' className="width-100"/></div>
                    </div>
                </div>
                <div className="paddedContent heightCalcWrapper positionAbsolute">
                    <div className="heightCalc" ref={heightCalc}></div>
                </div>
                <div className={`textOnImg white  positionAbsolute `}><ThreeStepText lockState={true} fadeIn={true} smallText="The art of timelessness" largeText="Meet our modern classics" desc="Each carefully considered piece is forged from emotions that transcend time, captured in the glimmer of gold, diamonds, and precious gemstones"/></div>
            </div>
            <style jsx>{`
                .container{
                    height:100vh;
                    // transform: translateY(${FIXING_BUFFER_DESKTOP}px);
                    // transition: transform 0.5s ease-out;
                }
                // .container.fadeIn{
                //     transform: translateY(0);
                // }
                // .container.unlock{
                //     transform: translateY(0);
                // }
                .clear{
                    clear:both
                }
                .imgWrapper{
                    display:block;
                    white-space:nowrap;
                    transition: all 0.5s ease-out 0.6s;
                    z-index:2;
                    background:#ffffff;
                }
                .unlock .imgWrapper{
                    padding-left:4.44%;
                    padding-right:4.44%;
                }
                .img1Container{
                    background-image: url(${props.img1});
                    background-size:cover;
                    background-position:center center;
                    height:100vh;
                    width:100%;
                    display:inline-block;
                    transition: all 0.5s ease-out 0.6s;
                }
                .unlock .img1Container{
                    width:calc(50% - 2.4rem);
                    height:calc(100vh  - 13rem);
                }
                .img2Container{
                    background-image: url(${props.img2});
                    background-size:cover;
                    background-position:center center;
                    width:50%;
                    margin-left:2.4rem;
                    display:inline-block;
                    transition: width 0.5s ease-out;
                    height:${imgContainerHeight?imgContainerHeight:`calc(100vh  - 13rem)`};
                }
                .textOnImg{
                    // width:47%;
                    z-index:3;
                    top: 50%;
                    left: 50%;
                    display:none;
                    transform: translate(-50%, -50%);
                    transition:all 0.3s ease-out;
                }
                .heightCalc{
                    width:calc(50% - 2.4rem);
                }
                .heightCalcWrapper{
                    z-index: 1;
                    top: 0;
                    width: 100%;   
                }
                .fadeIn .textOnImg{
                    display:block;
                }
                .unlock .textOnImg{
                    transform:translate(-50%, -55%);
                    opacity:0;
                }
                .productDetails{
                    display:flex;
                    justify-content: space-between;
                    margin-top:1.6rem;
                }
                .productName{
                    margin-bottom:0.8rem;
                    opacity:0;
                    animation:textFadeInAnimation 0.5s ease-out 1.5s forwards;
                }
                .productPrice{
                    letter-spacing: 0.6px;
                    opacity:0;
                    animation:textFadeInAnimation 0.5s ease-out 1.7s forwards;
                }
                .link{
                    opacity:0;
                    animation:textFadeInAnimation 0.5s ease-out 1.5s forwards;
                }
                .link a{
                    letter-spacing:1px;
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
                .link a{
                    margin-right:0.8rem;
                }
                .favouriteIcon{
                    position: absolute;
                    top: 3.2rem;
                    right: 3.2rem;
                    z-index: 2;
                }
                
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(unlockingProductModuleDesktop)