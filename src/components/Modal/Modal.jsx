import { createPortal } from "react-dom";
import { useEffect } from "react";
import React from "react";
import css from './Modal.module.css'
import PropTypes from 'prop-types';
const modalRoot=document.querySelector('#modal-root')

export function Modal({largeImage, onClose}) {
    
    useEffect(() => {
        console.log('open')
        const handleKeydown = (e) => {
            if (e.code === "Escape") {
                onClose()
            }
    }
        window.addEventListener('keydown', handleKeydown)

        return () => {
            console.log('close')
            window.removeEventListener('keydown', handleKeydown)
        }
    }, [onClose])

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {onClose()}
    }
    
    return (createPortal
                (<div className={css.overlay} onClick={handleBackdropClick}>
                    <div className={css.modal}>
                        <img src={largeImage} alt="BigImage" />
                    </div>
                </div>,
                modalRoot
                )
               )
}
  
Modal.propTypes = {
    largeImage:PropTypes.string.isRequired
}