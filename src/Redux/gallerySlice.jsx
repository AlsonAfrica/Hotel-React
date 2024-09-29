import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    isOpen: false,
    list: []
  },
  reducers: {
    openGalleryPopup: (state) => {
      state.isOpen = true;
    },
    closeGalleryPopup: (state) => {
      state.isOpen = false;
    },
    setGallery: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { openGalleryPopup, closeGalleryPopup, setGallery } = gallerySlice.actions;
export default gallerySlice.reducer;