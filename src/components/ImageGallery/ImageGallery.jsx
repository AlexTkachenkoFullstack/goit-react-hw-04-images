import React, { Component } from "react"
import {BsFillEmojiFrownFill, BsEmojiWink } from "react-icons/bs";
import api from "services/images-api"
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import css from './ImageGallery.module.css'


const PER_PAGE = 12;

export class ImageGallery extends Component{
    state = {
        query:'',
        images: [],
        page: 1,
        isLoader: false,
        showButton: false,
        inactiveButton: false,
        showModal: false,
        largeImage: '',
        isEmpty: false,
        error:null,
    }

    componentDidUpdate(prevProps, prevState) {
        const { page, query} = this.state
        if (query !== prevState.query || prevState.page !== page) {
            this.setState({ isLoader: true, inactiveButton: true, showButton: page!==1 })
            this.getImages(query, page)
          }
    }

    handleSubmit = (query) => {
        if (query === this.state.query) {
            return
        }
    this.setState({ query, page:1, images:[], isEmpty:false, error: null})
    }

    handleImageClick = () => {
        this.setState((prevState)=>({page: prevState.page+1}))
    }
    
    handleModalClick = (largeImage) => {
        this.setState({ largeImage, showModal:true })
        
    }
    
    getImages = (query, page) => {
         api.fetchImages(query, page)
         .then(response => { return response.json()})
         .then(({hits, totalHits}) =>
            {if (hits.length === 0)
                {this.setState({ isEmpty: true });
                return;
                }
                this.setState((prevState) =>
                ({
                    images: [...prevState.images, ...hits],
                    showButton: page < Math.ceil(totalHits / PER_PAGE)
                }))
            })
        .catch((error) => { this.setState({ error })})
        .finally(()=>{this.setState({isLoader: false, inactiveButton: false})})
    }

    onClose = () => {
        this.setState({ showModal:false })
    }

    render() {
        const { images, isLoader, showButton, showModal, largeImage, inactiveButton, isEmpty, error } = this.state
        return (
            <>
                <Searchbar onSubmit={this.handleSubmit} />
                <ul className={css.imageGallery} onClick={this.toggleModal}>
                {images.map(item =>
                    <ImageGalleryItem key={item.id}
                        image={item.webformatURL}
                        alt={item.tags}
                        largeImage={item.largeImageURL}
                        handleClick={this.handleModalClick} />)}
                </ul>
                {error && <p className={css.infoText}>Oops...<BsFillEmojiFrownFill/> There's been a problem with the server. Please try again later. Have a nice day <BsEmojiWink/></p>}
                {isEmpty && (<p className={css.infoText}>Sorry. No results were found for your request. Try again.</p>)}
                {isLoader && <Loader />}
                {showButton && <Button inactiveButton={inactiveButton} onClick={this.handleImageClick} />}
                {showModal && <Modal largeImage={largeImage} onClose={this.onClose}/>}
            </>
            
    )
    }
    
}


