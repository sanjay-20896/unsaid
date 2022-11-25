import Head from "next/head";
import { useEffect } from "react"
import { SITENAME} from "../config"

export default function SEO(props){
    let url;
    useEffect(()=>{
        url=window.location.href;
    },[])
    return(
        <>
            <Head>
                <title>{`${props.title}`}</title>
                <meta property="og:title" content={`${props.title}`} key="title"/>
                <meta property="og:description" content={props.description} key="description"/>
                <meta property="og:site_name" content={SITENAME} key="siteName"/>
                <meta property="og:type" content="website" key="article"/>
                <meta property="og:url" content={url} key="url"/>
                <meta property="og:image" content={props.image} key="image"/>
            </Head>
        </>
    )
}