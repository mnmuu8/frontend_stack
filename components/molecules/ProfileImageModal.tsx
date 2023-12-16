import React, { FC, useCallback, useContext, useRef } from 'react';
import { getSession } from '@/utiliry/session';
import { useDropzone } from 'react-dropzone';
import { GetUploadUrl, ProfileModalState } from '@/types/user';
import { SessionContext } from '@/context/SessionContext';
import { dataConfirmAlert } from '@/utiliry/form';
import { SessionData } from '@/types/session';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageWrapper from '../atoms/ImageWrapper';
import axios from 'axios';

const ProfileImageModal: FC<ProfileModalState> = ({ isProfileImageModal, setIsProfileImageModal }) => {
  const sessiontContext = useContext(SessionContext);
  const { sessionUser, setSessionUser } = sessiontContext;

  const uploadFile = async (file: File, uploadUrl: string) => {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  };

  const attachProfileImage = async (sessionData: SessionData, profileImagePath: string) => {
    await axios.put(
      `${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}/profile_images/attach`,
      profileImagePath,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`,
        },
        params: {
          s3_file_path: profileImagePath,
        },
      },
    );
  };

  const getUploadUrl = async ({ userId, filename, byteSize, contentType }: GetUploadUrl) => {
    const sessionData = getSession();
    if (!sessionData) return;

    console.log(sessionData.token);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.token}`,
      },
      params: {
        filename: filename,
        byte_size: byteSize,
        content_type: contentType,
      },
    };
    const url = `${process.env.API_ROOT_URL}/api/v1/users/${userId}/profile_images/upload_url`;

    const response = await axios.get(url, options);
    return response.data.url;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const sessionData = getSession();
    if (!sessionData || !sessionUser) return;

    const file = acceptedFiles[0];
    try {
      if (dataConfirmAlert('アップロードした画像を登録しますか？')) {
        const uploadUrl = await getUploadUrl({
          userId: sessionData.userId,
          filename: file.name,
          byteSize: file.size,
          contentType: file.type,
        });
        await uploadFile(file, uploadUrl);

        const profileImagePath = uploadUrl.split('?')[0];
        await attachProfileImage(sessionData, profileImagePath);

        setIsProfileImageModal(false);
        setSessionUser({ ...sessionUser, profile_image_path: profileImagePath });
      } else {
        setIsProfileImageModal(false);
      }
    } catch (error) {
      console.error('ファイルのアップロードに失敗しました', error);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const setDefaultProfileImage = async () => {
    const sessionData = getSession();
    if (!sessionData || !sessionUser) return;

    try {
      if (dataConfirmAlert('デフォルト画像に変更しますか？')) {
        const defaultProfileImage = '/no_image.png';
        await attachProfileImage(sessionData, defaultProfileImage);

        setIsProfileImageModal(false);
        setSessionUser({ ...sessionUser, profile_image_path: defaultProfileImage });
      } else {
        setIsProfileImageModal(false);
      }
    } catch (error) {
      console.error('ファイルのアップロードに失敗しました', error);
    }
  };

  const insideRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = insideRef.current;

    if (!el) return;
    if (!el.contains(e.target as Node)) {
      setIsProfileImageModal(false);
    }
  };

  const USER_PROFILE_HEIGHT = 100;
  const USER_PROFILE_WIDTH = 100;
  const USER_PROFILE_SRC_PATH =
    sessionUser && sessionUser.profile_image_path !== null ? sessionUser.profile_image_path : '/no_image.png';
  const USER_PROFILE_NAME = sessionUser && sessionUser.name !== null ? sessionUser.name : 'noname';

  return (
    <div onClick={handleClickOutside}>
      <Modal open={isProfileImageModal}>
        <Box
          ref={insideRef}
          className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-auto max-h-[80vh] p-10 flex flex-col overflow-y-scroll'
        >
          <div className='flex justify-center mb-6'>
            <ImageWrapper
              src={USER_PROFILE_SRC_PATH}
              height={USER_PROFILE_HEIGHT}
              width={USER_PROFILE_WIDTH}
              alt={USER_PROFILE_NAME}
            />
          </div>
          <button
            onClick={setDefaultProfileImage}
            className='w-full bg-gray-50 border border-gray-300 rounded-md py-2 text-sm text-gray-400 mb-2 hover:bg-gray-100'
          >
            デフォルト画像を設定
          </button>
          <div
            {...getRootProps()}
            className='bg-blue-50 border border-blue-200 rounded-md p-4 h-[140px] flex justify-center items-center cursor-pointer'
          >
            <input {...getInputProps()} />
            <p className='text-sm text-gray-400'>
              ここにファイルをドロップするか、クリックしてファイルを選択してください。
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileImageModal;
