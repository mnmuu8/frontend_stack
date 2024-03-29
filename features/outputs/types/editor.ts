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

export type ToolbarButtonsProps = EditorStateProps & SetEditorStateProps & {
  uploadUrl: string;
  attachUrl: string;
  uploadedImagesCount: number;
};

export type InsertImageToEditorProps = EditorStateProps & SetEditorStateProps & {
  imagePath: File;
};

export type ProcessFileDropEventProps = EditorStateProps & SetEditorStateProps & {
  file: File;
};

export type RichTextEditorProps<FormData> = {
  setFormData: (data: FormData) => void;
  formData: FormData;
  uploadUrl: string;
  attachUrl: string;
};

export type PostImageModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setZoomed: React.Dispatch<React.SetStateAction<boolean>>
  zoomed: boolean
  selectedImageUrl: string
};
