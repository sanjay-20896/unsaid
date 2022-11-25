import React from 'react'
import LazyLoad from 'react-lazyload'
import ProductTagging from '../components/productTagging'
import {MOBILE_BREAKPOINT} from '../config'
import { connect } from 'react-redux';

function hotspotModule(props) {
    return (
        <>
            <div className="hotspot">
                <div className="heading font20 anoHalfRegular">Curating with Nest</div>
                <div className="wrapper positionRelative">
                    <div className="content">
                        <LazyLoad offset={500}>
                            <img className="width-100" src={props.img}/>
                        </LazyLoad>
                        {props.productTagging.map(product=>{
                            return(
                                <ProductTagging 
                                    width={product.width}
                                    positionFromTop={product.positionFromTop} 
                                    positionFromLeft={product.positionFromLeft} 
                                    productName={product.productName}
                                    productPrice={product.productPrice}
                                    rightCorner={product.rightCorner}
                                />
                            )
                        })}                    
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .hotspot{
                    padding:0 4.44%;
                }
                .heading{
                    margin-bottom:3.2rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .heading{
                        font-size:1.2rem;
                        text-align:center;
                    }
                    .hotspot{
                        padding:0 0;
                    }
                    .wrapper img{ 
                        display:none;
                    }
                    .wrapper{
                        height:${props.common.windowHeight2}px;
                        background-image: url(${props.img});
                        background-size: auto;
                        background-repeat: no-repeat;
                        background-position: center;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(hotspotModule)