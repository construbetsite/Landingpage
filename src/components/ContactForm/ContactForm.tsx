"use client";

import { useState } from "react";
import { 
  Send, 
  Phone, 
  Mail, 
  User, 
  List, 
  Building2, 
  Handshake,
  Store,
  Truck
} from "lucide-react";

// Serviços e produtos da Construbet
const services = [
  {
    title: "Materiais para Construção",
    desc: "Tudo o que sua obra precisa: cimento, areia, brita, tijolos, telhas e muito mais.",
    category: "Materiais Básicos"
  },
  {
    title: "Acabamentos e Revestimentos",
    desc: "Pisos, porcelanatos, azulejos, tintas, texturas e produtos para acabamento de alto padrão.",
    category: "Acabamentos"
  },
  {
    title: "Elétrica e Hidráulica",
    desc: "Fios, cabos, disjuntores, tubos, conexões, registros, metais e acessórios completos.",
    category: "Instalações"
  },
  {
    title: "Ferramentas e Equipamentos",
    desc: "Furadeiras, parafusadeiras, serras, esmerilhadeiras, andaimes e equipamentos de segurança.",
    category: "Ferramentas"
  },
  {
    title: "Madeiras e Estruturas",
    desc: "Caibros, ripas, vigas, compensados, formas para concreto e estruturas de madeira.",
    category: "Estruturas"
  },
  {
    title: "Tintas e Pintura",
    desc: "Tintas látex, esmaltes, vernizes, seladores, massas corretivas e acessórios para pintura.",
    category: "Acabamentos"
  }
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    parceria: false
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const whatsappMessage = `
Olá, vim pelo site e gostaria de mais informações sobre os produtos e serviços da Construbet.

*Nome:* ${form.name}
*Telefone:* ${form.phone}
*E-mail:* ${form.email || "Não informado"}
*Produto/Serviço:* ${form.service || "Não selecionado"}
*Interesse em parceria:* ${form.parceria ? "Sim" : "Não"}
*Mensagem:* ${form.message || "Não informada"}
    `;

    const encoded = encodeURIComponent(whatsappMessage.trim());
    window.open(`https://wa.me/553135314706?text=${encoded}`, "_blank");
  }

  return (
    <section
      id="contato"
      className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50 to-white"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Cabeçalho */}
        <div className="text-center mb-10 md:mb-14">
   
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#072B63] leading-tight">
            Fale com a{' '}
            <span className="text-red-600 relative">
              Construbet
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-red-600 rounded-full"></span>
            </span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Preencha o formulário e nossa equipe especializada entrará em contato 
            para atender sua obra ou projeto com agilidade e qualidade.
          </p>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl sm:rounded-3xl
            shadow-2xl
            border border-blue-100
            p-6 sm:p-8 md:p-10 lg:p-12
            grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6
          "
        >
          {/* Nome */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
            <input
              type="text"
              name="name"
              required
              placeholder="Seu nome completo"
              value={form.name}
              onChange={handleChange}
              className="
                w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                transition-all duration-200
                text-sm md:text-base
              "
            />
          </div>

          {/* Telefone */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
            <input
              type="tel"
              name="phone"
              required
              placeholder="Seu WhatsApp (com DDD)"
              value={form.phone}
              onChange={handleChange}
              className="
                w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                transition-all duration-200
                text-sm md:text-base
              "
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Seu e-mail (opcional)"
              value={form.email}
              onChange={handleChange}
              className="
                w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                transition-all duration-200
                text-sm md:text-base
              "
            />
          </div>

          {/* Produto/Serviço */}
          <div className="relative">
            <List className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
            <select
              name="service"
              required
              value={form.service}
              onChange={handleChange}
              className="
                w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl
                border border-gray-300 bg-white
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                transition-all duration-200
                appearance-none
                text-sm md:text-base
              "
            >
              <option value="">Selecione o produto/serviço</option>
              {services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title} - {s.category}
                </option>
              ))}
            </select>
          </div>

          {/* Observação para parcerias */}
          <div className="md:col-span-2 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-4 md:p-5 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Handshake className="text-red-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#072B63] text-sm md:text-base">
                  Interessado em parcerias ou compras em grande quantidade?
                </h3>
                <p className="text-gray-600 text-xs md:text-sm mt-1">
                  A Construbet atende construtoras, engenheiros, arquitetos e empresas 
                  com condições especiais para compras corporativas. Marcamos, atendemos e 
                  entregamos onde você precisar.
                </p>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="parceria"
                    checked={form.parceria}
                    onChange={handleChange}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="text-sm text-[#072B63] font-medium">
                    Tenho interesse em parcerias comerciais
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Mensagem */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              rows={4}
              placeholder="Descreva seu projeto, obra ou necessidade: quantidade de materiais, prazos, local de entrega, etc."
              value={form.message}
              onChange={handleChange}
              className="
                w-full p-4 rounded-xl
                border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent
                transition-all duration-200
                text-sm md:text-base
                resize-y
              "
            />
          </div>

          {/* Badges de atendimento */}
          <div className="md:col-span-2 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Store size={14} className="text-red-600" />
              Loja física em Betim
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <Truck size={14} className="text-red-600" />
              Entrega na região
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <Building2 size={14} className="text-red-600" />
              45 anos de história
            </span>
          </div>

          {/* Botão */}
          <div className="md:col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="
                flex items-center gap-3
                px-8 md:px-10 py-3.5 md:py-4 rounded-xl
                bg-red-600 hover:bg-red-700
                text-white font-semibold text-sm md:text-base
                shadow-lg hover:shadow-xl
                hover:scale-[1.03]
                transition-all duration-300
                w-full sm:w-auto
                justify-center
              "
            >
              <Send size={18} />
              Enviar pelo WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}