import { SessionData } from '../types/session';

export const setSession = (token: string, userId: number, exp: string, role: string): void => {
  const lastActivity = new Date().getTime();
  const session = {
    token,
    userId,
    exp,
    lastActivity,
    role,
  };
  localStorage.setItem('session', JSON.stringify(session));
};

export const getSession = () : SessionData | false => {
  const session = localStorage.getItem('session');
  if (!session) {
    return false;
  }
  return JSON.parse(session);
}
