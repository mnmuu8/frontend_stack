import axios from "axios";

export const uploadS3 = async (file: File, imageUrl: string) => {
  await axios.put(imageUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};
