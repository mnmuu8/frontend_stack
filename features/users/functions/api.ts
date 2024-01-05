import { callUserApiProps, createUserApiProps } from "@/common/types/api";
import axios from "axios";

export const callCreateUser = ({options, userFormData, router}: createUserApiProps) => {
  const createUser = async () => {
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
    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };
  createUser().then(res => router.push('/profile'));
}

export const callUpdateUser = ({options, sessionData, userFormData, router}: callUserApiProps) => {
  const updateUser = async () => {
    const params = {
      role: userFormData.role,
      name: userFormData.name,
      email: userFormData.email,
      profile_content: userFormData.profile_content,
      user_id: sessionData.userId,
      team_id: userFormData.team.id,
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/users/${sessionData.userId}`;
    try {
      const response = await axios.patch(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  updateUser().then(res => router.push('/profile'));
}