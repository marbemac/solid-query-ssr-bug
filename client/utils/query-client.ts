import { QueryClient } from '@tanstack/solid-query';

export const createQueryClient = () => {
  const queryClient = new QueryClient();

  return queryClient;
};
