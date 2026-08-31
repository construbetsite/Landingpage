"use client";

import { useEffect, useRef } from "react";
import { Star, MessageCircle, ThumbsUp, Users } from "lucide-react";
import { useInView } from "../../hooks/useInView";

/** Injeta o script do Elfsight uma única vez (idempotente). */
function loadElfsightScript() {
  if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}

export default function GoogleReviewsWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionRef, inView] = useInView<HTMLElement>({
    // Só carrega o script externo quando a seção está prestes a aparecer.
    // Evita que o Elfsight (rede externa) dispute banda com produtos/posts.
    rootMargin: "400px",
  });

  useEffect(() => {
    if (!inView) return;

    // Carrega o script do Elfsight apenas uma vez, somente quando a seção
    // está (quase) visível E o navegador está ocioso — dando prioridade ao
    // conteúdo principal (produtos/posts) e sem impactar o LCP.
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let id: number | ReturnType<typeof setTimeout>;
    if (typeof w.requestIdleCallback === "function") {
      id = w.requestIdleCallback(() => loadElfsightScript(), { timeout: 3000 });
    } else {
      id = setTimeout(loadElfsightScript, 200);
    }

    return () => {
      if (typeof w.cancelIdleCallback === "function" && typeof id === "number") {
        w.cancelIdleCallback(id);
      } else {
        clearTimeout(id as ReturnType<typeof setTimeout>);
      }
    };
  }, [inView]);

  return (
    <section
      ref={sectionRef}
      id="avaliacoes"
      className="w-full bg-gradient-to-b from-white to-blue-50 py-16 md:py-20 lg:py-24"
      aria-labelledby="avaliacoes-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">


          <h2
            id="avaliacoes-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#072B63] leading-tight"
          >
            O que nossos{" "}
            <span className="text-red-600 relative">
              clientes dizem
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-red-600 rounded-full"></span>
            </span>
          </h2>

          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            A confiança de nossos clientes é a nossa maior conquista. Veja o que
            eles estão falando sobre a Construbet.
          </p>
        </div>

        {/* Grid de estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-blue-50 text-center">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="fill-red-600" />
              ))}
            </div>
            <span className="text-2xl md:text-3xl font-bold text-[#072B63]">
              4.6

            </span>
            <p className="text-xs md:text-sm text-gray-500">Avaliação média</p>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-blue-50 text-center">
            <MessageCircle className="text-red-600 mx-auto mb-2" size={24} />
            <span className="text-2xl md:text-3xl font-bold text-[#072B63]">
              250+
            </span>
            <p className="text-xs md:text-sm text-gray-500">Avaliações</p>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-blue-50 text-center">
            <ThumbsUp className="text-red-600 mx-auto mb-2" size={24} />
            <span className="text-2xl md:text-3xl font-bold text-[#072B63]">
              98%
            </span>
            <p className="text-xs md:text-sm text-gray-500">Recomendam</p>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-blue-50 text-center">
            <Users className="text-red-600 mx-auto mb-2" size={24} />
            <span className="text-2xl md:text-3xl font-bold text-[#072B63]">
              45+
            </span>
            <p className="text-xs md:text-sm text-gray-500">Anos de história</p>
          </div>
        </div>

        {/* Widget Elfsight - com ajustes de espaçamento e overflow */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-visible px-2 sm:px-4 lg:px-6">
          {/* Cabeçalho do widget */}
          <div className="p-4 bg-gradient-to-r from-[#072B63] to-[#0a3d7a] rounded-t-2xl -mx-2 sm:-mx-4 lg:-mx-6">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-red-600 rounded-full p-2">
                <Star size={18} className="fill-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  Avaliações no Google
                </h3>
                <p className="text-xs text-blue-200 opacity-80">
                  Últimas avaliações dos nossos clientes
                </p>
              </div>
            </div>
          </div>

          {/* Container do carrossel */}
          <div
            ref={containerRef}
            className="elfsight-app-29bb5274-8cf2-4797-8096-e1df2c834775 w-full min-h-[400px]"
            data-elfsight-app-lazy
          />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-10">
          <p className="text-gray-600 text-sm mb-4">
            Sua opinião é muito importante para nós!
          </p>
          <a
            href="https://g.page/r/CXWicj55JJsREAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              px-6 py-3
              bg-red-600 text-white
              rounded-xl font-semibold text-sm
              hover:bg-red-700
              shadow-lg hover:shadow-xl
              transition-all duration-300
            "
          >
            <Star size={18} />
            Avalie-nos no Google
          </a>
        </div>
      </div>
    </section>
  );
}