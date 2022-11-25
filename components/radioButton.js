import React, { useState, useEffect } from 'react'

export default function RadioButton(props) {
    const [radioFilled,setRadioFilled]=useState(false);

    useEffect(() => {
        if(props.id === props.radioIndex){
            setRadioFilled(true);
        }else{
            setRadioFilled(false)
        }
    }, [props.radioIndex])
    return (
        <>
            <div className={`radioButton ${radioFilled?"filled":""}`}></div>   
            <style jsx>{`
                .radioButton{
                    width:24px;
                    height:24px;
                    border-radius:50%;
                    border:1px solid #787878;
                    display: inline-block;
                    cursor:pointer;
                }
                .radioButton.filled{
                    border:7.5px solid #000000;
                }
            `}</style>
        </>
    )
}
