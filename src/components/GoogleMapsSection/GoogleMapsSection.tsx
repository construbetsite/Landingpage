"use client";

import { MapPin, Phone, Clock, Building } from "lucide-react";

export default function GoogleMapsSection() {
  return (
    <section
      id="localizacao"
      className="w-full bg-gradient-to-b from-white to-blue-50 py-16 md:py-20 lg:py-24"
      aria-labelledby="localizacao-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* LADO ESQUERDO - TEXTO */}
        <div className="order-2 lg:order-1">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <MapPin size={16} />
            Onde nos encontrar
          </span>

          <h2
            id="localizacao-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#072B63] leading-tight"
          >
            Nossa{' '}
            <span className="text-red-600 relative">
              Localização
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-red-600 rounded-full"></span>
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl leading-relaxed text-sm sm:text-base">
            Estamos em Betim há mais de 45 anos, com localização estratégica 
            para atender toda a região com qualidade e agilidade.
          </p>

          {/* Informações de contato */}
          <div className="mt-6 space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <MapPin className="text-red-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-semibold text-[#072B63]">Endereço:</span>
                <p className="leading-relaxed">
                  Rua: Inconfidência, 50 - Loja 3<br />
                  Bairro: Nossa Senhora de Fátima<br />
                  Betim - MG, 32600-310
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-red-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-semibold text-[#072B63]">Telefone:</span>
                <p className="leading-relaxed">
                  (31) 3531-4706
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="text-red-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <span className="font-semibold text-[#072B63]">Horário de Funcionamento:</span>
                <p className="leading-relaxed">
                  Segunda à Sexta: 07:30 - 18:00<br />
                  Sábado: 07:30 - 12:00
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-8">
            <a
              href="https://maps.app.goo.gl/9kBNbbtjCPF7aJbN6"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                px-6 sm:px-8 py-3 sm:py-3.5
                bg-red-600 text-white
                rounded-xl font-semibold text-sm sm:text-base
                hover:bg-red-700
                shadow-lg hover:shadow-xl
                transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              "
            >
              <MapPin size={18} />
              Abrir no Google Maps
            </a>

            <a
              href="#contato"
              className="
                inline-flex items-center justify-center gap-2
                px-6 sm:px-8 py-3 sm:py-3.5
                border-2 border-[#072B63] text-[#072B63]
                rounded-xl font-semibold text-sm sm:text-base
                hover:bg-[#072B63] hover:text-white
                transition-all duration-300
              "
            >
              <Phone size={18} />
              Entrar em Contato
            </a>
          </div>
        </div>

        {/* LADO DIREITO - MAPA */}
        <div className="order-1 lg:order-2">
          <div
            className="
              w-full h-[320px] sm:h-[380px] lg:h-[450px]
              rounded-2xl sm:rounded-3xl overflow-hidden
              shadow-2xl border-2 border-[#072B63]/10
              hover:shadow-3xl transition-shadow duration-300
            "
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.997585771122!2d-44.19487178921568!3d-19.96660378135255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6c3f2f79d03d9%3A0x91b4ee798276a375!2sConstrubet%20-%20Constru%C3%A7%C3%A3o%20e%20Acabamentos!5e0!3m2!1spt-BR!2sbr!4v1786045531227!5m2!1spt-BR!2sbr"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              title="Mapa - Construbet Betim"
            />
          </div>

          {/* Selo de confiança */}
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Building size={14} className="text-red-600" />
              Loja física
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-red-600" />
              Fácil acesso
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-red-600" />
              Estacionamento
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}