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
import DOMPurify from "dompurify";
import { marked } from "marked";
import type { Tokens } from "marked";

// Configuração do renderer customizado para tabelas com classes Tailwind
const renderer = new marked.Renderer();

// Sobrescreve a renderização de tabelas (API atual)
renderer.table = (token: Tokens.Table) => {
  const headerHtml = token.header
    .map((cell) => {
      const text = cell.text || "";
      return `<th class="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left font-semibold text-slate-800 dark:text-slate-200">${text}</th>`;
    })
    .join("");

  const bodyHtml = token.rows
    .map((row) => {
      const cells = row
        .map((cell) => {
          const text = cell.text || "";
          return `<td class="border border-slate-300 dark:border-slate-700 px-4 py-2 text-left text-slate-700 dark:text-slate-300">${text}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<div class="overflow-x-auto my-4">
    <table class="min-w-full border-collapse border border-slate-300 dark:border-slate-700">
      <thead class="bg-slate-100 dark:bg-slate-800">${headerHtml}</thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  </div>`;
};

// Configuração global do marked
marked.setOptions({
  renderer,
  gfm: true,      // GitHub Flavored Markdown (tabelas, listas de tarefas)
  breaks: true,   // Quebras de linha com \n viram <br>
  pedantic: false,
});

// Componente memoizado com conversão Markdown → HTML seguro
const RichContent = React.memo(({ content }: { content?: string }) => {
  if (!content) {
    return <p className="text-slate-600">Conteúdo não disponível para este post.</p>;
  }

  // Converte Markdown para HTML
  const rawHtml = marked.parse(content) as string;
  // Sanitiza para evitar XSS
  const sanitizedHtml = DOMPurify.sanitize(rawHtml);

  return (
    <div
      className="prose prose-slate max-w-none
        prose-headings:font-bold prose-headings:text-slate-900
        prose-p:leading-relaxed prose-p:mb-4 prose-p:text-slate-700
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-slate-900 prose-strong:font-semibold
        prose-ul:my-4 prose-li:mb-1
        prose-img:rounded-xl prose-img:shadow-md
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
        dark:prose-invert dark:prose-p:text-slate-300 dark:prose-headings:text-slate-100"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
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

  // Memoização dos vídeos
  const video1Embed = useMemo(() => getYouTubeEmbed(post?.video1), [post?.video1]);
  const video2Embed = useMemo(() => getYouTubeEmbed(post?.video2), [post?.video2]);

  // Estados de carregamento/erro
  if (loading) {
    return <LoadingSkeleton />;
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

      <article className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14 pt-20 md:pt-24">
        {/* Botão voltar com margem extra para não ficar atrás do header */}
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

        {/* Imagem de destaque */}
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

        {/* Autor */}
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

        {/* Conteúdo principal (agora com Markdown) */}
        <div className="mt-10">
          <RichContent content={post.content} />
        </div>

        {/* Vídeos */}
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

        {/* Tags */}
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

// Componentes auxiliares
function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-slate-200" />
        <div className="h-10 w-3/4 rounded bg-slate-200" />
        <div className="aspect-[16/9] rounded-2xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-100" />
          <div className="h-4 w-5/6 rounded bg-slate-100" />
          <div className="h-4 w-2/3 rounded bg-slate-100" />
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