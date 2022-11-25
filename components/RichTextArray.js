import { MOBILE_BREAKPOINT } from "../config";
import BlockContent from '@sanity/block-content-to-react'
import {serializers} from '../serialiser'

export default function textArray(props){
    return(
        <>
            <div className={`wrapper ${props.textAlignLeft?"alignLeft":"alignCenter additionalPaddingMobile"}`}>
                {props.text[0] &&
                    <div className={`textFieldOne ${props.descFontSize} canelaThin rich-text`}><BlockContent serializers={serializers} blocks={props.text[0].richText}/></div>
                }
                {props.text[1] &&
                    <div className={`textFieldTwo canelaThin ${props.descFontSize} rich-text`}><BlockContent serializers={serializers} blocks={props.text[1].richText}/></div>
                }
                {!!props.text[2] && 
                    <>
                        <br/><div className={`textFieldTwo canelaThin ${props.descFontSize} rich-text`}>{props.text[2]? <BlockContent serializers={serializers} blocks={props.text[2].richText}/>:""}</div>
                    </>
                }
            </div>
            <style jsx>{`
                
            `}</style>
            <style jsx global>{`
                .wrapper h1{
                    font-size: 3.2rem;
                    line-height: 4rem;
                    font-family: CanelaThin, Garamond, Georgia, serif;
                }
                .wrapper .textFieldOne div h1{
                    margin-bottom: 0rem;
                }
                .wrapper .textFieldOne div h1:last-of-type{
                    margin-bottom: 3.2rem;
                }
                .wrapper .textFieldOne div p{
                    margin-bottom: 1.2rem;
                    font-size: 2rem;
                }
                .wrapper .textFieldOne div p:last-of-type{
                    margin-bottom: 0rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .wrapper h1{
                        font-size: 2.4rem;
                        line-height: 3.2rem;
                    }
                }
            `}</style>
        </>
    )
}