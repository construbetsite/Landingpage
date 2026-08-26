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

  // Buscar produtos ativos (fonte de verdade: backend/Supabase)
  try {
    const res = await fetch(`${API_BASE}/product?active=true`, { timeout: 5000 });
    if (res.ok) {
      const data = await res.json();
      const products = Array.isArray(data) ? data : data.data || [];
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
    } else {
      console.warn(`⚠️ Produtos: resposta ${res.status} da API (${API_BASE}/product)`);
    }
  } catch (err) {
    console.warn('⚠️ Não foi possível carregar produtos da API para o sitemap:', err.message);
  }

  // Buscar posts publicados do blog (mesmo padrão da API consumida pelo frontend)
  try {
    const cleanBlogUrl = BLOG_API_URL.replace(/\/+$/, '');
    const res = await fetch(`${cleanBlogUrl}/api/blog/posts?status=true&limit=100`, { timeout: 5000 });
    if (res.ok) {
      const data = await res.json();
      const posts = Array.isArray(data) ? data : data.data || [];
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
    } else {
      console.warn(`⚠️ Posts: resposta ${res.status} da API (${cleanBlogUrl}/api/blog/posts)`);
    }
  } catch (err) {
    console.warn('⚠️ Não foi possível carregar posts do blog da API para o sitemap:', err.message);
  }

  return dynamicRoutes;
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
