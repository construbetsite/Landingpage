"use client";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function HeaderPolitica() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Início", href: "/" },
   
  ];

  return (
    <>
      {/* Overlay Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between relative">

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-[#1F2937] font-medium">
            {navLinks.slice(0, 4).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#FB923C] transition duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* LOGO CENTRAL */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <img
              src="/assets/logo.webp"
              alt="Clínicas Reunidas"
              className="w-28 object-contain hover:scale-105 transition duration-300"
            />
          </Link>

          {/* CTA DESKTOP */}
          <a
            href="#contato"
            className="hidden md:flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-6 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300 hover:scale-105"
          >
            <Phone size={16} />
            Entrar em contato
          </a>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Abrir menu"
            className="md:hidden text-[#1F2937] hover:text-[#FB923C] transition z-50"
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>

      {/* MENU MOBILE */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white border-l border-[#E5E7EB] shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-[#E5E7EB]">
          <span className="font-semibold text-[#1F2937]">
            Clínicas Reunidas
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-[#1F2937] hover:text-[#FB923C] transition"
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-8 py-8 text-[#1F2937] font-medium text-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="hover:text-[#FB923C] transition"
            >
              {link.name}
            </a>
          ))}

          {/* CTA MOBILE */}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-6 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-6 py-3 rounded-full text-center shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Phone size={18} />
            Entrar em contato
          </a>
        </nav>
      </aside>
    </>
  );
}
