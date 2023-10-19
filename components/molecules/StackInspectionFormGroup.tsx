import React, { FC, useEffect, useContext } from 'react'
import AppContext from '@/context/AppContext';
import TextInput from './TextInput';
import Button from '@mui/material/Button';
import { IntrospectionFormDataParams } from '../../types/types';

const StackInspectionFormGroup: FC = () => {
  const appContext = useContext(AppContext);
  const { showStackIntrospection, introspectionFormData, setIntrospectionFormData } = appContext;

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setIntrospectionFormData({
      ...introspectionFormData,
      [name]: value,
    });
  };

  const handleArrayFieldChange = (fieldName: "keeps" | "tries" | "problems", value: string, index: number) => {
    setIntrospectionFormData((prevData: IntrospectionFormDataParams) => {
      const updatedField = [...prevData[fieldName]];
      updatedField[index].content = value;
      return {
        ...prevData,
        [fieldName]: updatedField,
      };
    });
  };

  const handleAddPoint = (fieldName: "keeps" | "problems" | "tries") => {
    const index = introspectionFormData[fieldName].length + 1;
    const nowDate = new Date();
    const newKeep = {
      id: index,
      content: '',
      created_at: nowDate,
      updated_at: nowDate
    };
  
    setIntrospectionFormData((prevData: IntrospectionFormDataParams) => ({
      ...prevData,
      [fieldName]: [...prevData[fieldName], newKeep],
    }));
  };

  const handleRemovePoint = (fieldName: "keeps" | "problems" | "tries", indexToRemove: number) => {
    setIntrospectionFormData((prevData: IntrospectionFormDataParams) => {
      const updatedField = [...prevData[fieldName]];
      updatedField.splice(indexToRemove, 1);
      return {
        ...prevData,
        [fieldName]: updatedField,
      };
    });
  };

  useEffect(() => {
    if (showStackIntrospection) {
      setIntrospectionFormData({
        evaluation: showStackIntrospection.evaluation,
        reason: showStackIntrospection.reason,
        keeps: showStackIntrospection.keeps,
        problems: showStackIntrospection.problems,
        tries: showStackIntrospection.tries,
        stack_id: showStackIntrospection.stack_id
      });
    }
  }, [])

  return (
    <>
      <TextInput
        name={"evaluation"}
        fullWidth={true}
        multiline={false}
        minRows={1}
        required={true}
        requiredMessage={"必須入力"}
        label={"評価"}
        placeholder={"80"}
        type='number'
        onChange={handleFieldChange}
        value={introspectionFormData.evaluation}
      />
      <TextInput
        name={"reason"}
        fullWidth={true}
        multiline={true}
        minRows={5}
        required={true}
        requiredMessage={"必須入力"}
        label={"理由"}
        placeholder={"Reactの教材を3冊読破したから..."}
        type='text'
        onChange={handleFieldChange}
        value={introspectionFormData.reason}
      />
      <div>
        {introspectionFormData.keeps.map((keep, index) => (
          <div key={keep.id} className='relative'>
            <TextInput 
              name={`keep[${index}]_content`}
              fullWidth={true}
              multiline={true}
              minRows={2}
              required={true}
              requiredMessage={"必須入力"}
              label={`Keep #${index + 1}`}
              placeholder={"目標の機能を全て実装できたため..."}
              type='text'
              onChange={(e) => handleArrayFieldChange("keeps", e.target.value, index)}
              value={introspectionFormData.keeps[index].content}
            />
            <div onClick={() => handleRemovePoint("keeps", index)} className='flex items-center justify-center absolute top-[-10px] right-[-10px] text-white bg-red-500 hover:bg-red-400 w-[30px] h-[30px] rounded-full cursor-pointer'>×</div>
          </div>
        ))}
        <Button onClick={() => handleAddPoint("keeps")} className='w-full border-indigo-200 border-2 text-white bg-[#000044] hover:bg-[#000066] mt-4 py-3'>
          Keepを追加
        </Button>
      </div>
      <div>
        {introspectionFormData.problems.map((problem, index) => (
          <div key={problem.id} className='relative'>
            <TextInput 
              name={`problem[${index}]_content`}
              fullWidth={true}
              multiline={true}
              minRows={2}
              required={true}
              requiredMessage={"必須入力"}
              label={`Problem #${index + 1}`}
              placeholder={"予定よりも8時間ほど工数が超過したため..."}
              type='text'
              onChange={(e) => handleArrayFieldChange("problems", e.target.value, index)}
              value={introspectionFormData.problems[index].content}
            />
            <div onClick={() => handleRemovePoint("problems", index)} className='flex items-center justify-center absolute top-[-10px] right-[-10px] text-white bg-red-500 hover:bg-red-400 w-[30px] h-[30px] rounded-full cursor-pointer'>×</div>
          </div>
        ))}
        <Button onClick={() => handleAddPoint("problems")} className='w-full border-indigo-200 border-2 text-white bg-[#000044] hover:bg-[#000066] mt-4 py-3'>
          Problemを追加
        </Button>
      </div>
      <div>
        {introspectionFormData.tries.map((tries, index) => (
          <div key={tries.id} className='relative'>
            <TextInput 
              name={`try[${index}]_content`}  // 正しいプロパティを指定
              fullWidth={true}
              multiline={true}
              minRows={2}
              required={true}
              requiredMessage={"必須入力"}
              label={`Try #${index + 1}`}
              placeholder={"今回のReactアプリをTypeScriptで実装する..."}
              type='text'
              onChange={(e) => handleArrayFieldChange("tries", e.target.value, index)}
              value={introspectionFormData.tries[index].content}
            />
            <div onClick={() => handleRemovePoint("tries", index)} className='flex items-center justify-center absolute top-[-10px] right-[-10px] text-white bg-red-500 hover:bg-red-400 w-[30px] h-[30px] rounded-full cursor-pointer'>×</div>
          </div>
        ))}
        <Button onClick={() => handleAddPoint("tries")} className='w-full border-indigo-200 border-2 text-white bg-[#000044] hover:bg-[#000066] mt-4 py-3'>
          Tryを追加
        </Button>
      </div>
    </>
  )
}

export default StackInspectionFormGroup
