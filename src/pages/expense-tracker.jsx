import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Select from '@mui/material/Select'; // Missing import
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

export default function TrackExpense() {
    const [category, setCategory] = useState(''); // Initialize category with an empty string

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

 
  return (
    <React.Fragment>
                
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
        <Paper
                  sx={{
                    p: 4 ,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    backgroundColor: 'white',
                    border: '1px solid black',
                    boxShadow: '4px 4px 1px rgba(0, 0, 0, 0.9)',
                  }}
                >

        <Typography variant="h6" gutterBottom>
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


                        <Grid item xs={12} md={6}>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category}
          onChange={handleChange}
          autoWidth
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
          </Paper>
      
        </Grid>
        


        <Grid item xs={12} md={6}>
          <TextField
            required
            id="Date"
            label="Date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Description/Note"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}