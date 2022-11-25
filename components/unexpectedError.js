import {HEADER_HEIGHT_DESKTOP, HEADER_HEIGHT_MEDIUM, HEADER_HEIGHT_TABLET, HEADER_HEIGHT_MOBILE, MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT, MEDIUM_BREAKPOINT} from '../config'
export default function unexpectedError(props){
    return (
        <>
            <div className="wrapper text-center">
                {props.message}
            </div>
            <style jsx>{`
                .wrapper{
                    height:calc(100vh - ${HEADER_HEIGHT_DESKTOP}px);
                    width:100%;
                    text-align:center;
                    display:flex;
                    flex-flow:column wrap;
                    justify-content:center;
                }
                @media screen and (max-width: ${MEDIUM_BREAKPOINT}px){
                    .wrapper{
                        height:calc(100vh - ${HEADER_HEIGHT_MEDIUM}px);
                    }   
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .wrapper{
                        height:calc(100vh - ${HEADER_HEIGHT_TABLET}px);
                    }   
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .wrapper{
                        height:calc(100vh - ${HEADER_HEIGHT_MOBILE}px);
                    }   
                }
            `}</style>
        </>
    )
}