import React, { FC, useContext } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import Button from '@mui/material/Button';
import { FormContext } from '@/context/FormContext';
import { FormDataContext } from '@/context/FormDataContext';

const StackCardMenu: FC<{stack_id: number}> = ({ stack_id }) => {
  const formContext = useContext(FormContext);
  const { setFormType, setFormOpen } = formContext;
  
  const formDataContext = useContext(FormDataContext);
  const { setIntrospectionFormData } = formDataContext;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFormOpenButton = (stack_id: number) => {
    setIntrospectionFormData({evaluation: 0, reason: "", keeps: [], problems: [], tries: [], stack_id: stack_id})
    setFormType('createStackIntrospection');
    setFormOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='text-gray-400 absolute top-4 right-4'
      >
        <LinearScaleIcon />
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => handleFormOpenButton(stack_id)}>反省を追加</MenuItem>
      </Menu>
    </>
  )
}

export default StackCardMenu
