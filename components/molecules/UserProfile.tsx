import React, { FC } from 'react'
import ImageWrapper from '../atoms/ImageWrapper';
import noProfile from '../../public/noprofile.png'
import { UserProfileProps } from '@/types/types';

const UserProfile: FC<UserProfileProps> = ( props ) => {
  const { user, height, width, isHeader, created_at } = props;

  return (
    <>
      {user.picture ? (
        <ImageWrapper src={user.picture!} height={height} width={width} alt={user.name!} className='rounded-full mr-4' />
      ) : (
        <ImageWrapper src={noProfile as any} height={height} width={width} alt={user.name!} className='rounded-full mr-4' />
      )}
      <div className='mr-2'>
        <span className='block text-sm'>{user.name}</span>
        {isHeader ? (
          <span className='block text-sm'>{user.email}</span>
        ) : (
          <span className='block text-xs text-gray-500'>{created_at}</span>
        )}
      </div>
    </>
  )
}

export default UserProfile
