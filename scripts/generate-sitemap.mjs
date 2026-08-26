import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = (process.env.VITE_SITE_URL || 'https://site.construbet.com.br').replace(/\/+$/, '');
const API_BASE = process.env.VITE_API_BASE || 'http://localhost:10000/api';
const BLOG_API_URL = process.env.VITE_API_URL || 'http://localhost:10000';

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

  // Buscar produtos
  try {
    const res = await fetch(`${API_BASE}/product?active=true`, { timeout: 5000 });
    if (res.ok) {
      const data = await res.json();
      const products = Array.isArray(data) ? data : data.data || [];
      products.forEach((p) => {
        if (p.slug) {
          dynamicRoutes.push({
            path: `/produto/${p.slug}`,
            priority: '0.8',
            changefreq: 'weekly',
          });
        }
      });
    }
  } catch (err) {
    console.warn('⚠️ Não foi possível carregar produtos da API para o sitemap:', err.message);
  }

  // Buscar posts do blog (mesmo padrão da API consumida pelo frontend: /api/blog/posts)
  try {
    const cleanBlogUrl = BLOG_API_URL.replace(/\/+$/, '');
    const res = await fetch(`${cleanBlogUrl}/api/blog/posts?status=true&limit=100`, { timeout: 5000 });
    if (res.ok) {
      const data = await res.json();
      const posts = Array.isArray(data) ? data : data.data || [];
      posts.forEach((p) => {
        if (p.slug) {
          dynamicRoutes.push({
            path: `/blog/${p.slug}`,
            priority: '0.7',
            changefreq: 'weekly',
          });
        }
      });
    }
  } catch (err) {
    console.warn('⚠️ Não foi possível carregar posts do blog da API para o sitemap:', err.message);
    // Slugs conhecidos para fallback estático
    const fallbackSlugs = [
      'como-escolher-revestimento-ideal',
      'tipo-de-cimento-ideal',
      'dicas-para-pintar-paredes',
      'como-calcular-quantidade-de-tijolos',
      'diferenca-entre-argamassa-e-reboco',
      'quando-usar-impermeabilizante',
    ];
    fallbackSlugs.forEach((slug) => {
      dynamicRoutes.push({
        path: `/blog/${slug}`,
        priority: '0.6',
        changefreq: 'weekly',
      });
    });
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
        (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <changefreq>${r.changefreq || 'weekly'}</changefreq>
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
