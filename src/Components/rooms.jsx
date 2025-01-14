import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box, Rating } from '@mui/material';
import { Favorite, Share, People, Visibility } from '@mui/icons-material';
import WifiIcon from '@mui/icons-material/Wifi';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import SpaIcon from '@mui/icons-material/Spa';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import { openroomPopup } from '../Redux/roompopupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedRoom } from '../Redux/likesSlice';
import { useState } from 'react';
import { removeLikedRoom } from '../Redux/likesSlice';

const Rooms = ({ roomType, image, price, occupants, rating, amenities, isAvailable }) => {
    const dispatch = useDispatch();
    // Success message state
    const [successMessage,setSuccessMessage] = useState("")


    // share function using web share api 
    const handleShareRoom = async () => {
        if (navigator.share) {
          // Define the room details
          const roomDetails = {
            roomType,
            image,
            price,
            occupants,
            rating,
            amenities,
          };
      
          // Prepare the shareable data
          navigator.share({
            title: `Check out this ${roomDetails.roomType} room!`,  // Title for the shared content
            text: `This room is available for ${roomDetails.price}. It includes amenities like ${roomDetails.amenities}. Rated ${roomDetails.rating} stars.`,  // Description
            url: window.location.href,  // Share the current page URL
          })
            .then(() => {
              console.log("Content shared successfully");
            })
            .catch((error) => {
              console.error("Error sharing content", error);
            });
        } else {
          alert("Web Share API is not supported in this browser.");
        }
      };
      
    
    // state of liked rooms
    const handleLikeRoom = ()=>{
        const roomDetails={
            roomType,
            image,
            price,
            occupants,
            rating,
            amenities,
        };
        dispatch(addLikedRoom(roomDetails))
        setSuccessMessage('Room added to favorites!');

        setTimeout(()=>{
            setSuccessMessage('')
        },3000)
    }

    const handleViewRoom = () => {
        const roomDetails = {
            roomType,
            image,
            price,
            occupants,
            rating,
            amenities,
        };
        dispatch(openroomPopup(roomDetails));
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
                    <span style={{ color: '#ff4081', fontWeight: 'bold' }}>R{price}</span> / night
                </Typography>

                {/* Room Availability */}
                <Typography
                    variant="body2"
                    sx={{
                        color: isAvailable ? 'green' : 'red',
                        fontWeight: 'bold',
                        mb: 2,
                    }}
                >
                    {isAvailable ? 'Available' : 'Not Available'}
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
                    {amenities.includes('spa')&&(
                      <Box display="flex" alignItems='center'>
                        <SpaIcon sx={{mr:0.5,color:"#3f51b5"}}/>
                        <Typography variant="body2">Spa</Typography>
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
                    <IconButton aria-label="like" sx={{ color: '#ff4081' }} onClick={handleLikeRoom}>
                        <Favorite />
                    </IconButton>
                    <IconButton aria-label="share" sx={{ color: '#3f51b5' }} onClick={handleShareRoom}>
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
            <Box>
                {/* display success message once the rooms are added successfully */}
                {successMessage && (
                    <div style={{ color: 'green', fontSize: '16px', padding: '10px', backgroundColor: '#f0f4f7', borderRadius: '5px' }}>
                    {successMessage}
                    </div>
                )}
            </Box>
        </Card>
    );
};

export default Rooms;
