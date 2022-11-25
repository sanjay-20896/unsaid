import Layout from "./layout";
import useDevice from '../hooks/useDevice'
import LazyImage from "./lazyImage"
import {getImageUrl} from "../functions"
import WarrantyForm from "./WarrantyForm";
import {MOBILE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,MEDIUM_BREAKPOINT} from '../config'

export default function WarrantyActivation(props) {
    let {deviceName} = useDevice();
    return (
        <Layout commonData={props.commonProps.commonData}>
            <div className="warrantyActivation">
                {!!props?.content?.title && <h1 className="title canelaThin font40 alignCenter">{props?.content?.title}</h1>}
                {!!props?.content?.des && <p className="desc anoHalfRegular font18 alignCenter">{props?.content?.des}</p>}
                <div className="imageAndForm">
                    <div className="left">
                        {deviceName!="mobile" ?
                            <LazyImage 
                                alt={"Warranty"}
                                originalSrc={props?.content?.desktopImage}
                                width={530}
                                height={598} 
                            />
                        :
                            <LazyImage 
                                alt={"Warranty"}
                                originalSrc={getImageUrl(props?.content?.mobileImage)}
                                // placeholderSrc={props.data.desktopBlurUrl}
                                width={303}
                                height={169}
                            />
                        }
                    </div>
                    <div className="right">
                        <WarrantyForm/> 
                    </div>
                </div>
            </div>
            <style jsx>{`
                .warrantyActivation{
                    padding: 12rem 12.29% 24.8rem;
                }
                .title{
                    margin-bottom: 2.8rem;
                }
                .desc{
                    width: 67rem;
                    margin: 0 auto 12rem;
                }
                .imageAndForm{
                    display: flex;
                    align-items: center;
                }
                .left{
                    width:50%;
                    padding-right: 1.3rem;
                }
                .right{
                    width:50%;
                    padding: 0 0 0 12.3rem;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .right{
                        padding: 0 0 0 5rem;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .warrantyActivation{
                        padding: 12rem 6% 24.8rem;
                    }
                }
                @media screen and (max-width: ${1000}px){
                    .warrantyActivation{
                        padding: 4.8rem 20% 24.4rem;
                    }
                    .title{
                        font-size: 2.8rem;
                        line-height: 4rem;
                        margin-bottom: 3.5rem;
                    }
                    .desc{
                        width: 100%;
                        margin: 0 auto 6rem;
                        font-size: 1.5rem;
                        line-height: 2.4rem;
                    }
                    .imageAndForm{
                        display: block;
                    }
                    .left{
                        width:100%;
                        padding-right: 0rem;
                        margin-bottom: 6rem;
                    }
                    .right{
                        width:100%;
                        padding: 0;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .warrantyActivation{
                        padding: 4.8rem 2rem 24.4rem;
                    }
                }
            `}</style>
        </Layout>    
    )
}
