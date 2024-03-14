import React, { FC } from 'react'
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';
import { dataConfirmAlert } from '@/common/functions/form';
import { callDeleteOutputComment } from '../functions/delete';
import { OutputCommentCardProps } from '../../types/output';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';

const OutputCommentCard: FC<OutputCommentCardProps> = ({ comment, outputId, setComments }) => {
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

  const user = comment.user;
  const userProfileSrcPath = user.profile_image_path || '/no_image.png';
  const userProfileName = user.name || 'example';

  const handleDelete = async () => {
    if (!dataConfirmAlert('削除したチームは復旧できません。本当に削除しますか？')) return;

    const commentId = comment.id
    await callDeleteOutputComment(outputId, commentId)
      .then(() => {
        setComments(prevComments => {
          if (!prevComments) return [];
          return prevComments.filter(comment => comment.id !== commentId);
        });
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
        <div className='ActionBtn ml-[auto]' onClick={handleDelete}>
          <DeleteIcon className='DeleteActionBtnIcon' fontSize='small' />
          <div className='BlackActionBtnLabel'>削除</div>
        </div>
      </div>
      <div
        className='text-sm mt-2'
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
    </div>
  )
}

export default OutputCommentCard
