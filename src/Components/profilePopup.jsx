import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { closeProfilePopup } from "../Redux/profileSlice";
import { Box, Button, TextField, Typography, Tab, Tabs, Rating } from '@mui/material';
import { Book, Favorite, Message, RateReview, Person } from '@mui/icons-material'; 
import "../Styles/profile.css";

const ProfilePopup = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.profile.isOpen);
    const [activeTab, setActiveTab] = useState(0); 
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewContent, setReviewContent] = useState('');
    const [rating, setRating] = useState(0); // State for star rating

    if (!isOpen) return null;

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
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Profile
                </Typography>
                <Button 
                    variant="outlined" 
                    onClick={() => dispatch(closeProfilePopup('profile'))} 
                    sx={{ 
                        alignSelf: 'flex-end', 
                        borderColor: '#6200ea', 
                        color: '#6200ea', 
                        '&:hover': { 
                            borderColor: '#3700b3', 
                            color: '#3700b3' 
                        } 
                    }}
                >
                    Close
                </Button>

                <Box sx={{ width: '100%', mt: 2 }}>
                    <Tabs 
                        value={activeTab} 
                        onChange={handleTabChange} 
                        variant="scrollable" 
                        textColor="primary" 
                        indicatorColor="primary"
                        sx={{ display: 'flex', flexWrap: { xs: 'wrap', sm: 'nowrap' }, gap: 2 }} 
                    >
                        <Tab 
                            label="Bookings" 
                            icon={<Book />} 
                            sx={{ 
                                flexGrow: 1, 
                                padding: { xs: '10px', sm: '16px' }, 
                                textAlign: 'center', 
                                borderColor: '#f44336', 
                                color: '#f44336',
                                '&:hover': { backgroundColor: '#fce4ec' } 
                            }} 
                        />
                        <Tab 
                            label="Favorites" 
                            icon={<Favorite />} 
                            sx={{ 
                                flexGrow: 1, 
                                padding: { xs: '10px', sm: '16px' }, 
                                textAlign: 'center', 
                                borderColor: '#ff9800', 
                                color: '#ff9800',
                                '&:hover': { backgroundColor: '#fff3e0' } 
                            }} 
                        />
                        <Tab 
                            label="Messages" 
                            icon={<Message />} 
                            sx={{ 
                                flexGrow: 1, 
                                padding: { xs: '10px', sm: '16px' }, 
                                textAlign: 'center', 
                                borderColor: '#2196f3', 
                                color: '#2196f3',
                                '&:hover': { backgroundColor: '#e3f2fd' } 
                            }} 
                        />
                        <Tab 
                            label="Reviews" 
                            icon={<RateReview />} 
                            sx={{ 
                                flexGrow: 1, 
                                padding: { xs: '10px', sm: '16px' }, 
                                textAlign: 'center', 
                                borderColor: '#4caf50', 
                                color: '#4caf50',
                                '&:hover': { backgroundColor: '#e8f5e9' } 
                            }} 
                        />
                        <Tab 
                            label="User Profile" 
                            icon={<Person />} 
                            sx={{ 
                                flexGrow: 1, 
                                padding: { xs: '10px', sm: '16px' }, 
                                textAlign: 'center', 
                                borderColor: '#9c27b0', 
                                color: '#9c27b0',
                                '&:hover': { backgroundColor: '#f3e5f5' } 
                            }} 
                        />
                    </Tabs>
                    <Box sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: '4px', backgroundColor: '#fafafa' }}>
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
                                {/* Star Rating Component */}
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
                        {activeTab === 4 && <Typography variant="body1">User Profile content goes here...</Typography>}
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default ProfilePopup;
