import React, { Component } from "react"
import css from './Searchbar.module.css'
import { BsSearchHeartFill } from "react-icons/bs";
import PropTypes from 'prop-types';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  


export class Searchbar extends Component {
    state = {
    query:''
    }

    notify=()=> {
    toast.dark("Enter text to search, please!", {
        style:{backgroundColor:'#1b3ff2', fontSize:20}
    });
    }
    
    handleChange = (event) => {
        this.setState({query:event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.query.trim() === '') {
            this.notify()
            return
        }
        this.props.onSubmit(this.state.query)
        this.setState({query:''})
    }

    render() {
        return <header className={css.searchbar}>
                <form className={css.searchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.searchFormButton}>
                    <BsSearchHeartFill  className={css.searchIcon}/>
                    </button>

                    <input
                    className={css.searchFormInput}
                    type="text"
                    value={this.state.query}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleChange}
                    />
            </form>
            <ToastContainer position="bottom-right" closeOnClick />
            </header>
}
}


Searchbar.propTypes = {
    onSubmit:PropTypes.func.isRequired
}



