import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
import { AtomicBlockUtils, EditorState, RichUtils } from 'draft-js';

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

type ToolbarButtonsProps = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
};

const ToolbarButtons: FC<ToolbarButtonsProps> = ({ setEditorState, editorState }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileOpen = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const insertImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: imageUrl }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const newState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    setEditorState(newState);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ( e.target.files ) {
      insertImage(e.target.files[0]);
      e.target.value = '';
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
