import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux'
function threeImgSet(props) {
    function imageClick(){
        alert('image lcick')
        if(props.showGalleryModal)
        props.showGalleryModal()
    }
    return (
        <>
         <div className="imgsContainer paddedContent">
             {!!props.img1 && !!props.img2 &&
             <div  className="firstTwo">
                <div onClick={()=>imageClick()}>
                    <LazyLoadImage
                        alt={"Model image"}
                        effect="opacity"
                        src={props.img1}
                        width="100%"
                    />
                </div>
                <div onClick={()=>imageClick()}>
                    <LazyLoadImage
                        alt={"Model image"}
                        effect="opacity"
                        src={props.img2}
                        width="100%"
                    />
                </div>
             </div>
            }
            {!!props.img3 &&
                <div onClick={()=>imageClick()} className="thirdImg">
                    <LazyLoadImage
                        alt={"Model image"}
                        effect="opacity"
                        src={props.img3}
                        width="100%"
                    />
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
                margin-bottom:0.4rem;
            }
            .firstTwo div{
                padding-right:0.7rem;
                width:50%;
            }
            .galleryWindow{
                position:fixed;
                background:#FFFFFF;
                width:100%;
                height:calc(${props.common.windowHeight2}px);
                top: 0;
                left: 0;
                z-index: 999;
                overflow-y:scroll;
                transform:translateY(-100%);
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
                transition:all 0.3s ease-out;
            }
            .galleryWindow::-webkit-scrollbar {
                display: none;
            }
            .showGallery .galleryWindow{
                transform:translateY(0%);
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
            
         `}</style>  
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(threeImgSet)
