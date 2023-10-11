import React, { FC } from 'react'
import EditIcon from '@mui/icons-material/Edit';

const TeamListItem: FC<{name: string}> = ({ name }) => {
  return (
    <div className='flex items-center justify-between px-6 py-2'>
      <div className='bg-gray-50 text-sm'>{name}</div>
      <EditIcon className='text-[16px] cursor-pointer'/>
    </div>
  )
}

export default TeamListItem
