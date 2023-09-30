import React, { FC, useContext } from 'react'
import AppContext from '@/context/AppContext';

const StackIntrospectionShowGroup: FC = () => {
  const appContext = useContext(AppContext);
  const { showStackIntrospection } = appContext;

  return (
    <>
      <div className='mt-8'>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>評価</div>
          <div>{showStackIntrospection?.evaluation}</div>
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>理由</div>
          <div>{showStackIntrospection?.reason}</div>
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Keep</div>
          {showStackIntrospection?.keeps.map((keep_content, index) => (
            <div key={keep_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>Keep #{index + 1}</div>
              <div>・{keep_content.content}</div>
            </div>
          ))}
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Problem</div>
          {showStackIntrospection?.ploblems.map((problem_content, index) => (
            <div key={problem_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>Problem #{index + 1}</div>
              <div>・{problem_content.content}</div>
            </div>
          ))}
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Try</div>
          {showStackIntrospection?.tries.map((try_content, index) => (
            <div key={try_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>Try #{index + 1}</div>
              <div>・{try_content.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default StackIntrospectionShowGroup
