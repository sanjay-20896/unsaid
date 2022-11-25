import {connect} from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
function PrivateContent(props){
    const router = useRouter()
    useEffect(()=>{
        // console.log("private",props.admin.token,props.admin.loggingIn)
        setTimeout(()=>{
            if(!props.admin.token && !props.admin.loggingIn)
                router.push('/admin-ZutRsdT/login')
        },500)
    },[props.admin.loggingIn])
    let jsx = '';
    if(!props.admin.loggingIn){
        if(props.admin.token)
            jsx = props.content
        else
            jsx = <div className="text-center" style={{marginTop:"5rem",cursor:"pointer"}}>You must login to access this page</div>
    }
    else{
        jsx = (
            <div className="text-center" style={{marginTop:"5rem"}}>
                Loading...
            </div>
        )
    }
    return jsx
}
function mapStateToProps({admin}){
    return {admin}
}
export default connect(mapStateToProps)(PrivateContent)