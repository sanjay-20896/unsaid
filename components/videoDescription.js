import { MOBILE_BREAKPOINT } from "../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';

function VideoDescription(props) {
    return(
        <>
        <div className="containers">
            <div className="row">
                <div className="imgWrapper">
                    <LazyLoadImage 
                        src={props.image}
                        width="100%"
                        alt="image"
                        />
                </div>
                <div className="content">
                    <div className="font32 canelaThin header">{props.heading}</div>
                    <div className="font16-notResponsive canelaThin desc">{props.desc}</div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .header{
                margin-bottom:3.2rem;
                line-height: 40px;
                letter-spacing: 0.03em;
            }
            .imgWrapper,.content{
                width:50%;
            }
            .imgWrapper{
                padding-right:1.2rem;
            }
            .content{
                padding:21.5rem 0 0 12.3rem;
            }
            .containers{
                padding:0 12.15%;
            }
            .row{
                display:flex;
            }
            .desc{
                line-height: 28px;
                letter-spacing: 0.03em;
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .header{
                    margin-bottom:2.4rem;
                }
                .imgWrapper,.content{
                    width:100%;
                }
                .imgWrapper{
                    padding-right:0rem;
                    margin-bottom:3.2rem;
                }
                .content{
                    padding:0;
                }
                .containers{
                    padding:0 3.6rem;
                }
                .row{
                    display:block;
                }
            }
        `}</style>
        </>
    )
    
}

export default VideoDescription;