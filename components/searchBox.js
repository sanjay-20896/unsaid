import {connect} from 'react-redux'
import { connectSearchBox } from 'react-instantsearch-dom'
import {setSearchQuery} from '../redux/actions'
import {useEffect, useRef} from 'react'
import useTranslation from 'next-translate/useTranslation'
const SearchBox = (props) => {
    const {t}=useTranslation('common');
    const searchInput = useRef(null)
    let timer = null
    function refine(query){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            if(query.length >= 4)
                props.refine(query)
            else 
                props.refine("")
        },500)
    }
    useEffect(()=>{
        searchInput.current.focus()
        refine(props.common.searchQuery)
        // props.setSearchQuery("")
    },[props.common.searchQuery])

    function submitWhenEnter(e){
        if (e.keyCode == 13) {
            e.preventDefault();
            // props.setSearchQuery("")
            return false;
        }
    }
    return (
    <>
        <form noValidate action="" role="search">
            <input
                ref={searchInput}
                type="text"
                placeholder={t('search')}
                onSubmit={event => {
                    event.preventDefault();
                }}
                className="searchInput font24"
                value={props.common.searchQuery}
                onChange={event => {
                    props.setSearchQuery(event.currentTarget.value)
                }}
                onKeyDown={e=>{submitWhenEnter(e)}}
            />
        </form>
        <style jsx>{`
            .searchInput{
                border:none;
                width:100%;
                font-family: CanelaThin,sans-serif;
            }
        `}</style>
    </>
    )
}
function mapStateToProps({common}){
    return {common}
}
export default connect(mapStateToProps,{setSearchQuery})(connectSearchBox(SearchBox));
