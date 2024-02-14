import React, { FC, useContext } from 'react'
import RichTextEditor from '../rich_editors/components/RichTextEditor';
import { OutputFormContext } from '../contexts/OutputFormContext';
import { OutputFormDataParams } from '../types/context';

const OutputEditor: FC = () => {
  const { setOutputFormData, outputFormData } = useContext(OutputFormContext);

  const uploadUrl = `${process.env.API_ROOT_URL}/api/v1/outputs/images/upload_url`;
  const attachUrl = `${process.env.API_ROOT_URL}/api/v1/outputs/images/attach`;

  return (
    <RichTextEditor<OutputFormDataParams> 
      setFormData={setOutputFormData}
      formData={outputFormData}
      uploadUrl={uploadUrl}
      attachUrl={attachUrl}
    />
  )
}

export default OutputEditor;
