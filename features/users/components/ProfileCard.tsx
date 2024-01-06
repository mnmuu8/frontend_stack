import React, { FC, useContext, useState } from 'react';
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import { FormContext } from '@/context/FormContext';
import { SessionContext } from '@/context/SessionContext';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ProfileImageModal from './ProfileImageModal';
import { USER_PROFILE_HEIGHT_LG, USER_PROFILE_WIDTH_LG } from '@/common/constans/sizes';

const ProfileCard: FC = () => {
  const { sessionUser } = useContext(SessionContext);

  const formContext = useContext(FormContext);
  const { setFormOpen, setFormType } = formContext;

  const [isProfileImageModal, setIsProfileImageModal] = useState<boolean>(false);

  const handleProfileImageModalOpen = (): void => {
    setIsProfileImageModal(true);
  };

  const userProfileSrcPath =
    sessionUser && sessionUser.profile_image_path !== null ? sessionUser.profile_image_path : '/no_image.png';
  const userProfileName = sessionUser && sessionUser.name !== null ? sessionUser.name : 'noname';

  const handleFormOpen = () => {
    setFormType('updateUser');
    setFormOpen(true);
  };

  if (sessionUser) {
    return (
      <div className='flex items-center'>
        <div className='ProfileImage' onClick={handleProfileImageModalOpen}>
          <ImageWrapper
            src={userProfileSrcPath}
            height={USER_PROFILE_HEIGHT_LG}
            width={USER_PROFILE_WIDTH_LG}
            alt={userProfileName}
            className='rounded-full'
          />
          <div className='ProfileImageOverlay'>
            <AddAPhotoIcon className='ProfileImageIcon' />
          </div>
        </div>
        <div>
          <div className='text-3xl mb-2'>{sessionUser.name}</div>
          <div className='text-sm mb-4'>{sessionUser.profile_content}</div>
          <div
            className='bg-blue-500 text-gray-50 text-sm inline-block rounded-md py-2 px-8 cursor-pointer transition-all hover:bg-blue-600'
            onClick={handleFormOpen}
          >
            プロフィールを編集する
          </div>
        </div>
        <ProfileImageModal isProfileImageModal={isProfileImageModal} setIsProfileImageModal={setIsProfileImageModal} />
      </div>
    );
  } else {
    return null;
  }
};

export default ProfileCard;
