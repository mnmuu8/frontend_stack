import axios from "axios";
import { SessionData } from "@/features/sessions/types/session";
import { getSession } from "@/features/sessions/functions/session";

export const uploadFile = async (file: File, imageUrl: string) => {
  await axios.put(imageUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const getUploadUrl = async ( filename: string, byteSize: number, contentType: string, uploadUrl: string ) => {
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

export const attachImage = async (sessionData: SessionData, imagePath: string, attachUrl: string) => {
  await axios.put(
    attachUrl,
    imagePath,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionData.token}`,
      },
      params: {
        s3_file_path: imagePath,
      },
    },
  );
};
