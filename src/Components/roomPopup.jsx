import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeroomPopup } from '../Redux/roompopupSlice';
import { Close, Wifi, LocalParking, AcUnit, Pool, Restaurant, Tv, Spa } from '@mui/icons-material';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { savePayment } from '../Redux/paymentSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const RoomModal = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const navigate = useNavigate();
  const location = useLocation();
  const elements = useElements();
  const [loading, setLoading] = useState(false); // Initialize loading state
  const { isOpen, selectedRoom } = useSelector((state) => state.roommodal);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState(''); // Fixed typo here
  const [numPeople, setNumPeople] = useState(1);
  const [error, setError] = useState('');
  if (!selectedRoom) return null;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkInDate || !checkOutDate || !numPeople) {
      setError('Please fill in all fields before proceeding.');
      return;
    }
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const cardElement = elements.getElement(CardElement);
    const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (paymentError) {
      console.error('[Payment Error]', paymentError);
      setError(paymentError.message);
      setLoading(false);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      try {
        await dispatch(savePayment({
          amountPaid: selectedRoom.price * numPeople,
          checkInDate,
          checkOutDate,
          numPeople,
          roomType: selectedRoom.roomType,
          paymentMethodId: paymentMethod.id,
        }));
        setLoading(false);
        alert('Payment Successful!');
        dispatch(closeroomPopup());
      } catch (error) {
        setError('Payment failed: ' + error);
        setLoading(false);
      }
    }   
  };
  const handleButtonClick = () =>{
    if (location.pathname === '/home'){
      handleSubmit()
    } else if (location.pathname === "/"){
      navigate("/authetication");
    }
  }
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    maxHeight: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #2196F3',
    boxShadow: 24,
    p: 4,
    borderRadius: '12px',
    overflowY: 'auto',
  };
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
    borderBottom: '2px solid #2196F3',
    paddingBottom: '10px',
  };
  const amenityStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: '8px',
    padding: '5px 10px',
    marginRight: '10px',
  };
  const amenitiesIcons = {
    wifi: <Wifi />,
    parking: <LocalParking />,
    ac: <AcUnit />,
    pool: <Pool />,
    tv: <Tv/>,
    restaurant: <Restaurant />,
    spa: <Spa/>
  };
  return (
    <Modal
      open={isOpen}
      onClose={() => dispatch(closeroomPopup())}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={headerStyle}>
          <Typography id="modal-title" variant="h3" component="h2" color="#2196F3">
            {selectedRoom.roomType}
          </Typography>
          <IconButton onClick={() => dispatch(closeroomPopup())}>
            <Close />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography id="modal-description" sx={{ mt: 2, fontWeight: 'bold', color: '#555' }}>
              Price: <span style={{ color: '#2196F3' }}>${selectedRoom.price}</span> / night
            </Typography>
            <Typography>
              Occupies {selectedRoom.occupants} people
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {selectedRoom.amenities.map((amenity) => (
                <Box key={amenity} sx={amenityStyle}>
                  {amenitiesIcons[amenity] || <Typography>{amenity}</Typography>}
                  <Typography sx={{ ml: 0.5 }}>{amenity.charAt(0).toUpperCase() + amenity.slice(1)}</Typography>
                </Box>
              ))}
            </Box>
            <Typography sx={{ mt: 2, fontWeight: 'bold', color: '#555' }}>
              Rating: <span style={{ color: '#2196F3' }}>{selectedRoom.rating}</span>
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" color="#2196F3">Room Policies</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Check-in: 2 PM, Check-out: 11 AM
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, color: '#2196F3' }}>Payment Policies</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Payment is required at the time of booking.
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, color: '#2196F3' }}>Refunds</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
              1. <b>Non-Refundable Room Rates:</b>
                  Certain discounted or promotional room rates may be marked as non-refundable. For these bookings:
                  Cancellation at any time: No refund will be issued. <br/>

              2. <b>Refund Processing: </b>
                 Refunds will be processed back to the original method of payment within 5-7 business days after the cancellation is confirmed. <br/>
              
              3.  <b>Force Majeure: </b>
                  In the event of unforeseen circumstances beyond our control (natural disasters, pandemics, government restrictions, etc.), guests may be eligible for a full refund or credit toward a future booking, depending on the nature of the event. <br/>

              4.  <b>Refunds for Long-Term Stays: </b>
                    <ul>
                      <li>For long-term bookings (e.g., stays of 14 days or more):</li>
                      <li>Cancellation 14 days or more prior to check-in: Full refund.</li>
                      <li>Cancellation 7-13 days prior to check-in: 50% refund.</li>
                      <li>Cancellation within 6 days of check-in or during the stay: No refund. </li>
                    </ul>     
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={selectedRoom.image}
              alt={selectedRoom.roomType}
              style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '2px solid #2196F3' }}
            />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Check-in Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label="Check-out Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setCheckOutDate(e.target.value)} // Fixed typo here
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="individuals-label">Number of Individuals</InputLabel>
                  <Select
                    required
                    labelId="individuals-label"
                    defaultValue={1}
                    label="Number of Individuals"
                    onChange={(e) => setNumPeople(e.target.value)}
                  >
                    {[...Array(selectedRoom.occupants)].map((_, index) => (
                      <MenuItem key={index + 1} value={index + 1}>
                        {index + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {error && <Typography color="error">{error}</Typography>} {/* Display error message */}
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Typography variant="h6" color="#2196F3">Room Payment</Typography>
              <CardElement options={{ hidePostalCode: true }} />
              <Button
                onClick={handleButtonClick}
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={!stripe || loading}
              >
                {location.pathname === '/home' ? (loading ? 'Processing...':'Pay'): "Pay"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
export default RoomModal;
