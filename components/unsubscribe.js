import { MOBILE_BREAKPOINT} from "../config"
export default function unsubscribe(props){
    return (
        <>
       <div className="container">
            <div className="canelaThin font32 text1 alignCenter">{props.text1}</div>
            <div className="anoHalfRegular font16 text2 alignCenter">{props.text2}</div>
            <div className="imageWrapper">
                <div className="hideForMobile">
                    <img src={props.img} className="width-100"/>
                </div>
                <div className="showForMobile">
                    <img src={props.imgMobile} className="width"/>
                </div>
            </div>
       </div>
       <style jsx >{`
          .container{
              margin-left:35.35%;
              margin-right:35.35%;
              margin-top:3.2rem;
              margin-bottom:17.2rem;
          }
          .text1{
              margin-bottom:3.2rem;
          }
          .text2{
              margin-bottom:5.6rem;
          }
          @media screen and (max-width: ${MOBILE_BREAKPOINT}px){
            .container{
                margin-left:9.88%;
                margin-right:9.88%;
                margin-bottom:16rem;
                margin-top:1.6rem
            }
            .text1{
                margin-bottom:2.4rem;
            }
            .text2{
                margin-bottom:4.8rem;
            }

          }
       `}</style>
       </>

    )
}