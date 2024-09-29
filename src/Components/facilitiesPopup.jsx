import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeFacilitiesPopup } from "../Redux/facilitiesSlice";
import "../Styles/facilities.css"

const FacilitiesPopup = ()=>{
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.facilities.isOpen)

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
        <div className="popup">
        <h2>Messages</h2>
        <p>This is your Facilities information</p>
        <button onClick={() => dispatch(closeFacilitiesPopup('facilities'))}>Close</button>
        </div>
      </div>
    );
}
export default FacilitiesPopup