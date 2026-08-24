import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../../types/types';
import { ShoppingBag, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const isPickup = product.commercialType === 'PICKUP';
  const isEcommerce = product.commercialType === 'ECOMMERCE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/produto/${product.slug}`} className="block h-full">
        {/* Imagem */}
        {product.imageUrl && (
          <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {product.featured && (
              <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                Destaque
              </span>
            )}
            {!product.active && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Indisponível
              </span>
            )}
          </div>
        )}

        {/* Conteúdo */}
        <div className="p-5 space-y-3">
          {product.brand && (
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {product.brand}
            </span>
          )}

          <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>

          {product.shortDescription && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {product.shortDescription}
            </p>
          )}

          {/* Preço ou botão de e-commerce */}
          <div className="flex items-center justify-between pt-2">
            {isPickup && product.price !== null && (
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            )}

            {isEcommerce && product.redirectUrl && (
              <span className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 font-medium">
                Ver na loja <ExternalLink size={16} />
              </span>
            )}

            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-500">
              <ShoppingBag size={16} />
              <span>{isPickup ? 'Retirada' : 'Online'}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}