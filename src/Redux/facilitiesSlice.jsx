import { createSlice } from '@reduxjs/toolkit';

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState: {
    isOpen: false,
    list: []
  },
  reducers: {
    openFacilitiesPopup: (state) => {
      state.isOpen = true;
    },
    closeFacilitiesPopup: (state) => {
      state.isOpen = false;
    },
    setFacilities: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { openFacilitiesPopup, closeFacilitiesPopup, setFacilities } = facilitiesSlice.actions;
export default facilitiesSlice.reducer;