import {MOBILE_BREAKPOINT,MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import {connect} from 'react-redux'
import Link from 'next/link'
import {showSearchWindow,setSearchQuery,setPanelTwoData,setPanelThreeData,showExploreMenu,setActiveTier1Item,setActiveTier2Item, showMyUnsaidMenu,showCart,showWishlist} from '../redux/actions'
import SearchResults from './searchResults'
import useTranslation from 'next-translate/useTranslation'

function MenuNavItems(props){
    const {t}=useTranslation('common');
    function topSearchBoxClicked(){
        props.showSearchWindow(true)
        props.setActiveTier1Item(null)
        props.setActiveTier2Item(null)
        props.setPanelTwoData(<SearchResults />)
        props.setPanelThreeData(null)
    }
    function showExploreMenu(){
        props.showExploreMenu(false);
        setTimeout(()=>{
            props.showMyUnsaidMenu(true)
        },500)
        
    }
    function cartVisible(){
        props.showExploreMenu(false);
        setTimeout(()=>{
            props.showCart(true)
        },500)
    }
    
    function wishlistVisisble(){
        props.showExploreMenu(false);
        setTimeout(()=>{
            props.showWishlist(true);
        },500)
    }
    return (
        <>
            <div className={`navItems paddedContent font24 canelaThin ${props.common.showSearchWindow?"searchWindowActive":""}`}>
                <div onClick={()=>{props.showExploreMenu(false),props.setSearchQuery("")}} className="cursorPointer">
                    <span>{t('close')}</span>
                </div>
                <div className="navItemMiddleLogo">
                    <Link href="/"><a><img src="/images/logoDarkSmall.png" width="104" height="32" className="hideForMobile logoDark" alt="Logo Dark"/></a></Link>
                </div>
                <div onClick={()=>topSearchBoxClicked()} className="searchButton">
                    <div className="searchWrap positionRelative">
                        <div className="searchLabel">{t('search')}</div>
                    </div>
                </div>
                <div className="searchingTime">
                    <h1 className="font24 canelaThin grey">{t('searchTitle')}</h1>
                </div>
                <div className="navItemLast">
                    <ul className="options flexList listStyleNone pl0 m0">
                        <li onClick={()=>{cartVisible()}}>
                            <img src="/images/cart.svg" alt='cart icon' className="verticalAlignMiddle"/>
                        </li>
                        <li onClick={()=>{wishlistVisisble()}}>
                            <img src="/images/favourite.svg" alt='favourite icon' className="verticalAlignMiddle" />
                        </li>
                        <li onClick={()=>{showExploreMenu()}}>
                            <span className="hideForMobile">My Unsaid</span>
                            <img src="/images/userIcon.svg" className="showForMobile" alt="Account"/>
                        </li>
                    </ul>
                </div>
            </div>
            <style jsx>{`
                .navItems{
                    display:flex;
                    position: absolute;
                    justify-content: space-between;
                    display: flex;
                    width: 100%;
                    top:0;
                    left:0;
                    background:white;
                    z-index: 99;
                    padding-top: 2.4rem;
                    padding-bottom: 2.4rem;
                    height:7.2rem;
                }
                .cross{
                    position:relative;
                    margin-right: 24px;
                }
                .cross::after{
                    position: absolute;
                    content: "";
                    top: 50%;
                    left: 0;
                    background: black;
                    width: 2rem;
                    height: 0.1rem;
                    transform: rotate(45deg) translateY(-50%);
                }
                .cross::before{
                    position: absolute;
                    content: "";
                    top: 50%;
                    left: 0;
                    background: black;
                    width: 2rem;
                    height: 0.1rem;
                    transform: rotate(-45deg) translateY(-50%);
                }
                .navItemMiddleLogo{
                    opacity:1;
                    animation:fadeOutLogo 0.7s ease-out forwards 1s;
                }
                .navItemMiddleLogo, .searchButton{
                    position:absolute;
                    left:50%;
                    transform:translateX(-50%);
                }
                .logoDark{
                    width:104px;
                }
                .navItemMiddleLogo, .searchButton{
                    position:absolute;
                    left:50%;
                    transform:translateX(-50%);
                }
                .searchButton{
                    opacity:1;
                    width:29%;
                    text-align:center;
                    margin-right: -10%;
                    cursor:pointer;
                    transition:transform 0.15s ease-out, opacity 0.15s ease-out 0.1s;
                }
                .searchWindowActive .searchButton,
                .searchWindowActive .navItemMiddleLogo,
                .searchWindowActive .navItemMiddleLogo > *{
                    cursor: default;
                }
                .searchingTime{
                    position:absolute;
                    left:50%;
                    transform:translate(-50%, 1rem);
                    opacity:0;
                    pointer-events:none;
                    transition:all 0.5s ease-out 1s;
                }
                .searchWindowActive .searchingTime{
                    opacity:1;
                    transform:translate(-50%, 0);          
                }
                ul.options li{
                    cursor:pointer;
                }
                .searchWrap{
                    width:100%;
                }
                .searchWrap::after{
                    content:'';
                    position:absolute;
                    height:1px;
                    width:100%;
                    bottom:0;
                    left:0;
                    opacity:0;
                    background-image: linear-gradient(black, black), linear-gradient(white, white);
                    background-size: 0 1px, auto;
                    background-repeat: no-repeat;
                    background-position: center bottom;
                    transition:all 0.5s ease-out;
                    animation:underLine 0.5s ease-out forwards 1.5s;
                }
                .searchWindowActive .searchWrap::after{
                    animation:underLineBackwards 0.5s ease-out forwards 0.1s;
                }
                .searchLabel{
                    display:block;
                    opacity:0;
                    transition:all 0.3s ease-out;
                    animation:fadeInSearch 1s ease-out forwards 1.6s;
                }
                .searchWindowActive .searchLabel{
                    animation:fadeDownSearch 1s ease-out forwards 0s;
                }
                @keyframes underLineBackwards{
                    from{
                        opacity:1;
                        background-size: 100% 1px, auto;
                    }
                    to{
                        opacity:0;
                        background-size: 0 1px, auto;
                    }
                }
                @keyframes underLine{
                    from{
                        opacity:0;
                        background-size: 0 1px, auto;
                    }
                    to{
                        opacity:1;
                        background-size: 100% 1px, auto;
                    }
                }
                @keyframes fadeInSearch{
                    0%{
                        opacity:0;
                        transform:translateY(1rem);
                    }
                    100%{
                        opacity:1;
                        transform:translateY(0);
                    }
                }
                @keyframes fadeOutLogo{
                    from{
                        opacity:1;
                        transform:translate(-50%, 0%);
                    }
                    to{
                        opacity:0;
                        transform:translate(-50%, -100%);
                    }
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .logoDark{
                        width:94px;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .logoDark{
                        width:79px;
                    }
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .navItems{
                        display:none;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,{setSearchQuery,showSearchWindow,setPanelTwoData,setPanelThreeData,setActiveTier1Item,setActiveTier2Item,showExploreMenu,showMyUnsaidMenu,showCart,showWishlist})(MenuNavItems)