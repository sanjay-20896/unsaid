import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useEffect, useState,useRef} from 'react'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'

export default function ProductTagging(props) {
    const [hotspotActive, setHotspotActive] = useState(false)
    let router=useRouter()
    function click(){
        if(hotspotActive)
            router.push(`/products/${props.productUri}`)
        setHotspotActive(true)
    }
    function mouseEnter(){
        if(window.innerWidth > MOBILE_BREAKPOINT)
            setHotspotActive(true)
    }
    function mouseLeave(){
        if(window.innerWidth > MOBILE_BREAKPOINT)
            setHotspotActive(false)
    }
    const productTag=useRef(null);
    useEffect(()=>{
        function handleClickOutside(event){
            if(productTag.current && !productTag.current.contains(event.target)){
                setHotspotActive(false)
            }
        }
        document.addEventListener("mousedown",handleClickOutside)
        return ()=>{
            document.removeEventListener("mousedown",handleClickOutside)
        }
    },[])
    return (
            <>
                <div ref={productTag} onMouseEnter={()=>mouseEnter()} onMouseLeave={()=>mouseLeave()} onClick={()=>click()} style={{left:`calc(${props.positionFromLeft} - 1.2rem)`,top:`calc(${props.positionFromTop} - 1.2rem)`}} className={`productTag ${hotspotActive?"hover":""} ${props.textAppearance=="below"?"belowAppear":""} ${props.textAppearance=="below-left"?"belowLeft":""} ${props.textAppearance=="above-left"?"aboveLeft":""} ${props.textAppearance=="above"?"aboveAppear":""}  ${props.textAppearance=="left"?"leftAppear":""} ${hotspotActive?"hotspotActive":""} ${!!props.textColorBlack && props.textColorBlack?"blackHotspot":""}`} key={props.key}>
                    <div className="symbolContainer positionRelative">
                        {!!props.textColorBlack ?
                            <div className="shopIcon"><img src="/images/shopHotspotBlack.svg" alt='shop icon'/></div>
                            :
                            <div className="shopIcon"><img src="/images/shopHotspot.svg" alt='shop icon'/></div>
                        }
                        <div className={`productInfo anoRegular ${!!props.textColorBlack && props.textColorBlack?"black bolderBlack":"white"}`} onClick={()=>click()}>
                            <div className="name font16-notResponsive">{props.productName}</div>
                            <div className="price">{props.productPrice}</div>
                        </div>
                        <div className="hitSpace positionAbsolute"></div>
                    </div>
                </div>
                <style jsx>{`
                    .price{
                        letter-spacing:1px;
                        font-size:1.4rem;
                        line-height:2.1rem;
                    }
                    .hitSpace{
                        display:none;
                    }
                    .symbolContainer::after{
                        position:absolute;
                        background: black;
                        width: 4.4rem;
                        height: 4.4rem;
                        top:0;
                        left: 0;
                        transform: translate(-50%, -50%);
                    }
                    .bolderBlack{
                        font-weight: bolder;
                    }
                    .productTag .productInfo{
                        position:absolute;
                        width: ${!!props.width?`${props.width}px`:"max-content"};
                        left: 2.7rem;
                        padding-left: 1rem;
                        top: 0;
                        opacity:0;
                        transform:translateY(-1rem);
                        pointer-events:none;
                        z-index:-9;
                        transition:all 0.3s ease-out;
                    }
                    .productTag.leftAppear .productInfo{
                        left: auto;
                        right:0rem;
                        text-align: right;
                        padding-right:4rem;
                    }
                    .productTag.aboveLeft .productInfo{
                        top:auto;
                        left:auto;
                        bottom:17px;
                        padding-bottom: 1rem;
                        right: 0rem;
                        padding-left: 1rem;
                        text-align: right;
                    }
                    .productTag.aboveAppear .productInfo{
                        //top: -5rem;
                        top:auto;
                        bottom:17px;
                        padding-bottom: 1rem;
                        left: 0rem;
                        padding-left: 1rem;
                    }
                    .productTag.belowAppear .productInfo{
                        top: 2.5rem;
                        left: 0;
                        padding-top: 1rem;
                        padding-left:1rem;
                    }
                    .productTag.belowLeft .productInfo{
                        text-align: right;
                        top: 2rem;
                        right: 0rem;
                        left: auto;
                        padding-top: 1rem;
                        padding-left:0;
                        padding-right:1rem;
                    }
                    .hover .productInfo{
                        opacity:1;
                        transform:translateY(0);
                        pointer-events:auto;
                        z-index:9;
                    }
                    .productTag{
                        position:absolute;
                        height: 2.4rem;
                        width: 2.4rem;
                        border:0.1rem solid #FFFFFF;
                        border-radius:50%;
                        cursor:pointer;
                        z-index:2;
                    }
                    .productTag.blackHotspot{
                        border:0.1rem solid #000000;
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
                        width:1.2rem;
                        background:#FFFFFF;
                        transition:all 0.3s ease-out;
                    }
                    .symbolContainer::before{
                        position:absolute;
                        content:"";
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                        height:1.2rem;
                        width:1px;
                        background:#FFFFFF;
                        transition:all 0.3s ease-out;
                    }
                    .blackHotspot .symbolContainer::after,
                    .blackHotspot .symbolContainer::before{
                        background:#000000;
                    }
                    .shopIcon{
                        width:100%;
                        height:100%;
                        opacity:0;
                        transition:all 0.3s ease-out;
                    }    
                    .shopIcon,.productInfo{
                        pointer-events:none;
                    }
                    .hover .shopIcon,.hover .productInfo{
                        pointer-events:auto;
                    }
                    .shopIcon img{
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                        width:1.2rem;
                    }
                    .hover .shopIcon{
                        opacity:1;
                    }
                    .hover .symbolContainer::after{
                        opacity:0;
                    } 
                    .hover .symbolContainer::before{
                        opacity:0;
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .shopIcon img{
                            width: 1.2rem;
                        }
                        .hitSpace{
                            display: block;
                            top: 50%;
                            left: 50%;
                            background: transparent;
                            transform: translate(-50%,-50%);
                            width: 200%;
                            height: 200%;
                            z-index: -9;
                        }
                        .productInfo{
                            width: max-content;
                        }
                        .productTag .productInfo{
                            left: 4rem;
                            top: -0.5rem;
                        }
                        .productTag.leftAppear .productInfo{
                            left:auto;
                            right:4.5rem;
                            padding-right:0;
                        }
                        .productTag.aboveAppear .productInfo{
                            //top: -5rem;
                            left:0rem;
                            top:auto;
                            bottom:17px;
                        }
                        .productTag.belowAppear .productInfo{
                            top: 2rem;
                            left:0rem;
                        }
                        .productTag.belowLeft .productInfo{
                            top: 2rem;
                            left:auto;
                            right:0;
                        }
                        .productTag{
                            height:2.4rem;
                            width:2.4rem;
                        }
                        .symbolContainer::after{
                            width:1.2rem;
                        }
                        .symbolContainer::before{
                            height:1.2rem;
                        }
                        .productTag.hotspotActive .productInfo{
                            opacity:1;
                            transform:translateY(0);
                            pointer-events:auto;
                            z-index:9;
                            padding-left: 0;
                        }
                        .symbolContainer:hover::before{
                            transform:translate(-50%,-50%);
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
