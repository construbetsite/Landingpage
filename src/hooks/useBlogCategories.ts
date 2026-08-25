// src/hooks/useBlogCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/blogApi";
import type { BlogCategoria } from "../types/blog";

export interface UseBlogCategoriesResult {
  categories: BlogCategoria[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBlogCategories(): UseBlogCategoriesResult {
  const query = useQuery<BlogCategoria[], Error>({
    queryKey: ["blog-categories"],
    queryFn: async ({ signal }) => {
      return await getCategories({ signal });
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    categories: query.data ?? [],
    loading: query.isLoading,
    error: query.error ? query.error.message : null,
    refetch: () => {
      query.refetch();
    },
  };
}
