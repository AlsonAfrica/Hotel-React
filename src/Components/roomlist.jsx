import React, { useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../Redux/roomDataSlice';
import Rooms from './rooms';
import RoomModal from './roomPopup';

const RoomsList = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
