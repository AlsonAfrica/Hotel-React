// src/redux/popupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedRoom: null,
};

const roompopupSlice = createSlice({
  name: 'roommodal',
  initialState,
  reducers: {
    openroomPopup: (state, action) => {
      state.isOpen = true;
      state.selectedRoom = action.payload;
    },
    closeroomPopup: (state) => {
      state.isOpen = false;
      state.selectedRoom = null;
    },
  },
});

export const { openroomPopup, closeroomPopup } = roompopupSlice.actions;

export default roompopupSlice.reducer;
