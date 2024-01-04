import React, { FC, useContext } from 'react';
import { useRouter } from 'next/router';
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
import TeamList from '@/features/teams/components/TeamList';
import OutputIcon from '@mui/icons-material/Output';

const ACTIVE_STYLE = {
  backgroundColor: '#222222',
};
const SX = {
  color: '#DDDDDD',
  mr: 1,
};
const FONT_SIZE = 'small';

const Sidebar: FC = () => {
  const { drawerArea } = useContext(AppContext);
  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', value: '/', icon: <DashboardIcon sx={SX} fontSize={FONT_SIZE} /> },
    { id: 'timeline', label: 'タイムライン', value: '/timeline', icon: <FeedIcon sx={SX} fontSize={FONT_SIZE} /> },
    { id: 'profile', label: 'プロフィール', value: '/profile', icon: <AccountCircleIcon sx={SX} fontSize={FONT_SIZE} /> },
    {
      id: 'portfolio',
      label: 'ポートフォリオ',
      value: '/portfolio',
      icon: <CastForEducationIcon sx={SX} fontSize={FONT_SIZE} />,
    },
    { id: 'message', label: 'メッセージ', value: '/message', icon: <MessageIcon sx={SX} fontSize={FONT_SIZE} /> },
    { id: 'outputs', label: 'アウトプット', value: '/outputs', icon: <OutputIcon sx={SX} fontSize={FONT_SIZE} /> },
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
            top: 60,
          },
        }}
        variant='persistent'
        anchor='left'
        open={drawerArea}
      >
        <List className='bg-gray-700 h-full'>
          {menuItems.map((menu) => (
            <ListItem key={menu.id} disablePadding sx={isActive(menu.value) ? ACTIVE_STYLE : {}}>
              <ListItemButton>
                {menu.icon}
                <Link href={menu.value} className='text-sm text-gray-200'>
                  {menu.label}
                </Link>
              </ListItemButton>
            </ListItem>
          ))}
          <Divider className='bg-gray-500' />
          <TeamList />
        </List>
      </Drawer>
    </aside>
  );
};

export default Sidebar;
