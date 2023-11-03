import React, { FC, useContext } from 'react'
import { SessionContext } from '@/context/SessionContext';
import UserProfile from './UserProfile';
import { OutputCardProps } from '@/types/output';
import { formatDate } from '../uikit/dateUtils';

const OutputCard: FC<OutputCardProps> = ({ output }) => {
  const sessionContext = useContext(SessionContext);
  const { sessionUser } = sessionContext;

  const outputCreatedAt = output.created_at;
  const formattedCreateDate = formatDate(outputCreatedAt);

  return (
    <div key={output.id} className='w-full bg-gray-50 rounded-md p-6 mb-4'>
      <div className='flex items-center mb-2'>
        <UserProfile user={sessionUser} height={32} width={32} isHeader={false} created_at={formattedCreateDate}/>
      </div>
      <div className='text-md'>{output.content}</div>
    </div>
  )
}

export default OutputCard
