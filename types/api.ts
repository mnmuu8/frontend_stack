export type ApiOptions<T extends Record<string, string | number> = {}> = {
  headers: {
    'Content-Type': string;
    'Authorization': string;
  };
  params?: T;
};
