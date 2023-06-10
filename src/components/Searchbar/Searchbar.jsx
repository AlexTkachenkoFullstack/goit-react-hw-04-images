import React from "react"
import { useState } from "react";
import css from './Searchbar.module.css'
import { BsSearchHeartFill } from "react-icons/bs";
import PropTypes from 'prop-types';
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
export function Searchbar({ onSubmit }) {
    const [query, setQuery] = useState('')
    
    const notify=()=> {
        toast.dark("Enter text to search, please!", {
            style:{backgroundColor:'#1b3ff2', fontSize:20}
        });
    }
    
    const handleChange=(event)=>{
        setQuery(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (query.trim() === '') {
          notify()
            return
        }
        onSubmit(query)
        setQuery('')
        return 
    }

    return <header className={css.searchbar}>
                 <form className={css.searchForm} onSubmit={handleSubmit}>
                     <button type="submit" className={css.searchFormButton}>
                     <BsSearchHeartFill  className={css.searchIcon}/>
                     </button>

                     <input
                        className={css.searchFormInput}
                        type="text"
                        value={query}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handleChange}
                     />
                 </form>
                 <ToastContainer position="bottom-right" closeOnClick />
            </header>
} 


Searchbar.propTypes = {
    onSubmit:PropTypes.func.isRequired
}



