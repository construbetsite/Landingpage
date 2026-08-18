import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { socialLinks } from "../../data/socialLinks";
import SocialCard from "./SocialCard";
import SectionHeader from "./SectionHeader";

export default function SocialMediaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        "-0.2"
      )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-0.2"
      )
      .fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-0.1"
      );
  }, []);

  return (
    <section ref={sectionRef} className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="social-media-title">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 rounded-[32px] border border-slate-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(7,27,70,0.06)] sm:px-8 lg:px-10">
        <SectionHeader
          eyebrow="Redes sociais"
          title="Acompanhe a Construbet"
          description="Fique por dentro de lançamentos, promoções, dicas de construção, tendências em acabamentos e conteúdos exclusivos preparados para você."
        />

        <div ref={cardsRef} className="flex w-full gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 xl:grid-cols-5 md:overflow-visible md:pb-0">
          {socialLinks.map((link) => (
            <div key={link.name} className="snap-start first:pl-0 last:pr-0 md:snap-none">
              <SocialCard link={link} />
            </div>
          ))}
        </div>

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
    </section>
  );
}
