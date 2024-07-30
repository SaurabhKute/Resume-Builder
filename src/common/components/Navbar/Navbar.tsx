import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import './style.css';
import ConfirmationModal from '../ConfirmationPopover/ConfirmationPopover';

export default function Navbar() {
  const [auth, setAuth] = useState(true);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLoginClick = () => {
    console.log("function called");
    setAuth(true);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    setAuth(false);
    setConfirmationOpen(true);
  };

  const handleCloseLogout = () =>{
setConfirmationOpen(false);
  }
  const handleConfirmLogout = () =>{
    setConfirmationOpen(false);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='navbar'>
        <Toolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
        Resume Builder
      </Typography>
      <Typography sx={{ color: 'gray', margin: '0 22px',fontWeight:'light'  }}>&#x7c;</Typography>
    </div>
    <Typography sx={{fontSize:'16px',display:'inline-block', mt:'18px', fontWeight:'light', color:'#f0f3f5' }}>Dashboard
    <Typography   component="span" sx={{ border: '2px solid white', display: 'block', mt: '10px', borderColor:'#20d761' }}></Typography>
    </Typography>
    

          {auth ? (
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleLogout}
              >
               
                {/* <MenuItem onClick={handleLogout}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ):(
            <div style={{ display: 'flex', marginLeft: 'auto', justifyContent: 'space-between' }}>
      <Button variant="contained" size="small" className='login-btn' sx={{mr:'20px', backgroundColor:'#fff', color:'black', fontFamily:'unset'}} onClick={handleLoginClick}>Log In</Button>
      <Button variant="contained" size="small" className='signup-btn' sx={{ backgroundColor:'#068932', color:'#fff', fontFamily:'unset'}} >Sign Up</Button>
    </div>
          )}
        </Toolbar>
      </AppBar>
      <ConfirmationModal
        open={confirmationOpen}
        onClose={handleCloseLogout}
        onConfirm={handleConfirmLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout ?"
        buttonText1 = "No"
        buttonText2 = "Logout"
        buttonColor2='error'
      />
    </Box>
    
  );
}
