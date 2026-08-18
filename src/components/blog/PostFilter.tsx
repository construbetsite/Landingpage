import { useEffect, useState } from "react";
import { Filter, X } from "lucide-react";
import { getCategories } from "../../services/blogApi";
import type { BlogCategoria } from "../../types/blog";

export interface PostFilterValues {
  category?: string;
  tag?: string;
  featured?: boolean;
}

interface PostFilterProps {
  initial?: PostFilterValues;
  onChange: (filters: PostFilterValues) => void;
}

export default function PostFilter({
  initial,
  onChange,
}: PostFilterProps) {
  const [category, setCategory] = useState(
    initial?.category ?? ""
  );

  const [tag, setTag] = useState(
    initial?.tag ?? ""
  );

  const [featured, setFeatured] = useState(
    initial?.featured ?? false
  );

  const [categorias, setCategorias] = useState<
    BlogCategoria[]
  >([]);

  const [categoriasLoading, setCategoriasLoading] =
    useState(true);

  const [categoriasError, setCategoriasError] =
    useState<string | null>(null);

  // ============================================================
  // BUSCAR CATEGORIAS
  // ============================================================

  useEffect(() => {
    let active = true;

    const fetchCategorias = async () => {
      try {
        setCategoriasLoading(true);
        setCategoriasError(null);

        const data = await getCategories();

        if (active) {
          setCategorias(data);
        }
      } catch (error: unknown) {
        console.error(
          "❌ Erro ao carregar categorias:",
          error
        );

        if (active) {
          setCategoriasError(
            error instanceof Error
              ? error.message
              : "Erro ao carregar categorias."
          );
        }
      } finally {
        if (active) {
          setCategoriasLoading(false);
        }
      }
    };

    fetchCategorias();

    return () => {
      active = false;
    };
  }, []);

  // ============================================================
  // SINCRONIZAR FILTROS EXTERNOS
  // ============================================================

  useEffect(() => {
    setCategory(initial?.category ?? "");
    setTag(initial?.tag ?? "");
    setFeatured(initial?.featured ?? false);
  }, [
    initial?.category,
    initial?.tag,
    initial?.featured,
  ]);

  // ============================================================
  // APLICAR FILTROS
  // ============================================================

  const apply = () => {
    onChange({
      category: category.trim() || undefined,
      tag: tag.trim() || undefined,
      featured: featured || undefined,
    });
  };

  // ============================================================
  // LIMPAR FILTROS
  // ============================================================

  const clear = () => {
    setCategory("");
    setTag("");
    setFeatured(false);

    onChange({});
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <Filter
          size={16}
          className="text-[#004AAD]"
        />

        <span>Filtros</span>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* ================================================== */}
        {/* CATEGORIA */}
        {/* ================================================== */}

        <div>
          <label
            htmlFor="post-filter-category"
            className="block text-xs font-medium text-slate-600"
          >
            Categoria
          </label>

          <select
            id="post-filter-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            disabled={categoriasLoading}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#0A2230] disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="">
              Todas
            </option>

            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.nome}
              >
                {categoria.nome
                  .charAt(0)
                  .toUpperCase() +
                  categoria.nome.slice(1)}
              </option>
            ))}
          </select>

          {categoriasLoading && (
            <p className="mt-1 text-xs text-slate-500">
              Carregando categorias...
            </p>
          )}

          {categoriasError && (
            <p className="mt-1 text-xs text-rose-600">
              {categoriasError}
            </p>
          )}
        </div>

        {/* ================================================== */}
        {/* TAG */}
        {/* ================================================== */}

        <div>
          <label
            htmlFor="post-filter-tag"
            className="block text-xs font-medium text-slate-600"
          >
            Tag
          </label>

          <input
            id="post-filter-tag"
            type="text"
            value={tag}
            onChange={(event) =>
              setTag(event.target.value)
            }
            placeholder="Ex: detran"
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-[#0A2230]"
          />
        </div>

        {/* ================================================== */}
        {/* DESTAQUE */}
        {/* ================================================== */}

        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) =>
                setFeatured(event.target.checked)
              }
              className="h-4 w-4 rounded border-slate-300"
            />

            <span>Em destaque</span>
          </label>
        </div>

        {/* ================================================== */}
        {/* AÇÕES */}
        {/* ================================================== */}

        <div className="flex items-end gap-2">
          <button
            type="button"
            onClick={apply}
            className="w-full rounded-lg bg-[#0A2230] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#133a4f]"
          >
            Aplicar
          </button>

          <button
            type="button"
            onClick={clear}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-600 transition hover:bg-slate-50"
            title="Limpar filtros"
            aria-label="Limpar filtros"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}