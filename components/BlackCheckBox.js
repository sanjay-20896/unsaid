import React from 'react'

export default function BlackCheckBox({isChecked}) {
    return (
        <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 1H1V23H23V1Z" fill={`${isChecked?"black":"white"}`}/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.99992 14.7929L16.6464 8.14648L17.3535 8.85359L9.99992 16.2072L6.64636 12.8536L7.35347 12.1465L9.99992 14.7929Z" fill="white"/>
            </svg>
            <style jsx>{`
                svg{
                    border: 1px solid black;
                }
            `}</style>
        </>   
    )
}
