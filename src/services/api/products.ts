// src/services/api/products.ts
const API_BASE = import.meta.env.VITE_API_BASE;

export async function getProducts(filters?: {
  categoryId?: string;
  commercialType?: 'PICKUP' | 'ECOMMERCE';
  active?: boolean;
  featured?: boolean;
}) {
  const params = new URLSearchParams();
  if (filters?.categoryId) params.append('categoryId', filters.categoryId);
  if (filters?.commercialType) params.append('commercialType', filters.commercialType);
  if (filters?.active !== undefined) params.append('active', String(filters.active));
  if (filters?.featured !== undefined) params.append('featured', String(filters.featured));

  // ✅ CORREÇÃO: usar /product (singular) em vez de /products
  const url = `${API_BASE}/product${params.toString() ? `?${params}` : ''}`;
  console.log('🔍 Buscando produtos em:', url);

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    console.error('❌ Erro na resposta:', text);
    throw new Error(`Erro ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  console.log('📦 Resposta da API:', data);

  // Se a resposta for um objeto com 'data' (ex: { data: [...] })
  if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }

  // Se já for um array diretamente
  if (Array.isArray(data)) {
    return data;
  }

  // Caso contrário, retorna array vazio
  console.warn('⚠️ Resposta inesperada, retornando array vazio');
  return [];
}

export async function getProductBySlug(slug: string) {
  // ✅ CORREÇÃO: usar /product/slug/:slug
  const url = `${API_BASE}/product/slug/${slug}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Produto não encontrado');
  const data = await res.json();
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data;
  }
  return data;
}

export async function getProductById(id: string) {
  // ✅ CORREÇÃO: usar /product/:id
  const url = `${API_BASE}/product/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Produto não encontrado');
  const data = await res.json();
  if (data && typeof data === 'object' && 'data' in data) {
    return data.data;
  }
  return data;
}

// ─── Categorias ──────────────────────────────────────────────────
// As categorias já estão corretas: /api/product-categories

export async function getProductCategories(filters?: {
  active?: boolean;
  parentId?: string | null;
}) {
  const params = new URLSearchParams();
  if (filters?.active !== undefined) params.append('active', String(filters.active));
  if (filters?.parentId !== undefined) {
    if (filters.parentId === null) params.append('parentId', 'null');
    else params.append('parentId', filters.parentId);
  }

  const url = `${API_BASE}/product-categories${params.toString() ? `?${params}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao carregar categorias');
  const data = await res.json();
  if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }
  return Array.isArray(data) ? data : [];
}