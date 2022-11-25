import {useState,useEffect} from 'react'
import ThreeStepText from '../components/threeStepText'
import {MOBILE_BREAKPOINT} from '../config'
import {connect} from 'react-redux'
import imageUrlBuilder from "@sanity/image-url";
import Sanity from './../sanity';
import NextImage from 'next/image'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
function CraftModule(props) {
    const [device,setDevice] = useState(null)
    useEffect(()=>{
        if(props.common.windowWidth)
            setDevice(props.common.windowWidth<=MOBILE_BREAKPOINT?"mobile":"desktop")
        else
            setDevice(window.innerWidth<=MOBILE_BREAKPOINT?"mobile":"desktop")
    },[props.common.windowWidth])
    return (
        <>
        <div className="wrapper positionRelative">
                <div className="imageBg positionAbsolute">
                    {(device=="mobile" || device=="desktop") &&
                            <NextImage 
                                alt={props.subHeading}
                                src={device=="mobile"?urlFor(props.imageMobile).width(375).quality(100).format("webp").url():urlFor(props.imageDesktop).width(1920).quality(100).format("webp").url()}
                                width={device=="mobile"?375:1920} 
                                height={device=="mobile"?812:1080} 
                                layout="fill" 
                                quality={100}
                            />
                    }
                </div>
                <div className="overlay positionAbsolute"></div>
                <div className="textOnImg white positionAbsolute ">
                    <ThreeStepText lockState={true} fadeIn={true} smallText={props.mainHeading} largeText={props.subHeading} desc={props.desc} />
                </div>
         </div>
         <style jsx>{`
            .link{
                cursor:pointer;
            }
            .wrapper{
                margin-bottom: -1rem;
                background:#000000;
                padding-top:56.25%;
            }
            .imageBg{
                width:100%;
                height:100%;
                left:0;
                top:0;
                z-index:1;
            }
            .overlay{
                z-index: 2;
                width: 100%;
                height: 100%;
                left:0;
                top: 0;
                background: #000000a6;
            }
            .textOnImg{
                width:47%;
                display:block;
                z-index:3;
                top: 50%;
                left: 50%;
                transform:translate(-50%,-50%);
            } 
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){  
                .wrapper{
                    padding-top:216%;
                }
                .textOnImg{
                    width:calc(100% - 6.4rem);
                }              
            }
            @media screen and (min-width: 2001px){
                .wrapper{
                    margin-bottom:15.1rem;
                }
            }
         `}</style>
         <style jsx global>{`
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){ 
                .craftContainer .textOnImg .container .desc{
                    font-size:2.1rem;
                    font-family: AnoHalfRegular, sans-serif;
                } 
            }
         `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(CraftModule)