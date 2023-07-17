import React, { FC } from 'react'
import ImageWrapper from '../atoms/ImageWrapper';
import noProfile from '../../public/noprofile.png'
import { UserProfileProps } from '@/types/types';

const UserProfile: FC<UserProfileProps> = ({ user }) => {
  return (
    <>
      {user.picture ? (
        <ImageWrapper src={user.picture!} height={50} width={50} alt={user.name!} className='rounded-full mr-4' />
      ) : (
        <ImageWrapper src={noProfile as any} height={50} width={50} alt={user.name!} className='rounded-full mr-4' />
      )}
      <div className='mr-2'>
        <span className='block text-sm'>{user.name}</span>
        <span className='block text-sm'>{user.email}</span>
      </div>
    </>
  )
}

export default UserProfile
