import NextImage from 'next/image'
import { useState,useEffect,useRef } from 'react'
import useOnScreen from '../hooks/useOnScreen'
import { MOBILE_BREAKPOINT } from '../config'
export default function LazyImage(props){
    const imgWrapperRef = useRef(null)
    const [loadingComplete,setLoadingComplete] = useState(false)
    const isOnScreen = useOnScreen(imgWrapperRef)
    const [delayTimeup,setDelayTimeup] = useState(false)
    function afterLoad(){
        setLoadingComplete(true)
        if(props.afterLoad)
            props.afterLoad()
    }
    useEffect(()=>{
        if(isOnScreen && props.delayShowingLazyPlaceholder){
            setTimeout(()=>{
                setDelayTimeup(true)
            },props.delayShowingLazyPlaceholder)
        }
    },[isOnScreen])
    let bgColor = props.bgColor?props.bgColor:"#ffffff"
    return (
        <>
            <div className={`lazyImageWrapper ${props.objectFitCover?"objectFitCover":""} ${(props.delayShowingLazyPlaceholder && delayTimeup && !loadingComplete) || (!props.delayShowingLazyPlaceholder && !loadingComplete)?"lazyShineAnimation":""} overflowHidden ${loadingComplete?"loadComplete":""}`}>
                <div className={`lazyImageContent ${loadingComplete?"show":""}`} ref={imgWrapperRef}>
                    {!!props?.originalSrc && 
                        <NextImage 
                            className="lazyImg"
                            alt={!!props.alt?props.alt:"Image"}
                            src={props.originalSrc} 
                            width={props.width} 
                            height={props.height} 
                            layout="responsive" 
                            quality={100}
                            onLoadingComplete={(e) => {afterLoad()}}
                            // unoptimized={true}
                            priority={!!props.priority?props.priority:false}
                            lazyBoundary="500px"
                        />
                    }
                </div>
            </div>
            <style jsx>{`
                .lazyImageWrapper{
                    padding-top:${props.height*100/props.width}%;
                    position:relative;
                    background-color:${loadingComplete?bgColor:(props.delayShowingLazyPlaceholder && delayTimeup && !loadingComplete) || (!props.delayShowingLazyPlaceholder && !loadingComplete)?"#f2f2f2":"#ffffff"};
                }
                .lazyImageContent{
                    position:absolute;
                    width:100%;
                    height:100%;
                    overflow:hidden;
                    top:0;
                    left:0;
                    opacity:0;
                    z-index:2;
                    transform:${props.scale? `scale(${props.scale})`:"none"}
                }
                .lazyImageContent.show{
                    opacity:1;
                }
                // .lazyShineAnimation{
                //     transform:${!!props.scale ? `scale(-${props.scale})`:"none"}
                // }
                .lazyShineAnimation.loadComplete::after{
                    display:none;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .lazyImageContent{
                        transform:${props.scale? `scale(${props.scale})`:"none"} 
                    }
                }
                
            `}</style>
            <style jsx global>{`
                .lazyImageWrapper.objectFitCover img{
                    object-fit: cover;
                }
            `}</style>
        </>
    )
}