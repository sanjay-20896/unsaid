import React, {useState} from 'react'
import SwipeableViews from 'react-swipeable-views';
import LazyLoad from 'react-lazyload';
import {MOBILE_BREAKPOINT} from '../config'
import SimpleProductListing from './simpleProductListing'

export default function exploreProducts(props) {

    const [index, setIndex] = useState(0)

    let handleChangeIndex = index => {
        setIndex(index)
      }
    let springConfig={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    let stylePadding={};
    let slidePadding={};
    if(props.device==="desktop"){
        stylePadding={
            padding:"0 37.4rem 0 0"
        }
        slidePadding={
            padding:"0 24px 0 0"
        }
    }else{
        stylePadding={
            padding:"0 1.6rem 0 0"
        }
        slidePadding={
            padding:"0 1.6px 0 0"
        }
    }
    
    return (
        <>
         <div className= {`exploreProducts ${!!props.products?"productPage":""}`}>
            <div className="exploreHeading font32 canelaThin">Explore more...</div>
            {!!props.moreCollections &&
                <SwipeableViews style={stylePadding} slideStyle={{padding:"0 24px 0 0"}} index={index} onChangeIndex={()=>handleChangeIndex} springConfig={springConfig}>
                {props.moreCollections.map(collection=>{
                    return(
                        <div className="collectionWrapper">
                            <div className="imgWrapper">
                                <LazyLoad offset={500}>
                                    <img src={collection.img} className="width-100"/>
                                </LazyLoad>
                            </div>
                            <div className="collectionHeading font24 canelaThin black">{collection.collectionHeading}</div>
                            <div className="collectionContent font16-notResponsive anoRegular grey">{collection.content}</div>
                        </div>
                    )
                })}
            </SwipeableViews>}
            
         </div>  
            {!!props.products &&
                <div>
                    <SimpleProductListing products={props.products}/>
                </div>    
            } 
         <style jsx>{`
            .exploreProducts{
                padding-left:4.44%;
                //padding-right:4.44%;
            }
            .exploreHeading{
                margin-bottom:4.8rem;
            }
            .imgWrapper{
                margin-bottom:2.4rem;
            }
            .collectionHeading{
                margin-bottom:1.2rem;
            }
            .collectionWrapper{
                padding-right:2.4rem;
            }
            .collectionWrapper:last-child{
                padding-right:0rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .exploreProducts{
                    padding-left:9.6%;
                }
                .exploreHeading{
                    margin-bottom:2.4rem;
                }
                .productPage .exploreHeading{
                    margin-bottom:3.2rem;
                }
                .collectionContent{
                    letter-spacing:0.5px;
                }
                .imgWrapper{
                    margin-bottom:1.6rem;
                }
            }
         `}</style>
        </>
    )
}
