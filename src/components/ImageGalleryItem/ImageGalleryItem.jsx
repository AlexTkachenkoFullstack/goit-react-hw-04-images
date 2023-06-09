import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ image, alt, largeImage, handleClick }) => {
  
    return (
        <li className={css.imageGalleryItem} onClick={()=>handleClick(largeImage)}>
            <img loading="lazy" className={ css.imageGalleryItemImage} src={image} alt={alt} width='360px'/>
        </li>
    )
}

ImageGalleryItem.propTypes = {
    image:PropTypes.string.isRequired,
    alt:PropTypes.string.isRequired,
    largeImage:PropTypes.string.isRequired,
    handleClick:PropTypes.func.isRequired
}

