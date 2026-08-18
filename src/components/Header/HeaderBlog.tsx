import type { MouseEvent } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  BookOpen,
  FileText,
  HelpCircle,
  Lightbulb,
  ArrowUpRight,
  Tag,
} from "lucide-react";
import { useBlogCategories } from "../../hooks/useBlogCategories";

// Mapeamento de ícones para categorias conhecidas
const categoryIcons: Record<string, any> = {
  artigos: FileText,
  dicas: Lightbulb,
  perguntas: HelpCircle,
};

export default function HeaderBlog() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { categories } = useBlogCategories(); // 🔄 Dados dinâmicos da API

  const currentCategory = searchParams.get("categoria");

  const isBlogHome =
    location.pathname === "/blog" && !currentCategory;

  const isActive = (key: string) => {
    if (key === "inicio-blog") {
      return isBlogHome;
    }

    if (key === "site") {
      return false;
    }

    return currentCategory === key;
  };

  const handleInicioClick = (event: MouseEvent) => {
    if (location.pathname === "/blog") {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Função para obter ícone adequado para cada categoria
  const getCategoryIcon = (nome: string) => {
    const key = nome.toLowerCase();
    return categoryIcons[key] || Tag; // ícone padrão para categorias desconhecidas
  };

  return (
    <header className="w-full bg-white">

      {/* =====================================================
          FAIXA SUPERIOR — IDENTIDADE DO BLOG
          ===================================================== */}

      <div className="bg-[#072B63] text-white">
        <div className="mx-auto flex min-h-[64px] max-w-7xl items-center px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            {/* Ícone */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
              <BookOpen
                size={21}
                strokeWidth={2}
              />
            </div>

            {/* Texto */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">
                Conteúdo Construbet
              </p>

              <h1 className="text-base font-bold leading-tight sm:text-lg">
                Blog Construbet
              </h1>
            </div>

          </div>

        </div>
      </div>

      {/* =====================================================
          SUB-HEADER — NAVEGAÇÃO DO BLOG
          ===================================================== */}

      <div className="border-b border-slate-200 bg-white shadow-sm">

        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">

          <nav
            aria-label="Navegação do Blog"
            className="w-full overflow-x-auto scrollbar-hide"
          >
            <ul className="flex min-w-max items-center justify-center gap-1 py-2 sm:gap-2">

              {/* Item fixo: Início Blog */}
              <li>
                <Link
                  to="/blog"
                  onClick={handleInicioClick}
                  aria-current={isActive("inicio-blog") ? "page" : undefined}
                  className={`group inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-all duration-200 sm:px-4 ${
                    isActive("inicio-blog")
                      ? "bg-[#072B63] text-white shadow-sm"
                      : "text-[#072B63] hover:bg-slate-100 hover:text-red-600"
                  }`}
                >
                  <BookOpen
                    size={16}
                    strokeWidth={2}
                    className={
                      isActive("inicio-blog")
                        ? "text-white"
                        : "transition-colors group-hover:text-red-600"
                    }
                  />
                  <span>Início Blog</span>
                </Link>
              </li>

              {/* Item fixo: Site */}
              <li>
                <Link
                  to="/"
                  aria-current={isActive("site") ? "page" : undefined}
                  className="group inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#072B63] transition-all duration-200 hover:bg-slate-100 hover:text-red-600 sm:px-4"
                >
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-colors group-hover:text-red-600"
                  />
                  <span>Site</span>
                </Link>
              </li>

              {/* Categorias dinâmicas vindas do backend */}
              {categories.map((cat) => {
                const active = isActive(cat.nome);
                const Icon = getCategoryIcon(cat.nome);
                return (
                  <li key={cat.id}>
                    <Link
                      to={`/blog?categoria=${encodeURIComponent(cat.nome)}`}
                      aria-current={active ? "page" : undefined}
                      className={`group inline-flex min-h-[40px] items-center gap-2 rounded-lg px-3 text-sm font-semibold transition-all duration-200 sm:px-4 ${
                        active
                          ? "bg-[#072B63] text-white shadow-sm"
                          : "text-[#072B63] hover:bg-slate-100 hover:text-red-600"
                      }`}
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        className={
                          active
                            ? "text-white"
                            : "transition-colors group-hover:text-red-600"
                        }
                      />
                      <span>{cat.nome}</span>
                    </Link>
                  </li>
                );
              })}

            </ul>
          </nav>

        </div>
      </div>

    </header>
  );
}