import LazyLoad from "react-lazyload";
import { getStaticProps } from "../pages/library/[slug]";

export default function image(props){
    return(
        <>
        <div className="imgWrapper paddedContent">
            <LazyLoad height="738">
                <img src={props.desktopImageUrl} className="width-100 hideForMobile"/>
            </LazyLoad>
            <LazyLoad height="538">
                <img src={props.mobileImageUrl} className="width-100 showForMobile"/>
            </LazyLoad>
            {/* <img src={props.desktopImageUrl} className="width-100 hideForMobile"/>
            <img src={props.mobileImageUrl} className="width-100 showForMobile"/> */}
        </div> 
        <style jsx>{`
        .imgWrapper{
            margin-bottom:2rem;
            width:100%;
        }
        `}</style>
        </>
    )
}