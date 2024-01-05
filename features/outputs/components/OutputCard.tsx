import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { SessionContext } from '@/context/SessionContext';
import { OutputCardProps } from '../types/output';
import { formatDate } from '@/common/functions/dateUtils';
import ImageWrapper from '@/components/ui-elements/ImageWrapper';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';
import { USER_PROFILE_HEIGHT_SM, USER_PROFILE_WIDTH_SM } from '@/common/constans/sizes';

const OutputCard: FC<OutputCardProps> = ({ output }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { sessionUser } = useContext(SessionContext);

  const outputCreatedAt = output.created_at;
  const formattedCreateDate = formatDate(outputCreatedAt);

  const userProfileSrcPath = sessionUser && sessionUser.profile_image_path !== null ? sessionUser.profile_image_path : '/no_image.png';
  const userProfileName = sessionUser && sessionUser.name !== null ? sessionUser.name : 'noname';

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current !== null && contentRef.current.scrollHeight > 400) {
      setShowMoreButton(true);
    }
  }, []);

  return (
    <div key={output.id} className='px-6'>
      <div className='py-3 border-b-2 border-gray-100'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center flex-grow pr-2 min-w-0'>
            {sessionUser && (
              <ImageWrapper
                src={userProfileSrcPath}
                height={USER_PROFILE_HEIGHT_SM}
                width={USER_PROFILE_WIDTH_SM}
                alt={userProfileName}
                className='rounded-full mr-2'
              />
            )}
          </div>
          <div className='flex items-center flex-shrink-0'>
            <Link href={`/outputs/${output.id}`}>
              <div className='flex items-center border border-gray-300 rounded-full py-1 pl-1 pr-2 cursor-pointer mr-2 hover:bg-gray-50'>
                <EditIcon className='rounded-full bg-orange-500 text-gray-50' fontSize='small' />
                <div className='text-sm text-gray-700 ml-1'>詳細</div>
              </div>
            </Link>
            <div className='text-sm text-gray-500'>{formattedCreateDate}</div>
          </div>
        </div>
        <div className='relative'>
          <div
            ref={contentRef}
            style={{ maxHeight: isExpanded ? 'none' : '400px', overflow: 'hidden' }}
            className='OutputCardContent text-sm truncate pt-3'
            dangerouslySetInnerHTML={{ __html: output.content }}
          />
          {showMoreButton && !isExpanded && (
            <div className='MoreButton' onClick={toggleContent}>
              もっと見る
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputCard;
