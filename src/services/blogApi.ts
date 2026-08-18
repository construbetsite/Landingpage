// ============================================================
// BLOG API - CLIENTE PÚBLICO DA LANDING PAGE
// ============================================================
//
// Responsabilidade:
// - Listar posts publicados
// - Buscar post publicado por slug
// - Listar categorias
//
// NÃO possui:
// - criação
// - edição
// - exclusão
// - upload
// - autenticação administrativa
// ============================================================

import type {
  BlogCategoria,
  BlogCategoriaListResponse,
  BlogItemResponse,
  BlogListResponse,
  ListBlogPostsParams,
  BlogPost,
} from "../types/blog";

const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:10000"
).replace(/\/+$/, "");

const DEFAULT_TIMEOUT_MS = 15_000;

// ============================================================
// ERRO DA API
// ============================================================

export class BlogApiError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "BlogApiError";
    this.status = status;
  }
}

// ============================================================
// OPÇÕES
// ============================================================

export interface BlogRequestOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
}

// ============================================================
// QUERY STRING
// ============================================================

function buildQuery(
  params?: Record<string, unknown>
): string {
  if (!params) return "";

  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return;
    }

    search.set(key, String(value));
  });

  const query = search.toString();

  return query ? `?${query}` : "";
}

// ============================================================
// REQUEST
// ============================================================

async function request<T>(
  path: string,
  options: BlogRequestOptions = {}
): Promise<T> {
  const {
    signal,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const controller = new AbortController();

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  const handleExternalAbort = () => {
    controller.abort();
  };

  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener(
        "abort",
        handleExternalAbort,
        { once: true }
      );
    }
  }

  const url = `${API_BASE}/api/blog${path}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      let message = `Erro ${response.status}`;

      try {
        const body = await response.json();

        message =
          body?.message ||
          body?.error ||
          message;
      } catch {
        // resposta sem JSON
      }

      throw new BlogApiError(
        message,
        response.status
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof BlogApiError) {
      throw error;
    }

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new BlogApiError(
        "Requisição cancelada",
        0
      );
    }

    throw new BlogApiError(
      error instanceof Error
        ? error.message
        : "Erro de rede ao consultar o blog.",
      0
    );
  } finally {
    window.clearTimeout(timeoutId);

    if (signal) {
      signal.removeEventListener(
        "abort",
        handleExternalAbort
      );
    }
  }
}

// ============================================================
// LISTAR POSTS
// ============================================================

export async function getPosts(
  params: ListBlogPostsParams = {},
  options: BlogRequestOptions = {}
): Promise<BlogListResponse> {
  const queryParams: ListBlogPostsParams = {
    page: params.page ?? 1,
    limit: params.limit ?? 10,

    // Landing page só trabalha com posts publicados.
    status: true,

    ...(params.category
      ? { category: params.category }
      : {}),

    ...(params.tag
      ? { tag: params.tag }
      : {}),

    ...(params.featured !== undefined
      ? { featured: params.featured }
      : {}),
  };

  const query = buildQuery(
    queryParams as Record<string, unknown>
  );

  return request<BlogListResponse>(
    `/posts${query}`,
    options
  );
}

// ============================================================
// POSTS EM DESTAQUE
// ============================================================

export async function getFeaturedPosts(
  limit = 5,
  options: BlogRequestOptions = {}
) {
  const response = await getPosts(
    {
      page: 1,
      limit,
      status: true,
      featured: true,
    },
    options
  );

  return response.data ?? [];
}

// ============================================================
// BUSCAR POR SLUG
// ============================================================

export async function getPostBySlug(
  slug: string,
  options: BlogRequestOptions = {}
): Promise<BlogPost | null> {
  const encodedSlug = encodeURIComponent(slug);

  const endpoint = `/posts/slug/${encodedSlug}`;

  console.log("========================================");
  console.log("🔎 BLOG - BUSCA DE POST");
  console.log("Slug recebido:", slug);
  console.log("Slug codificado:", encodedSlug);
  console.log("Endpoint:", endpoint);
  console.log("URL final:", `${API_BASE}/api/blog${endpoint}`);
  console.log("========================================");

  try {
    const response = await request<BlogItemResponse>(
      endpoint,
      options
    );

    console.log("📥 Resposta do post:", response);

    if (!response.data) {
      console.warn("⚠️ API respondeu sem data.");
      return null;
    }

    if (response.data.status === false) {
      console.warn("⚠️ Post encontrado, mas está publicado=false.");
      return null;
    }

    console.log("✅ POST ENCONTRADO:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ ERRO AO BUSCAR POST:", error);

    if (
      error instanceof BlogApiError &&
      error.status === 404
    ) {
      console.warn("⚠️ API retornou 404 para:", slug);
      return null;
    }

    throw error;
  }
}

// ============================================================
// CATEGORIAS
// ============================================================

export async function getCategories(
  options: BlogRequestOptions = {}
): Promise<BlogCategoria[]> {
  const response =
    await request<BlogCategoriaListResponse>(
      "/categorias",
      options
    );

  return response.data ?? [];
}