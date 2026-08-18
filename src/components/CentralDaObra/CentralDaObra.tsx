// CentralDaObra.tsx - Com cores institucionais da Construbet
import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { 
  ArrowRight, 
  ClipboardList, 
  LayoutGrid, 
  MessageSquareMore, 
  PaintBucket, 

  Blocks, 
  Grid2x2 
} from "lucide-react";
import { Link } from "react-router-dom";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: typeof LayoutGrid;
  ctaLabel: string;
  href: string;
}

const toolCards: ToolCard[] = [
  {
    id: "piso",
    title: "Calculadora de Piso",
    description: "Planeje a quantidade ideal de piso para o seu ambiente de forma rápida.",
    icon: LayoutGrid,
    ctaLabel: "Acessar",
    href: "/calculadora/piso",
  },
  {
    id: "tinta",
    title: "Calculadora de Tinta",
    description: "Descubra qual volume de tinta é necessário para cada parede.",
    icon: PaintBucket,
    ctaLabel: "Acessar",
    href: "/calculadora/tinta",
  },
  {
    id: "argamassa",
    title: "Calculadora de Argamassa",
    description: "Estime a quantidade certa de argamassa para o projeto.",
    icon: Blocks,
    ctaLabel: "Acessar",
    href: "/calculadora/argamassa",
  },
  {
    id: "rejunte",
    title: "Calculadora de Rejunte",
    description: "Faça a estimativa de rejunte com precisão para cada aplicação.",
    icon: Grid2x2,
    ctaLabel: "Acessar",
    href: "/calculadora/rejunte",
  },
  {
    id: "orcamento",
    title: "Solicitar Orçamento",
    description: "Receba um atendimento personalizado para o seu projeto.",
    icon: ClipboardList,
    ctaLabel: "Acessar",
    href: "/orcamento",
  },
  {
    id: "especialista",
    title: "Falar com Especialista",
    description: "Converse com a equipe técnica da Construbet.",
    icon: MessageSquareMore,
    ctaLabel: "Acessar",
    href: "/especialista",
  },
];

// Componente Card Individual
const ToolCardItem = memo(({ card, index }: { card: ToolCard; index: number }) => {
  const Icon = card.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.15 }
      }}
      whileTap={{ scale: 0.98 }}
      className="
        group
        relative
        flex-shrink-0
        w-[280px]
        md:w-auto
        rounded-2xl
        bg-white/5
        backdrop-blur-sm
        border
        border-white/10
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-200
        cursor-pointer
      "
    >
      {/* Gradiente de fundo no hover */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-[#072B63]/10
        via-transparent
        to-red-500/5
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-300
      " />

      {/* Conteúdo */}
      <div className="relative z-10 p-5 md:p-6 h-full flex flex-col">
        {/* Header com Ícone */}
        <div className="flex items-center justify-between">
          <div className="
            flex
            h-11
            w-11
            md:h-12
            md:w-12
            items-center
            justify-center
            rounded-xl
            bg-[#072B63]/20
            text-red-500
            group-hover:bg-[#072B63]/30
            group-hover:scale-105
            group-hover:text-red-400
            transition-all
            duration-200
          ">
            <Icon size={20} className="md:h-[21px] md:w-[21px]" />
          </div>
          
          {/* Indicador de status - Vermelho Construbet */}
          <div className="
            h-2
            w-2
            rounded-full
            bg-red-500/60
            group-hover:bg-red-400
            shadow-[0_0_12px_rgba(220,38,38,0.3)]
            transition-all
            duration-200
          " />
        </div>

        {/* Título */}
        <h3 className="
          mt-4
          md:mt-5
          text-lg
          md:text-xl
          font-semibold
          text-white
          group-hover:text-red-400
          transition-colors
          duration-200
        ">
          {card.title}
        </h3>

        {/* Descrição */}
        <p className="
          mt-2
          text-sm
          leading-relaxed
          text-blue-100/80
          flex-1
        ">
          {card.description}
        </p>

        {/* Botão CTA - Estilo Construbet */}
        <Link
          to={card.href}
          className="
            mt-5
            md:mt-6
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-xl
            bg-red-600
            hover:bg-red-700
            px-5
            py-2.5
            text-sm
            font-bold
            text-white
            transition-all
            duration-200
            group-hover:gap-3
            shadow-lg
            hover:shadow-red-500/20
          "
        >
          {card.ctaLabel}
          <ArrowRight 
            size={15} 
            className="
              transition-transform
              duration-200
              group-hover:translate-x-1
            " 
          />
        </Link>
      </div>
    </motion.article>
  );
});

ToolCardItem.displayName = 'ToolCardItem';

// Componente Principal
function CentralDaObra() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // GSAP apenas para entrada
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.7
        }
      });

      tl.from(badgeRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5
      })
      .from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, "-=0.2")
      .from(subtitleRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5
      }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        px-4
        py-16
        md:py-24
        lg:py-28
        bg-gradient-to-b
        from-[#072B63]
        via-[#0A3A7A]
        to-[#041B3E]
      "
      aria-labelledby="central-da-obra-title"
    >
      {/* Background com blur - Cores institucionais */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="
          absolute
          left-[-10%]
          top-[-5%]
          h-64
          w-64
          rounded-full
          bg-red-500/5
          blur-[100px]
        " />
        <div className="
          absolute
          right-[-5%]
          top-[15%]
          h-72
          w-72
          rounded-full
          bg-[#072B63]/30
          blur-[120px]
        " />
        <div className="
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.3))]
        " />
      </div>

      <div className="
        mx-auto
        flex
        max-w-7xl
        flex-col
        items-center
      ">
       

        {/* Títulos */}
        <div className="mt-5 text-center md:mt-6 lg:mt-8">
          <h2
            ref={titleRef}
            id="central-da-obra-title"
            className="
              text-3xl
              md:text-4xl
              lg:text-5xl
              xl:text-6xl
              font-black
              tracking-tight
              text-white
              leading-tight
            "
          >
            CENTRAL DA OBRA
          </h2>
          <p
            ref={subtitleRef}
            className="
              central-subtitle
              mx-auto
              mt-3
              max-w-2xl
              text-base
              md:text-lg
              leading-relaxed
              text-blue-100/80
            "
          >
            Tudo o que você precisa para planejar sua obra em um único lugar.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="
          mt-8
          md:mt-10
          lg:mt-12
          w-full
          flex
          md:grid
          gap-4
          md:gap-5
          lg:gap-6
          overflow-x-auto
          pb-6
          md:pb-0
          snap-x
          snap-mandatory
          scroll-smooth
          hide-scrollbar
          md:grid-cols-2
          xl:grid-cols-3
        ">
          {toolCards.map((card, index) => (
            <div
              key={card.id}
              className="
                snap-start
                md:snap-none
                first:ml-0
                last:mr-0
              "
            >
              <ToolCardItem card={card} index={index} />
            </div>
          ))}
        </div>

        {/* Indicadores mobile */}
        <div className="
          mt-4
          flex
          items-center
          justify-center
          gap-1.5
          md:hidden
        ">
          {toolCards.map((_, index) => (
            <span
              key={index}
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-400/20
                transition-all
                duration-200
                hover:bg-red-400/40
              "
            />
          ))}
        </div>
      </div>

      {/* Estilos para esconder scrollbar */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default memo(CentralDaObra);