import {connect} from 'react-redux'
import Totals from './totals'
import CartItemGift from './cartItemGift'
function YourOrderMobile(props){
    let cartItems = props.selection?.selection?.selection?.items
    return (
        <>
            <Totals totals={props?.selection?.selection?.selection?.totals} shippingLocation={props?.selection?.selection?.location?.name} discounts={props?.selection?.selection?.selection?.discounts}/>
            <div className="giftItems">
                {Array.isArray(cartItems) && cartItems.map((item,index)=>{
                    if(!!item.bundle)
                        return(
                            <div className="cartItem">
                                <CartItemGift item={item} hideEdit={true} hideTotal={true}/>
                            </div>
                        )
                })}
            </div>
            <style jsx>{`
                .cartItem{
                    background:#ffffff;
                    padding:2rem 5%;
                    margin-bottom: 4.8rem;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,null)(YourOrderMobile)