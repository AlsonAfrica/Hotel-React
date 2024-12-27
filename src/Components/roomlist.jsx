import React, { useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import Rooms from './rooms';
import RoomModal from './roomPopup';

const RoomsList = ({rooms}) => {
  return (
    <Container sx={{ py: 4 }}>
      <RoomModal />
      <Grid container spacing={4} justifyContent="center">
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Rooms
              roomType={room.roomType}
              image={room.image}
              price={room.price}
              occupants={room.capacity}
              rating={room.rating}
              amenities={room.amenities}
              isAvailable={room.availability}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RoomsList;
