"use client";

import { useProducts } from '../../hooks/useProducts';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
  // 🔥 Busca TODOS os produtos ativos, sem filtro de destaque
  const { products, loading, error } = useProducts({
    active: true,
  });

  if (loading) {
    return (
      <section className="w-full bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto" />
          <p className="mt-3 text-gray-500">Carregando produtos...</p>
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

  // Limitar a 15 produtos (opcional)
  const displayProducts = products.slice(0, 15);

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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {displayProducts.map((product) => {
            const isEcommerce = product.commercialType === 'ECOMMERCE';
            const actionUrl = isEcommerce ? product.redirectUrl : null;
            const priceFormatted = product.price?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            });

            return (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
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

                  {!isEcommerce && priceFormatted && (
                    <p className="text-sm font-bold text-green-600 mb-2">
                      {priceFormatted}
                    </p>
                  )}

                  {actionUrl ? (
                    <a
                      href={actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-1.5 w-full bg-red-600 hover:bg-red-700 text-white text-[11px] sm:text-xs font-bold py-2.5 px-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      VER NO E-COMMERCE
                      <ExternalLink size={13} strokeWidth={2.5} />
                    </a>
                  ) : (
                    <Link
                      to={`/produto/${product.slug}`}
                      className="mt-auto inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-xs font-bold py-2.5 px-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      SAIBA MAIS
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}