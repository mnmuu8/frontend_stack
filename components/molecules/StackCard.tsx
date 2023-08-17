import React, { FC } from 'react'
import UserProfile from './UserProfile';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { formatDate } from '../uikit/dateUtils';
import { StackCardProps } from '@/types/types';

const StackCard: FC<StackCardProps> = ({ stack, user }) => {
  const stackCreatedAt = stack.created_at;
  const formattedCreateDate = formatDate(stackCreatedAt);

  if (user) {
    return (
      <div className='relative bg-gray-50 rounded-md px-10 py-4 mb-4'>
        <div className='flex items-center'>
          <UserProfile user={user} height={32} width={32} isHeader={false} created_at={formattedCreateDate} />
        </div>
        <div className='pt-4 pb-2 text-lg font-bold'>{stack.title}</div>
        <div className='flex items-center'>
          <div><LocalOfferIcon className='text-gray-400 text-[16px] mr-2 relative top-[-1px]' /></div>
          <div key={stack.skill.id} className='bg-gray-200 rounded-md text-[12px] mr-2 py-1 px-2'>{stack.skill.name}</div>
        </div>
        <div className='text-sm mt-2'>
          <div className='flex items-center'><FavoriteBorderIcon className='text-gray-400 text-[16px] mr-2'/> 0</div>
        </div>
        <div className='absolute bottom-4 right-8'><BookmarkBorderIcon className='text-3xl text-gray-400'/></div>
      </div>
    )
  }

  return null;
}

export default StackCard
