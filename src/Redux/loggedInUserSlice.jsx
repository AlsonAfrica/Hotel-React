// src/Redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../FirebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (userId) => {
    const userDoc = doc(db, "users", userId); // Accessing the Firestore document
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() }; // Return user data
    } else {
      throw new Error("User not found");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserData(state) {
      state.userData = null; // Clear user data
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true; // Set loading state
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false; // Loading complete
        state.userData = action.payload; // Set user data
        state.error = null; // Clear any error
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false; // Loading complete
        state.error = action.error.message; // Set error message
      });
  },
});

// Export actions and reducer
export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
