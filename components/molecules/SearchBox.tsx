import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox: FC = () => {
  return (
    <div className='flex items-center'>
      <input className='h-8 bg-gray-100 mr-2 rounded p-2 text-xs' type='text' placeholder='キーワードを入力' />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBox;
