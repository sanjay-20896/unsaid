import React from 'react'
import { connect } from 'react-redux'
import {setEngravingText,setNoteText,setBoxChoice,setCardChoice} from '../redux/actions'
import {getProductImage} from '../functions'
import EngravingText from './engravingText'
import {MOBILE_BREAKPOINT, TABLET_PORTRAIT_BREAKPOINT,MEDIUM_BREAKPOINT,DEFAULT_ENGRAVING_CHARACTER_LIMIT, TABLET_LANDSCAPE_BREAKPOINT} from '../config'
import useTranslation from 'next-translate/useTranslation'

function engravingWindow(props) {
    const {t}=useTranslation('common');
    let product = props.cache.products[props.item.split("-")[0]]
    let engravingImage = product.engraving_possible=="1"?getProductImage(product,"e1","standard"):null
    let engravingCharacterLimit = product.engraving_character_limit_value?product.engraving_character_limit_value:DEFAULT_ENGRAVING_CHARACTER_LIMIT
    let remainingChars = parseInt(engravingCharacterLimit) - parseInt(props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText.length:0)
    let x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?500 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:500
    let archTextTopDesktop = "0"
    let archTextLeftDesktop = "0"
    let archTextTopLandscape = "0"
    let archTextLeftLandscape = "0"
    let archTextWidthDesktop = "75%"
    let svgViewBox = "0 0 1150 407"
    let svgd = "M 66.00,109.50C 253.00,302.00 869.00,280.00 1083.50,142.50C 436.00,204.00 1168.00,88.00 1212.00,4.00M -888.00,-1128.00"
    let shapeWrapperPaddingTopDesktop = "36.5%"
    let engravingFontSize = "80px"
    let engravingFontSizeTablet = "75px"
    if(product.sku == "U1RG1-18K-R" || product.sku == "U1RG1-18K-W" || product.sku == "U1RG1-18K-Y"){ 
        archTextTopDesktop = "403px"
        archTextLeftDesktop = "79px"
        archTextTopLandscape = "325px"
        archTextLeftLandscape = "50px"
        archTextWidthDesktop = "75%"
        svgViewBox = "0 0 1232 140"
        svgd = "M 4.00,24.00C 436.00,204.00 1168.00,88.00 1212.00,4.00M -888.00,-1128.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U1RG2-18K-R" || product.sku == "U1RG2-18K-W" || product.sku == "U1RG2-18K-Y" || product.sku == "U1RG5-18K-R" || product.sku == "U1RG5-18K-W" || product.sku == "U1RG5-18K-Y"){ 
        archTextTopDesktop = "320px"
        archTextLeftDesktop = "75px"
        archTextTopLandscape = "273px"
        archTextLeftLandscape = "50px"
        archTextWidthDesktop = "75%"
        svgViewBox = "0 0 1256 296"
        svgd = "M 16.00,96.00C 256.00,280.00 1048.00,256.00 1240.00,96.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U1RG4-18K-R" || product.sku == "U1RG4-18K-W" || product.sku == "U1RG4-18K-Y"){ 
        archTextTopDesktop = "308px"
        archTextLeftDesktop = "100px"
        archTextTopLandscape = "265px"
        archTextLeftLandscape = "72px"
        svgViewBox = "0 0 1528 256"
        svgd = "M 24.00,88.00C 384.00,248.00 1120.00,216.00 1496.00,88.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U2RG2-18K-R" || product.sku == "U2RG2-18K-W" || product.sku == "U2RG2-18K-Y"){ 
        archTextTopDesktop = "571px"
        archTextLeftDesktop = "81px"
        archTextTopLandscape = "432px"
        archTextLeftLandscape = "56px"
        svgViewBox = "0 0 1233 237"
        svgd = "M 15.00,30.00C 243.00,309.00 1053.00,252.00 1209.00,3.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U2RG3-18K-R" || product.sku == "U2RG3-18K-W" || product.sku == "U2RG3-18K-Y"){ 
        archTextTopDesktop = "534px"
        archTextLeftDesktop = "65px"
        archTextTopLandscape = "409px"
        archTextLeftLandscape = "47px"
        svgViewBox = "0 0 1208 280"
        svgd = "M 40.00,64.00C 352.00,312.00 888.00,256.00 1160.00,48.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U2RG5-18K-R" || product.sku == "U2RG5-18K-W" || product.sku == "U2RG5-18K-Y"){
        archTextTopDesktop = "422px"
        archTextLeftDesktop = "51px"
        archTextTopLandscape = "422px"
        archTextLeftLandscape = "51px"
        svgViewBox = "0 0 1280 288"
        svgd = "M 40.00,48.00C 312.00,312.00 1024.00,264.00 1240.00,16.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U9RG2-18K-R" || product.sku == "U9RG2-18K-W" || product.sku == "U9RG2-18K-Y"){
        archTextTopDesktop = "439px"
        archTextLeftDesktop = "78px"
        archTextTopLandscape = "346px"
        archTextLeftLandscape = "51px"
        svgViewBox = "0 0 1152 248"
        svgd = "M 16.00,16.00C 184.00,224.00 1000.00,248.00 1104.00,32.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U9RG4-18K-R" || product.sku == "U9RG4-18K-W" || product.sku == "U9RG4-18K-Y"){
        archTextTopDesktop = "526px"
        archTextLeftDesktop = "102px"
        archTextTopLandscape = "404px"
        archTextLeftLandscape = "59px"
        svgViewBox = "0 0 1232 320"
        svgd = "M 24.00,56.00C 272.00,336.00 968.00,304.00 1192.00,48.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U9RG14-18K-R" || product.sku == "U9RG14-18K-W" || product.sku == "U9RG14-18K-Y"){
        archTextTopDesktop = "501px"
        archTextLeftDesktop = "67px"
        archTextTopLandscape = "501px"
        archTextLeftLandscape = "67px"
        // svgViewBox = "0 0 1232 320"
        svgViewBox = "0 0 820 120"
        svgd = "M 8.00,4.00C 120.00,132.00 664.00,128.00 800.00,12.00"
        engravingFontSize = "53px"
        engravingFontSizeTablet = "53px"
        shapeWrapperPaddingTopDesktop = "13.5%"
        archTextWidthDesktop = "62%"
        x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?325 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:325
    }
    // if(product.sku == "U9RG15-18K-R" || product.sku == "U9RG15-18K-W" || product.sku == "U9RG15-18K-Y"){
    if(product.sku == "U9RG1-18K-R" || product.sku == "U9RG1-18K-W" || product.sku == "U9RG1-18K-Y"){
        archTextTopDesktop = "446px"
        archTextLeftDesktop = "78px"
        archTextTopLandscape = "354px"
        archTextLeftLandscape = "51px"
        svgViewBox = "0 0 1240 288"
        svgd = "M 56.00,40.00C 256.00,304.00 1016.00,280.00 1152.00,32.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
    }
    if(product.sku == "U9RG20-18K-R" || product.sku == "U9RG20-18K-W" || product.sku=="U9RG20-18K-Y"){
        archTextTopDesktop = "578px"
        archTextLeftDesktop = "78px"
        archTextTopLandscape = "436px"
        archTextLeftLandscape = "51px"
        svgViewBox = "0 0 1164 237"
        svgd = "M 42.00,48.00C 216.00,294.00 1017.00,240.00 1134.00,36.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U9RG5-18K-R" || product.sku == "U9RG5-18K-W" || product.sku=="U9RG5-18K-Y"){
        archTextTopDesktop = "514px"
        archTextLeftDesktop = "78px"
        archTextTopLandscape = "396px"
        archTextLeftLandscape = "51px"
        svgViewBox = "0 0 1119 159"
        svgd = "M 6.00,15.00C 198.00,171.00 903.00,171.00 1110.00,24.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U9RG8-18K-R" || product.sku == "U9RG8-18K-W" || product.sku=="U9RG8-18K-Y"){
        archTextTopDesktop = "518px"
        archTextLeftDesktop = "73px"
        archTextTopLandscape = "399px"
        archTextLeftLandscape = "48px"
        svgViewBox = "0 0 1080 147"
        svgd = "M 9.00,9.00C 168.00,165.00 858.00,165.00 1074.00,24.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U9RG11-18K-R" || product.sku == "U9RG11-18K-W" || product.sku=="U9RG11-18K-Y"){
        archTextTopDesktop = "534px"
        archTextLeftDesktop = "73px"
        archTextTopLandscape = "409px"
        archTextLeftLandscape = "47px"
        svgViewBox = "0 0 1112 192"
        svgd = "M 16.00,32.00C 232.00,176.00 880.00,184.00 1088.00,24.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U9RG23-18K-R" || product.sku == "U9RG23-18K-W" || product.sku=="U9RG23-18K-Y"){
        archTextTopDesktop = "437px"
        archTextLeftDesktop = "61px"
        archTextTopLandscape = "346px"
        archTextLeftLandscape = "39px"
        svgViewBox = "0 0 1028 182"
        svgd = "M 16.00,33.00C 236.00,176.00 835.50,159.50 1017.00,38.50"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "60px"
        engravingFontSizeTablet = "60px"
    }
    if(product.sku == "U9RG25-18K-R" || product.sku == "U9RG25-18K-Y" || product.sku == "U9RG25-18K-W"){
        archTextTopDesktop = "368px"
        archTextLeftDesktop = "83px"
        archTextTopLandscape = "367px"
        archTextLeftLandscape = "83px"
        svgViewBox = "0 0 465 67"
        svgd = "M 4.00,7.00C 88.00,71.50 361.00,79.00 460.00,14.50"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "35px"
        engravingFontSizeTablet = "35px"
        archTextWidthDesktop = "50%"
        x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?225 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:225
    }
    if(product.sku == "U9RG18-18K-R" || product.sku == "U9RG18-18K-Y" || product.sku == "U9RG18-18K-W"){
        archTextTopDesktop = "423px"
        archTextLeftDesktop = "83px"
        archTextTopLandscape = "423px"
        archTextLeftLandscape = "83px"
        svgViewBox = "0 0 1029 180"
        svgd = "M 9.00,15.00C 144.00,156.00 816.00,198.00 1020.00,15.00"
        shapeWrapperPaddingTopDesktop = "13.5%"
        engravingFontSize = "77px"
        engravingFontSizeTablet = "77px"
        archTextWidthDesktop = "50%"
        x = props?.personalisation?.bundle[props.bundleId]?.engravingText?.length>0?400 - (props.personalisation.bundle[props.bundleId].engravingText.length - 1)*7:400
    }
    return (
        <>
            <div className="engravingWindow">
                <div className="engravingFirst positionRelative">
                    <div style={{animationDelay:"0.3s"}} className="engravingImage positionRelative alignCenter fadeUpAnimation">
                        {!!engravingImage &&
                            <img className="width-100" src={engravingImage}/>
                        }
                        <div style={{animationDelay:"0.6s"}} className="arcText fadeUpAnimation">
                            <div className="shapeWrapper engravingText canelaThin">
                                <EngravingText x={x} text={props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:""} id={product.product} svgViewBox={svgViewBox} svgd={svgd}/>
                            </div>
                        </div>
                    </div>
                    <h1 style={{animationDelay:"0.8s"}} className="heading alignCenter canelaThin font24-notResponsive fadeUpAnimation">{t('yourChoiceOfEngraving')}</h1>
                    <div className="textInputWrapper alignCenter">
                        <div style={{animationDelay:"0.9s"}} className="textInput alignLeft positionRelative">
                            <input onChange={e=>props.setEngravingText(props.bundleId,e.target.value)} value={props?.personalisation?.bundle[props.bundleId]?.engravingText?props.personalisation.bundle[props.bundleId].engravingText:""} maxlength={engravingCharacterLimit} placeholder={t('engravingText')} className="font24" type="text"/>
                            <h4 className="textCount anoRegular grey">({remainingChars})</h4>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .heading{
                    margin-bottom:4rem;
                }
                .engravingWindow{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    padding-bottom:9rem;
                    height:100%;
                    overflow-y:scroll;
                    -ms-overflow-style: none;  
                    scrollbar-width: none; 
                }
                .engravingWindow::-webkit-scrollbar{
                    display: none;
                }
                .textInputWrapper input{
                    font-family: CanelaThin,sans-serif;
                }
                .engravingText{
                    font-size: ${engravingFontSize};
                }
                .arcText{
                    position: absolute;
                    top: ${archTextTopLandscape};
                    left: ${archTextLeftLandscape};
                    width: ${archTextWidthDesktop};
                }
                .shapeWrapper{
                    position:relative;
                    padding-top:${shapeWrapperPaddingTopDesktop};
                    width:100%;
                    transform: rotate(-1deg);
                } 
                .textCount{
                    position:absolute;
                    bottom:0.8rem;
                    right:0;
                }
                .textInput input{
                    padding:0 0 0.8rem 0;
                    border:none;
                    width:80%;
                }
                .textInput{
                    opacity:0;
                    animation:inputFieldWidthAnimation 0.5s ease-out forwards;
                    display:inline-block;
                    width:0rem;
                    border-bottom:1px solid #787878;
                }
                .questionMark{
                    margin-left:1.6rem;
                    display:inline-block;
                }
                .questionMark img{
                    margin-bottom: -5px;
                }
                .engravingImage{
                    padding-top:19rem;
                    width:333px;
                    margin:0 auto 3.2rem;
                }
                @keyframes inputFieldWidthAnimation{
                    to{
                        opacity:1;
                        width:42.2rem;
                    }
                }
                @media screen and (max-width: ${TABLET_LANDSCAPE_BREAKPOINT}px){
                    .engravingImage{
                        width:333px;
                    }
                    .arcText{
                        top: ${archTextTopLandscape};
                        left: ${archTextLeftLandscape};
                    }
                }
                @media screen and (max-width: ${TABLET_PORTRAIT_BREAKPOINT}px){
                    .engravingText{
                        font-size: ${engravingFontSizeTablet};
                    }
                    .shapeWrapper{
                        transform: rotate(-2deg);
                    } 
                }
            `}</style>
        </>
    )
}
function mapStateToProps({gifting,common,cache,personalisation}){
    return {gifting,common,cache,personalisation}
}
export default connect(mapStateToProps,{setEngravingText,setNoteText,setBoxChoice,setCardChoice})(engravingWindow)