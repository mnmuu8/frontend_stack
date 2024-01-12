import React, { FC, useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import HeaderMenu from './HeaderMenu';
import ImageWrapper from '../ui-elements/ImageWrapper';
import FormModal from '../ui-parts/FormModal';
import { FormType } from '@/common/types/form';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';

const Header: FC = () => {
  const { handleDrawerAreaToggle, handleMenuOpen } = useContext(AppContext);
  const { sessionUser } = useContext(SessionContext);
  const { setFormOpen, setFormType } = useContext(FormContext);

  const handleFormOpen = (formType: FormType) => {
    setFormOpen(true);
    setFormType(formType);
  };

  const userProfileSrcPath =
    sessionUser && sessionUser.profile_image_path !== null ? sessionUser.profile_image_path : '/no_image.png';
  const userProfileName = sessionUser && sessionUser.name !== null ? sessionUser.name : 'noname';

  return (
    <header className='bg-gray-700 h-[60px] border-b-[1px] border-gray-500'>
      <div className='flex justify-between items-center h-full px-4'>
        <div className='flex items-center'>
          <IconButton onClick={handleDrawerAreaToggle}>
            <MenuIcon className='text-white' />
          </IconButton>
          <div
            className='ActionBtn border-gray-500'
            onClick={() => handleFormOpen('createStack')}
          >
            <AddIcon className='AddActionBtnIcon' fontSize='small' />
            <div className='WhiteActionBtnLabel'>作成</div>
          </div>
        </div>
        <div className='flex items-center cursor-pointer' onClick={handleMenuOpen}>
          {sessionUser && (
            <ImageWrapper
              src={userProfileSrcPath}
              height={USER_PROFILE_HEIGHT_SM}
              width={USER_PROFILE_WIDTH_SM}
              alt={userProfileName}
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
