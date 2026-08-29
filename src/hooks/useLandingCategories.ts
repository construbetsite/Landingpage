import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { blogApi } from "../services/blogApi";
import type { LandingCategory } from "../types/blog";

const CACHE_KEY = "construbet:landing-categories";
const CACHE_TTL_MS = 1000 * 60 * 5;

function readCache(): LandingCategory[] | undefined {
  try {
    const saved = localStorage.getItem(CACHE_KEY);
    if (!saved) return undefined;
    const { expiresAt, data } = JSON.parse(saved) as { expiresAt: number; data: LandingCategory[] };
    return Date.now() < expiresAt ? data : undefined;
  } catch {
    return undefined;
  }
}

function writeCache(data: LandingCategory[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, expiresAt: Date.now() + CACHE_TTL_MS }));
  } catch {
    // Cache é opcional.
  }
}

export function useLandingCategories() {
  const query = useQuery({
    queryKey: ["landingCategories"],
    queryFn: async () => {
      const categories = await blogApi.getLandingCategories();
      writeCache(categories);
      return categories;
    },
    initialData: readCache,
    staleTime: CACHE_TTL_MS,
    retry: false,
  });

  useEffect(() => {
    if (query.isError) {
      toast.error("Não foi possível carregar as categorias.", { toastId: "landing-categories-error" });
    }
  }, [query.isError]);

  return { categories: query.data ?? [], loading: query.isLoading, error: query.isError };
}
