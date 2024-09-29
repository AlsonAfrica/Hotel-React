import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isOpen: false,
    list: []
  },
  reducers: {
    openProfilePopup: (state) => {
      state.isOpen = true;
    },
    closeProfilePopup: (state) => {
      state.isOpen = false;
    },
    setProfile: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { openProfilePopup, closeProfilePopup, setProfile } = profileSlice.actions;
export default profileSlice.reducer;