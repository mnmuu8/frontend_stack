import React, { FC, useContext } from 'react'
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormDataParams, onSubmitType, FormTypeProps, setFormGroupProps, ApiOptions } from '@/types/types';
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
  const { formOpen, setFormOpen, formType, showStackIntrospection, setShowStackIntrospection, introspectionFormData } = appContext;
  const { control, handleSubmit, setValue } = useForm<FormDataParams>();
  const router = useRouter();

  const resetValueByFormType = (): void => {
    if (formType === 'createStack') {
      setValue('title', '');
      setValue('time', 0);
      setValue('editorContent', '');
      setValue('skill', {id: 1, name: 'プログラミング'})
    }

    if (formType === 'updateUser') {
      setValue('name', '')
      setValue('email', '')
      setValue('profile_content', '')
      setValue('team', 0)
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

  const FormSubmit = () => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options: ApiOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      }
    }

    let checkAlert = false;

    if (formType === 'updateStackIntrospection') {
      if ( !showStackIntrospection ) return

      checkAlert = window.confirm('反省情報を更新しますか？');

      const updateIntrospection = async () => {
        const params = {
          evaluation: introspectionFormData.evaluation,
          reason: introspectionFormData.reason,
          keep_contents: introspectionFormData.keeps.map((keep) => keep.content),
          problem_contents: introspectionFormData.problems.map((problem) => problem.content),
          try_contents: introspectionFormData.tries.map((tries) => tries.content),
        }
        const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${showStackIntrospection.id}/introspection`;

        try {
          const response = await axios.patch(url, params, options);
          return response.data;
        } catch (error) {
          throw new Error(`${JSON.stringify(error)}`);
        }
      };

      updateIntrospection().then(res => router.push('/timeline'));
    }

    if (formType === 'createStackIntrospection') {
      checkAlert = window.confirm('反省を作成しますか？');

      const createIntrospection = async () => {
        const params = {
          evaluation: introspectionFormData.evaluation,
          reason: introspectionFormData.reason,
          keep_contents: introspectionFormData.keeps.map((keep) => keep.content),
          problem_contents: introspectionFormData.problems.map((problem) => problem.content),
          try_contents: introspectionFormData.tries.map((tries) => tries.content),
        }
        const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;

        try {
          const response = await axios.post(url, params, options);
          return response.data;
        } catch (error) {
          throw new Error(`${JSON.stringify(error)}`);
        }
      };

      createIntrospection().then(res => router.push('/timeline'));
    }

    resetValue(checkAlert);
  }

  const onSubmit: onSubmitType = (data: FormDataParams) => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options: ApiOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.token}`
      }
    }

    let checkAlert = false;
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

      axios.post(`${process.env.API_ROOT_URL}/api/v1/stacks`, params, options)
      .then(response => {
        router.push('/timeline')
      })
      .catch(error => {
        throw new Error(`${JSON.stringify(error)}`);
      });
    }

    if (formType === 'updateUser') {
      checkAlert = window.confirm('ユーザー情報を更新しますか？');

      const updateUser = async () => {
        const params = {
          name: data.name,
          email: data.email,
          profile_content: data.profile_content,
          user_id: sessionData.userId,
          team_id: data.team
        }
        const url: string = `${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`;
        try {
          const response = await axios.patch(url, params, options);
          return response.data;
        } catch (error) {
          throw new Error(`${JSON.stringify(error)}`);
        }
      };

      updateUser().then(res => router.push('/mypage'));
    }

    resetValue(checkAlert);
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
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>作成</Button>
      }
    }

    if (formType === 'updateStackIntrospection') {
      return {
        label: '積み上げの反省を編集',
        component: <StackInspectionFormGroup control={control} />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
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
        button: <Button onClick={handleSubmit(onSubmit)} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
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
