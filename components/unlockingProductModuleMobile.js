import {useState,useRef,useEffect} from 'react'
import ThreeStepText from './threeStepText'

import {connect} from 'react-redux'
import { FIXING_BUFFER_MOBILE } from '../config'
function unlockingProductModule(props) {
    const [imgContainerHeight,setImgContainerHeight] = useState(0)
    const heightCalc = useRef(null)
    useEffect(()=>{
        setImgContainerHeight(`${heightCalc.current.getBoundingClientRect().width}px`)
    },[])
    return (
        <>
            <div className={`positionRelative ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="unlock"?"unlock":""} container`}>
                <div className="lockedImg"></div>
                <div className="textOnImg white  positionAbsolute">
                    <ThreeStepText lockState={true} fadeIn={true} smallText="The art of timelessness" largeText="Meet our modern classics" desc="Each carefully considered piece is forged from emotions that transcend time, captured in the glimmer of gold, diamonds, and precious gemstones"/>
                </div>
                <div className="paddedContent heightCalcWrapper positionAbsolute">
                    <div className="heightCalc" ref={heightCalc}></div>
                </div>
            </div>
            <style jsx>{`
                .container{
                    height:calc(${props.common.windowHeight2}px - ${props.common.navHeight}px);
                    transition: transform 0.5s ease-out;
                    transform: translateY(${FIXING_BUFFER_MOBILE}px);
                }
                .container.fadeIn{
                    transform: translateY(0);
                }
                .container.unlock{
                    transform: translateY(0);
                }
                .lockedImg{
                    position:absolute;
                    z-index:4;
                    width:100%;
                    background-image: url(${props.img1});
                    background-size:cover;
                    background-position:center center;
                    transition: all 0.5s ease-out 0.4s;
                    height:calc(${props.common.windowHeight2}px - ${props.common.navHeight}px);
                }
                .unlock .lockedImg{
                    height: ${imgContainerHeight?imgContainerHeight:"323px"};
                    margin-left: 3.6rem;
                    width: calc(100% - 5.2rem);
                }
                .heightCalc{
                    width:calc(100% - 1.6rem);
                }
                .heightCalcWrapper{
                    z-index: 1;
                    top: 0;
                    width: 100%;   
                }
                .textOnImg{
                    z-index:5;
                    top: 50%;
                    left: 50%;
                    display:none;
                    transform: translate(-50%, -50%);
                    transition:all 0.3s ease-out;
                }
                .fadeIn .textOnImg{
                    display:block;
                }
                .unlock .textOnImg{
                    transform:translate(-50%, -55%);
                    opacity:0;
                    pointer-events: none;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(unlockingProductModule)
