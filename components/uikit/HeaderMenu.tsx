import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { AppContext } from '@/context/AppContext';
import { SessionContext } from '@/context/SessionContext';
import axios from 'axios';

const HeaderMenu: FC = () => {
  const appContext = useContext(AppContext);
  const { anchorEl, handleMenuClose } = appContext;

  const sessionContext = useContext(SessionContext);
  const { setSessionUser } = sessionContext;

  const open = Boolean(anchorEl);
  const router = useRouter();

  const LogoutUser = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('session');
      setSessionUser(undefined);

      router.push('/login');
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
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
            '&:before': {
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
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          設定
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          <div onClick={LogoutUser}>ログアウト</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default HeaderMenu;
