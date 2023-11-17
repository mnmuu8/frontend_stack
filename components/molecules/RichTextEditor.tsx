import React, { FC, useState, useMemo, } from 'react'

import Editor from '@draft-js-plugins/editor';
import { EditorState, RichUtils } from 'draft-js';
import "draft-js/dist/Draft.css";
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CodeIcon from '@mui/icons-material/Code';
import TerminalIcon from '@mui/icons-material/Terminal';

import { blockStyleFn } from '@/utiliry/editor/blockStyleClasses';
import { styleMap } from '@/utiliry/editor/InlineStykeClasses';
import { handleBeforeInput, handleKeyCommand, handlePastedText, handleReturn, keyBindingFn } from '@/utiliry/editor/editorOptions';

const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [plugins] = useMemo(() => {
    const linkifyPlugin = createLinkifyPlugin({
      component: (props) => (
        <a href={props.href} style={{ color: '#3b5998', textDecoration: 'underline' }}>
          {props.children}
        </a>
      )
    });
    const inlineToolbarPlugin = createInlineToolbarPlugin();

    return [
      [inlineToolbarPlugin, linkifyPlugin]
    ];
  }, []);

  const applyCustomInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  }
  const applyCustomBlockType = (type: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  }

  const toolbarButtons = [
    { action: applyCustomInlineStyle, styleType: 'BOLD', IconComponent: FormatBoldIcon },
    { action: applyCustomInlineStyle, styleType: 'ITALIC', IconComponent: FormatItalicIcon },
    { action: applyCustomInlineStyle, styleType: 'UNDERLINE', IconComponent: FormatUnderlinedIcon },
    { action: applyCustomInlineStyle, styleType: 'CODE', IconComponent: CodeIcon },
    { action: applyCustomBlockType, styleType: 'unordered-list-item', IconComponent: FormatListBulletedIcon },
    { action: applyCustomBlockType, styleType: 'ordered-list-item', IconComponent: FormatListNumberedIcon },
    { action: applyCustomBlockType, styleType: 'blockquote', IconComponent: FormatQuoteIcon },
    { action: applyCustomBlockType, styleType: 'code-block', IconComponent: TerminalIcon }
  ];

  return (
    <div className='mt-4'>
      <div className='flex items-center px-2 py-1 rounded-t-md border-t border-l border-r border-gray-300 bg-gray-100 space-x-1 w-full'>
        {
          toolbarButtons.map(({ action, styleType, IconComponent }) => (
            <button key={styleType} onClick={() => action(styleType)} className='hover:bg-gray-200 px-1 rounded-sm'>
              <IconComponent fontSize='small' />
            </button>
          ))
        }
      </div>
      <div className='shadow-sm border-b border-l border-r border-gray-300 rounded-b-md text-md overflow-scroll h-[420px] p-3 prose prose-stone'>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleReturn={() => handleReturn({editorState, setEditorState})}
          keyBindingFn={(e) => keyBindingFn({e, editorState})}
          handleKeyCommand={(command) => handleKeyCommand({command, editorState, setEditorState})}
          handlePastedText={(text) => handlePastedText({text, editorState, setEditorState})}
          handleBeforeInput={(chars) => handleBeforeInput({chars, editorState, setEditorState})}
          blockStyleFn={blockStyleFn}
          customStyleMap={styleMap}
          plugins={plugins}
          placeholder="アウトプットの内容を入力してください..."
        />
      </div>
    </div>
  )
}

export default RichTextEditor
