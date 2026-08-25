// src/pages/ProductDetail.tsx
import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProductBySlug } from '../hooks/useProductBySlug';
import { ChevronLeft, Calendar, Tag, ShoppingBag, ExternalLink, MessageCircle, Package } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import { ProductDetailSkeleton } from '../components/Skeletons/Skeletons';
import { generateWhatsAppLink, getProductWhatsAppMessage, SITE_URL } from '../config/constants';

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
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 pt-32 text-center">
        <SEO title="Produto não encontrado | Construbet" noIndex />
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm max-w-md mx-auto p-8">
          <h2 className="text-xl font-bold text-gray-800">❌ {error || 'Produto não encontrado'}</h2>
          <p className="mt-2 text-sm text-gray-500">
            O produto solicitado pode ter sido removido ou está temporariamente indisponível.
          </p>
          <Link
            to="/produtos"
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:shadow-md"
          >
            ← Voltar para a lista
          </Link>
        </div>
      </div>
    );
  }

  const isPickup = product.commercialType === 'PICKUP';
  const isEcommerce = product.commercialType === 'ECOMMERCE';

  const whatsappUrl = generateWhatsAppLink(
    getProductWhatsAppMessage(product.name, typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/produto/${product.slug}`)
  );

  return (
    <>
      <SEO
        title={`${product.name} | Construbet`}
        description={product.shortDescription || `Compre ${product.name} na Construbet com as melhores condições e entrega em Betim e região.`}
        image={product.imageUrl || undefined}
        canonical={`/produto/${product.slug}`}
        type="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          image: product.imageUrl ? [product.imageUrl] : [],
          description: product.shortDescription || product.name,
          sku: product.sku || undefined,
          brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'BRL',
            price: product.price ? String(product.price) : undefined,
            availability: product.active
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            url: `${SITE_URL}/produto/${product.slug}`,
          },
        }}
      />

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28 md:pt-32"
      >
        {/* Botão de voltar – agora mais sutil e sem sticky pesado */}
        <div className="mb-8">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Voltar para produtos
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Imagem – com destaque e sombra suave */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain p-6 bg-white"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center text-gray-300">
                <ShoppingBag size={64} strokeWidth={1} />
              </div>
            )}
            {product.featured && (
              <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                Destaque
              </span>
            )}
          </motion.div>

          {/* Informações e ações – com espaçamento refinado */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            {/* Marca e tipo */}
            <div className="flex items-center gap-3 flex-wrap">
              {product.brand && (
                <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                  {product.brand}
                </span>
              )}
              <span className="text-xs text-gray-400">|</span>
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1 rounded-full ${isPickup ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'
                }`}>
                {isPickup ? (
                  <>
                    <ShoppingBag size={15} />
                    Retirada na loja
                  </>
                ) : (
                  <>
                    <ExternalLink size={15} />
                    E-commerce
                  </>
                )}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {product.sku && (
              <p className="text-sm text-gray-400 flex items-center gap-1.5">
                <Package size={15} />
                SKU: {product.sku}
              </p>
            )}

            {/* Preço – com destaque premium */}
            {isPickup && product.price !== null && (
              <div className="bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl border border-blue-100">
                <span className="text-4xl font-bold text-blue-700">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <span className="ml-2 text-sm text-gray-500">à vista</span>
              </div>
            )}

            {/* Botões de ação – com efeitos modernos */}
            <div className="flex flex-wrap gap-4 pt-2">
              {isPickup && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  <MessageCircle size={20} />
                  Falar com a loja
                </a>
              )}

              {isEcommerce && product.redirectUrl && (
                <a
                  href={product.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                >
                  Comprar na loja <ExternalLink size={18} />
                </a>
              )}
            </div>

            {/* Descrição curta */}
            {product.shortDescription && (
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>
            )}

            {/* Descrição completa – mantendo o prose com melhorias */}
            {product.description && (
              <div
                ref={contentRef}
                className="prose prose-gray max-w-none mt-4 pt-4 border-t border-gray-100
                  prose-headings:font-bold prose-headings:text-gray-800
                  prose-p:text-gray-600 prose-p:leading-relaxed
                  prose-strong:text-gray-800
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-ul:my-3 prose-li:my-1
                  prose-img:rounded-xl prose-img:shadow-sm"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Metadados – com ícones discretos */}
            <div className="pt-4 mt-2 border-t border-gray-100 flex flex-wrap gap-5 text-sm text-gray-400">
              {product.createdAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} />
                  Adicionado em {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                </span>
              )}
              {product.categoryId && (
                <span className="flex items-center gap-1.5">
                  <Tag size={15} />
                  Categoria: {product.categoryId}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.article>
    </>
  );
}