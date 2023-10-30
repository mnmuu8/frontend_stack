import React, { FC, useContext, useEffect, useState } from 'react'
import UserProfile from './UserProfile';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { formatDate } from '../uikit/dateUtils';
import { ApiOptions } from '@/types/api';
import { IntrospectionProps } from '@/types/introspection';
import { StackCardProps } from '@/types/stack';
import { getSession } from '@/utiliry/session';
import axios from 'axios';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import { FormDataContext } from '@/context/FormDataContext';
import { InitialIntrospectionFormData } from '@/utiliry/form';
import { getApiHeaders } from '@/utiliry/api';

const StackCard: FC<StackCardProps> = ({ stack }) => {
  const stackCreatedAt = stack.created_at;
  const formattedCreateDate = formatDate(stackCreatedAt);
  
  const sessionContext = useContext(SessionContext)
  const { sessionUser } = sessionContext;
  
  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType, isRegisterEvent } = formContext;
  
  const formDataContext = useContext(FormDataContext);
  const { setShowStackIntrospection, setIntrospectionFormData } = formDataContext;

  const handleEditFormOpen = () => {
    const stack_id = stack.id
    introspectionValue && setShowStackIntrospection({ ...introspectionValue, stack_id });
    setFormType('updateStackIntrospection');
    setFormOpen(true);
  }

  const handleNewFormOpen = () => {
    const stack_id = stack.id
    setIntrospectionFormData({ ...InitialIntrospectionFormData, stack_id })
    setFormType('createStackIntrospection');
    setFormOpen(true);
  };

  const [introspectionValue, setIntrospectionValue] = useState<IntrospectionProps>(undefined);

  useEffect(() => {
    const fetchIntrospection = async () => {
      const sessionData = getSession();
      if (!sessionData) return;

      const options = getApiHeaders(sessionData)
      const url = `${process.env.API_ROOT_URL}/api/v1/stacks/${stack.id}/introspection`;

      try {
        const response = await axios.get(url, options);
        return response.data;
      } catch (error) {
        // throw new Error(`${JSON.stringify(error)}`);
      }
    }
    fetchIntrospection().then(res => {
      setIntrospectionValue(res);
    });
  }, [isRegisterEvent]);

  return (
    <div className='relative'>
      <div className='relative bg-gray-50 rounded-md px-10 py-4 mb-4'>
        <div className='flex items-center'>
          <UserProfile user={sessionUser} height={32} width={32} isHeader={false} created_at={formattedCreateDate} />
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
        {introspectionValue ? (
          <div className='bg-blue-500 text-blue-100 hover:bg-blue-600 text-sm font-bold rounded-full px-4 py-2 mt-2 ml-auto w-[90px] text-center cursor-pointer' onClick={handleEditFormOpen}>反省詳細</div>
        ) : (
          <div className='bg-blue-100 text-blue-500 hover:bg-blue-200 text-sm font-bold rounded-full px-4 py-2 mt-2 ml-auto w-[90px] text-center cursor-pointer' onClick={handleNewFormOpen}>反省追加</div>
        )}
      </div>
    </div>
  )
}

export default StackCard
