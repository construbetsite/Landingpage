// src/hooks/useProductBySlug.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProductBySlug } from '../services/api/products';
import type { Product } from '../types/types';

export function useProductBySlug(slug: string) {
  const cleanSlug = typeof slug === 'string' ? slug.trim() : '';

  const query = useQuery<Product | null>({
    queryKey: ['product', cleanSlug],
    queryFn: async () => {
      if (!cleanSlug) return null;
      return await getProductBySlug(cleanSlug);
    },
    enabled: !!cleanSlug && cleanSlug.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: false,
    placeholderData: keepPreviousData,
  });

  return {
    product: query.data ?? null,
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}