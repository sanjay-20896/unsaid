import { useState } from "react"
import Expandable2 from '../components/expandable2';
import Profile from '../components/profile'
import ResetPassword from '../components/resetPassword'
export default function UpdateProfile(props){
    const [expandableActive,setExpandableActive] = useState(null)
    function setExpand(item){
        setExpandableActive(expandableActive==item?null:item)
    }
    return (
        <>
            <div>
                <div>
                    <Expandable2  setExpand={(bool)=>setExpand("profile")} expand={expandableActive=="profile"} heading="Update profile" content={<Profile />} />
                </div>  
                <div>
                    <Expandable2 setExpand={(bool)=>setExpand("resetPassword")} borderTop={true} borderBottom={true} expand={expandableActive=="resetPassword"} heading="Reset password" content={<ResetPassword />} />
                </div>  
            </div>
        </>
    )
}