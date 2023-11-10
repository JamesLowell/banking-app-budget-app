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
import { useNavigate } from 'react-router-dom';


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

const BankingLogin = () => {

  const history = useNavigate();

  const [inputVal, setInputVal] = useState({
    email: "",
    password: ""
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value
    });
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


  const addData = (e) => {
    e.preventDefault();
    const { email, password } = inputVal;

    const userData = JSON.parse(localStorage.getItem("admin-list") || "[]")

    if (email === "") {
      alert("Email field is required.");
    } else if (!email.includes("@")) {
      alert("Please enter a valid email address.");
    } else if (password === "") {
      alert("Please enter a password.");
    } else if (password.length < 5) {
      alert("Password length should be more than 5 characters.");
    } else {
      console.log(userData)
        if(userData && userData.length){
         
          const userlogin = userData.find((elem,k) => {
            return elem.email === email && elem.password === password 
          });
          console.log(userlogin)
          if (!userlogin){
            alert("Invalid login.")
          } else {
            alert("Login success.")
            localStorage.setItem("admin-info", JSON.stringify(userlogin));
            window.location.href = 'banking-app';
          }
        }
        else {
          alert ("User not found. Please register.")
       }
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={addData} noValidate sx={{ mt: 1 }}>
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
              Sign In
            </Button>
            <Link href="/bankingregister" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default BankingLogin;
