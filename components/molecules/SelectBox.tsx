import React, { FC } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectBoxProps } from '@/types/types';

const SelectBox: FC<SelectBoxProps> = ( props ) => {
  const { selectedOption, handleOptionChange } = props;
  return (
    <FormControl sx={{ minWidth: 300 }}>
      <Select
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{ pl: '14px', borderRadius: 50 }}
      >
        <MenuItem value={'all'}>すべて</MenuItem>
        <MenuItem value={'following'}>フォロー中のユーザー</MenuItem>
        <MenuItem value={'notFollowing'}>フォローしていないユーザー</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SelectBox
