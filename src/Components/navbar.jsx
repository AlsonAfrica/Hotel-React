import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from 'react-redux';
import { openFacilitiesPopup } from '../Redux/facilitiesSlice';
import { openGalleryPopup } from '../Redux/gallerySlice';
import { openPoliciesPopup } from '../Redux/policiesSlice';
import { openReviewsPopup } from '../Redux/ReviewsSlice';
import { openProfilePopup } from '../Redux/profileSlice';
import FacilitiesPopup from './facilitiesPopup';
import GalleryPopup from './galleryPopup';
import ReviewsPopup from './reviews';
import PoliciesPopup from './policies';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProfilePopup from './profilePopup';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleNavigate = ()=>{
    navigate ('/authetication');
  }

  const handleButtonClick = (label) => {
    if (label === 'Facilities') {
      dispatch(openFacilitiesPopup()); // Open the Facilities popup
    } else if (label === 'Gallery') {
      dispatch(openGalleryPopup()); // Open the Gallery popup
    } else if (label === "Policies"){
      dispatch(openPoliciesPopup());
    }else if (label === "Reviews"){
      dispatch(openReviewsPopup());
    } else if (label === "PROFILE"){
      dispatch(openProfilePopup());
    } else if (label === "Explore Rooms"){
       dispatch(handleNavigate())
    }
    else {
      console.log(`Clicked: ${label}`);
    }
  };

  const menuItems = [
    // { label: 'Rooms', color: '#FF6347' },
    { label: 'Facilities', color: '#1E90FF' },
    { label: 'Gallery', color: '#32CD32' },
    { label: 'Policies', color: '#FFD700' },
    { label: 'Reviews', color: '#FF69B4' },
      // Conditionally include "Explore Rooms" button if NOT on HomePage
      ...(location.pathname !== '/homePage' ? [{ label: 'Explore Rooms', color: '#FF69B4' }] : []),
      // Conditionally include "Profile" button if on HomePage
      ...(location.pathname === '/homePage' ? [{ label: 'PROFILE', color: '#FF69B4' }] : []),

  ];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'black', boxShadow: 'none' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuItems.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleButtonClick(item.label);
                      handleMenuClose();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: '10px' }}>
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  sx={{
                    color: item.color,
                    border: `1px solid ${item.color}`,
                    '&:hover': { backgroundColor: item.color, color: '#fff' },
                  }}
                  onClick={() => handleButtonClick(item.label)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Facilities Popup Component */}
       <FacilitiesPopup/>
       <GalleryPopup/>
       <ReviewsPopup/>
       <PoliciesPopup/>
       <ProfilePopup/>
    </>
  );
};

export default Navbar;
