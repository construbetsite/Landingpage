# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# Dj-kazak-1
<<<<<<< HEAD
# mapa-psi
# Dashboard-Psi
=======
>>>>>>> a8a55d99a9d706255a0e22bc146868586279d6c4

---

## Política de Cache e Consentimento (Performance)

### Cache de dados (produtos/posts) — React Query
- `staleTime: 60s` (configurado em `src/lib/queryClient.ts`, constante `DATA_STALE_TIME`): dentro de 1 minuto as listagens são servidas do cache do cliente, **sem rede** — alinhado ao `Cache-Control: public, max-age=60` do backend.
- `gcTime: 5 min`: após expirar, o dado antigo ainda é exibido enquanto a revalidação ocorre em background (**stale-while-revalidate**).
- `refetchOnWindowFocus: false` e `refetchOnReconnect: false` para evitar tráfego redundante.
- Após mutações (criar/editar/remover produto ou post no painel), **invalidar manualmente**:
  ```ts
  queryClient.invalidateQueries({ queryKey: ['products'] });
  queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
  ```

### Prefetch no bootstrap
`src/main.tsx` aquece o cache do React Query com as mesmas queryKeys dos hooks
(`useProducts`, `useBlogPosts`) via `requestIdleCallback`, disparando
`product?active=true&commercialType=ECOMMERCE` e `blog/posts?page=1&limit=5&status=true&featured=true`
em paralelo logo no carregamento — **sem depender de consentimento de cookies**.

### Consentimento de cookies (LGPD)
- Gerenciado em `src/lib/consent.ts` + `src/components/CookieBanner/CookieBanner.tsx`.
- O cookie `cookie_consent` expira em **24 horas** (`CONSENT_COOKIE_MAX_AGE = 86400`).
- O consentimento **não bloqueia** chamadas à API: `/product` e `/blog/posts` são públicas e disparadas
  imediatamente; o banner é apenas informativo e afeta somente GTM/analytics (`GTMScript.tsx`).

### Renderização de conteúdo do blog — HTML puro
O conteúdo dos posts é **HTML puro** (vindo do painel), sem conversão Markdown:
- `RichContent` em `src/pages/blog/BlogPostDetail.tsx` é memoizado (`React.memo`) e sanitiza
  com `useMemo` — a sanitização só roda quando o conteúdo muda.
- Config DOMPurify restritiva (`SANITIZE_CONFIG`): permite `iframe`, `section`, `figure`,
  `figcaption` e atributos de embed (`allow`, `allowfullscreen`, `frameborder`, `scrolling`,
  `loading`, `decoding`, `target`, `colspan`, `rowspan`, `style`).
- Todas as `<img>` do conteúdo recebem `loading="lazy"` e `decoding="async"` (pós-sanitização,
  sem sobrescrever valores já presentes).
- Estilos via Tailwind Typography (`prose`): tabelas com bordas, blocos de código escuros,
  iframes arredondados, dark mode suportado (`dark:prose-invert`).
- A dependência `marked` foi removida do projeto.

### Recursos externos (Google/Elfsight)
- O widget de avaliações (`GoogleReviewsWidget.tsx`) só injeta o script do Elfsight quando a seção
  entra na viewport (`useInView`, rootMargin 400px) **e o navegador está ocioso**
  (`requestIdleCallback`, timeout 3s), priorizando produtos/posts e o LCP.
- O mapa do Google (`GoogleMapsSection.tsx`) usa `iframe loading="lazy"` — não bloqueia o render.

### Cache local para recursos externos — `src/lib/externalCache.ts`
Módulo genérico com TTL + stale-while-revalidate sobre `localStorage` (prefixo `ext-cache:`):

```ts
import { fetchWithCache, TTL } from "@/lib/externalCache";

const data = await fetchWithCache(
  "chave-unica",
  () => fetch(url).then((r) => r.json()),
  TTL.ONE_HOUR
);
```

Comportamento:
- **Cache fresco** (dentro do TTL) → retorno síncrono de `localStorage` (< 1ms), zero rede.
- **Cache expirado** → o dado antigo (`stale`) é retornado imediatamente e a revalidação
  acontece em background (stale-while-revalidate), sem spinner.
- **Sem cache** → aguarda o fetch (primeira visita).
- Requisições concorrentes para a mesma chave são **deduplicadas** (`inflight` map).
- Tolerante a quota cheia e a `localStorage` indisponível (modo privado).
- Logs `[CACHE HIT]`/`[CACHE MISS]`/`[CACHE SWR]` no console em desenvolvimento.
- API: `getCached`, `getStale`, `setCached`, `invalidateCached`, `fetchWithCache`, `TTL`.

Aplicação atual: `getLandingCategories` (categorias da landing, TTL 1h).

**Limitação conhecida:** as chamadas `GetPlace` (Maps embed) e `sources`/`reviews`
(Elfsight) partem de dentro do iframe/script de terceiros — não são interceptáveis
pelo nosso código. A mitigação é o carregamento lazy + idle (acima) e o cache HTTP
do navegador, além do cache local disponível para qualquer `fetch` próprio.
