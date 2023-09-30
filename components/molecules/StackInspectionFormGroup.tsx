import React, { FC, useState, useEffect, useContext } from 'react'
import AppContext from '@/context/AppContext';
import { useFieldArray } from 'react-hook-form';
import TextInput from './TextInput';
import Button from '@mui/material/Button';
import { ControlProps } from '../../types/types';

const StackInspectionFormGroup: FC<ControlProps> = ({ control }) => {
  const appContext = useContext(AppContext);
  const { showStackIntrospection } = appContext;
  const { fields: keepsFields, append: appendkeeps, remove: removekeeps } = useFieldArray({
    control,
    name: 'keeps',
  });
  const { fields: problemsFields, append: appendproblems, remove: removeproblems } = useFieldArray({
    control,
    name: 'problems',
  });
  const { fields: triesFields, append: appendtries, remove: removetries } = useFieldArray({
    control,
    name: 'tries',
  });
  const [evalutionValue, setEvalutionValue] = useState<number>(0);
  const [reasonValue, setReasonValue] = useState<string>("");

  const handleAddKeepPoint = () => {
    const id = String(keepsFields.length + 1);
    const now = new Date().toISOString();
    appendkeeps({ id, content: '', created_at: now, updated_at: now });
  };
  const handleAddProblemPoint = () => {
    const id = String(keepsFields.length + 1);
    const now = new Date().toISOString();
    appendproblems({ id, content: '', created_at: now, updated_at: now });
  };
  const handleAddTryPoint = () => {
    const id = String(keepsFields.length + 1);
    const now = new Date().toISOString();
    appendtries({ id, content: '', created_at: now, updated_at: now });
  };

  useEffect(() => {
    if (showStackIntrospection) {
      setEvalutionValue(showStackIntrospection.evaluation);
      setReasonValue(showStackIntrospection.reason);
    }
  }, [])

  return (
    <>
      <TextInput
        control={control}
        name={"evaluation"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"評価"}
        placeholder={"80"}
        type='number'
        onChange={(e) => setEvalutionValue(Number(e.target.value))}
        value={evalutionValue}
      />
      <TextInput
        control={control}
        name={"reason"}
        fullWidth={true}
        multiline={true}
        minRows={5}
        required={true}
        requiredMessage={"必須入力"}
        label={"理由"}
        placeholder={"Reactの教材を3冊読破したから..."}
        type='text'
        onChange={(e) => setReasonValue(e.target.value)}
        value={reasonValue}
      />
      <div>
        {keepsFields.map((field, index) => (
          <div key={field.id} className='relative'>
            <TextInput 
              control={control}
              name={`keeps[${index}].content`}
              fullWidth={true}
              multiline={true}
              minRows={2}
              required={true}
              requiredMessage={"必須入力"}
              label={`Keep #${index + 1}`}
              placeholder={"目標の機能を全て実装できたため..."}
              type='text'
            />
            <div onClick={() => removekeeps(index)} className='flex items-center justify-center absolute top-[-10px] right-[-10px] text-white bg-red-500 hover:bg-red-400 w-[30px] h-[30px] rounded-full cursor-pointer'>×</div>
          </div>
        ))}
        <Button onClick={handleAddKeepPoint} className='w-full border-indigo-200 border-2 text-white bg-[#000044] hover:bg-[#000066] mt-4 py-3'>
          Keepを追加
        </Button>
      </div>
      <div>
        {problemsFields.map((field, index) => (
          <div key={field.id} className='relative'>
            <TextInput 
              control={control}
              name={`problems[${index}].content`}  // 正しいプロパティを指定
              fullWidth={true}
              multiline={true}
              minRows={2}
              required={true}
              requiredMessage={"必須入力"}
              label={`Problem #${index + 1}`}
              placeholder={"予定よりも8時間ほど工数が超過したため..."}
              type='text'
            />
            <div onClick={() => removeproblems(index)} className='flex items-center justify-center absolute top-[-10px] right-[-10px] text-white bg-red-500 hover:bg-red-400 w-[30px] h-[30px] rounded-full cursor-pointer'>×</div>
          </div>
        ))}
        <Button onClick={handleAddProblemPoint} className='w-full border-indigo-200 border-2 text-white bg-[#000044] hover:bg-[#000066] mt-4 py-3'>
          Problemを追加
        </Button>
      </div>
      <div>
        {triesFields.map((field, index) => (
          <div key={field.id} className='relative'>
            <TextInput 
              control={control}
              name={`tries[${index}].content`}  // 正しいプロパティを指定
              fullWidth={true}
              multiline={true}
              minRows={2}
              required={true}
              requiredMessage={"必須入力"}
              label={`Try #${index + 1}`}
              placeholder={"今回のReactアプリをTypeScriptで実装する..."}
              type='text'
            />
            <div onClick={() => removetries(index)} className='flex items-center justify-center absolute top-[-10px] right-[-10px] text-white bg-red-500 hover:bg-red-400 w-[30px] h-[30px] rounded-full cursor-pointer'>×</div>
          </div>
        ))}
        <Button onClick={handleAddTryPoint} className='w-full border-indigo-200 border-2 text-white bg-[#000044] hover:bg-[#000066] mt-4 py-3'>
          Tryを追加
        </Button>
      </div>
    </>
  )
}

export default StackInspectionFormGroup
