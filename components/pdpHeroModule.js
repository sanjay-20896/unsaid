import React, { useState,useEffect, useRef } from 'react'
import Link from 'next/link'
import Colors from '../components/colors'
import Caret from '../components/caret'
import Head from 'next/head'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux'
import Loader from './loader'
import CustomizeViews from './diamondAndColorCustomisationTemplate'
import {setCustomizeWindow} from '../redux/actions'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import {getPriceBasedOnSelection} from '../functions'
function pdpHeroModule(props) {
    const [imgLoaded, setImgLoaded] = useState(false)
    const [img3d, setimg3d] = useState(false)
    const [loader, setLoader] = useState(false)
    const [customViews, setCustomViews] = useState(false)
    const [sizeDropDown, setSizeDropDown] = useState(false)
    const [mainSize, setMainSize] = useState(44)
    const [sirvReady,setSirvReady] = useState(false)

    const img3dRef=useRef();

    const desc="The sentimental design of the striking diamond ring evokes a place where you will always find love and comfort."
    useEffect(()=>{
        let timer;
        if(imgLoaded){
            timer = setTimeout(() => {
                setimg3d(true)
            }, 1000);
        }
        return () => {clearTimeout(timer)};
    },[imgLoaded])
    useEffect(()=>{
        if(props.common.customWindow){
            setCustomViews(true)
        }
    },[props.common.customWindow])

    function sirvIsReady(){
        setSirvReady(true)
    }
    function pause3d(){
        if(sirvReady)
        Sirv.instance('ring').pause()
    }
    useEffect(()=>{
        window.addEventListener('sirvready',sirvIsReady)
        return ()=>{
            window.removeEventListener('sirvready',sirvIsReady)
        }
    },[])
    useEffect(()=>{
        setMainSize(props.sizeValue);
    },[props.sizeValue])

    useEffect(()=>{
        props.sizeUpdateInFeatures(mainSize)
    },[mainSize])
    return (
        <div>
            <Head>
                {/* <title>Unsaid</title>
                <link rel="icon" href="/favicon.ico" /> */}
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        var SirvOptions = {
                        spin: {
                            onready: function (spin) { 
                                const event = new Event('sirvready');
                                window.dispatchEvent(event);
                            }
                        }
                    };
                  `,
                }}
                ></script>
                <script src="https://scripts.sirv.com/sirv.js"></script>
            </Head>
            <main className={`pdpHeroModuleWrapper paddedContent ${imgLoaded?"mainImagesLoaded":""} ${customViews?"customViewsShow":""}`}>
                <div className="firstCol positionRelative">
                    {img3d &&
                        <div ref={img3dRef} className="ring-wrapper positionRelative" onMouseMove={()=>pause3d()}>
                            <div id="ring" className="Sirv" data-src="https://seepossible-wm.sirv.com/Spins/unsaid-ring/unsaid-ring.spin?&spin=hover&autospin=infinite&fullscreen=false&hint=false"></div>
                            <div className="removeWaterMark"></div>
                        </div>}
                    {!sirvReady &&
                        <div className="productImg">
                            <LazyLoadImage
                                alt={"Product image"}
                                effect="opacity"
                                src={props.mainProductImg}
                                width="100%"
                                afterLoad={()=>setImgLoaded(true)}
                            />
                        </div>
                    }
                    <div className="icon3dMobile showForMobile"><img src="/images/3DMobile.png" alt="3D-Icon"/></div>
                </div>

                <div className="productDesc alignCenter">
                    <h2 style={{animationDelay:"0.7s"}} className="subHeading font20 anoHalfRegular">Possible to engrave</h2>
                    <h1 style={{animationDelay:"0.8s"}} className="heading font32 canelaThin">Nest Diamond Cluster Ring</h1>
                    <h3 style={{animationDelay:"0.9s"}} className="desc font16 anoHalfRegular hideForMobile">{desc} <Link href="#"><a>See more details</a></Link></h3>
                    {props.customized?
                        <div onClick={()=>setCustomViews(true)} style={{animationDelay:"1s"}} className="customiseButton"><button className="btnSecondary anoRegular font20">Customise</button></div>
                    :
                        <div style={{animationDelay:"1s"}} className="colorPalete"><Colors showColorName={true} colors={["#EAC786","#D5D1D1","#F2C2A4"]} colorSize="2rem" marginRight="1.6rem" marginBottom="1.6rem"/></div>}
                    <div style={{animationDelay:"1.1s"}} className={`sizeWrap positionRelative ${sizeDropDown?"showSizes":""}`}>
                        <div className={`sizeContainer  font16 anoRegular `}>
                            <div onClick={()=>setSizeDropDown(!sizeDropDown)} className="size">
                                <span>Size: {mainSize}</span>
                                <span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.4rem"/></span>
                            </div>
                        </div>
                        <ul className="sizeDropDown font16 anoRegular listStyleNone pl0">
                            {props.sizes.sizes.map((size,index)=>{
                                return(
                                    <>
                                        {mainSize===size.size ?"": <li onClick={()=>{setMainSize(size.size),setSizeDropDown(false)}} key={index} className={`sizeSingle`}>{size.size}</li>}
                                    </>
                                )
                            })}
                        </ul>
                        <div onClick={()=>props.sizeGuideOpen()} className="sizeGuide underlineLR active font16 anoRegular">
                            Size guide
                        </div>
                    </div>
                    <div style={{animationDelay:"1.2s"}} className="addToCart">
                        <Link href="/gifting"><a><button className="btnPrimary font20 anoRegular">€3,500 – Add to cart</button></a></Link>
                        <img src="/images/favourite.svg" alt='favourite icon'/>
                    </div>
                    <h4 style={{animationDelay:"1.3s"}} className="shippingDetail anoRegular"><span>Responsibly made lab-grown diamonds.</span><br/> <span className="grey ship">Ships by April 5th, from our </span><span>Belgium studio.</span></h4>
                </div>
                <div className={`customViews`}>
                    {customViews && 
                    <CustomizeViews 
                        device={props.device}
                        hideCustomWindow={()=>{setCustomViews(false),props.setCustomizeWindow(false)}}
                        mainImg="/images/emptyRing.png"
                        emptyRing="/images/er.png"
                        mainRingImages={["/images/r1.png","/images/r2.png","/images/r3.png","/images/r4.png","/images/r5.png"]}
                        customDiamonds={["/images/s1.png","/images/s2.png","/images/s3.png","/images/s4.png","/images/s5.png"]}
                        customColors={["/images/color1.png","/images/color2.png","/images/color3.png"]}
                    />}
                </div>
            </main>   
         <style jsx>{`
            .pdpHeroModuleWrapper{
                display:flex;
                padding-top:8rem;
                align-items:center;
                margin-bottom:2.5rem;
                height:100vh;
            }
            .sizeSingle{
                padding-left: 26px;
                margin-bottom:0.8rem;
                cursor:pointer;
            }
            .sizeSingle:hover{
                background: #D8D8D8 0% 0% no-repeat padding-box;
            }
            .showSizes .sizeDropDown{
                height:128px;
                overflow-y:scroll;
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .sizeDropDown::-webkit-scrollbar {
                display: none;
            }
            .sizeDropDown{
                height:0;
                overflow:hidden;
                width: 8rem;
                position: absolute;
                background: #ffffff;
                top: 13px;
                left: 50%;
                transform: translateX(-122%);
                transition:all 0.3s ease-out;
            }
            .firstCol{
                height:100%;
            }
            .customViews{
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9;
                background: white;
                width:100%;
                height:100vh;
                overflow-y:scroll;
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
                transform:translateY(-100%);
                transition:all 0.3s ease-out;
            }
            .customViewsShow .customViews{
                transform:translateY(0%);
            }
            .customViews::-webkit-scrollbar {
                display: none;
            }
            .loader{
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%, -50%);
            }
            .removeWaterMark{
                position: absolute;
                width: 11rem;
                height: 4rem;
                background: #ffffff;
                bottom: 0px;
                right: 0;
                z-index: 9;
            }
            .ring-wrapper:hover, .productImg:hover{
                cursor: url("/images/3D.svg"), auto !important;
            }
            .customiseButton{
                margin-bottom:4.8rem;
            }
            .productImg{
                position:absolute;
                top:0;
                left:0;
                width:100%;
                transform:translateX(3rem);
                opacity:0;
                //cursor: -moz-zoom-in; 
                //cursor: -webkit-zoom-in; 
                //cursor: zoom-in;               
                //transition: opacity .5s cubic-bezier(.645,.045,.355,1);
                transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .1s,transform 1.2s cubic-bezier(.215,.61,.355,1) .1s;
            }
            .mainImagesLoaded .productImg{
                opacity:1;
                transform:translateX(0rem);
            }
            .productDesc{
                padding:0 8%;
            }
            .productDesc > *{
                opacity:0;
            }
            .productDesc > *{
                animation:fadeIn 1.2s cubic-bezier(.215,.61,.355,1) forwards 1s;
            }
            .shippingDetail{
                letter-spacing:1px;
                font-size:1.2rem;
                line-height: 2.5rem;
                //margin-left:-3.5rem;
            }
            .shippingDetail span{
                text-decoration:underline;
            }
            .shippingDetail span.ship{
                text-decoration:none;
            }
            .addToCart{
                display:flex;
                justify-content: center;
                align-items: center;
                margin-bottom:1.6rem;
                margin-left:35.3px;
            }
            .addToCart button{
                margin-right:11.5px;
            }
            .size{
                margin-right:3.2rem;
                cursor:pointer;
            }
            .sizeWrap{
                z-index:9;
                display:flex;
                justify-content: center;
                margin-bottom:3.2rem;
            }
            .ring-wrapper{
                width:100%;
            }
            .firstCol, .productDesc{
                width:50%;
            }
            .subHeading{
                margin-bottom:3.2rem;
            }
            .heading{
                margin-bottom:2.4rem;
            }
            .desc{
                margin-bottom:3.2rem;
                line-height:2.4rem;
            }
            .desc a{
                text-decoration:underline;
            }
            .colorPalete{
                margin-bottom:4.8rem;
            }
            .sizeArrow{
                margin-left:0.8rem;
            }
            @keyframes fadeIn{ 
                from{
                    opacity:0;
                    transform:translateY(1rem);
                }
                to{
                    opacity:1;
                    transform:translateY(0);
                }
            }
            @keyframes opacity{
                from{
                    opacity:0;
                }
                to{
                    opacity:1;
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                .desc{
                    width: 70%;
                    margin-right: auto;
                    margin-left: auto;
                }
                .pdpHeroModuleWrapper{
                    display:block;
                    height:auto;
                    padding-top:5.6rem;
                    margin-bottom:0rem;
                }
                .icon3dMobile{
                    position:absolute;
                    bottom:-3rem;
                    left:50%;
                    z-index: 9;
                    transform:translateX(-50%);
                    opacity:0;
                    animation:opacity 0.3s ease-out 0.8s forwards;
                }
                .customiseButton{
                    margin-bottom:3.2rem;
                }
                .firstCol, .productDesc{
                    width:100%;
                }
                .firstCol{
                    min-height:303px;
                    margin-bottom:0;
                    margin-top: 45px;
                }
                .productImg{
                    position:absolute;
                    top:0;
                    left:0;
                    width:303px;
                }
                .subHeading{
                    margin-bottom:1.6rem;
                    font-size:1.2rem;
                }
                .heading{
                    font-size:2.4rem;
                    margin-bottom:${props.customized?"3.2rem":"2.4rem"};
                }
                .productDesc{
                    padding:0 0%;
                }
                .colorPalete{
                    margin-bottom:3.2rem;
                }
                .size{
                    margin-right:2.4rem;
                }
                .addToCart{
                    margin-bottom:1.6rem;
                    margin-left:0px;
                }
                .addToCart button{
                    margin-right:1.6rem;
                    width:100%;
                }  
                .firstCol{
                    height:auto;
                }
                .sizeDropDown{
                    transform: translateX(-110%);
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .firstCol{
                    margin-bottom:2.4rem;
                }
                .pdpHeroModuleWrapper{
                    height:auto;
                }
                .customViews{
                    height:${props.common.windowHeight2?`${props.common.windowHeight2}px`:"100vh"};
                }
                
            }
         `}</style>
        </div>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,{setCustomizeWindow})(pdpHeroModule)