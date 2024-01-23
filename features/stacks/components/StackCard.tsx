import React, { FC, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { dataConfirmAlert } from '@/common/functions/form';
import { fetchDeleteStack } from '@/features/stacks/functions/delete';
import { StackCardProps } from '../types/stack';
import { formatDate } from '@/common/functions/dateUtils';
import { getApiHeaders } from '@/common/functions/api';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import { IntrospectionProps } from '@/features/introspections/types/introspection';
import { StackIntrospectionContext } from '@/features/introspections/contexts/StackIntrospectionContext';
import { InitialIntrospectionFormData } from '@/features/introspections/functions/form';
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import { StackFormContext } from '../contexts/StackFormContext';

const StackCard: FC<StackCardProps> = ({ stack }) => {
  const stackedAt = stack.stacked_at;
  const formattedStackedDate = formatDate(stackedAt);

  const { sessionUser } = useContext(SessionContext);
  const { stackFormData, setStackFormData } = useContext(StackFormContext);

  const { setFormOpen, setFormType, setIsRegisterEvent, isRegisterEvent } = useContext(FormContext);

  const { setShowStackIntrospection } = useContext(StackIntrospectionContext);

  const handleEditFormOpen = () => {
    stackFormData && setStackFormData({
      id: stack.id,
      title: stack.title,
      minutes: stack.minutes,
      stacked_at: new Date(stack.stacked_at),
      skill: stack.skill.name,
      description: stack.description,
    });

    setFormType('updateStack');
    setFormOpen(true);
    setIsRegisterEvent(false);
  };

  const handleEditIntrospectionFormOpen = () => {
    const stack_id = stack.id;
    introspectionValue && setShowStackIntrospection({ ...introspectionValue, stack_id });
    setFormType('updateStackIntrospection');
    setFormOpen(true);
    setIsRegisterEvent(false);
  };

  const handleNewIntrospectionFormOpen = () => {
    const stack_id = stack.id;
    setShowStackIntrospection({ ...InitialIntrospectionFormData, stack_id });
    setFormType('createStackIntrospection');
    setFormOpen(true);
    setIsRegisterEvent(false);
  };

  const handleDelete = () => {
    if (!dataConfirmAlert('削除したデータは復旧できません。本当に削除しますか？')) return;

    fetchDeleteStack(stack.id);
  }

  const [introspectionValue, setIntrospectionValue] = useState<IntrospectionProps>(undefined);

  const userProfileSrcPath =
    stack.user.profile_image_path !== null ? stack.user.profile_image_path : '/no_image.png';
  const userProfileName = stack.user.name && stack.user.name !== null ? stack.user.name : 'noname';

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
              src={userProfileSrcPath}
              height={USER_PROFILE_HEIGHT_SM}
              width={USER_PROFILE_WIDTH_SM}
              alt={userProfileName}
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
          <div
            className='ActionBtn mr-2'
            onClick={handleEditFormOpen}
          >
            <EditIcon className='EditActionBtnIcon' fontSize='small' />
            <div className='BlackActionBtnLabel'>編集</div>
          </div>
          {introspectionValue ? (
            <div
              className='ActionBtn mr-2'
              onClick={handleEditIntrospectionFormOpen}
            >
              <EditIcon className='EditActionBtnIcon' fontSize='small' />
              <div className='BlackActionBtnLabel'>反省詳細</div>
            </div>
          ) : (
            <div
              className='ActionBtn mr-2'
              onClick={handleNewIntrospectionFormOpen}
            >
              <AddIcon className='AddActionBtnIcon' fontSize='small' />
              <div className='BlackActionBtnLabel'>反省追加</div>
            </div>
          )}
          <div className='text-sm text-gray-500'>{formattedStackedDate}</div>
          {sessionUser && sessionUser.id === stack.user.id && (
            <DeleteIcon onClick={handleDelete}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default StackCard;
