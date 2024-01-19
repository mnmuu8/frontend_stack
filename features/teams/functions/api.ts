import axios from "axios";
import { z } from 'zod';
import { ErrorMessages } from "@/common/types/validator";
import { inviteTeamSchema, teamSchema } from "@/common/functions/validator";
import { callCreateTeamProps, callInviteTeamProps, callUpdateTeamProps } from "../types/api";

export const callCreateTeam = async ({options, teamFormData, setErrorMessages}: callCreateTeamProps) => {
  try {
    teamSchema.parse(teamFormData);

    const params = {
      name: teamFormData.name
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/teams`;
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

export const callUpdateTeam = async ({options, teamFormData, setErrorMessages}: callUpdateTeamProps) => {
  try {
    teamSchema.parse(teamFormData);
  
    const params = {
      name: teamFormData.name
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/teams/${teamFormData.id}`;
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

export const callInviteTeam = async ({options, inviteTeamFormData, setErrorMessages }: callInviteTeamProps) => {
  try {
    inviteTeamSchema.parse(inviteTeamFormData);

    const params = {
      email: inviteTeamFormData.email
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/teams/${inviteTeamFormData.id}/invite`;
    await axios.put(url, params, options);
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
