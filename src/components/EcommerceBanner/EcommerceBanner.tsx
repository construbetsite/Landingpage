"use client";

import { ShoppingCart, User, Mail, Phone, Lock } from "lucide-react";
import { ECOMMERCE_URL } from "../../config/constants";

export default function EcommerceBanner() {
  return (
    <section className="w-full">
      {/* ===== BARRA SUPERIOR ===== */}
      <div className="bg-[#072B63] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-8">

            {/* Texto da esquerda */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <ShoppingCart size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg leading-tight">
                  FINALIZE SUAS COMPRAS<br className="hidden sm:block" />
                  NO NOSSO E-COMMERCE
                </h3>
              </div>
            </div>

            {/* Texto do meio */}
            <p className="text-sm text-blue-100 max-w-md text-center lg:text-left leading-relaxed">
              Ao clicar em “Ver no e-commerce”, você será direcionado para nossa loja online para finalizar sua compra com segurança.
            </p>

            {/* Botão */}
            <a
              href={ECOMMERCE_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-shrink-0
                inline-flex items-center gap-2
                border-2 border-white
                text-white font-bold
                px-6 py-3 rounded-full
                hover:bg-white hover:text-[#072B63]
                transition-all duration-300
                text-sm
              "
            >
              <ShoppingCart size={18} />
              IR PARA O E-COMMERCE
              <span className="text-lg leading-none">›</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== ÁREA DE CADASTRO ===== */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* Texto da esquerda */}
            <div className="lg:w-5/12">
              <h3 className="text-xl sm:text-2xl font-black text-[#072B63] leading-tight mb-3">
                RECEBA OFERTAS EXCLUSIVAS<br />
                E NOVIDADES DA{" "}
                <span className="text-red-600">CONSTRUBET</span>!
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Cadastre-se e fique por dentro das melhores promoções, dicas para sua obra e lançamentos.
              </p>
            </div>

            {/* Formulário */}
            <div className="w-full lg:w-7/12">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">

                {/* Nome */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    className="
                      w-full
                      border border-gray-200
                      rounded-xl
                      py-3.5 pl-4 pr-11
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#072B63]/20 focus:border-[#072B63]
                      transition
                    "
                  />
                  <User
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* E-mail */}
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="
                      w-full
                      border border-gray-200
                      rounded-xl
                      py-3.5 pl-4 pr-11
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#072B63]/20 focus:border-[#072B63]
                      transition
                    "
                  />
                  <Mail
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* WhatsApp */}
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Whatsapp (opcional)"
                    className="
                      w-full
                      border border-gray-200
                      rounded-xl
                      py-3.5 pl-4 pr-11
                      text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#072B63]/20 focus:border-[#072B63]
                      transition
                    "
                  />
                  <Phone
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* Botão */}
                <button
                  type="submit"
                  className="
                    w-full
                    bg-red-600 hover:bg-red-700
                    text-white font-bold
                    py-3.5 rounded-xl
                    transition-all duration-300
                    hover:-translate-y-0.5
                    shadow-lg shadow-red-600/20
                    text-sm
                  "
                >
                  QUERO RECEBER!
                </button>
              </form>

              {/* Aviso de privacidade */}
              <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                <Lock size={13} />
                <span>Seus dados estão seguros. Não enviamos spam.</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}