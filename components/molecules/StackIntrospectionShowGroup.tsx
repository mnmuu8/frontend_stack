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
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>継続する項目</div>
          {showStackIntrospection?.keep_contents.map((keep_content, index) => (
            <div key={keep_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>継続項目 #{index + 1}</div>
              <div>・{keep_content.content}</div>
            </div>
          ))}
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>反省する項目</div>
          {showStackIntrospection?.problem_contents.map((problem_content, index) => (
            <div key={problem_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>反省項目 #{index + 1}</div>
              <div>・{problem_content.content}</div>
            </div>
          ))}
        </div>
        <div className='mb-6'>
          <div className='text-lg font-bold text-gray-500 border-b-4 mb-2 py-1 bg-blue-50'>挑戦する項目</div>
          {showStackIntrospection?.try_contents.map((try_content, index) => (
            <div key={try_content.id} className='mb-3'>
              <div className='text-sm font-bold text-gray-400 mb-1'>挑戦項目 #{index + 1}</div>
              <div>・{try_content.content}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default StackIntrospectionShowGroup
