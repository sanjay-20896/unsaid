function columnContent(props) {
    return(
        <>
        <div  className="paddedContent">
            <div className="column-content-wrapper">

                <div className="items">
                    <div className="imageWrapper">
                        <img src="/images/story-1.png" className="width-100"/>
                    </div>
                    <div className="font24 canelaThin title">title</div>
                    <div className="font16 anoHalfRegular description">description</div>
                </div>
                
            </div>
        </div>
        <style jsx>{`
            .column-content-wrapper{
                padding-left:11.1rem;
                padding-right:11.1rem;
                display:flex;
            }
            .items{
                padding-left:2.4rem;
            }
            .imageWrapper{
                padding-bottom:3.2rem;
            }
            .title{
                padding-bottom:1.6rem;
            }
        `}</style>


        </>
    )
}


export default columnContent;