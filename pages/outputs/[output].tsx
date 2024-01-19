import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import cookie from 'cookie';
import { GetServerSideProps, NextPage } from 'next';
import { getNextApiHeaders } from '@/common/functions/api';
import { useRouter } from 'next/router';
import { OutputCardProps } from '@/features/outputs/types/output';
import { FormContext } from '@/context/FormContext';
import { InitialOutputCommentFormData } from '@/features/outputs/functions/form';
import { OutputCommentFormContext } from '@/features/outputs/comments/contexts/OutputCommentFormContext';
import Layout from '@/components/layouts/Layout';
import AddIcon from '@mui/icons-material/Add';
import OutputCommentCard from '@/features/outputs/comments/components/OutputCommentCard';
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import { SessionContext } from '@/context/SessionContext';
import { formatDate } from '@/common/functions/dateUtils';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';

const Output: NextPage<OutputCardProps> = ({ output, initialComments }) => {
  const router = useRouter();
  const handleBack = () => router.back();

  const createAt = output.created_at;
  const formattedStackedDate = formatDate(createAt);

  const { sessionUser } = useContext(SessionContext);

  // TODO: 現状は仮情報を使用しており、アウトプットにユーザー紐づけたら更新
  const userProfileSrcPath = '/no_image.png';
  const userProfileName = 'example';

  const [comments, setComments] = useState(initialComments);
  const { setFormOpen, setFormType, setIsRegisterEvent } = useContext(FormContext);
  const { setOutputCommentFormData } = useContext(OutputCommentFormContext);

  const handleFormOpen = useCallback(() => {
    const outputId = output.id
    setOutputCommentFormData({ ...InitialOutputCommentFormData, outputId })
    setFormType('createOutputComment');
    setFormOpen(true);
    setIsRegisterEvent(false);
  }, []);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  return (
    <Layout>
      <div className='Container flex flex-col h-full'>
        <div className='flex flex-col h-full bg-white border border-gray-300 rounded-md shadow-sm'>
          <div className='flex justify-between items-center border-b-gray-100 border-b-2 px-6 py-4'>
            <div className='border border-gray-300 cursor-pointer inline-block text-[10px] rounded-md py-2 px-3' onClick={handleBack}>＜ 戻る</div>
          </div>
          <div className='overflow-hidden flex-grow p-6'>
            <div className='overflow-scroll h-full'>
              <div className='flex items-center'>
                <div className='text-[12px] text-gray-500 w-[150px]'>投稿者</div>
                <div className='flex items-center'>
                  <ImageWrapper
                    src={userProfileSrcPath}
                    height={USER_PROFILE_HEIGHT_SM}
                    width={USER_PROFILE_WIDTH_SM}
                    alt={userProfileName}
                    className='rounded-full'
                  />
                  <div className='ml-2 text-sm'>{sessionUser?.name}</div>
                </div>
              </div>
              <div className='flex items-center mt-4'>
                <div className='text-[12px] text-gray-500 w-[150px]'>投稿日</div>
                <div className='flex items-center'>
                  <div className='text-sm'>{formattedStackedDate}</div>
                </div>
              </div>
              <div className='mt-4'>
                <div className='text-[12px] text-gray-500 w-[150px]'>内容</div>
                <div className='OutputContent mt-2' dangerouslySetInnerHTML={{ __html: output.content }} />
              </div>
            </div>
          </div>
          <div className='border-t-2 border-gray-100 px-6 py-4'>
            <div className='flex justify-between items-center mb-4'>
              <div className='text-md text-gray-700 font-bold'>投稿のコメント</div>
              <div
                className='ActionBtn'
                onClick={handleFormOpen}
              >
                <AddIcon className='AddActionBtnIcon' fontSize='small' />
                <div className='BlackActionBtnLabel'>コメント追加</div>
              </div>
            </div>
            <div className='overflow-scroll max-h-[200px]'>
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <OutputCommentCard key={comment.id} comment={comment} />
                ))
              ) : (
                <p className='text-sm text-gray-700'>コメントがありません</p>
              )}
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
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
