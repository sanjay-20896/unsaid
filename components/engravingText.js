export default function EngravingText(props){
    return (
        <>
            {/* <svg id="eY03VRSPxD21" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 666 243" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                <path id="selection" d="M12.807692,90.889615C24.229687,68.065277,78.920241,41.213523,115.269231,30.266538C130.604652,24.909424,173.887144,15.231340,200.653846,9.730000C230.913404,5.720159,281.867070,-2.968599,300.780589,0C329.749342,-3.129327,384.245676,2.644167,411.553846,3.910000C447.495462,5.769006,515.803155,17.812511,548.169231,29.412692C567.714308,35.778971,599.549386,47.069719,635.261538,70.397308C647.157624,86.157508,654.493454,86.018656,662.560000,108" transform="matrix(1 0 0 1 -4.68384600000033 22.80142899999999)" fill="none"/>
                <text x={props.x.toString()}>
                    <textPath xlinkHref="#selection">
                        {props.text}
                    </textPath>
                </text>
            </svg> */}
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox={props.svgViewBox} >
                <path id={`selection_${props.id}`} d={props.svgd} stroke="none" stroke-width="1" fill="none"/>
                <text x={props.x.toString()}>
                    <textPath xlinkHref={`#selection_${props.id}`}>
                        {props.text}
                    </textPath>
                </text>
            </svg>
            <style jsx>{`
                svg{
                    position:absolute;
                    top:0;
                    left:0;
                    width:100%;
                    // height:calc(100% + 3rem);
                } 
            `}</style>
        </>
    )
}