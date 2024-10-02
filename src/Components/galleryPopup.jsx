import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeGalleryPopup } from "../Redux/gallerySlice";
import "../Styles/gallery.css"

const GalleryPopup = ()=>{
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.gallery.isOpen)

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
        <div className="popup">
        <h2>Messages</h2>
        <p>This is your Gallery information</p>
        <button className="close-button" onClick={() => dispatch(closeGalleryPopup('gallery'))}>&times;</button>
        </div>
      </div>
    );
}
export default GalleryPopup