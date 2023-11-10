// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BankingApp from '../BankingApp';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Banking App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1A1A1A',
    },
    secondary: {
      main: '#FFB946',
    },
  },
});

const BankingRegister = () => {
  const [inputVal, setInputVal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [data, setData] = useState([]);

  const getdata = (e) => {
    const { value, name } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value
    });
  }

  const addData = (e) => {
    e.preventDefault();
  
    const { firstName, lastName, email, password, acctBalance } = inputVal;
  
    if (firstName === "") {
      alert("Name field is required.");
    } else if (lastName === "") {
      alert("Email field is required.");
    } else if (email === "") {
      alert("Email field is required.");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address.");
    } else if (password === "") {
      alert("Please enter a password.");
    } else if (password.length < 5) {
      alert("Password length should be more than 5 characters.");
    } else {
      alert("Registration successful.");
  
      // Retrieve the existing data from localStorage
      const existingData = JSON.parse(localStorage.getItem("admin-list") || "[]");
  
      // Create a new entry with the user's information
      const newUserEntry = {
        firstName,
        lastName,
        email,
        password,
      };
  
      // Append the new entry to the existing data
      existingData.push(newUserEntry);
  
      // Store the updated data in localStorage
      localStorage.setItem("admin-list", JSON.stringify(existingData));
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register / Sign Up
          </Typography>
          <Box component="form" onSubmit={addData} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              onChange={getdata}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
              onChange={getdata}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={getdata}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={getdata}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addData}
            >
              Register
            </Button>
            <a href="/bankinglogin" variant="body2">             
                {"Already have an account? Sign In"}         
            </a>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default BankingRegister;
