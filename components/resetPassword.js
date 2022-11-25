import {UNSAID_API} from '../branch-specific-config'
import { TOKEN_VAR_NAME } from '../config'
import { useState } from 'react'
import Loader from './loader'
import Input from './input'
import { storeSelection } from '../redux/actions'
import {connect} from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

function ResetPassword(props){
    const {t}=useTranslation('common');
    const [password,setPassword] = useState("")
    const [passwordTouched,setPasswordTouched] = useState(false)
    const [passwordError,setPasswordError] = useState(true)
    const [passwordErrorMessage,setPasswordErrorMessage] = useState("")
    const [newPassword,setNewPassword] = useState("")      
    const [newPasswordTouched,setNewPasswordTouched] = useState(false)
    const [newPasswordError,setNewPasswordError] = useState(true)
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    function validatePassword(val){
        if(val.length < 1){
            setPasswordErrorMessage(t('required'))
            setPasswordError(true)
        }
        else
            setPasswordError(false)
    }
    function validateNewPassword(val){
        if(val.length <8)
            setNewPasswordError(true)
        else
            setNewPasswordError(false)
    }
    function onPasswordChange(val){
        validatePassword(val)
        setPassword(val)
        setPasswordTouched(true)
    } 
    function onNewPasswordChange(val){
        validateNewPassword(val)
        setNewPassword(val)
        setNewPasswordTouched(true)
    }
    let resetPasswordError = passwordError || newPasswordError
    async function resetPassword(){
        try{
            if(!resetPasswordError){
                setSuccess(false)
                var reqBody={
                    password,
                    newPassword
                }
                let token = localStorage.getItem(TOKEN_VAR_NAME)
                if(token)
                    reqBody["token"] = token
                setLoading(true)
                let rawResponse=await fetch(`${UNSAID_API}/api/auth/addNewPassword`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify(reqBody)
                })
                if(rawResponse.status==200){
                    let selection = await rawResponse.json() 
                    localStorage.setItem(TOKEN_VAR_NAME,selection.token)
                    props.storeSelection(selection)
                    setSuccess(true)
                    setTimeout(()=>{
                        setSuccess(false)
                    },3000)
                } else {
                    let result = await rawResponse.json()
                    if(result?.errors?.password){
                        setPasswordErrorMessage(t('incorrectPasswordError'))
                        setPasswordError(true)
                    }
                }
                setLoading(false)
            }
        } catch(err) {
            // console.log(err)
            setLoading(false)
        }
    }
    let btnContent = loading?<span className="inlineBlock loader"><Loader type="dots" size={8} color="white"/></span>:t('reset')
    return (
        <>
            <div className="rows">
                <div className="row">
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onPasswordChange(e.target.value)} value={password} error={passwordTouched && !!passwordError} errorMsg={passwordErrorMessage} placeHolder={t('oldPassword')} required={true}/>
                    </div>
                    <div className="inputField">
                        <Input type="text" onChangeValue={(e)=>onNewPasswordChange(e.target.value)} value={newPassword} error={newPasswordTouched && !!newPasswordError} errorMsg={t('atleast8Characters')} placeHolder={t('newPassword')} required={true} />
                    </div>
                </div>
                <div className="row">
                    <button onClick={()=>resetPassword()} className={`btn submit ${resetPasswordError?"btnInactive":"btnPrimary"} white anoRegular font16-notResponsive cursorPointer`}>{btnContent}</button>
                </div>
                {success &&
                    <div className="success alignCenter">
                        {t('passwordResetSuccessfully')}
                    </div>
                }
            </div>
            <style jsx>{`
                .success{
                    margin-top:2.4rem;
                }
                .submit{
                    margin:auto;
                    min-width: 12.2rem;
                }
                .row{
                    display:flex;
                }
                .rows .row:not(:last-child){
                    margin-bottom:4.8rem;
                    padding-top:3rem;
                }
                .row div.full{
                    width:100%;
                }
                .row div{
                    width:50%;
                    padding-right:2.4rem;
                }
                .loader{
                    margin:auto;
                }
            `}</style>
        </>
    )
}
export default connect(null,{storeSelection})(ResetPassword)