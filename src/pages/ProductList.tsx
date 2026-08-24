// src/pages/ProductList.tsx
import { useProducts } from '../hooks/useProducts';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProductList() {
  const { products, loading, error } = useProducts({ active: true });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>❌ {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#072B63]">
          Todos os Produtos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {products.length} produtos disponíveis
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <Link to={`/produto/${product.slug}`} className="block h-full">
              <div className="relative aspect-square bg-gray-50 dark:bg-zinc-800 overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sem imagem
                  </div>
                )}
                {product.featured && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Destaque
                  </span>
                )}
              </div>

              <div className="p-3 sm:p-4 space-y-1">
                {product.brand && (
                  <span className="text-xs uppercase text-gray-500 dark:text-gray-400">
                    {product.brand}
                  </span>
                )}
                <h3 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                {product.shortDescription && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}
                <div className="pt-2 flex items-center justify-between">
                  {product.commercialType === 'PICKUP' && product.price !== null ? (
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  ) : (
                    <span className="text-xs text-blue-600 font-medium">Ver na loja</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}