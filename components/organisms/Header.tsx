import React, { FC, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import HeaderMenu from '../uikit/HeaderMenu';
import ImageWrapper from '../atoms/ImageWrapper';
import FormModal from '../molecules/FormModal';
import { FormType } from '@/types/form';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Header: FC = () => {
  const appContext = useContext(AppContext);
  const { handleDrawerAreaToggle, handleMenuOpen } = appContext;

  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const handleFormOpen = (formType: FormType) => {
    setFormOpen(true);
    setFormType(formType);
  };

  const USER_PROFILE_HEIGHT = 30;
  const USER_PROFILE_WIDTH = 30;
  const USER_PROFILE_SRC_PATH =
    sessionUser && sessionUser.profile_image_path !== null ? sessionUser.profile_image_path : '/no_image.png';
  const USER_PROFILE_NAME = sessionUser && sessionUser.name !== null ? sessionUser.name : 'noname';

  return (
    <header className='bg-gray-700 h-[60px] border-b-[1px] border-gray-500'>
      <div className='flex justify-between items-center h-full px-4'>
        <div className='flex items-center'>
          <IconButton onClick={handleDrawerAreaToggle}>
            <MenuIcon className='text-white' />
          </IconButton>
          <div
            className='flex items-center border border-gray-500 rounded-full py-1 pl-1 pr-2 cursor-pointer hover:bg-opacity-75'
            onClick={() => handleFormOpen('createStack')}
          >
            <AddIcon className='rounded-full bg-red-500 text-gray-50' fontSize='small' />
            <div className='text-sm text-gray-50 ml-1'>作成</div>
          </div>
        </div>
        <div className='flex items-center cursor-pointer' onClick={handleMenuOpen}>
          {sessionUser && (
            <ImageWrapper
              src={USER_PROFILE_SRC_PATH}
              height={USER_PROFILE_HEIGHT}
              width={USER_PROFILE_WIDTH}
              alt={USER_PROFILE_NAME}
              className='rounded-full'
            />
          )}
          <KeyboardArrowDownIcon fontSize='small' sx={{ color: '#DDDDDD' }} />
        </div>
      </div>
      <HeaderMenu />
      <FormModal />
    </header>
  );
};

export default Header;
