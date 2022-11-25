import React, {useState} from 'react'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'

export default function productTagging(props) {
    const [hotspotActive, setHotspotActive] = useState(false)
    return (
        <>
            <div onClick={()=>setHotspotActive(!hotspotActive)} className={`productTag ${props.rightCorner?"rightCorner":""} ${hotspotActive?"hotspotActive":""}`}>
                <div className="symbolContainer positionRelative">
                    <div className="productInfo anoRegular white">
                        <div className="name font20">{props.productName}</div>
                        <div className="price font16">{props.productPrice}</div>
                    </div>
                </div>
            </div>   
            <style jsx>{`
                .price{
                    letter-spacing:1px;
                }
                .productTag .productInfo{
                    position:absolute;
                    width: max-content;
                    left: 6.4rem;
                    top: 0;
                    opacity:0;
                    transform:translateY(-1rem);
                    pointer-events:none;
                    z-index:-9;
                    transition:all 0.3s ease-out;
                }
                .productTag.rightCorner .productInfo{
                    left:-25rem;
                }
                .productTag:hover .productInfo{
                    opacity:1;
                    transform:translateY(0);
                    pointer-events:auto;
                    z-index:9;
                }
                .productTag{
                    position:absolute;
                    left:calc(${props.positionFromLeft} - 2.4rem);
                    top:calc(${props.positionFromTop} - 2.4rem);
                    height: 4.8rem;
                    width: 4.8rem;
                    border:0.1rem solid #FFFFFF;
                    border-radius:50%;
                    cursor:pointer;
                }
                .symbolContainer{
                    position:relative;
                    height:100%;
                    width:100%;
                }
                .symbolContainer::after{
                    position:absolute;
                    content:"";
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                    height:1px;
                    width:2.4rem;
                    background:#FFFFFF;
                    transition:all 0.3s ease-out;
                }
                .symbolContainer::before{
                    position:absolute;
                    content:"";
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                    height:2.4rem;
                    width:1px;
                    background:#FFFFFF;
                    transition:all 0.3s ease-out;
                }
                .symbolContainer:hover::after{
                    opacity:0;
                } 
                .symbolContainer:hover::before{
                    transform:rotate(90deg) translateX(-1.25rem);
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .productTag{
                        height: 4.1rem;
                        width: 4.1rem;
                        left:calc(${props.positionFromLeft} - 2.05rem);
                        top:calc(${props.positionFromTop} - 2.05rem);
                    }
                    .symbolContainer::after{
                        width:2rem;
                    }
                    .symbolContainer::before{
                        height:2rem;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .productTag{
                        height: 3.73rem;
                        width: 3.73rem;
                        left:calc(${props.positionFromLeft} - 1.865rem);
                        top:calc(${props.positionFromTop} - 1.865rem);
                    }
                    .symbolContainer::after{
                        width:1.81rem;
                    }
                    .symbolContainer::before{
                        height:1.81rem;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .productInfo{
                        width: max-content;
                    }
                    .productTag .productInfo{
                        left: 4rem;
                        top: -0.5rem;
                    }
                    .name{
                        width: 8rem;
                    }
                    .productTag.rightCorner .productInfo{
                        left:-10rem;
                    }
                    .productTag{
                        height:3.2rem;
                        width:3.2rem;
                        left:calc(${props.positionFromLeft} - 1.6rem);
                        top:calc(${props.positionFromTop} - 1.6rem);
                    }
                    .symbolContainer::after{
                        width:1.6rem;
                    }
                    .symbolContainer::before{
                        height:1.6rem;
                    }
                    .symbolContainer:hover::before{
                        transform:rotate(90deg) translateX(-0.85rem);
                    } 
                    .productTag:hover .productInfo{
                        opacity:0;
                        transform:translateY(-1rem);
                        pointer-events:none;
                        z-index:-9;
                    }  
                    .productTag.hotspotActive .productInfo{
                        opacity:1;
                        transform:translateY(0);
                        pointer-events:auto;
                        z-index:9;
                    }
                    .symbolContainer:hover::after{
                        opacity:1;
                    }
                    .productTag.hotspotActive .symbolContainer::after{
                        opacity:0;
                    }
                    .symbolContainer:hover::before{
                        transform:translate(-50%,-50%);
                    } 
                    .productTag.hotspotActive .symbolContainer::before{
                        transform:rotate(90deg) translateX(-0.85rem);
                    }
                    .productTag:hover .productInfo{
                        opacity:0;
                        transform:translateY(-1rem);
                        pointer-events:none;
                        z-index:-9;
                    }  
                    .productTag.hotspotActive .productInfo{
                        opacity:1;
                        transform:translateY(0);
                        pointer-events:auto;
                        z-index:9;
                    }
                }
            `}</style>
        </>
    )
}
