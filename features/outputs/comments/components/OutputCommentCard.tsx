import React, { FC } from 'react'
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import { CommentProps } from '../../types/output';

const OutputCommentCard: FC<{ comment: CommentProps }> = ({ comment }) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const diffInSeconds = (new Date().getTime() - date.getTime()) / 1000;
  
    if (diffInSeconds < 60) return 'たった今';
  
    return new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(date);
  };

  const timeAgo = formatTimeAgo(comment.created_at);

  // TODO: 現状は仮情報を使用しており、アウトプットのコメントにユーザー紐づけたら更新
  const USER_PROFILE_HEIGHT = 26;
  const USER_PROFILE_WIDTH = 26;
  const USER_PROFILE_SRC_PATH = '/no_image.png';
  const USER_PROFILE_NAME = 'example';

  return (
    <div className='bg-gray-50 border-b py-2 px-4'>
      <div className='flex items-center'>
        <ImageWrapper
          src={USER_PROFILE_SRC_PATH}
          height={USER_PROFILE_HEIGHT}
          width={USER_PROFILE_WIDTH}
          alt={USER_PROFILE_NAME}
          className='rounded-full'
        />
        <div className='text-sm ml-1'>{comment.user.name}</div>
        <div className='text-gray-400 text-[10px] ml-2'>{timeAgo}</div>
      </div>
      <div className='text-sm mt-2'>{comment.content}</div>
    </div>
  )
}

export default OutputCommentCard
