import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getPosts } from "../services/blogApi";

import type {
  BlogPost,
  ListBlogPostsParams,
  Pagination,
} from "../types/blog";

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

  const [posts, setPosts] = useState<BlogPost[]>([]);

  const [pagination, setPagination] =
    useState<Pagination>({
      page,
      limit,
      total: 0,
      totalPages: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPosts({
        page,
        limit,
        status: true,
        ...(category ? { category } : {}),
        ...(tag ? { tag } : {}),
        ...(featured !== undefined
          ? { featured }
          : {}),
      });

      setPosts(response.data ?? []);

      setPagination(
        response.pagination ?? {
          page,
          limit,
          total: response.data?.length ?? 0,
          totalPages: 1,
        }
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao carregar os posts.";

      setError(message);
      setPosts([]);

      setPagination({
        page,
        limit,
        total: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    category,
    tag,
    featured,
  ]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    pagination,
    loading,
    error,
    refetch: fetchPosts,
  };
}