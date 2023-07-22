import React, { FC } from 'react'
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CheckBox from './CheckBoxGroup';
import TextInput from '../atoms/TextInput';
import DateInput from '../atoms/DateInput';
import RichTextEditor from '../atoms/RichTextEditor';
import { StackFormData, onSubmitType } from '@/types/types';

const StackForm: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const { control, handleSubmit, setValue } = useForm<StackFormData>();
  const onCancel = () => {
    const checkAleart = window.confirm('キャンセルすると入力した値が全て削除されますがよろしいでしょうか？');
    if (checkAleart) {
      setValue('title', '');
      setValue('time', 0);
      setValue('editorContent', '');
      setValue('skills', []);

      setOpen(false);
    }
  }
  const onSubmit: onSubmitType = (data: StackFormData) => {
    const checkAleart = window.confirm('積み上げを登録しますか？');
    if (checkAleart) {

      // TODO: 後でAPIを叩く。その時削除する。
      console.log(data);

      setValue('title', '');
      setValue('time', 0);
      setValue('editorContent', '');
      setValue('skills', []);

      setOpen(false);
    }
  }

  return (
    <>
      <Button onClick={handleOpen} className='fixed bottom-6 right-6 bg-blue-500 p-6 rounded-full hover:bg-blue-400'>
        <AddIcon className='text-white'/>
      </Button>
      <Modal open={open}>
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-[80vh] p-10 flex flex-col overflow-y-scroll">
          <div className='flex-1'>
            <div className='text-center text-2xl font-bold'>Create Stack</div>
            <div className='flex flex-col'>
              <CheckBox setValue={setValue} control={control} />
              <div className='flex'>
                <DateInput control={control} />
                <TextInput 
                  control={control}
                  name={"time"}
                  defaultValue={0}
                  fullWidth={true}
                  multiline={false}
                  minRows={1}
                  required={true}
                  requiredMessage={"必須入力"}
                  label={"Stacked Time"}
                  placeholder={"8"}
                  type='number'
                />
              </div>
              <TextInput 
                control={control}
                name={"title"}
                defaultValue={""}
                fullWidth={true}
                multiline={false}
                minRows={1}
                required={true}
                requiredMessage={"必須入力"}
                label={"Title"}
                placeholder={"Reactの学習..."}
                type='text'
              />
              <RichTextEditor control={control} />
            </div>
          </div>
          <div className='flex justify-center pt-6'>
            <Button onClick={onCancel} className='text-white bg-red-500 hover:bg-red-400 mx-2'>
              キャンセル
            </Button>
            <Button type='submit' onClick={handleSubmit(onSubmit)} className='text-white bg-blue-500 hover:bg-blue-400 mx-2'>
              積み上げを登録
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default StackForm
