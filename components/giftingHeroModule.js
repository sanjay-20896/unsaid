import React, { useState } from 'react'
import Caret from './caret'
import Engraving from './personalise'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT, MEDIUM_BREAKPOINT,IPAD_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT} from '../config'
import EngravingMobile from './personaliseMobile'
function giftingHeroModule(props) {
    const [buttonDropDown,setButtonDropDown] = useState(false)
    const [buttonArrowColor, setButtonArrowColor] = useState(false)
    const [engravingShow, setEngravingShow] = useState(false)
    const [engravingShowMobile, setEngravingShowMobile] = useState(false)
    const [finalGiftSummary, setFinalGiftSummary] = useState(false)
    const [engravingText, setEngravingText] = useState("Engraving Text")
    const [engravingTextDesktop, setEngravingTextDesktop] = useState("Engraving Text")
    const [boxDesign, setBoxDesign] = useState("Design 1")
    const [boxDesignDesktop, setBoxDesignDesktop] = useState("Design 1")
    const [cardDesign, setCardDesign] = useState("Design A")
    const [cardDesignDesktop, setCardDesignDesktop] = useState("Design A")
    const [cardNote, setCardNote] = useState("None")
    const [cardNoteDesktop, setCardNoteDesktop] = useState("None")
    const [windowIndex, setWindowIndex] = useState(0)
    function setSummaryPage(){
        setFinalGiftSummary(true);
        window.scrollTo(0, 0)
    }
    return (
        <>
            <div className={`giftingHeroContainer paddedContent ${finalGiftSummary?"finalGiftSummary":""}`}>
                <div className="leftContainer">
                    {!finalGiftSummary &&
                    <>
                    <div  className="leftDetailsContainer fadeRightToLeftAnimation">
                        <div className="hideForMobile leftDetails one alignCenter">
                            <div className="giftBox"><img className="width-100" src={props.img1}/></div>
                            <h2 className="giftBoxHeadingOne canelaThin font20">Personal gifting</h2>
                            <h2 className="giftBoxHeadingtwo anoRegular font16">All included</h2>
                        </div>
                        <div className="hideForMobile leftDetails two alignCenter">
                            <div className="giftBox positionRelative">
                                <img className="width-100" src={props.img2}/>
                                <div className="logoOnGiftingBox"><img className="width-100" src="/images/logoForGiftingPage.png" /></div>
                            </div>
                            <h2 className="giftBoxHeadingOne canelaThin font20">Standard gifting</h2>
                            <h2 className="giftBoxHeadingtwo anoRegular font16">All included</h2>
                        </div>
                    </div>
                    <div style={{animationDelay:"0.8s"}} className="desc showForMobile anoHalfRegular font16-notResponsive fadeUpAnimation">Create a jewel box that speaks to you, complete with complimentary engraving and specially commissioned artwork and poetry from our community of creatives.</div>
                    </>}
                    {finalGiftSummary &&
                    <>
                        <div style={{animationDelay:"0.1s"}} className="bundledGiftingImg positionRelative fadeRightToLeftAnimation">
                            <div className="sampleText anoHalfRegular font16 alignCenter">Zone for - Bundled gifting photo to go here.</div>
                        </div>
                        <div className="alignCenter showForMobile paddedContent">
                            <div style={{animationDelay:"1.3s"}} className="save fadeUpAnimation">
                                <div className="favIcon"><img alt="favIcon" src="/images/favourite.svg"/></div>
                            </div>
                            
                        </div>
                    </>  
                    }
                </div>
                <div className="rightContainer alignCenter">
                    {!finalGiftSummary &&
                    <div>
                        <div style={{animationDelay:"0.3s"}} className="productImg fadeUpAnimation"><img className="width-100" src={props.productImg}/></div>
                        <h2 style={{animationDelay:"0.4s"}} className="productName canelaThin font16-notResponsive fadeUpAnimation">{props.productName}</h2>
                        <h1 style={{animationDelay:"0.5s"}} className="mainHeading canelaThin font40 fadeUpAnimation">{props.heading}</h1>
                        <h2 style={{animationDelay:"0.6s"}} className="price anoRegular font20 fadeUpAnimation">{props.price}  all included</h2>
                        <h2 style={{animationDelay:"0.7s"}} className="process anoHalfRegular font16 fadeUpAnimation">Engrave – Box – Card – Personal note</h2>
                        <div style={{animationDelay:"0.8s"}} className="desc hideForMobile anoHalfRegular font16 fadeUpAnimation">Create a jewel box that speaks to you, complete with complimentary engraving and specially commissioned artwork and poetry from our community of creatives.</div>
                        <div style={{animationDelay:"0.9s"}} className="createGiftButton fadeUpAnimation positionRelative">
                            <button onFocus={()=>setButtonArrowColor(false)} onMouseEnter={()=>setButtonArrowColor(true)} onMouseLeave={()=>setButtonArrowColor(false)} onClick={()=>setButtonDropDown(!buttonDropDown)} className="btn btnPrimary anoRegular font20">Create a personal gift<span className="arrowRightInBotton"><Caret color={`${buttonArrowColor?"black":"white"}`} direction={`${buttonDropDown?"up":"down"}`} width="0.1rem" length="1rem" marginBottom={`${buttonDropDown?"0px":"4px"}`}/></span></button>
                            <div className={`buttonContainer  ${buttonDropDown?"dropDownShow":""}`}>
                                <h2 onClick={()=>setSummaryPage()} className="existingGiftbox anoRegular font16-notResponsive">Add to my [Collection] gift</h2>
                                <h2 onClick={()=>{setEngravingShow(true), setButtonDropDown(false), setEngravingShowMobile(true)}} className="newGiftButton anoHalfRegular font16-notResponsive">+ Make a new gift</h2>
                            </div>
                        </div>
                        <div className="standardGiftingButton">
                            <h4 style={{animationDelay:"1s"}} className="or anoRegular fadeUpAnimation">Or</h4>
                            <div style={{animationDelay:"1.1s"}} onClick={()=>setSummaryPage()} className="standardGifting anoRegular font16 fadeUpAnimation">
                                <span>Add to cart with standard gifting</span>
                                <span className="arrowRight"><Caret color="black" direction="right" width="0.1rem" length="0.7rem" marginBottom="0.1rem"/></span>
                            </div>
                        </div>
                    </div>}
                    {finalGiftSummary &&
                        <div className="">
                           <h1 className="summaryHeading canelaThin font40 fadeUpAnimation">Your gift summary</h1>
                           <div className="showForMobile"> 
                                <button style={{animationDelay:"1.4s"}} className="addToCartButton width-100 btnPrimary anoRegular font20 fadeUpAnimation">[Price] - Add to cart</button>
                                <h4 style={{animationDelay:"1.5s"}} className="shippingDate anoHalfRegular fadeUpAnimation">Ships by Feb 25, 2021</h4>
                           </div>
                           <div className="headingAndDetail">
                                <h1 style={{animationDelay:"0.3s"}} className="boldHeading anoRegular font16-notResponsive fadeUpAnimation">[Product Name]</h1>
                                <h1 style={{animationDelay:"0.4s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation">Size 48, Yellow Gold</h1>
                           </div>
                           <div className="headingAndDetail">
                                <h1 style={{animationDelay:"0.5s"}} className="boldHeading anoRegular font16-notResponsive fadeUpAnimation">Engraving <span onClick={()=>{setEngravingShow(true),setEngravingShowMobile(true),setWindowIndex(0)}} className="directButton anoHalfRegular">Edit</span></h1>
                                <h1 style={{animationDelay:"0.6s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation showForMobile">“{engravingText}”</h1>
                                <h1 style={{animationDelay:"0.6s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation hideForMobile">“{engravingTextDesktop}”</h1>
                           </div>
                           <div className="headingAndDetail">
                                <h1 style={{animationDelay:"0.7s"}} className="boldHeading anoRegular font16-notResponsive fadeUpAnimation">Gift Box <span onClick={()=>{setEngravingShow(true),setEngravingShowMobile(true),setWindowIndex(1)}} className="directButton anoHalfRegular">Edit</span></h1>
                                <h1 style={{animationDelay:"0.8s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation showForMobile">{boxDesign}</h1>
                                <h1 style={{animationDelay:"0.8s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation hideForMobile">{boxDesignDesktop}</h1>
                           </div>
                           <div className="headingAndDetail">
                                <h1 style={{animationDelay:"0.9s"}} className="boldHeading anoRegular font16-notResponsive fadeUpAnimation">Card <span onClick={()=>{setEngravingShow(true),setEngravingShowMobile(true),setWindowIndex(2)}} className="directButton anoHalfRegular">Edit</span></h1>
                                <h1 style={{animationDelay:"1s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation showForMobile">{cardDesign}</h1>
                                <h1 style={{animationDelay:"1s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation hideForMobile">{cardDesignDesktop}</h1>
                           </div>
                           <div className="headingAndDetail personalNote">
                                <h1 style={{animationDelay:"1.1s"}} className="boldHeading anoRegular font16-notResponsive fadeUpAnimation">Personal note <span onClick={()=>{setEngravingShow(true),setEngravingShowMobile(true),setWindowIndex(3)}} className="directButton anoHalfRegular">Edit</span></h1>
                                <h1 style={{animationDelay:"1.2s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation showForMobile">{cardNote}</h1>
                                <h1 style={{animationDelay:"1.2s"}} className="detail anoHalfRegular font16-notResponsive fadeUpAnimation hideForMobile">{cardNoteDesktop}</h1>
                           </div>
                           <div className="alignCenter hideForMobile">
                                <div style={{animationDelay:"1.3s"}} className="save fadeUpAnimation">
                                    <div className="favIcon"><img alt="favIcon" src="/images/favourite.svg"/></div>
                                    <div className="anoRegular font16">Save this gift to wish list</div>
                                </div>
                                <button style={{animationDelay:"1.4s"}} className="addToCartButton width-100 btnPrimary anoRegular font20 fadeUpAnimation">[Price] - Add to cart</button>
                                <h4 style={{animationDelay:"1.5s"}} className="shippingDate anoHalfRegular fadeUpAnimation">Ships by Feb 25, 2021</h4>
                           </div>
                        </div>
                    }
                </div>
            </div>
            <div className={`engravingContainer ${engravingShow?"show":""}`}>
                <Engraving 
                    engravingShow={engravingShow}
                    windowIndex={windowIndex}
                    cardNote={(note)=>setCardNoteDesktop(note)}
                    cardDesign={(design)=>setCardDesignDesktop(design)}
                    boxDesign={(design)=>setBoxDesignDesktop(design)}
                    engravingText={(val)=>setEngravingTextDesktop(val)} 
                    setFinalGiftSummary={()=>setSummaryPage()} 
                    close={()=>{setEngravingShow(false),setEngravingShowMobile(false)}}
                />
            </div>
            <div className={`engravingContainerMobile ${engravingShowMobile?"show":""}`}>
                <EngravingMobile 
                    engravingShowMobile={engravingShowMobile}
                    windowIndex={windowIndex}
                    cardNote={(note)=>setCardNote(note)}
                    cardDesign={(design)=>setCardDesign(design)}
                    boxDesign={(design)=>setBoxDesign(design)}
                    engravingText={(val)=>setEngravingText(val)} 
                    setFinalGiftSummary={()=>setSummaryPage()} 
                    close={()=>{setEngravingShowMobile(false),setEngravingShow(false)}}
                />
            </div>
            <style jsx>{`
                .giftingHeroContainer{
                    padding-bottom:6.4rem;
                    display:flex;
                }
                .giftingHeroContainer.finalGiftSummary{
                    padding-bottom:22.4rem;
                }
                .favIcon{
                    margin-right:1.6rem;
                }
                .save{
                    display:flex;
                    justify-content:center;
                    margin-bottom:3.2rem;
                }
                .directButton{
                    text-decoration:underline;
                    cursor:pointer;
                }   
                .headingAndDetail, .addToCartButton{
                    margin-bottom:2.4rem;
                }
                .personalNote.headingAndDetail{
                    margin-bottom:4.8rem;
                }
                .personalNote.headingAndDetail .boldHeading{
                    margin-bottom:1.6rem;
                }
                .personalNote.headingAndDetail .detail{
                    letter-spacing: 0.4px;
                }
                .boldHeading{
                    margin-bottom:0.8rem;
                }
                .summaryHeading{
                    margin-bottom:4.8rem;
                    animation-delay:0.3s;
                }
                .bundledGiftingImg{
                    width:100%;
                    height:75.6rem;
                    background:#F2F2F2;
                }
                .sampleText{
                    width:100%;
                    position:absolute;
                    top:50%;
                    transform:translateY(-50%);
                }
                .engravingContainer{
                    height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                    background:#ffffff;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 9;
                    display:none;
                    //transform:translateY(-100%);
                    transition:all 0.5s ease-out;
                }
                .engravingContainer.show{
                    display:block;
                    //transform:translateY(0%);
                }
                .engravingContainerMobile{
                    display:none;
                }
                .arrowRightInBotton{
                    margin-left:1.6rem;
                }
                .existingGiftbox{
                    margin-bottom:1.6rem;
                }
                .standardGiftingButton{
                    opacity:${buttonDropDown?"0":"1"};
                    pointer-events:${buttonDropDown?"none":"visible"};
                }
                .buttonContainer h2{
                    display:none;
                }
                .buttonContainer.dropDownShow h2{
                    display:block;
                    cursor:pointer;
                }
                .buttonContainer{
                    width:312px;
                    position:absolute;
                    left:50%;
                    transform:translateX(-50%);
                    height:0;
                    background:#ffffff;
                    transition:all 0.3s ease-out;
                }
                .buttonContainer.dropDownShow{
                    height:auto;
                    padding:2.4rem 0;
                }
                .standardGifting{
                    cursor:pointer;
                }
                .createGiftButton, .or{
                    margin-bottom:3rem;
                }
                .arrowRight{
                    margin-left:0.8rem;
                }
                .productName, .price{
                    margin-bottom:1.6rem;
                }
                .process{
                    margin-bottom:3.2rem;
                }
                .mainHeading, .desc{
                    margin-bottom:4.8rem;
                }
                .logoOnGiftingBox{
                    position:absolute;
                    bottom:3.2rem;
                    left:50%;
                    transform:translateX(-50%);
                }
                .giftBoxHeadingOne{
                    margin-bottom:1.6rem;
                }
                .giftBox{
                    margin-bottom:4rem;
                }
                .leftContainer .leftDetails{
                    padding-right:2rem;
                }
                .leftDetailsContainer{
                    animation-delay: 0.1s;
                    margin-right:-2rem;
                    display:flex;
                }
                .leftContainer{
                    width:50%;
                    background:#F2F2F2;
                    padding-top:24.7rem;
                    padding-left:6.1rem;
                    padding-right:7.7rem;
                    padding-bottom:13.9rem;
                }
                .finalGiftSummary .leftContainer{
                    padding:0;
                    background:#ffffff;
                }
                .rightContainer{
                    width:50%;
                    padding: 0 8%;
                }
                .finalGiftSummary .rightContainer{
                    text-align:left;
                    padding:9.6rem 11.1rem 0 13.5rem;
                }
                .productImg{
                    width:19.8rem;
                    margin:0 auto 1.6rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:5rem;
                    }
                    .leftContainer{
                        padding-top:20.9rem;
                        padding-left:5.5rem;
                        padding-right:6.7rem;
                        padding-bottom:12.4rem;
                    }
                    .leftContainer .leftDetails{
                        padding-right:1.8rem;
                    }
                    .leftDetailsContainer{
                        margin-right:-1.8rem;
                    }
                    .productImg{
                        width:17.7rem;
                        margin:0 auto 1.8rem
                    }
                    .productName{
                        font-size:1.4rem;
                        margin-bottom:2.3rem;
                    }
                    .mainHeading{
                        margin-bottom:2.9rem;
                    }
                    .price{
                        font-size:1.8rem;
                        margin-bottom:2.1rem;
                    }
                    .process{
                        margin-bottom:3.7rem;
                    }
                    .desc{
                        margin-bottom:4.6rem;
                    }
                    .createGiftButton button{
                        font-size:1.8rem;
                    }
                    .createGiftButton{
                        margin-bottom:2.9rem;
                    }
                    .giftingHeroContainer.finalGiftSummary{
                        padding-bottom:10rem;
                    }
                    .bundledGiftingImg{
                        height:67.2rem;
                    }
                    .finalGiftSummary .rightContainer{
                        text-align:left;
                        padding:8.7rem 10rem 0 10rem;
                    }
                    .summaryHeading{
                        font-size:4rem;
                    }
                    .boldHeading, .detail{
                        font-size:1.4rem;
                    }    
                }
                @media screen and (max-width: ${IPAD_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:4.3rem;
                    }
                    .leftContainer{
                        padding-top:19rem;
                        padding-left:5.6rem;
                        padding-right:5.1rem;
                        padding-bottom:11.7rem;
                    }
                    .leftContainer .leftDetails{
                        padding-right:1.6rem;
                    }
                    .leftDetailsContainer{
                        margin-right:-1.6rem;
                    }
                    .productImg{
                        width:15.4rem;
                        margin:0 auto 1.5rem;
                    }
                    .productName{
                        font-size:1.2rem;
                        margin-bottom:2rem;
                    }
                    .mainHeading{
                        margin-bottom:4.3rem;
                    }
                    .price{
                        font-size:1.5rem;
                        margin-bottom:1.8rem;
                    }
                    .process{
                        font-size:1.2rem;
                        margin-bottom:3.3rem;
                    }
                    .desc{
                        font-size:1.2rem;
                        margin-bottom:4rem;
                        line-height: 18px;
                        letter-spacing: 0.6px;
                    }
                    .createGiftButton button{
                        font-size:1.5rem;
                    }
                    .createGiftButton{
                        margin-bottom:2.5rem;
                    }
                    .rightContainer{
                        padding: 0 7%;
                    }
                    .bundledGiftingImg{
                        height:58.3rem;
                    }
                    .boldHeading, .detail{
                        font-size:1.2rem;
                    } 
                    .giftingHeroContainer.finalGiftSummary{
                        padding-bottom:10rem;
                        padding-top:6.2rem;
                    }
                    .finalGiftSummary .rightContainer{
                        padding:7.6rem 8rem 0 9rem;
                    }
                    .summaryHeading{
                        margin-bottom:3.8rem;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:5.9rem;
                    }
                    .leftContainer{
                        padding-top:19.9rem;
                        padding-left:3.8rem;
                        padding-right:4.2rem;
                        padding-bottom:19.8rem;
                    }
                    .leftContainer .leftDetails{
                        padding-right:1.2rem;
                    }
                    .leftDetailsContainer{
                        margin-right:-1.2rem;
                    }
                    .leftContainer{
                        width:49%;
                    }
                    .rightContainer{
                        width:51%;
                        padding: 0 2.5%;
                    }
                    .finalGiftSummary .rightContainer{
                        padding:7.6rem 1.7rem 0 7rem;
                    }
                    .desc{
                        line-height: 18px;
                        letter-spacing: 0.6px;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .giftingHeroContainer{
                        padding-bottom:9.6rem;
                        flex-direction: column-reverse;
                    }
                    .giftingHeroContainer.finalGiftSummary{
                        padding-bottom:4.8rem;
                    }
                    .shippingDate{
                        margin-bottom:3.2rem;
                        text-align:center;
                    }
                    .summaryHeading{
                        margin-bottom:3.2rem;
                        text-align:center;
                        animation-delay:1.4s;
                    }
                    .addToCartButton{
                        margin-bottom:2.4rem;
                    }
                    .giftingHeroContainer.finalGiftSummary{
                        flex-direction: column;
                        padding-right:0;
                        padding-left:0;
                    }
                    .bundledGiftingImg{
                        height:28.2rem;
                        margin-bottom:3.2rem;
                    }
                    .finalGiftSummary .rightContainer{
                        text-align:left;
                        padding:0 3.6rem;
                    }
                    .save{
                        margin-bottom:1.6rem;
                    }
                    .bundledGiftingImg .sampleText{
                        display:none;
                    }
                    .engravingContainerMobile{
                        height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                        background:#ffffff;
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        z-index: 9;
                        display:none;
                        //transform:translateY(-100%);
                        transition:all 0.5s ease-out;
                    }
                    .engravingContainerMobile.show{
                        display:block;
                        //transform:translateY(0%);
                    }
                    .engravingContainer{
                        display:none;
                    }
                    .leftContainer{
                        width:100%;
                        background:#ffffff;
                        padding:0;
                    }
                    .rightContainer{
                        width:100%;
                        padding: 0 0%;
                    }
                    .productImg{
                        width:13.9rem;
                        height:13.9rem;
                        margin:0 auto 1.6rem;
                    }
                    .productImg img{
                        width:100%;
                    }
                    .productName{
                        margin-bottom:1.2rem;
                    }
                    .mainHeading{
                        font-size:3.2rem;
                        margin-bottom:3.2rem;
                    }
                    .price{
                        margin-bottom:0.8rem;
                    }
                    .process{
                        margin-bottom:4.8rem;
                    }
                    .createGiftButton, .or{
                        margin-bottom:1.6rem;
                    }
                    .newGiftButton{
                        font-family: AnoRegular, sans-serif;
                    }
                    .standardGifting{
                        margin-bottom:4.8rem;
                    }
                    .leftDetailsContainer{
                        animation-delay: 1.2s;
                        width:100%;
                        height:303px;
                        display:block;
                        background:#F2F2F2;
                        margin-bottom:2.4rem;
                    }
                    .desc{
                        letter-spacing:0.5px;
                        margin-bottom:0rem;
                    }
                }
                
            `}</style>   
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(giftingHeroModule)


// @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    
// }
// @media screen and (max-width: ${IPAD_BREAKPOINT}px){
    
// }
// @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
    
// }