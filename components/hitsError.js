import {connectHits} from 'react-instantsearch-dom';
import {connect} from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

function HitsError(props){
    const {t}=useTranslation('common');

    return (
        <>
        {props.common.searchQuery.length >= 4  && props.hits.length == 0 &&
            <div className="searchResultError canelaThin font16-notResponsive">
                {t('hitErrorMsg')}
            </div>
        }
        <style jsx>{`
            .searchResultError{
                margin-top:3.2rem;
                opacity:0;
                animation: fadeInFromNone 3s linear 1s 1 normal forwards;
            }
            @keyframes fadeInFromNone {
                0% {
                    opacity:0;
                }
                1%{
                    opacity:1;
                }
                100% {
                    opacity:1;
                }
            }
        `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(connectHits(HitsError))