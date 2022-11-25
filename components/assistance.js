import useTranslation from 'next-translate/useTranslation'

export default function Assistance(){
    const {t}=useTranslation('common')

    return (
        <>
            <div className="assistance">
                <div className="font24 canelaThin">{t('needAssistance')}</div>
                <div className="anoHalfRegular">
                    <div className="font16-notResponsive desc">{t('assistanceDesc')}</div>
                    <div className="contact">
                        <div className="phone">
                            <img src="/images/phone-icon.png" /> <a href="tel:+32484929295" className="inlineBlock phoneNumber">+32 484 929 295</a>
                        </div>
                        <div className="email">
                            <img src="/images/envelope-icon.png" /> <a href="mailto:hello@unsaid.com" className="inlineBlock emailAddress">hello@unsaid.com</a>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .phone img,.email img{
                    vertical-align:middle;
                }
                .contact{
                    margin-top:2.4rem;
                }
                .phoneNumber,.emailAddress{
                    margin-left:1rem;
                    transform:translateY(0.1rem)
                }
                .assistance .desc{
                    margin-top:2.4rem;
                }
            `}</style>
        </>
    )
}