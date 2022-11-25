import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {getNestedObject} from '../functions'
import {MOBILE_BREAKPOINT} from '../config'
import Link from 'next/link'
import {updateCartLikes,addBundleToCart,showWishlist,showMyUnsaidMenu, showRegister,showLogin} from '../redux/actions'
import LikedProducts from '../components/likedProducts'
import LikedGifts from './likedGifts'
import { paddingLeftMobile, paddingRightMobile } from '../data/cssVariables';
import useTranslation from 'next-translate/useTranslation'

function WishList(props) {
    const {t}=useTranslation('common');
    const [showProducts, setShowProducts] = useState(true)
    function login(){
        props.showWishlist(false)
        props.showMyUnsaidMenu(true)
        props.showLogin(true)
    }
    function register(){
        props.showWishlist(false)
        props.showMyUnsaidMenu(true)
        props.showRegister(true)
    }
    return (
        <>
            {props.common.showWishlist && 
                <div className={`wishListComponent ${showProducts?"showingProducts":""}`}>
                    <div className="wishListNav positionRelative">
                        <div className="wishListLabel font24 canelaThin">{t('wishlist')}</div>
                        <div onClick={()=>props.showWishlist(false)} className="cross"><img src="/images/cross.svg" width="16" height="16" alt='cross'/></div>
                        <div className="mobileLogo showForMobile">
                            <Link href="/">
                                <a onClick={()=>props.showWishlist(false)}>
                                    <img src="/images/logoDarkSmall.png" width="104" height="32" className="logoDark" alt="Mobile Logo Dark" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="wishListContainer">
                        {!props?.selection?.selection?.loggedIn && 
                            <div className="msgLine anoHalfRegular font16-notResponsive">
                                <span>{t('WantWishlistAcrossDevices')} </span>
                                <span className="logInLink" onClick={()=>login()}>{t('logIn')} </span>
                                <span>{t('or')} </span>
                                <span className="registerLink" onClick={()=>register()}>{t('createUnsaidAccount')} </span>
                                <span>{t('today')}.</span>
                            </div>
                        }
                        {/* {loggedIn && 
                            <div className="share anoHalfRegular font16-notResponsive">
                                <span><img src="/images/shareIcon.svg"/></span>
                                <span className="logIn">Share your wishlist</span>
                            </div>
                        } */}
                        <div className="wishListData">
                            <div className="sectionHeading font16 anoRegular grey">
                                <div onClick={()=>setShowProducts(true)} className={`productSectionHeading underlineLR ${showProducts?"active black":""}`}>{t('yourProducts')}</div>
                                <div onClick={()=>setShowProducts(false)} className={`giftSectionHeading underlineLR ${!showProducts?"active black":""}`}>{t('yourGifts')}</div>
                            </div>
                            {showProducts && 
                                <LikedProducts /> 
                            }
                            {!showProducts && 
                                <LikedGifts />
                            }
                        </div>
                    </div>
                </div> 
            }  
            <style jsx>{`
                .wishListComponent{
                    overflow-y:scroll;
                    height:100%;
                    width:100%;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .wishListComponent::-webkit-scrollbar {
                    display: none;
                }      
                .productSectionHeading{
                    margin-right:2.4rem;
                }
                .sectionHeading{
                    display:flex;
                    margin-bottom:3.2rem;
                }
                .msgLine, .share{
                    margin-bottom:4.8rem;
                }
                .share{
                    display: flex;
                    cursor:pointer;
                }
                .share span:nth-child(1){
                    margin-right:1.6rem;
                }
                .msgLine{
                    letter-spacing:0.4px;
                }
                .msgLine .logInLink, .msgLine .registerLink{
                    text-decoration:underline;
                    cursor:pointer;
                } 
                .wishListContainer{
                    padding:12.8rem 6.4rem 8rem 6.4rem;
                }
                .cross{
                    cursor:pointer;
                }
                .wishListNav{
                    height:8rem;
                    position: fixed;
                    width: calc(100%);
                    display:flex;
                    justify-content:space-between;
                    align-items: baseline;
                    padding:2.4rem 6.4rem;
                    // margin:0 6.4rem;
                    border-bottom:1px solid #787878;
                    background:#ffffff;
                    z-index: 10;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .cross img{
                        width:1.2rem;
                    }
                    .wishListNav{
                        padding:1.6rem ${paddingLeftMobile} 0 ${paddingRightMobile};
                        // margin:0 3.6rem;
                        width: calc(100%);
                        height:5.6rem;
                        border-bottom:none;
                    }
                    .mobileLogo{
                        position:absolute;
                        top:50%;
                        left:50%;
                        transform:translate(-50%,-50%);
                    }
                    .wishListContainer{
                        padding:8.8rem ${paddingRightMobile} 8rem ${paddingLeftMobile};
                    }
                    .msgLine, .share{
                        margin-bottom:3.2rem;
                    }  
                    .productsHavingGiftBox{
                        margin-right:-24px;
                    }
                    .expandedData button{
                        margin-bottom:2.4rem;
                    }
                    .logoDark{
                        width: 59px;
                        height: 18.15px;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common,selection,cache,gifting}){
    return {common,selection,cache,gifting}
}
export default connect(mapStateToProps,{updateCartLikes,addBundleToCart,showWishlist,showLogin,showRegister,showMyUnsaidMenu})(WishList)