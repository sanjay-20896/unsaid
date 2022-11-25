import React, { useState,useRef,useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Expandable from '../components/expandable'
import {MOBILE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'

export default function productFeatures(props) {
    const {t}=useTranslation('common');
    const [imgLoaded, setImgLoaded] = useState(false)
    const [fixContainer, setFixContainer] = useState(false)
    const [expandableActive, setExpandableActive] = useState(null);

    const featuresRef=useRef();
    const detailsRef=useRef();
    const triggerLastLineRef=useRef();

    function scrollHandler() {
        if((featuresRef.current.getBoundingClientRect().top) < 500 ){
            setImgLoaded(true)
        }
        if((triggerLastLineRef.current.getBoundingClientRect().bottom) < 727){
            setFixContainer(false);
        }else if(((featuresRef.current.getBoundingClientRect().top) < 37) && ((detailsRef.current.scrollHeight) > 738)){
            setFixContainer(true)
        }else{
            setFixContainer(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);

    function sizeVal(value){
        props.sizeValueUpdate(value)
    }

    return (
        <>
         <div ref={featuresRef} className={`paddedContent ${imgLoaded?"imgLoaded":""} ${fixContainer?"fixContainer":""}`}>
            <div className="features ">
                <div className="imgWrapper hideForMobile">
                    <div className="imgContainer">
                        <LazyLoadImage
                            alt={"Model image"}
                            effect="blur"
                            src={props.img}
                            width="100%"
                            //afterLoad={()=>setLazyLoad(true)}
                            //placeholderSrc="/images/favourite.svg"
                        />
                    </div>
                </div>
                <div ref={detailsRef} className="details">
                    <h2 style={{animationDelay:"0.1s"}} className="sectionHeading anoHalfRegular font20">{t('features')}</h2>
                    <h1 style={{animationDelay:"0.2s"}} className="mainHeading canelaThin font32">{props.mainHeading}</h1>
                    <h3 style={{animationDelay:"0.3s"}} className="content anoHalfRegular font16-notResponsive">{props.content}</h3>
                    <div ref={triggerLastLineRef} className="expandableSection">
                        <div onClick={()=>setExpandableActive(0)} style={{animationDelay:"0.4s"}}><Expandable indexValue={0} expandableActive={expandableActive} content={props.content} heading={t('moreDetails')} borderTop={true}/></div>
                        <div onClick={()=>setExpandableActive(1)} style={{animationDelay:"0.5s"}}><Expandable indexValue={1} expandableActive={expandableActive} currentSize={props.currentSize} sizeValueUpdate={sizeVal} sizeGuideOpen={props.sizeGuideOpen} sizeFormat={props.productSizes} heading={t('sizeGuide')} borderTop={true}/></div>
                        <div onClick={()=>setExpandableActive(2)} style={{animationDelay:"0.6s"}}><Expandable indexValue={2} expandableActive={expandableActive} content={props.content} heading={t('delivery&returns')} borderTop={true}/></div>
                        <div onClick={()=>setExpandableActive(3)} style={{animationDelay:"0.7s"}}><Expandable indexValue={3} expandableActive={expandableActive} content={props.content} heading={t('gifting&packaging')} borderTop={true}/></div>
                        <div onClick={()=>setExpandableActive(4)} style={{animationDelay:"0.8s"}}><Expandable indexValue={4} expandableActive={expandableActive} content={props.content} heading={t('care&warranty')} borderTop={true} borderBottom={true}/></div>
                    </div>
                </div>
            </div>
         </div>   
         <style jsx>{`
            .fixContainer{
                
            }
            .fixContainer .features{
                background:#ffffff;
                position:fixed;
                left:0;
                top:5.2rem;
                z-index:9;
                padding:0 6.4rem;
                height:100vh;
            }
            .features{
                display:flex;
                align-items: flex-start;    
                min-height:737px;            
            }
            .content{
                margin-bottom:4.8rem;
            }
            .imgWrapper{
               background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
               height: 737px;
               width:50%; 
            }
            .imgContainer{
               width:100%; 
               //background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
               height: 737px;
               transform:translateY(2rem);
               opacity:0;
               transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .1s,transform 1.2s cubic-bezier(.215,.61,.355,1) .1s;
            }
            .imgLoaded .imgContainer{
               transform:translateY(0);
               opacity:1;
            }
            .details{
                padding:6.4rem 8%;
                width:50%;
                background: linear-gradient(0deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
                transition: opacity 1.7s cubic-bezier(.215,.61,.355,1) .0s,transform 1.2s cubic-bezier(.215,.61,.355,1) .0s;
                height:738px;
                overflow-y:scroll;
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
            }
            .details::-webkit-scrollbar {
                display: none;
            }
            .details>*{
                opacity:0;
            }
            .imgLoaded .details>*{
                animation:fadeIn 1.2s cubic-bezier(.215,.61,.355,1) forwards;
            }
            .details .expandableSection>*{
                opacity:0;
            }
            .imgLoaded .details .expandableSection>*{
                animation:fadeIn 1.2s cubic-bezier(.215,.61,.355,1) forwards;
            }
            .sectionHeading{
                margin-bottom:3.2rem;
            }
            .mainHeading{
                margin-bottom:2.4rem;
            }
            @keyframes fadeIn{
                from{
                    opacity:0;
                    transform:translateY(1rem);
                }
                to{
                    opacity:1;
                    transform:translateY(0);
                }
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .details{
                    width:100%;
                    background: #ffffff;
                    padding:0 0;
                    height:auto;
                }
                .sectionHeading{
                    font-size:1.2rem;
                    margin-bottom:1.6rem;
                }
                .mainHeading{
                    font-size:2.4rem;
                    margin-bottom:1.6rem;
                }
                .content{
                    margin-bottom:1.6rem;
                }
                .features{
                    min-height:auto;  
                }
                .fixContainer .features{
                    background:#ffffff;
                    position:static;
                    left:0;
                    top:5.2rem;
                    z-index:9;
                    padding:0 0rem;
                    height:auto;
                }
         `}</style>
        </>
    )
}
