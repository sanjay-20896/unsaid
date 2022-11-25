import Caret from './caret'
import Sanity from './../sanity'
import {buildFileUrl, parseAssetId} from '@sanity/asset-utils'
import {SANITY_PROJECT_ID,SANITY_DATASET} from '../branch-specific-config'
import Link from 'next/link'
export default function SizeGuide(props){
    function rowClicked(row,e){
        e.stopPropagation()
        if(props.sizeClicked)
            props.sizeClicked(row.column1Value)
    }
    let fileUrl=!!props?.sizeGuide?.sizeGuideDocument?.asset?._ref?buildFileUrl(parseAssetId(props?.sizeGuide?.sizeGuideDocument?.asset?._ref),{projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET}):null
    return (
        <>
            <div className="sizeFormat">
                <h3 className="sizeHeading anoRegular font16 mobileFont16">{props.sizeGuide.text1}</h3>
                <h3 className="content anoHalfRegular font16 mobileFont16">{props.sizeGuide.text2}</h3>
                {!!fileUrl && !!props.sizeGuide.text3 && !!props?.sizeGuide?.table &&
                    <Link href={fileUrl} ><a target="_blank">
                        <h3 className="completeGuide anoRegular textDecoration font16 mobileFont16">{props.sizeGuide.text3}<span className="sizeArrow"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="0.2rem"/></span></h3>
                    </a></Link>  
                }
                 {/* <h3 className="completeGuide anoRegular font16 mobileFont16">{!!props.sizeGuide.text3?props.sizeGuide.text3:""}</h3> */}
                <div className="sizeGuide">
                    {!!props.sizeGuide.table && 
                        <div className="sizeGuideHeading">
                            <h1 className="anoRegular font16 mobileFont16">{props.sizeGuide?.table?.column1heading?props.sizeGuide.table.column1heading:""}<span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></span></h1>
                            <h1 className="anoRegular font16 mobileFont16">{props.sizeGuide?.table?.column2heading?props.sizeGuide.table.column2heading:""}<span className="sizeArrow"><Caret color="black" direction="down" width="0.1rem" length="0.6rem" marginBottom="0.3rem"/></span></h1>
                        </div>
                    }
                    {!!props.sizeGuide.table && Array.isArray(props.sizeGuide.table.twoColumnTableRows) && props.sizeGuide.table.twoColumnTableRows.map(row=>{
                        return(
                            <div key={row._key} onClick={(e)=>rowClicked(row,e)} className={`sizesList ${props.currentSize===row.column1Value?"active":""}`}>
                                <h1 className="anoHalfRegular font16 mobileFont16">{row.column1Value}</h1>
                                <h1 className="anoHalfRegular font16 mobileFont16">{row.column2Value}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
            <style jsx>{`
                .textDecoration{
                    text-decoration: underline;
                }
                .sizeFormat .sizeHeading{
                    margin-bottom:1.6rem;
                }
                .sizeFormat .content{
                    margin-bottom:3.2rem;
                }
                .completeGuide{
                    padding-bottom:3.2rem;
                    border-bottom:1px solid #787878;
                    margin-bottom:3.2rem;
                }
                .sizeGuide{
                    //display:flex;
                }
                .sizeGuideHeading, .sizesList{
                    display:flex;
                }
                .sizeGuideHeading{
                    margin-bottom:2.4rem;
                }
                .sizeGuide{
                    //display:flex;
                }
                .sizeGuideHeading h1, .sizesList h1{
                    width:50%;
                }
                .sizesList h1{
                    padding-left:1.2rem;
                }
                .sizesList{
                    margin-bottom:2.4rem;
                }
                .sizesList:last-child{
                    margin-bottom:0rem;
                }
                .sizesList:hover, .sizesList.active{
                    background:#00000012;
                }
                .sizeGuideHeading, .sizesList{
                    display:flex;
                }
                .sizeArrow{
                    margin-left:0.8rem;
                }
            `}</style>
        </>
    )
}