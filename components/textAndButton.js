import { MOBILE_BREAKPOINT } from "../config";


function textAndButton(props){
    function onButtonClick(){
        if(props.onClick){
            props.onClick();
        }
    }
    
    return(
        <>
        <div className="wrapper input paddedContent">
            <div className="alignCenter text canelaThin font32">{props.text}</div>
            <button  className="alignCenter btn buttons" href={props.link} onClick={()=>onButtonClick()}>{props.label} </button>
        </div>
        <style jsx>{`
        .text{
            padding-bottom:1rem;
            }
        
        .buttons{
            cursor:pointer;
            
        }
        button{
            background-color:#ffffff;
        }
        .input{
            text-align:center;
        }
        @media screen and (max-width:${MOBILE_BREAKPOINT}px){
            .wrapper{
                margin-top:0rem;
                margin-bottom:2rem;
            }
            .text{
                font-size:1.6rem;
            }

        }
        
        
        `}
        </style>
        </>
    )
}
export default textAndButton;