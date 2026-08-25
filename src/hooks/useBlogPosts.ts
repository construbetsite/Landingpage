import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services/blogApi";
import type { BlogPost, ListBlogPostsParams, Pagination } from "../types/blog";

export interface UseBlogPostsResult {
  posts: BlogPost[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBlogPosts(
  params: ListBlogPostsParams = {}
): UseBlogPostsResult {
  const {
    page = 1,
    limit = 10,
    category,
    tag,
    featured,
  } = params;

  const query = useQuery({
    queryKey: ["blog-posts", { page, limit, category, tag, featured }],
    queryFn: async ({ signal }) => {
      return await getPosts(
        {
          page,
          limit,
          status: true,
          ...(category ? { category } : {}),
          ...(tag ? { tag } : {}),
          ...(featured !== undefined ? { featured } : {}),
        },
        { signal }
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    posts: query.data?.data ?? [],
    pagination: query.data?.pagination ?? {
      page,
      limit,
      total: 0,
      totalPages: 0,
    },
    loading: query.isLoading,
    error: query.error ? (query.error as Error).message : null,
    refetch: () => {
      query.refetch();
    },
  };
}
