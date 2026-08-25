import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { COMPANY_INFO, generateWhatsAppLink } from "../../config/constants";
import { scrollToElement } from "../../hooks/useScrollToAnchor";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    setMenuOpen(false);
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
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

      {/* Top Bar */}

      <div className="hidden md:block bg-[#072B63] text-white">

        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-10 flex items-center justify-between text-sm">

          <div className="flex items-center gap-2">

            <MapPin size={15} />

            <span>
              Atendemos Betim e Região Metropolitana
            </span>

          </div>

          <div className="flex items-center gap-6">

            <a
              href={COMPANY_INFO.phoneTel}
              className="flex items-center gap-2 hover:text-red-300 transition"
            >
              <Phone size={15} />

              {COMPANY_INFO.phoneFormatted}

            </a>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-300 transition"
            >
              <MessageCircle size={15} />

              WhatsApp

            </a>

          </div>

        </div>

      </div>

      {/* Navbar */}

      <nav className="bg-white">

        <div className="max-w-7xl mx-auto px-4 lg:px-6">

          <div className="h-20 flex items-center justify-between">

            {/* Logo */}

            <Link
              to="/"
              className="flex items-center shrink-0"
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >

              <img
                src="/assets/logo.webp"
                alt="Construbet"
                className="h-16 lg:h-20 w-auto object-contain"
              />

            </Link>

            {/* Desktop */}

            <div className="hidden lg:flex items-center gap-10">

              <Link
                to="/#empresa"
                onClick={(e) => handleNavClick(e, '#empresa')}
                className="text-slate-700 hover:text-red-600 font-semibold transition-colors"
              >
                A Construbet
              </Link>

              <Link
                to="/#produtos"
                onClick={(e) => handleNavClick(e, '#produtos')}
                className="text-slate-700 hover:text-red-600 font-semibold transition-colors"
              >
                Produtos
              </Link>

              <Link
                to="/#ofertas"
                onClick={(e) => handleNavClick(e, '#ofertas')}
                className="text-slate-700 hover:text-red-600 font-semibold transition-colors"
              >
                Ofertas
              </Link>

              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 hover:text-red-600 font-semibold transition-colors"
              >
                Blog
              </Link>
            </div>

            {/* CTA */}

            <div className="hidden lg:flex">

              <Link
                to="/#contato"
                onClick={(e) => handleNavClick(e, '#contato')}
                className="
                flex
                items-center
                gap-2
                bg-red-600
                hover:bg-red-700
                text-white
                px-6
                py-3
                rounded-lg
                font-semibold
                transition-all
                duration-300"
              >

                Solicitar Orçamento

                <ArrowRight size={18} />

              </Link>

            </div>

            {/* Mobile */}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#072B63]"
            >

              {menuOpen ? <X size={30} /> : <Menu size={30} />}

            </button>

          </div>

        </div>

        {/* Mobile Menu */}

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-96 border-t"
              : "max-h-0"
          }`}
        >

          <div className="bg-white">

            <Link
              to="/#empresa"
              onClick={(e) => handleNavClick(e, '#empresa')}
              className="block px-6 py-4 border-b hover:bg-gray-50 font-medium text-slate-800"
            >
              A Construbet
            </Link>

            <Link
              to="/#produtos"
              onClick={(e) => handleNavClick(e, '#produtos')}
              className="block px-6 py-4 border-b hover:bg-gray-50 font-medium text-slate-800"
            >
              Produtos
            </Link>

            <Link
              to="/#ofertas"
              onClick={(e) => handleNavClick(e, '#ofertas')}
              className="block px-6 py-4 border-b hover:bg-gray-50 font-medium text-slate-800"
            >
              Ofertas
            </Link>

            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50 font-medium text-slate-800"
            >
              Blog
            </Link>

            <div className="p-6">

              <Link
                to="/#contato"
                onClick={(e) => handleNavClick(e, '#contato')}
                className="
                flex
                justify-center
                items-center
                gap-2
                w-full
                bg-red-600
                hover:bg-red-700
                text-white
                py-3
                rounded-lg
                font-semibold"
              >

                Solicitar Orçamento

                <ArrowRight size={18} />

              </Link>

            </div>

          </div>

        </div>

      </nav>

    </header>
  );
}