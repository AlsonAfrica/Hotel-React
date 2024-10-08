import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box, Rating } from '@mui/material';
import { Favorite, Share, People, Visibility } from '@mui/icons-material';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { openroomPopup } from '../Redux/roompopupSlice';
import { useDispatch } from 'react-redux';
const Rooms = ({ roomType, image, price, occupants, rating, amenities }) => {
    const dispatch = useDispatch();

    const handleViewRoom = () => {
      const roomDetails = {
        roomType,
        image,
        price,
        occupants,
        rating,
        amenities,
      };
      dispatch(openroomPopup (roomDetails));
    };
  
  
    return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 3,
        m: 2,
        p: 1,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 10,
        },
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Room Image */}
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={roomType}
        sx={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <CardContent>
        {/* Room Type */}
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: '#3f51b5', fontWeight: 'bold' }}
        >
          {roomType}
        </Typography>

        {/* Price */}
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          <span style={{ color: '#ff4081', fontWeight: 'bold' }}>${price}</span> / night
        </Typography>

        {/* Number of People */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <People sx={{ mr: 1, color: '#4caf50' }} />
          <Typography variant="body2" color="text.secondary">
            Occupies {occupants} people
          </Typography>
        </Box>

        {/* Amenities */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
          {amenities.includes('wifi') && (
            <Box display="flex" alignItems="center">
              <WifiIcon sx={{ mr: 0.5, color: '#3f51b5' }} />
              <Typography variant="body2">Wifi</Typography>
            </Box>
          )}
          {amenities.includes('ac') && (
            <Box display="flex" alignItems="center">
              <AcUnitIcon sx={{ mr: 0.5, color: '#3f51b5' }} />
              <Typography variant="body2">AC</Typography>
            </Box>
          )}
          {amenities.includes('tv') && (
            <Box display="flex" alignItems="center">
              <TvIcon sx={{ mr: 0.5, color: '#3f51b5' }} />
              <Typography variant="body2">TV</Typography>
            </Box>
          )}
          {amenities.includes('parking') && (
            <Box display="flex" alignItems="center">
              <LocalParkingIcon sx={{ mr: 0.5, color: '#3f51b5' }} />
              <Typography variant="body2">Parking</Typography>
            </Box>
          )}
        </Box>

        {/* Room Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {rating} Rating
          </Typography>
        </Box>

        {/* Like & Share Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <IconButton aria-label="like" sx={{ color: '#ff4081' }}>
            <Favorite />
          </IconButton>
          <IconButton aria-label="share" sx={{ color: '#3f51b5' }}>
            <Share />
          </IconButton>
        </Box>

        {/* View Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Visibility />}
          fullWidth
          onClick={handleViewRoom}
          sx={{
            backgroundColor: '#3f51b5',
            '&:hover': {
              backgroundColor: '#303f9f',
            },
          }}
        >
          View Room
        </Button>
      </CardContent>
    </Card>
  );
};

export default Rooms;
