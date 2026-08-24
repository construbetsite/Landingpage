// src/components/SocialMediaSection/SocialMediaSection.tsx
"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/construbet",
    color: "hover:bg-[#1877F2]",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/construbet",
    color: "hover:bg-[#E4405F]",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@construbet",
    color: "hover:bg-[#FF0000]",
  },
];

export default function SocialMediaSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 rounded-[32px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(7,27,70,0.06)] sm:px-8 lg:px-10">
          {/* Cabeçalho */}
          <div className="max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
              Redes sociais
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Acompanhe a Construbet
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Fique por dentro de lançamentos, promoções, dicas de construção e
              conteúdos exclusivos preparados para você.
            </p>
          </div>

          {/* Ícones das redes sociais */}
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    group relative flex items-center justify-center
                    w-16 h-16 sm:w-20 sm:h-20
                    rounded-full bg-white
                    shadow-md hover:shadow-xl
                    transition-all duration-300
                    border border-gray-200
                    ${social.color}
                  `}
                  aria-label={`Siga-nos no ${social.name}`}
                >
                  <Icon
                    size={32}
                    className="text-gray-700 group-hover:text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                  {/* Tooltip sutil */}
                  <span className="absolute -bottom-8 text-xs font-medium text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                  </span>
                </motion.a>
              );
            })}
          </div>

          {/* Botão CTA */}
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm leading-7 text-slate-600">
              Mais de 45 anos construindo confiança, agora também nas redes sociais.
            </p>
            <motion.a
              href="https://www.instagram.com/construbet"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#071B46] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b2e73]"
            >
              Siga a Construbet
              <ArrowRight size={16} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}