import { MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT } from "../config";

export default function Quote(props){
    // console.log(props.quotefontSizeMobile);
    return(
        <>
        <div className={`container ${props.largeImage?"largeImage":""}`}>
            <div className="logowrapper">
                <img src="/images/logoPic.png" className="width-100"/>
            </div>
            {!!props.quote && <div className="quote canelaThin font32-notResponsive">{props.quote}</div>}
            {!!props.quoteDesc && <div className="desc font24 canelaThin">{props.quoteDesc}</div>}
            {/* {!!props.name && <div className="author font16-notResponsive anoRegular">{props.name}</div>} */}
            {!!props.authorRichText ?
                <div className="author font16-notResponsive anoRegular">{props.authorRichText}</div>
                :
                <>
                    {!!props.name && <div className="author font16-notResponsive anoRegular">{props.name}</div>}
                </>
            }
            
        </div>
        <style jsx>{`
            .logowrapper{
                width:27px;
                height:61px;
                margin-bottom:5rem;
            }
            .largeImage .quote{
                font-size: 4.5rem;
                line-height: 5rem;
                margin-bottom:0rem;
            }
            .quote{
                margin-bottom:3.2rem;
            }
            .desc{
                margin-bottom:3.2rem;
            }
            @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                .quote{
                    font-size:3.2rem;
                    line-height: 4rem;
                    letter-spacing: 0.03em;
                }
                .largeImage .quote{
                    font-size:3.2rem;
                    line-height: 4rem;
                }
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .quote{
                    font-size:${props.quotefontSizeMobile}px;
                    line-height: 4rem;
                    letter-spacing: 0.03em;
                }
                .desc{
                    font-size:2rem;
                }
                .largeImage .quote{
                    font-size: 2.4rem;
                    line-height: 3.2rem;
                }
                .logowrapper{
                    width:20px;
                    height:40px;
                    margin-bottom:3.2rem;
                }
                .logowrapper img{
                    height:100%;
                }
            }
        `}
        </style>
        </>
    )
}