import {MEDIUM_BREAKPOINT,TABLET_LANDSCAPE_BREAKPOINT,TABLET_PORTRAIT_BREAKPOINT,MOBILE_BREAKPOINT} from '../config'
export default function PlusButton(props){
    return (
        <>
            <span className={`plusButton positionRelative ${props.minus?"minus":""} ${props.disabled?"disabled":""}`}></span>
            <style jsx>{`
                .plusButton::after{
                    content:"";
                    position:absolute;
                    top:0;
                    right:0;
                    height:1px;
                    width:24px;
                    background:#000000;
                    transition:all 0.4s ease-out;
                }
                .plusButton::before{
                    content:"";
                    position:absolute;
                    top:0;
                    right:0;
                    height:1px;
                    width:24px;
                    background:#000000;
                    transform: rotate(90deg);
                    transition:all 0.4s ease-out;
                }
                .plusButton.disabled::after{
                    background:#cecece;
                }
                .plusButton.disabled::before{
                    background:#cecece;
                }
                .plusButton.minus::after{
                    opacity:0;
                }
                .plusButton.minus::before{
                    transform: rotate(0);
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .plusButton::after{
                        width:21px;
                    }
                    .plusButton::before{
                        width:21px;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .plusButton::after{
                        width:18px;
                    }
                    .plusButton::before{
                        width:18px;
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .plusButton::after{
                        width:14px;
                    }
                    .plusButton::before{
                        width:14px;
                    }
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .plusButton::after{
                        width:16px;
                    }
                    .plusButton::before{
                        width:16px;
                    }
                }
            `}</style>
        </>
    )
}