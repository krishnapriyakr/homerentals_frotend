import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
// import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import LuggageSharpIcon from '@mui/icons-material/LuggageSharp';
import BeenhereIcon from '@mui/icons-material/Beenhere'; import Logout from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import CabinOutlinedIcon from '@mui/icons-material/CabinOutlined';
// import Profile from './Profile';

function Header() {
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };



  const handleLogout = () => {
    sessionStorage.removeItem('token')
    navigate('/')
    // alert('You have been successfully logged out!');
     }
  
  return (
    
      <>
          <div className='header' >
          <Navbar style={{width:"100%"}}>
        <Container fluid>
            <Navbar.Brand href="">
            <Link to={'/explore'} style={{textDecoration:"none",color:'white',fontFamily:'-moz-initial',fontSize:'30px'}}> <b> &nbsp;&nbsp;&nbsp;  Home Rentals </b>  </Link>
            </Navbar.Brand>
            
            {/* <Link to={'/login'}> <button className='btn align-item-end border text-white' >Log in</button> </Link> */}

            
            <Box sx={{ display: 'flex', alignItems: 'end', textAlign: 'center'  }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 35, height: 35 }}></Avatar>
          </IconButton>
        </Tooltip>
            </Box>
            
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} className='d-flex justify-content-start  align-items-start'> 
        <ListItemIcon>
          
        &nbsp;&nbsp;  <HomeIcon fontSize="small" />
                  </ListItemIcon>
                  <Link to={'/explore'} style={{ color: 'gray',textDecoration:'none' }}> &nbsp;Home</Link> 
          </MenuItem>

              <MenuItem onClick={handleClose}>
          <ListItemIcon>
          &nbsp;&nbsp;  <AddIcon fontSize="small" />
                </ListItemIcon>
                <Link to={'/upload'} style={{color:'gray',textDecoration:'none'}}>Add Property</Link>
         
              </MenuItem>
              
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
        &nbsp;&nbsp;    <FavoriteBorderIcon  />
                  <Link to={'/wishlist'} style={{ color: 'gray',textDecoration:'none' }}>&nbsp; Wishlist</Link>
                  </ListItemIcon>
              </MenuItem>
              
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          &nbsp;&nbsp;  <LuggageSharpIcon fontSize="small" />
          </ListItemIcon>
         <Link to={'/trip'} style={{color:'gray',textDecoration:'none'}}>Trip List </Link>
              </MenuItem>
              
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
          &nbsp;&nbsp; <BeenhereIcon fontSize="small" />
          </ListItemIcon>
          <Link to={'/property'} style={{color:'gray',textDecoration:'none'}}>Property List  </Link>
              </MenuItem>

                <button   onClick={handleLogout}  className='btn transparent d-flex justify-content-start align-items-start mx-2  text-align-start' >
                  {/* onClick={handleLogout}  */}
                <MenuItem onClick={handleClose} style={{ paddingLeft: '6px', color:'gray'}}>
          <ListItemIcon >
              <Logout fontSize="small" />
          </ListItemIcon>
          Logout 
          </MenuItem>
              </button>
      </Menu>
            
        </Container>
      </Navbar>
    </div>
        </ >
  )
}

export default Header