import React from 'react';
import { IconButton } from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/store';
import { userSignedOut } from '../../../redux/userSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onLogout = async () => {
    await signOut();
    navigate('/');
    dispatch(userSignedOut());
  };

  return (
    <IconButton aria-label="Logout user" color="inherit" component={Link} to="/" onClick={onLogout}>
      <LogoutIcon
        fontSize="medium"
        // color="black"
        style={{ verticalAlign: 'bottom', paddingBottom: 1 }}
      />
    </IconButton>
  );
};

export default LogoutButton;
