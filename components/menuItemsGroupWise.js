import  {connect} from 'react-redux'
import { MOBILE_BREAKPOINT } from '../config'
// import {menuItems} from '../branch-specific-config'
import {setPanelTwoData,setPanelThreeData,setIndexValue,setIndexValue2,setActiveTier1Item,setActiveTier2Item,showExploreMenu} from '../redux/actions'
import Tier2DefaultComponent from './tier2DefaultComponent'
import Tier3DefaultComponent from './tier3DefaultComponent'
import StoresMenu from './storesMenu'
import Caret from './caret'
import ListItems from './listItems'
import Link from 'next/link'
import ImageAndTextMenu from './imageAndTextMenu'
import MenuStores from './MenuStores'
import useTranslation from 'next-translate/useTranslation'
function MenuItemsGroupWise(props){
    const {t}=useTranslation('common');
    let groups = [
        {name:t('find'),items:props.menuItems.filter(item=>item.group==t('find'))},
        {name:t('shop'),items:props.menuItems.filter(item=>item.group==t('shop'))},
        {name:t('read'),items:props.menuItems.filter(item=>item.group==t('read'))}
    ]
    function performActions(item){
        if(props?.exploreMenu?.activeTier1Item?.id==item.id){
            return
        }
        props.setPanelTwoData(null)
        props.setPanelThreeData(null) 
        props.setActiveTier1Item(item)
        if(item.tier2action=="default"){
            // console.log('set panel two data default')
            props.setPanelTwoData(<Tier2DefaultComponent noAnimationDelay={true} defaultItems={item.defaultTier2} />)
        }
        if(item.tier3action=="default"){
            // console.log('set panel three data default')
            props.setPanelThreeData(<Tier3DefaultComponent noAnimationDelay={true} defaultItems={item.defaultTier3} />)
        }
        if(item.tier2action=="stores"){
            props.setPanelTwoData(<MenuStores storeDetails={item.storeDetails.storeDetails} />)
        }
        if(item.tier2action=="listItems")
            props.setPanelTwoData(<ListItems items={item?.listItems} products={props.products} fetch={item?.fetch} headingAndContent={item?.headingAndContent} />)
        if(item.tier2action=="imageAndText")
            props.setPanelTwoData(<ImageAndTextMenu img={item?.img} imgMobile={item?.imgMobile} text={item?.text} linksTo={item?.imgAndTextLink} desktopWidth={233} desktopHeight={396} mobileWidth={303} mobileHeight={130} />)
    }
    function mouseHoverTier1Item(item){
        // console.log('mouse hover item',item)
        if(window.innerWidth <= MOBILE_BREAKPOINT)
            return
        performActions(item)
    }
    function mobileOnClickHandler(item){
        if(window.innerWidth <= MOBILE_BREAKPOINT){
            if(!!item.link)
                props.showExploreMenu(false)   
            performActions(item)
        }
    }
    return (
        <>
            <div className="groups" key={`groups_${props?.exploreMenu?.activeTier1Item?.id?props?.exploreMenu?.activeTier1Item?.id:"def"}`}>
                {!!groups && groups.map((group,groupIndex)=>{
                    let groupAnimationClass = `group${groupIndex+1}`
                    return (
                        <div className={`group ${groupAnimationClass} ${props?.exploreMenu?.activeTier1Item?.group==group.name?"groupActive":""}`} key={`menu_group_${groupIndex}`}>
                            <div className="mainHeading grey font16 anoRegular">{group?.items[0]?.group}</div>
                            <div className="headingLine">
                                {group.items.map((item, index)=>{
                                    return(
                                        <div onClick={()=>mobileOnClickHandler(item)} key={`menuGroup_${index}`} className= {`${item.hideInMobile?"hideForMobile":""} heading grey positionRelative font20 canelaThin ${props?.exploreMenu?.activeTier1Item?.id===item.id?"current":""}`}> 
                                            <div className="label onlyDesktop cursorPointerinlineBlock">
                                                {!!item.imgAndTextLink ? 
                                                    <Link href={item.imgAndTextLink}><a onMouseEnter={()=>mouseHoverTier1Item(item)} onClick={()=>{props.showExploreMenu(false)}}>
                                                        {item.label}
                                                    </a></Link> 
                                                    : 
                                                    <div onMouseEnter={()=>mouseHoverTier1Item(item)}>{item.label}</div>
                                                }
                                            </div> 
                                            <div className="label belowDesktop cursorPointerinlineBlock">
                                            {!!item.imgAndTextLink ? 
                                                    <Link href={item.imgAndTextLink}><a onMouseEnter={()=>mouseHoverTier1Item(item)} onClick={()=>{props.showExploreMenu(false)}}>
                                                        {item.label}
                                                    </a></Link> 
                                                    : 
                                                    <div onMouseEnter={()=>mouseHoverTier1Item(item)}>{item.label}</div>
                                            }
                                            </div> 
                                            {!!item.showCaret && !item.imgAndTextLink && item.tier2action!="imageAndText" ?
                                                <span className="arrowSymbol cursorPointer" onMouseEnter={()=>mouseHoverTier1Item(item)}><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span>
                                                :
                                                <span className="arrowSymbol cursorPointer hideForMobile" onMouseEnter={()=>mouseHoverTier1Item(item)}><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span>                                                
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <style jsx>{`
                .group{
                    display:flex;
                    padding-right:4rem;
                    margin-bottom:4.8rem;
                }
                .mainHeading{
                    width:26%;
                }
                .groupActive .mainHeading{
                    color:#000000;
                }
                .headingLine{
                    width:74%;
                }
                .heading{
                    margin-bottom:1.6rem;
                    cursor:pointer;
                }
                .heading.current,.makeBlack .heading,.makeBlack .mainHeading{
                    color:#000000;
                }
                .group .heading:last-child{
                    margin-bottom:0;
                }
                .groups .group:last-child{
                    margin-bottom:9.2rem;
                }
                .arrowSymbol{
                    position:absolute;
                    top:-2px;
                    right:0;
                }
                .onlyDesktop{
                    display:inline-block;
                }
                .belowDesktop{
                    display:none;
                }
                @media only screen and (max-width: 1025px){
                    .onlyDesktop{
                        display:none;
                    }
                    .belowDesktop{
                        display:inline-block;
                    }
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .group{
                        padding-right:0;
                        margin-bottom:2.4rem;
                    }
                    .mainHeading{
                        font-size:1.2rem;
                        color:#000000;
                    }
                    .heading{
                        font-size:1.6rem;
                        color:#000000;
                        padding-right:1px;
                    }
                    .groups .group:last-child{
                        margin-bottom:4rem;
                    }
                    .arrowSymbol{
                        right:2px;
                        pointer-events:none;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({exploreMenu}){
    return {exploreMenu}
}
export default connect(mapStateToProps,{setPanelTwoData,setPanelThreeData,setIndexValue,setIndexValue2,setActiveTier1Item,setActiveTier2Item,showExploreMenu})(MenuItemsGroupWise)