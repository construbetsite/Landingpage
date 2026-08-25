
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, ShieldCheck } from "lucide-react";
import { COMPANY_INFO, SOCIAL_LINKS, generateWhatsAppLink } from "../../config/constants";
import { scrollToElement } from "../../hooks/useScrollToAnchor";
import { openCookieSettings } from "../../lib/consent";

const Footer: React.FC = () => {
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (target.startsWith('#') || target.startsWith('/#')) {
      const hash = target.includes('#') ? `#${target.split('#')[1]}` : target;
      if (location.pathname === '/') {
        e.preventDefault();
        scrollToElement(hash);
        window.history.pushState(null, '', hash);
      }
    }
  };

  return (
    <footer className="bg-[#072B63] text-white pt-16 pb-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* SOBRE / MARCA */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="text-2xl font-black mb-4 tracking-tight">
            CONSTRU<span className="text-red-500">BET</span>
          </h3>

          <p className="text-sm text-blue-100 leading-relaxed max-w-xs">
            Há mais de 45 anos oferecendo materiais para construção,
            acabamento, pisos e ferramentas com qualidade e confiança
            em Betim e região.
          </p>

          {/* Redes Sociais */}
          <div className="flex items-center gap-3 mt-6">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
            >
              <Instagram size={18} />
            </a>

            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
            >
              <Facebook size={18} />
            </a>

            {/* TikTok (SVG custom pois o Lucide não tem) */}
            <a
              href="https://tiktok.com/@construbet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.11v-3.5a6.37 6.37 0 0 0-.81-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1.99-.1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* NAVEGAÇÃO RÁPIDA */}
        <div>
          <h4 className="text-lg font-bold mb-5 text-white">
            Navegação
          </h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li>
              <Link
                to="/"
                onClick={() => {
                  if (location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="hover:text-red-400 transition-colors"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                to="/#sobre"
                onClick={(e) => handleNavClick(e, '#sobre')}
                className="hover:text-red-400 transition-colors"
              >
                Sobre a Empresa
              </Link>
            </li>
            <li>
              <Link
                to="/#produtos"
                onClick={(e) => handleNavClick(e, '#produtos')}
                className="hover:text-red-400 transition-colors"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                to="/#ofertas"
                onClick={(e) => handleNavClick(e, '#ofertas')}
                className="hover:text-red-400 transition-colors"
              >
                Ofertas
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className="hover:text-red-400 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/#contato"
                onClick={(e) => handleNavClick(e, '#contato')}
                className="hover:text-red-400 transition-colors"
              >
                Contato
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTATO */}
        <div>

          <h4 className="text-lg font-bold mb-5 text-white">
            Contato
          </h4>

          <ul className="space-y-4 text-sm text-blue-100">
            <li className="flex items-start gap-3">
              <Phone className="text-red-500 mt-0.5 shrink-0" size={18} />
              <a href={COMPANY_INFO.phoneTel} className="hover:text-red-400 transition-colors">
                {COMPANY_INFO.phoneFormatted}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="text-red-500 mt-0.5 shrink-0" size={18} />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-red-400 transition-colors">
                {COMPANY_INFO.email}
              </a>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="text-red-500 mt-0.5 shrink-0" size={18} />
              <span>
                {COMPANY_INFO.address.city} – {COMPANY_INFO.address.state}<br />
                Região Metropolitana de Belo Horizonte
              </span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 className="text-lg font-bold mb-5 text-white">
            Fale Conosco
          </h4>

          <p className="text-sm text-blue-100 mb-5 leading-relaxed">
            Precisa de orçamento ou tem alguma dúvida? Estamos prontos para atender você.
          </p>

          <a
            href={generateWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              w-full
              bg-red-600 hover:bg-red-700
              text-white font-bold
              py-3.5 px-6 rounded-xl
              transition-all duration-300
              shadow-lg shadow-red-600/25
              hover:shadow-red-600/40
              hover:-translate-y-0.5
            "
          >
            WhatsApp

          </a>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="border-t border-white/10 mt-14">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-blue-200/70">
          <span>
            © {new Date().getFullYear()} Construbet — Todos os direitos reservados.
          </span>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              to="/politicas"
              className="hover:text-red-400 transition-colors"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/termos"
              className="hover:text-red-400 transition-colors"
            >
              Termos de Uso
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-blue-200/90"
            >
              <ShieldCheck size={15} className="text-emerald-400" />
              Gerenciar cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;