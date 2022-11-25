import React from 'react'
import Layout from '../components/layout'
import { connect } from 'react-redux';
import {} from '../redux/actions'
import ErrorPageDetails from '../components/errorPageDetails';
import {MOBILE_BREAKPOINT} from '../config'
import Link from 'next/link'
import Sanity from '../sanity'
import {getDynamicMenuAndFooterInfo,getImageUrl} from "../functions"

function Error(props) {
    let products = []
    for(let i = 0; i <props.content.products.length; i++) {
        let obj={};
        obj.productImg = getImageUrl(props.content.products[i].productImage)
        obj.productName = props.content.products[i].productName;
        obj.linksTo = props.content.products[i].linksTo
        products.push(obj)
    }
    return (
        <Layout commonData={props.commonProps.commonData} waitToStartApiRequests="yes" shouldStartApiRequests={true}>
            <div className="error paddedContent">
                <div className="left hideForMobile">
                    <Link href="/">
                        <a>
                            <img src={props.content.image} alt="error image" className="width-100" />
                        </a>
                    </Link>
                </div>
                <div className="right">
                    <ErrorPageDetails
                        mainMsg={props.content.mainMsg}
                        smallMsg={props.content.smallMsg}
                        products={products}
                        contactLink={props.content.contactLink}
                        contactNumberDisplay={props.content.contactNumberDisplay}
                        emailLink={props.content.emailLink}
                        email={props.content.email}
                    />
                </div>
            </div>
            <style jsx>{`
                .error{
                    display:flex;
                    padding-bottom:5.4rem;
                }
                .right{
                    padding-left:10%;
                    padding-right:10%;
                    padding-top:9.4rem;
                }
                .left{
                    padding-right: 1.2rem;
                }
                .left,.right{
                    width:50%;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .right{
                        width:100%;
                        padding-left:0;
                        padding-right:0;
                        padding-top:4.9rem;
                    }
                    .error{
                        display:block;
                        padding-bottom:4.6rem;
                    }
                }
            `}</style>
        </Layout>
    )
}
function mapStateToProps({common,selection}){
    return {common,selection}
}
export default connect(mapStateToProps,null)(Error)

export async function getStaticProps({locale}){
    let query=`*[_type=="errorPage_${locale}"]{...,"image":image.asset->url}`;
    let content=null;
    try{
        content= await Sanity.fetch(query);
        content=Array.isArray(content) ? content[0]:null;
        let commonProps=await getDynamicMenuAndFooterInfo(locale)
        return {props:{content,commonProps}}
    }catch(err){
        return {
            error:true,
        }
    }
}



