'use client';

// components/SimpleMenu.tsx
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import PersonOutline from '@mui/icons-material/PersonOutline';
import LocalShipping from '@mui/icons-material/LocalShipping';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';

const SimpleMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (route: string) => {
    router.push(route);
    handleClose();
  };

  // {authStatus === 'signedIn' && <LogoutButton />}

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <PersonOutline
          fontSize="medium"
          style={{
            verticalAlign: 'bottom',
            paddingBottom: 1,
          }}
          color="secondary"
        />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            padding: '10px',
          },
        }}
      >
        <MenuItem onClick={() => handleNavigate('/order-tracking')}>
          <ListItemIcon>
            <LocalShipping fontSize="small" />
          </ListItemIcon>
          Order Tracking
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/auth')}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Login/Register
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/another-route')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Another Option
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SimpleMenu;
