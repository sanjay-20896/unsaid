import Caret from './caret'
export default function TextAndArrowCta(props){
    return (
        <>
            {props.arrowDirection=="left"?
                <span className="inlineBlock text anoRegular"><span className="caret inlineBlock"><Caret color="black" direction="left" width="0.1rem" length="0.6rem" marginBottom="1px"/></span>{props.text}</span>
                :
                <span className="inlineBlock text anoRegular">{props.text}<span className="caret inlineBlock"><Caret color="black" direction="right" width="0.1rem" length="0.6rem" marginBottom="1px"/></span></span>
            }
            <style jsx>{`   
                .text .caret{
                    transition:transform 0.15s linear;
                    margin-right:${props.arrowDirection=="left"?"0.8rem":"0"};
                    margin-left:${props.arrowDirection=="left"?"0":"0.6rem"};
                    transform:translateX(${props.arrowDirection=="left"?"0":"0"}) translateY(${props.arrowDirection=="left"?"-1px":"0"});
                }
                .text:hover .caret{
                    transform:translateX(${props.arrowDirection=="left"?"-4px":"4px"}) translateY(${props.arrowDirection=="left"?"-1px":"0"});
                }
            `}</style>
        </>
    )
}