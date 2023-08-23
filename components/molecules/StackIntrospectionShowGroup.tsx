import React, { FC, useContext } from 'react'
import AppContext from '@/context/AppContext';

const StackIntrospectionShowGroup: FC = () => {
  const appContext = useContext(AppContext);
  const { showStackIntrospection } = appContext;

  return (
    <>
      <div className='mt-8'>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Evaluation</div>
          <div>{showStackIntrospection?.evaluation}</div>
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Reason</div>
          <div>{showStackIntrospection?.reason}</div>
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Keep Contents</div>
          {showStackIntrospection?.keep_contents.map((keep_content, index) => (
            <div key={keep_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>Keep Content #{index + 1}</div>
              <div>・{keep_content.content}</div>
            </div>
          ))}
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Problem Contents</div>
          {showStackIntrospection?.problem_contents.map((problem_content, index) => (
            <div key={problem_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>Problem Content #{index + 1}</div>
              <div>・{problem_content.content}</div>
            </div>
          ))}
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>Try Contents</div>
          {showStackIntrospection?.try_contents.map((try_content, index) => (
            <div key={try_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>Try Content #{index + 1}</div>
              <div>・{try_content.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default StackIntrospectionShowGroup
