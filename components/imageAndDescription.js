export default function imageAndDescription(props) {
    return(
        <>
        <div className="row paddedContent">
            <div className="column">
                <img src="/images/product-1a.png" className="width-100"/>
            </div>
            <div className="column descColumn">
                <div className="font32 canelaThin desc1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                <div className="font16 canelaThin desc2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi enim fames libero rhoncus magna molestie. Tellus orci auctor etiam sapien amet. Feugiat quam mattis lectus nunc. Lorem facilisi adipiscing faucibus rutrum consequat, nunc, enim. Orci eget vitae parturient et. Est ut et phasellus quis. Neque quis odio ut pellentesque rhoncus, orci tempus, sed.</div>
            </div>
        </div>
        <style jsx>{`
         .row{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
        }
        .column{
            display:flex;
            flex-direction:column;
            flex-wrap:wrap;
            width:50%
        }
        .desc1{
            padding-top:50%;
            width:55%;
            padding-bottom:1.6rem;
        }
        .desc2{
            padding-top:1.6rem;
            width:55%;
        }
        .descColumn{
            padding-left:13.5rem;
        }
        
        
        `}
        </style>
        </>
    )
}