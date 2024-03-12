import axios from "axios";
import { z } from 'zod';
import { ErrorMessages } from "@/common/types/validator";
import { UpdateUserProps } from "../types/api";
import { userSchema } from "@/common/functions/validator";

export const callUpdateUser = async ({options, sessionData, userFormData, setErrorMessages}: UpdateUserProps) => {
  try {
    userSchema.parse(userFormData)

    const params = {
      role: userFormData.role,
      name: userFormData.name,
      email: userFormData.email,
      profile_content: userFormData.profile_content,
      user_id: sessionData.userId,
      current_password: userFormData.current_password,
      new_password: userFormData.new_password,
      new_password_confirmation: userFormData.new_password_confirmation,
      team_id: userFormData.team.id,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`;
    await axios.patch(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: ErrorMessages = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrorMessages(newErrors);

      throw error;
    } else {
      console.error("APIリクエストエラー:", error);
    }
  }
}