// src/hooks/useProductCategories.ts
import { useQuery } from '@tanstack/react-query';
import { getProductCategories } from '../services/api/products';
import type { ProductCategory } from '../types/types';

export interface ProductCategoryFilters {
  active?: boolean;
  parentId?: string | null;
}

export function useProductCategories(filters?: ProductCategoryFilters) {
  const query = useQuery<ProductCategory[]>({
    queryKey: ['product-categories', filters],
    queryFn: () =>
      getProductCategories({
        active: filters?.active ?? true,
        ...filters,
      }),
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}