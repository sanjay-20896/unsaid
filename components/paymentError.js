import Assistance from "./assistance";
import useTranslation from 'next-translate/useTranslation'

export default function PaymentError(props){
    const {t}=useTranslation('common');
    function getErrorMessage(code){
        switch(code) {
            case 'ECOMM':
                return t('paymentInternetFail');
            case 'PAY_METHOD_UNAVAILABLE':
                return t('paymentInternetFail');
            default:
                return t('tryAgainInternetIssue');
          }
    }
    let errorMessage = getErrorMessage(props?.error?.type?props.error.type:t('UNEXPECTED'))
    return (
        <div>
            <div className="errorLine error">{t('somethingWentWrong')}</div>
            <div className="errorLine">CODE: {props?.error?.type?`${props.error.type} ${props.error.status}`:"UNEXPECTED"}</div>
            <div className="errorLine">MESSAGE: {errorMessage}</div>
            <div className="errorLine">
                <button className="btn btnPrimary anoRegular font16-notResponsive" onClick={()=>props.initiatePayment()}>{t('tryAgain')}</button>
            </div>
            <div>
                <Assistance />
            </div>
            <style jsx>{`
                .errorLine{
                    margin-bottom:2.4rem;
                }
            `}</style>
        </div>
    )
}