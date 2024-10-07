import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig/firebase";

// Async thunk to fetch rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async (_, { rejectWithValue }) => {
  try {
    const roomsCollectionRef = collection(db, "rooms");
    const roomsSnapshot = await getDocs(roomsCollectionRef);
    const roomsList = roomsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return roomsList;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default roomsSlice.reducer;
