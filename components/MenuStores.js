import StoresMenu from './storesMenu'

export default function MenuStores(props) {
    return (
        <>
            {props.storeDetails.map((store,index)=>{
                return(
                    <StoresMenu id={index} storeDetails={store}/>
                )
            })}
        </>    
    )
}
