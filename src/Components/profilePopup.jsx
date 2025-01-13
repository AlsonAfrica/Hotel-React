import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeProfilePopup } from "../Redux/profileSlice";
import {
  Box,
  Button,
  TextField,
  Typography,
  Tab,
  Tabs,
  Rating,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Book,
  Favorite,
  Message,
  RateReview,
  Person,
} from "@mui/icons-material";
import { fetchUserData } from "../Redux/loggedInUserSlice"; 
import { auth } from "../FirebaseConfig/firebase";
import "../Styles/profile.css";
import { addLikedRoom } from "../Redux/likesSlice";
import { Firestore } from "firebase/firestore";
import RoomModal from "./roomPopup";
import { postReview } from "../Redux/reviewsSlice";

const ProfilePopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.profile.isOpen);
  const userData = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const [activeTab, setActiveTab] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewsent, setReviewsent] = useState(false)

  const likedRooms = useSelector((state) => state.likedRooms.rooms);

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

//   Submit reviews function
  const handleReviewSubmit = (event) => {
    
    event.preventDefault();
   
    // Review container
    const newReview = {
        id: Date.now().toString(), 
        title: reviewTitle,
        content: reviewContent,
        rating: rating,
      };

    // Dispatch the postReview action to save the review to Firebase
    dispatch(postReview(newReview));

    setReviewsent(true)

     // Reset rating after submission
    setReviewTitle("");
    setReviewContent("");
    setRating(0);
    
    setReviewsent(false)
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#334" }}
        >
          Profile
        </Typography>
        <Button
          // variant="outlined"
          onClick={() => dispatch(closeProfilePopup("profile"))}
          sx={{
            alignSelf: "flex-end",
            borderColor: "black",
            color: "black",
            position: "absolute",
            top: "10px",
            right: "90px",
            zIndex: 100,
            backgroundColor: "black",
            "&:hover": {
              borderColor: "black",
              color: "black",
              backgroundColor: "darkgray",
            },
          }}
        >
          &times;
        </Button>

        <Box sx={{ width: "100%", mt: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            indicatorColor="primary"
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              gap: 10,
            }}
          >
            <Tab label="Bookings" icon={<Book />} sx={{ flexGrow: 1 }} />
            <Tab label="Favorites" icon={<Favorite />} sx={{ flexGrow: 1 }} />
            <Tab label="Messages" icon={<Message />} sx={{ flexGrow: 1 }} />
            <Tab label="Reviews" icon={<RateReview />} sx={{ flexGrow: 1 }} />
            <Tab label="User Profile" icon={<Person />} sx={{ flexGrow: 1 }} />
          </Tabs>
          <Box
            sx={{
              p: 2,
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              backgroundColor: "#fafaf",
            }}
          >
            {activeTab === 0 && (
              <Typography variant="body1">
                Bookings content goes here...
              </Typography>
            )}
            {activeTab === 1 && (
              <Typography variant="body1">
                Favorites content goes here...
                {likedRooms.length === 0 ? (
                  <Typography>No favorite rooms yet.</Typography>
                ) : (
                  likedRooms.map((room, index) => (
                    <Card
                      key={index}
                      sx={{
                        display: "flex",
                        mb: 2,
                        boxShadow: 3,
                        maxWidth: 600,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 150 }}
                        image={room.image} // Ensure this contains a valid image URL
                        alt={room.roomType}
                      />
                      <Box
                        sx={{ display: "flex", flexDirection: "column", p: 2 }}
                      >
                        <Typography variant="h6">{room.roomType}</Typography>
                        <Typography variant="body2">
                          Price: R{room.price} / night
                        </Typography>
                        <Typography variant="body2">
                          Occupants: {room.occupants}
                        </Typography>
                        <Typography variant="body2">
                          Rating: {room.rating}
                        </Typography>
                        <Typography variant="body2">
                          Amenities: {room.amenities.join(", ")}
                        </Typography>
                      </Box>
                    </Card>
                  ))
                )}
              </Typography>
            )}
            {activeTab === 2 && (
              <Typography variant="body1">
                Messages content goes here...
              </Typography>
            )}
            {activeTab === 3 && (
              <Box
                component="form"
                onSubmit={handleReviewSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                <Typography variant="h6" gutterBottom>
                  Submit a Review
                </Typography>
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
                 {reviewsent && <p style={{color:"green"}}>Thanks for Sending your review, Highly appreciate your response</p>}
                <Button type="submit" variant="contained" color="primary">
                  Submit Review
                </Button>
              </Box>
            )}
            {activeTab === 4 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  User Profile
                </Typography>
                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {userData && (
                  <>
                    <TextField
                      fullWidth
                      label="Name"
                      variant="outlined"
                      margin="normal"
                      value={userData.username || ""}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      variant="outlined"
                      margin="normal"
                      value={userData.cellphone || ""}
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
                      value={userData.email || ""}
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
      <RoomModal
      userData ={userData}
      />
    </div>
  );
};

export default ProfilePopup;
