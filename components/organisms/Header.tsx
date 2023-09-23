import React, { FC, useContext } from 'react';
import AppContext from '@/context/AppContext';
import SearchBox from '../molecules/SearchBox';
import UserProfile from '../molecules/UserProfile';
import HeaderMenu from '../uikit/HeaderMenu';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { UserProps } from '../../types/types';
import { siteTitle } from '@/config';

const Header: FC<UserProps> = ({ user }) => {
  const appContext = useContext(AppContext);
  const { drawerOpen, handleDrawerOpen, handleMenuOpen, sessionUser } = appContext;

  const headerStyle: React.CSSProperties = {
    width: appContext.drawerOpen ? 'calc(100% - 240px)' : '',
    left: appContext.drawerOpen ? 'auto' : 0,
  }
  
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
          <div className='font-mono font-bold text-2xl mr-8'>{siteTitle}</div>
          <SearchBox />
        </div>
        <div className='flex items-center'>
          <UserProfile user={sessionUser} height={50} width={50} isHeader={true} />
          <IconButton onClick={handleMenuOpen}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>
      </div>
      <HeaderMenu />
    </header>
  );

};

export default Header;