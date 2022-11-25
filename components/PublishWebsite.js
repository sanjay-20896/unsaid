import {UNSAID_API,DEPLOY_URL} from '../branch-specific-config'
import { useState } from 'react'
import {ADMIN_TOKEN_VAR_NAME} from '../config'
import Loader from "../components/loader"

export default function PublishWebsite() {
  const [websitePublishMessage,setWebsitePublishMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  async function publishWebsite(){
    setLoader(true);
    const response=await fetch(`${DEPLOY_URL}`,{
      method: "POST",
    })
    let data=await response.json();
    if(response.status==201){
      setLoader(false);
      setWebsitePublishMessage("Publishing website...")
      // console.log("success",data);
    }else{
      setLoader(false);
      setWebsitePublishMessage("Unable to publish the website.")
      // console.log("fail",data);
    }
    let token=localStorage.getItem(ADMIN_TOKEN_VAR_NAME);
    const response1= await fetch(`${UNSAID_API}/api/dashboard/updateSearch?token=${token}`,{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
    })
    if(response1.status==200){
      let searchResponse=await response1.json();
      // console.log(searchResponse)
    }else{
      // console.log(response1.status)
    }
  }
  return (
    <>
      <div>
        <div className="publishButtonWrapper alignCenter"><button onClick={()=>publishWebsite()} className="btn btnPrimary anoRegular">Publish website</button></div>
        {!!websitePublishMessage && <div className="errorMsg anoRegular font16 alignCenter">{websitePublishMessage}</div>}
        {loader && <div className='loader'><Loader size={30} color="#787878"/></div>}
      </div>
      <style>{`
        .loader{
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 20%;
        }
        .errorMsg{
          margin-top: 15px;
        }
      `}</style>
    </>
  )
}
