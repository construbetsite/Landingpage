import { memo, useMemo } from "react";
import type { BlogPostProduct } from "../../types/blog";

interface PostProductsGridProps {
  products?: BlogPostProduct[];
  loading?: boolean;
}

const formatPrice = (price: number | null) => price === null ? "Consulte o preço" : price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const PostProductsGrid = memo(function PostProductsGrid({ products = [], loading = false }: PostProductsGridProps) {
  const visibleProducts = useMemo(() => products.filter((product) => product.active !== false).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)), [products]);

  if (!loading && visibleProducts.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="text-2xl font-bold text-slate-900">Produtos Recomendados</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 3 }).map((_, index) => <div key={index} className="animate-pulse overflow-hidden rounded-lg border-slate-200"><div className="aspect-square bg-slate-200" /><div className="space-y-3 p-4"><div className="h-5 w-3/4 rounded bg-slate-200" /><div className="h-5 w-1/2 rounded bg-slate-200" /><div className="h-10 rounded bg-slate-200" /></div></div>) : visibleProducts.map((product) => (
          <article key={product.id} className="flex flex-col overflow-hidden rounded-lg border-slate-200 bg-white shadow-sm">
            <div className="aspect-square bg-slate-50 p-4">
              <img src={product.imageUrl || "/placeholder-product.svg"} alt={product.name} loading="lazy" className="h-full w-full object-contain" onError={(event) => { event.currentTarget.src = "/placeholder-product.svg"; }} />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="min-h-12 text-base font-semibold text-slate-900">{product.name}</h3>
              <p className="mt-2 text-lg font-bold text-[#004AAD]">{formatPrice(product.price)}</p>
              {product.redirectUrl && <a href={product.redirectUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md bg-[#004AAD] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#00367d]">Comprar</a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});
