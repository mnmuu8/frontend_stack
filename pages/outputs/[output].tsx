import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import cookie from 'cookie';
import { GetServerSideProps, NextPage } from 'next';
import { getNextApiHeaders } from '@/common/functions/api';
import { useRouter } from 'next/router';
import { OutputCardProps, CommentProps } from '@/features/outputs/types/output';
import { FormContext } from '@/context/FormContext';
import FormModal from '@/components/ui-parts/FormModal';
import { InitialOutputCommentFormData } from '@/features/outputs/functions/form';
import { OutputCommentFormContext } from '@/features/outputs/comments/contexts/OutputCommentFormContext';

const Output: NextPage<OutputCardProps> = ({ output, initialComments }) => {
  const router = useRouter();
  const handleBack = () => router.back();

  const [comments, setComments] = useState(initialComments);
  const { setFormOpen, setFormType } = useContext(FormContext);
  const { setOutputCommentFormData } = useContext(OutputCommentFormContext);

  const handleFormOpen = useCallback(() => {
    const outputId = output.id
    setOutputCommentFormData({ ...InitialOutputCommentFormData, outputId })
    setFormType('createOutputComment');
    setFormOpen(true);
  }, []);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  return (
    <div className='bg-gray-50 h-full min-h-screen flex justify-center items-center'>
      <div className='w-[768px] bg-white max-h-[80vh] overflow-auto'>
        <div className='py-2 px-4 border-b-gray-100 border-b-2'>
          <div className='text-sm cursor-pointer' onClick={handleBack}>＜ 戻る</div>
        </div>
        <div className='p-4 OutputContent' dangerouslySetInnerHTML={{ __html: output.content }} />
        <button className='block bg-blue-500 text-blue-100 hover:bg-blue-600 text-sm font-bold rounded-full p-2 ml-auto w-[150px] text-center cursor-pointer' onClick={handleFormOpen}>コメントする</button>
        <div className='p-4 bg-white'>
          <h2 className='text-lg font-bold mb-4'>コメント</h2>
          {comments && comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
        <FormModal />
      </div>
    </div>
  );
};

const Comment: React.FC<{ comment: CommentProps }> = ({ comment }) => {
  const timeAgo = formatTimeAgo(comment.created_at);

  return (
    <div className='border p-2 mt-2 bg-gray-200'>
      <div className='font-bold'>{comment.user.name}</div>
      <div>{comment.content}</div>
      <div className='text-gray-500 text-sm'>{timeAgo}</div>
    </div>
  );
};

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

export default Output;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  if (!req.headers.cookie) return { props: {} };

  const cookies = cookie.parse(req.headers.cookie);
  const token = cookies.access_token;
  const options = getNextApiHeaders(token);
  const id = context.params?.output;

  try {
    const outputResponse = await axios.get(`${process.env.NEXT_API_ROOT_URL}/api/v1/outputs/${id}`, options);
    const output = outputResponse.data;

    const commentsResponse = await axios.get(`${process.env.NEXT_API_ROOT_URL}/api/v1/outputs/${id}/comments`, options);
    const comments = commentsResponse.data.comments;

    return { props: { output, initialComments: comments } };
  } catch (error) {
    console.error('Error fetching data:', error);

    return { props: {} };
  }
};