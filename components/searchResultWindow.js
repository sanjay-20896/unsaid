import React from 'react'
import useTranslation from 'next-translate/useTranslation'
export default function searchResultWindow() {
    const {t}=useTranslation('common');
    return (
        <>
            <div className={`searchPanelTwoWrapper ${searchProductsVisible?"productsVisible":"readsVisible"}`}>
                {!!panelTwoData && 
                    <div className="searchResultTitles">
                        {!!panelTwoData.products && <div onClick={()=>scrollToView("products")} className="productTitle anoRegular font16 underlinedLink">{panelTwoData.products.length} {t('products')}</div>}
                        {!!panelTwoData.reads && <div onClick={()=>scrollToView("reads")} className="readsTitle anoRegular font16 underlinedLink">{panelTwoData.reads.length} {t('reads')}</div>}
                    </div>
                }
                <div className="allSearchResults">
                    <div ref={productsSearchResultsRef} className="searchProductResults">
                        {!!panelTwoData && !!panelTwoData.products && panelTwoData.products.map((product,index)=>{
                            let delay2=(((index+1)*0.1)+(0.2)).toString();
                            return(
                                <div style={{animationDelay:`${delay2}s`}} className={`productDetails searchResults ${index===0?"firstItem":""}`}>
                                    <div className="productLeft">
                                        <Link href={product.linksTo}><a className={`${indexValue2===index+1?"current":""}`}><div onMouseEnter={()=>{setIndexValue2(index+1), setPanelThree(true), tierThreeData(product)}} className="productName underlinedLink canelaThin font16">{product.productName}</div></a></Link>
                                        <div className="productContent anoHalfRegular">{product.content}</div>
                                        <div className="priceAndColor">
                                            <div className="productPrice anoRegular">{product.price}</div>
                                            <div className="colorVariant"><Colors colors={["#EAC786","#D5D1D1","#F2C2A4"]}/></div>
                                        </div>
                                    </div>
                                    <div className="productRight">
                                        <img className="width-100" src={product.img}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div ref={readsSearchResultsRef}>
                        {!!panelTwoData && !!panelTwoData.reads && panelTwoData.reads.map((read,index)=>{
                            let delay2=(((index+1)*0.1)+(0.2)).toString();
                            return(
                                <div style={{animationDelay:`${delay2}s`}} className={`readCard ${index===0?"firstItem":""}`}>
                                    <Link href={read.linksTo}><a className={`${indexValue2===index+panelTwoData.products.length+1?"current":""}`}><h1 onMouseEnter={()=>{setIndexValue2(index+panelTwoData.products.length+1), setPanelThree(true), tierThreeData(read)}} className="readCardHeading canelaThin underlinedLink font20">{read.readHeading}</h1></a></Link>
                                    <h1 className="readCardContent anoHalfRegular font16">{read.readContent}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>  
            <style jsx>{`
                .searchPanelTwoWrapper{
                    height:100%;
                }
                .searchWindowActive .searchResultTitles{
                    display:flex;
                    padding-top:2.5rem;
                    margin-bottom:3.2rem;
                    padding-left:5.2rem;
                    padding-right:5.2rem;
                }
                .searchWindowActive .searchResultTitles div{
                    margin-right:2.4rem;
                    color:#787878;
                }
                .productsVisible .searchResultTitles div.productTitle{
                    color:#000000;
                }
                .readsVisible .searchResultTitles div.readsTitle{
                    color:#000000;
                }
                .searchWindowActive .searchResultTitles div:last-child{
                    margin-right:0rem;
                }
                .underlinedLink{
                    display:inline-block;
                    position:relative;
                    cursor: pointer;
                }
                .underlinedLink::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background-color: black;
                    height: 0.1rem;
                    width: 100%;
                    transform: scaleX(0);
                    transform-origin: right;
                    transition: transform 0.3s ease-out;
                }
                .current .underlinedLink::after{
                    transform: scaleX(1);
                    transform-origin: left;
                }
                .store.current .underlinedLink::after,
                .productTitle.underlinedLink:hover::after,
                .readsTitle.underlinedLink:hover::after,
                .productsVisible .productTitle.underlinedLink::after,
                .readsVisible .readsTitle.underlinedLink::after,{
                    transform: scaleX(1);
                    transform-origin: left;
                }
                
            `}</style> 
        </>
    )
}
