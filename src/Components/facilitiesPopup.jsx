import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeFacilitiesPopup } from "../Redux/facilitiesSlice";
import "../Styles/facilities.css";

const FacilitiesPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.facilities.isOpen);

    // Sample images array (replace with your actual images)
    const images = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ];

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Facilities</h2>
                <p>This is your Facilities information</p>
                
                <div className="image-grid">
                    {images.map((src, index) => (
                        <div key={index} className="image-item">
                            <img src={src} alt={`Facility ${index + 1}`} />
                        </div>
                    ))}
                </div>

                <button className="close-button" onClick={() => dispatch(closeFacilitiesPopup('facilities'))}>&times;</button>
            </div>
        </div>
    );
};

export default FacilitiesPopup;
