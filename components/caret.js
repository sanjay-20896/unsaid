import React from 'react'
export default function Caret(props) {
    let direction;
    if(props.direction==="up"){
        direction="135deg";
    }else if(props.direction==="down"){
        direction="-45deg";
    }else if(props.direction==="right"){
        direction="225deg";
    }else if(props.direction==="left"){
        direction="45deg";
    }
    return (
        <>
            <div className="arrow"></div>
            <style jsx>{`
                .arrow{
                    border-left:${props.width} solid ${props.color};
                    border-bottom:${props.width} solid ${props.color};
                    height:${props.length};
                    width :${props.length};
                    display: inline-block;
                    transform:rotate(${direction});
                    margin-bottom:${props.marginBottom};
                }
            `}</style>   
        </>
    )
}
