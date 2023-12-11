import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { SessionContext } from '@/context/SessionContext';
import UserProfile from './UserProfile';
import { OutputCardProps } from '@/types/output';
import { formatDate } from '../uikit/dateUtils';
import Link from 'next/link';

const OutputCard: FC<OutputCardProps> = ({ output }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current !== null && contentRef.current.scrollHeight > 400) {
      setShowMoreButton(true);
    }
  }, []);

  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const outputCreatedAt = output.created_at;
  const formattedCreateDate = formatDate(outputCreatedAt);

  const USER_PROFILE_HEIGHT = 32;
  const USER_PROFILE_WIDTH = 32;

  return (
    <div key={output.id} className='w-full bg-gray-50 rounded-md p-6 mb-4 relative'>
      <Link href={`/outputs/${output.id}`}>
        <div className='flex items-center mb-2'>
          <UserProfile
            user={sessionUser}
            height={USER_PROFILE_HEIGHT}
            width={USER_PROFILE_WIDTH}
            isHeader={false}
            created_at={formattedCreateDate}
          />
        </div>
        <div
          ref={contentRef}
          style={{ maxHeight: isExpanded ? 'none' : '400px', overflow: 'hidden' }}
          className='OutputCardContent'
          dangerouslySetInnerHTML={{ __html: output.content }}
        />
      </Link>
      {showMoreButton && !isExpanded && (
        <div className='MoreButton' onClick={toggleContent}>
          もっと見る
        </div>
      )}
    </div>
  );
};

export default OutputCard;
