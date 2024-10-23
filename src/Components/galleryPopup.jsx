import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeGalleryPopup } from "../Redux/gallerySlice";
import { fetchGalleryImages } from "../Redux/galleryImageSlice";
import "../Styles/gallery.css"

const GalleryPopup = ()=>{
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.gallery.isOpen)
    // state of the galaryImages
    const galleryImagesState = useSelector((state) => state.galleryImages);
    console.log("gallery Images State:", galleryImagesState);
    
    // Defined in redux the initial state of images,status.errors
    const images = galleryImagesState?.images || [];
    const status = galleryImagesState?.status || 'idle';
    const error = galleryImagesState?.error || null;

    // Display the images once the modal is open
    useEffect(() => {
      if (isOpen && status === 'idle') {
          console.log("Dispatching fetchGalleryImages");
          dispatch(fetchGalleryImages())
              .unwrap()
              .then((result) => console.log("Fetch result:", result))
              .catch((error) => console.error("Fetch error:", error));
      }
  }, [isOpen, status, dispatch])

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
        <div className="popup">
        <h2>Gallery</h2>
        <p>This is your Gallery information</p>
        
        {/* Display images in a grid format  */}
        <div className="image-grid">
                    {status === 'loading' && <p>Loading images...</p>}
                    {status === 'failed' && <p>Error: {error}</p>}
                    {status === 'succeeded' && images.length > 0 ? (
                        images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.url} alt={`Gallery ${image.name}`} />
                            </div>
                        ))
                    ) : (
                        <p>No images available. Status: {status}</p>
                    )}
                </div>
        
        <button className="close-button" onClick={() => dispatch(closeGalleryPopup('gallery'))}>&times;</button>
        </div>
      </div>
    );
}
export default GalleryPopup