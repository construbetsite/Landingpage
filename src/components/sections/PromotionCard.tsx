import { motion } from "framer-motion";
import { ShoppingBag, Clock, TrendingUp, ExternalLink } from "lucide-react";
import type { Promotion } from "../../types/sections";

interface PromotionCardProps {
  promotion: Promotion;
}

export default function PromotionCard({ promotion }: PromotionCardProps) {
  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      "Oferta": "bg-gradient-to-r from-[#d81f26] to-red-600",
      "Novidade": "bg-gradient-to-r from-blue-500 to-blue-600",
      "Exclusivo": "bg-gradient-to-r from-purple-500 to-purple-600",
      "Super Oferta": "bg-gradient-to-r from-amber-500 to-orange-600",
      "Imperdível": "bg-gradient-to-r from-emerald-500 to-green-600",
    };
    return colors[badge] || "bg-gradient-to-r from-[#d81f26] to-red-600";
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(promotion.externalLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.article
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
      aria-label={`Promoção ${promotion.name}`}
    >
      {/* Container da Imagem - Aspect Ratio 1:1 (Quadrado) */}
      <div className="relative w-full bg-slate-100">
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={promotion.image}
            alt={promotion.name}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-product.jpg';
            }}
          />

          {/* Overlay sutil no hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-transparent transition duration-300 group-hover:from-black/10" />

          {/* Badge Principal */}
          <span className={`absolute left-3 top-3 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg ${getBadgeColor(promotion.badge)}`}>
            {promotion.badge}
          </span>

          {/* Selo de Desconto */}
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500/95 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm shadow-lg">
            <TrendingUp size={12} />
            {promotion.discount}
          </span>

          {/* Estoque Limitado */}
          {promotion.limitedStock && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
              <Clock size={12} />
              Estoque limitado
            </div>
          )}

          {/* Ícone de link externo no hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm">
              <ExternalLink size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Card - SEM DESCRIÇÃO */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Título */}
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-900 sm:text-base">
          {promotion.name}
        </h3>

        {/* Preços */}
        <div className="mt-4 flex flex-col space-y-1 border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-400 line-through sm:text-sm">
            {promotion.oldPrice}
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-[#071B46] sm:text-2xl">
              {promotion.price}
            </span>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:px-3 sm:py-1.5 sm:text-xs">
              {promotion.discount} OFF
            </span>
          </div>
        </div>

        {/* Botão Comprar - Link Externo */}
        <motion.button
          onClick={handleBuyClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#071B46] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0B2E73] hover:shadow-lg hover:shadow-[#071B46]/25 sm:mt-5 sm:py-3.5"
        >
          <ShoppingBag size={16} />
          <span>Comprar Agora</span>
          <ExternalLink size={14} className="opacity-70" />
        </motion.button>
      </div>
    </motion.article>
  );
}
