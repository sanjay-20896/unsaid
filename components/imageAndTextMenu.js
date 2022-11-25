import {MOBILE_BREAKPOINT} from '../config'
import { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import Link from 'next/link'
import {showExploreMenu,showMyUnsaidMenu} from '../redux/actions'
import image from 'next/image';
import LazyImage from './lazyImage';
function ImageAndTextMenu(props){
    const [imgHeight, setImgHeight] = useState("auto");
    
    let imageHeight = props.common.windowHeight - (160 + 48 + 48);

    useEffect(() => {
        // if(imageHeight <= 580){
        //     setImgHeight(imageHeight)
        // }else{
        //     setImgHeight("auto");
        // }
        setImgHeight(imageHeight)
    }, [imageHeight])
    let jsx = (
        <>
            <div className="storeWrapper fadeInAnimationNew alignCenter" key={`${props.img}_${props.text}`}>
                <div>
                {!!props.img &&
                    <div className={`storeImg ${props.imgMobile?"hideForMobile":""}`} style={{height:props.common.showSearchWindow?"auto":imgHeight,overflow:"hidden"}}>
                        {props.link?<Link href={!!props.link ? props.link :"#"}><a onClick={()=>{props.showExploreMenu(false),props.showMyUnsaidMenu(false)}}>
                                    {!props.lazy ?<LazyImage
                                        alt="Product image"
                                        originalSrc={props.img}
                                        width={props.desktopWidth}
                                        height={props.desktopHeight}/>:<img className="width-100" src={props.img} />}
                        </a></Link>:
                        <>
                        {!props.lazy ?<LazyImage
                                        alt="Product image"
                                        originalSrc={props.img}
                                        width={props.desktopWidth}
                                        height={props.desktopHeight}/>:<img className="width-100" src={props.img} />} 
                        </>
                        }
                    </div>
                }
                {props.imgMobile && 
                    <div className="storeImg showForMobile">
                       {props.link?<Link href={!!props.link ? props.link:"#"}><a onClick={()=>{props.showExploreMenu(false),props.showMyUnsaidMenu(false)}}>
                      {!props.lazy ? <LazyImage
                             alt="Product image"
                             originalSrc={props.imgMobile}
                             width={props.mobileWidth}
                             height={props.mobileHeight}/>: <img className="width-100" src={props.imgMobile} />}
                         {/* <img className="width-100" src={props.imgMobile} /> */}

                        </a></Link>
                        :
                        // <img className="width-100" src={props.imgMobile}/>
                        <>
                            {!props.lazy ? <LazyImage
                        alt="Product image"
                        originalSrc={props.imgMobile}
                        width={props.mobileWidth}
                        height={props.mobileHeight}/> : <img className="width-100" src={props.imgMobile}/> }
                        </>
                       
                    }
                    </div>
                }
                {!!props.text && 
                    <div className="storeName canelaThin font20">
                        {props.text}
                    </div>
                }
                </div>
            </div>
            <style jsx>{`
                .storeImg{
                    overflow:hidden;
                    padding-right:0rem;
                    margin-bottom:4.8rem;
                }
                .storeName{
                    margin-bottom:0.8rem;
                    text-align:center;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .storeImg{
                        margin-bottom:1.6rem;
                    }
                    .storeName{
                        text-align:left;
                    }
                }
            `}</style>
        </>
    )
    return (
        <>
            {!!props.linksTo?
                <Link href={props.linksTo}>
                    <a onClick={()=>{props.showExploreMenu(false),props.showMyUnsaidMenu(false)}}>
                        {jsx}
                    </a>
                </Link>
                :
                <div>
                    {jsx}
                </div>
            }
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,{showExploreMenu,showMyUnsaidMenu})(ImageAndTextMenu)