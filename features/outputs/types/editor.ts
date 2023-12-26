import { EditorState } from 'draft-js';

type EditorStateProps = {
  editorState: EditorState;
};

type SetEditorStateProps = {
  setEditorState: (editorState: EditorState) => void;
};

export type handleReturnProps = EditorStateProps & SetEditorStateProps;

export type handlePastedTextProps = EditorStateProps &
  SetEditorStateProps & {
    text: string;
  };

export type keyBindingFnProps = EditorStateProps & {
  e: React.KeyboardEvent;
};

export type handleKeyCommandProps = EditorStateProps &
  SetEditorStateProps & {
    command: string;
  };

export type HandleBeforeInputProps = EditorStateProps &
  SetEditorStateProps & {
    chars: string;
  };
