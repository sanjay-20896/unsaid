import React, { useEffect, useRef, useState } from 'react'
import cssVariables from '../data/cssVariables';
import useTranslation from 'next-translate/useTranslation'

export default function Input(props) {
    const [focussing, setFocussing] = useState(false);
    const [optionsShown,showOptions] = useState(false)
    const [showPassword,setShowPassword]=useState(false)
    const [passwordType,setPasswordType]=useState("password")
    const inputRef = useRef(null)
    const {t}=useTranslation('common');
    useEffect(()=>{
        if(!!props.value || props.focus){
            setFocussing(true);
        }else{
            setFocussing(false);
        }
    },[]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                showOptions(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    function changePasswordToText(){
        if(passwordType==="password"){
            setPasswordType("text")
        }else{
            setPasswordType("password")
        }
    }
    useEffect(()=>{
        if(props.value)
            setFocussing(true)
    },[props.value])
    function selectOption(option){
        showOptions(false)
        if(props.onChange)
            props.onChange(option.label)
        // if(props.selectOption){
        //     props.selectOption(option)
        // }
    }
    let filteredOptions = []
    if(props.options)
        filteredOptions = props.options.filter(option=>{
            if(props.value==''){
                return true // show all countries in the list
            } else {
                return option.label.toLowerCase().indexOf(props.value.toLowerCase()) != -1
            }
        })

    return (
        <>
            <div ref={inputRef} className={`inputComponent positionRelative ${props.type==="date"?"dateType":""} ${focussing?"focussing":""} ${props.valid?"giftCardValid":""} ${props.checkBox?"checkBox":""} ${props.error?"error":""} ${!!props.description?"description":""} ${props.password?"password":""}`}>
                <div className="inputAndOptions">
                    <input 
                        type={props.type==="password"?passwordType:props.type} 
                        value={props.value} 
                        maxLength={!!props.maxlength?props.maxlength:""} 
                        onFocus={()=>{setFocussing(true);showOptions(true)}} 
                        onBlur={()=>{showOptions(false)}} 
                        className={`font16-notResponsive inputField ${props.textAlignClass?props.textAlignClass:""}`}
                        onChange={event => {setFocussing(true);!!props.onChangeValue?props.onChangeValue(event):""}} 
                        onKeyDown={event=>{!!props.enterKeyPressed?props.enterKeyPressed(event):""}}
                        autoComplete="off"
                        disabled={!!props.disabled}
                        max={!!props.max ? props.max : false}
                    />
                    {!!props.options &&
                        <div className={`options font16-notResponsive ${optionsShown?"show":""}`}>
                            {filteredOptions.map((option,id)=>{
                                if(option.value!=props.value)
                                    return <div key={id} className="option cursorPointer" onClick={()=>selectOption(option)}>{option.label}</div>
                            })}
                        </div>
                    }
                    {!!props.dropDownoptions &&
                        <div className={`options font16-notResponsive ${optionsShown?"show":""}`}>
                            {props.dropDownoptions.map((option,id)=>{
                                return <div key={id} className="option cursorPointer" onClick={()=>selectOption(option)}>{option.label}</div>
                            })}
                        </div>
                    }
                </div>
                <div className="font16-notResponsive anoRegular placeHolder grey">{focussing && !!props.placeHolderAfter ?props.placeHolderAfter:props.placeHolder}{!!props.required?<span>*</span>:<></>}</div>
                {props.error && props.type!="password" && <div className="alertIcon"><img src="/images/alertIcon.svg"/></div>}
                {props.error && <h4 className="errorMsg anoRegular">{props.errorMsg}</h4>}
                {!!props.description && !props.error && <h4 className="errorMsg anoRegular">{props.description}</h4>}
                {!!props.dropDownoptions && !props.error && 
                    <div className="dropDownArrow"></div>
                }
                {props.fpMsg && <h4 className="fpMsg positionAbsolute anoRegular">{t('passwordResetMsg')}</h4>}
                {props.valid && <div className="tickOnGiftCard"><img className="width-100" src="/images/Tick On.svg" /></div>}
                {props.type==="password" && <div onClick={()=>changePasswordToText()} className="tickOnGiftCard eye"><img className="width-100" src={passwordType=="text"?"/images/passwordShow.png":"/images/passwordHide.png"} /></div>}
            </div>   
            <style jsx>{`
                input[type="date"]:in-range::-webkit-datetime-edit-year-field, input[type="date"]:in-range::-webkit-datetime-edit-month-field, input[type="date"]:in-range::-webkit-datetime-edit-day-field, input[type="date"]:in-range::-webkit-datetime-edit-text { display: ${focussing?"inline-block":"none"}; }
                input[type="date"]{
                    display:block;
                    -webkit-appearance: textfield;
                    -moz-appearance: textfield;
                    min-width: 50%;
                    line-height: normal;
                    color: black;
                    text-align: left;
                    border-bottom:1px solid #787878;
                    border-radius: 0;
                }
                input[type="date"]::-webkit-date-and-time-value{ text-align:left; }
                .eye{
                    cursor:pointer;
                    width:20px;
                    height:20px;
                }
                .dropDownArrow{
                    width: 14px;
                    height: 14px;
                    border: 1px solid black;
                    right: 3px;
                    position: absolute;
                    top: ${optionsShown?"8px":"1px"};
                    border-right-color: transparent;
                    border-top-color: transparent;
                    transform: ${optionsShown?"rotate(135deg)":"rotate(-45deg)"};
                }
                .error.description .errorMsg{
                    color: #BF2012;
                }
                .description .errorMsg{
                    color:#787878;
                }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                .options{
                    position: absolute;
                    top: 3.8rem;
                    left: -0.1rem;
                    z-index: 1;
                    width: calc(100% + 0.2rem);
                    max-height:0;
                    overflow:hidden;
                    transition:max-height 0.3s;
                    background:#ffffff;
                    color:#000000;
                }
                .options.show{
                    max-height: 25rem;
                    overflow:scroll;
                }
                .options .option:not(:first-child){
                    // border-left:1px solid;
                    // border-right:1px solid;
                    // border-bottom:1px solid;
                }
                .options .option:first-child{
                    // border-left:1px solid;
                    // border-right:1px solid;
                    // border-bottom:1px solid;
                }
                .option{
                    padding-top:0.95rem;
                    padding-bottom:0.95rem;
                    padding-left:0.75rem;
                    padding-right:0.75rem;
                    border-color:${cssVariables.lightGrey};
                }
                input{
                    -webkit-appearance: none !important;
                    -moz-appearance: none !important;
                    appearance: none !important;
                    background-clip: padding-box;
                    box-shadow:none !important;
                    border:none;
                    width:100%;
                    border-bottom:1px solid #787878;
                    padding: 0 ${props.paddingRight?props.paddingRight:"3rem"} 8px 0;
                    background:transparent;
                }
                .alertIcon, .tickOnGiftCard{
                    position: absolute;
                    bottom: 3px;
                    right: 0;
                }
                .dateType .alertIcon{
                    right: 25px;
                }
                .password .errorMsg{
                    bottom: -43px;
                }   
                .fpMsg{
                    position:absolute;
                    bottom: -24px;
                    color:#000000;
                }
                .errorMsg{
                    position:absolute;
                    top: 105%;
                }
                .error input{
                    border-bottom:1px solid #BF2012;
                }
                .error .placeHolder{
                    color:#BF2012;
                }
                .placeHolder{
                    display: inline-block;
                    position: absolute;
                    bottom: 0.8rem;
                    left: 0;
                    pointer-events:none;
                    transition:all 0.5s ease-out;
                }
                .focussing .placeHolder{
                    bottom: 3.6rem;
                    font-size:1.2rem;
                }
                .focussing{
                    //padding-top: 22px;
                }   
                .checkBox input{
                    width:2.4rem;
                    height:2.4rem;
                    margin:0;
                }
                .focussing.placeHolderAfter .placeHolder{
                    content:${props.placeHolderAfter};
                }
            `}</style>
        </>
    )
}
