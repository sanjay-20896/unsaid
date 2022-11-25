import {connect} from 'react-redux'
import {gettingSelection,storeSelection,pageTransitioning} from '../redux/actions'
import {TOKEN_VAR_NAME} from '../config'
import {ECOMMERCE_URI} from '../branch-specific-config'
import Caret from './caret'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setCookie, getCookies } from 'cookies-next';
function LanguageSwitch(props) {
    const router = useRouter();
    const { pathname, asPath, query } = router;
    let allLanguages = props?.selection?.selection?.languages;
    let preferredLanguage  = props?.selection?.selection?.location?.language?.language;
    async function handleCountryChange(language, changeRoute){
        try{
            props.gettingSelection(true);
            const token=localStorage.getItem(TOKEN_VAR_NAME);
            const rawResponse=await fetch(`${ECOMMERCE_URI}/languages/${language}`,{
                method:'PUT',
                headers:{
                    'Accept': `*/*; api-token: ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            if(rawResponse.status==200){
                // console.log("selection",selection);
                let selection = await rawResponse.json();
                localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                props.storeSelection(selection)
                setCookie('NEXT_LOCALE', language);
                if(!!changeRoute) router.replace({ pathname, query }, asPath, { locale: language })
            } else {
                console.log('could not change language')
                // console.log(rawResponse.status)
            }
            props.gettingSelection(false);
        } catch(err) {
            console.log(err)
            props.gettingSelection(false)
        }
    }
    useEffect(()=>{
        let cookieLocale = getCookies().NEXT_LOCALE;
        if(!cookieLocale) handleCountryChange(router.locale, false)

        // let reqLocale = getCookies().NEXT_LOCALE;
        // if(!!reqLocale && router.locale!=reqLocale){
        //     router.replace({ pathname, query }, asPath, { locale: reqLocale });
        //     props.pageTransitioning(false)
        // }
    },[])
  
    return (
        <>
            <div className="languageSwitch">
                <select className={`${props.fontClass?props.fontClass:""}`} value={preferredLanguage} onChange={(e)=>handleCountryChange(e.target.value, true)} autoComplete="off">
                    {!!allLanguages && allLanguages?.map(lan=>{
                        return <option key={lan.language} value={lan.language}>{lan.name}</option>
                    })}
                </select>
                {!!props?.caret && <span className="caret"><Caret marginBottom={props.CaretMarginBottom} color={!!props?.caretColor ?props.caretColor:"black"} direction="down" width="0.1rem" length="0.6rem"/></span>}
            </div>
            <style jsx>{`
                select{
                    width:100%;
                    font-family:anoRegular, sans-serif;
                }
                .languageSwitch{
                    display: flex;
                }
                .languageSwitch .caret{
                    margin-left: 10px;
                }
            `}</style>
        </>
    )
}
function mapStateToProps({selection}){
    return {selection}
}
export default connect(mapStateToProps,{gettingSelection,storeSelection,pageTransitioning})(LanguageSwitch)