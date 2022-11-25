import React, { useEffect, useState } from 'react'
import useDevice from '../hooks/useDevice'
import ImageOrVideo from './ImageOrVideo';
import Styles from '../styles/heroModuleAlt2.module.scss'
import Link from 'next/link';
import {MOBILE_BREAKPOINT} from '../config'

export default function RandomBanner(props) {
    // console.log("props",props);
    const [randomMedia, setRandomMedia] = useState(props?.media[0])
    let {deviceName} = useDevice();
    useEffect(()=>{
        const random = !!props?.media && props.media[Math.floor(Math.random() * props.media.length)];
        // const random = !!props?.media && props.media[2];
        random.craftsmanshipMediaType = random.mediaType
        random.heightDesktop = random?.video?.heightDesktop
        random.heightMobile = random?.video?.heightMobile
        random.widthDesktop = random?.video?.widthDesktop
        random.widthMobile = random?.video?.widthMobile
        setRandomMedia(random)
    },[])
    // console.log("randomMedia",randomMedia);
    return (
        <>
            <div className={`randomHomeBanner `}>
                <div className='positionRelative'>
                    <Link href={!!randomMedia?.link?randomMedia.link:"#"}><a><ImageOrVideo fullBleedMobile={props.fullBleedMobile} fullBleed={props.fullBleed} data={randomMedia}/></a></Link>
                    {!!randomMedia?.label &&
                        <h2 className="videoLabel white font48 canelaThin alignCenter positionAbsolute">{randomMedia.label}</h2>
                    }
                    {!!randomMedia?.buttonLabel && !!randomMedia?.link &&
                        <div className="ctaOnVideo positionAbsolute"><Link href={randomMedia.link}><a><button className="btnTransparentWhite anoRegular">{randomMedia.buttonLabel}</button></a></Link></div>
                    }
                </div>
                <h2 className={`font32 ${Styles.heroText} canelaThin black alignCenter`}>
                    {props.desc}
                </h2>
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
                    bottom: 4rem;
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
