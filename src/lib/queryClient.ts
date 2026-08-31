import { QueryClient } from "@tanstack/react-query";

/**
 * Política de cache do cliente alinhada ao backend:
 * - staleTime 60s: dentro de 1 min os dados são servidos do cache (zero rede),
 *   espelhando o `Cache-Control: max-age=60` do backend.
 * - gcTime 5 min: após expirar, o dado antigo ainda é servido enquanto a
 *   revalidação acontece em background (stale-while-revalidate).
 * - refetchOnWindowFocus/Reconnect desativados para evitar tráfego excessivo.
 * - Após mutações, invalidar manualmente:
 *   queryClient.invalidateQueries({ queryKey: ['products'] })
 */
export const DATA_STALE_TIME = 1000 * 60; // 1 minuto
export const DATA_GC_TIME = 1000 * 60 * 5; // 5 minutos

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DATA_STALE_TIME,
      gcTime: DATA_GC_TIME,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});
