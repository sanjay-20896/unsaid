import Layout from './layout';
import Space from './space';
import SEO from './SearchEngineOptimisation'
import Sanity from '../sanity';
const imageBuilder = imageUrlBuilder(Sanity);
const urlFor = source => imageBuilder.image(source);
import imageUrlBuilder from "@sanity/image-url";
import {getImageUrl} from "../functions"
import { MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT } from '../config';
import { paddingLeftMobile, paddingRightMobile, paddingLeftTabletLandscape, paddingRightTabletLandscape, paddingLeftTabletPortrait, paddingRightTabletPortrait  } from '../data/cssVariables';
export default function legal(props){
    return(
        <>
        {props.seo && <SEO
              title={props.seo?.title}
              description={props.seo?.description}
              image={getImageUrl(props.seo.image)} 
            />}
        <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            <div className="container  standardPaddingBottom">
                {/* <Space height="6.4rem" mobileHeight="4.8rem"/> */}
                <div className="font40 canelaThin alignCenter heading  textCenter">{props.name}</div>
                <div className="anoHalfRegular content font16-notResponsive text textHeavyBlockContentWrapper ">
                    {props.content}
                </div>
            </div>
        </Layout>
        <style jsx >{`
            // .container{
            //     width:858px;
            // }
            .heading{
                margin-bottom:5.6rem;
                margin-top:11.2rem;
            }
            .content{
                width:858px;
                max-width:100%;
                margin:auto;
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                // .container{
                //     padding:0 7%;
                // }
                .heading{
                    margin-bottom:3.6rem;
                }
                .content{
                    width:100%;
                    padding-left:${paddingLeftTabletLandscape};
                    padding-right:${paddingRightTabletLandscape};
                }
            }
            @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                // .container{
                //     padding:0 4%;
                // }
                .content{
                    width:100%;
                    padding-left:${paddingLeftTabletPortrait};
                    padding-right:${paddingRightTabletPortrait};
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .content{
                    padding-left:${paddingLeftMobile};
                    padding-right:${paddingRightMobile};
                }
                // .container{
                //     width:100%;
                // }
            
            }
        `}</style>
        </>
    )
}