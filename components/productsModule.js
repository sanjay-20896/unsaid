import React from 'react'
import ThreeStepText from '../components/threeStepText'
import SingleProduct from '../components/singleProduct'
import UnlockingProductModule from '../components/unlockingProductModule'
import Space from '../components/space'

export default function productsModule(props) {
    return (
        <>
         <div className="productsModule">
            <ThreeStepText smallText="The art of timelessness" largeText="Meet our modern classics" desc="From the comforts of home to the heights of passion – these are our defining pieces."/>
            <Space height="9.6rem"/>
            <UnlockingProductModule class={props.class} yPosition={props.yPosition} img1="/images/product-1a.png" img2="/images/product-1b.png" productName="Product name" productPrice="€1,250" viewProductSection="View all necklaces" productSectionLink="#"/>
            <Space height="9.6rem"/>
            <SingleProduct img1="/images/product-2a.png" img2="/images/product-2b.png" productName="Product name" productPrice="€1,250" viewProductSection="View all necklaces" productSectionLink="#"/>
            <Space height="9.6rem"/>
            <SingleProduct img1="/images/product-3a.png" img2="/images/product-3b.png" productName="Product name" productPrice="€1,250" viewProductSection="View all necklaces" productSectionLink="#"/>
            <Space height="9.6rem"/>
            <SingleProduct img1="/images/product-4a.png" img2="/images/product-4b.png" productName="Product name" productPrice="€1,250" viewProductSection="View all necklaces" productSectionLink="#"/>
            <Space height="22.4rem" />
         </div>   
         <style jsx>{`
           
         `}</style>
        </>
    )
}
