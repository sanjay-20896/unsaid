import {connect} from 'react-redux'
import Hits from './hits'
import {MOBILE_BREAKPOINT} from '../config'
function SearchResults(props){
    return (
        <>
            {props.common.searchQuery.length >= 4?
                <div className="searchPanelTwoWrapper">
                    <div className="allSearchResults">
                        <Hits noHover={props.noHover}/>
                    </div>
                </div>
            :
                <div></div>
            }
            <style jsx>{`
                .searchPanelTwoWrapper{
                    height:100%;
                }
                .allSearchResults{
                    height:100%;
                    overflow-y:scroll;
                    padding-left:5.2rem;
                    padding-right:5.2rem;
                    padding-bottom:15rem;
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
                .allSearchResults::-webkit-scrollbar {
                    display: none;
                }
                @media only screen and (max-width: 1025px){
                    .allSearchResults{
                        padding-left:0;
                        padding-right:0;
                    }
                }
                @media only screen and (max-width: ${MOBILE_BREAKPOINT}px){
                    .allSearchResults{
                        padding-left:0rem;
                        padding-right:0rem;
                        height:${props.common.windowHeight?`${props.common.windowHeight}px`:"100vh"};
                        padding-bottom: 300px;
                    }
                }
            `}</style>
        </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,null)(SearchResults)