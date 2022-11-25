import { MOBILE_BREAKPOINT } from "../config";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from '@sanity/block-content-to-react'
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import Sanity from './../sanity'
import  { getImageUrl} from "./../functions"
function columnData(props){
    return(
        <>
        <div className="hideForMobile paddedContent">
            <div className="columnWrapper">
                {!!props.data && Array.isArray(props.data) && props.data.map((item)=>{
                    return(
                        <>
                            <div className="item">
                                <div className="heading font24 canelaThin">{item.title}</div>
                                <div className="desc font16 anoHalfRegular">{item.description}</div>
                                <div className="image">
                                    <img className="width-100" src={ getImageUrl(item.image)}/>
                                </div>
                            </div>
                            
                        </>
                    )
                })}
            </div>
        </div>
       <div className="showForMobile paddedContent">
           <div className="columnWrapper">
           {!!props.data && Array.isArray(props.data) && props.data.map((item)=>{
            return(
                <>
                                <div className="item">
                                    <div className="heading font24  canelaThin">{item.title}</div>
                                    <div className="image">
                                        <img className="width-100" src={getImageUrl(item.image)}/>
                                    </div>
                                    <div className="desc font16 anoHalfRegular">{item.description}</div>
                                </div>
                                
                </>
            )
        })} 
           </div>
        
       </div>
        <style jsx>{`
        .columnWrapper{
            display:flex;
            padding-left:11.1rem;
            padding-right:11.1rem;
        }
        .image{
            width:100%;
            padding-bottom:3.2rem;
        }
        .heading{
            padding-bottom:2.4rem;
            text-align:center;
        }
        .desc{
            padding-bottom:2.4rem;
            text-align:center;
            padding-left:13.77%;
            padding-right:13.77%;
            width:100%;
        }
        .item{
           padding-right:2.4rem;
        }
        @media screen and (max-width:${MOBILE_BREAKPOINT}px){
            .columnWrapper{
                display:contents;
                
            }
            .item{
                padding-right:0rem;
                padding-bottom:2.4rem;
            }
            .heading{
                padding-bottom:2.4rem;
            }
            .image{
                padding-bottom:2.4rem;
            }
            .desc{
                width:100%;
            }

        }
        
        `}</style>
        </>
    )
}
export default columnData;