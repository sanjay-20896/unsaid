import React from 'react'
import Link from 'next/link'
import Caret from '../components/caret'
import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT} from '../config'
import {productTagging} from '../data/staticData'
import ProductTagging from '../components/productTagging'
import LazyLoad from 'react-lazyload'
import cssVariables from '../data/cssVariables'
import {connect} from 'react-redux'
function collectionProduct(props) {
    return (
        <>
            <div className="collectionProduct">
                <div className="productImage">
                    <div className="wrapper positionRelative">
                        <div className="content">
                            <LazyLoad offset={1000}>
                                {props.common.windowWidth <= MOBILE_BREAKPOINT &&
                                    <img className="width-100" src={props.productImageMobile} alt={props.productDesc} />
                                }
                                {props.common.windowWidth > MOBILE_BREAKPOINT && props.common.windowWidth < 944  &&
                                    <img className="width-100" src={props.productImageTablet} alt={props.productDesc} />
                                }
                                {props.common.windowWidth >= 944 &&
                                    <img className="width-100" src={props.productImage} alt={props.productDesc} />
                                }
                            </LazyLoad>
                            {productTagging.map(product=>{
                                return(
                                    <ProductTagging 
                                        width={product.width}
                                        positionFromTop={product.positionFromTop} 
                                        positionFromLeft={product.positionFromLeft} 
                                        productName={product.productName}
                                        productPrice={product.productPrice}
                                    />
                                )
                            })}                    
                        </div>
                    </div>
                </div>
                <div className="productInfo alignCenter black">
                    <div className="productInfoContent">
                        <h1 className="heading font40 canelaThin hideForMobile">{props.productHeading}</h1>
                        <h2 className="desc font24 canelaThin">{props.productDesc}</h2>
                        <div className="link font16-notResponsive hideForMobile"><Link href={props.linksTo}><a>See full collection</a></Link> <span className="caret"><Caret color="black" direction="right" width="0.1rem" length="0.8rem"/></span></div>
                        <div className="logoImg hideForMobile">
                            <LazyLoad offset={1000}>
                                <img className="width-100" src="/images/logoPic.png"/>
                            </LazyLoad>
                        </div>
                    </div>
                </div>
            </div>
            {!!props?.linksTo && <div className="linkMobile showForMobile"><Link href={props.linksTo}><a>See full collection</a></Link> <Caret color="black" direction="right" width="0.1rem" length="0.8rem"/></div>}
            <style jsx>{`
                .collectionProduct{
                    display:flex;
                    align-items:center;
                }
                .productImage{
                    width:66%;
                    margin-right:2.4rem;
                }
                .wrapper{
                    padding-top:51.6%;
                }
                .content{
                    position:absolute;
                    z-index:1;
                    top:0;
                    left:0;
                    width:100%;
                }
                .productInfo{
                    padding-left:4.8rem;
                    padding-right:4.8rem;
                    width:32%;
                    padding-top: 3%;
                    padding-bottom: 3%;
                }
                .heading{
                    margin-bottom:4.8rem;
                }
                .desc{
                    width:30rem;
                    margin:0 auto 3.2rem;
                    letter-spacing: 1px;
                    max-width:100%;
                }
                .logoImg{
                    height:4rem;
                    width:2rem;
                    margin: 4.8rem auto 0; 
                }
                .link a{
                    letter-spacing: 1px;
                    margin-right: 4px;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .productInfo{
                        padding-left:3.8rem;
                        padding-right:3.8rem;
                        width:32%;
                        padding-top: 2%;
                        padding-bottom: 2%;
                    }
                }
                @media screen and (max-width: 1180px){
                    .productInfo{
                        padding-left:0.5rem;
                        padding-right:0.5rem;
                        width:32%;
                    }
                }
                @media screen and (max-width: 943px)    {
                    .collectionProduct{
                        display:flex;
                        height:auto;
                        flex-direction:column;
                    }
                    .productImage{
                        width:100%;
                        margin-right:0;
                    }
                    .productInfo{
                        padding:0;
                        width:100%;
                        text-align:center;
                    }
                    .desc{
                        padding-left: ${cssVariables.paddingLeftMobile};
                        padding-right: ${cssVariables.paddingRightMobile};
                        width:100%;
                        text-align: center;
                    }
                    .heading{
                        margin-top:5.4rem;
                    }
                    .linkMobile{
                        margin-top:3.2rem;    
                        font-size:1.2rem;
                        text-align:center;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .wrapper{
                        padding-top:100%;
                    }
                    .collectionProduct{
                        display:flex;
                        height:auto;
                        flex-direction:column-reverse;
                    }
                    .productImage{
                        width:100%;
                        margin-right:0;
                    }
                    .productInfo{
                        padding:0;
                        width:100%;
                    }
                    .desc{
                        padding-left: ${cssVariables.paddingLeftMobile};
                        padding-right: ${cssVariables.paddingRightMobile};
                        width:100%;
                        line-height:2.4rem;
                        margin:0 auto 3.2rem;
                        text-align: justify;
                    }
                    .linkMobile{
                        margin-top:3.2rem;    
                        font-size:1.2rem;
                        text-align:center;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(collectionProduct)