import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import SwipeableViews from 'react-swipeable-views'
import Caret from './caret'
import ArcText from './arcText'
import EngravingText from './engravingText'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT, IPAD_BREAKPOINT,MEDIUM_BREAKPOINT,DEFAULT_ENGRAVING_CHARACTER_LIMIT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import {setEngravingText,setNoteText,setBoxChoice,setCardChoice} from '../redux/actions'
import {getNestedObject,getProductImage} from '../functions'
function engraving(props) {
    const [index, setIndex] = useState(0)
    const [index2, setIndex2] = useState(1)
    const [index3, setIndex3] = useState(1)
    const [textAreaRow, setTextAreaRow] = useState(36)
    const [disableTyping, setDisableTyping] = useState(false)
    const [noteTextLines, setNoteTextLines] = useState(0);
    const [ref, setRef] = useState(null);

    function getDevice(){
        let setPadding ={
            one:"",
            two:""
        }
        if(props.common.windowWidth <= MOBILE_BREAKPOINT){
            setPadding.one=""
            setPadding.two=""
        }
        else if(props.common.windowWidth > MOBILE_BREAKPOINT && props.common.windowWidth <= 750){
            setPadding.one = "0 3rem 0 16rem"
            setPadding.two="0 7rem 0 25rem"
        }
        else if(props.common.windowWidth > 750 && props.common.windowWidth <= 835){
            setPadding.one = "0 7rem 0 20rem"
            setPadding.two="0 5rem 0 29rem"
        }
        else if(props.common.windowWidth > 835 && props.common.windowWidth <= TABLET_PORTRAIT_BREAKPOINT){
            setPadding.one = "0 9rem 0 23rem"
            setPadding.two="0 13rem 0 33rem"
        }
        else if(props.common.windowWidth > TABLET_PORTRAIT_BREAKPOINT && props.common.windowWidth <= 1050){
            setPadding.one = "0 10rem 0 31rem"
            setPadding.two="0 13rem 0 40rem"
        }
        else if(props.common.windowWidth > 1050 && props.common.windowWidth <= IPAD_BREAKPOINT){
            setPadding.one = "0 15rem 0 33rem"
            setPadding.two="0 15rem 0 43rem"
        }
        else if(props.common.windowWidth > IPAD_BREAKPOINT && props.common.windowWidth <= 1200){
            setPadding.one = "0 15rem 0 38rem"
            setPadding.two="0 16rem 0 48rem"
        }
        else if(props.common.windowWidth > 1200 && props.common.windowWidth <= MEDIUM_BREAKPOINT){
            setPadding.one = "0 20rem 0 42rem"
            setPadding.two="0 17rem 0 51rem"
        }
        else{
            setPadding.one = "0 22rem 0 50rem"
            setPadding.two = "0 19rem 0 59rem"
        }
        return setPadding
    }
    let setPadding = getDevice();

    useEffect(()=>{
        setIndex(props.windowIndex)
    },[props.personalisationShow])

    const textareaRef=useRef();
    const noteTextRef=useRef();

    function getLinesCount(element) {
        var prevLH = element.style.lineHeight;
        var factor = 1000;
        element.style.lineHeight = factor + 'px';
      
        var height = element.getBoundingClientRect().height;
        element.style.lineHeight = prevLH;
      
        return Math.floor(height / factor);
    }

    useEffect(() => {
        if(noteTextLines==15){
            setDisableTyping(true)
        }else{
            setDisableTyping(false)
        }
    }, [noteTextLines])

    function countLines() {
        var el = noteTextRef.current;
        // var taLineHeight = 24; 
        // var taHeight = noteTextRef.current.scrollHeight; 
        // noteTextRef.current.style.height = taHeight; 
        // var numberOfLines = Math.floor(taHeight/taLineHeight);
        setNoteTextLines(getLinesCount(el)+1)
    }
    // console.log("numberOfLines",noteTextLines,props.gifting.bundle[props.bundleId].noteText.length);
    const springConfigData={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    // let handleChangeIndex = index => {
    //     setIndex(index)
    //     console.log("dfkhdkfhjkdsh",index);
    //   };
    function handleChangeIndex(id){
        setIndex(id)
    }
    let handleChangeIndex2 = index => {
        setIndex2(index)
      };
    let handleChangeIndex3 = index => {
        setIndex3(index)
      };
    function nextWindow(){
        let maxIndex = product.engraving_possible=="1"?3:2
        if(index>=0 && index<maxIndex){
            setIndex(index+1)
        }
        if(index===maxIndex){
            props.close();
            props.showPersonalisationSummary(true);    
        }
    }
    function previousWindow(){
        let maxIndex = product.engraving_possible=="1"?3:2
        if(index<=maxIndex && index>=1){
            setIndex(index-1)
        }
        if(index===0){
            props.close();
        }
    }

    useEffect(()=>{
        let giftBoxProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[0].products
        let postCardProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[1].products
        if(index2==0){
            let giftBoxProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
            let defaultGiftBoxProduct = giftBoxProducts.find(p=>p.is_standard_gifting_option=="1")
            props.setBoxChoice(props.bundleId,defaultGiftBoxProduct.items[0].item,defaultGiftBoxProduct.name)
        } 
        if(index2!=0){
            let giftBoxProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
            props.setBoxChoice(props.bundleId,giftBoxProductsWithoutBlank[index2-1].items[0].item,giftBoxProductsWithoutBlank[index2-1].name)
        }
        if(index3==0){
            let postCardProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
            let defaultPostCardProduct = postCardProducts.find(p=>p.is_standard_gifting_option=="1")
            props.setCardChoice(props.bundleId,defaultPostCardProduct.items[0].item,defaultPostCardProduct.name)
        } 
        if(index3!=0){
            let postCardProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
            props.setCardChoice(props.bundleId,postCardProductsWithoutBlank[index3-1].items[0].item,postCardProductsWithoutBlank[index3-1].name)
        }
    },[index])
    // let product = props.gifting.bundle[props.bundleId].jewelProduct
    let product = props.cache.products[props.item.split("-")[0]]
    let giftBoxProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[0].products
    let postCardProductIds = props.gifting.bundle[props.bundleId].bundleInfo.bundle.bundleInfo.sections[1].products
    let giftBoxProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)))
    let postCardProducts = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)))
    let giftBoxProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>giftBoxProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
    let postCardProductsWithoutBlank = props.gifting.bundle[props.bundleId].bundleInfo.sectionProducts.filter(p=>postCardProductIds.includes(parseInt(p.product)) && p.is_standard_gifting_option!="1")
    let defaultGiftBoxProduct = giftBoxProducts.find(p=>p.is_standard_gifting_option=="1")
    let defaultPostCardProduct = postCardProducts.find(p=>p.is_standard_gifting_option=="1")
    // console.log('jewel product',product)
    // console.log('defaultg',defaultGiftBoxProduct)
    // console.log('defaultp',defaultPostCardProduct) 
    // console.log('postCardProducts',postCardProducts,postCardProductsWithoutBlank)
    let defaultGiftBoxImage = defaultGiftBoxProduct.media.standard[0]
    let defaultPostCardImage = defaultPostCardProduct.media.standard[0]
    // console.log('gifting/index',postCardProductsWithoutBlank,index3)
    let selectedPostCardImage1 = index3==0?defaultPostCardImage:postCardProductsWithoutBlank[index3-1]?.media?.standard?postCardProductsWithoutBlank[index3-1]?.media?.standard[0]:null
    let selectedPostCardImage2 = index3==0?defaultPostCardImage:postCardProductsWithoutBlank[index3-1]?.media?.standard?postCardProductsWithoutBlank[index3-1]?.media?.standard[1]:null
    let giftBoxArtistName = index2==0?defaultGiftBoxProduct.excerpt:giftBoxProductsWithoutBlank[index2-1]?.excerpt
    let postCardArtistName = index3==0?defaultPostCardProduct.excerpt:postCardProductsWithoutBlank[index3-1]?.excerpt
    // console.log('jewel product',product)
    // console.log('personalise')
    // console.log('giftcardp',giftBoxProducts)
    // console.log('post',postCardProducts) 
    let engravingImage = product.engraving_possible=="1"?getProductImage(product,"e1","standard"):null
    // let productImages = getNestedObject(product,["media","small"])
    // console.log("personalise selected product",product,product.engraving_possible,engravingImage)
    let engravingCharacterLimit = product.engraving_character_limit_value?product.engraving_character_limit_value:DEFAULT_ENGRAVING_CHARACTER_LIMIT
    let remainingChars = parseInt(engravingCharacterLimit) - parseInt(props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText.length:0)
    let x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?500 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*15:500
    let jsxArray = []
    if(product.engraving_possible=="1"){
        jsxArray.push(
            <div key="engraving_slide">
                <div className="engravingFirst positionRelative">
                    <div style={{animationDelay:"0.3s"}} className="engravingImage positionRelative alignCenter fadeUpAnimation">
                        {!!engravingImage &&
                            <img className="width-100" src={engravingImage}/>
                        }
                        <div style={{animationDelay:"0.6s"}} className="arcText fadeUpAnimation">
                            <div className="shapeWrapper engravingText canelaThin">
                                <EngravingText x={x} text={props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:""} id={product.product}/>
                            </div>
                        </div>
                    </div>
                    <h1 style={{animationDelay:"0.8s"}} className="heading alignCenter canelaThin font24 fadeUpAnimation">Your choice of engraving<span className="questionMark"><img src="/images/questionMark.svg"/></span></h1>
                    <div className="textInputWrapper alignCenter">
                        <div style={{animationDelay:"0.9s"}} className="textInput alignLeft positionRelative">
                            <input onChange={e=>props.setEngravingText(props.bundleId,e.target.value)} value={props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:""} maxlength={engravingCharacterLimit} placeholder="Engraving text" className="font24" type="text"/>
                            <h4 className="textCount anoRegular grey">({remainingChars})</h4>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .heading{
                        margin-bottom:4rem;
                    }
                    .engravingText{
                        font-size: 80px;
                    }
                    .arcText{
                        position: absolute;
                        top: calc(73.5%);
                        left: 13%;
                        width: 75%;
                    }
                    .shapeWrapper{
                        position:relative;
                        padding-top:36.5%;
                        width:100%;
                    } 
                    .textCount{
                        position:absolute;
                        bottom:0.8rem;
                        right:0;
                    }
                    .textInput input{
                        padding:0 0 0.8rem 0;
                        border:0;
                        width:80%;
                    }
                    .textInput textarea{
                        padding:0 0 0.8rem 0;
                        border:0;
                        width:90%;
                        resize: none;
                        min-height: 36px;
                        height:${textAreaRow}px;
                    }
                    .engravingFirst{
                        padding-top:3rem;
                    }
                    .engravingFirst .textInput{
                        opacity:0;
                        animation:inputFieldFillWidth 0.7s ease-out forwards;
                    }
                    @keyframes inputFieldFillWidth{
                        from{
                            opacity:0;
                            width:0%;
                        }
                        to{
                            opacity:1;
                            width:42.2rem;
                        }
                    }
                    .textInput{
                        display:inline-block;
                        width:42.2rem;
                        border-bottom:1px solid #787878;
                    }
                    .questionMark{
                        margin-left:1.6rem;
                    }
                    .questionMark img{
                        margin-bottom: -5px;
                    }
                    .engravingImage{
                        width:25%;
                        margin:0 auto 3.2rem;
                    }
                    @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                        .textInputWrapper{
                            margin-bottom:10.3rem;
                        }
                    }
                    @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                        .engravingImage{
                            width:30%;
                        }
                    }
                    @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                        .engravingImage {
                            width: 70%;
                        }
                        .arcText {
                            top: 70%;
                        }                 
                    }
                `}</style>
            </div>
        )
    }
    jsxArray.push(
        <div className={`${index==(product.engraving_possible?1:0)?"active":""}`}>
            <div className={`engravingSecond `} key="giftbox_slide">
                <div className="allGiftBoxes">
                    <SwipeableViews style={{padding:`${setPadding.one}`}} slideStyle={{padding:"0 0rem 0 0rem"}} index={index2} onChangeIndex={handleChangeIndex2} springConfig={springConfigData}> 
                        <div onClick={()=>setIndex2(0)} className="giftBoxContainer one">
                            <img className="width-100" src={defaultGiftBoxImage} />
                        </div>
                        {giftBoxProductsWithoutBlank.map((p,i)=>{
                            if(p.product != defaultGiftBoxProduct.product)
                            return (
                                <div onClick={()=>setIndex2(i+1)} className={`giftBoxContainer ${i==0 && "two"} ${i==1 && "three"}`}>
                                    {p?.media?.standard &&
                                        <img className="width-100" src={p.media.standard[0]} />
                                    }
                                </div>
                            )
                        })}
                    </SwipeableViews>
                </div>
                <h1 style={{animationDelay:"1.5s"}} className={`heading alignCenter canelaThin font24 ${index===1?"fadeUpAnimation":""}`}>Choose your gift box</h1>
                <div style={{animationDelay:"1.7s"}} className={`giftBoxNames canelaThin font24 ${index===1?"fadeUpAnimation":""}`}>
                    <div onClick={()=>setIndex2(0)} className={`giftBoxName underlineLR ${index2===0?"currentlyActive active":""}`}>Blank</div>
                    <div className={`giftBoxName seperator`}></div>
                    {giftBoxProductsWithoutBlank.map((p,index)=>{
                            if(p.product != defaultGiftBoxProduct.product)
                            return <div onClick={()=>setIndex2(index+1)} className={`giftBoxName underlineLR ${index2===index+1?"currentlyActive active":""}`}>{p.name}</div>                                            
                    })}
                </div>
                <div style={{animationDelay:"1.9s"}} className={`artistName alignCenter anoHalfRegular font16 ${index===1?"fadeUpAnimation":""}`}>{giftBoxArtistName}</div>
            </div>
            <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .engravingSecond{
                    padding-top:3.8rem;
                }
                .giftBoxContainer.two {
                    opacity: 0;
                    transform: translateY(2rem);
                    transition: all 1s ease-out 0.3s;
                }
                .active .giftBoxContainer.two{
                    transform:translateY(0%);
                    opacity:1;
                }
                .giftBoxContainer.one,.giftBoxContainer.three {
                    transform: translateX(-100%);
                    opacity: 0;
                    transition: all 1s ease-out 0.4s;
                }
                .active .giftBoxContainer.one,
                .active .giftBoxContainer.three{
                    transform:translateX(0%);
                    opacity:1;
                }
                .artistName{
                    margin-bottom:2.4rem;
                }
                .giftBoxContainer{
                    //width:547px;
                    width:450px;
                    //height:476px;
                    cursor:pointer;
                }
                .giftBoxNames{
                    display:flex;
                    justify-content:center;
                    margin-bottom:4rem;
                }
                .giftBoxName{
                    margin-right:4.8rem;
                    color:#787878;
                }
                .giftBoxName.seperator{
                    width:1px;
                    background:#787878;
                }
                .allGiftBoxes{
                    margin-bottom:3.2rem;
                }
                .giftBoxName.currentlyActive{
                    color:#000000;
                }
            `}</style>
        </div>
    )
    
    jsxArray.push(
        <div className={`${index==(product.engraving_possible?2:1)?"active":""}`}>
        <div className="engravingThird" key="postcard_slide">
            <div className="allGiftBoxes">
                <SwipeableViews style={{padding:`${setPadding.two}`}} slideStyle={{padding:"0 0rem 0 0rem"}} index={index3} onChangeIndex={handleChangeIndex3} springConfig={springConfigData}> 
                    <div onClick={()=>setIndex3(0)} className="giftBoxContainer one">
                        <img className="width-100" src={defaultPostCardImage} />
                    </div>
                    {postCardProductsWithoutBlank.map((p,i)=>{
                        return (
                            <div onClick={()=>setIndex3(i+1)} className={`giftBoxContainer ${i==0 && "two"} ${i==1 && "three"}`}>
                                {p?.media?.standard &&
                                    <img className="width-100" src={p.media.standard[0]} />
                                }
                            </div>
                        )
                    })}
                </SwipeableViews>
            </div>
            <h1 style={{animationDelay:"1.5s"}} className={`heading alignCenter canelaThin font24 ${index===2?"fadeUpAnimation":""}`}>Choose your gift box</h1>
            <div style={{animationDelay:"1.7s"}} className={`giftBoxNames canelaThin font24 ${index===2?"fadeUpAnimation":""}`}>
                <div onClick={()=>setIndex3(0)} className={`giftBoxName underlineLR ${index3===0?"currentlyActive active":""}`}>Blank</div>
                <div className={`giftBoxName seperator`}></div>
                {postCardProductsWithoutBlank.map((p,index)=>{
                    return (
                        <div onClick={()=>setIndex3(index+1)} className={`giftBoxName underlineLR ${index3===index+1?"currentlyActive active":""}`}>{p.name}</div>
                    )
                })}
            </div>
            <div style={{animationDelay:"1.9s"}} className={`artistName alignCenter anoHalfRegular font16 ${index===2?"fadeUpAnimation":""}`}>{postCardArtistName}</div>
        </div>
        <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .engravingThird{
                    padding-top:3.8rem;
                }
                .giftBoxContainer.two {
                    opacity: 0;
                    transform: translateY(2rem);
                    transition: all 1s ease-out 0.3s;
                }
                .active .giftBoxContainer.two{
                    transform:translateY(0%);
                    opacity:1;
                }
                .giftBoxContainer.one,.giftBoxContainer.three {
                    transform: translateX(-100%);
                    opacity: 0;
                    transition: all 1s ease-out 0.4s;
                }
                .active .giftBoxContainer.one,
                .active .giftBoxContainer.three{
                    transform:translateX(0%);
                    opacity:1;
                }
                .artistName{
                    margin-bottom:2.4rem;
                }
                .giftBoxNames{
                    display:flex;
                    justify-content:center;
                    margin-bottom:4rem;
                }
                .giftBoxName{
                    margin-right:4.8rem;
                    color:#787878;
                }
                .giftBoxName.seperator{
                    width:1px;
                    background:#787878;
                }
                .allGiftBoxes{
                    margin-bottom:3.2rem;
                }
                .giftBoxContainer{
                    //width:358px;
                    width:258px;
                    //height:476px;
                    cursor:pointer;
                }
                .giftBoxName.currentlyActive{
                    color:#000000;
                }
        `}</style>
        </div>
    )
    jsxArray.push(
        <div key="note_slide" className={`${index==(product.engraving_possible?3:2)?"active":""}`}>
            <div className="engravingFourth positionRelative">
                <div className="cardNoteSection">
                    <div className="noteImage">
                        {!!selectedPostCardImage1 &&
                            <img className="width-100" src={selectedPostCardImage1}/>
                        }
                    </div>
                    <div className="notePad canelaThin font16">
                        {!!selectedPostCardImage2 &&
                            <img className="width-100 postCardImage2" src={selectedPostCardImage2}/>
                        }
                        <span className="font12" ref={noteTextRef}>{props?.personalisation?.bundle[props.bundleId]?.noteText?props.personalisation.bundle[props.bundleId].noteText:""}</span>
                    </div>
                </div>
                <div className="noteFront"><h2 style={{animationDelay:"1.5s"}} className={`canelaThin font16 alignCenter ${index===3?"fadeUpAnimation":""}`}>Front</h2></div>
                <div className="noteBack"><h2 style={{animationDelay:"1.5s"}} className={`canelaThin font16 alignCenter ${index===3?"fadeUpAnimation":""}`}>Back</h2></div>
                <div className="noteSectionDetails">
                    <h1 style={{animationDelay:"1.7s"}} className={`heading alignCenter canelaThin font24 ${index===3?"fadeUpAnimation":""}`}>Add a personal note</h1>
                    <div style={{animationDelay:"1.9s"}} className={`textInputWrapper alignCenter ${index===3?"fadeUpAnimation":""}`}>
                        <div className="textInput alignLeft positionRelative">
                            <textarea ref={textareaRef} onChange={e=>{props.setNoteText(props.bundleId,e.target.value);setTextAreaRow(textareaRef.current.scrollHeight);countLines()}} maxlength={`${disableTyping?props?.personalisation?.bundle[props.bundleId]?.noteText?.length:615}`} rows='1' placeholder="" value={props?.personalisation?.bundle[props.bundleId]?.noteText?props.personalisation.bundle[props.bundleId].noteText:""} className="font24"></textarea>
                            <h4 className="textCount anoRegular grey">({15 - noteTextLines})</h4>
                        </div>
                    </div>
                </div>
            </div> 
            <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .notePad span{
                    white-space: pre-wrap;
                    display:inline-block;
                    line-height:18px;
                    overflow-wrap: anywhere;
                }
                .noteFront, .noteBack{
                    position:absolute;
                    top:350px;
                    left:50%;
                }
                .noteFront{
                    transform:translateX(calc((-50%) - 167px));
                }
                .noteBack{
                    transform:translateX(calc((-50%) + 167px));
                }
                .cardNoteSection{
                    transform:translateX(-6rem);
                    transition:all 1s ease-out 0.5s;
                }
                .active .cardNoteSection{
                    transform:translateX(0rem);
                }
                .noteImage{
                    background:#ffffff;
                    width:200px;
                    height:280.6px;
                    position:absolute;
                    top:56px;
                    left:50%;
                    transform:translateX(calc((-50%) - 167px));
                }
                .notePad{
                    z-index:-9;
                    position:absolute;
                    top:56px;
                    left:50%;
                    transform:translateX(calc((-50%) - 167px));
                    width:200px;
                    height:280.6px;
                    background:#fbfaf8;
                    //padding:5rem 6.3rem 7.4rem 6.3rem;
                    padding:2rem 2.5rem;
                    overflow-wrap: break-word;
                    line-height: 24px;
                    transition:all 1s ease-out 1s;
                }
                .active .notePad{
                    transform:translateX(calc((-50%) + 167px));
                }
                .noteSectionDetails{
                    position:absolute;
                    top:420px;
                    left:50%;
                    transform:translateX(-50%);
                }
                .postCardImage2{
                    position:absolute;
                    width:100%;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 0;
                    z-index:-1;
                }
                .engravingFourth{
                    min-height:calc(750px + ${textAreaRow}px);
                    //overflow:scroll;
                }
                .textInputWrapper{
                    margin-bottom:8rem;
                }
                .textCount{
                    position:absolute;
                    bottom:0.8rem;
                    right:0;
                }
                .textInput input{
                    padding:0 0 0.8rem 0;
                    border:0;
                    width:80%;
                }
                .textInput textarea{
                    padding:0 0 0.8rem 0;
                    border:0;
                    width:90%;
                    resize: none;
                    min-height: 36px;
                    height:${textAreaRow}px;
                }
                .textInput{
                    display:inline-block;
                    width:42.2rem;
                    border-bottom:1px solid #787878;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .textInputWrapper{
                        margin-bottom:10.3rem;
                    }
                }
            `}</style>
        </div>
    )
    let interval;
    const onRefChange = useCallback((node) => {
        setRef(node); 
        if (node === null) {
        return;
        } else {
        interval = setInterval(() => {
            node.updateHeight();
        }, 100);
        setTimeout(() => {
            clearInterval(interval);
        }, 10000);
        }
    }, []);
    
    useEffect(() => {
        return () => clearInterval(interval);
    }, [interval]);
    return (
      
        <>
            <div className="engravingSection desktop positionRelative">
                <SwipeableViews ref={onRefChange} index={index} animateHeight={true} onChangeIndex={(index)=>handleChangeIndex(index)} springConfig={springConfigData}>
                    {jsxArray.map(slide=>slide)}
                </SwipeableViews>
                <div style={{animationDelay:"0.6s"}} className="fixedPrice anoRegular font16 fadeUpAnimation">All included: {product.price}</div>
                <div style={{animationDelay:"1.5s"}} className="bottomContent paddedContent fadeUpAnimation">
                    <div onClick={()=>previousWindow()} className="backButton anoRegular font16">
                        <span className="arrowBack"><Caret color="black" direction="left" width="0.1rem" length="0.7rem" marginBottom="0.1rem"/></span>
                        <span>Back</span>
                    </div>
                    <div className="processList anoRegular">
                        {product.engraving_possible=="1" &&
                            <h2 onClick={()=>setIndex(0)} className={`font16 grey ${index===0?"currentlyActive":""}`}>Engrave</h2>
                        }
                        <h2 onClick={()=>setIndex(product.engraving_possible=="1"?1:0)} className={`font16 grey ${index===(product.engraving_possible=="1"?1:0)?"currentlyActive":""}`}>Box</h2>
                        <h2 onClick={()=>setIndex(product.engraving_possible=="1"?2:1)} className={`font16 grey ${index===(product.engraving_possible=="1"?2:1)?"currentlyActive":""}`}>Card</h2>
                        <h2 onClick={()=>setIndex(product.engraving_possible=="1"?3:2)} className={`font16 grey ${index===(product.engraving_possible=="1"?3:2)?"currentlyActive":""}`}>Note</h2>
                    </div>
                    <div>
                        <button onClick={()=>nextWindow()} className="btn btnPrimary anoRegular font20">{index===(product.engraving_possible=="1"?3:2)?"Wrap it up":"Next"}</button>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .engravingSection{
                    padding-top:${props.common.showBrandNotification?"10.8rem":"8rem"};
                }
                .fixedPrice{
                    position:absolute;
                    top:10.4rem;
                    left:6.4rem;
                }
                .backButton{
                    cursor:pointer;
                }
                .processList h2.currentlyActive{
                    color:#000000;
                }
                .processList{
                    align-items:center;
                    display:flex;
                    margin-right:-3.2rem;
                }
                .processList h2{
                    padding-right:3.2rem;
                    cursor:pointer;
                }
                .arrowBack{
                    margin-right:0.8rem;
                }
                .bottomContent{
                    box-shadow: 0 1px 5px #e0e0e0;
                    position:fixed;
                    bottom:0;
                    z-index:20;
                    background:#ffffff;
                    align-items:center;
                    height:8rem;
                    width: 100%;
                    display:flex;
                    justify-content:space-between;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .engravingSection{
                        padding-top:${props.common.showBrandNotification?"10rem":"7.2rem"};
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .engravingSection{
                        padding-top:${props.common.showBrandNotification?"9rem":"6.2rem"};
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .engravingSection{
                        padding-top:${props.common.showBrandNotification?"8.4rem":"5.6rem"};
                    }          
                }
            `}</style>
        </>
    )
}
function mapStateToProps({gifting,common,cache,personalisation}){
    return {gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{setEngravingText,setNoteText,setBoxChoice,setCardChoice})(engraving)