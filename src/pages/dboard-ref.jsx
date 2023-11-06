import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import Alert from '@mui/material/Alert';


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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

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
  const toggleDrawer = () => {
    setOpen(!open);
  };


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
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              fontFamily='ITC Benguiat Std'
              fontWeight={700}
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Welcome, User!
            </Typography>
            <Typography>Logout</Typography>
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
              {/* Chart */}
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
                    Php 0.00 {/*Insert balance here*/}
                  </Typography>
                </Paper>
              </Grid>


          {/* Create Budget, Create Goals, View Budget & Goals, Expense Tracker ICONS */}
          <Grid item xs={12} md={4} lg={6} sx={{p: 3, display: 'flex', flexWrap: 'wrap'}}>
            <MoneyActionIcon text="Create Budget" icon={<AddToQueueIcon fontSize="large" />} />
            <MoneyActionIcon text="Create Goals" icon={<AttachMoneyIcon fontSize="large" />} />
            <MoneyActionIcon text="View Budgets and Goals" icon={<AttachMoneyIcon fontSize="large" />} />
            <a href='/expense'><MoneyActionIcon text="Expense Tracker" icon={<AttachMoneyIcon fontSize="large" />} /></a>
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