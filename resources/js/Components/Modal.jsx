import React from "react";


export default function Modal({ isOpen, toggle = () => {}, children, title = ''}) {
    return (
        <div 
            className={`modal`} 
            style={
                isOpen
                    ? {
                        opacity: 1,
                        pointerEvents: 'auto',
                        visibility: 'visible',
                    }
                    : {}
        }>
            <div className={`modal-box`} style={{minHeight: '40em'}}>
                <h1 className="font-bold text-2xl pb-8">
                    {title}
                </h1>
                    {children}
            </div>
        </div>
    )
}