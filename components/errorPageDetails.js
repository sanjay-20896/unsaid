import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
export default function ErrorPageDetails(props) {
    const {t}=useTranslation('common');
    return (
        <>
            <div className="errorPageDetails alignCenter">
                <h1 className="mainMsg font40 canelaThin black">{props.mainMsg}</h1>
                <p className="smallMsg anoHalfRegular font16-notResponsive grey2">{props.smallMsg}</p>
                <div className="products">
                    {props.products.map((product, index)=>{
                        return(
                            <div className="product">
                                <Link href={product.linksTo}>
                                    <a>
                                        <div><img src={product.productImg} alt="Product Image" className="width-100"/></div>
                                        <p className="productName font16-notResponsive anoRegular black">{product.productName}</p>
                                    </a>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                {!props.hideContact &&
                    <div>
                        <Link href="/contact-us"><a className="contactButton btn btnPrimary font20-notResponsive anoRegular">{t('contactUs')}</a></Link>
                        <p className="contactDetails font16 anoRegular black"><a href={!!props.contactLink? props.contactLink:"#"}>{props.contactNumberDisplay}</a> or <a href={props.emailLink? props.emailLink:"#"}>{props.email}</a></p>
                    </div>
                }
            </div> 
            <style jsx>{`
                .contactButton{
                    margin-bottom:4rem;
                }
                .mainMsg{
                    margin-bottom:3.1rem;
                    padding: 0 10%;
                }
                .product{
                    width:50%;
                    padding-right:3.8rem;
                    margin-bottom:5.3rem;
                }
                .product:last-child,.product:nth-last-child(2){
                    margin-bottom:0rem;
                }
                .products{
                    display:flex;
                    flex-wrap: wrap;
                    margin-right:-3.8rem;
                    margin-bottom:6.8rem;
                    padding: 0 7%;
                }
                .smallMsg{
                    margin-bottom:1.9rem;
                    letter-spacing: 0.03em;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .mainMsg{
                        margin-bottom:1.5rem;
                        padding: 0 0%;
                        font-size:3.2rem;
                    }
                    .contactButton{
                        margin-bottom:3.4rem;
                    }
                    .smallMsg{
                        margin-bottom:1.3rem;
                    }
                    .errorPageDetails{
                        padding:0 0%;
                    }
                }
            `}</style>  
        </>
    )
}
