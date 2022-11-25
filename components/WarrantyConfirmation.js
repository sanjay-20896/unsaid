import Link from "next/link";
import {MOBILE_BREAKPOINT} from '../config';
import useTranslation from 'next-translate/useTranslation'
export default function WarrantyConfirmation() {
    const {t}=useTranslation('common');
    return (
        <>
            <div className="warrantyConfirmation">
                <h1 className="msg font32 canelaThin alignCenter">{t('congratulationsUnsaidWarrantyActive')}</h1>
                <Link href="/"><a><button className="btn btnPrimary font20 anoRegular width-100">{t('backToUnsaid')}</button></a></Link>
            </div>
            <style jsx>{`
                .msg{
                    margin-bottom: 5.6rem;
                    font-size: 3.2rem;
                    line-height: 4rem;
                }
                .warrantyConfirmation{
                    width: 42.2rem;
                    margin: 18.6rem auto 22.8rem;
                }
                @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .warrantyConfirmation{
                        width: 100%;
                        margin: 0;
                        padding: 18.6rem 3.6rem 22.8rem;
                    }
                    .msg{
                        margin-bottom: 4.8rem;
                        font-size: 2.8rem;
                        padding: 0 27px 0;
                    }
                }
            `}</style>
        </>    
    )
}
