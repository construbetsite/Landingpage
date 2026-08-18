import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { promotions } from "../../data/promotions";
import PromotionCard from "./PromotionCard";
import PromotionTimer from "./PromotionTimer";
import SectionHeader from "./SectionHeader";

export default function PromocoesSemana() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Atualizar índice ativo no scroll (apenas mobile)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('.card-wrapper')?.clientWidth || 0;
      const gap = 16; // gap-4
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(newIndex, promotions.length - 1));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Navegação do carrossel (setas)
  const scrollTo = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.querySelector('.card-wrapper')?.clientWidth || 0;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
    id="ofertas"
      className="relative overflow-hidden bg-gradient-to-br from-[#071B46] via-[#0B2E73] to-[#071B46] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-labelledby="promocoes-semana-title"
    >
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(216,31,38,0.12),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 bg-[radial-gradient(circle,rgba(216,31,38,0.06),transparent_70%)]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.03),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
          {/* Cabeçalho */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Ofertas da semana"
              title="Promoções imperdíveis"
              description="Aproveite ofertas especiais em materiais de construção, acabamentos e ferramentas com estoque limitado."
              align="left"
            />

            <motion.a
              href="/orcamento"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 hover:shadow-lg sm:px-6 sm:py-3"
            >
              <BadgePercent size={16} />
              <span>Ver todas</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>

          {/* Banner Timer */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] backdrop-blur-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="rounded-full bg-[#d81f26]/20 p-2.5 sm:p-3">
                  <Sparkles size={20} className="text-[#d81f26] sm:size-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300 sm:text-sm">
                    Últimas horas
                  </p>
                  <h3 id="promocoes-semana-title" className="mt-1 text-xl font-semibold text-white sm:mt-2 sm:text-2xl lg:text-3xl">
                    Oferta válida por tempo limitado
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 sm:mt-2 sm:text-sm">
                    Garanta preços especiais antes que o estoque termine.
                  </p>
                </div>
              </div>
              <PromotionTimer />
            </div>
          </div>

          {/* CARROSSEL / GRID DE CARDS */}
          <div className="relative">
            {/* Container: scroll horizontal no mobile, grid no tablet/desktop */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory 
                       md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pb-0 md:snap-none
                       lg:grid-cols-3 xl:grid-cols-4 xl:gap-6
                       scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {promotions.map((promotion, index) => (
                <motion.div 
                  key={promotion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="card-wrapper min-w-[85%] sm:min-w-[45%] md:min-w-0 snap-center h-full"
                >
                  <PromotionCard promotion={promotion} />
                </motion.div>
              ))}
            </div>

            {/* Botões de Navegação - Visíveis apenas em telas maiores */}
            <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => scrollTo('left')}
                className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                aria-label="Anterior"
              >
                <ChevronLeft size={20} className="text-[#071B46]" />
              </button>
            </div>
            <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
              <button
                onClick={() => scrollTo('right')}
                className="rounded-full bg-white/90 p-2 shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                aria-label="Próximo"
              >
                <ChevronRight size={20} className="text-[#071B46]" />
              </button>
            </div>

            {/* Indicadores Dots - Mobile */}
            {isMobile && promotions.length > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {promotions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const container = scrollContainerRef.current;
                      if (!container) return;
                      const cardWidth = container.querySelector('.card-wrapper')?.clientWidth || 0;
                      const gap = 16;
                      container.scrollTo({
                        left: index * (cardWidth + gap),
                        behavior: 'smooth'
                      });
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-[#d81f26]' 
                        : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir para card ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
