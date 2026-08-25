import React from 'react';

/**
 * Skeleton para card de produto
 */
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800 animate-pulse flex flex-col">
    <div className="aspect-square bg-gray-200 dark:bg-zinc-800" />
    <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
      </div>
      <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 flex justify-between items-center">
        <div className="h-5 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
      </div>
    </div>
  </div>
);

/**
 * Skeleton para grid de produtos
 */
export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Skeleton para detalhe do produto
 */
export const ProductDetailSkeleton: React.FC = () => (
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-28 md:pt-32 animate-pulse">
    <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-36 mb-8" />
    <div className="grid md:grid-cols-2 gap-12">
      <div className="rounded-2xl bg-gray-200 dark:bg-zinc-800 aspect-square" />
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/4" />
        <div className="h-8 bg-gray-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded-full w-32" />
        <div className="h-10 bg-gray-200 dark:bg-zinc-800 rounded w-1/2" />
        <div className="h-12 bg-gray-200 dark:bg-zinc-800 rounded-xl w-48 mt-6" />
        <div className="space-y-2 pt-6">
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-zinc-800 rounded w-2/3" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Skeleton para card do blog
 */
export const BlogPostCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse flex flex-col">
    <div className="h-48 bg-gray-200" />
    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-4" />
    </div>
  </div>
);

/**
 * Skeleton para lista do blog
 */
export const BlogListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
    {Array.from({ length: count }).map((_, i) => (
      <BlogPostCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Skeleton para detalhe do post do blog
 */
export const BlogPostDetailSkeleton: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-8">
    <div className="h-6 bg-gray-200 rounded w-32" />
    <div className="h-10 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/3" />
    <div className="h-72 sm:h-96 bg-gray-200 rounded-2xl w-full" />
    <div className="space-y-4 pt-4">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-4/5" />
      <div className="h-4 bg-gray-200 rounded w-full" />
    </div>
  </div>
);
