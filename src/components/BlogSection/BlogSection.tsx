"use client";

// ============================================================
// BlogSection - Carrossel de posts em destaque na home
// ============================================================
//
// Consome /api/blog/posts?featured=true&limit=5 da API.
// Usa embla-carousel-react (já instalado) para um carrossel
// horizontal responsivo.
// ============================================================

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

import { getFeaturedPosts } from "../../services/blogApi";
import { getImageUrl } from "../../utils/imageUrl";
import type { BlogPost } from "../../types/blog";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/800x500/E8EEF5/072B63?text=Construbet+Blog";

function formatReadingTime(post: BlogPost): string {
  if (post.reading_time) return post.reading_time;
  if (typeof post.content === "string") {
    const words = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
  }
  return "";
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    getFeaturedPosts(5, { signal: controller.signal })
      .then((data) => setPosts(data))
      .catch((err: Error) => {
        if (controller.signal.aborted) return;
        setError(err.message || "Erro ao carregar destaques");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  // Se não houver destaques publicados, esconde a seção inteira
  if (!loading && posts.length === 0 && !error) return null;

  return (
    <section className="w-full bg-white py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#072B63] tracking-tight">
              DICAS E CONTEÚDOS PARA SUA OBRA
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Artigos, dicas práticas e novidades para sua obra
            </p>
          </div>

          <div className="flex items-center gap-2">
            {posts.length > 1 && (
              <>
                <button
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  aria-label="Anterior"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#072B63] disabled:opacity-40 hover:border-red-400 transition"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={!canScrollNext}
                  aria-label="Próximo"
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#072B63] disabled:opacity-40 hover:border-red-400 transition"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#072B63] border border-[#072B63] px-5 py-2.5 rounded-full hover:bg-[#072B63] hover:text-white transition-all duration-300 self-start sm:self-auto"
            >
              VER TODOS OS ARTIGOS
              <span className="text-lg leading-none">›</span>
            </Link>
          </div>
        </div>

        {/* Erro */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-center gap-2 text-sm text-red-800">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Carousel */}
        {!error && (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0"
                    >
                      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="aspect-[16/10] w-full animate-pulse bg-gray-200" />
                        <div className="p-5 space-y-3">
                          <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                          <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                          <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))
                : posts.map((post) => {
                    const img = getImageUrl(post.image_url) || PLACEHOLDER_IMAGE;
                    const reading = formatReadingTime(post);
                    return (
                      <Link
                        key={post.id}
                        to={`/blog/${post.slug}`}
                        className="group flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={img}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = PLACEHOLDER_IMAGE;
                            }}
                          />
                          {post.featured && (
                            <span className="absolute top-3 left-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white">
                              ⭐ Destaque
                            </span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            {post.category && (
                              <span className="inline-block text-[11px] font-bold tracking-wider text-[#072B63] bg-[#072B63]/5 px-2.5 py-1 rounded w-fit">
                                {post.category}
                              </span>
                            )}
                            {reading && (
                              <span className="text-[11px] text-gray-500">{reading}</span>
                            )}
                          </div>
                          <h3 className="text-[#072B63] font-bold text-base leading-snug mb-4 group-hover:text-red-600 transition-colors line-clamp-3">
                            {post.title}
                          </h3>
                          <span className="mt-auto text-sm font-semibold text-red-600 flex items-center gap-1">
                            LEIA MAIS
                            <span className="text-lg leading-none">›</span>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>
        )}

        {/* Banner Loja Física (mantido) */}
        <div className="mt-10 bg-red-600 rounded-2xl px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-white">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h4 className="font-black text-base sm:text-lg leading-tight">
                VISITE NOSSA LOJA FÍSICA EM BETIM
              </h4>
              <p className="text-sm text-red-100 mt-0.5">
                Mais de 45 anos oferecendo os melhores materiais e atendimento de qualidade
              </p>
            </div>
          </div>
          <a
            href="#mapa"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-red-600 font-bold text-sm px-6 py-3 rounded-full hover:bg-red-50 transition-all duration-300 shadow-md"
          >
            COMO CHEGAR
          </a>
        </div>
      </div>
    </section>
  );
}
