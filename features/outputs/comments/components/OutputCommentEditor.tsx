import React, { FC, useContext } from 'react'
import RichTextEditor from '../../rich_editors/components/RichTextEditor'
import { OutputCommentFormContext } from '../contexts/OutputCommentFormContext';
import { OutputCommentFormDataParams } from '../types/context';

const OutputCommentEditor: FC = () => {
  const { outputCommentFormData, setOutputCommentFormData } = useContext(OutputCommentFormContext);
  const outputId = outputCommentFormData.outputId

  const uploadUrl = `${process.env.API_ROOT_URL}/api/v1/outputs/${outputId}/comments/images/upload_url`;
  const attachUrl = `${process.env.API_ROOT_URL}/api/v1/outputs/${outputId}/comments/images/attach`;

  return (
    <RichTextEditor<OutputCommentFormDataParams> 
      setFormData={setOutputCommentFormData}
      formData={outputCommentFormData}
      uploadUrl={uploadUrl}
      attachUrl={attachUrl}
    />
  )
}

export default OutputCommentEditor;
