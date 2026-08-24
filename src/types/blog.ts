// ============================================================
// BLOG - TIPOS (alinhados com a API backend / tabela blog_posts)
// ============================================================
//
// Observação: o backend retorna os campos em snake_case. Mantemos
// os mesmos nomes aqui para evitar perda de informação ao receber
// a resposta e só convertemos para a UI quando necessário.
// ============================================================

/** Tipos de conteúdo que o backend pode devolver em `type`. */
export type PostType = "article" | "video" | "news" | string;

/** Categoria retornada pelo endpoint /blog/categorias. */
export interface BlogCategoria {
  id: string;
  nome: string;
  descricao?: string | null;
}

// ============================================================
// BLOG POST
// ============================================================

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  /** URL pública (Supabase Storage) ou absoluta (http/https). */
  image_url: string;
  /** Alias legado: alguns endpoints podem devolver a imagem como `image`. */
  image?: string;
  image_path?: string;
  image_filename?: string;
  image_size?: number;
  image_mime_type?: string;
  storage_bucket?: string;
  /** Nome legível da categoria (preenchido pelo backend). */
  category: string;
  categoria_id?: string;
  categoria?: BlogCategoria;
  reading_time?: string;
  type: PostType;
  featured: boolean;
  video1?: string;
  video2?: string;
  author?: string;
  author_image?: string;
  tags: string[];
  /** Controla exibição pública. Apenas `true` é listado/exibido. */
  status: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

// ============================================================
// PAGINAÇÃO
// ============================================================

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ============================================================
// PARÂMETROS / RESPOSTAS
// ============================================================

export interface ListBlogPostsParams {
  page?: number;
  limit?: number;
  /** Sempre `true` no site público para nunca exibir rascunhos. */
  status?: boolean;
  category?: string;
  tag?: string;
  featured?: boolean;
}

export interface BlogListResponse {
  success: boolean;
  data: BlogPost[];
  pagination?: Pagination;
  message?: string;
}

export interface BlogItemResponse {
  success: boolean;
  data: BlogPost;
  message?: string;
}


export interface BlogCategoriaListResponse {
  success: boolean;
  data: BlogCategoria[];
  message?: string;
}

// ============================================================
// INPUTS PARA CRIAÇÃO/ATUALIZAÇÃO (mantidos p/ painel admin)
// ============================================================

export type CreateBlogPostInput = {
  title: string;
  description: string;
  content: string;
  image_url?: string;
  category: string;
  categoria_id?: string | null;
  reading_time?: string;
  type?: PostType;
  featured?: boolean;
  video1?: string;
  video2?: string;
  author?: string;
  author_image?: string;
  tags?: string[];
  slug?: string;
  status?: boolean;
  published_at?: string | null;
};

export type UpdateBlogPostInput = Partial<CreateBlogPostInput>;
