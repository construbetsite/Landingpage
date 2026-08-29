import { memo, useRef, useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Store,
  Grid3X3,
  Wrench,
  Droplets,
  Zap,
  Paintbrush,
  type LucideIcon,
} from "lucide-react";

import { useLandingCategories } from "../../hooks/useLandingCategories";

/* ============================================================
   ÍCONE POR CATEGORIA
============================================================ */

function getCategoryIcon(title: string): LucideIcon {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("porta") || normalizedTitle.includes("janela")) {
    return Store;
  }

  if (normalizedTitle.includes("piso") || normalizedTitle.includes("revestimento")) {
    return Grid3X3;
  }

  if (normalizedTitle.includes("ferrament")) {
    return Wrench;
  }

  if (normalizedTitle.includes("hidrául")) {
    return Droplets;
  }

  if (normalizedTitle.includes("elétr")) {
    return Zap;
  }

  if (normalizedTitle.includes("tinta") || normalizedTitle.includes("acessório")) {
    return Paintbrush;
  }

  return Store;
}

/* ============================================================
   COMPONENTE
============================================================ */

export const LandingCategoriesSlider = memo(function LandingCategoriesSlider() {
  const { categories, loading } = useLandingCategories();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  // Atualiza estado dos botões e índice
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calcula índice aproximado (baseado na largura do primeiro card)
    const firstChild = track.children[0] as HTMLElement;
    if (firstChild) {
      const cardWidth = firstChild.getBoundingClientRect().width + 12; // gap de 12px
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(index);
    }
  }, []);

  // Atualiza total de slides
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !categories.length) return;

    const firstChild = track.children[0] as HTMLElement;
    if (firstChild) {
      const cardWidth = firstChild.getBoundingClientRect().width + 12;
      const total = Math.ceil(track.scrollWidth / cardWidth);
      setTotalSlides(total);
    }
  }, [categories]);

  // Listeners de scroll e resize
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    track.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Inicializa
    requestAnimationFrame(updateScrollState);

    return () => {
      track.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateScrollState]);

  const scroll = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;

    const firstChild = track.children[0] as HTMLElement;
    if (!firstChild) return;

    const cardWidth = firstChild.getBoundingClientRect().width + 12; // gap de 12px
    const scrollAmount = cardWidth * 2; // rola 2 cards por vez

    const target =
      direction === "left"
        ? track.scrollLeft - scrollAmount
        : track.scrollLeft + scrollAmount;

    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const firstChild = track.children[0] as HTMLElement;
    if (!firstChild) return;

    const cardWidth = firstChild.getBoundingClientRect().width + 12;
    track.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  if (!loading && categories.length === 0) {
    return null;
  }

  return (
    <section aria-label="Categorias do e-commerce" className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ==================================================
            CABEÇALHO
        ================================================== */}

        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-black uppercase tracking-tight text-[#072B63] sm:text-xl">
            Categorias <span className="text-red-600">do e-commerce</span>
          </h2>

          <a
            href="https://www.construbet.com.br"
            className="hidden text-xs font-bold uppercase text-[#072B63] transition-colors hover:text-red-600 sm:block"
          >
            Ver todas as categorias
            <span className="ml-1">›</span>
          </a>
        </div>

        {/* ==================================================
            SLIDER
        ================================================== */}

        <div className="relative">
          {/* ==================================================
              SETA ESQUERDA (visível no mobile também)
          ================================================== */}

          <button
            type="button"
            aria-label="Categoria anterior"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`
              absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2
              grid h-8 w-8 place-items-center rounded-full border border-slate-200
              bg-white text-[#072B63] shadow-md transition-all
              hover:bg-[#072B63] hover:text-white
              ${canScrollLeft ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}
              sm:h-9 sm:w-9
            `}
          >
            <ChevronLeft size={16} strokeWidth={2} className="sm:size-[18px]" />
          </button>

          {/* ==================================================
              TRACK
          ================================================== */}

          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {/* ==================================================
                LOADING
            ================================================== */}

            {loading &&
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[145px] min-w-[calc(50%-6px)] animate-pulse snap-start rounded-xl bg-slate-200 sm:min-w-[calc(33.333%-8px)] lg:min-w-[calc(16.666%-10px)]"
                />
              ))}

            {/* ==================================================
                CATEGORIAS DA API
            ================================================== */}

            {!loading &&
              categories.map((category) => {
                const Icon = getCategoryIcon(category.title);
                const isExternal = category.url.startsWith("http");

                return (
                  <a
                    key={category.id}
                    href={category.url}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`Ver produtos de ${category.title}`}
                    className="group relative block h-[145px] min-w-[calc(50%-6px)] snap-start overflow-hidden rounded-xl bg-[#072B63] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-w-[calc(33.333%-8px)] lg:min-w-[calc(16.666%-10px)]"
                  >
                    {/* IMAGEM */}
                    {category.image && (
                      <img
                        src={category.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* GRADIENTE AZUL */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#072B63] via-[#072B63]/70 to-[#072B63]/10" />

                    {/* CONTEÚDO */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-3 pb-4 text-center">
                      <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#072B63]/90 text-white shadow-md backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Icon size={19} strokeWidth={1.8} />
                      </div>
                      <span className="text-xs font-bold leading-tight text-white sm:text-[13px]">
                        {category.title}
                      </span>
                    </div>
                  </a>
                );
              })}
          </div>

          {/* ==================================================
              SETA DIREITA (visível no mobile também)
          ================================================== */}

          <button
            type="button"
            aria-label="Próxima categoria"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`
              absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2
              grid h-8 w-8 place-items-center rounded-full border border-slate-200
              bg-white text-[#072B63] shadow-md transition-all
              hover:bg-[#072B63] hover:text-white
              ${canScrollRight ? 'opacity-100' : 'opacity-30 cursor-not-allowed'}
              sm:h-9 sm:w-9
            `}
          >
            <ChevronRight size={16} strokeWidth={2} className="sm:size-[18px]" />
          </button>
        </div>

        {/* ==================================================
            DOTS (indicadores de página)
        ================================================== */}

        {totalSlides > 1 && (
          <div className="mt-4 flex justify-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-[#072B63]" : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* ==================================================
            LINK MOBILE
        ================================================== */}

        <div className="mt-4 text-center sm:hidden">
          <a
            href="http://www.construbet.com.br"
            className="text-xs font-bold uppercase text-[#072B63] hover:text-red-600"
          >
            Ver todas as categorias
            <span className="ml-1">›</span>
          </a>
        </div>
      </div>
    </section>
  );
});