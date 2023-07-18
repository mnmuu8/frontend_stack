import React, { FC, useContext } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import AppContext from '@/context/AppContext';
import SearchBox from '../molecules/SearchBox';
import UserProfile from '../molecules/UserProfile';
import HeaderMenu from '../uikit/HeaderMenu';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';

const Header: FC = () => {
  const appContext = useContext(AppContext);
  const { drawerOpen, handleDrawerOpen, handleMenuOpen } = appContext;
  
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const headerStyle: React.CSSProperties = {
    width: appContext.drawerOpen ? 'calc(100% - 240px)' : '',
    left: appContext.drawerOpen ? 'auto' : 0,
  }

  if (user) {
    return (
      <header className='fixed top-0 left-0 right-0 bg-white' style={headerStyle} >
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
            <SearchBox />
          </div>
          <div className='flex items-center'>
            <UserProfile user={user} />
            <IconButton onClick={handleMenuOpen}>
              <KeyboardArrowDownIcon />
            </IconButton>
          </div>
        </div>
        <HeaderMenu />
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