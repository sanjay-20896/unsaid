import React from 'react'
import ThreeStepText from './threeStepText'
import SingleProduct from './singleProduct'
import {connect} from 'react-redux'
import { FIXING_BUFFER_MOBILE } from '../config'
function unlockingProductModule(props) {
    return (
        <>
            <div className={`positionRelative productModule ${props.fixedModule?"fixedModule":""} ${props.class=="fadeIn"?"fadeIn":""} ${props.class=="unlock"?"unlock":""} container`}>
                <div className="lockedImg"></div>
                <div className="textOnImg white  positionAbsolute">
                    <ThreeStepText lockState={true} fadeIn={true} smallText="The art of timelessness" largeText="Meet our modern classics" desc="Each carefully considered piece is forged from emotions that transcend time, captured in the glimmer of gold, diamonds, and precious gemstones"/>
                </div>
                <SingleProduct device="mobile" img1="/images/product-1a.jpg" img2="/images/product-1b.jpg" firstProduct={true} slideIndex={1} productName="Product name" productPrice="€1,250" viewProductSection="View all necklaces" productSectionLink="#"/>
            </div>
            <style jsx>{`
                .container{
                    height:${props.unlockedSection?"100vh":`calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`};
                }
                .container.fixedModule{
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
                    transition: all 0.5s ease-out 0.4s;
                    height:${props.unlockedSection?"100vh":`calc(${props.common.windowHeight2}px - ${props.common.navHeight}px)`};
                }
                .unlock .lockedImg{
                    height: 323px;
                    margin-left: 3.6rem;
                    width: calc(100% - 5.2rem);
                }
                .textOnImg{
                    width:calc(100% - 6.4rem);
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
