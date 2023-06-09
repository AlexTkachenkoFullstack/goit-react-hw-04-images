import css from './Button.module.css'
import PropTypes from 'prop-types';
export const Button = ({ onClick, inactiveButton}) => {
    return(<div className={css.buttonContainer}>
                <button className={css.button} disabled={inactiveButton} type='button' onClick={onClick}>Load more</button>
            </div>)
}

Button.propTypes = {
    onClick:PropTypes.func,
    inactiveButton:PropTypes.bool
}