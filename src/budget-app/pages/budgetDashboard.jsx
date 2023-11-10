// import * as React from 'react';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, IconButton, DialogTitle, TextField } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AddCircleIcon from '@mui/icons-material/AddCircle';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Budget App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// TODO remove, this demo shouldn't need to reset the theme.
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

function MoneyActionIcon(props) {
  const { text, icon } = props;

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        fontFamily: 'Roboto',
        '&:hover': {
          backgroundColor: '#FFB946',
          
        },
      }}
    >
      {icon}
      <Typography variant="subtitle1" color="textSecondary">
        {text}
      </Typography>
    </Paper>
  );
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState('User');
  const [acctBalance, setAcctBalance] = React.useState('0.00');

  const [openModal, setOpenModal] = useState(false);
  const [balanceToAdd, setBalanceToAdd] = useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddBalance = () => {
    // Here you can implement your logic to add the balance to the 'user-info' in local storage.
  const storedUserInfo = JSON.parse(localStorage.getItem("user-info"));

  // Check if user-info exists in local storage and has 'acctBalance'
  if (storedUserInfo && typeof storedUserInfo.acctBalance === 'number') {
    const newBalance = storedUserInfo.acctBalance + parseFloat(balanceToAdd);
    storedUserInfo.acctBalance = newBalance;

    // Update the 'user-info' key in local storage
    localStorage.setItem("user-info", JSON.stringify(storedUserInfo));

    // Retrieve the "users-list" from local storage
    const userList = JSON.parse(localStorage.getItem('users-list'));

    if (userList && Array.isArray(userList)) {
      // Map the "users-list" array to update the balance for the matching email
      const updatedUserList = userList.map(user => {
        if (user.email === storedUserInfo.email) {
          
          return { ...user, acctBalance: newBalance };
          
        }
        return user;
      });

      // Update the "users-list" with the modified array
      localStorage.setItem("users-list", JSON.stringify(updatedUserList));
    }
    // Update the state with the new balance
    setAcctBalance(newBalance)
  }
  handleCloseModal();
}
  
  useEffect(() => {
    const storedBalance = localStorage.getItem("acctBalance");

    if (storedBalance) {
      const formattedBalance = parseFloat(storedBalance).toFixed(2);
      setAcctBalance(formattedBalance);
    }
  }, []);

  // Load user information from localStorage when the component mounts
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo && userInfo.firstName) {
      setFirstName(userInfo.firstName);
    }
  }, []); // The empty array means this effect runs only once when the component mounts


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
          
            <Typography
              fontFamily='ITC Benguiat Std'
              fontWeight={700}
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome, {firstName}!
            </Typography>
            <a href="/budget/login">
            <Button color="inherit">
              Logout
            </Button>
              </a>
          </Toolbar>
        </AppBar>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8} lg={6}>
                <Paper
                  sx={{
                    p: 10 ,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    backgroundColor: 'white',
                    border: '1px solid black',
                    boxShadow: '4px 4px 1px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  <Typography  fontWeight={700} fontFamily='ITC Benguiat Std' letterSpacing={1} variant='h5'>
                    Account Balance
                  </Typography>
                  <Typography variant="h2" fontWeight={700}>
                    PHP {acctBalance}
                    
                    {/* Add Balance Icon */}

                    <IconButton onClick={handleOpenModal}>
                    <AddCircleIcon />
                      </IconButton>

                    <Dialog open={openModal} onClose={handleCloseModal}>
                    <DialogTitle>Add Balance</DialogTitle>
                    <DialogContent>
                    <TextField
                        autoFocus
                        label="Enter balance"
                        type="number"
                        fullWidth
                        value={balanceToAdd}
                        onChange={(e) => setBalanceToAdd(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseModal} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleAddBalance} color="primary">
                        Add Balance
                      </Button>
                    </DialogActions>
                  </Dialog>

                  </Typography> 
                </Paper>
              </Grid>


          {/* Create Budget, Create Goals, View Budget & Goals, Expense Tracker ICONS */}
          <Grid item xs={12} md={4} lg={6} sx={{p: 3, display: 'flex', flexWrap: 'wrap'}}>
            <MoneyActionIcon text="Create Budget" icon={<AddToQueueIcon fontSize="large" />} />
            <MoneyActionIcon text="Create Goals" icon={<AddToQueueIcon fontSize="large" />} />
            <MoneyActionIcon text="View Budgets and Goals" icon={<AttachMoneyIcon fontSize="large" />} />
            <a href='/budget/expense'><MoneyActionIcon text="Expense Tracker" icon={<AttachMoneyIcon fontSize="large" />} /></a>
          </Grid>

              {/* Expense Tracker*/}
              <Grid item xs={12}>
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
                  <Typography fontWeight={700} fontFamily='ITC Benguiat Std' letterSpacing={1} variant='h5'>
                    Expense Tracker
                  </Typography>
                 

                <List>
              
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={ 'Secondary text'}
                  />
                </ListItem>,
            
            </List>
                  
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}