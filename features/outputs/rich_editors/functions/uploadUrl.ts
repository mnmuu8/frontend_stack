import axios from "axios";
import { getSession } from "@/features/sessions/functions/session";

export const getUploadUrl = async (filename: string, byteSize: number, contentType: string, uploadUrl: string) => {
  const sessionData = getSession();
  if (!sessionData || !uploadUrl) return;

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
