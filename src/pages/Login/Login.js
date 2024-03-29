import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react';
// import { Navigate } from 'react-router-dom';
import AlertMessages from '../../components/AlertMessage/AlertMessage';
import Buttons from '../../components/Button/Button';
import InputTextMessage from '../../components/TextField/InputTextField';
import { useNavigate } from 'react-router-dom';

function Login(params) {
  // const [identifier, setIdentifier] = useState('');
  // const [password, setPassword] = useState('');
  const [isShowPassword, setisShowPassword] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const identifier = data.get("username");
    const password = data.get("password");

    // Menyatukan pengambilan nilai dan pengiriman data
    const payload = {
      identifier: identifier,
      password: password,
    };
  
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setisSuccess(true);
        navigate('/Home');
      } else {
        const errorResponse = await response.json();
    console.error('Error logging in:', errorResponse.error);
        setisError(true);
      }
    } catch (error) {
      console.error('Error logging user:', error);
      setisError(true);
    }
  };

  const handleClose = () => {
    setisSuccess(false);
    setisError(false);
  }
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          flexDirection: 'column',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
        </Avatar>
        <Typography component={"h1"} variant="h5">
          Login
        </Typography>
        <InputTextMessage
          id="identifier"
          label="Username"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          autoFocus
          name="username"
          type="text"
        />
        <div style={{ display: "flex", width: "100%", position: "relative" }}>
          <InputTextMessage
            id="Password"
            label="Password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            autoFocus
            name="password"
            type={isShowPassword ? "text" : "password"}
          />
          <div style={{
            position: "absolute",
            right: 15,
            top: 33,
            cursor: "pointer"}} 
            onClick={() => setisShowPassword(!isShowPassword)}
          >
            {isShowPassword ? (
              <VisibilityOff fontSize="small" />
            ) : (
              <Visibility fontSize="small" />
            )}
          </div>
        </div>
        <Buttons
          type="submit"
          variant="contained"
          fullWidth
          label="Login"
        />

        <AlertMessages
          label="your username and password is correct!"
          open={isSuccess}
          severity="success"
          onClose={handleClose}
        />

        <AlertMessages
          label="username and password is wrong!"
          open={isError}
          severity="error"
          onClose={handleClose}
        />

      </Box>
    </Container>
  );
}

export default Login;