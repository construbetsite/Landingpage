"use client";

import { ExternalLink } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  url: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Kit Roca Gap Branco Bacia + Caixa acoplada completo.",
    image: "https://tb0426.vteximg.com.br/arquivos/ids/161003-1000-1000/1.png?v=639174939697030000",
    url: "https://www.construbet.com.br/kit-roca-gap-branco-bacia---caixa-acoplada---assento---anel-de-vedacao---kit-fixacao---ligacao---c323723000-22390/p",
  },
  {
    id: 2,
    name: "Kit incepa Boss de bacia com assento termofixo com queda amortecida completo.",
    image: "https://tb0426.vteximg.com.br/arquivos/ids/160902-1000-1000/1.png?v=639173216964070000",
    url: "https://www.construbet.com.br/kit-incepa-boss-de-bacia-convencional-com-assento-termofixo-com-queda-amortecida-e-itens-de-instalacao--1897270011100-23001/p",
  },
  {
    id: 3,
    name: "Janela de aluminio 1,00x1,50 Com Grade 2 folhas - Minas Portas",
    image: "https://tb0426.vteximg.com.br/arquivos/ids/160622-1000-1000/1.png?v=639168672645630000",
    url: "https://www.construbet.com.br/janela-de-aluminio-1-00x1-50-com-grade-2-folhas---minas-portas-21620/p",
  },
  {
    id: 4,
    name: "Cuba Apoio S/M 37X37 Ruy Ohtake Branca",
    image: "https://tb0426.vteximg.com.br/arquivos/ids/161072-1000-1000/1.png?v=639179917102700000",
    url: "https://www.construbet.com.br/cuba-apoio-s-m-37x37-ruy-ohtake-branca---roca-22367/p",
  },
  {
    id: 5,
    name: "Chuveiro Eletrônico Acqua Storm Ultra 127v 5500W Branco/Cromado Lorenzetti",
    image: "https://tb0426.vteximg.com.br/arquivos/ids/161215-190-190/1.png?v=639186863710600000",
    url: "https://www.construbet.com.br/chuveiro-eletronico-acqua-storm-ultra-127v-5500w-branco-cromado-lorenzetti-18036/p",
  },
  {
    id: 6,
    name: "Ducha Higiênica Com Derivação Basic Cromada Celite - B5007C7CRB",
    image: "https://tb0426.vteximg.com.br/arquivos/ids/161164-1000-1000/1.png?v=639184229339700000",
    url: "https://www.construbet.com.br/ducha-higienica-com-derivacao-basic-cromada-celite---b5007c7crb-22236/p",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="produtos" className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#072B63] tracking-tight">
            PRODUTOS EM{" "}
            <span className="text-red-600">DESTAQUE</span>
          </h2>

          <a
            href="/produtos"
            className="
              flex items-center gap-1.5
              text-sm font-semibold text-[#072B63]
              hover:text-red-600 transition-colors
            "
          >
            VER TODOS
            <span className="text-lg leading-none">›</span>
          </a>
        </div>

        {/* Grid de Produtos */}
        <div className="
          grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6
          gap-4 sm:gap-5
        ">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                group
                bg-white
                border border-gray-100
                rounded-2xl
                overflow-hidden
                shadow-sm
                hover:shadow-md
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Imagem */}
              <div className="
                relative
                aspect-square
                bg-gray-50
                flex items-center justify-center
                p-4
              ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    w-full h-full
                    object-contain
                    group-hover:scale-105
                    transition-transform duration-300
                  "
                  loading="lazy"
                />
              </div>

              {/* Conteúdo */}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="
                  text-[#072B63]
                  font-semibold
                  text-xs sm:text-sm
                  leading-snug
                  mb-3
                  line-clamp-2
                  min-h-[2.5rem]
                ">
                  {product.name}
                </h3>

                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-auto
                    inline-flex items-center justify-center gap-1.5
                    w-full
                    bg-red-600 hover:bg-red-700
                    text-white
                    text-[11px] sm:text-xs
                    font-bold
                    py-2.5 px-3
                    rounded-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                  "
                >
                  VER NO E-COMMERCE
                  <ExternalLink size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}