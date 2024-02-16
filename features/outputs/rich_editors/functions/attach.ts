import axios from "axios";
import { SessionData } from "@/features/sessions/types/session";

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
