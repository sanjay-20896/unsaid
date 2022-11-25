import React from 'react'

export default function filterList(props) {
    let delay=(((props.indexValue+1)*0.1)).toString();
    // function setPreferredMetalChoiceInLocalStorage(listItem){
    //     if(listItem.query=="material"){
    //         localStorage.setItem("preferredMetalChoice",listItem.uri);
    //     }
    // }
    return (
        <>
         <div className={`${props.filterShow?"filterShow":""}`} >
            <h1 style={{animationDelay:`${delay}s`}} className="heading canelaThin font24">{props.columnData.heading}</h1>
            <ul className="sublist listStyleNone pl0">
                {props.columnData.filterItems.map((listItem,index)=>{
                    return(
                        <li key={`filterItem_${index}`} className={`list font16 ${!!listItem.count?"":"disabled"}  ${props.isFilterApplied(listItem)==true? "active anoRegular":"anoHalfRegular"}`} onClick={()=>{props.applyFilter(listItem,!!listItem.count)} } >{listItem.subHeading}</li>
                    )
                })}
            </ul>
         </div>   
         <style jsx>{`
            .heading{
                margin-bottom:2.4rem;
            }
            .sublist li:not(.disabled){
                cursor:pointer;
            }
            .sublist li.disabled{
                color:#c7c7c7;
            }
            .sublist li.active{
                font-weight:bold;
            }
            .list{
                margin-bottom:1.6rem;
            }
            .list:last-child{
                margin-bottom:1.6rem;
            }
         `}</style>
        </>
    )
}