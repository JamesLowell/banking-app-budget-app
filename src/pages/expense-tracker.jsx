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


export default function TrackExpense() {
  const [expenseCategory, setCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleStoreValues = (event) => {
    const { name, value } = event.target;
    
    switch (name) {
      case 'expenseTitle':
        setExpenseTitle(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'amount':
        if (value === '') {
          setExpenseAmount(null);
        } else {
          const floatValue = parseFloat(value);
          if (!isNaN(floatValue) && floatValue >= 0) {
            setExpenseAmount(floatValue);
          }
        }
        break;
      case 'description':
        setExpenseDesc(value);
        break;
      default:
        break;
    }
  };

  const handleStoreDate = (selectedDate) => {
    console.log(dayjs(selectedDate).format('MM-DD-YYYY'))
    const formattedDate = dayjs(selectedDate).format('MM-DD-YYYY')
    setExpenseDate(formattedDate);
  };

  const handleSubmit = () => {
    if (!expenseTitle || !expenseCategory || !expenseDate || !expenseDesc || !expenseAmount) {
      alert('Please fill in all fields.');
      return;
    }

    const expenseData = {
      expenseTitle,
      expenseCategory,
      expenseDate,
      expenseDesc,
      expenseAmount,
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
          const titleExists = existingData.some(entry => entry.expenseTitle === expenseTitle);
  
          if (titleExists) {
            alert('Expense title already exists. Please choose a different title.');
            return;
          }
        }
  
        existingData.push(expenseData);
        localStorage.setItem(localStorageKey, JSON.stringify(existingData));

        setExpenseTitle('');
        setCategory('');
        setExpenseDate('');
        setExpenseDesc('');
        setExpenseAmount('');

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
              CREATE EXPENSE
            </Typography>

            <TextField 
              required id="expenseTitle" 
              name="expenseTitle" 
              label="Name of expense" 
              autoComplete="cc-name" 
              variant="standard" 
              value={expenseTitle} 
              onChange={handleStoreValues} 
              inputProps={{ maxLength: 20 }}
              sx={{ marginTop: 2 }} />

            {/* Category select */}
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <InputLabel id="Category">Category</InputLabel>
              {/* <Select labelId="Category" id="Category" value={category} onChange={handleDateChange} fullWidth label="Category"> */}
              <Select labelId="Category" name="category" id="Category" value={expenseCategory} fullWidth label="Category" onChange={handleStoreValues}>
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

            {/* Date field */}
            <FormControl sx={{ marginTop: 3, minWidth: 200 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DatePicker label="Date" id="date" value={expenseDate} onChange={handleDateChange} /> */}
                <DatePicker label="Date" id="date" name="date" value={expenseDate} onAccept={handleStoreDate} />
              </LocalizationProvider>
            </FormControl>

            {/* Description field */}
            <TextField 
              required 
              id="description" 
              name="description" 
              label="Description" 
              fullWidth 
              autoComplete="cc-description" 
              variant="standard" 
              value={expenseDesc} 
              onChange={handleStoreValues}
              inputProps={{ maxLength: 40 }}
              sx={{ marginTop: 3 }} />

              {/* Amount field */}
            <TextField 
              required 
              id="amount"
              name="amount" 
              label="Amount" 
              fullWidth 
              autoComplete="cc-amount" 
              variant="standard" 
              value={expenseAmount} 
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
                Confirm
              </Button>
            </Grid>
            </FormControl>
          </Paper>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
