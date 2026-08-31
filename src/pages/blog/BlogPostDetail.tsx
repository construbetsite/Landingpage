import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Star,
  FileQuestion,
} from "lucide-react";
import { useBlogPost } from "../../hooks/useBlogPost";
import { formatDate } from "../../utils/formatDate";
import { getImageUrl } from "../../utils/imageUrl";
import SEO from "../../components/SEO/SEO";
import { SITE_URL } from "../../config/constants";
import DOMPurify, { type Config } from "dompurify";
import { LandingCategoriesSlider } from "../../components/blog/LandingCategoriesSlider";
import { PostProductsGrid } from "../../components/blog/PostProductsGrid";

/* ============================================================
   RICH CONTENT — HTML PURO (sem Markdown)
   O conteúdo vem do painel como HTML direto. Apenas sanitizamos
   com DOMPurify (config restritiva) e aplicamos estilos prose.
   Memoizado: a sanitização roda apenas quando o conteúdo muda.
============================================================ */

const SANITIZE_CONFIG = {
  ADD_TAGS: [
    "iframe",
    "section",
    "figure",
    "figcaption",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "caption",
    "colgroup",
    "col",
  ],
  ADD_ATTR: [
    "allow",
    "allowfullscreen",
    "frameborder",
    "scrolling",
    "loading",
    "decoding",
    "target",
    "colspan",
    "rowspan",
    "style",
    "class",
    "id",
    "scope",
    "align",
    "valign",
    "cellpadding",
    "cellspacing",
    "border",
  ],
  FORBID_ATTR: ["srcset"],
} as const satisfies Config;

function addImageLazyLoading(html: string): string {
  return html
    .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy"')
    .replace(/<img(?![^>]*\bdecoding=)/gi, '<img decoding="async"');
}

const RichContent = React.memo(({ content }: { content?: string }) => {
  const sanitizedHtml = useMemo(() => {
    if (!content) return "";
    const clean = DOMPurify.sanitize(content, { ...SANITIZE_CONFIG }) as string;
    return addImageLazyLoading(clean);
  }, [content]);

  if (!content) {
    return <p className="text-slate-600 dark:text-slate-400">Conteúdo não disponível para este post.</p>;
  }

  return (
    <>
      {/* Estilos forçados para contraste máximo e suporte completo a tabelas */}
      <style>{`
        /* ================================================
                   ESTILOS BASE (MODO CLARO E ESCURO)
                ================================================ */

        .blog-content {
          max-width: 100%;
          color: #0f172a; /* slate-900 */
        }

        /* --- PARÁGRAFOS, LISTAS E TEXTOS GERAIS --- */
        .blog-content p,
        .blog-content li,
        .blog-content figcaption,
        .blog-content caption {
          color: #0f172a !important;
          line-height: 1.75 !important;
          margin-bottom: 1rem !important;
        }

        .dark .blog-content p,
        .dark .blog-content li,
        .dark .blog-content figcaption,
        .dark .blog-content caption {
          color: #f1f5f9 !important; /* slate-100 */
        }

        /* --- TÍTULOS (H1-H6) --- */
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          color: #0f172a !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
        }

        .blog-content h1 { font-size: 2.25rem !important; }
        .blog-content h2 { font-size: 1.875rem !important; }
        .blog-content h3 { font-size: 1.5rem !important; }
        .blog-content h4 { font-size: 1.25rem !important; }
        .blog-content h5 { font-size: 1.125rem !important; }
        .blog-content h6 { font-size: 1rem !important; }

        .dark .blog-content h1,
        .dark .blog-content h2,
        .dark .blog-content h3,
        .dark .blog-content h4,
        .dark .blog-content h5,
        .dark .blog-content h6 {
          color: #f1f5f9 !important;
        }

        /* --- LINKS --- */
        .blog-content a {
          color: #2563eb !important; /* blue-600 */
          text-decoration: underline !important;
          text-underline-offset: 2px !important;
        }
        .blog-content a:hover {
          text-decoration: none !important;
        }

        .dark .blog-content a {
          color: #60a5fa !important; /* blue-400 */
        }

        /* --- NEGRITO / STRONG --- */
        .blog-content strong,
        .blog-content b {
          color: #0f172a !important;
          font-weight: 700 !important;
        }

        .dark .blog-content strong,
        .dark .blog-content b {
          color: #f1f5f9 !important;
        }

        /* --- ITÁLICO / EM --- */
        .blog-content em,
        .blog-content i {
          font-style: italic !important;
        }

        /* --- LISTAS --- */
        .blog-content ul,
        .blog-content ol {
          padding-left: 1.5rem !important;
          margin-bottom: 1rem !important;
        }

        .blog-content ul {
          list-style-type: disc !important;
        }

        .blog-content ol {
          list-style-type: decimal !important;
        }

        .blog-content li {
          margin-bottom: 0.25rem !important;
        }

        /* --- CITAÇÕES (BLOCKQUOTE) --- */
        .blog-content blockquote {
          border-left: 4px solid #3b82f6 !important; /* blue-500 */
          padding-left: 1rem !important;
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
          margin: 1rem 0 !important;
          color: #334155 !important; /* slate-700 */
          font-style: italic !important;
          background-color: #f8fafc !important;
          border-radius: 0.5rem !important;
          padding-right: 1rem !important;
        }

        .dark .blog-content blockquote {
          color: #94a3b8 !important; /* slate-400 */
          background-color: #1e293b !important; /* slate-800 */
        }

        /* --- IMAGENS --- */
        .blog-content img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          margin: 1.5rem 0 !important;
          display: block !important;
        }

        /* --- TABELAS (COMPLETO) --- */
        .blog-content table {
          width: 100% !important;
          border-collapse: collapse !important;
          margin: 1.5rem 0 !important;
          font-size: 0.95rem !important;
          overflow-x: auto !important;
          display: block !important;
          max-width: 100% !important;
        }

        .blog-content thead {
          background-color: #f1f5f9 !important; /* slate-100 */
        }

        .dark .blog-content thead {
          background-color: #1e293b !important; /* slate-800 */
        }

        .blog-content th {
          font-weight: 700 !important;
          text-align: left !important;
          padding: 0.75rem 1rem !important;
          border: 1px solid #cbd5e1 !important; /* slate-300 */
          color: #0f172a !important;
        }

        .dark .blog-content th {
          border-color: #475569 !important; /* slate-600 */
          color: #f1f5f9 !important;
        }

        .blog-content td {
          padding: 0.75rem 1rem !important;
          border: 1px solid #cbd5e1 !important; /* slate-300 */
          color: #0f172a !important;
        }

        .dark .blog-content td {
          border-color: #475569 !important; /* slate-600 */
          color: #e2e8f0 !important; /* slate-200 */
        }

        .blog-content tbody tr {
          background-color: #ffffff !important;
        }

        .dark .blog-content tbody tr {
          background-color: #0f172a !important; /* slate-900 */
        }

        /* Zebra striping nas tabelas (opcional) */
        .blog-content tbody tr:nth-child(even) {
          background-color: #f8fafc !important;
        }

        .dark .blog-content tbody tr:nth-child(even) {
          background-color: #1e293b !important; /* slate-800 */
        }

        .blog-content caption {
          caption-side: bottom !important;
          padding: 0.5rem !important;
          color: #475569 !important;
          font-size: 0.875rem !important;
        }

        .dark .blog-content caption {
          color: #94a3b8 !important;
        }

        /* --- CÓDIGO INLINE --- */
        .blog-content code {
          background-color: #f1f5f9 !important;
          padding: 0.125rem 0.375rem !important;
          border-radius: 0.25rem !important;
          font-family: monospace !important;
          font-size: 0.9em !important;
          color: #0f172a !important;
        }

        .dark .blog-content code {
          background-color: #1e293b !important;
          color: #e2e8f0 !important;
        }

        /* --- BLOCO DE CÓDIGO (PRE) --- */
        .blog-content pre {
          background-color: #0f172a !important;
          color: #f1f5f9 !important;
          padding: 1rem !important;
          border-radius: 0.75rem !important;
          overflow-x: auto !important;
          margin: 1.5rem 0 !important;
          font-family: monospace !important;
          font-size: 0.9rem !important;
        }

        .blog-content pre code {
          background-color: transparent !important;
          color: #f1f5f9 !important;
          padding: 0 !important;
        }

        /* --- IFRAME / VÍDEOS --- */
        .blog-content iframe {
          border-radius: 0.75rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
          margin: 1.5rem 0 !important;
          max-width: 100% !important;
        }

        /* --- DIVISORES (HR) --- */
        .blog-content hr {
          border: 0 !important;
          height: 1px !important;
          background: #e2e8f0 !important;
          margin: 2rem 0 !important;
        }

        .dark .blog-content hr {
          background: #334155 !important;
        }

        /* --- FIGURAS --- */
        .blog-content figure {
          margin: 1.5rem 0 !important;
        }

        .blog-content figcaption {
          font-size: 0.875rem !important;
          color: #475569 !important;
          text-align: center !important;
          margin-top: 0.5rem !important;
        }

        .dark .blog-content figcaption {
          color: #94a3b8 !important;
        }
      `}</style>

      <div
        className="blog-content prose prose-slate max-w-none
          prose-table:min-w-full prose-table:border-collapse
          prose-pre:bg-slate-900 prose-pre:text-slate-100
          prose-code:before:content-none prose-code:after:content-none
          dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </>
  );
});

function getYouTubeEmbed(url?: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (!match) return null;
  return `https://www.youtube.com/embed/${match[1]}`;
}

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { post, loading, error, notFound } = useBlogPost(slug);

  const video1Embed = useMemo(() => getYouTubeEmbed(post?.video1), [post?.video1]);
  const video2Embed = useMemo(() => getYouTubeEmbed(post?.video2), [post?.video2]);

  if (loading) {
    return (
      <>
        <LandingCategoriesSlider />
        <LoadingSkeleton />
      </>
    );
  }

  if (notFound || (!post && !error)) {
    return <NotFoundPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!post) return null;

  const postImageUrl = post.image_url ? getImageUrl(post.image_url) : undefined;

  return (
    <>
      <SEO
        title={`${post.title} | Blog Construbet`}
        description={post.description || post.title}
        image={postImageUrl}
        canonical={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.published_at || post.created_at}
        modifiedTime={post.updated_at || post.published_at || post.created_at}
        author={post.author || "Construbet"}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          image: postImageUrl ? [postImageUrl] : [],
          description: post.description || post.title,
          datePublished: post.published_at || post.created_at,
          dateModified: post.updated_at || post.published_at || post.created_at,
          author: {
            "@type": "Person",
            name: post.author || "Construbet",
          },
          publisher: {
            "@type": "Organization",
            name: "Construbet",
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/logo.webp`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
          },
        }}
      />

      <LandingCategoriesSlider />

      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#004AAD] transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar para o blog
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {post.category && (
              <span className="rounded-full bg-[#004AAD]/10 px-3 py-1 font-medium text-[#004AAD]">
                {post.category}
              </span>
            )}
            {post.featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-700">
                <Star size={13} />
                Destaque
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 md:text-4xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              {post.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={15} />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} />
              {post.reading_time || "Leitura rápida"}
            </span>
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User size={15} />
                {post.author}
              </span>
            )}
          </div>
        </header>

        {post.image_url && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <img
              src={getImageUrl(post.image_url)}
              alt={post.title}
              className="w-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        {post.author && post.author_image && (
          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-5 border border-slate-200 dark:border-slate-700">
            <img
              src={getImageUrl(post.author_image)}
              alt={post.author}
              className="h-12 w-12 rounded-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {post.author}
              </p>
              <p className="text-xs text-slate-500">Autor</p>
            </div>
          </div>
        )}

        <div className="mt-10">
          <RichContent content={post.content} />
        </div>

        {(video1Embed || video2Embed) && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {video1Embed && (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="aspect-video">
                  <iframe
                    src={video1Embed}
                    title={`Vídeo 1 - ${post.title}`}
                    className="h-full w-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}
            {video2Embed && (
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="aspect-video">
                  <iframe
                    src={video2Embed}
                    title={`Vídeo 2 - ${post.title}`}
                    className="h-full w-full"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <PostProductsGrid products={post.products} />

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 border-t border-slate-200 pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-10 w-3/4 rounded bg-slate-200" />
        <div className="aspect-[16/9] rounded-2xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-4 w-2/3 rounded bg-slate-100" />
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-72 rounded-lg bg-slate-100" />)}
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <FileQuestion size={32} className="text-slate-500" />
      </div>
      <h1 className="mt-6 text-3xl font-black text-slate-900">Post não encontrado</h1>
      <p className="mt-3 text-slate-600">
        O post que você procura não existe ou foi removido.
      </p>
      <Link
        to="/blog"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0A2230] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#133a4f]"
      >
        <ArrowLeft size={16} />
        Voltar para o blog
      </Link>
    </div>
  );
}

function ErrorPage({ error }: { error: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50">
        <AlertTriangle size={32} className="text-rose-500" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-slate-900">Erro ao carregar o post</h1>
      <p className="mt-3 text-slate-600">{error}</p>
      <Link
        to="/blog"
        className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        <ArrowLeft size={16} />
        Voltar para o blog
      </Link>
    </div>
  );
}