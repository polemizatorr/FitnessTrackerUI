import React from 'react';
import styles from './TopNavigation.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authActions';



const TopNavigation = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const username = useSelector(state => state.auth.username);

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logout());
    navigate('/login');
  }

  return (
  <div className={styles.TopNavigation}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        {
          isAuthenticated ? (<p>Welcome {username}</p>) : ('')
        }
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

            <Menu
            id="dropdown-menu"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
            <MenuItem onClick={() => navigate('/contact')}>Contact</MenuItem>
          </Menu>
          
            
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>

        {
          isAuthenticated ? (<Button color="inherit" onClick={() => {handleLogout()}}> Logout</Button>)
          : (<Button color="inherit" onClick={() => {handleLogin()}}> Login</Button>)  
        }
          
          
        </Toolbar>
      </AppBar>
    </Box>
  </div>
  )
};



TopNavigation.propTypes = {};

TopNavigation.defaultProps = {};

export default TopNavigation;
