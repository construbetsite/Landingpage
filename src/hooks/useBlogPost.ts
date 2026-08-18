import { useCallback, useEffect, useRef, useState } from "react";

import { getPostBySlug } from "../services/blogApi";

import type { BlogPost } from "../types/blog";

// ============================================================
// RESULTADO DO HOOK
// ============================================================

export interface UseBlogPostResult {
  post: BlogPost | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
  refetch: () => void;
}

// ============================================================
// HOOK - POST INDIVIDUAL
// ============================================================
//
// Responsabilidade:
// - Buscar um único post pelo slug
// - Controlar carregamento
// - Controlar erro
// - Identificar post não encontrado
// - Cancelar requisições anteriores
//
// Não possui:
// - criação
// - edição
// - exclusão
// - autenticação administrativa
// ============================================================

export function useBlogPost(
  slug?: string
): UseBlogPostResult {
  const [post, setPost] = useState<BlogPost | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [notFound, setNotFound] = useState(false);

  // Guarda o controller da requisição atual.
  // Isso evita que uma requisição antiga sobrescreva
  // o resultado de uma navegação mais recente.
  const abortRef = useRef<AbortController | null>(null);

  // ==========================================================
  // BUSCAR POST
  // ==========================================================

  const fetchPost = useCallback(async () => {
    // --------------------------------------------------------
    // SLUG AUSENTE
    // --------------------------------------------------------

    if (!slug) {
      abortRef.current?.abort();

      setPost(null);
      setLoading(false);
      setError(null);
      setNotFound(false);

      return;
    }

    // --------------------------------------------------------
    // CANCELAR REQUISIÇÃO ANTERIOR
    // --------------------------------------------------------

    abortRef.current?.abort();

    const controller = new AbortController();

    abortRef.current = controller;

    // --------------------------------------------------------
    // ESTADO INICIAL DA REQUISIÇÃO
    // --------------------------------------------------------

    setLoading(true);
    setError(null);
    setNotFound(false);

    try {
      // ------------------------------------------------------
      // CONSULTA À API PÚBLICA
      // ------------------------------------------------------

      const result = await getPostBySlug(slug, {
        signal: controller.signal,
      });

      // ------------------------------------------------------
      // A REQUISIÇÃO FOI CANCELADA
      // ------------------------------------------------------

      if (controller.signal.aborted) {
        return;
      }

      // ------------------------------------------------------
      // POST NÃO ENCONTRADO
      // ------------------------------------------------------

      if (!result) {
        setPost(null);
        setNotFound(true);

        return;
      }

      // ------------------------------------------------------
      // POST ENCONTRADO
      // ------------------------------------------------------

      setPost(result);
      setNotFound(false);
    } catch (err: unknown) {
      // ------------------------------------------------------
      // IGNORA ERROS DE REQUISIÇÕES CANCELADAS
      // ------------------------------------------------------

      if (controller.signal.aborted) {
        return;
      }

      // ------------------------------------------------------
      // CONVERTER ERRO PARA STRING
      // ------------------------------------------------------

      const message =
        err instanceof Error
          ? err.message
          : "Erro ao carregar o post.";

      // ------------------------------------------------------
      // POST NÃO ENCONTRADO
      // ------------------------------------------------------

      if (
        /404|não encontrado|not found/i.test(message)
      ) {
        setPost(null);
        setNotFound(true);
        setError(null);

        return;
      }

      // ------------------------------------------------------
      // OUTRO ERRO
      // ------------------------------------------------------

      setPost(null);
      setNotFound(false);
      setError(message);
    } finally {
      // ------------------------------------------------------
      // FINALIZAR LOADING
      // ------------------------------------------------------

      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [slug]);

  // ==========================================================
  // EXECUTAR QUANDO O SLUG MUDAR
  // ==========================================================

  useEffect(() => {
    fetchPost();

    return () => {
      abortRef.current?.abort();
    };
  }, [fetchPost]);

  // ==========================================================
  // RETORNO
  // ==========================================================

  return {
    post,
    loading,
    error,
    notFound,
    refetch: fetchPost,
  };
}