import { ApiOptions, callStackApiProps, callUserApiProps, createIntrospectionApiProps, createTeamApiProps, inviteTeamApiProps } from "@/types/api";
import { useRouter } from 'next/router';
import { SessionData } from "@/types/session";
import axios from "axios";

export const getApiHeaders = (sessionData: SessionData): ApiOptions => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.token}`
    }
  }
}

export const getNextApiHeaders = (token: string): ApiOptions => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
}

export const getApiHeadersWithUserId = (sessionData: SessionData): ApiOptions<{user_id: number}> => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData.token}`
    },
    params: {
      user_id: sessionData.userId
    }
  }
}

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
  
  updateUser().then(res => router.push('/mypage'));
}

export const callCreateStack = ({options, sessionData, stackFormData, router}: callStackApiProps) => {
  const createStack = async () => {
    const params = {
      title: stackFormData.title,
      description: stackFormData.description,
      minutes: stackFormData.minutes,
      skill_id: stackFormData.skill,
      stacked_at: stackFormData.stacked_at,
      user_id: sessionData.userId
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks`;
    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  createStack().then(res => router.push('/timeline'));
}

export const callCreateIntrospection = ({options, introspectionFormData, setIsRegisterEvent, router}: createIntrospectionApiProps) => {
  const createIntrospection = async () => {
    const params = {
      evaluation: introspectionFormData.evaluation,
      reason: introspectionFormData.reason,
      keep_contents: introspectionFormData.keeps.map((keep: any) => keep.content),
      problem_contents: introspectionFormData.problems.map((problem: any) => problem.content),
      try_contents: introspectionFormData.tries.map((tries: any) => tries.content),
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;

    try {
      const response = await axios.post(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };

  createIntrospection().then(res => {
    setIsRegisterEvent(true);
    router.push('/timeline');
  });
}

export const callUpdateIntrospection = ({options, introspectionFormData, setIsRegisterEvent, router}: createIntrospectionApiProps) => {
  const updateIntrospection = async () => {
    const params = {
      evaluation: introspectionFormData.evaluation,
      reason: introspectionFormData.reason,
      keep_contents: introspectionFormData.keeps.map((keep: any) => keep.content),
      problem_contents: introspectionFormData.problems.map((problem: any) => problem.content),
      try_contents: introspectionFormData.tries.map((tries: any) => tries.content),
    }
    const url: string = `${process.env.API_ROOT_URL}/api/v1/stacks/${introspectionFormData.stack_id}/introspection`;
  
    try {
      const response = await axios.patch(url, params, options);
      return response.data;
    } catch (error) {
      throw new Error(`${JSON.stringify(error)}`);
    }
  };
  
  updateIntrospection().then(res => {
    setIsRegisterEvent(true);
    router.push('/timeline');
  });
}
