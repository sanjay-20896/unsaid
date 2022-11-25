import { MOBILE_BREAKPOINT } from "../config";


export default function textArray(props){
    return(
        <>
            <div className={`wrapper ${props.textAlignLeft?"alignLeft":"alignCenter additionalPaddingMobile"}`}>
                {props.text[0] &&
                    <div className="textFieldOne font32 canelaThin">{props.text[0].textData}</div>
                }
                {props.text[1] &&
                    <div className={`textFieldTwo canelaThin ${props.descFontSize}`}>{props.text[1].textData}</div>
                }
                {!!props.text[2] && 
                    <>
                        <br/><div className={`textFieldTwo canelaThin ${props.descFontSize}`}>{props.text[2]? props.text[2].textData:""}</div>
                    </>
                }
            </div>
            <style jsx>{`
                .textFieldOne{
                    margin-bottom:3.2rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    
                }
            `}</style>
        </>
    )
}