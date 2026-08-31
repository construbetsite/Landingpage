"use client";

// ============================================================
// /blog - Listagem de posts consumindo a API
// ============================================================
//
// Recursos:
// - Paginação
// - Filtro por categoria (via query string ?categoria=)
// - Busca client-side (UX rápida) sobre o que veio do servidor
// - Estados de loading / erro
// - Fallback de imagem
// - SEO via react-helmet-async
// - Lazy loading de imagens
// ============================================================

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight, Clock3, BookOpen, X, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import SEO from "../components/SEO/SEO";
import { ECOMMERCE_URL } from "../config/constants";

import { useBlogPosts } from "../hooks/useBlogPosts";
import { useBlogCategories } from "../hooks/useBlogCategories";
import type { BlogPost } from "../types/blog";
import { getImageUrl } from "../utils/imageUrl";
import { LandingCategoriesSlider } from "../components/blog/LandingCategoriesSlider";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/800x500/E8EEF5/072B63?text=Construbet+Blog";

// ============================================================
// CARD
// ============================================================

const BlogCard = React.memo(function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  const imageUrl = getImageUrl(post.image_url) || PLACEHOLDER_IMAGE;

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="group relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 transition-all duration-500 hover:shadow-2xl lg:grid lg:grid-cols-2"
      >
        <div className="relative h-64 lg:h-full overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            ⭐ Destaque
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
          <div className="flex items-center gap-3">
            {post.category && (
              <span className="rounded-full bg-[#E8EEF5] px-3 py-1 text-xs font-semibold text-[#072B63]">
                {post.category}
              </span>
            )}
            {post.reading_time && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock3 size={13} />
                {post.reading_time}
              </span>
            )}
          </div>

          <h2 className="mt-4 text-2xl font-black text-[#072B63] lg:text-3xl line-clamp-2 leading-tight">
            {post.title}
          </h2>

          {post.description && (
            <p className="mt-3 text-gray-600 line-clamp-3 leading-relaxed">{post.description}</p>
          )}

          <Link
            to={`/blog/${post.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white transition-all hover:bg-red-700 hover:-translate-y-0.5"
          >
            Ler artigo completo
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-red-200"
    >
      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
            }}
          />
          {post.category && (
            <span className="absolute left-3 top-3 rounded-full bg-[#E8EEF5] px-2.5 py-1 text-xs font-semibold text-[#072B63]">
              {post.category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {post.reading_time && (
              <>
                <Clock3 size={12} />
                {post.reading_time}
              </>
            )}
            {post.category && <span className="mx-1">•</span>}
            {post.category && <span className="font-medium text-[#072B63]">{post.category}</span>}
          </div>

          <h3 className="mt-3 line-clamp-2 text-lg font-bold text-[#072B63] group-hover:text-red-600 transition-colors leading-snug">
            {post.title}
          </h3>

          {post.description && (
            <p className="mt-2 line-clamp-2 text-sm text-gray-600 flex-1">{post.description}</p>
          )}

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-red-600 transition-all group-hover:gap-2.5">
            Ler mais
            <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
});

// ============================================================
// SKELETON (loading)
// ============================================================

const CardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
    <div className="h-48 w-full animate-pulse bg-gray-200" />
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
    </div>
  </div>
);

// ============================================================
// PÁGINA
// ============================================================

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const activeCategory = searchParams.get("categoria");

  // sempre pedir status=true (o hook/getPosts já faz isso por default)
  const { posts, pagination, loading, error, refetch } = useBlogPosts({
    page,
    limit: POSTS_PER_PAGE,
    status: true,
    ...(activeCategory ? { category: activeCategory } : {}),
  });

  const { categories } = useBlogCategories();

  // Reset paginação ao mudar filtro
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  // Filtro client-side (UX rápida) — só sobre a página atual
  const visiblePosts = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return posts;
    return posts.filter((post) =>
      [post.title, post.description, post.category].join(" ").toLowerCase().includes(term),
    );
  }, [posts, search]);

  const featuredPost = useMemo(() => {
    if (page !== 1 || activeCategory || search) return null;
    return posts.find((p) => p.featured) || posts[0] || null;
  }, [posts, page, activeCategory, search]);

  const remainingPosts = useMemo(() => {
    if (!featuredPost) return visiblePosts;
    return visiblePosts.filter((p) => p.id !== featuredPost.id);
  }, [visiblePosts, featuredPost]);

  const totalPages = pagination?.totalPages ?? 1;

  // Scroll suave ao trocar de categoria
  useEffect(() => {
    if (!activeCategory) return;
    const target = document.getElementById("blog-posts");
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  }, [activeCategory]);

  const setCategory = (category: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (!category) next.delete("categoria");
    else next.set("categoria", category);
    setSearchParams(next, { replace: false });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <SEO
        title={activeCategory ? `Blog - ${activeCategory} | Construbet` : "Blog Construbet | Dicas e conteúdos para sua obra"}
        description="Artigos, dicas práticas e respostas para as dúvidas mais comuns sobre materiais de construção, acabamento e execução de obras."
        // Filtros e busca são estados de UX, não páginas de destino orgânico.
        // Mantém uma URL canônica única e evita indexação de duplicatas.
        canonical="/blog"
        noIndex={Boolean(activeCategory || search.trim())}
      />

      {/*  */}
      <section className="relative overflow-hidden px-4 sm:px-6 pt-20 md:pt-28 pb-14">
        <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#072B63]/5 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl pt-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#072B63]/5 px-4 py-2 text-sm font-semibold text-[#072B63]">
            <BookOpen size={15} />
            Central de Conteúdo Construbet
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-[#072B63]"
          >
            Dicas e conteúdos para <span className="text-red-600">sua obra</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-4 max-w-2xl text-base text-gray-600 leading-relaxed"
          >
            Artigos, dicas práticas e respostas para as dúvidas mais comuns sobre materiais de
            construção, acabamento e execução de obras.
          </motion.p>

          {/* Busca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-7 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-lg max-w-xl"
          >
            <Search size={20} className="text-red-500 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar artigos, dicas ou perguntas..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-full p-1 hover:bg-gray-100 transition"
                aria-label="Limpar busca"
              >
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filtros por categoria (vindas da API) */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory(null)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${!activeCategory
                  ? "bg-[#072B63] text-white shadow-md"
                  : "bg-white text-[#072B63] border border-gray-200 hover:border-red-400"
                }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.nome)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${activeCategory === cat.nome
                    ? "bg-[#072B63] text-white shadow-md"
                    : "bg-white text-[#072B63] border border-gray-200 hover:border-red-400"
                  }`}
              >
                {cat.nome}
              </button>
            ))}
          </div>

          <div className="mt-3 text-sm text-gray-500">
            {loading
              ? "Carregando…"
              : pagination
                ? `${pagination.total} conteúdo(s) encontrado(s)`
                : ""}
          </div>
        </div>
      </section>

      {/* Erro */}
      {error && !loading && (
        <section className="px-4 sm:px-6 pb-12">
          <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 flex items-start gap-3">
            <AlertCircle className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-red-800">Não foi possível carregar os posts</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={refetch}
                className="mt-3 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Destaque (apenas na primeira página sem filtro) */}
      {featuredPost && (
        <section className="px-4 sm:px-6 pb-12">
          <div className="mx-auto max-w-7xl">
            <BlogCard post={featuredPost} featured />
          </div>
        </section>
      )}

      {/* Grid */}
      <section id="blog-posts" className="scroll-mt-28 px-4 sm:px-6 pb-12">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : remainingPosts.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </AnimatePresence>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="mt-4 text-gray-500">
                Nenhum conteúdo encontrado com esse filtro.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setCategory(null);
                }}
                className="mt-5 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-700"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Paginação */}
      {!loading && totalPages > 1 && (
        <section className="px-4 sm:px-6 pb-16">
          <div className="mx-auto max-w-7xl flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#072B63] disabled:opacity-40 disabled:cursor-not-allowed hover:border-red-400"
            >
              <ChevronLeft size={16} /> Anterior
            </button>
            <span className="text-sm text-gray-600 px-3">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#072B63] disabled:opacity-40 disabled:cursor-not-allowed hover:border-red-400"
            >
              Próxima <ChevronRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#072B63] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Precisa de materiais para sua obra?
              </h2>
              <p className="mt-3 text-blue-100 max-w-md">
                Há mais de 45 anos a Construbet oferece qualidade, tradição e atendimento
                especializado em Betim e região.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={ECOMMERCE_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
              >
                Ir para o E-commerce
                <ArrowRight size={18} />
              </a>

            </div>
          </div>
        </div>
      </section>
      <LandingCategoriesSlider />

    </main>
  );
}
