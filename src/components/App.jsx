import React from "react";
import { ImageGallery } from './ImageGallery/ImageGallery'
import css from './App.module.css'
export function App () {

    return(
    <div className={css.app}>
        <ImageGallery />
    </div>
  );
};
