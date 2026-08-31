// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/api/products';
import { DATA_STALE_TIME } from '../lib/queryClient';
import type { Product } from '../types/types';

export interface ProductFilters {
  categoryId?: string;
  commercialType?: 'PICKUP' | 'ECOMMERCE';
  active?: boolean;
  featured?: boolean;
}

export function useProducts(params?: ProductFilters) {
  const query = useQuery<Product[]>({
    queryKey: ['products', params],
    queryFn: () =>
      getProducts({
        active: params?.active ?? true,
        ...params,
      }),
    staleTime: DATA_STALE_TIME, // 1 min — alinhado ao max-age=60 do backend
  });

  return {
    products: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}