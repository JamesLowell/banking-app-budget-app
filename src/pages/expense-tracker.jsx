import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select'; // Missing import
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//Date picker MUI
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
      main: '#FFB946',
    },
  },
  typography: {
    fontFamily:'Geomanist'
  },
});

export default function TrackExpense() {
    const [category, setCategory] = useState('');
    const [expenseDate, setExpenseDate] = useState('');

  const handleDateChange = (category, date) => {
    setCategory(category.target.value);
    setExpenseDate(date);
    const formattedDate = dayjs(date).format('MM/DD/YYYY');
  console.log(formattedDate);
  };

 
  return (
    // <form action ="/budget/dashboard">

      
    // </form>
    <ThemeProvider theme={defaultTheme}>
        <React.Fragment>
                
                <Grid 
                container spacing={6}
                justifyContent="center" 
                alignItems="center" 
                style={{ minHeight: '100vh' }}
                >
                  <Grid item xs={12} md={6}>
                  <Paper
                            sx={{
                              p: 4 ,
                              display: 'flex',
                              flexDirection: 'column',
                              height: 'auto',
                              backgroundColor: 'white',
                              border: '1px solid black',
                              boxShadow: '4px 4px 1px rgba(0, 0, 0, 0.9)',
                            }}
                          >
          
                  <Typography variant="h6" fontFamily="ITC Benguiat Std" gutterBottom>
                     Expense Log
                  </Typography>
          
                    <TextField
                      required
                      id="expenseTitle"
                      label="Name of expense"
                      fullWidth
                      autoComplete="cc-name"
                      variant="standard"
                    />
          
                  {/* Category select */}
                  <Grid item xs={12} md={8}>
                  <FormControl sx={{ m: 0, minWidth: 200 }}>
                  <InputLabel id="Category">Category</InputLabel>
                  <Select
                    labelId="Category"
                    
                    id="Category"
                    value={category}
                    onChange={handleDateChange}
                    fullWidth
                    label="Category"
                  >
          
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='Food & Drinks'>Food & Drinks</MenuItem>
                    <MenuItem value="Shopping">Shopping</MenuItem>
                    <MenuItem value="Housing">Housing</MenuItem>
                    <MenuItem value="Transportation">Transportation</MenuItem>
                    <MenuItem value="Life & Entertainment">Life & Entertainment</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
                  </Grid>    
          
                 {/* Date field */}
              <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                      label="Date"
                      id="date"
                      value={expenseDate}
                      onChange={handleDateChange}
                    />
             </LocalizationProvider>
              </Grid>
          
                  
                  {/* Description field */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="description"
                      label="Description"
                      helperText="Description/Note"
                      fullWidth
                      autoComplete="cc-description"
                      variant="standard"
                    />
                  </Grid>
          
                  <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color="secondary"
                        fontWeight={700}
                        onClick={handleDateChange}
                      >
                        Add Expense
                  </Button>
                    </Paper>
                
                  </Grid>
                  <Grid item xs={12}>
                  </Grid>
                </Grid>
              </React.Fragment>

    </ThemeProvider>
    
  );
}