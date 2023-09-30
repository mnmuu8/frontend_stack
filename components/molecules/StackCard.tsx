import React, { FC, useContext, useEffect, useState } from 'react'
import UserProfile from './UserProfile';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { formatDate } from '../uikit/dateUtils';
import { StackCardProps, ApiOptions } from '@/types/types';
import StackCardMenu from './StackCardMenu';
import EditIcon from '@mui/icons-material/Edit';
import AppContext from '@/context/AppContext';
import { getSession } from '@/utiliry/session';
import axios from 'axios';

const StackCard: FC<StackCardProps> = ({ stack, user }) => {
  const stackCreatedAt = stack.created_at;
  const formattedCreateDate = formatDate(stackCreatedAt);
  const appContext = useContext(AppContext);
  const { setFormOpen, setFormType, setShowStackIntrospection } = appContext;
  const currentShowStackIntrospection = (introspection_id: number) => {
    if (stack.introspection) {
      return stack.introspection.find((introspection) => introspection && introspection.id === introspection_id)
    }
  }
  const handleFormOpen = (introspection_id: number) => {
    introspectionValue && setShowStackIntrospection(introspectionValue);
    setFormOpen(true);
    setFormType('updateStackIntrospection');
  }
  const [introspectionValue, setIntrospection] = useState<any>([]);

  useEffect(() => {
    const fetchIntrospection = async () => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options: ApiOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionData.token}`
        }
      }
      const url = `${process.env.API_ROOT_URL}/api/v1/stacks/${stack.id}/introspection`;

      try {
        const response = await axios.get(url, options);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        // throw new Error(`${JSON.stringify(error)}`);
      }
    }
    fetchIntrospection().then(res => {
      setIntrospection(res);
    });
  }, []);

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
          <div className='mt-4'>
            <div key={introspectionValue} className='bg-blue-500 px-6 py-2 rounded-full flex justify-between items-center mt-2'>
              <span className='text-white text-sm font-bold'>反省</span>
              <EditIcon className='text-[20px] text-white cursor-pointer' onClick={() => handleFormOpen(introspectionValue.id)} />
            </div>
          </div>
      </div>
        <StackCardMenu />
      </div>
    )
  }

  return null;
}

export default StackCard
