import { AtomicBlockUtils, ContentState, EditorState, Modifier, SelectionState, getDefaultKeyBinding } from "draft-js";
import { HandleBeforeInputProps, InsertImageToEditorProps, handleKeyCommandProps, handlePastedTextProps, handleReturnProps, keyBindingFnProps } from "../../types/editor";

export const handleReturn = ({ editorState, setEditorState }: handleReturnProps) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const currentBlock = contentState.getBlockForKey(selection.getStartKey());
  const blockText = currentBlock.getText();

  if (currentBlock.getType() === 'code-block') {
    if (blockText.endsWith('\n\n')) {
      const blockLength = currentBlock.getLength();
      const rangeToRemove = new SelectionState({
        anchorKey: currentBlock.getKey(),
        anchorOffset: blockLength - 2,
        focusKey: currentBlock.getKey(),
        focusOffset: blockLength,
      });

      let newContentState = Modifier.removeRange(contentState, rangeToRemove, 'backward');
      newContentState = Modifier.splitBlock(newContentState, selection);

      const newBlockKey = newContentState.getKeyAfter(selection.getStartKey());
      newContentState = Modifier.setBlockType(newContentState, SelectionState.createEmpty(newBlockKey), 'unstyled');

      const newSelection = selection.merge({
        anchorKey: newBlockKey,
        anchorOffset: 0,
        focusKey: newBlockKey,
        focusOffset: 0,
      });

      const newEditorState = EditorState.push(editorState, newContentState, 'split-block');
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      return 'handled';
    }

    let newContentState = Modifier.insertText(contentState, selection, '\n');
    setEditorState(EditorState.push(editorState, newContentState, 'insert-characters'));
    return 'handled';
  }

  return 'not-handled';
};

export const handlePastedText = ({ text, editorState, setEditorState}: handlePastedTextProps) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const currentBlock = contentState.getBlockForKey(selection.getStartKey());

  if (currentBlock.getType() === 'code-block') {
    const lines = text.split('\n');
    const formattedText = lines.map((line) => { return line; }).join('\n');

    const newContentState = Modifier.replaceText(
      contentState,
      selection,
      formattedText
    );
    const newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
    setEditorState(newEditorState);
    return 'handled';
  }

  return 'not-handled';
};

export const keyBindingFn = ({e, editorState}: keyBindingFnProps) => {
  if (e.key === 'ArrowRight') {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    if (currentInlineStyle.has('CODE') && selection.getEndOffset() === currentBlock.getLength()) {
      return 'exit-code-inline-style';
    }
  }
  return getDefaultKeyBinding(e);
};

export const handleKeyCommand = ({ command, editorState, setEditorState }: handleKeyCommandProps) => {
  if (command === 'exit-code-inline-style') {
    const selection = editorState.getSelection();

    let newContentState = editorState.getCurrentContent();
    newContentState = Modifier.removeInlineStyle(newContentState, selection, 'CODE');

    let newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');

    const newSelection = selection.merge({
      anchorOffset: selection.getEndOffset() + 1,
      focusOffset: selection.getEndOffset() + 1,
    });

    newContentState = Modifier.insertText(newContentState, newSelection, ' ');
    newEditorState = EditorState.push(newEditorState, newContentState, 'insert-characters');

    setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    return 'handled';
  }

  return 'not-handled';
};

export const handleBeforeInput = ({ chars, editorState, setEditorState}: HandleBeforeInputProps) => {
  if (chars === '`') {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const newContentState = Modifier.applyInlineStyle(
        editorState.getCurrentContent(),
        selection,
        'CODE'
      );
      setEditorState(EditorState.push(editorState, newContentState, 'change-inline-style'));
      return 'handled';
    }
  }

  return 'not-handled';
};

export const insertImageToEditor = ({ imagePath, editorState, setEditorState} :InsertImageToEditorProps) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imagePath });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  const newState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  setEditorState(newState);
};

export const countImageBlocks = (contentState: ContentState) => {
  const blockMap = contentState.getBlockMap();
  return blockMap.filter((block) => {
    if (!block) return false;
    const entityKey = block.getEntityAt(0);
    if (entityKey) {
      const entity = contentState.getEntity(entityKey);
      return entity.getType() === 'IMAGE';
    }
    return false;
  }).size;
};
