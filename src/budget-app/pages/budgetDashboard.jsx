import React, {useEffect, useState} from 'react';
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
import LogoutIcon from '@mui/icons-material/Logout';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HouseIcon from '@mui/icons-material/House';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MoreIcon from '@mui/icons-material/More';
import HelpIcon from '@mui/icons-material/Help';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Italic } from 'lucide-react';



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

const StyledButton = styled(Button)({
  color: 'white',
  backgroundColor: '#4CAF50', // Bright green color
  '&:hover': {
    backgroundColor: '#388E3C', // Darker green on hover
  },
});

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

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#FFB946',
      fontWeight: 400,
    },
    secondary: {
      main: '#F3F2E9',
    },
  },
  typography: {
    fontFamily:'Poppins'
  },
});

function MoneyActionIcon(props) {
  const { text, icon } = props;
  return (
    <Paper
      sx={{
        p: 2,
        m:0.5,
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

function EditExpenseModal({ expense, onUpdate, onCancel }) {
  const [editedFields, setEditedFields] = useState(expense);

  const handleChange = (e) => {
    setEditedFields({
      ...editedFields,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open>
      <DialogTitle>Edit Expense</DialogTitle>
      <DialogContent display="flex">
      <InputLabel id="expenseTitle">Expense Title</InputLabel>
        <TextField
          name="expenseTitle"
          value={editedFields.expenseTitle}
          onChange={handleChange}
          inputProps={{ maxLength: 20 }}
        />

        <InputLabel id="expenseCategory">Category</InputLabel>
        <Select labelId="Category" name="expenseCategory" id="Category" value={editedFields.expenseCategory} fullWidth label="Category" onChange={handleChange}>
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


        <InputLabel id="expenseDate">Date</InputLabel>

        <TextField
          name="expenseDate"
          type="date" // Assuming expenseDate is a date field
          value={editedFields.expenseDate}
          onChange={handleChange}
        />

      <InputLabel id="expenseAmount">Amount</InputLabel>

        <TextField
          name="expenseAmount"
          type="number" // Assuming expenseAmount is a number field
          value={editedFields.expenseAmount}
          onChange={handleChange}
        />

        <InputLabel id="expenseDesc">Description</InputLabel>

        <TextField
          name="expenseDesc"
          value={editedFields.expenseDesc}
          onChange={handleChange}
          multiline
          rows={4}
          inputProps={{ maxLength: 80}}
          sx={{ width: '100%' }}

        />
      </DialogContent>

      <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onUpdate(editedFields)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}



export default function Dashboard() {
  const storedUserInfo = JSON.parse(localStorage.getItem("user-info"));
  const updatedAcctBalance = storedUserInfo.acctBalance;
  //update balance
  const [editExpense, setEditExpense] = useState(null);

  const [open, setOpen] = React.useState(false);
  const [firstName, setFirstName] = React.useState('User');
  const [acctBalance, setAcctBalance] = React.useState('0.00');

  const [openModal, setOpenModal] = useState(false);
  const [balanceToAdd, setBalanceToAdd] = useState('');

  const handleEditExpense = (expense) => {
    setEditExpense(expense);
  };

  const handleUpdateExpense = (updatedExpense) => {
  // Find the expense to be updated in the expenseList
  const updatedExpenseList = expenseList.map((expense, index) => {
    if (index === selectedIndex) {
      return updatedExpense; // Replace the expense with the updated one
    }
    return expense;
  });

  // Update the state with the modified expense list
  setExpenseList(updatedExpenseList);

  // Retrieve the email of the logged-in user
  const loggedIn = storedUserInfo.email;

  // Update the local storage with the modified expense list
  localStorage.setItem(loggedIn, JSON.stringify(updatedExpenseList));

  setEditExpense(null); // Clear the edited expense state
};


  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

const [confirmationOpen, setConfirmationOpen] = useState(false);
const [selectedIndex, setSelectedIndex] = useState(0);

const handlePayNow = (index) => {
  setSelectedIndex(index); // Set the selected expense index
  setConfirmationOpen(true); // Open the confirmation dialog
};

const handleConfirmPayNow = () => {
  setConfirmationOpen(false); // Close the confirmation dialog

  const selectedExpense = expenseList[selectedIndex];

  if (storedUserInfo && typeof storedUserInfo.acctBalance === 'number') {
    const newBalance = storedUserInfo.acctBalance - selectedExpense.expenseAmount;

    storedUserInfo.acctBalance = newBalance;
    localStorage.setItem("user-info", JSON.stringify(storedUserInfo));

    setAcctBalance(newBalance);
    handleDeleteExpense(selectedIndex);
  }
};

const handleCancelPayNow = () => {
  setConfirmationOpen(false); // Close the confirmation dialog
};


const handleAddBalance = () => {
  const storedUserInfo = JSON.parse(localStorage.getItem('user-info'));
  const userBalanceBanking = JSON.parse(localStorage.getItem('users'));

  if (storedUserInfo && userBalanceBanking) {
    const userInfoEmail = storedUserInfo.email;

    const userIndex = userBalanceBanking.findIndex(user => user.email === userInfoEmail);

    if (userIndex !== -1) {
      const user = userBalanceBanking[userIndex];
      const newBalance = user.amount - parseFloat(balanceToAdd);
      // const newDashboardBalance = user.amount - parseFloat(balanceToAdd);
      const newDashboardBalance = storedUserInfo.acctBalance + parseFloat(balanceToAdd);

      // Update the 'user-info' key in local storage
      storedUserInfo.acctBalance = newDashboardBalance;
      localStorage.setItem('user-info', JSON.stringify(storedUserInfo));

      // Update the 'users' key in local storage
      userBalanceBanking[userIndex].amount = newBalance;
      localStorage.setItem('users', JSON.stringify(userBalanceBanking));

      // Update the state with the new balance
      setAcctBalance(newBalance);
      handleCloseModal();
    }
  }
};

  useEffect(() => {
    const storedBalance = localStorage.getItem("acctBalance");
    const userInfo = JSON.parse(localStorage.getItem("user-info"));

    if (storedBalance) {
      const formattedBalance = parseFloat(storedBalance).toFixed(2);
      setAcctBalance(formattedBalance);
    }

    if (userInfo && userInfo.firstName) {
      setFirstName(userInfo.firstName);
    }
    //displays expense list
    retrieveExpenseList();
  }, []); 

  const [expenseList, setExpenseList] = useState([]);

  const retrieveExpenseList = () => {
    const loggedIn = storedUserInfo.email;
    const expenseDataString = localStorage.getItem(loggedIn);

    if (expenseDataString) {
      const existingExpenseData = JSON.parse(expenseDataString);
      setExpenseList(existingExpenseData);
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenseList = [...expenseList];

    // Remove the expense at the specified index from the copied list
    updatedExpenseList.splice(index, 1);

    // Update the state with the modified list (removed item)
    setExpenseList(updatedExpenseList);

    // Retrieve the email of the logged-in user
    const loggedIn = storedUserInfo.email;

    // Update the local storage with the modified expense list
    localStorage.setItem(loggedIn, JSON.stringify(updatedExpenseList));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', 
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
              Logo
            </Typography>
            <a href="/landing-page">
            <Button color="inherit">
              <LogoutIcon /> Sign Out
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
             {/* User greeting and account balance */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={8} lg={6}>
              <Typography
              fontFamily='ITC Benguiat Std'
              fontWeight={700}
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 , paddingTop:4}}
            >
              Welcome, {firstName}!
            </Typography>
                <Paper
                  sx={{
                    p: 4 ,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    minWidth: '400px',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    justifyContent: 'center',
                    boxShadow: '4px 4px 1px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  {/* Account Balance component */}
                  <Typography  fontWeight={700} fontFamily='ITC Benguiat Std' letterSpacing={1} variant='h5'>
                    Account Balance
                  </Typography>
                  <Typography variant="h2" fontSize={40} fontWeight={700} color={updatedAcctBalance < 0 ? 'red' : 'inherit'}>
                  PHP {parseFloat(updatedAcctBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}  {/* Add Balance Icon */}
                    <IconButton display="flex" flexWrap="wrap" onClick={handleOpenModal}>
                      <AddCircleIcon />
                    </IconButton>



                    <Dialog open={openModal} onClose={handleCloseModal}>
                      <DialogTitle>Cash In</DialogTitle>
                        <DialogContent>
                          <TextField
                            autoFocus
                            label="Enter Amount"
                            marginTop="3px"
                            fullWidth
                            value={balanceToAdd}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              // Allow only positive numbers
                              if (!isNaN(inputValue) && inputValue >= 0) {
                                setBalanceToAdd(inputValue);
                              }
                            }}
                          />
                        </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseModal} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleAddBalance} color="primary">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </Typography> 
                </Paper>
              </Grid>


          {/* Create Budget, Create Goals, View Budget & Goals, Expense Tracker ICONS */}
          <Grid item xs={12} md={4} lg={6} sx={{ marginTop:8,display: 'flex' , justifyContent:'center', alignItems: 'center', textAlign:'center' }}>

          <a href='#' id="icon-design">
            <MoneyActionIcon text="Create Budget" icon={<AddToQueueIcon fontSize="large" />} sx={{ flexBasis: '100%', maxWidth: '100%'}} />
          </a>
          <a href='#'>
            <MoneyActionIcon text="Create Goals" icon={<EditNoteIcon fontSize="large" />} sx={{ flexBasis: '100%', maxWidth: '100%' }} />
          </a>
          <a href='#'>
          <MoneyActionIcon text="Budgets & Goals" icon={<AnalyticsIcon fontSize="large" />} sx={{ flexBasis: '100%', maxWidth: '100%' }} />
          </a>
          <a href='/budget/expense'>
            <MoneyActionIcon text="Add Expense" icon={<AttachMoneyIcon fontSize="large" />} sx={{ flexBasis: '100%', maxWidth: '100%' }} />
          </a>
          </Grid>

              {/* Expense Tracker*/}
              <Grid item xs={12}>
              <Paper
                  sx={{
                    p: 4 ,
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '500px',
                    minHeight: '190px',
                    height: 'relative',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    boxShadow: '4px 4px 1px rgba(0, 0, 0, 0.9)',
                  }}
                >
                  <Typography fontWeight={700} fontFamily='ITC Benguiat Std' letterSpacing={1} variant='h5'>
                    Expense Tracker
                  </Typography>

                  {expenseList.length === 0 ? (
                    <Typography padding="20px" color="gray" fontStyle="italic" textAlign="center">List is empty. Click on the "<AttachMoneyIcon /> Add Expense" to create expense list</Typography>
                  ) : (
                <div style={{ overflowY: 'scroll', maxHeight: '440px' }}>
                  {/* Expense List */}
                  <List>
                    {expenseList.map((expense, index) => {
                      let formattedAmt = parseFloat(expense.expenseAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      let categoryIcon;
                      switch (expense.expenseCategory) {
                        case 'Food & Drinks':
                          categoryIcon = <FastfoodIcon />;
                          break;
                        case 'Shopping':
                          categoryIcon = <ShoppingBagIcon />;
                          break;
                        case 'Housing':
                          categoryIcon = <HouseIcon />;
                          break;
                        case 'Transportation':
                          categoryIcon = <DirectionsCarIcon />;
                          break;
                        case 'Life & Entertainment':
                          categoryIcon = <NightlifeIcon />;
                          break;
                        case 'Others':
                          categoryIcon = <MoreIcon />;
                          break;
                        default:
                          categoryIcon = <HelpIcon />;
                          break;
                      }

                      return (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar>
                              {categoryIcon}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primaryTypographyProps={{
                              style: {
                                fontWeight: 'bold',
                                maxWidth: '180px', // Adjust this value as needed
                                minWidth: '100px', // Adjust this value as needed
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }
                            }}

                            secondaryTypographyProps={{
                              style: {
                                maxWidth: '150px', // Adjust this value as needed
                                minWidth: '100px', // Adjust this value as needed
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }
                            }}


                            primary={expense.expenseTitle}
                            secondary={expense.expenseDesc}


                          />

                          <ListItemText
                            primary={"PHP " + formattedAmt }

                            secondary={expense.expenseDate}
                            primaryTypographyProps={{ style: { fontWeight: 'bold', color: 'red'} }}
                          />


                              <StyledButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => handlePayNow(index)}
                                sx={{
                                  '& .MuiButton-label': {
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingRight: '10px',
                                  },
                                }}
                              >
                                <PriceCheckIcon /> Pay Now
                              </StyledButton>

                              <IconButton 
                                edge="end"
                                aria-label="edit" 
                                onClick={() => handleEditExpense(expense)}>
                                <ModeEditIcon />  
                              </IconButton>

                              {/* Render EditExpenseModal */}
                                {editExpense && (
                                  <EditExpenseModal
                                    expense={editExpense}
                                    onUpdate={handleUpdateExpense}
                                    onCancel={() => setEditExpense(null)}
                                  />
                                )}

                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => handleDeleteExpense(index)}
                          >
                            <DeleteIcon />
                          </IconButton>


                        </ListItem>
                      );
                    })}
                  </List>

                  </div>
    )}

              <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
                  <DialogTitle>Confirm Payment</DialogTitle>
                      <DialogContent>
                        <Typography variant="body1">
                             Are you sure you want to pay this expense?
                        </Typography>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCancelPayNow} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleConfirmPayNow} color="primary">
                          Confirm
                        </Button>
                      </DialogActions>
               </Dialog>
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