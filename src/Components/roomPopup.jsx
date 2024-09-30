// src/components/RoomModal.js
import React from 'react';
import { Modal, Box, Typography, IconButton, Grid, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeroomPopup } from '../Redux/roompopupSlice';
import { Close, Wifi, LocalParking, AcUnit, Pool, Restaurant } from '@mui/icons-material'; // Import icons

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  maxHeight: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #2196F3', // Change border color
  boxShadow: 24,
  p: 4,
  borderRadius: '12px', // Add rounded corners
  overflowY: 'auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
  borderBottom: '2px solid #2196F3', // Add border below header
  paddingBottom: '10px',
};

const amenityStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f0f0f0', // Light background for amenities
  borderRadius: '8px',
  padding: '5px 10px',
  marginRight: '10px',
};

const RoomModal = () => {
  const dispatch = useDispatch();
  const { isOpen, selectedRoom } = useSelector((state) => state.roommodal);

  if (!selectedRoom) return null;

  // Create a mapping of amenities to icons
  const amenitiesIcons = {
    wifi: <Wifi />,
    parking: <LocalParking />,
    ac: <AcUnit />,
    pool: <Pool />,
    restaurant: <Restaurant />,
    // Add more amenities and their corresponding icons as needed
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
          <Typography id="modal-title" variant="h3" component="h2" color="#2196F3"> {/* Header color */}
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

            {/* Amenities with icons */}
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

            {/* Policies Section */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" color="#2196F3">Room Policies</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Check-in: 2 PM, Check-out: 11 AM
              </Typography>

              <Typography variant="h6" sx={{ mt: 2, color: '#2196F3' }}>Payment Policies</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Payment is required at the time of booking.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Image of the room */}
            <img 
              src={selectedRoom.image} 
              alt={selectedRoom.roomType} 
              style={{ width: '100%', height: 'auto', borderRadius: '8px', border: '2px solid #2196F3' }} // Add border to image
            />

            {/* Check-in and Check-out Dates */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="Check-in Date" 
                  type="date" 
                  fullWidth 
                  InputLabelProps={{ shrink: true }} 
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  label="Check-out Date" 
                  type="date" 
                  fullWidth 
                  InputLabelProps={{ shrink: true }} 
                />
              </Grid>
            </Grid>

            {/* Number of Individuals Dropdown */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="individuals-label">Number of Individuals</InputLabel>
                  <Select
                    labelId="individuals-label"
                    defaultValue={1}
                    label="Number of Individuals"
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

            {/* Room Payment Form */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" color="#2196F3">Room Payment</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField 
                    label="Card Number" 
                    type="text" 
                    fullWidth 
                    placeholder="1234 5678 9012 3456"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    label="Expiry Date" 
                    type="month" 
                    fullWidth 
                    InputLabelProps={{ shrink: true }} 
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    label="CVV" 
                    type="text" 
                    fullWidth 
                    placeholder="123" 
                  />
                </Grid>
              </Grid>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }} 
                onClick={() => alert('Payment Processing...')}
              >
                Pay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default RoomModal;
