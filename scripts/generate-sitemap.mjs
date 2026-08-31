import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = (process.env.VITE_SITE_URL || 'https://site.construbet.com.br').replace(/\/+$/, '');
const API_BASE = process.env.VITE_API_BASE || 'http://localhost:10000/api';
const BLOG_API_URL = process.env.VITE_API_URL || 'http://localhost:10000';

// Sempre chama o backend para refletir exatamente o que está cadastrado no banco.
// Em dev sem backend, gera apenas as rotas estáticas (sem URLs inventadas).

// ─── Helpers de busca paginada ───────────────────────────
const PAGE_SIZE = 100;
const REQUEST_TIMEOUT_MS = 10_000; // timeout real por requisição (máx. 10s)
const MAX_PAGES = 200; // proteção contra loop infinito de API que ignora `page`

/** fetch com timeout real via AbortController (Node 18+). */
async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Extrai a lista de itens de qualquer formato de resposta da API. */
function extractItems(body) {
  if (Array.isArray(body)) return body;
  if (body && typeof body === 'object') {
    if (Array.isArray(body.items)) return body.items;
    if (Array.isArray(body.data)) return body.data;
    if (Array.isArray(body.results)) return body.results;
  }
  return [];
}

/** Lê paginação declarada pelo backend ({ data, pagination }). */
function extractPagination(body) {
  if (body && body.pagination && Number.isFinite(body.pagination.totalPages)) {
    return { totalPages: body.pagination.totalPages };
  }
  return null;
}

/**
 * Busca TODOS os itens de um endpoint paginado.
 * - Usa `page`/`limit` de verdade, respeitando `totalPages` quando a API informa.
 * - Para quando a página retorna menos itens que o limite OU nenhum item novo
 *   (proteção para backend ignora o parâmetro `page`).
 * - Deduplica pela chave informada (`id`/`slug`).
 */
async function fetchAllPages(baseUrl, { itemsKey = 'id' } = {}) {
  let page = 1;
  const all = [];
  const seen = new Set();

  while (page <= MAX_PAGES) {
    const sep = baseUrl.includes('?') ? '&' : '?';
    let data;
    try {
      data = await fetchJson(`${baseUrl}${sep}page=${page}&limit=${PAGE_SIZE}`);
    } catch (err) {
      // Não falha o build silenciosamente: registra e segue com o que já tem.
      console.warn(`⚠️ ${baseUrl} (página ${page}): ${err.message}`);
      break;
    }

    const items = extractItems(data);
    const pag = extractPagination(data);

    let addedNew = false;
    for (const item of items) {
      const key = item?.[itemsKey] ?? JSON.stringify(item);
      if (!seen.has(key)) {
        seen.add(key);
        all.push(item);
        addedNew = true;
      }
    }

    // Paginação declarada pelo backend: para na última página conhecida.
    if (pag && page >= pag.totalPages) break;
    // Última página (retornou menos itens que o limite).
    if (items.length < PAGE_SIZE) break;
    // Backend que ignora `page` retorna sempre a mesma página — evita loop.
    if (!addedNew) break;

    page++;
  }

  return all;
}

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/produtos', priority: '0.9', changefreq: 'daily' },
  { path: '/blog', priority: '0.8', changefreq: 'daily' },
  { path: '/orcamento', priority: '0.7', changefreq: 'monthly' },
  { path: '/especialista', priority: '0.7', changefreq: 'monthly' },
  { path: '/politicas', priority: '0.5', changefreq: 'monthly' },
  { path: '/calculadora/piso', priority: '0.7', changefreq: 'monthly' },
  { path: '/calculadora/tinta', priority: '0.7', changefreq: 'monthly' },
  { path: '/calculadora/argamassa', priority: '0.7', changefreq: 'monthly' },
  { path: '/calculadora/rejunte', priority: '0.7', changefreq: 'monthly' },
];

async function fetchDynamicRoutes() {
  const dynamicRoutes = [];

  // Produtos ativos (fonte de verdade: backend/Supabase) — paginação completa
  try {
    const products = await fetchAllPages(`${API_BASE}/product?active=true`, {
      itemsKey: 'slug',
    });
    products.forEach((p) => {
      if (p.slug && p.active !== false) {
        dynamicRoutes.push({
          path: `/produto/${p.slug}`,
          priority: '0.8',
          changefreq: 'weekly',
          lastmod: p.updatedAt || p.updated_at || null,
        });
      }
    });
  } catch (err) {
    console.warn('⚠️ Não foi possível carregar produtos da API para o sitemap:', err.message);
  }

  // Posts publicados — paginação completa (mesmo padrão da API consumida pelo frontend)
  try {
    const cleanBlogUrl = BLOG_API_URL.replace(/\/+$/, '');
    const posts = await fetchAllPages(`${cleanBlogUrl}/api/blog/posts?status=true`, {
      itemsKey: 'slug',
    });
    posts.forEach((p) => {
      if (p.slug && p.status !== false) {
        dynamicRoutes.push({
          path: `/blog/${p.slug}`,
          priority: '0.7',
          changefreq: 'weekly',
          lastmod: p.updated_at || p.published_at || p.updatedAt || null,
        });
      }
    });
  } catch (err) {
    console.warn('⚠️ Não foi possível carregar posts do blog da API para o sitemap:', err.message);
  }

  // Deduplicação final por caminho (idempotente frente a APIs que retornem duplicatas)
  const seen = new Set();
  const unique = [];
  for (const route of dynamicRoutes) {
    if (!seen.has(route.path)) {
      seen.add(route.path);
      unique.push(route);
    }
  }

  return unique;
}

async function generateSitemap() {
  console.log('🗺️ Gerando sitemap.xml...');
  const dynamicRoutes = await fetchDynamicRoutes();

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => ` <url>
    <loc>${SITE_URL}${r.path}</loc>
${r.lastmod ? `    <lastmod>${new Date(r.lastmod).toISOString()}</lastmod>
` : ''}    <changefreq>${r.changefreq || 'weekly'}</changefreq>
    <priority>${r.priority || '0.7'}</priority>
 </url>`
  )
  .join('\n')}
</urlset>
`;

  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');
  console.log(`✅ Sitemap gerado com sucesso em ${publicPath} (${allRoutes.length} URLs)`);
}

generateSitemap();
