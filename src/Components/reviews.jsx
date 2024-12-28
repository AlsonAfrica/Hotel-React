import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeReviewsPopup, fetchReviews } from "../Redux/ReviewsSlice";
import "../Styles/reviews.css";

const ReviewsPopup = () => {
  const dispatch = useDispatch();
  const {
    isOpen,
    list: reviews,
    status,
    error,
  } = useSelector((state) => state.reviews);

  // Fetch reviews when the popup is opened
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchReviews());
    }
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="popup-title">Reviews</h2>

        {status === "loading" && (
          <p className="loading-message">Loading reviews...</p>
        )}
        {status === "failed" && <p className="error-message">Error: {error}</p>}

        {status === "succeeded" && (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <h3 className="review-title">{review.title}</h3>
                  <span className="review-date">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="review-content">{review.content}</p>
              </div>
            ))}
          </div>
        )}
        <button
          className="close-button"
          onClick={() => dispatch(closeReviewsPopup())}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ReviewsPopup;
