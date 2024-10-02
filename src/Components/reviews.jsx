import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeReviewsPopup } from "../Redux/ReviewsSlice";
import "../Styles/reviews.css"

const ReviewsPopup = ()=>{
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.reviews.isOpen)

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
        <div className="popup">
        <h2>Messages</h2>
        <p>This is your Reviews information</p>
        <button className="close-button" onClick={() => dispatch(closeReviewsPopup('gallery'))}>&times;</button>
        </div>
      </div>
    );
}
export default ReviewsPopup