// ============================================================
// useBlogCategories - Lista categorias com cache
// ============================================================

import { useEffect, useState, useCallback, useRef } from "react";
import { getCategories } from "../services/blogApi";
import type { BlogCategoria } from "../types/blog";

let cached: { data: BlogCategoria[]; expiresAt: number } | null = null;
const TTL = 5 * 60_000; // 5 min

export interface UseBlogCategoriesResult {
  categories: BlogCategoria[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBlogCategories() {
  const initial = cached && cached.expiresAt > Date.now() ? cached.data : [];
  const [categories, setCategories] = useState<BlogCategoria[]>(initial);
  const [loading, setLoading] = useState(initial.length === 0);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setError(null);
    if (!cached || cached.expiresAt <= Date.now()) setLoading(true);

    getCategories({ signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setCategories(data);
        cached = { data, expiresAt: Date.now() + TTL };
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) return;
        setError(err.message || "Erro ao carregar categorias");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
    return () => abortRef.current?.abort();
  }, [load]);

  return { categories, loading, error, refetch: load };
}
