import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormDataParams, onSubmitType } from '@/types/types';
import AppContext from '@/context/AppContext';
import StackInspectionFormGroup from './StackInspectionFormGroup';
import StackFormGroup from './StackFormGroup';

const FormModal: FC = () => {
  const appContext = useContext(AppContext);
  const { formOpen, setFormOpen, formType } = appContext;
  const { control, handleSubmit, setValue } = useForm<FormDataParams>();

  const resetSetValue = (aleart: boolean) => {
    if (aleart) {
      if (formType === 'stackCreate') {
        setValue('title', '');
        setValue('time', 0);
        setValue('editorContent', '');
        setValue('skill', null)
      } else {
        setValue('evaluation', 0)
        setValue('reason', '') 
        setValue('keeps', [])
        setValue('problems', [])
        setValue('tries', [])
      }
      setFormOpen(false);
    }
  }
  
  const onCancel = () => {
    const checkAleart = window.confirm('キャンセルすると入力した値が全て削除されますがよろしいでしょうか？');
    resetSetValue(checkAleart)
  }
  const onSubmit: onSubmitType = (data: FormDataParams) => {
    const checkAleart = window.confirm('積み上げを登録しますか？');
    // TODO: 後でAPIを叩く。その時削除する。
    console.log(data);
    resetSetValue(checkAleart)
  }

  return (
    <>
      <Modal open={formOpen}>
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-[80vh] p-10 flex flex-col overflow-y-scroll">
          <div className='flex-1'>
            <div className='text-center text-2xl font-bold'>{formType === 'stackCreate' ? 'Create Stack' : 'Create Stack Inspestion'}</div>
            <div className='flex flex-col'>
              {formType === 'stackCreate' ? (
                <StackFormGroup setValue={setValue} control={control} />
              ) : (
                <StackInspectionFormGroup control={control} />
              )}
            </div>
          </div>
          <div className='flex justify-center pt-6'>
            <Button onClick={onCancel} className='bg-gray-200 text-gray-800 hover:bg-gray-300 mx-2 w-full py-4'>
              Cancel
            </Button>
            <Button type='submit' onClick={handleSubmit(onSubmit)} className='text-white bg-blue-300 hover:bg-blue-400 mx-2 w-full'>
              Create Stack
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default FormModal
