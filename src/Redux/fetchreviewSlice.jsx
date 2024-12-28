import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Async thunk to fetch reviews from Firebase
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (_, thunkAPI) => {
    try {
      const db = getFirestore();
      const reviewsCollection = collection(db, 'reviews');
      const snapshot = await getDocs(reviewsCollection);
      const reviews = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return reviews;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
