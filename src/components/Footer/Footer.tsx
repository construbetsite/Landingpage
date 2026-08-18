
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const Footer: React.FC = () => {
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
              href="https://instagram.com/construbet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition-all duration-300"
            >
              <Instagram size={18} />
            </a>

            <a
              href="https://facebook.com/construbet"
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
              <a href="/" className="hover:text-red-400 transition-colors">
                Início
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-red-400 transition-colors">
                Sobre a Empresa
              </a>
            </li>
            <li>
              <a href="#produtos" className="hover:text-red-400 transition-colors">
                Produtos
              </a>
            </li>
            <li>
              <a href="#ofertas" className="hover:text-red-400 transition-colors">
                Ofertas
              </a>
            </li>
            <li>
              <a href="#contato" className="hover:text-red-400 transition-colors">
                Contato
              </a>
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
              <span>(31) 93532-2800</span>
            </li>

            <li className="flex items-start gap-3">
              <Mail className="text-red-500 mt-0.5 shrink-0" size={18} />
              <span>contato@construbet.com.br</span>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="text-red-500 mt-0.5 shrink-0" size={18} />
              <span>
                Betim – MG<br />
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
            href="https://wa.me/5531984630800"
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

          <div className="flex items-center gap-6">
            <a
              href="/politica-de-privacidade"
              className="hover:text-red-400 transition-colors"
            >
              Política de Privacidade
            </a>
            <a
              href="/termos"
              className="hover:text-red-400 transition-colors"
            >
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;