import React, { FC, useContext, useRef } from 'react'
import { RichUtils } from 'draft-js';

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Terminal,
  InsertPhoto,
} from '@mui/icons-material/';
import { ToolbarButtonsProps } from '../../types/editor';
import { insertImageToEditor } from '../functions/editorOptions';
import { getSession } from '@/features/sessions/functions/session';
import { MAX_FILE_SIZE, MAX_IMAGES } from '@/common/constans/insertImage';
import { getUploadUrl } from '../functions/uploadUrl';
import { attachImage } from '../functions/attach';
import { uploadS3 } from '../functions/uploadS3';
import { FormContext } from '@/context/FormContext';
import { validateFileSize, validateImageCount } from '../functions/vaildator';

const ToolbarButtons: FC<ToolbarButtonsProps> = ({ setEditorState, editorState, uploadUrl, attachUrl, uploadedImagesCount })  => {
  const { formType } = useContext(FormContext);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileOpen = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (formType == 'createOutputComment' && !validateImageCount(uploadedImagesCount, MAX_IMAGES)) return;

    if ( e.target.files ) {
      const file = e.target.files[0];
      if (!validateFileSize(file, MAX_FILE_SIZE)) return;

      try {
        const sessionData = getSession();
        if (!sessionData) return;

        const imageUrl = await getUploadUrl(file.name, file.size, file.type, uploadUrl);
        await uploadS3(file, imageUrl);
  
        const imagePath = imageUrl.split('?')[0];
        await attachImage(sessionData, imagePath, attachUrl);

        insertImageToEditor({
          imagePath,
          editorState,
          setEditorState,
        });
        e.target.value = '';
      } catch (error) {
        console.error('ファイルのアップロードに失敗しました', error);
      }
    }
  };

  const applyCustomInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyCustomBlockType = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const toolbarButtons = [
    { action: applyCustomInlineStyle, styleType: 'BOLD', IconComponent: FormatBold },
    { action: applyCustomInlineStyle, styleType: 'ITALIC', IconComponent: FormatItalic },
    { action: applyCustomInlineStyle, styleType: 'UNDERLINE', IconComponent: FormatUnderlined },
    { action: applyCustomInlineStyle, styleType: 'CODE', IconComponent: Code },
    { action: applyCustomBlockType, styleType: 'unordered-list-item', IconComponent: FormatListBulleted },
    { action: applyCustomBlockType, styleType: 'ordered-list-item', IconComponent: FormatListNumbered },
    { action: applyCustomBlockType, styleType: 'blockquote', IconComponent: FormatQuote },
    { action: applyCustomBlockType, styleType: 'code-block', IconComponent: Terminal },
  ];

  return (
    <div className='flex items-center px-2 py-1 rounded-t-md border-t border-l border-r border-gray-300 bg-gray-100 space-x-1 w-full'>
      {toolbarButtons.map(({ action, styleType, IconComponent }) => (
        <button key={styleType} onClick={() => action(styleType)} className='hover:bg-gray-200 px-1 rounded-sm'>
          <IconComponent fontSize='small' />
        </button>
      ))}
      <button onClick={handleFileOpen} className='hover:bg-gray-200 px-1 rounded-sm'>
        <InsertPhoto fontSize='small' />
        <input
          type="file"
          onChange={handleFileInput}
          accept="image/png, image/jpeg"
          className='hidden'
          ref={fileInputRef} 
        />
      </button>
    </div>
  )
}

export default ToolbarButtons
