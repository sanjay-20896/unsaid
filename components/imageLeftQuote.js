import { MOBILE_BREAKPOINT, TABLET_LANDSCAPE_BREAKPOINT } from "../config";
import Quote from "./quote";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import LazyImage from "./lazyImage";
function ImageRightQuote(props){
    return(
        <>
        <div className={`mainWrap ${props.paddingTop?"paddingTop":""}`}>
            <div className="quoteContainerRight">
                <div className="row">
                    <div className="col2">
                        <div>
                                {/* <LazyLoadImage 
                                alt="Image"
                                src={props.img}
                                placeholderSrc={props.imgPlaceholder}
                                effect="blur"
                                width="100%"
                            /> */}
                            <LazyImage
                            alt="Image"
                            originalSrc={props.img}
                            placeholderSrc={props.imgPlaceholder}
                            width={!!props.width?props.width:309}
                            height={!!props.height ?props.height:412}/>
                        </div>
                    </div>
                    <div className="col1">
                        <Quote
                            authorRichText={props.authorRichText}
                            quote={props.quote}
                            quoteDesc={props.quoteDesc}
                            name={props.name}
                            quotefontSizeMobile={props.quotefontSizeMobile}
                        />
                    </div>
                </div>
            </div>
            {/* <div className="quoteContainerRight showForMobile">
                <div className="row">
                    <div className="col1">
                        <img src="/images/4.png" className="width-100"/> 
                    </div>
                    <div className="col2">
                        <img src="/images/logoPic.png" className="logo"/>
                        <div className="quote font48 canelaThin">“Lorem ipsum dolor sit amet, consectetur adipiscing elituam faucibus consequat cras eget ac. ”</div>
                        <div className="name font16 anoRegular">- Name</div>
                    </div>
                </div>
            </div> */}
        </div>
        <style jsx>{`
            .row{
                display: flex;
            }
            .col1{
                width:48.8%;
            }
            .col2{
                width:51.2%;
                padding-right:15.7rem;
            }
            .paddingTop .col2{
                padding-top:27.5rem;
            }
            @media screen and (max-width:${MOBILE_BREAKPOINT}px){
                .row{
                    flex-direction: column-reverse;
                }
                .col1{
                    width:100%;
                    margin-bottom:3.2rem;
                    padding-left: 20px;
                    padding-right: 45px;
                }
                .col2{
                    width:100%;
                    padding-right:0rem;
                    padding-left: 11.8rem;
                }
                .paddingTop .col2{
                    padding-top:0rem;
                }
            } 
        `}</style>
        </>
    )
}

export default ImageRightQuote;