import { useState } from "react"
import {MOBILE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'

export default function CartNoteText(props){
    const {t}=useTranslation('common')

    const [moreText,showMoreText] = useState(false)
    let textPart1 = props?.noteText?.slice(0,30)
    let textPart2 = props?.noteText?.slice(25)
    let noteText = props?.noteText?.slice(0,25)
    return (
        <>
            {!props.readMore && <div>"{noteText}..."</div>}
           {!!props.readMore &&<div className={`noteTextCart ${moreText?"moreText":""}`}>{!!textPart2?!moreText?<><span>"{textPart1}...</span><span className="readMoreButton"><span className="underlineLR active" onClick={()=>showMoreText(true)}>{}</span></span></>:<><span>"{textPart1}{textPart2}"</span><span className="readLessButton" onClick={()=>showMoreText(false)}><span className="underlineLR active">{t('readLess')}</span></span></>:`"${props.noteText}"`}</div>}
            <style jsx>{`
                .noteTextCart{
                    display: flex;
                    justify-content: space-between;
                }
                .noteTextCart.moreText{
                    display: block;
                }
                .readLessButton{
                    display: block;
                    text-align: right;
                    margin-top: 13px;
                }
                .readMoreButton{
                    width: 10rem;
                    text-align: right;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .readMoreButton{
                        width: 7rem;
                    }   
                }
            `}</style>
        </>
    )
}