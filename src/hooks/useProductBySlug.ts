// src/hooks/useProductBySlug.ts
import { useEffect, useState } from 'react';
import { getProductBySlug } from '../services/api/products';
import type { Product } from '../types/types';

export function useProductBySlug(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getProductBySlug(slug);
        setProduct(data || null);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Produto não encontrado');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { product, loading, error };
}