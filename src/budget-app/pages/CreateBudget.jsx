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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

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


export default function CreateBudget() {
  const [budgetCategory, setCategory] = useState('');
  const [budgetstartDate, setbudgetstartDate] = useState('');
  const [budgetendDate, setbudgetendDate] = useState('');
  const [budgetPeriod, setbudgetPeriod] = useState('');
  const [budgetName, setbudgetName] = useState('');
  const [budgetAmount, setbudgetAmount] = useState('');

  const handleStoreValues = (event) => {
    const { name, value } = event.target;
    
    switch (name) {
      case 'budgetName':
        setbudgetName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'amount':
        if (value === '') {
          setbudgetAmount(null);
        } else {
          const floatValue = parseFloat(value);
          if (!isNaN(floatValue) && floatValue >= 0) {
            setbudgetAmount(floatValue);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleStartDate = (selectedDate) => {
    console.log(dayjs(selectedDate).format('MM-DD-YYYY'))
    const formattedDate = dayjs(selectedDate).format('MM-DD-YYYY')
    setbudgetstartDate(formattedDate);
  };
  const handleEndDate = (selectedDate) => {
    console.log(dayjs(selectedDate).format('MM-DD-YYYY'))
    const formattedDate = dayjs(selectedDate).format('MM-DD-YYYY')
    setbudgetendDate(formattedDate);
  };
  const handlePeriodDate = (selectedDate) => {
    console.log(dayjs(selectedDate).format('MM-DD-YYYY'))
    const formattedDate = dayjs(selectedDate).format('MM-DD-YYYY')
    setbudgetPeriod(formattedDate);
  };

  const handleSubmit = () => {
    if (!budgetName || !budgetCategory || !budgetstartDate || !budgetendDate || !budgetPeriod || !budgetAmount) {
      alert('Please fill in all fields.');
      return;
    }

    const budgetData = {
      budgetName,
      budgetCategory,
      budgetstartDate,
      budgetendDate,
      budgetPeriod,
      budgetAmount,
    };
  
    const userInfoString = localStorage.getItem('user-info');
  
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
  
      if (userInfo.email) {

        const localStorageKey = userInfo.email;
        const existingDataString = localStorage.getItem(localStorageKey);

        let existingData = [];
  
        if (existingDataString) {
          existingData = JSON.parse(existingDataString);
          const titleExists = existingData.some(entry => entry.budgetName === budgetName);
  
          if (titleExists) {
            alert('budget title already exists. Please choose a different title.');
            return;
          }
        }
  
        existingData.push(budgetData);
        localStorage.setItem(localStorageKey, JSON.stringify(existingData));

        setbudgetName('');
        setCategory('');
        setbudgetstartDate('');
        setbudgetendDate('');
        setbudgetPeriod('');
        setbudgetAmount('');
        

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
            <Typography variant="h6" fontFamily="ITC Benguiat Std">
              CREATE BUDGET
            </Typography>

            <TextField 
              required id="budgetName" 
              name="budgetName" 
              label="Name" 
              autoComplete="cc-name" 
              variant="standard" 
              value={budgetName} 
              onChange={handleStoreValues} 
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: 2 }} />

            {/* Category select */}
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <InputLabel id="Category">Category</InputLabel>
              {/* <Select labelId="Category" id="Category" value={category} onChange={handleDateChange} fullWidth label="Category"> */}
              <Select labelId="Category" name="category" id="Category" value={budgetCategory} fullWidth label="Category" onChange={handleStoreValues}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Food & Drinks">Food & Drinks</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Housing">Housing</MenuItem>
                <MenuItem value="Transportation">Transportation</MenuItem>
                <MenuItem value="Life & Entertainment">Life & Entertainment</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>

            {/* Starting Date field */}
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Date" id="date" value={budgetstartDate} onChange={handleDateChange} /> */}
                <DatePicker label="Start Date" id="startDate" name="startDate" value={budgetstartDate} onAccept={handleStartDate}/>
              </LocalizationProvider>
            </FormControl>

            {/* Ending Date field */}
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Date" id="date" value={budgetstartDate} onChange={handleDateChange} /> */}
                <DatePicker label="End Date" id="endDate" name="endDate" value={budgetendDate} onAccept={handleEndDate} />
              </LocalizationProvider>
            </FormControl>

           {/* Period field */}
           <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Date" id="date" value={budgetstartDate} onChange={handleDateChange} /> */}
                <DatePicker label="Period" id="period" name="period" value={budgetPeriod} onAccept={handlePeriodDate} />
              </LocalizationProvider>
            </FormControl>

              {/* Amount field */}
            <TextField 
              required 
              id="amount"
              name="amount" 
              label="Amount" 
              fullWidth 
              autoComplete="cc-amount" 
              variant="standard" 
              value={budgetAmount} 
              onChange={handleStoreValues}
              sx={{ marginTop: 3 }} />


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
                Add Budget
              </Button>
            </Grid>
            </FormControl>
          </Paper>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}