import React, { FC, useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormTypeProps, setFormGroupProps } from '@/types/form';
import { ApiOptions } from '@/types/api';
import StackInspectionFormGroup from './StackInspectionFormGroup';
import StackFormGroup from './StackFormGroup';
import UserFormGroup from './UserFormGroup';
import axios from 'axios';
import { getSession } from '@/utiliry/session';
import { useRouter } from 'next/router';
import TeamFormGroup from './TeamFormGroup';
import { FormContext } from '@/context/FormContext';
import { FormDataContext } from '@/context/FormDataContext';

const FormModal: FC = () => {
  const formContext = useContext(FormContext);
  const { formOpen, setFormOpen, formType, setIsRegisterEvent } = formContext;
  
  const formDataContext = useContext(FormDataContext);
  const { teamFormData, setTeamFormData, userFormData, stackFormData, showStackIntrospection, setShowStackIntrospection, introspectionFormData } = formDataContext;

  const router = useRouter();

  const resetValue = (alert: boolean): void => {
    if (!alert) {
      return;
    }

    setFormOpen(false);

    setShowStackIntrospection(undefined);

    setIsRegisterEvent(false)

    setTeamFormData({name: ""})
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

      updateIntrospection().then(res => {
        setIsRegisterEvent(true);
        router.push('/timeline');
      });
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

      createIntrospection().then(res => {
        setIsRegisterEvent(true);
        router.push('/timeline');
      });
    }

    if (formType === 'createTeam') {
      checkAlert = window.confirm('チームを作成しますか？');

      const createTeam = async () => {
        const params = {
          name: teamFormData.name
        }
        const url: string = `${process.env.API_ROOT_URL}/api/v1/teams`;

        try {
          const response = await axios.post(url, params, options);
          return response.data;
        } catch (error) {
          throw new Error(`${JSON.stringify(error)}`);
        }
      };

      createTeam().then(res => {
        setIsRegisterEvent(true);
      });
    }

    if (formType === 'updateTeam') {
      checkAlert = window.confirm('チームを更新しますか？');

      const createTeam = async () => {
        const params = {
          name: teamFormData.name
        }
        const url: string = `${process.env.API_ROOT_URL}/api/v1/teams/${teamFormData.id}`;

        try {
          const response = await axios.patch(url, params, options);
          return response.data;
        } catch (error) {
          throw new Error(`${JSON.stringify(error)}`);
        }
      };

      createTeam().then(res => {
        setIsRegisterEvent(true);
      });
    }

    if (formType === 'updateUser') {
      checkAlert = window.confirm('ユーザー情報を更新しますか？');

      const updateUser = async () => {
        const params = {
          role: userFormData.role,
          name: userFormData.name,
          email: userFormData.email,
          profile_content: userFormData.profile_content,
          user_id: sessionData.userId,
          team_id: userFormData.team.id,
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

    if (formType === 'createStack') {
      checkAlert = window.confirm('積み上げを作成しますか？');

      const createStack = async () => {
        const params = {
          title: stackFormData.title,
          description: stackFormData.description,
          minutes: stackFormData.minutes,
          skill_id: stackFormData.skill,
          stacked_at: stackFormData.stacked_at,
          user_id: sessionData.userId
        }
        const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks`;
        try {
          const response = await axios.post(url, params, options);
          return response.data;
        } catch (error) {
          throw new Error(`${JSON.stringify(error)}`);
        }
      };

      createStack().then(res => router.push('/timeline'));
    }

    resetValue(checkAlert);
  }

  const setFormGroup = ({formType}: FormTypeProps): setFormGroupProps | undefined  => {
    if (formType === 'createStack') {
      return {
        label: '積み上げを作成',
        component: <StackFormGroup />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>作成</Button>
      }
    }

    if (formType === 'createStackIntrospection') {
      return {
        label: '積み上げの反省を作成',
        component: <StackInspectionFormGroup />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>作成</Button>
      }
    }

    if (formType === 'updateStackIntrospection') {
      return {
        label: '積み上げの反省を編集',
        component: <StackInspectionFormGroup />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
      }
    }

    if (formType === 'updateUser') {
      return {
        label: 'update User',
        component: <UserFormGroup />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
      }
    }

    if (formType === 'createTeam') {
      return {
        label: 'チームを作成',
        component: <TeamFormGroup />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>作成</Button>
      }
    }

    if (formType === 'updateTeam') {
      return {
        label: 'チームを更新',
        component: <TeamFormGroup />,
        button: <Button onClick={FormSubmit} className='bg-blue-400 hover:bg-blue-300 text-white mx-2 w-full' type='submit'>更新</Button>
      }
    }
  }

  const cancelButton = <Button onClick={onCancel} className='bg-gray-300 hover:bg-gray-200 text-gray-800 mx-2 w-full py-4'>キャンセル</Button>
  const currentFormGroup = setFormGroup({ formType });

  return (
    <>
      <Modal open={formOpen}>
        <Box className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[720px] h-auto max-h-[80vh] p-10 flex flex-col overflow-y-scroll">
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
