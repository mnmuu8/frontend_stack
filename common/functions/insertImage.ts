import axios from "axios";
import { SessionData } from "@/features/sessions/types/session";
import { GetUploadUrl } from "@/features/users/types/user";
import { getSession } from "@/features/sessions/functions/session";

export const uploadFile = async (file: File, uploadUrl: string) => {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const getUploadUrl = async ({ filename, byteSize, contentType, uploadUrl }: GetUploadUrl) => {
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
