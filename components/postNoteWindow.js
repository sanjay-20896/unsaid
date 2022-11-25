import React, { useEffect, useRef, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import {setEngravingText,setNoteText,setBoxChoice,setCardChoice, preventBodyScroll} from '../redux/actions'
import {getNestedObject,getProductImage} from '../functions'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT, IPAD_BREAKPOINT,MEDIUM_BREAKPOINT,DEFAULT_ENGRAVING_CHARACTER_LIMIT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'
function postNoteWindow(props) {
    const {t}=useTranslation('common');
    const [animateOnce, setAnimateOnce] = useState("none")
    const textareaRef=useRef();
    const noteTextRef=useRef();
    const maxNoteTextHeightRef=useRef();
    let product = props.cache.products[props.item.split("-")[0]]
    const [disableTyping,setDisableTyping] = useState(false)
    const [nextDisabled,_setNextDisabled] = useState(false)
    const nextDisabledRef = useRef(nextDisabled);
    const setNextDisabled = data => {
        nextDisabledRef.current = data;
        _setNextDisabled(data);
    };
    function keyDownHandler(e){
        if(nextDisabledRef.current){
            if(e.keyCode == 8){
                setDisableTyping(false)
            } else {
                setDisableTyping(true)
            }
        } else {
            setDisableTyping(false)
        }
    } 
    useEffect(()=>{
        if(animateOnce!="active"){
            if(props.mainSliderIndex==(product.engraving_possible?3:2)){
                setAnimateOnce("active")
            }
        }
    },[props.mainSliderIndex])
    useEffect(()=>{
        setNextDisabled(props.isNextDisabled)
    },[props.isNextDisabled])
    function onInputChange(val){
        if(!disableTyping){
            props.setNoteText(props.bundleId,val)
        }
        setTimeout(()=>{
            checkNoteTextHeight()
        },10)
    }
    function checkNoteTextHeight(){
        let maxHeight = maxNoteTextHeightRef.current?.getBoundingClientRect().height;
        let currentHeight = noteTextRef.current?.getBoundingClientRect().height + 9;
        if(currentHeight > maxHeight)
            props.disableNextButton(true)
        else
            props.disableNextButton(false)
    }
    return (
        <>
            <div key="note_slide" className={`postNoteWindow ${animateOnce}`}>
                <div className="engravingFourth positionRelative">
                    <div className="cardNoteSection">
                        <div className="noteImage">
                            {!!props.noteImage1 &&
                                <img className="width-100" src={props.noteImage1}/>
                            }
                        </div>
                        <div className="notePad canelaThin font16">
                            {!!props.noteImage2 &&
                                <img className="width-100 postCardImage2" src={props.noteImage2}/>
                            }
                            <div className="noteTextContainer positionRelative">
                                <div ref={maxNoteTextHeightRef} className="maxHeightHolder width-100">
                                    <span className="" ref={noteTextRef}>{`${props?.personalisation?.bundle[props.bundleId]?.noteText?.length > 0?props?.personalisation?.bundle[props.bundleId]?.noteText:props.defaultPostcard?t('yourMessageAppearsHere'):t('sayItWithUnsaid')}`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="noteFront"><h2 style={{animationDelay:"0.5s"}} className={`canelaThin font16 alignCenter ${props.mainSliderIndex==(product.engraving_possible?3:2)?"fadeUpAnimation":""}`}>{t('front')}</h2></div>
                    <div className="noteBack"><h2 style={{animationDelay:"0.5s"}} className={`canelaThin font16 alignCenter ${props.mainSliderIndex==(product.engraving_possible?3:2)?"fadeUpAnimation":""}`}>{t('back')}</h2></div>
                    <div className="noteSectionDetails">
                        {/* <h1 style={{animationDelay:"1.1s"}} className={`heading alignCenter canelaThin font24 ${props.mainSliderIndex==(product.engraving_possible?3:2)?"fadeUpAnimation":""}`}>Add a personal note</h1> */}
                        <div style={{animationDelay:"0.6s"}} className={`textInputWrapper alignCenter ${props.mainSliderIndex==(product.engraving_possible?3:2)?"fadeUpAnimation":""}`}>
                            <div className="textInput alignLeft positionRelative">
                                <textarea onKeyDown={(e)=>keyDownHandler(e)} rows="2" cols="50" ref={textareaRef} onChange={e=>onInputChange(e.target.value)} maxlength={1000} placeholder={t('addPersonalNote')} value={props?.personalisation?.bundle[props.bundleId]?.noteText?props.personalisation.bundle[props.bundleId].noteText:""} className="font24"></textarea>
                                {props.isNextDisabled && <h4 className="textExceedingMsg positionAbsolute anoRegular error">{t('pleaseReduceNoteSize')}</h4>}
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .textExceedingMsg{
                    bottom:-18px;
                    right:0;
                }
                .maxHeightHolder{
                    height:100%;
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    overflow:hidden;
                }
                .noteTextContainer{
                    padding:10.8% 16.66% 22.8%;
                    width:100%;
                    height:100%;
                }
                .postNoteWindow{
                    padding:6rem 0 0;
                }
                .textInput textarea{
                    font-family: CanelaThin, sans-serif;
                    border-bottom:1px solid #000000;
                    border-top:none;
                    border-left:none;
                    border-right:none;
                }
                .notePad span{
                    white-space: pre-wrap;
                    display:inline-block;
                    line-height:14px;
                    overflow-wrap: anywhere;
                    font-size:9px;
                }
                .noteFront, .noteBack{
                    position:absolute;
                    top:420px;
                    left:50%;
                }
                .noteFront{
                    transform:translateX(calc((-50%) - 140px));
                }
                .noteBack{
                    transform:translateX(calc((-50%) + 140px));
                }
                .cardNoteSection{
                    transform:translateX(-6rem);
                    transition:all 0.5s ease-out 0.5s;
                }
                .active .cardNoteSection{
                    transform:translateX(0rem);
                }
                .noteImage{
                    background:#ffffff;
                    width:250px;
                    height:350px;
                    position:absolute;
                    top:56px;
                    left:50%;
                    transform:translateX(calc((-50%) - 140px));
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
                }
                .noteImage img{
                    height:100%;
                }
                .notePad img{
                    height:100%;
                }
                .notePad{
                    overflow:hidden;
                    z-index:-9;
                    position:absolute;
                    top:56px;
                    left:50%;
                    transform:translateX(calc((-50%) - 140px));
                    width:250px;
                    height:350px;
                    background:#fbfaf8;
                    overflow-wrap: break-word;
                    line-height: 24px;
                    transition:all 0.5s ease-out 1s;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
                }
                .active .notePad{
                    transform:translateX(calc((-50%) + 140px));
                }
                .noteSectionDetails{
                    position:absolute;
                    top:475px;
                    left:50%;
                    transform:translateX(-50%);
                    padding-bottom:10rem;
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
                .textCount{
                    position:absolute;
                    bottom:0.8rem;
                    right: 3px;
                }
                .textInput input{
                    padding:0 0 0.8rem 0;
                    border:0;
                    width:80%;
                }
                .textInput textarea{
                    background: #ffffff;
                    padding:1rem 3rem 1rem 0;
                    width:100%;
                    resize: none;
                    min-height: 36px;
                    -ms-overflow-style: none;  
                    scrollbar-width: none;  
                }
                .textInput textarea::-webkit-scrollbar {
                    display: none;
                }
                .textInput{
                    display:inline-block;
                    width:42.2rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({gifting,common,cache,personalisation}){
    return {gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{setEngravingText,setNoteText,setBoxChoice,setCardChoice})(postNoteWindow)