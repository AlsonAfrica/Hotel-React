import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeFacilitiesPopup } from "../Redux/facilitiesSlice";
import { fetchFacilityImages } from "../Redux/facilitiesImageSlice";
import "../Styles/facilities.css";

const FacilitiesPopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.facilities.isOpen);
    const facilityImagesState = useSelector((state) => state.facilityImages);

    console.log("Facility Images State:", facilityImagesState);

    const images = facilityImagesState?.images || [];
    const status = facilityImagesState?.status || 'idle';
    const error = facilityImagesState?.error || null;
      
    useEffect(() => {
        if (isOpen && status === 'idle') {
            console.log("Dispatching fetchFacilityImages");
            dispatch(fetchFacilityImages())
                .unwrap()
                .then((result) => console.log("Fetch result:", result))
                .catch((error) => console.error("Fetch error:", error));
        }
    }, [isOpen, status, dispatch]);

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Facilities</h2>
                <p>This is your Facilities information</p>
                
                <div className="image-grid">
                    {status === 'loading' && <p>Loading images...</p>}
                    {status === 'failed' && <p>Error: {error}</p>}
                    {status === 'succeeded' && images.length > 0 ? (
                        images.map((image, index) => (
                            <div key={index} className="image-item">
                                <img src={image.url} alt={`Facility ${image.name}`} />
                            </div>
                        ))
                    ) : (
                        <p>No images available. Status: {status}</p>
                    )}
                </div>

                <button className="close-button" onClick={() => dispatch(closeFacilitiesPopup('facilities'))}>&times;</button>
            </div>
        </div>
    );
};

export default FacilitiesPopup;