# Otimização de Performance — Landing Page

Resumo das alterações aplicadas para melhorar o carregamento da página e
garantir conformidade LGPD no gerenciamento de consentimento de cookies.

---

## 1. Consentimento de Cookies (LGPD)

### Comportamento
- O banner **exibe em todas as páginas** até o usuário escolher
  **Aceitar todos**, **Apenas necessários** ou personalizar.
- A escolha é **persistida por 1 ano** em um cookie próprio
  (`cookie_consent`, `SameSite=Lax`, `Secure` em HTTPS) **e** em
  `localStorage` (para migração de usuários antigos e sincronização).
- Scripts de terceiros (GTM/GA, Pixel) só carregam **após consentimento
  explícito** (`granted` ou `custom` com analytics/marketing ativos).
- Fechar o painel de personalização (botão "X") **não salva decisão** —
  o banner reaparece na próxima navegação.
- `resetCookieConsent()` agora **também apaga o cookie** (não só o
  localStorage).

### Arquivos
- `src/lib/consent.ts`
  - `CONSENT_COOKIE_NAME = 'cookie_consent'`, `Max-Age = 1 ano`
  - `getCookieConsent()` / `getConsentStatus()` priorizam o cookie com
    fallback para `localStorage`
- `src/components/CookieBanner/CookieBanner.tsx` (sem alteração funcional)
- `src/components/GTM/GTMScript.tsx` (sem alteração funcional)

---

## 2. Cache de Chamadas de API

### Camada `cachedFetch` (memória, stale-while-revalidate + dedup)
- `src/services/cache/cachedFetch.ts`
  - `cachedFetch(url, { ttl })`: retorna dados em cache se válidos
    (TTL padrão **5 min**); senão busca, atualiza o cache e retorna.
  - **Dedup em voo**: requisições paralelas para a mesma chave
    compartilham a mesma `Promise` (nenhuma requisição duplicada).
  - `clearCachedUrl(url)` / `clearAllCache()` p/ invalidação manual.

### Onde foi aplicado
- `src/services/api/products.ts`
  - `getProducts`, `getProductCategories`, `getProductBySlug`,
    `getProductById` agora usam `cachedFetch` (TTL 5 min).
  - Export `invalidateProductsCache()` para invalidar após mutações.
- `src/services/blogApi.ts`
  - A função `request()` (base de todos os GETs do blog) usa
    `cachedFetch` por padrão (TTL 5 min); desligável por chamada com
    `{ cache: false }` ou TTL customizado com `{ cache: número }`.
  - Timeout de 15s e `AbortSignal` preservados.

### Hooks utilitários
- `src/hooks/useApiCache.ts` — expõe `cachedFetch`, `invalidate`,
  `invalidateAll`, `getSize`.
- `src/hooks/useDebounce.ts` — debounce de 300ms para buscas.
- `src/hooks/useInView.ts` — IntersectionObserver (`rootMargin` default
  200px) para gatilhos de visibilidade.

---

## 3. Lazy Loading de Seções (abaixo da dobra)

### `src/components/LazyLoad/LazyLoad.tsx`
Renderiza os `children` (e portanto dispara os hooks de dados) **somente
quando a seção entra na viewport**, com margem de 400px — as chamadas de
API e widgets abaixo da dobra deixam de competir com o LCP inicial.

### Seções envolvidas (em `src/App.tsx`)
| Seção | Fallback (evita layout shift) |
| --- | --- |
| `FeaturedProducts` | `h-[320px]` |
| `BlogSection` | `h-[420px]` |
| `PromocoesSemana` | `h-[480px]` |
| `GoogleReviewsWidget` (script Elfsight) | `h-[360px]` |

---

## 4. Notas de implementação

- O `react-query` já trazia `staleTime: 5min`; a camada nova cobre
  chamadas fora dele (ex: `BlogSection` que usava `fetch` direto) e
  deduplica em voo.
- As chamadas de listagem de produtos em `FeaturedProducts` e
  `PromocoesSemana` passaram a deduplicar (mesma query `products?active=true`).
- Nenhuma regressão esperada: aborts, timeouts e tratamento de erro
  preservados.

## 5. Como testar manualmente

1. **Banner**: em modo anônimo, visite qualquer página → banner aparece.
   Clique em "X" na personalização → o banner continua aberto (sem salvar).
   Escolha "Aceitar todos" → `cookie_consent=granted; Max-Age=31536000`
   no DevTools → recarregue → cookie permanece.
2. **Scripts**: com `granted`, o script `googletagmanager.com` aparece no
   DOM. Com "Apenas necessários", não.
3. **Cache**: abra o DevTools (aba Network). Entre na home duas vezes →
   a segunda visita não refaz `/api/blog/posts` nem `/api/product`.
4. **Lazy loading**: desça a página — as seções abaixo da dobra disparam
   suas requisições só quando ficam perto da viewport.

## 6. Impacto estimado
- Redução de chamadas repetidas em navegação (dedup + cache de 5min).
- Menos trabalho na thread principal durante o LCP (lazy loading de
  seções/widgets pesados).
- Conformidade LGPD: consentimento explícito, persistência de 1 ano e
  revogação funcional.
