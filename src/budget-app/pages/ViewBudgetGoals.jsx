import React, {useEffect, useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, IconButton, DialogTitle, TextField } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HouseIcon from '@mui/icons-material/House';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import MoreIcon from '@mui/icons-material/More';
import HelpIcon from '@mui/icons-material/Help';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { DeleteBudget, GetBudgets } from './store/budgetstore';


const StyledButton = styled(Button)({
  color: 'white',
  backgroundColor: '#4CAF50', // Bright green color
  '&:hover': {
    backgroundColor: '#388E3C', // Darker green on hover
  },
});

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



export default function ViewBudgetGoals() {
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

    retrieveBudgetList();
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

  const [budgetList, setBudgetList] = useState([]);
  const retrieveBudgetList = () => {
    const loggedIn = storedUserInfo.email;
    setBudgetList(GetBudgets(loggedIn));
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

  const handleDeleteBudget = (index) => {
    
    // Retrieve the email of the logged-in user
    const loggedIn = storedUserInfo.email;

    DeleteBudget(loggedIn, index);

    setBudgetList(GetBudgets(loggedIn))

  };

  const handleBackToDashboard = () => {
    window.location.href = '/budget/dashboard';
  };

  return (
    <div>
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
          Budget Tracker
        </Typography>

        {budgetList.length === 0 ? (
          <Typography padding="20px" color="gray" fontStyle="italic" textAlign="center">List is empty. Click on the "<AttachMoneyIcon /> Add Budget" to create budget list</Typography>
        ) : (
      <div style={{ overflowY: 'scroll', maxHeight: '440px' }}>
        {/* Budget List */}
        <List>
          {budgetList.map((budget, index) => {
            let formattedAmt = parseFloat(budget.budgetAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            let categoryIcon;
            switch (budget.budgetCategory) {
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


                  primary={budget.budgetName}
                  //secondary={expense.expenseDesc}


                />

                <ListItemText
                  primary={"PHP " + formattedAmt }

                  secondary={budget.budgetstartDate}
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
                  onClick={() => handleDeleteBudget(index)}
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
          Goal Tracker
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
            </Grid>
    </div>

  );
}

