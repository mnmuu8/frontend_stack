import React, { FC, useContext } from 'react'
import Link from 'next/link';
import ImageWrapper from '../atoms/ImageWrapper'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import AppContext from '@/context/AppContext';
import NO_IMAGE_ICON from 'public/no_image.png'

const ProfileCard: FC = () => {
  const appContext = useContext(AppContext);
  const { setFormOpen, setFormType, sessionUser } = appContext;

  const handleFormOpen = () => {
    setFormType('updateUser');
    setFormOpen(true);
  }

  if (sessionUser) {
    return (
      <div className='self-start w-[320px] bg-gray-50 px-4 py-8 rounded-md shadow-md'>
        <ImageWrapper src={NO_IMAGE_ICON} height={80} width={80} alt={sessionUser.name} className='rounded-full m-auto' />
        <div className='text-center mt-2 font-bold'>{sessionUser.name}</div>
        <div className='flex justify-center mt-2'>
          <Link href=''><TwitterIcon className='text-gray-400 mx-1'/></Link>
          <Link href=''><InstagramIcon className='text-gray-400 mx-1'/></Link>
        </div>
        <div className='text-sm mt-4'>フロントエンドエンジニアです。 主に日々の学習で学んだことをアウトプットしています(React多め)。 初学者故、至らぬ点等ございますが温かい目で見守っていただけると幸いです。</div>
        <div className='bg-white rounded-md shadow-sm p-2 text-sm mt-4 text-center font-bold cursor-pointer transition-all hover:bg-gray-100' onClick={handleFormOpen}>プロフィールを編集する</div>
      </div>
    )
  } else {
    return null
  }
}

export default ProfileCard
