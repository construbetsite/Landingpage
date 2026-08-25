

import type {
  BlogCategoria,
  BlogCategoriaListResponse,
  BlogItemResponse,
  BlogListResponse,
  ListBlogPostsParams,
  BlogPost,
} from "../types/blog";

const API_BASE = (
  import.meta.env.VITE_API_URL
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
  optionsOrSignal?: BlogRequestOptions | AbortSignal
): Promise<BlogPost | null> {
  const options: BlogRequestOptions =
    optionsOrSignal instanceof AbortSignal
      ? { signal: optionsOrSignal }
      : optionsOrSignal || {};

  const encodedSlug = encodeURIComponent(slug);
  const endpoint = `/posts/slug/${encodedSlug}`;

  try {
    const response = await request<BlogItemResponse>(
      endpoint,
      options
    );

    if (!response.data) {
      return null;
    }

    if (response.data.status === false) {
      return null;
    }

    return response.data;
  } catch (error) {
    // Abort/Cancelamento normal do React Query ou desmontagem: não polui console
    if (
      (error instanceof DOMException && error.name === "AbortError") ||
      (error instanceof BlogApiError && error.message.includes("cancelada")) ||
      (options.signal && options.signal.aborted)
    ) {
      throw error;
    }

    if (
      error instanceof BlogApiError &&
      error.status === 404
    ) {
      if (import.meta.env.DEV) {
        console.warn("⚠️ Post não encontrado (404) para slug:", slug);
      }
      return null;
    }

    if (import.meta.env.DEV) {
      console.error("❌ Erro ao consultar post:", error);
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

// ============================================================
// OBJETO EXPORTADO PADRÃO
// ============================================================

export const blogApi = {
  getPosts,
  getFeaturedPosts,
  getPostBySlug,
  getCategories,
};
