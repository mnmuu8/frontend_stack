import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { sidebarMenus } from '@/types/utils';
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import FeedIcon from '@mui/icons-material/Feed';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MessageIcon from '@mui/icons-material/Message';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import TeamList from '../molecules/TeamList';
import OutputIcon from '@mui/icons-material/Output';

const Sidebar: FC = () => {
  const appContext = useContext(AppContext);
  const { drawerArea, handleDrawerAreaToggle } = appContext;

  const sidebarMenus: sidebarMenus[] = [
    { id: 'dashboard', label: 'ダッシュボード', value: '/', icon: <DashboardIcon sx={{ color: "#DDDDDD", mr: 1 }} fontSize='small' /> },
    { id: 'timeline', label: 'タイムライン', value: '/timeline', icon: <FeedIcon sx={{ color: "#DDDDDD", mr: 1 }} fontSize='small' /> },
    { id: 'mypage', label: 'マイページ', value: '/mypage', icon: <AccountCircleIcon sx={{ color: "#DDDDDD", mr: 1 }} fontSize='small' /> },
    { id: 'portfolio', label: 'ポートフォリオ', value: '/portfolio', icon: <CastForEducationIcon sx={{ color: "#DDDDDD", mr: 1 }} fontSize='small' /> },
    { id: 'message', label: 'メッセージ', value: '/message', icon: <MessageIcon sx={{ color: "#DDDDDD", mr: 1 }} fontSize='small' /> },
    { id: 'outputs', label: 'アウトプット', value: '/outputs', icon: <OutputIcon sx={{ color: "#DDDDDD", mr: 1 }} fontSize='small' /> },
  ];
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className='w-0 h-full'>
      <Drawer
        sx={{
          width: 240,
          '& .MuiDrawer-paper': {
            width: 240,
            top: 60
          },
        }}
        variant='persistent'
        anchor='left'
        open={drawerArea}
      >
        <div className='bg-gray-700 h-full'>
          <List>
            {sidebarMenus.map((menu) => (
              <ListItem key={menu.id} disablePadding sx={isActive(menu.value) ? { backgroundColor: '#222222' } : {}}>
                <ListItemButton >
                  {menu.icon}
                  <Link href={menu.value} className='text-sm text-gray-200'>{menu.label}</Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider className='bg-gray-500' />
          <TeamList />
        </div>
      </Drawer>
    </aside>
  );
};

export default Sidebar;
