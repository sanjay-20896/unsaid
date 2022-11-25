import React, { useEffect, useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function VideoContainer(props) {
    const [showPlayIcon,setShowPlayIcon]=useState(true)
    const videoRef=useRef(null)
    useEffect(()=>{
        videoRef.current.onplay=()=>{
            setShowPlayIcon(false)
        }
        videoRef.current.onpause=()=>{
            setShowPlayIcon(true)
        }
    },[])
    return (
        <>
            <div className="video positionRelative">
                {/* <LazyLoadImage 
                    src={props.video}
                    width="100%"
                    alt="Image"
                /> */}
                <video width="400" ref={videoRef} controls playsInline id>
                    <source src={props.video} type="video/mp4" />
                    Your browser does not support HTML video.
                </video>
                <div className="playIcon" >
                   {showPlayIcon && <img src="/images/playIconWhite.svg" alt="Play Icon" className="width-100"/>}
                </div>
            </div> 
            <style jsx>{`
                video{
                    width:100%;
                }
                .playIcon{
                    width:4.8rem;
                    width:4.8rem;
                    position:absolute;
                    top:50%;
                    left:50%;
                    transform:translate(-50%,-50%);
                    cursor:pointer;
                    pointer-events:none
                }
                .playIcon img{
                    height:100%;
                }
            `}</style>  
        </>
    )
}
