import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../FirebaseConfig/firebase'; // Adjust the path if necessary
import { collection, getDocs } from 'firebase/firestore';

// Async thunk for posting a review
export const postReview = createAsyncThunk(
  'reviews/postReview',
  async (reviewData, { rejectWithValue }) => {
    try {
      const reviewRef = doc(db, 'reviews', reviewData.id); // Create a reference for the review in Firestore
      await setDoc(reviewRef, reviewData); // Save the review data to Firestore
      return reviewData; // Return the review data to update the state
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors that occur
    }
  }
);

// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews')); // Get all documents from the reviews collection
      const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Format the reviews
      return reviews; // Return the reviews to update the state
    } catch (error) {
      return rejectWithValue(error.message); // Handle any errors that occur
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    isOpen: false,
    list: [],
    status: 'idle', // Track the status of the request
    error: null, // Store any error that occurs
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReview.pending, (state) => {
        state.status = 'loading'; // Set status to loading when the request starts
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when the review is posted
        state.list.push(action.payload); // Add the new review to the list
      })
      .addCase(postReview.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if there's an error
        state.error = action.payload; // Store the error message
      })
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'loading'; // Set status to loading when fetching reviews
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Set status to succeeded when reviews are fetched
        state.list = action.payload; // Set the fetched reviews to the state
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed'; // Set status to failed if there's an error
        state.error = action.payload; // Store the error message
      });
  },
});

export const { openReviewsPopup, closeReviewsPopup, setReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
