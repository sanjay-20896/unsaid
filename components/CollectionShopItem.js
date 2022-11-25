import {useState} from 'react'
import {getImageUrl} from "../functions"
import LazyImage from './lazyImage'
import DropDown from "./dropdownDynamic"
import SwipeableViews from 'react-swipeable-views';
import useDevice from '../hooks/useDevice'
import {MOBILE_BREAKPOINT} from '../config'
export default function CollectionShopItem({data}) {
    const [index, setIndex] = useState(0)
    let springConfig={
        duration: "0.9s",
        easeFunction: "cubic-bezier(0.1, 0.35, 0.2, 1)",
        delay: "0s",
    }
    let handleChangeIndex = index => {
        setIndex(index)
    }
    let {deviceName} = useDevice();
    return (
        <>
            {!!data &&
                <>
                    {deviceName!="mobile" &&
                        <div className="collectionShopItem paddedContent">
                        {data.collectionShopItem.map((item,id)=>{
                            return(
                                <div key={id} className="collectionShopSingleItem">
                                    <div className="image">
                                        <LazyImage 
                                            alt={"Image"} 
                                            originalSrc={getImageUrl(item?.image)} 
                                            width={644} 
                                            height={644}
                                        />
                                    </div>
                                    {!!item?.title && <h2 className="itemHeading font24-notResponsive canelaThin">{item.title}</h2>}
                                    {!!item?.description && <p className="itemDesc font16-notResponsive anoHalfRegular">{item.description}</p>}
                                    {/* {!!item?.dropdownProducts && item.dropdownProducts.map((ddProduct,index)=>{
                                        return(

                                        )
                                    })} */}
                                    {/* {!!item?.dropdownProducts && !!item?.label &&
                                        <div className="dropDown">
                                            <DropDown
                                                productsLayout="type2"
                                                defaultValue={item.label}
                                                fontSize="font16-notResponsive"
                                                fontFamily="anoRegular"
                                                dropDownValuesAsProductType2={item.dropdownProducts}      
                                            />
                                        </div>
                                    } */}
                                </div>
                            )
                        })}
                        </div>
                    }
                    {deviceName=="mobile" &&
                        <div className="collectionShopItem">
                        <SwipeableViews style={{padding:"0 3.2rem 0 2rem"}} slideStyle={{padding:"0 2rem 0 0px"}} index={index} onChangeIndex={()=>handleChangeIndex} springConfig={springConfig}>
                            {data.collectionShopItem.map((item,id)=>{
                                return(
                                    <div key={id} className="collectionShopSingleItem">
                                        <div className="image">
                                            <LazyImage 
                                                alt={"Image"} 
                                                originalSrc={getImageUrl(item?.image)} 
                                                width={644} 
                                                height={644}
                                            />
                                        </div>
                                        {!!item?.title && <h2 className="itemHeading font24-notResponsive canelaThin">{item.title}</h2>}
                                        {!!item?.description && <p className="itemDesc anoHalfRegular">{item.description}</p>}
                                    </div>
                                )
                            })}
                        </SwipeableViews>
                        </div>
                    }
                    <style jsx>{`
                        .collectionShopItem{
                            display:flex;
                            justify-content:space-between;
                        }
                        .image{
                            margin-bottom: 3.2rem;
                        }
                        .itemHeading{
                            margin-bottom: 1.6rem;
                        }
                        .collectionShopSingleItem{
                            width:calc(50% - 1.2rem);
                        }
                        @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                            .collectionShopSingleItem{
                                width:100%;
                            } 
                            .image{
                                margin-bottom: 2.3rem;
                            }
                            .itemHeading{
                                margin-bottom: 1.6rem;
                            }
                            .itemDesc{
                                margin-bottom: 0rem;
                                font-size: 1.8rem;
                                line-height: 2.6rem;
                            }
                        }
                    `}</style>
                </>
            }
        </>
    )
}
