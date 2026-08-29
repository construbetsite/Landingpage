"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";

export default function FeaturedProducts() {
  const { products, loading, error } = useProducts({ active: true });
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  // Verifica se o scroll pode avançar/voltar
  const updateScrollButtons = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calcula índice atual (baseado na largura do card)
    const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
    const gap = 16; // gap-4 = 16px (sm: gap-5 = 20px, mas mantemos 16)
    const slideWidth = cardWidth + gap;
    const index = Math.round(scrollLeft / slideWidth);
    setCurrentIndex(index);
  }, []);

  // Atualiza total de slides (✅ corrigido: removeu slideWidth não usado)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !products.length) return;

    // 1 slide = 1 card
    const total = Math.ceil(products.length / 1);
    setTotalSlides(total);

    updateScrollButtons();
  }, [products, updateScrollButtons]);

  // Rolagem suave
  const scroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
    const gap = 16;
    const slideWidth = cardWidth + gap;

    const target =
      direction === "left"
        ? container.scrollLeft - slideWidth * 2 // rola 2 cards por vez
        : container.scrollLeft + slideWidth * 2;

    container.scrollTo({ left: target, behavior: "smooth" });
  };

  // Resize listener
  useEffect(() => {
    const handleResize = () => updateScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateScrollButtons]);

  // Loading
  if (loading) {
    return (
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="h-7 bg-gray-200 rounded w-48 animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-7 bg-gray-200 rounded w-full mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-red-500">
          <p>Erro ao carregar produtos: {error}</p>
        </div>
      </section>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  // Limitar a 12 produtos
  const displayProducts = products.slice(0, 12);

  return (
    <section id="produtos" className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#072B63] tracking-tight">
            PRODUTOS EM <span className="text-red-600">DESTAQUE</span>
          </h2>
          <Link
            to="/produtos"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#072B63] hover:text-red-600 transition-colors"
          >
            VER TODOS
            <span className="text-lg leading-none">›</span>
          </Link>
        </div>

        <div className="relative">
          {/* Setas */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} className="text-[#072B63]" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-200 flex items-center justify-center hover:bg-white hover:shadow-xl transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight size={20} className="text-[#072B63]" />
            </button>
          )}

          {/* Carrossel com scroll-snap */}
          <div
            ref={containerRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={updateScrollButtons}
          >
            {displayProducts.map((product) => {
              const isEcommerce = product.commercialType === "ECOMMERCE";
              const priceFormatted = product.price?.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(16.666%-0.85rem)] scroll-snap-align-start"
                >
                  <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
                    <Link
                      to={`/produto/${product.slug}`}
                      className="flex flex-col h-full"
                    >
                      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
                            Sem imagem
                          </div>
                        )}
                      </div>

                      <div className="p-3 sm:p-4 flex flex-col flex-1">
                        <h3 className="text-[#072B63] font-semibold text-xs sm:text-sm leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>

                        {!isEcommerce && priceFormatted ? (
                          <p className="text-sm font-bold text-green-600 mb-2">
                            {priceFormatted}
                          </p>
                        ) : (
                          <p className="text-xs text-blue-600 font-medium mb-2">
                            Disponível online
                          </p>
                        )}

                        <span className="mt-auto inline-flex items-center justify-center w-full bg-blue-600 group-hover:bg-blue-700 text-white text-[11px] sm:text-xs font-bold py-2.5 px-3 rounded-lg transition-all duration-300 group-hover:-translate-y-0.5">
                          SAIBA MAIS
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots (opcional) */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.min(totalSlides, 6) }).map((_, i) => (
              <button
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-[#072B63] w-8" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => {
                  const container = containerRef.current;
                  if (!container) return;
                  const cardWidth = container.children[0]?.getBoundingClientRect().width || 0;
                  const gap = 16;
                  const slideWidth = cardWidth + gap;
                  container.scrollTo({ left: i * slideWidth, behavior: "smooth" });
                }}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}