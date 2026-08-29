import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
}

/**
 * detecta se o elemento entrou na viewport (lazy loading / só carrega
 * dados quando a seção está visível). Usa IntersectionObserver.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = { rootMargin: '200px', threshold: 0.1 }
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  const { rootMargin = '200px', threshold = 0.1, root = null } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: considera visível (SSR/ambientes antigos)
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold, root }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, root]);

  return [ref, inView];
}

export default useInView;
