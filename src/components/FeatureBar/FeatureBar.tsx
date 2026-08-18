"use client";

import { Award, Truck, ShieldCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "QUALIDADE GARANTIDA",
    description: "Trabalhamos com as melhores marcas",
  },
  {
    icon: Truck,
    title: "ENTREGA RÁPIDA",
    description: "Para Betim e região",
  },
  {
    icon: ShieldCheck,
    title: "COMPRA SEGURA",
    description: "Seus dados protegidos 100%",
  },
  {
    icon: Headphones,
    title: "ATENDIMENTO ESPECIALIZADO",
    description: "Equipe pronta para te ajudar",
  },
];

export default function FeaturesBar() {
  return (
    <section className="w-full bg-white py-5 sm:py-6 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="
          flex flex-col sm:flex-row
          items-center justify-between
          gap-6 sm:gap-4
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-sm
          px-5 sm:px-8 py-5
        ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                flex items-center gap-3
                w-full sm:w-auto
                justify-start sm:justify-center
              "
            >
              {/* Ícone */}
              <div className="
                flex-shrink-0
                w-10 h-10
                rounded-full
                bg-[#072B63]/5
                flex items-center justify-center
              ">
                <feature.icon
                  className="text-[#072B63]"
                  size={20}
                  strokeWidth={1.8}
                />
              </div>

              {/* Texto */}
              <div className="flex flex-col">
                <span className="text-[#072B63] font-bold text-xs sm:text-[13px] tracking-wide uppercase">
                  {feature.title}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm leading-tight mt-0.5">
                  {feature.description}
                </span>
              </div>

              {/* Divisor (só no desktop) */}
              {index < features.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-gray-200 ml-4 lg:ml-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}