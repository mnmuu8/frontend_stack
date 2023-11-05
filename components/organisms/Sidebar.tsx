import React, { FC, useContext } from 'react'
import { sidebarMenus } from '@/types/utils'
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FeedIcon from '@mui/icons-material/Feed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import TeamList from '../molecules/TeamList';
import OutputIcon from '@mui/icons-material/Output';

const Sidebar: FC = () => {
  const appContext = useContext(AppContext);
  const {drawerOpen, handleDrawerClose} = appContext;

  const sidebarMenus: sidebarMenus[] = [
    {id: 'dashboard', label: 'ダッシュボード', value: '/', icon: <DashboardIcon />},
    {id: 'timeline', label: 'タイムライン', value: '/timeline', icon: <FeedIcon />},
    {id: 'mypage', label: 'マイページ', value: '/mypage', icon: <AccountCircleIcon />},
    {id: 'portfolio', label: 'ポートフォリオ', value: '/portfolio', icon: <CastForEducationIcon />},
    {id: 'message', label: 'メッセージ', value: '/message', icon: <MessageIcon />},
    {id: 'outputs', label: 'アウトプット', value: '/outputs', icon: <OutputIcon />},
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
        <div className='bg-gray-50 flex-grow'>
          <List>
            {sidebarMenus.map((menu) => (
              <ListItem key={menu.id} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {menu.icon}
                  </ListItemIcon>
                  <Link href={menu.value}>{menu.label}</Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <TeamList />
        </div>
      </Drawer>
    </aside>
  )
}

export default Sidebar
