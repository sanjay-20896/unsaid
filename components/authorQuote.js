import Quote from '../components/quote'
import Image from '../components/image'
import { MOBILE_BREAKPOINT } from '../config'
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function authorQuote(){
    return(
        <>
        <div className="hideForMobile">
            <div className="row ">
                <div className="column">
                    <Quote/>
                </div>
                <div className="column img">
                    <LazyLoadImage
                        alt="Image"
                        src="/images/4.png"
                        width="100%"
                    />
                </div>
            </div>
        </div>
       
        <div className="container showForMobile">
            <Quote/>
            <div className="column img">
                <LazyLoadImage
                    alt="Image"
                    src="/images/4.png"
                    width="100%"
                />
            </div>
        </div>
        <style jsx >{`
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
        .img{
            padding-top:30%;
            width:30%;
        }
        @media screen and (max-width:${MOBILE_BREAKPOINT}px){
            .container{
                padding-left:3.6rem;
                padding-right:3.6rem;
            }
            .column{
                display:block;
                width:100%; 
                padding-top:3.2rem;
            }
            img{
                padding-left:25%;

            }
            .img{
                padding-top:2.4rem;
                width:100%
            }
            

        }
        
        `}
        </style>
        </>
    )
}