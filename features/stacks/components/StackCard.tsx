import React, { FC, useContext, useEffect, useState } from 'react';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { formatDate } from '@/common/functions/dateUtils';
import { IntrospectionProps } from '@/features/introspections/types/introspection';
import { StackCardProps } from '../types/stack';
import axios from 'axios';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import { getApiHeaders } from '@/common/functions/api';
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { StackIntrospectionContext } from '@/features/introspections/contexts/StackIntrospectionContext';
import { InitialIntrospectionFormData } from '@/features/introspections/functions/form';

const StackCard: FC<StackCardProps> = ({ stack }) => {
  const stackedAt = stack.stacked_at;
  const formattedStackedDate = formatDate(stackedAt);

  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType, isRegisterEvent } = formContext;

  const { setShowStackIntrospection } = useContext(StackIntrospectionContext);

  const handleEditFormOpen = () => {
    const stack_id = stack.id;
    introspectionValue && setShowStackIntrospection({ ...introspectionValue, stack_id });
    setFormType('updateStackIntrospection');
    setFormOpen(true);
  };

  const handleNewFormOpen = () => {
    const stack_id = stack.id;
    setShowStackIntrospection({ ...InitialIntrospectionFormData, stack_id });
    setFormType('createStackIntrospection');
    setFormOpen(true);
  };

  const [introspectionValue, setIntrospectionValue] = useState<IntrospectionProps>(undefined);

  const USER_PROFILE_HEIGHT = 26;
  const USER_PROFILE_WIDTH = 26;
  const USER_PROFILE_SRC_PATH =
    stack.user.profile_image_path !== null ? stack.user.profile_image_path : '/no_image.png';

  useEffect(() => {
    const fetchIntrospection = async () => {
      const options = getApiHeaders();
      const url = `${process.env.API_ROOT_URL}/api/v1/stacks/${stack.id}/introspection`;

      try {
        const response = await axios.get(url, options);
        return response.data;
      } catch (error) {
        // throw new Error(`${JSON.stringify(error)}`);
      }
    };
    fetchIntrospection().then((res) => {
      setIntrospectionValue(res);
    });
  }, [isRegisterEvent]);

  return (
    <div className='px-6 cursor-pointer hover:bg-gray-100'>
      <div className='flex items-center justify-between py-3 border-b-2 border-gray-100'>
        <div className='flex items-center flex-grow pr-2 min-w-0'>
          {sessionUser && (
            <ImageWrapper
              src={USER_PROFILE_SRC_PATH}
              height={USER_PROFILE_HEIGHT}
              width={USER_PROFILE_WIDTH}
              alt={stack.user.name}
              className='rounded-full mr-2'
            />
          )}
          <div className='text-sm truncate'>{stack.title}</div>
        </div>
        <div className='flex items-center flex-shrink-0'>
          <div className='flex items-center'>
            <div className='flex items-center bg-pink-100 border border-pink-300 rounded-md text-[12px] mr-2 py-1 px-2'>
              <LocalOfferIcon sx={{ color: '#AAAAAA', fontSize: 14, marginRight: '2px' }} />
              <div>{stack.skill.name}</div>
            </div>
          </div>
          {introspectionValue ? (
            <div
              className='flex items-center border border-gray-300 rounded-full py-1 pl-1 pr-2 cursor-pointer mr-2'
              onClick={handleEditFormOpen}
            >
              <EditIcon className='rounded-full bg-orange-500 text-gray-50' fontSize='small' />
              <div className='text-sm text-gray-700 ml-1'>反省詳細</div>
            </div>
          ) : (
            <div
              className='flex items-center border border-gray-300 rounded-full py-1 pl-1 pr-2 cursor-pointer mr-2'
              onClick={handleNewFormOpen}
            >
              <AddIcon className='rounded-full bg-blue-500 text-gray-50' fontSize='small' />
              <div className='text-sm text-gray-700 ml-1'>反省追加</div>
            </div>
          )}
          <div className='text-sm text-gray-500'>{formattedStackedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default StackCard;
