import { SessionData } from "@/types/session";

export const setSession = ({token, userId, exp, role}: SessionData) => {
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

export const getSession = () => {
  const session = localStorage.getItem('session');
  if (!session) {
    return false;
  }
  return JSON.parse(session);
}