import React from 'react'
import {MOBILE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'

export default function CheckoutNotification(props) {
    const {t}=useTranslation('common')

    return (
        <>
            <div className="brandNotification positionRelative paddedContent">
                <p className="msg anoRegular font16 white">{t('checkoutNotificationPart1')} <a href="/shipping-and-returns" target="_blank">{t('checkoutNotificationPart2')}</a></p>
            </div>  
            <style jsx>{`
                .brandNotification{
                    background: #000000;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    width:100%;
                    text-align:center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .msg a{
                    text-decoration:underline;
                }
            `}</style> 
        </>
    )
}
