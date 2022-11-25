import { useEffect, useState } from "react"
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT} from '../config'
export default function useDevice() {
    const [dimensions,setDimensions] = useState(null)
    function handleResize(){    
        setDimensions({width:window.innerWidth,height:window.innerHeight})
    }
    useEffect(() => {
        setDimensions({width:window.innerWidth,height:window.innerHeight})
        window.addEventListener("resize",handleResize)
        return ()=>{
            window.removeEventListener("resize",handleResize)
        }
    }, [])
    let deviceName = ""
    if(dimensions){
        if(dimensions.width <= MOBILE_BREAKPOINT)
            deviceName = "mobile"
        else if(dimensions.width > MOBILE_BREAKPOINT && dimensions.width <= TABLET_PORTRAIT_BREAKPOINT)
            deviceName = "tab_portrait"
        else 
            deviceName = "desktop"
    }
    return {deviceName, dimensions}
}