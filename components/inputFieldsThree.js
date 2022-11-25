import {MOBILE_BREAKPOINT} from '../config'

export default function inputFieldsThree(props){
    return(
        <>
            <div className="wrapper hideForMobile paddedContent">
                <div className="inputWrapper grey">
                    <div className="date font16 anoRegular">{props.date}</div>
                    <div className="tag font16 anoRegular">{props.tag}-{props.category}</div>
                    <div className="readTime font16 anoRegular">{props.readTime}</div>
                </div>
            </div>
            <div className="showForMobile wrapper paddedContent showForMobile">
                <div className="row1 grey">
                    <div className="tag anoRegular">{props.tag}-{props.category}</div>
                    <div className="readTime anoRegular ">{props.readTime}</div> 
                </div>
                <div className="date grey anoRegular">{props.date}</div>
            </div>
        <style jsx>{`
            .wrapper{
                width:100%;
            }
            .inputWrapper{
                display:flex;
                justify-content:space-around;
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .row1{
                    display:flex;
                    justify-content:space-between;
                    margin-bottom:0.4rem;
                }
            }
        `}</style>
        </>
    )
}