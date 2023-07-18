import React, { FC, useContext } from 'react'
import { sidebarMenus } from '@/types/types'
import AppContext from '@/context/AppContext';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const Sidebar: FC = () => {
  const appContext = useContext(AppContext);
  const {drawerOpen, handleDrawerClose} = appContext;

  const sidebarMenus: sidebarMenus[] = [
    {id: 'dashboard', label: 'Dashboard', value: '/'},
    {id: 'profile', label: 'Profile', value: '/profile'},
    {id: 'myacount', label: 'My Acount', value: '/acount'},
    {id: 'portfolio', label: 'Portfolio', value: '/portfolio'},
    {id: 'message', label: 'Message', value: '/message'},
  ]

  return (
    <aside>
      <Drawer
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <div className='flex items-center justify-end h-20 bg-gray-600 px-2'>
          <IconButton onClick={handleDrawerClose} sx={{ color: '#FFF' }}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className='bg-gray-50 flex-grow'>
          {sidebarMenus.map((menu) => (
            <ListItem key={menu.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <Link href={menu.value}>{menu.label}</Link>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </aside>
  )
}

export default Sidebar