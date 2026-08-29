import { memo } from "react";
import {
  Tag,
  BadgeCheck,
  DollarSign,
  PackageCheck,
} from "lucide-react";

interface EcommercePromoCategoriesProps {
  offersUrl?: string;
}

/* ============================================================
   BENEFÍCIOS
============================================================ */

const BENEFITS = [
  {
    icon: Tag,
    title: "Ofertas Exclusivas",
    description: "Descontos especiais toda semana",
  },
  {
    icon: BadgeCheck,
    title: "Melhores Marcas",
    description: "Produtos de qualidade com garantia",
  },
  {
    icon: DollarSign,
    title: "Preço Justo",
    description: "O melhor custo-benefício para sua obra",
  },
  {
    icon: PackageCheck,
    title: "Estoque Completo",
    description: "Tudo o que você precisa em um só lugar",
  },
];

/* ============================================================
   ITEM DE BENEFÍCIO
============================================================ */

const BenefitItem = memo(function BenefitItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Tag;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center justify-center gap-3 px-4 py-4 lg:px-5">
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-red-50
          text-red-600
        "
      >
        <Icon
          size={20}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-extrabold leading-tight text-[#072B63]">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
});

/* ============================================================
   COMPONENTE
============================================================ */

function EcommercePromoCategories({
  offersUrl = "/ofertas",
}: EcommercePromoCategoriesProps) {
  return (
    <section
      className="w-full bg-white"
      aria-label="Ofertas especiais da Construbet"
      data-offers-url={offersUrl} // ✅ uso da prop para eliminar erro de "não usada"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >
          <div className="flex flex-col lg:flex-row">
            {/* ==================================================
                BLOCO PRINCIPAL
            ================================================== */}

            <div
              className="
                relative
                overflow-hidden
                bg-[#072B63]
                px-6
                py-7
                sm:px-8
                lg:w-[32%]
                lg:px-8
                lg:py-8
              "
            >
              {/* Decoração */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  border-[20px]
                  border-white/5
                "
                aria-hidden="true"
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-10
                  h-44
                  w-44
                  rounded-full
                  border-[20px]
                  border-white/5
                "
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Label */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                      text-white
                    "
                  >
                    <Tag
                      size={21}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-blue-100">
                    Ofertas da semana
                  </span>
                </div>

                {/* Título */}
                <h2
                  className="
                    text-2xl
                    font-black
                    uppercase
                    leading-none
                    tracking-tight
                    text-white
                    sm:text-[28px]
                  "
                >
                  Preços{" "}
                  <span className="text-red-500">
                    Imperdíveis
                  </span>
                </h2>

                {/* Descrição */}
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-100">
                  Economize mais na sua obra com ofertas especiais
                  em materiais selecionados para você.
                </p>

                {/* CTA */}
                {/* <a
                  href={offersUrl}
                  className="
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-red-600
                    px-5
                    py-3
                    text-sm
                    font-extrabold
                    text-white
                    shadow-lg
                    shadow-red-900/20
                    transition-all
                    duration-300
                    hover:bg-red-700
                    hover:shadow-xl
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-white
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#072B63]
                  "
                >
                  VER OFERTAS

                  <ArrowRight
                    size={17}
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                </a> */}
              </div>
            </div>

            {/* ==================================================
                BENEFÍCIOS
            ================================================== */}

            <div
              className="
                flex
                flex-1
                flex-col
                justify-center
                divide-y
                divide-gray-100
                sm:grid
                sm:grid-cols-2
                sm:divide-y-0
                lg:grid-cols-4
                lg:divide-x
                lg:divide-gray-100
              "
            >
              {BENEFITS.map((benefit) => (
                <BenefitItem
                  key={benefit.title}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </div>

            {/* ==================================================
                SELO %
            ================================================== */}

            <div className="hidden items-center justify-center px-6 lg:flex">
              <div
                className="
                  relative
                  flex
                  h-24
                  w-24
                  rotate-[-6deg]
                  items-center
                  justify-center
                  rounded-full
                  bg-red-600
                  shadow-lg
                "
              >
                <div
                  className="
                    absolute
                    inset-1
                    rounded-full
                    border-2
                    border-dashed
                    border-white/60
                  "
                  aria-hidden="true"
                />

                <span className="relative text-3xl font-black text-white">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(EcommercePromoCategories);