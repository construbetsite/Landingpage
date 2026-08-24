// src/hooks/useProductCategories.ts
import { useEffect, useState } from 'react';
import { getProductCategories } from '../services/api/products';
import type { ProductCategory } from '../types/types';

export function useProductCategories(filters?: {
  active?: boolean;
  parentId?: string | null;
}) {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getProductCategories({
          active: filters?.active ?? true,
          ...filters,
        });
        setCategories(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar categorias');
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [filters?.active, filters?.parentId]);

  return { categories, loading, error };
}