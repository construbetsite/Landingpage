"use client";

// ============================================================
// /blog/:slug - Página de detalhe do post
// ============================================================
//
// - Consome a API via useBlogPost
// - Render do HTML com sanitização via DOMPurify (anti-XSS)
// - Autor, categoria, tempo de leitura, tags
// - Embeds de vídeos (YouTube/Vimeo) se video1/video2 vierem
// - SEO via react-helmet-async
// - 404 quando o post não existe ou está com status=false
// ============================================================

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import DOMPurify from "dompurify";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Share2,
  ArrowRight,
  Copy,
  Check,
  AlertCircle,
  Tag as TagIcon,
} from "lucide-react";
import { ECOMMERCE_URL } from "../../config/constants";

import { useBlogPost } from "../../hooks/useBlogPost";
import { useBlogPosts } from "../../hooks/useBlogPosts";
import { getImageUrl } from "../../utils/imageUrl";
import { formatDate } from "../../utils/formatDate";
import type { BlogPost } from "../../types/blog";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/1200x600/E8EEF5/072B63?text=Construbet+Blog";

// ============================================================
// HELPERS
// ============================================================

/** Sanitiza HTML vindo do backend para prevenir XSS. */
function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
}

/** Transforma URL do YouTube/Vimeo em embed. Retorna null se não for vídeo. */
function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.replace(/^\//, "");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    return null;
  } catch {
    return null;
  }
}

// ============================================================
// COMPARTILHAR
// ============================================================

const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* noop */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
        <Share2 size={15} /> Compartilhar
      </span>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-gray-600 hover:text-red-600 transition"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-gray-600 hover:text-red-600 transition"
      >
        Facebook
      </a>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition"
      >
        {copied ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
        {copied ? "Copiado!" : "Copiar link"}
      </button>
    </div>
  );
};

// ============================================================
// POSTS RELACIONADOS
// ============================================================

const RelatedPosts = ({ currentPost }: { currentPost: BlogPost }) => {
  const { posts } = useBlogPosts({ limit: 4, status: true });

  const related = useMemo(
    () => posts.filter((p) => p.id !== currentPost.id).slice(0, 3),
    [posts, currentPost.id],
  );

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h3 className="text-xl font-black text-[#072B63] mb-6">Continue lendo</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((p: BlogPost) => {
          const img = getImageUrl(p.image_url) || PLACEHOLDER_IMAGE;
          return (
            <Link
              key={p.id}
              to={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white hover:shadow-lg transition-all"
            >
              <img
                src={img}
                alt={p.title}
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                }}
              />
              <div className="p-4">
                {p.category && (
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wide">
                    {p.category}
                  </span>
                )}
                <h4 className="mt-2 font-bold text-[#072B63] line-clamp-2 group-hover:text-red-600 transition-colors text-[15px] leading-snug">
                  {p.title}
                </h4>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// SKELETON
// ============================================================

const PostSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="px-4 sm:px-6 pt-24 pb-10">
      <div className="mx-auto max-w-3xl space-y-4 animate-pulse">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-10 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>
    <div className="px-4 sm:px-6 pb-10">
      <div className="mx-auto max-w-3xl h-[400px] rounded-2xl bg-gray-200 animate-pulse" />
    </div>
  </div>
);

// ============================================================
// PÁGINA
// ============================================================

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { post, loading, error, notFound } = useBlogPost(slug);

  const safeContent = useMemo(() => sanitizeHtml(post?.content || ""), [post?.content]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  // Se for 404 do backend OU status=false, exibimos a tela de "não encontrado"
  if (loading) return <PostSkeleton />;

  if (notFound || error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-black text-[#072B63]">
            {notFound ? "Post não encontrado" : "Erro ao carregar o post"}
          </h1>
          <p className="mt-2 text-gray-500">
            {notFound
              ? "O artigo que você procura não está disponível."
              : error || "Tente novamente em alguns instantes."}
          </p>
          {notFound && (
            <button
              onClick={() => navigate("/blog")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 transition"
            >
              <ArrowLeft size={16} />
              Voltar para o blog
            </button>
          )}
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl(post.image_url) || PLACEHOLDER_IMAGE;
  const publishedAt = post.published_at || post.created_at;
  const shareUrl = `${window.location.origin}/blog/${post.slug}`;
  const videoEmbeds = [post.video1, post.video2].filter(Boolean).map((v) => v as string);

  return (
    <article className="min-h-screen bg-white">
      <Helmet>
        <title>{`${post.title} | Construbet Blog`}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={shareUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      {/* Header */}
      <header className="bg-gradient-to-b from-slate-50 to-white px-4 sm:px-6 pt-24 pb-10">
        <div className="mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#072B63] hover:text-red-600 transition mb-8"
            >
              <ArrowLeft size={16} />
              Voltar para o blog
            </button>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-5">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EEF5] px-3 py-1 text-xs font-bold text-[#072B63]">
                  {post.category}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {publishedAt ? formatDate(publishedAt) : "—"}
              </span>
              {post.reading_time && (
                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {post.reading_time} de leitura
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-[#072B63] leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            {post.description && (
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">{post.description}</p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {post.author_image ? (
                  <img
                    src={getImageUrl(post.author_image)}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#072B63] flex items-center justify-center text-white font-bold text-sm">
                    {(post.author || "C").charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-[#072B63]">
                    {post.author || "Equipe Construbet"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Especialistas em materiais de construção
                  </div>
                </div>
              </div>

              <ShareButtons title={post.title} url={shareUrl} />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Imagem principal */}
      <div className="px-4 sm:px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full rounded-2xl object-cover shadow-lg max-h-[400px]"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
        </div>
      </div>

      {/* Vídeos incorporados */}
      {videoEmbeds.length > 0 && (
        <section className="px-4 sm:px-6 pb-10">
          <div className="mx-auto max-w-3xl space-y-6">
            {videoEmbeds.map((video, idx) => {
              const embed = toEmbedUrl(video);
              if (!embed) {
                return (
                  <div key={idx} className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <a href={video} target="_blank" rel="noopener noreferrer" className="underline">
                      Assistir vídeo {idx + 1}
                    </a>
                  </div>
                );
              }
              return (
                <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                  <iframe
                    src={embed}
                    title={`Vídeo ${idx + 1} do post`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Conteúdo */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div
            className="prose-construbet"
            dangerouslySetInnerHTML={{ __html: safeContent }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2">
              <TagIcon size={15} className="text-gray-400" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100">
            <ShareButtons title={post.title} url={shareUrl} />
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-[#072B63] p-8 text-center text-white">
            <h3 className="text-xl font-black">Precisa desses materiais para sua obra?</h3>
            <p className="mt-2 text-blue-100 text-sm max-w-md mx-auto">
              Na Construbet você encontra qualidade, tradição e atendimento especializado há mais
              de 45 anos.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={ECOMMERCE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition"
              >
                Ir para o E-commerce
                <ArrowRight size={16} />
              </a>
              <a
                href="#mapa"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-[#072B63] transition"
              >
                Como chegar na loja
              </a>
            </div>
          </div>

          <RelatedPosts currentPost={post} />
        </div>
      </section>
    </article>
  );
}
