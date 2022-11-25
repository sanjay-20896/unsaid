import React from 'react'

export default function loader(props) {
    return (
        <>
        {props.type==="dots"?
            <div className="dots positionRelative"></div>
        :
            <div className="spinner"></div>
        }
         <style jsx>{`
            .spinner{
                height:${props.size}px;
                width:${props.size}px;
                border:1px solid ${props.color};
                border-left-color: transparent;
                border-radius:50%;
                background:transparent;
                animation: spinner 1s linear infinite;
            }
            .dots{
                height:${props.size}px;
                width:${props.size}px;
                border-radius:50%;
                // background:#00000066;
                animation: dotFlashing 0.6s infinite linear alternate;
                animation-delay: 0.2s;
            }
            .dots::after,.dots::before{
                content:"";
                position:absolute;
                top:0;
                height:${props.size}px;
                width:${props.size}px;
                border-radius:50%;
                background:${props.color=="white"?"#ffffff":"#0000001a"};
                animation: dotFlashing 0.6s infinite linear alternate;
                animation-delay: 0s;
            }
            .dots::after{
                left:-2.4rem;
                animation: dotFlashing 0.6s infinite linear alternate;
                animation-delay: 0s;
            }
            .dots::before{
                right:-2.4rem;
                animation: dotFlashing 0.6s infinite linear alternate;
                animation-delay: 0.4s;
            }
            @keyframes spinner {
                from {
                    transform: rotate(0deg);
                } to {
                    transform: rotate(360deg);
                }
            }
            @keyframes dotFlashing {
                0% {
                    background:${props.color=="white"?"#ffffff6b":"#0000001a"};
                }
                50%{
                    background:${props.color=="white"?"#ffffffd6":"#00000066"}; 
                }
                100% {
                    background:${props.color=="white"?"#ffffff":"#000000"};
                }
            }
         `}</style>
        </>
    )
}
