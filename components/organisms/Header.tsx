import React, { FC, useContext } from 'react';
import Link from 'next/link';
import noProfile from '../../public/noprofile.png'
import { useUser } from '@auth0/nextjs-auth0/client';
import ImageWrapper from '../atoms/ImageWrapper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AppContext from '@/context/AppContext';

const Header: FC = () => {
  const { user, error, isLoading } = useUser();
  const appContext = useContext(AppContext);
  const { drawerOpen, handleDrawerOpen } = appContext;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const headerStyle: React.CSSProperties = {
    width: appContext.drawerOpen ? 'calc(100% - 240px)' : '',
    left: appContext.drawerOpen ? 'auto' : 0,
  }

  if (user) {
    return (
      <header className='fixed top-0 left-0 right-0' style={headerStyle} >
        <div className='flex justify-between items-center h-20 px-8 shadow-md'>
          <div className='flex items-center'>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <div className='font-mono font-bold text-2xl mr-8'>Skill_Climbing</div>
            <div className='flex items-center'>
              <input className='h-8 bg-gray-100 mr-2 rounded p-2 text-xs' type="text" placeholder='キーワードを入力' />
              <IconButton>
                <SearchIcon />
              </IconButton>
            </div>
          </div>
          <div className='flex items-center'>
            {user.picture ? (
              <ImageWrapper src={user.picture!} height={50} width={50} alt={user.name!} className='rounded-full mr-4' />
            ) : (
              <ImageWrapper src={noProfile as any} height={50} width={50} alt={user.name!} className='rounded-full mr-4' />
            )}
            <div className='mr-2'>
              <span className='block text-sm'>{user.name}</span>
              <span className='block text-sm'>{user.email}</span>
            </div>
            <IconButton onClick={handleClick}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
        </div>

        <Menu
          anchorEl={anchorEl}
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
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            <Link href="/api/auth/logout">Logout</Link>
          </MenuItem>
        </Menu>
      </header>
    );
  }

  return (
    <header className='fixed top-0 left-0 right-0'>
      <div className='flex justify-between items-center h-20 px-8 shadow-md'>
        <div className=''>
          <div className='font-mono font-bold text-2xl mr-8'>Skill_Climbing</div>
        </div>
        <div className=''>
          <Link href="/api/auth/login">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;