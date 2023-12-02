import React, { FC, useContext } from 'react';
import ImageWrapper from '../atoms/ImageWrapper';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';

const ProfileCard: FC = () => {
  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const UserProfileHeight = 80;
  const UserProfileWidth = 80;

  const handleFormOpen = () => {
    setFormType('updateUser');
    setFormOpen(true);
  };

  if (sessionUser) {
    return (
      <div className='self-start w-[320px] bg-gray-50 px-4 py-8 rounded-md shadow-md'>
        <ImageWrapper
          src={'/no_image.png'}
          height={UserProfileHeight}
          width={UserProfileWidth}
          alt={sessionUser.name}
          className='rounded-full m-auto'
        />
        <div className='text-center mt-2 font-bold'>{sessionUser.name}</div>
        <div className='text-sm mt-4'>
          フロントエンドエンジニアです。 主に日々の学習で学んだことをアウトプットしています(React多め)。
          初学者故、至らぬ点等ございますが温かい目で見守っていただけると幸いです。
        </div>
        <div
          className='bg-white rounded-md shadow-sm p-2 text-sm mt-4 text-center font-bold cursor-pointer transition-all hover:bg-gray-100'
          onClick={handleFormOpen}
        >
          プロフィールを編集する
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileCard;
