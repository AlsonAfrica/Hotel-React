import { createSlice } from '@reduxjs/toolkit';
import { db } from '../FirebaseConfig/firebase'; // Adjust the path if necessary
import { setDoc, doc } from 'firebase/firestore';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentHistory: [],
  },
  reducers: {
    setPaymentHistory: (state, action) => {
      state.paymentHistory = action.payload;
    },
    addPayment: (state, action) => {
      state.paymentHistory.push(action.payload);
    },
  },
});

// Action creators
export const { setPaymentHistory, addPayment } = paymentSlice.actions;

// Async thunk to save payment details to Firestore
export const savePayment = (paymentDetails) => async (dispatch) => {
  try {
    // Generate a unique document ID for each payment
    const paymentId = `payment_${new Date().getTime()}`; // Example: using a timestamp as a unique ID
    const paymentRef = doc(db, 'payments', paymentId);

    // Store payment details in Firestore using setDoc
    await setDoc(paymentRef, paymentDetails);

    // Dispatch action to add payment to Redux state
    dispatch(addPayment({ id: paymentId, ...paymentDetails }));
  } catch (error) {
    console.error('Error saving payment:', error);
  }
};

export default paymentSlice.reducer;
