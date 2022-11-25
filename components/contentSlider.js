import Space from './space'
import SwipeableViews from 'react-swipeable-views';
import { useState } from 'react';
import ContentItem from './contentItem';
import { sliderItems } from '../data/staticData';
import { MOBILE_BREAKPOINT } from '../config';



function contentSlider(props) {
    return(
        <>
        <div className="paddedContent">
            <div className="heading font40 canelaThin">{props.heading}</div>
            <div className="items">
                <SwipeableViews >
                    <ContentItem item={sliderItems} />
                </SwipeableViews>
            </div>
        </div>
        <style jsx>{`
       
        .heading{
            padding-bottom:4.8rem;
        }
       
        @media screen and (max-width:${MOBILE_BREAKPOINT}px){
            
            .heading{
                font-size:2rem;
                padding-bottom:2.4rem;
            }
        }
        
        `}</style>
        </>
    )
    
}
export default contentSlider;