import React from 'react'
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import Video from "../components/video"
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
import ImageOrVideo from './ImageOrVideo'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'

export default function NewVideoSection(props) {
    const {t}=useTranslation('common');
    let data = props.data;
    data.craftsmanshipMediaType = data.mediaType;
    data.heightDesktop = data?.video?.heightDesktop
    data.heightMobile = data?.video?.heightMobile
    data.widthDesktop = data?.video?.widthDesktop
    data.widthMobile = data?.video?.widthMobile
    // console.log("nvs", props.data);
    return (
        <>
            <div className="newVideoSection positionRelative">
                <ImageOrVideo data={data}/>
                {!!data?.label &&
                    <h2 className="videoLabel white font48 canelaThin alignCenter positionAbsolute">{data.label}</h2>
                }
                {!!data?.link &&
                    <div className="ctaOnVideo positionAbsolute"><Link href={data.link}><a><button className="btnTransparentWhite anoRegular">{!!data?.buttonLabel?data.buttonLabel:t('learnMore')}</button></a></Link></div>
                }
            </div>
            <style jsx>{`
                .videoLabel{
                    width: 100%;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0;
                    text-align: center;
                    z-index: 9;
                    padding: 0 15px;
                }
                .ctaOnVideo a{
                    display: inline-block;
                }
                .ctaOnVideo{
                    bottom: 4.3rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 9;
                    width: 100%;
                    text-align: center;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .videoLabel{
                        top: 50%;
                        padding: 0 60px;
                        font-size: 3.2rem;
                        line-height: 4rem;
                    } 
                }
            `}</style>
        </>
    )
}
