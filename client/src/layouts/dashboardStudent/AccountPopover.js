import { Icon } from '@iconify/react';
import { useRef, useState,useContext } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import { useNavigate } from "react-router-dom";
import account from '../../_mocks_/account';
import {UserContext} from '../../App';
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom";

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/student/app'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/student/profile'
  },
  {
    label: 'Lock Profile',
    icon: lockFill,
    linkTo: '/lock'
  },
  {
    label: 'Reset Password',
    icon: settings2Fill,
    linkTo: '/resetPassword'
  }
  
];

export default function AccountPopover({data}) {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const {state,dispatch} = useContext(UserContext);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // console.log(account);
  const logout = () =>{

    let user_data =  window.sessionStorage.getItem("Logged_in_as");
      
    let final_data = user_data.slice(3)
    let url = "";
    switch(final_data){
      case 'Admin':
            url = "https://apni-coaching-server.herokuapp.com/admin/logout";
         break;

      case 'Student':
           url = "https://apni-coaching-server.herokuapp.com/student/logout"
        break;
      case 'Teacher':

        break;

      case 'Parent':

        break;

      default:


    }

    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        token:Cookies.get('token')
      })
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      if(data.status === 200) {
        // sessionStorage.clear();
        Cookies.remove('token');
        
        dispatch({type:'USER',payload:{state : false , logged_in_as : final_data}})
        toast.success("Logout Sucessfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        navigate("/",{replace:true});
        
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error("An Error Occurred!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        navigate("/500",{replace:true});
    });
  }
 
  const lockProfile = () =>{
    sessionStorage.setItem('islocked', true);
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={data.photoURL} alt="photoURL" />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {data.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {data.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick = {logout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
      <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      />
                      
                <ToastContainer />
    </>
  );
}
