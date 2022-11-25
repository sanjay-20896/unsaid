import React from 'react'
import Colors from '../components/colors'
import {MOBILE_BREAKPOINT} from '../config'
export default function gridViewProduct(props) {
    return (
        <>
            <div className="gridViewProduct">
                <div className="productImg"><img src={props.img2} className="img width-100"/></div>
                <div className="productInfo">
                    <div>
                        <div className="productName anoRegular font16">{props.productName}</div>
                        <div className="productPrice anoRegular font16 grey">{props.productPrice}</div>                     
                        <div className="colorAndLike">
                            <div className="link anoRegular font16"><Colors colors={["#EAC786","#D5D1D1","#F2C2A4"]}/></div>
                            <div className="favouriteIcon"><img src="/images/favourite.png" className="width-100"/></div>
                        </div>   
                    </div>
                    <div className="hideForMobile">
                        <div className="likeWrapper positionRelative">
                            <div className="favouriteIcon positionAbsolute"><img src="/images/favourite.png" className="width-100"/></div>
                        </div>
                        <div className="link anoRegular font16"><Colors colorSize={props.colorSize} colors={["#EAC786","#D5D1D1","#F2C2A4"]}/></div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .productPrice{
                    letter-spacing: 0.6px;
                }
                .colorAndLike{
                    display:none;
                }
                .gridViewProduct{
                    width:100%;
                }
                .productName{
                    margin-bottom:0.8rem;
                }
                .favouriteIcon{
                    width:2.4rem;
                    height:2.1rem;
                    margin-bottom:1.2rem;
                    right:0;
                    top:0;
                }
                .productImg .img{
                    opacity:1;
                    transition:all 0.5s ease-out;
                }
                .productImg:hover .img{
                    opacity:0;
                }
                .productImg:hover{
                    background-image: url(${props.img1});
                }
                .productImg{
                    margin-bottom:1.6rem;
                    background-size: 100%;
                    background-repeat: no-repeat;
                }
                .productInfo{
                    padding:0 1.6rem;
                    display:flex;
                    justify-content:space-between;
                }
                .link{
                    margin-top:3.6rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .colorAndLike{
                        display:flex;
                        justify-content:space-between;
                        align-items: baseline;
                        margin-top:0.8rem;
                    }
                    .favouriteIcon{
                        width:1.6rem;
                        height:1.4rem;
                        margin-bottom:0rem;
                    }
                    .link{
                        margin-top:0rem;
                    }
                }
            `}</style>
        </>
    )
}
