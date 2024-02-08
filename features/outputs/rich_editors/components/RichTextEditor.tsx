import React, { useState, useMemo, useEffect } from 'react';

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
import ToolbarButtons from './ToolbarButtons';
import { stateToHTML } from 'draft-js-export-html';
import { GetUploadUrl } from '@/features/users/types/user';
import { SessionData } from '@/features/sessions/types/session';
import { getSession } from '@/features/sessions/functions/session';
import { ProcessFileDropEventProps, RichTextEditorProps } from '../../types/editor';
import axios from 'axios';

const MAX_FILE_SIZE = 10485760;
const MAX_IMAGES = 4;

const RichTextEditor = <FormData extends {}> ({ setFormData, formData, uploadUrl, attachUrl }: RichTextEditorProps<FormData>) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [uploadedImagesCount, setUploadedImagesCount] = useState<number>(0);

  const uploadFile = async (file: File, uploadUrl: string) => {
    await axios.put(uploadUrl, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
  };

  const attachOutputImage = async (sessionData: SessionData, outputCommentImagePath: string) => {
    await axios.put(
      attachUrl,
      outputCommentImagePath,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.token}`,
        },
        params: {
          s3_file_path: outputCommentImagePath,
        },
      },
    );
  };

  const getUploadUrl = async ({ filename, byteSize, contentType }: GetUploadUrl) => {
    const sessionData = getSession();
    if (!sessionData) return;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.token}`,
      },
      params: {
        filename: filename,
        byte_size: byteSize,
        content_type: contentType,
      },
    };

    const response = await axios.get(uploadUrl, options);
    return response.data.url;
  };

  const fileDropEvent = async ({ file, editorState, setEditorState }: ProcessFileDropEventProps) => {
    try {
      const sessionData = getSession();
      if (!sessionData) return;
  
      const uploadUrl = await getUploadUrl({
        filename: file.name,
        byteSize: file.size,
        contentType: file.type
      });

      await uploadFile(file, uploadUrl);

      const imageUrl = uploadUrl.split('?')[0];
      await attachOutputImage(sessionData, imageUrl);

      insertImageToEditor({
        imageUrl,
        editorState,
        setEditorState
      });
    } catch (error) {
      console.error('ファイルのアップロードに失敗しました', error);
    }
  };

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dataTransferItems = e.dataTransfer.items;
    if ( !dataTransferItems ) return;

    for (let i = 0; i < dataTransferItems.length; i++) {
      if (uploadedImagesCount >= MAX_IMAGES) {
        alert('4枚以上は登録できません')
        break;
      }
      
      const item = dataTransferItems[i];
      if (item.kind !== 'file') return;
      
      const file = item.getAsFile();
      if (!file || file.size >= MAX_FILE_SIZE) {
        alert('10MB以上の画像は登録できません')
        break;
      }

      await fileDropEvent({file, editorState, setEditorState})
      setUploadedImagesCount((prev) => prev + 1);
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
    if ( !formData ) return;
    const currentContent = editorState.getCurrentContent();
    const htmlContent = stateToHTML(currentContent);
    const newHtmlContent = cleanEditorContent(htmlContent);

    setFormData({ ...formData, content: newHtmlContent });
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
