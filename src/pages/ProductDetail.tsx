// src/pages/ProductDetail.tsx (ou src/components/ProductDetail/ProductDetail.tsx)
import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductBySlug } from '../hooks/useProductBySlug';
import { ChevronLeft, Calendar, Tag, ShoppingBag, ExternalLink } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProductBySlug(slug || '');
  const contentRef = useRef<HTMLDivElement>(null);

  // Animação GSAP opcional
  useEffect(() => {
    if (product && contentRef.current) {
      import('gsap').then((gsap) => {
        const elements = contentRef.current?.querySelectorAll('p, h2, h3, img, li');
        if (elements && elements.length > 0) {
          gsap.default.fromTo(
            elements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }
          );
        }
      });
    }
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">❌ {error || 'Produto não encontrado'}</h2>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Voltar para a loja
        </Link>
      </div>
    );
  }

  const isPickup = product.commercialType === 'PICKUP';
  const isEcommerce = product.commercialType === 'ECOMMERCE';

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8"
      >
        <ChevronLeft size={20} /> Voltar para a loja
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center text-gray-400">
              <ShoppingBag size={64} />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {product.brand && (
            <span className="inline-block text-sm font-medium text-blue-600 dark:text-blue-400">
              {product.brand}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>

          {product.sku && (
            <p className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</p>
          )}

          <div className="flex items-center gap-2 text-sm bg-blue-50 dark:bg-blue-950/30 px-3 py-1 rounded-full w-fit">
            {isPickup ? (
              <>
                <ShoppingBag size={16} className="text-blue-600" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">Retirada</span>
              </>
            ) : (
              <>
                <ExternalLink size={16} className="text-green-600" />
                <span className="text-green-700 dark:text-green-300 font-medium">E-commerce</span>
              </>
            )}
          </div>

          {isPickup && product.price !== null && (
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
          )}

          {isEcommerce && product.redirectUrl && (
            <a
              href={product.redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Comprar na loja <ExternalLink size={18} />
            </a>
          )}

          {product.shortDescription && (
            <p className="text-lg text-gray-600 dark:text-gray-400 border-l-4 border-blue-500 pl-4">
              {product.shortDescription}
            </p>
          )}

          <div
            ref={contentRef}
            className="prose prose-lg dark:prose-invert max-w-none mt-6 pt-6 border-t border-gray-200 dark:border-gray-800
              prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3
              prose-p:leading-relaxed prose-p:mb-4
              prose-img:rounded-xl prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <div className="pt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-4">
            {product.createdAt && (
              <span className="flex items-center gap-1">
                <Calendar size={16} /> Adicionado em {new Date(product.createdAt).toLocaleDateString('pt-BR')}
              </span>
            )}
            {product.categoryId && (
              <span className="flex items-center gap-1">
                <Tag size={16} /> Categoria: {product.categoryId}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}