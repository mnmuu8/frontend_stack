import axios from "axios";
import { z } from 'zod';
import { userRegisterSchema, userSchema } from "@/common/functions/validator";
import { callUserApiProps, createUserApiProps } from "@/common/types/api";

export const callCreateUser = async ({options, userFormData, setErrorMessages}: createUserApiProps) => {
  try {
    userRegisterSchema.parse(userFormData)

    const params = {
      role: userFormData.role,
      name: userFormData.name,
      email: userFormData.email,
      profile_content: userFormData.profile_content,
      password: userFormData.password,
      password_confirmation: userFormData.password_confirmation,
      team_id: userFormData.team.id,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/users/`;
    await axios.post(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: any = {};
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

export const callUpdateUser = async ({options, sessionData, userFormData, setErrorMessages}: callUserApiProps) => {
  try {
    userSchema.parse(userFormData)
  
    const params = {
      role: userFormData.role,
      name: userFormData.name,
      email: userFormData.email,
      profile_content: userFormData.profile_content,
      user_id: sessionData.userId,
      team_id: userFormData.team.id,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`;
    await axios.patch(url, params, options);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newErrors: any = {};
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