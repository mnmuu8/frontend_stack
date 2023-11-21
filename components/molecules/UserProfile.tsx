import React, { FC } from 'react';
import ImageWrapper from '../atoms/ImageWrapper';
import { UserProfileProps } from '@/types/user';

const UserProfile: FC<UserProfileProps> = ({ user, height, width, isHeader, created_at }) => {
  return (
    <>
      {user && (
        <ImageWrapper
          src={'/no_image.png'}
          height={height}
          width={width}
          alt={user.name}
          className='rounded-full mr-4'
        />
      )}
      <div className='mr-2'>
        <span className='block text-sm'>{user?.name}</span>
        {isHeader ? (
          <span className='block text-sm'>{user?.email}</span>
        ) : (
          <span className='block text-xs text-gray-500'>{created_at}</span>
        )}
      </div>
    </>
  );
};

export default UserProfile;
