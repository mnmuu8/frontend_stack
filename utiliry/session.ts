export const setSession = (token: string, userId: number, exp: number) => {
  const lastActivity = new Date().getTime();
  const session = {
    token,
    userId,
    exp,
    lastActivity,
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