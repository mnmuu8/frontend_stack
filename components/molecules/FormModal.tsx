import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormDataParams, onSubmitType, FormTypeProps, setFormGroupProps } from '@/types/types';
import AppContext from '@/context/AppContext';
import StackInspectionFormGroup from './StackInspectionFormGroup';
import StackIntrospectionShowGroup from './StackIntrospectionShowGroup';
import StackFormGroup from './StackFormGroup';
import UserFormGroup from './UserFormGroup';
import axios from 'axios';
import { getSession } from '@/utiliry/session';
import { useRouter } from 'next/router';

const FormModal: FC = () => {
  const appContext = useContext(AppContext);
  const { formOpen, setFormOpen, formType, setFormType, showStackIntrospection, setShowStackIntrospection } = appContext;
  const { control, handleSubmit, setValue } = useForm<FormDataParams>();
  const router = useRouter();

  const resetValueByFormType = (): void => {
    if (formType === 'createStack') {
      setValue('title', '');
      setValue('time', 0);
      setValue('editorContent', '');
      setValue('skill', {id: 1, name: 'プログラミング'})
    }

    if (formType === 'createStackIntrospection' || formType === 'updateStackIntrospection') {
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
      setValue('team', '')
    }
  }

  const resetValue = (alert: boolean): void => {
    if (!alert) {
      return;
    }

    resetValueByFormType();

    setFormOpen(false);

    setShowStackIntrospection(undefined);
  }

  const onCancel = () => {
    const checkAlert = window.confirm('キャンセルすると入力した値が全て削除されますがよろしいでしょうか？');
    resetValue(checkAlert);
  }
  const onSubmit: onSubmitType = (data: FormDataParams) => {
    const sessionData = getSession();
    if (!sessionData) return;
    
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      }
    }

    let checkAlert = window.confirm();
    let params = {}

    if (formType === 'createStack') {
      checkAlert = window.confirm('積み上げを登録しますか？');
      params = {
        title: data.title,
        description: data.editorContent,
        minutes: data.time,
        skill_id: data.skill.id,
        stacked_at: data.date,
        user_id: sessionData.userId
      }
    }

    axios.post('http://localhost:3000/api/v1/stacks', params, options)
    .then(response => {
      router.push('/timeline')
    })
    .catch(error => {
      throw new Error(`${JSON.stringify(error)}`);
    });
    resetValue(checkAlert);
  }

  const upadateStackIntrospectionForm = () => {
    setFormType('updateStackIntrospection');

    if (showStackIntrospection) {
      setValue('evaluation', showStackIntrospection.evaluation);
      setValue('reason', showStackIntrospection.reason);
      for (let i = 0; i < showStackIntrospection.keep_contents.length; i++) {
        setValue(`keeps[${i}].content` as any, showStackIntrospection.keep_contents[i].content);
      }
      for (let i = 0; i < showStackIntrospection.problem_contents.length; i++) {
        setValue(`problems[${i}].content` as any, showStackIntrospection.problem_contents[i].content);
      }
      for (let i = 0; i < showStackIntrospection.try_contents.length; i++) {
        setValue(`tries[${i}].content` as any, showStackIntrospection.try_contents[i].content);
      }
    }
  }

  const setFormGroup = ({formType, setValue, control}: FormTypeProps): setFormGroupProps | undefined  => {
    if (formType === 'createStack') {
      return {
        label: '積み上げを作成',
        component: <StackFormGroup setValue={setValue} control={control} />,
        button: <Button onClick={handleSubmit(onSubmit)} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>作成</Button>
      }
    }

    if (formType === 'createStackIntrospection') {
      return {
        label: '積み上げの反省を作成',
        component: <StackInspectionFormGroup control={control} />,
        button: <Button onClick={handleSubmit(onSubmit)} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>作成</Button>
      }
    }

    if (formType === 'updateStackIntrospection') {
      return {
        label: '積み上げの反省を編集',
        component: <StackInspectionFormGroup control={control} />,
        button: <Button onClick={handleSubmit(onSubmit)} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
      }
    }

    if (formType === 'updateUser') {
      return {
        label: 'update User',
        component: <UserFormGroup setValue={setValue} control={control} />,
        button: <Button onClick={handleSubmit(onSubmit)} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
      }
    }

    if (formType === 'showStackIntrospection') {
      return {
        label: '積み上げの反省',
        component: <StackIntrospectionShowGroup />,
        button: <Button onClick={handleSubmit(upadateStackIntrospectionForm)} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>編集</Button>
      }
    }
  }

  const cancelButton = <Button onClick={onCancel} className='bg-gray-300 hover:bg-gray-200 text-gray-800 mx-2 w-full py-4'>キャンセル</Button>
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
            {cancelButton}
            {currentFormGroup?.button}
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default FormModal
