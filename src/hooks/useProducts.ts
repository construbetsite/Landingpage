// src/hooks/useProducts.ts
import { useEffect, useState } from 'react';
import { getProducts } from '../services/api/products';
import type { Product } from '../types/types';

export function useProducts(params?: {
  categoryId?: string;
  commercialType?: 'PICKUP' | 'ECOMMERCE';
  active?: boolean;
  featured?: boolean;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getProducts({
          active: params?.active ?? true,
          ...params,
        });
        setProducts(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar produtos');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [params?.categoryId, params?.commercialType, params?.active, params?.featured]);

  return { products, loading, error };
}