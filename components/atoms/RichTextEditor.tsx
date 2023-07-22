import React, { FC } from 'react'
import dynamic from 'next/dynamic';
const ReactQuillNoSSR = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';

import { RichTextEditorProps } from '@/types/types';

const RichTextEditor: FC<RichTextEditorProps> = ( props ) => {
  const { control } = props;

  return (
    <Box className="mt-4">
      <Controller
        name="editorContent"
        control={control}
        rules={{
          required: false,
        }}
        render={({ field }) => (
          <>
            {typeof window !== 'undefined' && (
              <ReactQuillNoSSR
                value={field.value}
                onChange={field.onChange}
                placeholder="ここにテキストを入力してください"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image'],
                    [{ color: [] }],
                    [{ 'code-block': 'insertCode' }],
                    [{ 'blockquote': 'insertBlockquote' }],
                  ],
                }}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'list',
                  'bullet',
                  'link',
                  'image',
                  'color',
                  'code-block',
                  'blockquote',
                ]}
              />
            )}
          </>
        )}
      />
    </Box>
  )
}

export default RichTextEditor
