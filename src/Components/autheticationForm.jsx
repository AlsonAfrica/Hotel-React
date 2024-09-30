import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Tabs, Tab, Grid } from '@mui/material';
import logo from "../assets/logo.png";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../Redux/authenticationSlice';

const SignInRegisterForm = () => {
  const [activeTab, setActiveTab] = useState(0); // 0 = Sign In, 1 = Register
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    cellphone: ''
  });
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSuccessMessage(''); // Reset success message when switching tabs
  };

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData({ ...signInData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    console.log('Sign In data:', signInData);
    
    // Dispatch the login action with sign-in data
    const resultAction = await dispatch(loginUser(signInData));

    // Check if login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/homePage"); // Navigate to HomePage after successful login
    } else {
      // Handle login error (you may want to show an error message here)
      console.error('Login failed:', resultAction.error.message);
      alert('Login failed, please check your credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Register data:', registerData);
    const resultAction = await dispatch(registerUser(registerData));

    if (registerUser.fulfilled.match(resultAction)) {
      setSuccessMessage('Registration successful! Please log in.');
      setActiveTab(0); // Switch to the Sign In tab
      // Clear the registration fields
      setRegisterData({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        cellphone: ''
      });
    } else {
      console.error('Registration failed:', resultAction.error.message);
      alert('Registration failed, please try again.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '600px', 
        mx: 'auto',
        mt: 8,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img 
          src={logo}
          alt="Logo" 
          style={{ width: '100px', height: '100px' }}
        />
      </Box>
      <Typography component="h1" variant="h5" textAlign="center" gutterBottom>
        {activeTab === 0 ? 'Sign In' : 'Register'}
      </Typography>

      {successMessage && (
        <Typography variant="body2" color="green" textAlign="center" gutterBottom>
          {successMessage}
        </Typography>
      )}

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        <Tab label="Sign In" />
        <Tab label="Register" />
      </Tabs>

      {activeTab === 0 ? (
        <Box component="form" onSubmit={handleSignInSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={signInData.email}
            onChange={handleSignInChange}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signInData.password}
            onChange={handleSignInChange}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      ) : (
        <Box component="form" onSubmit={handleRegisterSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                id="cellphone"
                label="Cellphone Number"
                name="cellphone"
                value={registerData.cellphone}
                onChange={handleRegisterChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SignInRegisterForm;
