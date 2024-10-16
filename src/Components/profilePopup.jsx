import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeProfilePopup } from "../Redux/profileSlice";
import { Box, Button, TextField, Typography, Tab, Tabs, Rating } from '@mui/material';
import { Book, Favorite, Message, RateReview, Person } from '@mui/icons-material'; 
import { fetchUserData } from "../Redux/loggedInUserSlice"; // Your redux action
import { auth } from "../FirebaseConfig/firebase";
import "../Styles/profile.css";
import { Firestore } from "firebase/firestore";
import zIndex from "@mui/material/styles/zIndex";

const ProfilePopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.profile.isOpen);
    const userData = useSelector((state) => state.user.userData);
    const loading = useSelector((state) => state.user.loading);
    const error = useSelector((state) => state.user.error);
    const [activeTab, setActiveTab] = useState(0); 
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (isOpen) {
            const user = auth.currentUser; // Get the currently signed-in user
            if (user) {
                const userId = user.uid; // Retrieve user ID from Firebase Auth
                dispatch(fetchUserData(userId)); // Fetch user data using the user ID
            }
        }
    }, [isOpen, dispatch]);

    if (!isOpen) return null;
    
    // Handles tab navigation
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleReviewSubmit = (event) => {
        event.preventDefault();
        console.log('Review submitted:', { title: reviewTitle, content: reviewContent, rating });
        setReviewTitle('');
        setReviewContent('');
        setRating(0); // Reset rating after submission
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#334' }}>
                    Profile
                </Typography>
                <Button 
                    // variant="outlined" 
                    onClick={() => dispatch(closeProfilePopup('profile'))} 
                    sx={{ 
                        alignSelf: 'flex-end', 
                        borderColor: 'black', 
                        color: 'black', 
                        position:"absolute",
                        top:"10px",
                        right:"90px",
                        zIndex:100,
                        backgroundColor:"black",
                        '&:hover': { 
                            borderColor: 'black', 
                            color: 'black',
                            backgroundColor: 'darkgray'
                        } 
                    }}
                >
                    &times;
                </Button>

                <Box sx={{ width: '100%', mt: 2, }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={handleTabChange} 
                        variant="scrollable" 
                        indicatorColor="primary"
                        sx={{ display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 10 }} 
                    >
                        <Tab 
                            label="Bookings" 
                            icon={<Book />} 
                            sx={{ flexGrow: 1,}} 
                        />
                        <Tab 
                            label="Favorites" 
                            icon={<Favorite />} 
                            sx={{ flexGrow: 1, }} 
                        />
                        <Tab 
                            label="Messages" 
                            icon={<Message />} 
                            sx={{ flexGrow: 1 }} 
                        />
                        <Tab 
                            label="Reviews" 
                            icon={<RateReview />} 
                            sx={{ flexGrow: 1 }} 
                        />
                        <Tab 
                            label="User Profile" 
                            icon={<Person />} 
                            sx={{ flexGrow: 1 }} 
                        />
                    </Tabs>
                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#fafaf' }}>
                        {activeTab === 0 && <Typography variant="body1">Bookings content goes here...</Typography>}
                        {activeTab === 1 && <Typography variant="body1">Favorites content goes here...</Typography>}
                        {activeTab === 2 && <Typography variant="body1">Messages content goes here...</Typography>}
                        {activeTab === 3 && (
                            <Box component="form" onSubmit={handleReviewSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                                <Typography variant="h6" gutterBottom>Submit a Review</Typography>
                                <TextField 
                                    label="Review Title" 
                                    variant="outlined" 
                                    fullWidth 
                                    value={reviewTitle}
                                    onChange={(e) => setReviewTitle(e.target.value)}
                                    sx={{ mb: 1 }} 
                                />
                                <TextField 
                                    label="Review Content" 
                                    variant="outlined" 
                                    multiline 
                                    rows={4} 
                                    fullWidth 
                                    value={reviewContent}
                                    onChange={(e) => setReviewContent(e.target.value)}
                                    sx={{ mb: 1 }} 
                                />
                                <Rating
                                    name="rating"
                                    value={rating}
                                    onChange={(event, newValue) => setRating(newValue)}
                                    precision={0.5}
                                    sx={{ mb: 2 }}
                                />
                                <Button type="submit" variant="contained" color="primary">
                                    Submit Review
                                </Button>
                            </Box>
                        )}
                        {activeTab === 4 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>User Profile</Typography>
                                {loading && <Typography>Loading...</Typography>}
                                {error && <Typography color="error">{error}</Typography>}
                                {userData && (
                                    <>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            variant="outlined"
                                            margin="normal"
                                            value={userData.username || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            variant="outlined"
                                            margin="normal"
                                            value={userData.cellphone || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            margin="normal"
                                            value={userData.email || ''}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </>
                                )}
                            </Box>
                        )}
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default ProfilePopup;
