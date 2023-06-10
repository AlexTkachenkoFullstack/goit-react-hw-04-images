import React from "react"
import { useState, useEffect } from "react";
import {BsFillEmojiFrownFill, BsEmojiWink } from "react-icons/bs";
import api from "services/images-api"
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import css from './ImageGallery.module.css'


const PER_PAGE = 12;

export function ImageGallery() {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState([])
    const [page, setPage] = useState(1)
    const [isLoader, setIsLoader] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [inactiveButton, setInactiveButton] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [largeImage, setLargeImage] = useState('')
    const [isEmpty, setIsEmpty] = useState(false)
    const [error, setError] = useState(null)
    

    useEffect(() => {
        if (!query || page===0) {
            return
        }

        const getImages = () => {
        api.fetchImages(query, page)
            .then(response => { return response.json() })
            .then(({ hits, totalHits }) => {
                if (hits.length === 0) {
                     setIsEmpty(true)
                return; 
                }
                  setImages(prevImages =>  [...prevImages, ...hits] );
                setShowButton(page < Math.ceil(totalHits / PER_PAGE))
            }  
            )
        .catch((error) => setError(error))
        .finally(() => { setIsLoader(false); setInactiveButton(false) })
    }
        setIsLoader(true);
        setInactiveButton(true)
        setShowButton(page !== 1)
        getImages()
    }, [setImages, page, query])

    const handleSubmit = (queryNew) => {
        if (query === queryNew) {
            return
        }
        setPage(1)
        setImages([])
        setIsEmpty(false)
        setError(null)
        setQuery(queryNew)
    }

    const handleMoreClick = () => {
        setPage(prevPage=>prevPage+1)
    }  

    const handleModalClick = (largeImage) => {
        setShowModal(true);
        setLargeImage(largeImage)
    }
    
    

    const onClose = () => {
        setShowModal(false)
    }
   
    return (
            <>
                <Searchbar onSubmit={handleSubmit} />
                <ul className={css.imageGallery}>
                {images.map(item =>
                    <ImageGalleryItem key={item.id}
                        image={item.webformatURL}
                        alt={item.tags}
                        largeImage={item.largeImageURL}
                        handleClick={handleModalClick} />)}
                </ul>
                {error && <p className={css.infoText}>Oops...<BsFillEmojiFrownFill/> There's been a problem with the server. Please try again later. Have a nice day <BsEmojiWink/></p>}
                {isEmpty && (<p className={css.infoText}>Sorry. No results were found for your request. Try again.</p>)}
                {isLoader && <Loader />}
                {showButton && <Button inactiveButton={inactiveButton} onClick={handleMoreClick} />}
                {showModal && <Modal largeImage={largeImage} onClose={onClose}/>}
            </>
            
    )
}



