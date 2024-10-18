// Redux/likedRoomsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// room slice for liked rooms
const likedRoomsSlice = createSlice({
    name: "likedRooms",
    initialState: {
        rooms: [],
    },
    reducers: {
        addLikedRoom: (state, action) => {
            const room = action.payload;
            // Check if the room is already liked
            if (!state.rooms.some(r => r.roomType === room.roomType)) {
                state.rooms.push(room);
            }
        },
        removeLikedRoom: (state, action) => {
            const roomType = action.payload;
            state.rooms = state.rooms.filter(room => room.roomType !== roomType);
        },
    },
});

export const { addLikedRoom, removeLikedRoom } = likedRoomsSlice.actions;
export default likedRoomsSlice.reducer;
