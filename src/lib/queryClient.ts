import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos de dados frescos
      gcTime: 1000 * 60 * 30, // 30 minutos em cache inativo
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
