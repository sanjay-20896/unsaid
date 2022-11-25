import { useState } from "react"
import DashboardOnline from "./DashboardOnline";
import DashboardPos from "./DashboardPos";
import PublishWebsite from "./PublishWebsite";

export default function Dashboard(props) {
    const [dashboardType,setDashboardType] = useState("none");
    return (
        <>
            <div className="dashboard">
                <div className="leftNavigation anoRegular">
                    <details>
                        <summary className="">Orders</summary>
                        <ul className="listStyleNone font16">
                            <li><span onClick={()=>setDashboardType("online")} className={`underlineLR ${dashboardType == "online"?"active":""}`}>Online</span></li>
                            <li><span onClick={()=>setDashboardType("pos")} className={`underlineLR ${dashboardType == "pos"?"active":""}`}>POS</span></li>
                        </ul>
                    </details>
                    <details>
                        <summary className="">Others</summary>
                        <ul className="listStyleNone font16">
                            <li><span onClick={()=>setDashboardType("publishWebsite")} className={`underlineLR ${dashboardType == "publishWebsite"?"active":""}`}>Publish website</span></li>
                        </ul>
                    </details>
                </div>
                <div className="rightContent positionRelative">
                    {dashboardType == "online" && <DashboardOnline/>}
                    {dashboardType == "pos" && <DashboardPos/>}
                    {dashboardType == "publishWebsite" && <PublishWebsite/>}
                </div>
            </div>
            <style>{`
                .dashboard{
                    width: 100%;
                    display: flex;
                    overflow: hidden;
                }
                ul li{
                    margin-bottom: 1rem;
                }
                ul li:last-child{
                    margin-bottom: 0rem;
                }
                details{
                    margin-bottom: 2rem;
                }
                summary{
                    cursor: pointer;
                    font-size: 1.8rem;
                }
                .dashboard, .leftNavigation,.rightContent{
                    height: 100%;
                }
                .leftNavigation{
                    padding: 5rem;
                    width: 20%;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
                }
                .rightContent{
                    width: 80%;
                    padding: 5rem;
                    overflow-y: scroll;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .rightContent::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </>
    ) 
}
