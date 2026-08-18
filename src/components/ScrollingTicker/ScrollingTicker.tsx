"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import styles from "./ScrollingTicker.module.css";

const phrases = [
  "Há mais de 45 anos construindo confiança em Betim",
  "Materiais para construção com as melhores marcas do mercado",
  "Entrega rápida em Betim e toda a região metropolitana",
  "Qualidade, tradição e atendimento especializado",
  "Pisos, acabamentos, ferramentas e muito mais",
  "Tradição que você confia há mais de quatro décadas",
  "Soluções completas para sua obra do início ao acabamento",
  "Compromisso com qualidade e pontualidade na entrega",
  "As melhores marcas com o melhor atendimento em Betim",
  "Materiais de construção com procedência e garantia",
  "Atendimento especializado para profissionais e consumidores",
  "Há 45 anos sendo referência em materiais para construção",
  "Entrega ágil e estoque completo para sua obra não parar",
  "Qualidade que constrói, tradição que permanece",
  "Tudo o que sua obra precisa em um só lugar",
  "Construbet: confiança que se constrói todos os dias",
];

export default function ScrollingTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!tickerRef.current || !containerRef.current) return;

      const ticker = tickerRef.current;
      const items = Array.from(ticker.querySelectorAll(`.${styles.phrase}`)) as HTMLElement[];

      if (items.length === 0) return;

      // Calcula largura total das frases originais
      let totalOriginalWidth = 0;
      items.slice(0, phrases.length).forEach((item) => {
        totalOriginalWidth += item.offsetWidth + 40; // ajuste conforme o gap/padding real
      });

      ticker.style.width = `${totalOriginalWidth * 2}px`; // para as duplicatas

      const tl = gsap.to(ticker, {
        x: -totalOriginalWidth,
        duration: 220, // ciclo completo fluido e legível
        ease: "none",
        repeat: -1,
        force3D: true, // aceleração GPU
      });

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.tickerSection}>
      <div className={styles.tickerInner}>
        <div ref={tickerRef} className={styles.tickerTrack}>
          {phrases.map((phrase, i) => (
            <span key={i} className={styles.phrase}>
              {phrase}
              <span className={styles.separator}> • </span>
            </span>
          ))}

          {/* Duplicata para loop infinito sem corte */}
          {phrases.map((phrase, i) => (
            <span key={`dup-${i}`} className={styles.phrase}>
              {phrase}
              <span className={styles.separator}> • </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}