import { MOBILE_BREAKPOINT } from "../config"
import {connect} from 'react-redux'
import Like from './likeProduct'
import {getPriceBasedOnSelection} from '../functions'
import {showWishlist} from '../redux/actions'
import Link from 'next/link'
import {useState} from 'react'
import Expandable from '../components/expandable2'
import LikedGift from '../components/likedGift'
function LikedGifts(props){
    const [expandableActive, setExpand] = useState(null)
    // console.log('liked Gifts',props.selection.cartItems)
    return (
        <>
            <div className="allGiftingProduct">
                {props.selection.cartItems.map((giftItem,index)=>{ 
                    if(props.gifting.bundle[giftItem.bundleId]){
                            let metaData = JSON.parse(giftItem.comment)
                            let {selectedJewelProductId} = metaData
                            let selectedJewelProduct = props.cache.products[selectedJewelProductId]
                        return(
                            <div key={`wishlistgiftitem_${index}`}>
                                <Expandable  headingSmallMobile={true} borderBottom={true} headingFont="anoRegular" headingFontSize="font16-notResponsive" heading2FontSize="font12" setExpand={(bool)=>setExpand(expandableActive==giftItem.line?null:giftItem.line)} expand={expandableActive==giftItem.line} heading={selectedJewelProduct?.name} heading2={giftItem.date} content={<LikedGift giftItem={giftItem} />} />
                            </div>
                        )
                    }
                })}
            </div> 
            <style jsx>{`
                  
                .expandedData{
                    height:0;
                    overflow:hidden;
                    transform:translateY(-3rem);
                    transition:all 0.5s ease-out;
                }
                .expandedData.active{
                    height:auto;
                    transform:translateY(0rem);
                    transition:all 0.5s ease-out;
                }
                .expandedData button{
                    width:100%;
                    margin-bottom:3.2rem;
                }
                .date{
                    font-size:1.2rem;
                }   
                .singleGiftingProduct{
                    border-bottom:1px solid #787878;
                }
                .headingLineClickable::after, .headingLineClickable::before{
                    position:absolute;
                    content:'';
                    background:black;
                    width:1px;
                    height:calc(100% - 48px);
                }
                .headingLineClickable::after{
                    top:2.4rem;
                    right:1.2rem;
                    transition:all 0.3s ease-out;
                    transform: rotate(0deg);
                }
                .headingLineClickable::before{
                    top: 2.4rem;
                    right: 1.2rem;
                    transform: rotate(90deg);
                    opacity:1;
                    transition:all 0.3s ease-out;
                }
                .headingLineClickable.expandActive::before{
                    opacity:0;
                }
                .headingLineClickable.expandActive::after{
                    transform: rotate(90deg);
                }
                .headingLineClickable{
                    padding:2.4rem 0;
                    cursor:pointer;
                } 
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .expandedData button{
                        margin-bottom:2.4rem;
                    }
                    .noteSection{
                        margin-bottom:3.2rem;
                    }
                }
            `}</style> 
        </>  
    )
}
function mapStateToProps({selection,cache,gifting}){
    return {selection,cache,gifting}
}
export default connect(mapStateToProps,{showWishlist})(LikedGifts)