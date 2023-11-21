import { createOutputCommentApiProps } from "@/types/api";
import axios from "axios";

export const callCreateOutputComment = ({options, outputCommentFormData, router}: createOutputCommentApiProps) => {
  const outputId = outputCommentFormData.outputId;

  const CreateOutputComment = async () => {
    const params = {
      content: outputCommentFormData.content,
      user_id: 1 // TODO: sessionUser情報が渡されるようになったら修正する
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/outputs/${outputId}/comments`;

    try {
      const response = await axios.post(url, params, options);
      console.log(response.data);

      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  CreateOutputComment().then(res => {
    router.push(`/outputs/${outputId}`);
  });
}
