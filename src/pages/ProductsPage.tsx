import { motion } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useProductCategories } from '../hooks/useProductCategories';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { useState } from 'react';

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { products, loading, error } = useProducts({
    active: true,
    featured: undefined, // mostrar todos, mas você pode usar true para só destaques
    categoryId: selectedCategory,
  });

  const { categories, loading: categoriesLoading } = useProductCategories({
    active: true,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Nossos Produtos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
          Confira nossa seleção de produtos e serviços.
        </p>
      </motion.div>

      {/* Filtros por categoria */}
      {!categoriesLoading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setSelectedCategory(undefined)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
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
                  : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid de produtos */}
      <ProductGrid products={products} loading={loading} error={error} />
    </div>
  );
}