import { useEffect } from 'react';
import {connect} from 'react-redux'
import { MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT } from '../config';
import {fetchProductsMenu,setPanelThreeData,setMenuProductsPricelist,setActiveTier2Item} from '../redux/actions'
import Caret from './caret'
import ProductsListMenu from './productsListMenu'
import HeadingAndContentMenu from './headingAndContentMenu'
import Link from 'next/link';
import {showExploreMenu} from '../redux/actions'
import PlusButton from './plusButton';
function ListItems(props){
    function mouseEnterListItem(item){
        if(window.innerWidth <= MOBILE_BREAKPOINT || props?.exploreMenu?.activeTier2Item?.id==item.id){
            return
        } else {
            // console.log('mouse enter list item',props?.exploreMenu?.activeTier2Item?.id,item.id)
            props.setPanelThreeData(null)
            props.setActiveTier2Item(item)
            setTimeout(()=>{
                {!!item.fetch && props.setPanelThreeData(<ProductsListMenu item={item} products={item.products}  limitProducts={true} />)}
            },200)
        }
    }
    function clickListItem(item){
        // console.log('mouse click!')
        if(window.innerWidth <= MOBILE_BREAKPOINT){
            if(props?.exploreMenu?.activeTier2Item?.id == item.id){
                // console.log('collapse')
                //collapse
                props.setActiveTier2Item(null)
                props.setPanelThreeData(null)
            } else {
                // console.log('show')
                props.setPanelThreeData(null)
                props.setActiveTier2Item(item)
                setTimeout(()=>{
                    {!!item.fetch && props.setPanelThreeData(<ProductsListMenu item={item} products={props.products}  limitProducts={true} />)}
                },50)
            }
        } 
        if(window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_LANDSCAPE_BREAKPOINT){
            if(props?.exploreMenu?.activeTier2Item?.id != item.id){
                props.setPanelThreeData(null)
                props.setActiveTier2Item(item)
                setTimeout(()=>{
                    {!!item.fetch && props.setPanelThreeData(<ProductsListMenu item={item} products={props.products} limitProducts={true} />)}
                },50)
            }
        } 
    }
    // console.log('rendering list items',props.headingAndContent)
    return (
        <>
            <div className="listItems fadeInAnimationNew">
                <div key={`listItems_${props?.exploreMenu?.activeTier2Item?.id?props?.exploreMenu?.activeTier2Item?.id:"def"}`}>
                    {props.items.map((item,index)=>{
                        return (
                            <>
                                <div key={item.uri} onClick={()=>clickListItem(item)} className= {`subHeading grey positionRelative font20 canelaThin ${props?.exploreMenu?.activeTier2Item?.id===item.id?"current":""} `}>
                                    <div  className="label inlineBlock cursorPointer">
                                        {item.headingLinksTo ? 
                                        <>
                                            <span className="showOnlyAboveMobile">
                                                <Link href={!!item?.headingLinksTo ? item.headingLinksTo:"#"}>
                                                    <a onMouseEnter={()=>mouseEnterListItem(item)} onClick={()=>{clickListItem(item);props.showExploreMenu(false)}} className="underlinedLR">
                                                        {item.label} {!!item.fetch && !item.hideCountNumber?`(${item.countOfProducts})`:""}
                                                    </a>
                                                </Link>
                                            </span>
                                            <span className="showOnlyInMobile">
                                                <Link href={!!item?.headingLinksTo ? item.headingLinksTo:"#"}>
                                                    <a onMouseEnter={()=>mouseEnterListItem(item)} onClick={()=>{clickListItem(item);props.showExploreMenu(false)}} className='underlinedLR'>
                                                    {item.label} {!!item.fetch && !item.hideCountNumber ?`(${item.countOfProducts})`:""}
                                                    </a>
                                                </Link>
                                            </span>
                                        </>
                                        :
                                        <div onMouseEnter={()=>mouseEnterListItem(item)} >{item.label} {!!item.fetch && !item.hideCountNumber ?`(${item.countOfProducts})`:""}</div>
                                        }
                                        {/* <div>{item.label}{!!item.fetch && !!item.uri && props?.cache?.menuProducts[item.uri]?` (${props.cache.menuProducts[item.uri].length})`:""}</div> */}
                                    </div> 
                                    <div className="hideForMobile cursorPointer">
                                        {item.showCaret && <span onMouseEnter={()=>mouseEnterListItem(item)} className="arrowSymbol"><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span>}
                                    </div>
                                    
                                    {item.showCaret && <span className="showForMobileInline cursorPointer arrowSymbol arrowSymbolMobile"><PlusButton minus={props?.exploreMenu?.activeTier2Item?.id==item.id} /></span>}
                                    
                                </div>
                                {!!props.exploreMenu.panelThreeData && (props?.exploreMenu?.activeTier2Item?.id==item.id) &&
                                    <div className="showForMobile">
                                        {props.exploreMenu.panelThreeData}
                                    </div>
                                }
                            </>
                        )
                    })}
                </div>
                {!!props.headingAndContent &&
                    <HeadingAndContentMenu headingAndContentArray={props.headingAndContent}/>
                }
                
            </div>
            <style jsx>{`
                .showOnlyAboveMobile{
                    display:inline-block;
                }
                .showOnlyInMobile{
                    display:none;
                }
                .subHeading{
                    padding-bottom:1.6rem;
                }
                .subHeading.current{
                    color:#000000;
                }
                .arrowSymbol{
                    position:absolute;
                    top:-0.2rem;
                    right:0;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .showOnlyAboveMobile{
                        display:none;
                    }
                    .showOnlyInMobile{
                        display:inline-block;
                    }
                    .subHeading{
                        color:black;
                    }
                    .arrowSymbol{
                        right:0.2rem;
                        top:1rem;
                        pointer-events:none;
                    }
                    .listItems{
                        padding-bottom:6.8rem;
                    }
                }
            `}</style>
        </>
    )   
}
function mapStateToProps({exploreMenu,selection,cache}){
    return {exploreMenu,selection,cache}
}
export default connect(mapStateToProps,{setPanelThreeData,fetchProductsMenu,setMenuProductsPricelist,setActiveTier2Item,showExploreMenu})(ListItems)
