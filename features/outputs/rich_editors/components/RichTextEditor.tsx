import React, { FC, useState, useMemo, useContext, useEffect } from 'react';

import Editor from '@draft-js-plugins/editor';
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import createImagePlugin from '@draft-js-plugins/image';

import { blockStyleFn } from '../functions/blockStyleClasses';
import { styleMap } from '../functions/InlineStyleClasses';
import { handleBeforeInput,
  handleKeyCommand,
  handlePastedText,
  handleReturn,
  insertImageToEditor,
  keyBindingFn,
} from '../functions/editorOptions';
import { stateToHTML } from 'draft-js-export-html';
import { OutputFormContext } from '../../contexts/OutputFormContext';
import ToolbarButtons from './ToolbarButtons';
import { ProcessFileDropEventProps } from '../../types/editor';

const RichTextEditor: FC = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const { setOutputFormData } = useContext(OutputFormContext);

  const processFileDropEvent = ({ item, editorState, setEditorState }: ProcessFileDropEventProps) => {
    if (item.kind !== 'file') return;
  
    const file = item.getAsFile();
    if (file) insertImageToEditor({ file, editorState, setEditorState });
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dataTransferItems = e.dataTransfer.items;
    if ( !dataTransferItems ) return;

    for (let i = 0; i < dataTransferItems.length; i++) {
      const item = dataTransferItems[i];
      processFileDropEvent({item, editorState, setEditorState})
    }
  };

  const [plugins] = useMemo(() => {
    const linkifyPlugin = createLinkifyPlugin({
      component: (props) => (
        <a href={props.href} style={{ color: '#3b5998', textDecoration: 'underline' }}>
          {props.children}
        </a>
      ),
    });
    const inlineToolbarPlugin = createInlineToolbarPlugin();
    const imagePlugin = createImagePlugin();

    return [[inlineToolbarPlugin, linkifyPlugin, imagePlugin]];
  }, []);

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
      <ToolbarButtons editorState={editorState} setEditorState={setEditorState} />
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        className='shadow-sm border-b border-l border-r border-gray-300 rounded-b-md text-md overflow-scroll h-[420px] p-3 prose prose-stone'
      >
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
