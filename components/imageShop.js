import Sanity from './../sanity'
import imageUrlBuilder from "@sanity/image-url";
import { MOBILE_BREAKPOINT } from '../config';
import DropDown from './dropdownDynamic';
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from './lazyImage';
import {getImageUrl} from "../functions"
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables';

export default function imageShop(props){
    return(
        <>
            <div className="innercontainer">
                <div className="imageContainer">
                    <LazyImage
                            alt="Image shop"
                            originalSrc={getImageUrl(props.data.image,1090)}
                            placeholderSrc={getImageUrl(props.data.image,20)}
                            width={1090}
                            height={614}/>
                </div>
                <div className="dropDown">
                    <DropDown
                        // headingText="heading"
                        defaultValue={props.label}
                        fontSize="font16-notResponsive"
                        fontFamily="anoRegular"
                        dropDownValuesAsProduct={!!props.dropDownProducts?props.dropDownProducts:null}
                       
                    />
                </div>
            </div>
            <style jsx>{`
                .innercontainer{
                    padding:0 12.15%;
                }
                .imageContainer{
                    margin-bottom:2.4rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .innercontainer{
                        padding-left:${paddingLeftMobile};
                        padding-right:${paddingRightMobile};
                    }
                    .dropDown{
                        text-align:center;
                    }
                }
            `}</style>
        </>
    )
}