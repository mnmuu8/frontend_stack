import React, { FC } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';


const StackForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} className='fixed bottom-6 right-6 bg-blue-500 p-6 rounded-full hover:bg-blue-400'>
        <AddIcon className='text-white' />
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-[80vh] p-10 flex flex-col">
          <div className='flex-1'>
            <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center font-bold'>
              積み上げを登録
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              ここに入力フォームが入ります。
            </Typography>
          </div>
          <div className='flex justify-center'>
            <Button  onClick={handleClose} className='text-white bg-red-500 hover:bg-red-400 mx-2'>
              キャンセル
            </Button>
            <Button className='text-white bg-blue-500 hover:bg-blue-400 mx-2'>
              積み上げを登録
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default StackForm
