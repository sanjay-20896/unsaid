import { MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT } from "../config";
import Quote from "./quote";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from "./lazyImage";
function imageRightQuote(props){
    return(
        <>
        <div className={`mainWrap ${props.largeImage?"largeImage":""} ${props.paddingTop?"paddingTop":""}`}>
            <div className="quoteContainerRight">
                <div className="row">
                    <div className="col1">
                        <Quote
                            largeImage={props.largeImage}
                            authorRichText={props.authorRichText}
                            quote={props.quote}
                            quoteDesc={props.quoteDesc}
                            name={props.name}
                            quotefontSizeMobile={props.quotefontSizeMobile}
                        />
                    </div>
                    <div className="col2 right">
                        <div>
                        <LazyImage
                            alt="Image"
                            originalSrc={props.img}
                            placeholderSrc={props.imgPlaceholder}
                            width={!!props.width?props.width:309}
                            height={!!props.height?props.height:412}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <style jsx>{`
            .row{
                display: flex;
            }
            .col1{
                width:43.2%;
            }
            .col2{
                width:48.8%;
                padding-left:15%;
            }
            .paddingTop .col2{
                padding-top:12rem;
            }
            .largeImage .col1{
                width: 33.2%;
                padding-top: 15rem;
            }
            .largeImage .col2{
                width:66.8%;
                padding-left:10%;
            }
            .largeImage.paddingTop .col2{
                padding-top:0;
            }
            @media screen and (max-width:${TABLET_LANDSCAPE_BREAKPOINT}px){
                .largeImage .col1{
                    padding-top: 0rem;
                    width:45%;
                }
                .largeImage .col2{
                    width:55%;
                    padding-left:10%;
                }
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .row{
                    display: block;
                }
                .col1{
                    width:100%;
                    margin-bottom:4.8rem;
                }
                .col2{
                    width:100%;
                    padding-left:0rem;
                    padding-right:8.3rem;
                }
                .paddingTop .col2{
                    padding-top:0rem;
                }
                .largeImage .col1{
                    width: 100%;
                    padding-top: 0rem;
                    margin-bottom:0rem;
                }
                .largeImage .col2{
                    width:100%;
                    padding-left:0%;
                    padding-right:0rem;
                    margin-bottom:4.8rem;
                }
                .largeImage .row{
                    display: flex;
                    flex-direction: column-reverse;
                }
            } 
        `}</style>
        </>
    )
}

export default imageRightQuote;