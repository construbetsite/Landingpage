import { useEffect, useState } from "react";
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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });
  }, []);

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
              href="tel:3135322800"
              className="flex items-center gap-2 hover:text-red-300 transition"
            >
              <Phone size={15} />

              (31) 3532-2800

            </a>

            <a
              href="https://wa.me/5531984630800"
              target="_blank"
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

            <a
              href="/"
              className="flex items-center shrink-0"
            >

              <img
                src="/assets/logo.webp"
                alt="Construbet"
                className="h-16 lg:h-20 w-auto object-contain"
              />

            </a>

            {/* Desktop */}

            <div className="hidden lg:flex items-center gap-10">

              <a
              href="#empresa"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              A Construbet
            </a>

            <a
              href="#produtos"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              Produtos
            </a>

            <a
              href="#ofertas"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              Ofertas
            </a>

            <a
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              Blog
            </a>
            </div>

            {/* CTA */}

            <div className="hidden lg:flex">

              <a
                href="#contato"
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

              </a>

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

            <a
              href="#empresa"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              A Construbet
            </a>

            <a
              href="#produtos"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              Produtos
            </a>

            <a
              href="#ofertas"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              Ofertas
            </a>

            <a
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 border-b hover:bg-gray-50"
            >
              Blog
            </a>

   

            <div className="p-6">

              <a
                href="#contato"
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

              </a>

            </div>

          </div>

        </div>

      </nav>

    </header>
  );
}