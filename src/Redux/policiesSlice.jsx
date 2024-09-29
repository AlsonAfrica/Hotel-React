import { createSlice } from '@reduxjs/toolkit';

const policiesSlice = createSlice({
  name: 'policies',
  initialState: {
    isOpen: false,
    list: []
  },
  reducers: {
    openPoliciesPopup: (state) => {
      state.isOpen = true;
    },
    closePoliciesPopup: (state) => {
      state.isOpen = false;
    },
    setPolicies: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { openPoliciesPopup, closePoliciesPopup, setPolicies } = policiesSlice.actions;
export default policiesSlice.reducer;