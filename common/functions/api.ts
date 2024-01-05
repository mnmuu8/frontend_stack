import { ApiOptions } from "../types/api";
import { getSession } from "@/features/sessions/functions/session";

export const getApiHeaders = (): ApiOptions => {
  const sessionData = getSession();

  if (!sessionData) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      }
    }
  }

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

export const getApiHeadersWithUserId = (): ApiOptions => {
  const sessionData = getSession();

  if (!sessionData) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '
      },
      params: {
        user_id: 0
      }
    }
  }

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
