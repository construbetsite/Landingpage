// src/pages/ProductList.tsx
import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useProductCategories } from '../hooks/useProductCategories';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO/SEO';
import { ProductGridSkeleton } from '../components/Skeletons/Skeletons';

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

  const { products, loading, error } = useProducts({
    active: true,
    categoryId: selectedCategory,
  });

  const { categories, loading: categoriesLoading } = useProductCategories({
    active: true,
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28 md:pt-32">
        <SEO title="Catálogo de Produtos | Construbet" description="Confira nosso catálogo de materiais de construção, pisos, ferramentas e acabamentos em Betim." />
        <div className="mb-8">
          <div className="h-9 bg-gray-200 rounded w-64 mb-3 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
        </div>
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-28 md:pt-32 text-center">
        <SEO title="Produtos | Construbet" noIndex />
        <div className="max-w-md mx-auto bg-red-50 p-8 rounded-2xl border border-red-200">
          <p className="text-red-600 font-semibold mb-4">❌ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28 md:pt-32">
      <SEO
        title="Catálogo de Produtos | Construbet"
        description="Confira toda a linha de materiais de construção, acabamento, pisos, argamassas e tintas na Construbet em Betim."
        canonical="/produtos"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#072B63]">
          Todos os Produtos
        </h1>
        <p className="text-gray-600 mt-2">
          {products.length} {products.length === 1 ? 'produto disponível' : 'produtos disponíveis'}
        </p>
      </motion.div>

      {/* Filtros por categoria */}
      {!categoriesLoading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-start mb-10">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid de produtos - CARDS BRANCOS */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500">Nenhum produto cadastrado no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              <Link to={`/produto/${product.slug}`} className="block h-full flex flex-col">
                <div className="relative aspect-square bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      Sem imagem
                    </div>
                  )}
                  {product.featured && (
                    <span className="absolute top-2.5 right-2.5 bg-yellow-400 text-black text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      Destaque
                    </span>
                  )}
                </div>

                <div className="p-3.5 sm:p-4 space-y-1.5 flex flex-col flex-1">
                  {product.brand && (
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-sky-600">
                      {product.brand}
                    </span>
                  )}
                  <h3 className="text-sm font-bold leading-tight line-clamp-2 text-slate-800 group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                  <div className="pt-2 mt-auto flex items-center justify-between border-t border-gray-100">
                    {product.commercialType === 'PICKUP' && product.price !== null ? (
                      <span className="text-base sm:text-lg font-bold text-green-600">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-blue-600">
                        Disponível online
                      </span>
                    )}
                    <span className="text-xs text-gray-400 group-hover:text-blue-600 transition-colors">
                      Ver detalhes →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}