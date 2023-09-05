import React, { FC, useContext } from 'react'
import UserProfile from './UserProfile';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { formatDate } from '../uikit/dateUtils';
import { StackCardProps } from '@/types/types';
import StackCardMenu from './StackCardMenu';
import EditIcon from '@mui/icons-material/Edit';
import AppContext from '@/context/AppContext';

const StackCard: FC<StackCardProps> = ({ stack, user }) => {
  const stackCreatedAt = stack.created_at;
  const formattedCreateDate = formatDate(stackCreatedAt);

  const appContext = useContext(AppContext);
  const { setFormOpen, setFormType, setShowStackIntrospection } = appContext;

  const currentShowStackIntrospection = (introspection_id: number) => {
    if (!stack.introspection) {
      return;
    } else {
      return stack.introspection.find((introspection) => introspection && introspection.id === introspection_id)
    }
  }

  const handleFormOpen = (introspection_id: number) => {
    const introspection = currentShowStackIntrospection(introspection_id);
    introspection && setShowStackIntrospection(introspection);
    setFormOpen(true);
    setFormType('showStackIntrospection');
  }

  if (user) {
    return (
      <div className='relative'>
        <div className='relative bg-gray-50 rounded-md px-10 py-4 mb-4'>
          <div className='flex items-center'>
            <UserProfile user={user} height={32} width={32} isHeader={false} created_at={formattedCreateDate} />
          </div>
          <div className='pt-4 pb-2 text-lg font-bold'>{stack.title}</div>
          <div className='flex items-center'>
            <div><LocalOfferIcon className='text-gray-400 text-[16px] mr-2 relative top-[-1px]' /></div>
            <div key={stack.skill.id} className='bg-gray-200 rounded-md text-[12px] mr-2 py-1 px-2'>{stack.skill.name}</div>
          </div>
          <div className='flex text-sm mt-2'>
            <div className='flex items-center mr-4'><FavoriteBorderIcon className='text-gray-400 text-[20px] mr-1'/> 0</div>
            <div className='flex items-center'><BookmarkBorderIcon className='text-gray-400 text-[20px] mr-1'/> 0</div>
          </div>
          {stack.introspection && (
            <div className='mt-4'>
              {stack.introspection.map((introspection, index) => (
                introspection && (
                  <div key={introspection.id} className='bg-blue-500 px-6 py-2 rounded-full flex justify-between items-center mt-2'>
                    <span className='text-white text-sm font-bold'>反省ポイント #{index + 1}</span>
                    <EditIcon className='text-[20px] text-white cursor-pointer' onClick={() => handleFormOpen(introspection.id)} />
                  </div>
                )
              ))}
            </div>
          )}
        </div>
        <StackCardMenu />
      </div>
    )
  }

  return null;
}

export default StackCard
