
import { MOBILE_BREAKPOINT } from "../config";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Sanity from './../sanity'
import {getImageUrl} from "./../functions"
function giftInfo(props){
 return(
     <>
     <div className="hideForMobile paddedContent">
        <div className="giftingWrapper ">
            <div className="title anoHalfRegular font20 alignCenter">{props.giftInfo.title}</div>
            <div className="mainDesc font32 canelaThin alignCenter">{props.giftInfo.mainDesc}</div>
            <div className="subDesc font16 canelaThin alignCenter">{props.giftInfo.subDesc}</div>
            <div className="imageWrappers">
                <img src={getImageUrl(props.giftInfo.image)} className="width-100"/>
            </div>
        </div>
     </div>
     <div className="showForMobile paddedContent">
        <div className="giftingWrapper">
            <div className="title anoHalfRegular font12 alignCenter">{props.giftInfo.title}</div>
            <div className="mainDesc font32 canelaThin alignCenter">{props.giftInfo.mainDesc}</div>
            <div className="subDesc font16 canelaThin alignCenter">{props.giftInfo.subDesc}</div>
            <div className="imageWrappers">
                <img src={getImageUrl(props.giftInfo.image)} className="width-100"/>
            </div>
        </div>
     </div>
     <style jsx>{`
     .giftingWrapper{
         padding-left:11.1rem;
         padding-right:11.1rem;
     }
     .title{
         padding-bottom:3.2rem;
        
     }
     .mainDesc{
         padding-bottom:2.4rem;
         padding-left:35.35%;
         padding-right:35.35%;
     }
     .subDesc{
         padding-bottom:11.2rem;
         padding-left:35.35%;
         padding-right:35.35%;
     }
    
     @media screen and (max-width:${MOBILE_BREAKPOINT}px){
        .giftingWrapper{
            padding-left:0rem;
            padding-right:0rem;
        }
        .title{
            //padding-bottom:1.6rem;
        }
        .mainDesc{
            padding-left:0rem;
            padding-right:0rem;
            padding-bottom:1.6rem;
        }
        .subDesc{
            padding-left:0rem;
            padding-right:0rem;
            padding-bottom:4.8rem;
        } 
    }    
     `} 
    </style>
     </>
 )   
}

export default giftInfo;