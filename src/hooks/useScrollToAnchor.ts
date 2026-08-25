import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface ScrollToAnchorOptions {
  /** Offset em pixels para compensar header fixo (padrão: 85px) */
  offset?: number;
  /** Delay inicial em ms antes do primeiro scroll (padrão: 150ms) */
  timeout?: number;
  /** Número máximo de tentativas caso o elemento ainda esteja renderizando (padrão: 4) */
  retries?: number;
  /** Intervalo entre tentativas em ms (padrão: 150ms) */
  retryInterval?: number;
}

/**
 * Realiza scroll suave para um elemento específico pelo ID
 */
export function scrollToElement(
  id: string,
  options: { offset?: number; behavior?: ScrollBehavior } = {}
) {
  const { offset = 85, behavior } = options;
  const cleanId = id.replace(/^#/, '');
  const element = document.getElementById(cleanId);

  if (!element) return false;

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollBehavior: ScrollBehavior =
    behavior || (prefersReducedMotion ? 'auto' : 'smooth');

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(0, offsetPosition),
    behavior: scrollBehavior,
  });

  return true;
}

/**
 * Hook customizado para detectar e rolar suavemente para âncoras na URL (ex: /#produtos, /#contato)
 */
export function useScrollToAnchor(options: ScrollToAnchorOptions = {}) {
  const {
    offset = 85,
    timeout = 150,
    retries = 4,
    retryInterval = 150,
  } = options;

  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (!hash) return;

    const id = decodeURIComponent(hash.replace(/^#/, ''));
    if (!id) return;

    let attempt = 0;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const tryScroll = () => {
      const success = scrollToElement(id, { offset });
      if (success) {
        return;
      }

      attempt += 1;
      if (attempt <= retries) {
        timerId = setTimeout(tryScroll, retryInterval);
      } else if (import.meta.env.DEV) {
        console.warn(
          `[useScrollToAnchor] Elemento com id="#${id}" não foi encontrado na página atual.`
        );
      }
    };

    timerId = setTimeout(tryScroll, timeout);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [location.pathname, location.hash, offset, timeout, retries, retryInterval]);
}
