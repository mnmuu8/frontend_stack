import React, { FC } from 'react'
import Link from 'next/link';
import ImageWrapper from '../atoms/ImageWrapper'
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const ProfileCard: FC = () => {
  const user = {
    "given_name": "裕也",
    "family_name": "南",
    "nickname": "mnm.uu8",
    "name": "南裕也",
    "picture": "https://lh3.googleusercontent.com/a/AAcHTtdkm-fb3SxuzwiRZIVuhQizQQLdYVhIgehAfQ3wyDL_ow=s96-c",
    "locale": "ja",
    "updated_at": "2023-08-13T06:27:09.196Z",
    "email": "mnm.uu8@gmail.com",
    "email_verified": true,
    "sub": "google-oauth2|114610925753457562952",
    "sid": "adsct_h4CW-x38wgXDXaDXrs4fTHYdRG"
  }

  return (
    <div className='self-start w-[320px] bg-gray-50 px-4 py-8 rounded-md shadow-md'>
      {user.picture && <ImageWrapper src={user.picture!} height={80} width={80} alt={user.name!} className='rounded-full m-auto' />}
      <div className='text-center mt-2 font-bold'>{user.name}</div>
      <div className='flex justify-center mt-2'>
        <Link href=''><TwitterIcon className='text-gray-400 mx-1'/></Link>
        <Link href=''><InstagramIcon className='text-gray-400 mx-1'/></Link>
      </div>
      <div className='text-sm mt-4'>フロントエンドエンジニアです。 主に日々の学習で学んだことをアウトプットしています(React多め)。 初学者故、至らぬ点等ございますが温かい目で見守っていただけると幸いです。</div>
      <div className='bg-white rounded-md shadow-sm p-2 text-sm mt-4 text-center font-bold'>プロフィールを編集する</div>
    </div>
  )
}

export default ProfileCard
