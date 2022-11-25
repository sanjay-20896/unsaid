import Link from "next/dist/client/link"
import { MOBILE_BREAKPOINT } from "../config"
import LazyImage from "./lazyImage"
export default function SingleCollectionItem(props){
    // console.log(props.imageDesktopOrginalSrc)
    // console.log(props.imageDesktopPlaceholderSrc)
    // console.log(props.collectionName)
    return(
        <>
        <div className="paddedContent container">
            <div className="image-wrapper-desktop hideForMobile">
                {/* <img alt="collection-image-desktop" className="width-100" src={props.imageDesktop}/> */}
                {props.imageDesktopOriginalSrc && 
                <Link href={props.link}><a>
                <LazyImage
                alt={props.alt}
                originalSrc={props.imageDesktopOriginalSrc}
                placeholderSrc={props.imageDesktopPlaceholderSrc}
                width={1312}
                height={560} />
                    </a></Link>}
                 
            </div>
            <div className="image-wrapper-mobile showForMobile">
                {props.imageMobileOriginalSrc &&  <Link href={props.link}><a>
                <LazyImage 
                alt={props.alt}
                originalSrc={props.imageMobileOriginalSrc}
                placeholderSrc={props.imageMobilePlaceholderSrc}
                width={303}
                height={538}/>
                    </a></Link>}
                {/* <img alt="collection-image-desktop" className="width-100" src={props.imageMobile}/> */}
            </div>
            <div className="alignCenter">
                <Link href={props.link}><a>
                <div className="collectionName font32 canelaThin">{props.collectionName}</div>
                </a></Link>
                <Link href={props.link}>
                    <button className="btn btnSecondary anoRegular font20">{props.label}</button>
                </Link>
            </div>
        </div>
        <style jsx >{`
            .image-wrapper-desktop{
                margin-bottom:6.4rem;
            }
            .image-wrapper-mobile{
                margin-bottom:4.8rem;
            }
            .collectionName{
                margin-bottom:3.8rem;
            }
            .container{
                margin-bottom:12.2rem;
            }
        @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
            .collectionName{
                margin-bottom:4.4rem;
            }
            .container{
                margin-bottom:10.8rem;
            }
        }

        
        `}</style>
        </>
    )
}