import { createTeamApiProps, inviteTeamApiProps } from "@/common/types/api";
import axios from "axios";

export const callCreateTeam = ({options, teamFormData, setIsRegisterEvent}: createTeamApiProps) => {
  const createTeam = async () => {
    const params = {
      name: teamFormData.name
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/teams`;

    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  createTeam().then(res => {
    setIsRegisterEvent(true);
  });
}

export const callUpdateTeam = ({options, teamFormData, setIsRegisterEvent}: createTeamApiProps) => {
  const updateTeam = async () => {
    const params = {
      name: teamFormData.name
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/teams/${teamFormData.id}`;

    try {
      const response = await axios.patch(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  updateTeam().then(res => {
    setIsRegisterEvent(true);
  });
}

export const callInviteTeam = ({options, inviteTeamFormData, router}: inviteTeamApiProps) => {
  const inviteTeam = async () => {
    const params = {
      email: inviteTeamFormData.email
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/teams/${inviteTeamFormData.id}/invite`;

    try {
      const response = await axios.put(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  inviteTeam().then(res => {});
}