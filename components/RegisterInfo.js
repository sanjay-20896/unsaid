
import Link from "next/link";
import {MOBILE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'
function RegisterInfo(props){
    const {t}=useTranslation('common');
    return(
        <>
        <div>
            <div className="text1 canelaThin font32 hideForMobile">{t('accountCreation')}</div>
            <div className="text2 canelaThin font20">{t('enjoyBenefitsUnsaid')} :</div>
            <div className="list-wrapper">
                <ul className="list m0 ">
                    <li className="listItem anoHalfRegular font16">{t('saveTimeDuringCheckout')}</li>
                    <li className="listItem anoHalfRegular font16">{t('accessShoppingBag')}</li>
                    <li className="listItem anoHalfRegular font16">{t('viewOrderHistory')}</li>
                    <li className="listItem anoHalfRegular font16">{t('saveItemsToWishlist')}</li>
                    <li className="listItem anoHalfRegular font16">{t('trackRecentPurchases')}</li>
                </ul>
            </div>
            
            <Link href="/myunsaid/register">
                <button className="loginBtn btn btnPrimary font16 anoRegular">{t('accountCreation')}</button>
            </Link>
        </div>
        <style jsx>{`
            .text1{
                margin-bottom:3.2rem;
            }
            .text2{
                margin-bottom:1.2rem;
            }
            .list{
                padding-left:1.4rem;
                margin-bottom:3.2rem;
            }
            .listItem{
                // margin-bottom:1rem;
            }
            @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                .text2{
                    margin-bottom:1rem;
                    text-align:center;
                }
                .list{
                    margin: 0 auto;
                    padding:0;
                }
                .list-wrapper{
                    display: flex;
                    align-items: center;
                    margin-bottom:4.6rem;
                }
                .listItem{
                    // margin-bottom:0rem;
                }
                .loginBtn{
                    width:100%;
                }
            }
           

        `}</style>
        </>
    )
}

export default RegisterInfo;