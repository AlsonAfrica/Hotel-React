import React from 'react';
import { Grid, Container } from '@mui/material';
import Rooms from './rooms';
import RoomModal from './roomPopup';

const roomsData = [
  {
    roomType: 'Deluxe Room',
    image: 'https://source.unsplash.com/featured/?deluxe-room',
    price: 120,
    occupants: 4,
    rating: 4.5,
    amenities: ['wifi', 'ac', 'tv', 'parking'],
  },
  {
    roomType: 'Suite',
    image: 'https://source.unsplash.com/featured/?suite-room',
    price: 200,
    occupants: 6,
    rating: 4.8,
    amenities: ['wifi', 'ac', 'tv'],
  },
  {
    roomType: 'Standard Room',
    image: 'https://source.unsplash.com/featured/?standard-room',
    price: 80,
    occupants: 2,
    rating: 4.2,
    amenities: ['wifi', 'parking'],
  },
  {
    roomType: 'Standard Room',
    image: 'https://source.unsplash.com/featured/?standard-room',
    price: 80,
    occupants: 2,
    rating: 4.2,
    amenities: ['wifi', 'parking'],
  },
  {
    roomType: 'Standard Room',
    image: 'https://source.unsplash.com/featured/?standard-room',
    price: 80,
    occupants: 2,
    rating: 4.2,
    amenities: ['wifi', 'parking'],
  },
  {
    roomType: 'Standard Room',
    image: 'https://source.unsplash.com/featured/?standard-room',
    price: 80,
    occupants: 2,
    rating: 4.2,
    amenities: ['wifi', 'parking'],
  },
  // Add more rooms if needed
];

const RoomsList = () => {
  return (
    <Container sx={{ py: 4 }}>
        <RoomModal/>
      <Grid container spacing={4} justifyContent="center">
        {roomsData.map((room, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Rooms
              roomType={room.roomType}
              image={room.image}
              price={room.price}
              occupants={room.occupants}
              rating={room.rating}
              amenities={room.amenities}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomsList;
