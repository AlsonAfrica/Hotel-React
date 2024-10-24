
// src/Components/SearchBar.js
import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Rooms from './rooms';

const RoomSearch = ({rooms}) =>{
  const [searchterm, setSearchTerm] = useState('');

  const handleInputChange = (event)=>{
    setSearchTerm(event.target.value);
  }
  const filteredRooms = rooms.filter((room)=>
  room.roomType.toLowerCase().includes(searchTerm.toLowerCase().toUpperCase())
  )
}
const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: 500, // Adjust as needed
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const SearchBar = () => {
  return (
    <StyledTextField
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;

