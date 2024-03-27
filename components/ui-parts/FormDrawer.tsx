import React, { FC } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FormDrawerProps } from '@/features/plans/types/plan';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';

// TODO: ユーザーの紐付けは後ほど対応
const userProfileSrcPath = '/no_image.png';
const userProfileName = 'noname';

const FormDrawer: FC<FormDrawerProps> = ({ planInfo, drawerOpen, setDrawerOpen }) => {
  const handleContentClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if ( event.type === 'keydown' &&
      (
        (event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift'
      )
    ) { return; }

    setDrawerOpen(open);
  };

  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
    >
      <Box
        sx={{ width: 500 }}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        {/* TODO: レイアウト実装。フォームは後ほど対応 */}
        <div onClick={handleContentClick}>
          <div className='bg-gray-100 p-4'>
            <button className='py-1 px-2 text-[12px] bg-white border rounded-md transition-all hover:bg-gray-100'>積み上げに登録</button>
          </div>
          <div className='py-4 px-8'>
            <h1 className='text-2xl mb-8'>{planInfo.title}</h1>
            <div className='flex items-center mb-4'>
              <p className='text-sm text-gray-500 w-[20%]'>名前</p>
              <p className='flex items-center text-sm'>
                <ImageWrapper
                  src={userProfileSrcPath}
                  height={USER_PROFILE_HEIGHT_SM}
                  width={USER_PROFILE_WIDTH_SM}
                  alt={userProfileName}
                  className='rounded-full mr-2'
                />
                <span>Yuya Minami</span>
              </p>
            </div>
            <div className='flex items-center mb-4'>
              <p className='text-sm text-gray-500 w-[20%]'>日時</p>
              <p className='flex items-center text-sm'>
                <span>{planInfo.start}</span>
                <span className='mx-2'> - </span>
                <span>{planInfo.end}</span>
              </p>
            </div>
            <div className='flex items-center mb-10'>
              <p className='text-sm text-gray-500 w-[20%]'>スキル</p>
              <p className='flex items-center text-sm'>
                <LocalOfferIcon sx={{ fontSize: 16, color: '#CCCCCC', mr: '4px' }} />
                <span>{planInfo.skill}</span>
              </p>
            </div>
            <div>
              <p className='text-sm text-gray-500 mb-4'>説明</p>
              <p className='text-sm'>{planInfo.description}</p>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  )
}

export default FormDrawer
