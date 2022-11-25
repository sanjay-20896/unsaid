import React from 'react'
import MosaicLandscape from './mosaicLandscape'
import MosaicPotrait from './mosaicPortrait'
import {MOBILE_BREAKPOINT} from '../config'

export default function FourArticleLayout(props) {
    return (
        <>
            <div className="hideForMobile">
                <div className="fourArticleLayout">
                    <div className="left">
                        <div className="leftContainer">
                            <div className="article1">{!!props.articleSet[0] && <MosaicPotrait article={props.articleSet[0]}/>}</div>
                            <div className="article3">{!!props.articleSet[2] && <MosaicLandscape article={props.articleSet[2]}/>}</div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="rightContainer">
                            <div className="article2">{!!props.articleSet[1] && <MosaicLandscape article={props.articleSet[1]}/>}</div>
                            <div className="article4">{!!props.articleSet[3] && <MosaicPotrait article={props.articleSet[3]}/>}</div>
                        </div>
                    </div>
                </div>  
            </div> 
            <div className="showForMobile">
                <div className="articleMobile">{!!props.articleSet[0] && <MosaicPotrait article={props.articleSet[0]}/>}</div>
                <div className="articleMobile">{!!props.articleSet[1] && <MosaicLandscape article={props.articleSet[1]}/>}</div>
                <div className="articleMobile">{!!props.articleSet[2] && <MosaicPotrait article={props.articleSet[2]}/>}</div>
                <div className="articleMobile">{!!props.articleSet[3] && <MosaicLandscape article={props.articleSet[3]}/>}</div>
            </div>
            <style jsx>{`
                .fourArticleLayout{
                    display:flex;
                }
                .article1{
                    padding-right:12.3rem;
                    margin-bottom:6.4rem;
                }
                .article2{
                    margin-bottom:6.4rem;
                }
                .article4{
                    padding-left:12.3rem;
                }
                .left,.right{
                    width:50%;
                }
                .left{
                    padding-right:1.2rem;
                }
                .right{
                    padding-left:1.2rem;
                }
                @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                    .articleMobile{
                        margin-bottom:4.8rem;
                    }
                    .articleMobile:last-child{
                        margin-bottom:0rem;
                    }
                }
            `}</style>
        </>
    )
}
