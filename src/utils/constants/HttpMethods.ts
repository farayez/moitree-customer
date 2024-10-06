export type HttpMethod = { name: string };

export const HttpMethods: Record<string, HttpMethod> = {
  get: {
    name: 'GET',
  },
  post: {
    name: 'POST',
  },
  patch: {
    name: 'PATCH',
  },
  delete: {
    name: 'DELETE',
  },
};
