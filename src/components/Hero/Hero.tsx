"use client";

import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";

import {
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  BadgeCheck,
} from "lucide-react";

export default function Hero() {
  const hero = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".badgeHero", {
          opacity: 0,
          y: 20,
          duration: 0.5,
        })
        .from(".titleHero", {
          opacity: 0,
          y: 35,
          duration: 0.7,
        })
        .from(".subtitleHero", {
          opacity: 0,
          y: 25,
          duration: 0.6,
        })
        .from(".buttonsHero", {
          opacity: 0,
          y: 25,
          duration: 0.5,
        })
        .from(
          ".cardsHero",
          {
            opacity: 0,
            y: 20,
            stagger: 0.12,
            duration: 0.4,
          },
          "-=.2"
        )
        .from(
          ".seloHero",
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Materiais para Construção em Betim | Construbet</title>
        <meta
          name="description"
          content="Há mais de 45 anos oferecendo materiais para construção, acabamento, pisos, ferramentas e muito mais em Betim."
        />
      </Helmet>

      <section
        ref={hero}
        className="relative min-h-[85vh] lg:min-h-screen overflow-hidden"
      >
        {/* Background */}
        <img
          src="/assets/hero.webp"
          alt="Construbet - Materiais para Construção em Betim"
          className="absolute inset-0 w-full h-full object-cover object-[35%_center] select-none pointer-events-none"
          loading="lazy"
          decoding="async"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#072B63]/90 via-[#072B63]/70 to-black/30" />

        {/* ========== SELO 45 ANOS ========== */}
        {/* 
          Ajuste fino de posição vertical:
          top-[xx%]  → altere o valor para subir/descer
        */}
<img
  src="/assets/selo.webp"
  alt="Construbet 45 Anos - Betim MG"
  className="
    seloHero
    float
    absolute z-20
    right-4 sm:right-6 md:right-10 lg:right-18 xl:right-24 2xl:right-28
    top-[8%] sm:top-[11%] md:top-[13%] lg:top-[15%] xl:top-[16%]
    w-[100px] sm:w-[125px] md:w-[155px] lg:w-[200px] xl:w-[235px] 2xl:w-[265px]
    drop-shadow-2xl
    pointer-events-none select-none
  "
/>
        {/* ================================== */}

        {/* Conteúdo */}
        <div className="relative z-10 flex items-center min-h-[85vh] lg:min-h-screen">
          <div className="container mx-auto px-5 sm:px-6 lg:px-12">
            {/* Badge */}
      

            {/* Título */}
            <h1 className="titleHero mt-10 sm:mt-24 lg:mt-24 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black leading-[1.05] text-white max-w-[18ch] sm:max-w-2xl lg:max-w-3xl">
              HÁ MAIS DE
              <br />
              <span className="text-red-500">45 ANOS</span>
              <br />
              CONSTRUINDO
              <br />
              CONFIANÇA
            </h1>

            {/* Subtítulo */}
            <p className="subtitleHero mt-3 sm:mt-4 lg:mt-5 text-sm sm:text-base md:text-lg text-blue-100 max-w-md sm:max-w-lg lg:max-w-xl leading-relaxed">
              Tradição, qualidade e atendimento especializado para sua obra.
              Trabalhamos com as melhores marcas do mercado, oferecendo
              materiais para construção, acabamento e entrega rápida em
              Betim e toda a região.
            </p>

            {/* Botões */}
            <div className="buttonsHero flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a
                href="https://www.construbet.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 sm:px-8 py-3 sm:py-4 font-bold text-white hover:bg-red-700 transition-all duration-300 text-sm sm:text-base"
              >
                <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                VER LOJA VIRTUAL
              </a>

              <a
                href="#sobre"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-5 sm:px-8 py-3 sm:py-4 font-bold text-white hover:bg-white hover:text-[#072B63] transition-all duration-300 text-sm sm:text-base"
              >
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                CONHECER A EMPRESA
              </a>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-8 sm:mt-10 lg:mt-12 max-w-md sm:max-w-xl lg:max-w-2xl">
              <div className="cardsHero">
                <BadgeCheck className="text-red-500 mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <h3 className="font-bold text-white text-xs sm:text-sm lg:text-base">
                  Qualidade
                </h3>
                <p className="text-blue-100 text-[10px] sm:text-xs lg:text-sm">
                  Melhores marcas
                </p>
              </div>

              <div className="cardsHero">
                <Truck className="text-red-500 mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <h3 className="font-bold text-white text-xs sm:text-sm lg:text-base">
                  Entrega
                </h3>
                <p className="text-blue-100 text-[10px] sm:text-xs lg:text-sm">
                  Betim e Região
                </p>
              </div>

              <div className="cardsHero">
                <ShieldCheck className="text-red-500 mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                <h3 className="font-bold text-white text-xs sm:text-sm lg:text-base">
                  Confiança
                </h3>
                <p className="text-blue-100 text-[10px] sm:text-xs lg:text-sm">
                  Mais de 45 anos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}