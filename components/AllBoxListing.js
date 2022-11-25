import {getImageUrl} from "../functions"
import LazyImage from "./lazyImage"
import { MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT } from '../config'
export default function AllBoxListing({data,marginBottom}) {
    return (
        <>
            <div className={`boxSlider ${marginBottom=="type110"?"marginType110":""}`}>
                <div className="flexSlider">
                    {data.map((item, index)=>{
                        return(
                            <>
                                <div key={index} className="cardImage">
                                    {!!item?.boxImage && <LazyImage originalSrc={getImageUrl(item.boxImage)} width={508} height={504} alt="Image"/>}
                                    <p className="name anoHalfRegular alignCenter">{item?.artistName}</p>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <style jsx>{`
                .boxSlider{
                    padding-left: 9.4rem;
                    padding-right: 9.4rem;
                }
                .name{
                    margin-top: 2.5rem;
                    font-size: 2.2rem;
                    line-height: 3.2rem;
                    color: #7E7E7E;
                }
                .flexSlider{
                    display:flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                }
                .cardImage{
                    width: 28%;
                }
                .marginType110 .cardImage{
                    margin-bottom: 11rem;
                }
                .marginType110 .cardImage:nth-last-child(-n+3){
                    margin-bottom: 0rem;
                }
                @media only screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .boxSlider{
                        padding-left: 5%;
                        padding-right: 5%;
                    }
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .cardImage{
                        width: 49%;
                    }
                    .name{
                        margin-top: 1.5rem;
                        font-size: 1.6rem;
                        line-height: 2.2rem;
                    }
                    .marginType110 .cardImage{
                        margin-bottom: 5rem;
                    }
                    .boxSlider{
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                }
            `}</style>
        </>
    )
}