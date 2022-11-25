import ProductTagging from './productTagging';
import {productTagging} from './../data/staticData'
function imageProductTaging(props){
    return(
        <>
        <div className="paddedContent">
            <div className="font20 anoHalfRegular title">Alyzee’s favorites</div>
            <div className="image-wrapper">
                <img src="/images/portraitTagging.png" className="width-100"/>
                {Array.isArray(productTagging) && productTagging.map(product=>{
                    return(
                        <ProductTagging 
                            width={product.width}
                            positionFromTop={product.positionFromTop} 
                            positionFromLeft={product.positionFromLeft} 
                            productName={product.productName}
                            productPrice={product.productPrice}
                        />
                    )
                })} 
            </div>
            

        </div>
        <style jsx>{`
        .image-wrapper{
            
        }

        .title{
            padding-bottom:3.2rem;
        }
        
        
        `}</style>
        </>
    )
}

export default imageProductTaging;