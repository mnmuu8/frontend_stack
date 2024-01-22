import React, { FC } from 'react'
import { useRouter } from 'next/router';
import { CommentProps } from '../../types/output';
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';
import { dataConfirmAlert } from '@/common/functions/form';
import { callDeleteOutputComment } from '../functions/delete';

const OutputCommentCard: FC<{ comment: CommentProps, outputId: number }> = ({ comment, outputId }) => {
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
  const userProfileSrcPath = '/no_image.png';
  const userProfileName = 'example';

  const router = useRouter();

  const handleDelete = async () => {
    if (!dataConfirmAlert('削除したチームは復旧できません。本当に削除しますか？')) return;
    
    const commentId = comment.id
    await callDeleteOutputComment(outputId, commentId)
      .then(() => {
        router.push(`/outputs/${outputId}/`);
      });
  }

  return (
    <div className='bg-gray-50 border-b py-2 px-4'>
      <div className='flex items-center'>
        <ImageWrapper
          src={userProfileSrcPath}
          height={USER_PROFILE_HEIGHT_SM}
          width={USER_PROFILE_WIDTH_SM}
          alt={userProfileName}
          className='rounded-full'
        />
        <div className='text-sm ml-1'>{comment.user.name}</div>
        <div className='text-gray-400 text-[10px] ml-2'>{timeAgo}</div>
        <div className='bg-red-100 text-red-500 text-sm flex items-center justify-center rounded-full cursor-pointer ml-auto h-5 w-5' onClick={handleDelete}>×</div>
      </div>
      <div className='text-sm mt-2'>{comment.content}</div>
    </div>
  )
}

export default OutputCommentCard
