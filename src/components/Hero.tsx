// Hero.tsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useAnchors } from "@/contexts/AnchorContext";

export default function Hero() {
  const t = useTranslations("hero");
  const { heroAnchorRef } = useAnchors();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center sm:items-end pb-20 sm:pb-28 overflow-hidden bg-[#F0EDE8]"
      style={{
        backgroundImage: `repeating-linear-gradient(
          -45deg,
          transparent,
          transparent 60px,
          rgba(26,26,24,0.018) 60px,
          rgba(26,26,24,0.018) 61px
        )`,
      }}
    >
      <div
        ref={heroAnchorRef}
        className="absolute bottom-0 start-5 w-20 h-24 pointer-events-none"
      />

      {/* Large ghost word — top right, architectural */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-24 right-4 sm:right-10 text-[clamp(5rem,18vw,16rem)] font-bold leading-none text-[#1A1A18]/[0.04] select-none pointer-events-none tracking-tight hidden sm:block"
        aria-hidden="true"
      >
        VANTAGE
      </motion.span>

      <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
        {/* Gold rule + eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <span className="block w-[3px] h-10 bg-[#C8A96E]" />
          <p className="text-xs font-medium tracking-[0.28em] uppercase text-[#C8A96E]">
            {t("eyebrow")}
          </p>
        </motion.div>

        {/* Main headline — left aligned, editorial scale */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(2.8rem,7vw,7rem)] font-bold tracking-tight text-[#1A1A18] leading-[1.02] max-w-4xl"
        >
          {t("title")}
          <br />
          <span className="text-[#C8A96E]">{t("titleAccent")}</span>
        </motion.h1>

        {/* Divider rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="origin-left mt-8 mb-8 w-24 h-[2px] bg-[#C8A96E]"
        />

        {/* Subline + CTAs side by side on large screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10"
        >
          <p className="text-base sm:text-lg text-[#6B6B62] max-w-xl leading-relaxed">
            {t("subtitle")}
          </p>

          {/* CTA */}
          <a
            href="#strategy"
            className="self-end inline-block px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#1A1A18] border border-[#1A1A18] hover:border-[#C8A96E] hover:text-[#C8A96E] transition-colors duration-300"
          >
            {t("ctaSecondary")}
          </a>
        </motion.div>
      </div>

    </section>
  );
}