import useTranslation from 'next-translate/useTranslation'

export default function AssistanceAndCheckoutIcons(props){
    const {t}=useTranslation('common')
    return (
        <>
            <div className="checkoutIcons">
                <div className="checkoutIconAndText">
                    <img src="/images/free-delivery.png" className="checkoutIcon"/>
                    <div className="checkoutIconText">
                        {t('freeDelivery')}
                    </div>
                </div>
                <div className="checkoutIconAndText">
                    <img src="/images/refund.png" className="checkoutIcon"/>
                    <div className="checkoutIconText">
                    {t('refundPolicy')}
                    </div>
                </div>
                <div className="checkoutIconAndText">
                    <img src="/images/safe.png" className="checkoutIcon"/>
                    <div className="checkoutIconText">
                    {t('safePayment')}
                    </div>
                </div>
                <div className="checkoutIconAndText">
                    <img src="/images/engraving.png" className="checkoutIcon"/>
                    <div className="checkoutIconText">
                        {t('freeEngraving')}
                    </div>
                </div>
                <div className="checkoutIconAndText">
                    <img src="/images/box.png" className="checkoutIcon"/>
                    <div className="checkoutIconText">
                        {t('personaliseJewelBox')}
                    </div>
                </div>
                <div className="checkoutIconAndText">
                    <img src="/images/repair-new.png" className="checkoutIcon"/>
                    <div className="checkoutIconText">
                        {t('repairAndWarranty')}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .checkoutIconText{
                    line-height:1.2rem;
                }
                .checkoutIcon{
                    margin-bottom:1.2rem;
                }
                .checkoutIcons{
                    display: flex;
                    flex-flow: row wrap;
                    border-top:1px solid #000000;
                    background:#ffffff;

                }
                .checkoutIconAndText{
                    text-align:center;
                    flex: 1 1 auto;
                    width:33.33%;
                }
                .checkoutIcon{
                    width:3.6rem;
                }
                .checkoutIconAndText{
                    padding-top:3rem;
                    padding-bottom:3rem;
                    padding-left:3%;
                    padding-right:3%;
                    
                }
                .checkoutIcons .checkoutIconAndText:nth-child(3n-2),.checkoutIcons .checkoutIconAndText:nth-child(3n-1){
                    border-bottom:1px solid #000000;
                    border-right:1px solid #000000;
                }
                .checkoutIcons .checkoutIconAndText:nth-child(3n){
                    border-bottom:1px solid #000000;
                }
                @media screen and (max-width: 1000px){
                    .checkoutIconAndText{
                        width:50%;
                    }
                    .checkoutIcons .checkoutIconAndText:nth-child(2n-1){
                        border-bottom:1px solid #000000;
                        border-right:1px solid #000000;
                    }
                    .checkoutIcons .checkoutIconAndText:nth-child(2n){
                        border-bottom:1px solid #000000;
                        border-right:none;
                    }
                }
            `}</style>
        </>
    )
}