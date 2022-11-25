import Link from "next/link";
import { MOBILE_BREAKPOINT } from "../config";
import Caret from './caret'
import {connect} from 'react-redux'
import {showExploreMenu,setPanelThreeData,setActiveTier2Item} from '../redux/actions'
import ImageAndTextMenu from '../components/imageAndTextMenu'
function HeadingAndContentMenu(props){
    function mouseEnter(item){
        // console.log('mouse hover item',item)
        props.setPanelThreeData(null) 
        props.setActiveTier2Item(item)
        if(item.tier3action=="imageAndText")
            props.setPanelThreeData(<ImageAndTextMenu img={item.img} imgMobile={item.imgMobile} text={item.label} link={item.link} />)
    }
    return (
        <>
            {props.headingAndContentArray.map((headingAndContent)=>{
                // console.log(headingAndContent)
                return (
                    <div className="headingAndContent fadeInAnimationNew" key={`headingAndContent_${headingAndContent.id}`} onMouseEnter={()=>mouseEnter(headingAndContent)}>
                        <div className= {`careHeading positionRelative font20 canelaThin `} key={`headingAndContent_${props?.exploreMenu?.activeTier2Item?.id?props?.exploreMenu?.activeTier2Item?.id:"def"}`}>
                            {!!headingAndContent.link ? 
                                <Link href={headingAndContent.link}><a onClick={()=>{props.showExploreMenu(false)}}>
                                <div className={`inlineBlock underlineLR ${headingAndContent.id==props?.exploreMenu?.activeTier2Item?.id?"active":""}`}>{headingAndContent.label}</div> 
                                {!!headingAndContent.showCaret && <span className="arrowSymbol"><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span>}
                                </a></Link>
                                :
                                <>
                                 <div className={`inlineBlock underlineLR ${headingAndContent.id==props?.exploreMenu?.activeTier2Item?.id?"active":""}`}>{headingAndContent.label}</div> 
                                 {!!headingAndContent.showCaret && <span className="arrowSymbol position"><Caret color="black" direction="right" width="0.1rem" length="0.6rem"/></span>}
                                 </>
                                }
                        </div> 
                        <div className="carecontent font16 anoHalfRegular">{headingAndContent.content}</div>                           
                    </div>
                )
            })}
            <style jsx>{`
                .headingAndContent{
                    margin-top:4.8rem;
                }
                .careHeading{
                    margin-bottom:0.8rem;
                }
                .arrowSymbol{
                    position:absolute;
                    top:-2px;
                    right:0;
                }
                .position{
                    position:absolute;
                    top:-2px;
                    left:34.1rem;
                }
                .carecontent{
                    line-height: 2.4rem;
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .arrowSymbol{
                        right:2px;
                    }
                    .carecontent{
                        font-size:1.2rem;
                        letter-spacing:1px;
                    }
                }
            `}</style>
        </>
    )
}

function mapStateToProps({exploreMenu,selection,cache,common}){
    return {exploreMenu,selection,cache,common}
}

export default connect(mapStateToProps,{showExploreMenu,setPanelThreeData,setActiveTier2Item})(HeadingAndContentMenu)