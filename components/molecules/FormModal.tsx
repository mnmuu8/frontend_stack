import React, { FC, ReactElement, useContext, useEffect } from 'react'
import { set, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormDataParams, onSubmitType, FormTypeProps, setFormGroupProps } from '@/types/types';
import AppContext from '@/context/AppContext';
import StackInspectionFormGroup from './StackInspectionFormGroup';
import StackFormGroup from './StackFormGroup';
import UserFormGroup from './UserFormGroup';

const FormModal: FC = () => {
  const appContext = useContext(AppContext);
  const { formOpen, setFormOpen, formType, setFormType } = appContext;
  const { control, handleSubmit, setValue } = useForm<FormDataParams>();

  // useEffect(() => {
  //   setFormOpen(true)
  //   setFormType('updateUser')
  // }, []);

  const resetValueByFormType = (): void => {
    if (formType === 'createStack') {
      setValue('title', '');
      setValue('time', 0);
      setValue('editorContent', '');
      setValue('skill', null)
    }

    if (formType === 'createStackIntrospection') {
      setValue('evaluation', 0)
      setValue('reason', '')
      setValue('keeps', [])
      setValue('problems', [])
      setValue('tries', [])
    }

    if (formType === 'updateUser') {
      setValue('name', '')
      setValue('email', '')
      setValue('profile_content', '')
      setValue('group', '')
    }
  }

  const resetValue = (alert: boolean): void => {
    if (!alert) {
      return;
    }

    resetValueByFormType();

    setFormOpen(false);
  }

  const onCancel = () => {
    const checkAlert = window.confirm('キャンセルすると入力した値が全て削除されますがよろしいでしょうか？');
    resetValue(checkAlert);
  }
  const onSubmit: onSubmitType = (data: FormDataParams) => {
    // TODO: フォームによってアラート内容を変更する。
    const checkAlert = window.confirm('積み上げを登録しますか？');

    // TODO: 後でAPIを叩く。その時削除する。
    console.log(data);
    resetValue(checkAlert);
  }

  const setFormGroup = ({formType, setValue, control}: FormTypeProps): setFormGroupProps | undefined  => {
    if (formType === 'createStack') {
      return {
        label: 'create Stack',
        component: <StackFormGroup setValue={setValue} control={control} />
      }
    }

    if (formType === 'createStackIntrospection') {
      return {
        label: 'create Stack Inspection',
        component: <StackInspectionFormGroup control={control} />
      }
    }

    if (formType === 'updateUser') {
      return {
        label: 'update User',
        component: <UserFormGroup setValue={setValue} control={control} />
      }
    }
  }

  const currentFormGroup = setFormGroup({ formType, setValue, control });

  return (
    <>
      <Modal open={formOpen}>
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-[80vh] p-10 flex flex-col overflow-y-scroll">
          <div className='flex-1'>
            <div className='text-center text-2xl font-bold'>{currentFormGroup?.label}</div>
            <div className='flex flex-col'>
              {currentFormGroup?.component}
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
