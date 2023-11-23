import React, { FC, useState, useMemo, useContext, useEffect } from 'react';

import Editor from '@draft-js-plugins/editor';
import { EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';

import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  Terminal,
} from '@mui/icons-material/';

import { blockStyleFn } from '@/utiliry/editor/blockStyleClasses';
import { styleMap } from '@/utiliry/editor/InlineStykeClasses';
import {
  handleBeforeInput,
  handleKeyCommand,
  handlePastedText,
  handleReturn,
  keyBindingFn,
} from '@/utiliry/editor/editorOptions';
import { FormDataContext } from '@/context/FormDataContext';
import { stateToHTML } from 'draft-js-export-html';

const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const formDataContext = useContext(FormDataContext);
  const { setOutputFormData } = formDataContext;

  const [plugins] = useMemo(() => {
    const linkifyPlugin = createLinkifyPlugin({
      component: (props) => (
        <a href={props.href} style={{ color: '#3b5998', textDecoration: 'underline' }}>
          {props.children}
        </a>
      ),
    });
    const inlineToolbarPlugin = createInlineToolbarPlugin();

    return [[inlineToolbarPlugin, linkifyPlugin]];
  }, []);

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

  const cleanEditorContent = (htmlContent: string) => {
    if (htmlContent.trim() === '<p><br></p>') return '';
    return htmlContent;
  };

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const htmlContent = stateToHTML(currentContent);
    const newHtmlContent = cleanEditorContent(htmlContent);

    setOutputFormData({ content: newHtmlContent });
  }, [editorState]);

  return (
    <div className='mt-4'>
      <div className='flex items-center px-2 py-1 rounded-t-md border-t border-l border-r border-gray-300 bg-gray-100 space-x-1 w-full'>
        {toolbarButtons.map(({ action, styleType, IconComponent }) => (
          <button key={styleType} onClick={() => action(styleType)} className='hover:bg-gray-200 px-1 rounded-sm'>
            <IconComponent fontSize='small' />
          </button>
        ))}
      </div>
      <div className='shadow-sm border-b border-l border-r border-gray-300 rounded-b-md text-md overflow-scroll h-[420px] p-3 prose prose-stone'>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleReturn={() => handleReturn({ editorState, setEditorState })}
          keyBindingFn={(e) => keyBindingFn({ e, editorState })}
          handleKeyCommand={(command) => handleKeyCommand({ command, editorState, setEditorState })}
          handlePastedText={(text) => handlePastedText({ text, editorState, setEditorState })}
          handleBeforeInput={(chars) => handleBeforeInput({ chars, editorState, setEditorState })}
          blockStyleFn={blockStyleFn}
          customStyleMap={styleMap}
          plugins={plugins}
          placeholder='アウトプットの内容を入力してください...'
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
