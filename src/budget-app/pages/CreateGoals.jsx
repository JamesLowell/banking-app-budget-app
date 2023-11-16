import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HouseIcon from '@mui/icons-material/House';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MoreIcon from '@mui/icons-material/More';
import { GetGoals, StoreGoals } from './store/goalstore';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FFB946',
    },
    secondary: {
      main: '#1b1b1b',
    },
  },
  typography: {
    fontFamily: 'Geomanist',
  },
});


export default function CreateGoals() {
  const [goalsCategory, setCategory] = useState('');
  const [goalsName, setgoalsName] = useState('');
  const [goalstargetAmount, setgoalstargetAmount] = useState('');
  const [goalsSaved, setgoalsSaved] = useState('');
  

  const handleStoreValues = (event) => {
    const { name, value } = event.target;
    
    switch (name) {
        case 'goalsName':
            setgoalsName(value);
            break;
        case 'goalsSaved':
            setgoalsSaved(value);
            break;
        case 'category':
            setCategory(value);
            break;
        case 'goalstargetAmount':
            if (value === '') {
            setgoalstargetAmount(null);
            } else {
            const floatValue = parseFloat(value);
            if (!isNaN(floatValue) && floatValue >= 0) {
                setgoalstargetAmount(floatValue);
            }
            }
            break;
        default:
            break;
    }
  };

  const handleSubmit = () => {
    if (!goalsCategory || !goalsName || !goalstargetAmount || !goalsSaved) {
      alert('Please fill in all fields.');
      return;
    }

    const goalsData = {
        goalsCategory,
        goalsName,
        goalstargetAmount,
        goalsSaved,
    };
  
    const userInfoString = localStorage.getItem('user-info');
  
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
  
      if (userInfo.email) {

        if (GetGoals(userInfo.email).some(entry => entry.goalsName === goalsName)) {
          alert('budget title already exists. Please choose a different title.');
          return;
        }

        StoreGoals(userInfo.email, goalsData)
        
        setCategory('');
        setgoalsName('');
        setgoalstargetAmount('');
        setgoalsSaved('');
        
        

        alert('Success!')

       

      } else {
        console.error('User-info does not contain an email.');
      }
    } else {
      console.error('User-info not found in local storage.');
    }
  };
  
  const handleBackToDashboard = () => {
    window.location.href = '/budget/dashboard';
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              height: 'auto',
              backgroundColor: 'white',
              border: '1px solid black',
              boxShadow: '4px 4px 1px rgba(0, 0, 0, 0.9)',
            }}
          >
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
            <Typography variant="h4" fontFamily="ITC Benguiat Std">
              CREATE GOALS
            </Typography>
            <FormControl sx={{ marginTop: 1, minWidth: 200 }}></FormControl>
            <Typography variant="h6" fontFamily="ITC Benguiat Std">
              What are you saving for?
            </Typography>
            
            <TextField 
              required id="goalsName" 
              name="goalsName" 
              label="Your goal's name" 
              autoComplete="cc-name" 
              variant="standard" 
              value={goalsName} 
              onChange={handleStoreValues} 
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: 2 }} />


                {/* Saved field */}
            <TextField 
              required id="goalsSaved" 
              name="goalsSaved" 
              label="Saved Already" 
              autoComplete="cc-name" 
              variant="standard" 
              value={goalsSaved} 
              onChange={handleStoreValues} 
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: 2 }} />


                {/* Amount field */}
            <TextField 
              required 
              id="goalstargetAmount"
              name="goalstargetAmount" 
              label="Target Amount" 
              fullWidth 
              autoComplete="cc-amount" 
              variant="standard" 
              value={goalstargetAmount} 
              onChange={handleStoreValues}
              sx={{ marginTop: 3 }} />

              {/* Category select */}
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <InputLabel id="Category">Some things people save for</InputLabel>
              {/* <Select labelId="Category" id="Category" value={category} onChange={handleDateChange} fullWidth label="Category"> */}
              <Select labelId="Category" name="category" id="Category" value={goalsCategory} fullWidth label="Category" onChange={handleStoreValues}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Food & Drinks"><FastfoodIcon />  Food and Drinks</MenuItem>
                <MenuItem value="Shopping"><ShoppingBagIcon /> Shopping</MenuItem>
                <MenuItem value="Housing"><HouseIcon /> Housing</MenuItem>
                <MenuItem value="Transportation"><DirectionsCarIcon /> Transportation</MenuItem>
                <MenuItem value="Life & Entertainment"><NightlifeIcon /> Life & Entertainment</MenuItem>
                <MenuItem value="Others"><MoreIcon />  Others</MenuItem>
              </Select>
            </FormControl>


            <Grid container justifyContent="space-between" sx={{ marginTop: 3 }}>
              <Button
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{ mt: 3, mb: 2 }} 
                color="primary" 
                onClick={handleSubmit}>
                Add Goal
              </Button>
            </Grid>
            </FormControl>
          </Paper>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}