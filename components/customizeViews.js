import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {MOBILE_BREAKPOINT} from '../config'
import SwipeableViews from 'react-swipeable-views';


function customizeViews(props) {
    const [transform, setTransform] = useState(props.device==="mobile"?0:0)
    const [transform2, setTransform2] = useState(0)
    const [stones, setStones] = useState(3)
    const [customColor, setCustomColor] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(1)
    const [currentIndex2, setCurrentIndex2] = useState(2)
    const [currentPrice, setCurrentPrice] = useState(3999)
    const [indexSlider, setIndexSlider] = useState(1)
    const [indexSlider2, setIndexSlider2] = useState(1)
    const [imagesHeight, setImageHeight] = useState(351)

   
    let handleChangeIndex = index => {
        setIndexSlider(index)
      }
    let handleChangeIndex2 = index => {
        setIndexSlider2(index)
      }
    let springConfig={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }

    
    let stone1=1999;
    let stone2=2999;
    let stone3=3999;
    let stone4=4999;
    let stone5=5999;
    
    
    
    function translate(id){
        setCurrentIndex2(id)
        if(id===0){
            setTransform(40)
            setStones(1)
            for (let i = 1000; i < stone1; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
              }
        }
        if(id===1){
            setTransform(20)
            setStones(2)
            for (let i = stone1; i < stone2; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
              }
        }
        if(id===2){
            if(props.device==="mobile"){
                setTransform(0)
            }else{
                setTransform(0)
            }
            
            setStones(3)
            for (let i = stone2; i < stone3; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
              }
        }
        if(id===3){
            setTransform(-20)
            setStones(4)
            for (let i = stone3; i < stone4; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
              }
        }
        if(id===4){
            setTransform(-40)
            setStones(5)
            for (let i = stone4; i < stone5; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
              }
        }
    }

    function selectCustomColor(id){
        setCurrentIndex(id)
        setIndexSlider(id)
        if(id===0){
            setTransform2(33.33)
            for (let i = stone3; i < stone4; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
            }
        }
        if(id===1){
            setTransform2(0)
            for (let i = stone4; i < stone5; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
            }
        }
        if(id===2){
            setTransform2(-33.33)
            for (let i = stone2; i < stone3; i++) {
                setTimeout(()=>{
                    setCurrentPrice(i)
                },100)
            }
        }
    }


    return (
        <>
         <div className={`container ${customColor?"customColorActive":""}`}>
            <div className="firstWindow">
                <div className="positionRelative alignCenter">
                    <div className="mainImg positionRelative">
                        {/* <LazyLoadImage
                            alt={"Product image"}
                            effect="opacity"
                            src={props.mainImg}
                            width="100%"
                        /> */}
                        <h1 className="productName showForMobile canelaThin font16-notResponsive">Nest Diamond Ring no. 3</h1>
                        <div className="emptyRing"><img src={props.emptyRing} className="mainEmptyRingImg width-100"/></div>
                        <div className="hideForMobile">
                            <div className="diamondCountAndColor">
                                <div onClick={()=>setCustomColor(false)} className="diamondCountContainer positionRelative">
                                    <div className="diamondCount">
                                        <div><img className="width-100" src={`${customColor?"/images/diamondIconBlack.svg":"/images/DiamondIcon.svg"}`}/></div>
                                        <div className="count anoRegular">{stones}</div>
                                    </div>
                                </div>
                                <div onClick={()=>setCustomColor(true)} className="colorName">
                                    <div className="colorSymbol positionRelative"><div></div></div>
                                    <div className="label anoRegular">Yellow gold</div>
                                </div>
                                <div className="blackBg"></div>
                            </div>
                        </div>
                    </div>
                    {props.device==="desktop" &&
                        <div className="customLine hideForMobile">
                            <div className="customStones">
                                {props.customDiamonds.map((stone, index)=>{
                                    return(
                                        <div onClick={()=>translate(index)} className={`stone ${currentIndex2===index?"currentStone":""}`}><img className="width-100" src={stone}/></div>
                                    )
                                })}
                            </div>
                        </div>
                    }
                    {props.device==="mobile" &&
                        <div className="customLine showForMobile mobile">
                            <SwipeableViews style={{padding:"0 12rem 0 12rem"}} slideStyle={{padding:"0 0 0 0"}} index={indexSlider2} onChangeIndex={()=>handleChangeIndex2} springConfig={springConfig}>
                                {props.customDiamonds.map((stone, index)=>{
                                    return(
                                        <div onClick={()=>setIndexSlider2(index)} className={`stone ${indexSlider2===index?"currentStone":""}`}><img className="width-100" src={stone}/></div>
                                    )
                                })}
                            </SwipeableViews>
                        </div>
                    }
                </div>
                {/* {props.device==="desktop" &&
                    props.mainRingImages.map((mainImg,index)=>{
                        return(

                        )
                    }) 
                } */}
                <div className={`mainRing ${currentIndex2===0?"active":""} ${indexSlider2===0?"activeInMobile":""}`}><img className="width-100" src={props.mainRingImages[0]}/></div>
                <div className={`mainRing ${currentIndex2===1?"active":""} ${indexSlider2===1?"activeInMobile":""}`}><img className="width-100" src={props.mainRingImages[1]}/></div>
                <div className={`mainRing ${currentIndex2===2?"active":""} ${indexSlider2===2?"activeInMobile":""}`}><img className="width-100" src={props.mainRingImages[2]}/></div>
                <div className={`mainRing ${currentIndex2===3?"active":""} ${indexSlider2===3?"activeInMobile":""}`}><img className="width-100" src={props.mainRingImages[3]}/></div>
                <div className={`mainRing ${currentIndex2===4?"active":""} ${indexSlider2===4?"activeInMobile":""}`}><img className="width-100" src={props.mainRingImages[4]}/></div>
                
                <div className="customColorSection">
                    {props.device==="desktop" ?
                        <div className="colorTransform">
                            {props.customColors.map((colorImg,index)=>{
                                return(
                                    <div className={`colorImage ${currentIndex===index?"current":""}`} onClick={()=>selectCustomColor(index)}><img className="width-100" src={colorImg}/></div>
                                )
                            })}
                        </div>
                    :
                    <div className="colorTransform2">
                        <SwipeableViews style={{padding:"0 10rem 0 10rem"}} slideStyle={{padding:"0 0 0 0"}} index={indexSlider} onChangeIndex={()=>handleChangeIndex} springConfig={springConfig}>
                            {props.customColors.map((colorImg,index1)=>{
                                return(
                                    <div className={`colorImage ${indexSlider===index1?"current":""}`} onClick={()=>selectCustomColor(index1)}><img className="width-100" src={colorImg}/></div>
                                )
                            })}
                        </SwipeableViews>
                    </div>}
                </div>
                <div className="contentSection alignCenter">
                    <div className="details">
                        <h1 className="title canelaThin font24 hideForMobile">{customColor?"Select the gold that speaks to you":"Sprinkle it with diamonds"}</h1>
                        <h1 className="title canelaThin font24 showForMobile">{customColor?"Which gold speaks to you?":"Sprinkle it with diamonds"}</h1>
                        <h3 className="priceLine anoHalfRegular font16"><span className="anoRegular">{customColor?"18k yellow gold.":"€1,300"}</span> {!customColor && "Three brilliant cut diamonds."}</h3>
                        <h3 className="caretDetails anoHalfRegular font16">{customColor?"11.50 mm diameter gold disc, 2 mm round gold band.":"0.15 + 0.25 + 0.35 carat."}</h3>
                    </div>
                    <div className="showForMobile">
                        <div className="diamondCountAndColor">
                            <div onClick={()=>setCustomColor(false)} className="diamondCountContainer positionRelative">
                                <div className="diamondCount">
                                    <div><img className="width-100" src={`${customColor?"/images/diamondIconBlack.svg":"/images/DiamondIcon.svg"}`}/></div>
                                    <div className="count anoRegular">{stones}</div>
                                </div>
                            </div>
                            <div onClick={()=>setCustomColor(true)} className="colorName">
                                <div className="colorSymbol positionRelative"><div></div></div>
                                <div className="label anoRegular">Yellow gold</div>
                            </div>
                            <div className="blackBg"></div>
                        </div>
                    </div>
                    <div className="bottomLine paddedContent positionRelative">
                        <h1 className="canelaThin font20 hideForMobile">[Product Name]</h1>
                        <div className="buttons">
                            <div onClick={props.hideCustomWindow}><button className="first btnPrimary anoRegular">Confirm</button></div>
                            <div onClick={props.hideCustomWindow}><button className="second btnSecondary anoRegular">Cancel</button></div>
                        </div>
                        <h1 className="canelaThin font20 hideForMobile">€{currentPrice}</h1>
                    </div>
                </div>
            </div>
         </div>   
         <style jsx>{`
            .container{
                width:100%;
                overflow-y:hidden;
            }
            .mainRing{
                opacity:0;
                position: absolute;
                width: 44.7%;
                top: 9.4rem;
                left: 50%;
                transform: translateX(-50%);
                transition:opacity 0.1s ease-out 0s;
            }
            .mainRing.active{
                opacity:1;
                transition:opacity 0.1s ease-out 0.5s;
            }
            .customColorSection{
                position:absolute;
                top:8rem;
                background:#ffffff;
                left:0;
                width:100%;
                overflow:hidden;
                z-index: 99;
                transform:translateY(-150%);
                transition:all 0.5s ease-out;
            }
            .colorTransform{
                display:flex;
                justify-content:center;
                transform:translateX(${transform2}%);
                transition:all 0.5s ease-out;
            }
            .customColorActive .customColorSection{
                transform:translateY(0%);
            }
            .customColorActive .mainEmptyRingImg{
                opacity:0;
                transition:all 0.3s ease-out ;
            }
            .mainEmptyRingImg{
                opacity:1;
                transition:all 0.5s ease-out 0.2s;
            }
            .customColorActive .customLine{
                opacity:0;
                transition:all 0.3s ease-out ;
            }
            .customLine{
                opacity:1;
                transition:all 0.5s ease-out 0.2s;
            }
            .colorImage{
                cursor:pointer;
                transform:scale(1);
                transition:all 0.5s ease-out;
            }
            .colorImage.current{
                transform:scale(1.3);
            }
            .bottomLine{
                display:flex;
                padding-top:2.4rem;
                padding-bottom:2.4rem;
                justify-content: space-between;
                align-items: center;
            }
            .buttons{
                display:flex;
                position:absolute;
                bottom:1.6rem;
                left:50%;
                transform:translateX(-50%);
            }
            .buttons .first{
                margin-right:2.4rem;
            }
            .details{
                padding:1rem 0 2.4rem 0;
            }
            .title{
                margin-bottom:1.6rem;
            }
            .colorName{
                display:flex;
                align-items: center;
                cursor:pointer;
            }
            .colorName .label{
                color:#000000;
            }
            .customColorActive .colorName .label{
                color:#ffffff;
            }
            .colorSymbol{
                height:2.4rem;
                width:2.4rem;
                border:1px solid #000000;
                border-radius:50%;
                text-align:center;
                margin-right:0.8rem;
            }
            .customColorActive .colorSymbol, .customColorActive .colorSymbol div{
                border:1px solid #ffffff;
            }
            .colorSymbol div{
                height:0.8rem;
                width:0.8rem;
                border:1px solid #000000;
                border-radius:50%;
                position: absolute;
                background:#EAC786;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
            }
            .count{
                margin-left:0.8rem;
            }
            .diamondCountAndColor{
                display:flex;
                align-items: center;
                bottom: 3rem;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                z-index:9;
            }
            .diamondCountContainer{
                width:6.3rem;
                height:4.8rem;
                //border-radius:2.4rem;
                //background:#000000;
                margin-right:3.6rem;
                cursor:pointer;
            }
            .diamondCount{
                display:flex;
                position: absolute;
                top: 13.5px;
                left:12px;
                //transform: translate(-50%,-50%);
            }
            .diamondCountAndColor .count{
                color:#ffffff;
            }
            .customColorActive .diamondCountAndColor .count{
                color:#000000;
            }
            .blackBg{
                position:absolute;
                top:0;
                left:0;
                width:6.3rem;
                height:4.8rem; 
                background:#000000;
                border-radius:2.4rem;
                z-index:-99;
                transition:all 0.5s ease-out;
            }
            .customColorActive .blackBg{
                left:8.7rem;
                width:12.3rem;
            }
            .firstWindow{
                padding-top:9.4rem;
                //text-align:center;
                overflow:hidden;
                width:100%;
            }
            .mainImg{
                width:44.7%;
                display:inline-block;
            }
            .customLine{
                //padding:0 17.5rem;
                position:absolute;
                width:100%;
                top:50%;
                left: 0;
                z-index:99;
                overflow:hidden;
                transform:translateY(-50%);
            }
            .customStones{
                overflow:hidden;
                width:100%;
                position:relative;
                display:flex;
                justify-content:space-around;
                transform: translateX(${transform}%);
                transition:all 0.5s cubic-bezier(0.1, 0.35, 0.2, 1);
            }
            .stone{
                cursor:pointer;
                transform:scale(1);
                opacity:1;
                transition:transform 0.5s ease-out, opacity 0.1s ease-out 0s;
            }
            .stone.currentStone{
                opacity:0;
                transform:scale(1);
                transition:transform 0.5s ease-out, opacity 0.1s ease-out 0.5s;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .firstWindow{
                    padding-top:5.6rem;
                    text-align:center;
                    overflow:hidden;
                    width:100%;
                }  
                .mainRing.active{
                    opacity:0;
                    transition:opacity 0.1s ease-out 0.5s;
                }
                .mainRing.activeInMobile{
                    opacity:1;
                    transition:opacity 0.1s ease-out 0.5s;
                }
                .mainRing{
                    width: 100%;
                    top: 5.6rem;
                } 
                .productName{
                    position:absolute;
                    top:1.6rem;
                    left:50%;
                    transform:translateX(-50%);
                }
                .mainImg{
                    //padding-left:3.6rem;
                    //padding-right:3.6rem;
                    width:100%;
                    display:inline-block;
                }
                .customLine{
                    top:50%;
                }
                .stone{
                    //width:33.33%;
                    //flex: 0 0 auto;
                    transform:scale(1);
                }
                .stone.currentStone{
                    transform:scale(1);
                }
                .diamondCountAndColor{
                    margin:0 8.2rem 2.1rem 8.2rem;
                    position:static;
                    top: auto;
                    left: 50%;
                    transform: translateX(0%);
                }
                .buttons{
                    position:static;
                    justify-content: space-between;
                    transform:translateX(0%);
                }
                .buttons button{
                    width:140px;
                }
                .bottomLine{
                    display:block;
                    padding-top:1.6rem;
                    padding-bottom:1.6rem;
                    border-top: 1px solid #F2F2F2;
                }
                .buttons .first{
                    margin-right:0rem;
                }
                .contentSection{
                    position:absolute;
                    bottom:0;
                    left:0;
                    width:100%;
                }
                .details .title{
                    font-size:2.4rem;
                }
                .customColorSection{
                    top:178px;
                    transform:translateY(-200%);

                }
                .colorTransform{
                    display:none;
                }
                .colorTransform2{
                }
                .colorTransform2 .colorImage{
                    width:180px;
                }
   
            }
         `}</style>
        </>
    )
}

function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(customizeViews)
