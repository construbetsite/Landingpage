const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:10000';

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Erro ${res.status}: ${res.statusText}`);
  }

  // Tenta parsear JSON, se falhar retorna vazio
  const data = await res.json().catch(() => ({}));
  // Se a resposta tem campo success e data, retorna data; senão retorna o objeto
  return (data && data.success !== undefined) ? data.data : data;
}