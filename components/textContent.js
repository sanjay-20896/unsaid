function TextContent(){
    return(
        <>
        <div className="textContainer">
            <div className="title font20 anoHalfRegular alignCenter">title</div>
            <div className="header font40 canelaThin alignCenter">Header</div>
            <div className="desc font24 canelaThin alignCenter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sodales morbi viverra tristique fermentum mi scelerisque.</div>
        </div>
        <style jsx>{`
        .textContainer{
            padding-left:39.9rem;
            padding-right:39.8rem;
        }
        .header{
            padding-top:3.2rem;
            padding-bottom:2.4rem;
        }
        .desc{
            width:100%;
            padding-left:17rem;
            padding-right:17rem;
            padding-bottom:2rem;
        }
        
        
        `}</style>
        </>
    )
}

export default TextContent;