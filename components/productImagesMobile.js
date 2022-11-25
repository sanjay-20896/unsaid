import React from 'react'
import LazyImage from './lazyImage'
import { connect } from 'react-redux'
import {MOBILE_BREAKPOINT} from '../config'

function threeImgSet(props) {
    // function imageClick(imageType){
    //     if(props.showGalleryModal)
    //     props.showGalleryModal({status:true,imageType:imageType})
    // }

    // useEffect(()=>{
    //     console.log("isOnScreen",isOnScreen);   
    // },[isOnScreen])
    
    return (
        <>
         <div className="imgsContainer paddedContent">
            {!!props.v2 && !!props.v3 &&
                <div  className="firstTwo">
                    <div onClick={()=>props.showGalleryModal({status:true,imageType:"v2"})}>
                        <LazyImage 
                            alt="View 2"
                            originalSrc={props.v2} 
                            placeholderSrc={props.v2Blur}
                            width={600} 
                            height={600} 
                        />
                        {/* <div className="iconToGallery small left positionAbsolute showForMobile"><img src="/images/2dIconNew.png" className="width-100" alt="3D-Icon"/></div> */}
                    </div>
                    <div onClick={()=>props.showGalleryModal({status:true,imageType:"v3"})}>
                        <LazyImage 
                            alt="View 3"
                            originalSrc={props.v3} 
                            placeholderSrc={props.v3Blur}
                            width={600} 
                            height={600} 
                        />
                        {/* <div className="iconToGallery small left positionAbsolute showForMobile"><img src="/images/2dIconNew.png" className="width-100" alt="3D-Icon"/></div> */}
                    </div>
                </div>
            }
            {!!props.f1 &&
                <div onClick={()=>props.showGalleryModal({status:true,imageType:"f1"})} className="otherImg positionRelative">
                    <LazyImage 
                        alt="Product Features"
                        originalSrc={props.f1} 
                        placeholderSrc={props.f1Blur}
                        width={600} 
                        height={600} 
                    />
                    <div className="iconToGallery big center positionAbsolute showForMobile"><img src="/images/2dIconNew.png" className="width-100" alt="3D-Icon"/></div>
                </div>       
            }
            {!!props.m1 &&
                <div onClick={()=>props.showGalleryModal({status:true,imageType:"m1"})} className="otherImg">
                    <LazyImage 
                        alt="Model 1"
                        originalSrc={props.m1} 
                        placeholderSrc={props.m1Blur}
                        width={600} 
                        height={600} 
                    />
                    {/* <div className="iconToGallery big left positionAbsolute showForMobile"><img src="/images/2dIconNew.png" className="width-100" alt="3D-Icon"/></div> */}
                </div>       
            }
            {!!props.m2 &&
                <div onClick={()=>props.showGalleryModal({status:true,imageType:"m2"})} className="otherImg">
                    <LazyImage 
                        alt="Model 2"
                        originalSrc={props.m2} 
                        placeholderSrc={props.m2Blur}
                        width={600} 
                        height={600} 
                    />
                    {/* <div className="iconToGallery big left positionAbsolute showForMobile"><img src="/images/2dIconNew.png" className="width-100" alt="3D-Icon"/></div> */}
                </div>       
            }     
         </div> 
         <style jsx>{`
            .cartButton{
                text-align:center;
                padding:3.2rem 3.6rem 4.8rem 3.6rem;
            }
            .cartButton .favButton{
                margin-bottom:3.2rem;
            }
            .cartButton button{
                width:100%;
            }
            .firstTwo{
                display:flex;
                margin-right:-0.7rem;
            }
            .firstTwo > div{
                padding-right:0.7rem;
                width:50%;
            }
            .otherImg{
                margin-top:0.4rem;
            }
            .header{
                padding-top:2rem;
                padding-bottom:2rem;
                display:flex;
                justify-content:space-between;
                align-items:center;
            }
            .allImages{
                padding:0 0.8rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .iconToGallery{
                    width:22px;
                    height: 22px;
                    z-index: 9;
                }
                .iconToGallery.small{
                    bottom: 10px;
                }
                .iconToGallery.big{
                    bottom: 20px;
                }
                .iconToGallery.center{
                    left: 50%;
                    transform: translateX(-50%);
                }
                .iconToGallery.left.small{
                    left: 10px;
                }
                .iconToGallery.left.big{
                    left: 20px;
                }
            }
         `}</style>  
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(threeImgSet)
