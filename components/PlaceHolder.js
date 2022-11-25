
export default function PlaceHolder(props){
    return (
        <>
            <div className={`lazyImageWrapper`}>
                <div className={`lazyImageContent`}></div>
            </div>
            <style jsx>{`
                .lazyImageWrapper{
                    padding-top:${props.height*100/props.width}%;
                    position:relative;
                    background-color:#f2f2f2;
                }
                .lazyImageContent{
                    position:absolute;
                    width:100%;
                    height:100%;
                    overflow:hidden;
                    top:0;
                    left:0;
                    opacity:0;
                    z-index:2;
                }
            `}</style>
        </>
    )
}