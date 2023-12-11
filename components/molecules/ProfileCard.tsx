import React, { FC, useContext } from 'react';
import ImageWrapper from '../atoms/ImageWrapper';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';

const ProfileCard: FC = () => {
  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const USER_PROFILE_HEIGHT = 180;
  const USER_PROFILE_WIDTH = 180;

  const handleFormOpen = () => {
    setFormType('updateUser');
    setFormOpen(true);
  };

  if (sessionUser) {
    return (
      <div className='flex items-center'>
        <ImageWrapper
          src={'/no_image.png'}
          height={USER_PROFILE_HEIGHT}
          width={USER_PROFILE_WIDTH}
          alt={sessionUser.name}
          className='rounded-full mr-6'
        />
        <div>
          <div className='text-3xl mb-2'>{sessionUser.name}</div>
          <div className='text-sm mb-4'>{sessionUser.profile_content}</div>
          <div
            className='bg-blue-500 text-gray-50 text-sm inline-block rounded-md py-2 px-8 cursor-pointer transition-all hover:bg-blue-600'
            onClick={handleFormOpen}
          >
            プロフィールを編集する
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileCard;
