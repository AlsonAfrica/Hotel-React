import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setDoc, doc, getDocs, collection, query, where } from 'firebase/firestore';
import { db } from '../FirebaseConfig/firebase';
import { auth } from '../FirebaseConfig/firebase'; // Firebase authentication instance

// Async thunk to save payment details to Firestore
export const savePayment = createAsyncThunk(
  'payment/savePayment',
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const user = auth.currentUser; // Get the logged-in user
      if (!user) throw new Error('User is not logged in');

      const paymentId = `payment_${new Date().getTime()}`; // Unique ID for the payment
      const paymentRef = doc(db, 'payments', paymentId);

      // Store payment details in Firestore with user ID
      await setDoc(paymentRef, {
        userId: user.uid,
        userEmail: user.email,
        ...paymentDetails,
        paymentDate: new Date().toISOString(),
      });

      return { id: paymentId, userId: user.uid, userEmail:user.email,...paymentDetails, paymentDate: new Date().toISOString() };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch payment details for the logged-in user
export const fetchUserPayments = createAsyncThunk(
  'payment/fetchUserPayments',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser; // Get the logged-in user
      if (!user) throw new Error('User is not logged in');

      const paymentsRef = collection(db, 'payments');
      const q = query(paymentsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const payments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      return payments;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Redux slice for payment management
const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPaymentHistory: (state) => {
      state.paymentHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Saving payment to Firestore
      .addCase(savePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentHistory.push(action.payload); // Add the new payment to the history
      })
      .addCase(savePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetching payment history for logged-in user
      .addCase(fetchUserPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentHistory = action.payload; // Set the payment history from Firestore
      })
      .addCase(fetchUserPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Action creators
export const { clearPaymentHistory } = paymentSlice.actions;

export default paymentSlice.reducer;
