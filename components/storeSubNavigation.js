import React from 'react'
import DropDown from './dropDown'
import { connect } from 'react-redux';
import {MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables';
import useTranslation from 'next-translate/useTranslation'
function StoreSubNavigation(props) {
    const {t}=useTranslation('common');
    for(let i=0;i<props.storeDetails.length;i++){
        if(props.storeDetails[i].storeName==="Le Printemps Paris") props.storeDetails[i].calendlyUrl="https://calendly.com/printemps"
        if(props.storeDetails[i].storeName==="Antwerp Store") props.storeDetails[i].calendlyUrl="https://calendly.com/unsaidstore"
    }
    return (
        <>
            <div className={`storeSubNavigation ${props.subNavFix?"subNavFix":""} ${props.common.showBrandNotification?"brandNotification":""}`}>
                <div className="left font16">
                    <div className="leftCol1">
                        <div className="listHeading anoHalfRegular">{t('callUs')}</div>
                        <div className="listValue anoHalfRegular"><a href={`tel:32484929295`}>+32 484 929 295</a></div>
                    </div>
                    <div className="leftCol2">
                        <div className="listHeading anoHalfRegular">{t('writeToUs')}</div>
                        <div className="listValue anoHalfRegular"><a href={`mailto:hello@unsaid.com`}>hello@unsaid.com</a></div>
                    </div>
                </div>
                <div className="right">
                    <div className="rightCol1">
                        <div className="anoRegular positionRelative font16 underlineLR active">
                            <p>{t('bookAnAppointment')}</p>
                            <ul className="storesList positionAbsolute listStyleNone">
                                {props.storeDetails.map((item,id)=>{
                                    return(
                                        <>
                                            {item?.display && !item?.storeClosed && <li key={id} onClick={()=>{Calendly.initPopupWidget({url: `${item.calendlyUrl}`});return false;}}>{item?.storeName}</li>}
                                        </>
                                    )
                                })}
                                {/* <li onClick={()=>{Calendly.initPopupWidget({url: 'https://calendly.com/printemps'});return false;}}>Le Printemps Paris</li>
                                <li onClick={()=>{Calendly.initPopupWidget({url: 'https://calendly.com/unsaidstore'});return false;}}>Antwerp Store</li> */}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="rightCol2">
                        <DropDown
                            defaultValue="All Stores"
                            fontSize="font16"
                            fontFamily="anoRegular"
                        />
                    </div> */}
                </div>
            </div>   
            <style jsx>{`
                .listValue{
                    cursor:pointer;
                }
                .storesList{
                    width: 100%;
                    padding: 0px 0;
                    height: 0;
                    overflow: hidden;
                    margin: 0;
                    background: #ffffff;
                    transition: all 0.2s ease-out;
                }
                .storesList li{
                    padding: 5px;
                    cursor:pointer;
                }
                .rightCol1 > div:hover .storesList{
                    padding: 10px 0;
                    height: auto;
                    transition: all 0.2s ease-out;
                    z-index: 3;
                }
                .storeSubNavigation{
                    padding:0 12.15%;
                    align-items: flex-end;
                }
                .subNavFix .left .listHeading{
                    opacity:0;
                    margin-bottom:0rem;
                    transition:all 0.3s ease-out;
                }
                .storeSubNavigation.subNavFix{
                    position: fixed;
                    left:0;                    
                    top: ${props.common.showNavBar?props.common.navHeight:"0"}px;
                    background: #ffffff;
                    z-index: 9;
                    width:100%;
                    padding:0 12.15% 2.4rem;
                    transition:all 0.5s ease;
                }
                .storeSubNavigation.subNavFix.brandNotification{
                    top: ${props.common.showNavBar?props.common.navHeight+28:"0"}px;
                }
                .listHeading{
                    margin-bottom:0.8rem;
                }
                .leftCol1{
                    margin-right:2.5rem;
                }
                .right{
                    justify-content: flex-end;
                }
                .storeSubNavigation,.left,.right{
                    display:flex;
                }
                .left,.right{
                    width:50%;
                }
                .rightCol1{
                    cursor:pointer;
                    //margin-right:3.2rem;
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    // .right{
                    //     width:100%
                    //     padding-left:5rem;
                    // }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .storeSubNavigation{
                        display:block;
                    }
                    .left{
                        display:none;
                    }
                    .right{
                        width:100%;
                        padding-left: ${paddingLeftMobile};
                        padding-right: ${paddingRightMobile};
                        flex-direction: row-reverse;
                        justify-content: space-between;
                    }
                    .storeSubNavigation{
                        padding:1.4rem 0;
                        align-items: flex-end;
                    }
                    .rightCol1{
                        margin-right:0rem;
                    }
                    .storeSubNavigation.subNavFix{
                        padding:1.4rem 0;
                    }
                    .listHeading{
                        margin-bottom:0.4rem;
                    }
                    .leftCol1{
                        margin-bottom:3.2rem;
                    }
                    .leftCol2{
                        margin-bottom:4.8rem;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(StoreSubNavigation)