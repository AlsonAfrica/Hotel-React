// src/Components/SearchBar.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const SearchBar = ({ rooms, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter the rooms and pass the filtered list to the parent
    const filteredRooms = rooms.filter((room) =>
      room.roomType.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filteredRooms);
  };

  return (
    <StyledTextField
      variant="outlined"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInputChange}
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
