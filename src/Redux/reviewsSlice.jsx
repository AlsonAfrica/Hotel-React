import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    isOpen: false,
    list: []
  },
  reducers: {
    openReviewsPopup: (state) => {
      state.isOpen = true;
    },
    closeReviewsPopup: (state) => {
      state.isOpen = false;
    },
    setReviews: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { openReviewsPopup, closeReviewsPopup, setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;