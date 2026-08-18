// NossaHistoria.tsx - Versão Profissional Otimizada
import { memo, useEffect, useRef,  useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Building2, 
  Flag, 
  MonitorSmartphone, 
  TrendingUp, 
  Users,
  Award,
  Clock,
  MapPin,
  Star
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar plugin apenas no cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// TIPOS
// ============================================
interface TimelineItem {
  year: string;
  title: string;
  text: string;
  icon: typeof Flag;
  color?: string;
}

interface HistoryStat {
  value: string;
  label: string;
  icon?: typeof Award;
}

// ============================================
// DADOS CONSTANTES
// ============================================
const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "1981",
    title: "Fundação",
    text: "A Construbet iniciou sua história em Betim oferecendo materiais básicos para construção, sempre pautada pela ética, honestidade e compromisso com seus clientes.",
    icon: Flag,
    color: "from-blue-500/20 to-blue-400/10"
  },
  {
    year: "Crescimento",
    title: "Expansão",
    text: "Ao longo dos anos ampliamos nosso portfólio, nossa estrutura e conquistamos a confiança de milhares de clientes.",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-emerald-400/10"
  },
  {
    year: "2000+",
    title: "Nova Geração",
    text: "A gestão passou para Flávio e Fábio, mantendo os valores do fundador e impulsionando a inovação da empresa.",
    icon: Users,
    color: "from-purple-500/20 to-purple-400/10"
  },
  {
    year: "Digital",
    title: "Transformação Digital",
    text: "Investimos em tecnologia, comércio eletrônico, presença digital e novos canais de atendimento para oferecer uma experiência ainda melhor.",
    icon: MonitorSmartphone,
    color: "from-cyan-500/20 to-cyan-400/10"
  },
  {
    year: "Hoje",
    title: "Referência Local",
    text: "Hoje somos referência em materiais para construção e acabamento, oferecendo milhares de produtos, atendimento especializado e entrega rápida para Betim e região.",
    icon: Building2,
    color: "from-red-500/20 to-red-400/10"
  }
];

const STATS_DATA: HistoryStat[] = [
  { value: "45+", label: "Anos de História", icon: Clock },
  { value: "Milhares", label: "Clientes Atendidos", icon: Users },
  { value: "Centenas", label: "Marcas Parceiras", icon: Award },
  { value: "Milhares", label: "Produtos Disponíveis", icon: Star },
  { value: "Betim", label: "Nossa Casa", icon: MapPin }
];

// ============================================
// SUBCOMPONENTES MEMOIZADOS
// ============================================

// Timeline Card Component
const TimelineCard = memo(({ item, index }: { item: TimelineItem; index: number }) => {
  const Icon = item.icon;
  const isEven = index % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <div
      ref={cardRef}
      className={`
        relative w-full md:w-[calc(50%-1.5rem)]
        ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}
      `}
    >
      {/* Linha de conexão com o ponto central */}
      <div   className="hidden md:block absolute top-8 w-8 h-px bg-slate-200">
        <div className={`
          w-2 h-2 rounded-full bg-[#071B46] 
          ${isEven ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"}
          absolute top-1/2 -translate-y-1/2
        `} />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="group relative rounded-2xl bg-white p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      >
        {/* Gradiente de fundo no hover */}
        <div className={`
          absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color || 'from-blue-500/5 to-blue-400/5'} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        `} />

        <div  className="relative">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#071B46]/5 text-[#071B46] group-hover:bg-[#071B46] group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
              <Icon size={20} className="transition-transform duration-300 group-hover:rotate-3" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#071B46]/60 group-hover:text-[#071B46] transition-colors">
                {item.year}
              </p>
              <h3 className="mt-0.5 text-lg font-semibold text-slate-900 group-hover:text-[#071B46] transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
          
          <p className="mt-3 text-sm leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors">
            {item.text}
          </p>
        </div>
      </motion.article>
    </div>
  );
});

TimelineCard.displayName = 'TimelineCard';

// Stat Card Component
const StatCard = memo(({ stat, index }: { stat: HistoryStat; index: number }) => {
  const Icon = stat.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <div ref={cardRef}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.06,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="group relative rounded-xl bg-white p-5 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      >
        {Icon && (
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#071B46]/5 text-[#071B46] group-hover:bg-[#071B46] group-hover:text-white transition-all duration-300">
            <Icon size={18} />
          </div>
        )}
        <p className="text-2xl font-bold text-[#071B46] group-hover:text-[#071B46]/80 transition-colors">
          {stat.value}
        </p>
        <p className="mt-1 text-sm text-slate-500 group-hover:text-slate-600 transition-colors">
          {stat.label}
        </p>
      </motion.div>
    </div>
  );
});

StatCard.displayName = 'StatCard';

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
function NossaHistoria() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const topLabel = useMemo(() => "DESDE 1981", []);

  // GSAP Animation - Otimizada
  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const line = lineRef.current;

    if (!section || !timeline || !line) return;

    const cards = Array.from(timeline.querySelectorAll("[data-timeline-card]"));

    // Reset inicial
    gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
    gsap.set(cards, { opacity: 0, y: 30 });

    // Timeline principal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power2.out" }
    });

    tl.to(line, { 
      scaleY: 1, 
      duration: 1.5, 
      ease: "power3.inOut" 
    })
    .to(cards, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      stagger: 0.12,
      ease: "power2.out"
    }, "-=1");

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);


  return (
    <section 
      id="empresa"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 px-4 py-20 sm:px-6 lg:px-8"
      aria-labelledby="nossa-historia-title"
    >
      {/* Background Decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#071B46]/[0.02] blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#071B46]/[0.02] blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#071B46]/[0.01] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-16 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#071B46]/60">
              {topLabel}
            </span>
          </motion.div>

          <motion.h2
            id="nossa-historia-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            45 Anos Construindo
            <br />
            <span className="text-[#071B46]">Histórias</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 lg:mx-0"
          >
            Mais de quatro décadas oferecendo qualidade, confiança e compromisso com milhares de clientes em Betim e região.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#071B46]/10 bg-white px-5 py-2.5 text-sm font-semibold text-[#071B46] shadow-sm"
          >
            <Clock size={16} />
            45 ANOS · Desde 1981
          </motion.div>
        </header>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          {/* Timeline */}
          <div className="relative">
            {/* Linha vertical central */}
            <div 
              ref={lineRef}
              className="absolute left-4 top-0 h-full w-0.5 bg-[#071B46]/20 md:left-1/2 md:-translate-x-1/2"
              style={{ transformOrigin: "top center" }}
            />

            <div ref={timelineRef} className="relative flex flex-col gap-8 md:gap-10">
              {TIMELINE_ITEMS.map((item, index) => (
                <div 
                  key={item.year} 
                  data-timeline-card 
                  className="relative flex flex-col md:flex-row md:justify-between"
                >
                  {/* Ponto central - Desktop */}
                  <div className="hidden md:block absolute left-1/2 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-[#071B46] shadow-md z-10" />
                  
                  <TimelineCard item={item} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Nossa Marca */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24 rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-8 shadow-card"
            >
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#071B46]/60">
                Nossa Marca
              </span>
              
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-900">
                Mais do que vender materiais de construção, construímos relações de confiança há mais de quatro décadas.
              </h3>
              
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A Construbet nasceu para servir clientes com honestidade, disponibilidade e uma visão longa de mercado. Hoje, essa essência segue viva em cada atendimento, produto e projeto.
              </p>

              {/* Stats Grid */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {STATS_DATA.map((stat, index) => (
                  <StatCard key={stat.label} stat={stat} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* BANNER INFERIOR - Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 rounded-3xl bg-[#071B46] px-6 py-10 text-white shadow-2xl shadow-[#071B46]/10 sm:px-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-sky-200">
                Nossa Essência
              </span>
              <p className="mt-2 text-2xl font-semibold leading-tight sm:text-3xl">
                "Mais do que vender materiais de construção, construímos relações de confiança há mais de quatro décadas."
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 flex-shrink-0">
              <a 
                href="https://www.construbet.com.br" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#071B46] transition-all duration-200 hover:bg-slate-100 hover:scale-105 hover:shadow-lg"
              >
                Conheça nossa loja
              </a>
            
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(NossaHistoria);