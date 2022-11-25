import {MOBILE_BREAKPOINT} from '../config'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {showExploreMenu} from "./../redux/actions"
import LazyImage from './lazyImage';
function Tier2DefaultComponent(props){
    // console.log("tier2Default comp",props)
    const [imgHeight, setImgHeight] = useState("auto");
    
    let imageHeight = props.common.windowHeight - (160 + 48 + 48);

    useEffect(() => {
        // if(imageHeight <= 580){
        //     setImgHeight(imageHeight)
        // }else{
        //     setImgHeight("auto");
        // }
        setImgHeight(imageHeight)
    }, [imageHeight])

    return (
        <>
            <div className={`alignCenter fadeInAnimationNew defaultImg1 ${imageHeight <= 495 ?"smallScreens":""}`}>
                <Link href={!!props?.defaultItems?.link ? props.defaultItems.link :"#"}><a onClick={()=>{props.showExploreMenu(false)}}>
                <div style={{height:imgHeight,overflow:"hidden"}} className="storeImg">
                                        <LazyImage
                                        alt="Product image"
                                        originalSrc={props?.defaultItems?.img}
                                        width={233}
                                        height={396}/>
                    {/* <img className="width-100" src={props?.defaultItems?.img}/> */}
                </div>
                <div className="storeName canelaThin font20">{props?.defaultItems?.title}</div>
                </a></Link>
            </div>
            <style jsx>{`
                // .defaultImg1{
                //     opacity:0;
                //     animation:fadeUpAnimation 0.15s ease-out forwards ${props.noAnimationDelay?"0s":"0.2s"}; 
                // }
                .storeImg{
                    overflow:hidden;
                    padding-right:0rem;
                    margin-bottom:4.8rem;
                }
                .smallScreens .storeImg{
                    position:relative;
                }
                .smallScreens .storeImg img{
                    position:absolute;
                    left:0;
                    top:50%;
                    transform:translateY(-50%);
                }
                @keyframes fadeUpAnimation{
                    0% {
                        opacity:0;
                        transform-origin:bottom;
                        transform: translateY(15px);
                    }
                    100% {
                        opacity:1;
                        transform-origin:top;
                        -webkit-backface-visibility: hidden;
                        backface-visibility: hidden;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{showExploreMenu})(Tier2DefaultComponent)