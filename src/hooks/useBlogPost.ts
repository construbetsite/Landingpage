import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { BlogApiError, blogApi } from "../services/blogApi";
import type { BlogPost } from "../types/blog";

// ============================================================
// RESULTADO DO HOOK
// ============================================================

export interface UseBlogPostResult {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  refetch: () => void;
  data: BlogPost | null | undefined;
  isLoading: boolean;
  isError: boolean;
}

// ============================================================
// HOOK - POST INDIVIDUAL COM REACT QUERY
// ============================================================

export function useBlogPost(slug?: string): UseBlogPostResult {
  const cleanSlug = typeof slug === "string" ? slug.trim() : "";
  const isEnabled = cleanSlug.length > 0;

  const query = useQuery<BlogPost | null, Error>({
    queryKey: ["blogPost", cleanSlug],
    queryFn: async ({ signal }) => {
      if (!cleanSlug) return null;
      return await blogApi.getPostBySlug(cleanSlug, signal);
    },
    enabled: isEnabled,
    staleTime: 1000 * 60 * 5, // 5 minutos de dados frescos
    gcTime: 1000 * 60 * 30, // 30 minutos em cache
    retry: false, // Evita retry em cancelamento
    placeholderData: keepPreviousData, // Mantém dados anteriores durante transições
  });

  const isAbortError =
    query.error?.message === "Requisição cancelada" ||
    (query.error instanceof BlogApiError && query.error.message.includes("cancelada"));

  const isNotFound =
    (query.error instanceof BlogApiError && query.error.status === 404) ||
    (!query.isLoading && isEnabled && !query.isFetching && query.data === null);

  const displayError = isAbortError || isNotFound ? null : query.error ? query.error.message : null;

  return {
    post: query.data ?? null,
    loading: query.isLoading,
    error: displayError,
    notFound: isNotFound,
    refetch: () => {
      query.refetch();
    },
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError && !isAbortError && !isNotFound,
  };
}

export default useBlogPost;

