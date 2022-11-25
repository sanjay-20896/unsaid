import React from 'react'
import Link from 'next/link'
import Caret from '../components/caret'
import {MEDIUM_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import LazyImage from './lazyImage'
import TextAndArrowCta from './textAndArrowCta'
import useTranslation from 'next-translate/useTranslation'
export default function Story(props) {
    const {t}=useTranslation('common');
    return (
        <>
         <div className={`story ${props.hideText?"hideText":""}`}>
         <Link href={props.link}>
            <a>
                <div>
                    <div className="imageWrap">
                        <LazyImage 
                            alt={props.heading}
                            originalSrc={props.imgSrc} 
                            placeholderSrc={props.placeholderSrc} 
                            width={561} 
                            height={561} 
                            paddingTop="100%" 
                        />
                    </div>
                    {!!props.heading && <h2 style={{minHeight:props.minHeadingHeight}} className="heading canelaThin font32" ref={el => props.refCallBackHeading(el)}>{props.heading}</h2>}
                    {!!props.desc && <div style={{minHeight:props.minDescHeight}} className="desc anoHalfRegular" ref={el => props.refCallBackDesc(el)}>{props.desc}</div>}
                    <div className="font16 readMore">
                        <TextAndArrowCta text={t('read')} />
                    </div>
                </div>
            </a>
            </Link>
        </div>  
        <style jsx>{`
            .storyImgWrapper{
                padding-top:100%;
            }
            .desc{
                font-size: 1.6rem;
                line-height: 2.4rem;
            }
            .imageWrap{
                margin-bottom: 1.8rem;
            }
            .storyImg{
                position:absolute;
                z-index:1;
                top:0;
                left:0;
            }
            .heading{
                margin-bottom:2.4rem;
            }
            .desc{
                margin-bottom:2.4rem;
                letter-spacing:0.5px;
                //min-height:7.2rem;
            }
            @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                .desc{
                    min-height:6.3rem;
                }
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .desc{
                    min-height:5.4rem;
                }
            }
            @media screen and (max-width: 920px){
                .heading{
                    font-size:2rem;
                    line-height:3rem;
                }
            }
            @media screen and (max-width: 920px){
                .desc{
                    min-height:7.2rem;
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .heading{
                    margin-bottom:1.6rem;
                    font-size: 2.4rem;
                    line-height: 3.2rem;
                }
                .imageWrap{
                    margin-bottom: 1.6rem;
                }
                .story.hideText .heading,
                .story.hideText .desc,
                .story.hideText .link{
                    opacity:0;
                    transition:opacity 0.3s ease-out 0.3s;
                }
                .desc{
                    font-size:2.1rem;
                    line-height:2.4rem;
                    margin-bottom:1.2rem;
                }
                .readMore{
                    font-size:1.6rem;
                    line-height:2.4rem;
                }
            }
        `}</style> 
        </>
    )
}
