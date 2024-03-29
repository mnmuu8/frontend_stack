import axios from "axios";
import { z } from 'zod';
import { ErrorMessages } from "@/common/types/validator";
import { CreateUserProps, UpdateUserProps } from "../types/api";
import { userRegisterSchema, userSchema } from "@/common/functions/validator";

export const callCreateUser = async ({options, userFormData, setErrorMessages}: CreateUserProps) => {
  try {
    userRegisterSchema.parse(userFormData)

    const params = {
      role: userFormData.role,
      name: userFormData.name,
      email: userFormData.email,
      profile_content: userFormData.profile_content,
      current_password: userFormData.current_password,
      new_password: userFormData.new_password,
      new_password_confirmation: userFormData.new_password_confirmation,
      team_id: userFormData.team.id,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/users/`;
    await axios.post(url, params, options);
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
