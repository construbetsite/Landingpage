/**
 * Cache local (localStorage) para respostas de APIs externas
 * (Google Maps, Elfsight, etc.) com TTL e stale-while-revalidate.
 *
 * - `getCached` / `setCached`: leitura e gravação diretas com TTL.
 * - `fetchWithCache`: serve do cache imediatamente (cache hit < 1ms)
 *   e dispara revalidação em background quando o dado está expirado
 *   (stale-while-revalidate), sem bloquear a UI.
 *
 * Observações:
 * - Apenas respostas públicas; nunca armazenar chaves de API.
 * - Tolerante a quota cheia / localStorage indisponível (modo privado).
 * - Logs [CACHE HIT]/[CACHE MISS]/[CACHE SWR] apenas em desenvolvimento.
 */

const PREFIX = "ext-cache:";

interface CacheEntry<T> {
  value: T;
  /** Data.now() da gravação */
  ts: number;
  /** TTL em ms */
  ttl: number;
}

function isStorageAvailable(): boolean {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const probe = `${PREFIX}__probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

const STORAGE_OK = isStorageAvailable();

function devLog(...args: unknown[]) {
  if (import.meta.env.DEV) {
    console.log("[externalCache]", ...args);
  }
}

/**
 * Retorna o valor em cache se ainda estiver dentro do TTL.
 * Retorna `null` quando não existe ou expirou (nesse caso o dado
 * stale, se houver, permanece disponível via `getStale`).
 */
export function getCached<T>(key: string): T | null {
  if (!STORAGE_OK) return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (Date.now() - entry.ts > entry.ttl) return null; // expirado
    devLog(`[CACHE HIT] ${key}`);
    return entry.value;
  } catch {
    return null;
  }
}

/**
 * Retorna o valor mesmo expirado (para stale-while-revalidate),
 * ou `null` se não houver nada em cache.
 */
export function getStale<T>(key: string): T | null {
  if (!STORAGE_OK) return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    devLog(`[CACHE SWR] servindo dado stale de ${key}`);
    return entry.value;
  } catch {
    return null;
  }
}

export function setCached<T>(key: string, value: T, ttlMs: number): void {
  if (!STORAGE_OK) return;
  const entry: CacheEntry<T> = { value, ts: Date.now(), ttl: ttlMs };
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(entry));
  } catch {
    // Quota cheia: descarta entradas antigas do nosso prefixo e tenta 1x
    try {
      Object.keys(window.localStorage)
        .filter((k) => k.startsWith(PREFIX))
        .forEach((k) => window.localStorage.removeItem(k));
      window.localStorage.setItem(PREFIX + key, JSON.stringify(entry));
    } catch {
      devLog(`[CACHE] falha ao gravar ${key} (quota indisponível)`);
    }
  }
}

export function invalidateCached(key: string): void {
  if (!STORAGE_OK) return;
  window.localStorage.removeItem(PREFIX + key);
}

/** Revalidações em andamento, para evitar chamadas duplicadas por chave. */
const inflight = new Map<string, Promise<unknown>>();

/**
 * Busca com cache + stale-while-revalidate:
 * 1. Cache fresco (dentro do TTL) → retorna imediatamente (< 1ms).
 * 2. Cache expirado → retorna o dado stale na hora e revalida em background.
 * 3. Sem cache → aguarda o fetch (primeira visita).
 *
 * Requisições concorrentes para a mesma chave são deduplicadas.
 */
export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 3600_000 // 1 hora por padrão
): Promise<T> {
  const fresh = getCached<T>(key);
  if (fresh !== null) return fresh;

  const stale = getStale<T>(key);

  const revalidate = (): Promise<T> => {
    const existing = inflight.get(key);
    if (existing) return existing as Promise<T>;
    devLog(`[CACHE MISS] ${key} — buscando...`);
    const p = fetcher()
      .then((data) => {
        setCached(key, data, ttlMs);
        inflight.delete(key);
        return data;
      })
      .catch((err) => {
        inflight.delete(key);
        throw err;
      });
    inflight.set(key, p);
    return p;
  };

  if (stale !== null) {
    // stale-while-revalidate: dado antigo já na UI, atualização em bg
    void revalidate().catch(() => {
      /* revalidação silenciosa: mantém o stale */
    });
    return stale;
  }

  return revalidate();
}

/** TTLs padrão sugeridos */
export const TTL = {
  ONE_HOUR: 3600_000,
  FIVE_MINUTES: 5 * 60_000,
} as const;
