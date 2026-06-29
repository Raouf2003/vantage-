"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, Target, Shield } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const pillarKeys = ["pillar1", "pillar2", "pillar3"] as const;

const pillarIcons = [TrendingUp, Target, Shield] as const;

export default function Investment() {
  const t = useTranslations("investment");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  const totalPanels = 6;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(totalPanels - 1) * 100}vw`]
  );

  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Derive active panel from scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const panel = Math.min(
      Math.floor(latest * totalPanels),
      totalPanels - 1
    );
    setActivePanel(panel);
  });

  return (
    <div
      id="investment"
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalPanels * 100}vh` }}
    >
      <div className="sticky top-0 h-screen bg-[#1A1A18] overflow-hidden">

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[2px] bg-white/10">
          <motion.div
            className="h-full bg-[#C8A96E] origin-left"
            style={{ width: progress }}
          />
        </div>

        {/* Slide track */}
        <motion.div style={{ x }} className="flex h-full" dir="ltr">

          {/* ── PANEL 0: Section intro ── */}
          <Panel>
            <div className="flex flex-col justify-between h-full py-16 sm:py-24 px-10 sm:px-16 lg:px-24">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-8">
                  {t("title")}
                </p>
                <h2
                  className="font-bold text-white leading-[1.0] tracking-tight max-w-lg"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
                >
                  {t("subtitle")}
                </h2>
              </div>
              <div>
                <p className="text-sm text-white/30 max-w-xs leading-relaxed">
                  {t("approachDesc")}
                </p>
              </div>
            </div>
            <GhostNumber value="01" />
          </Panel>

          {/* ── PANEL 1: Approach ── */}
          <Panel accent>
            <div className="flex flex-col justify-center h-full py-16 sm:py-24 px-10 sm:px-16 lg:px-24">
              <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A18]/50 mb-6">
                {String(2).padStart(2, "0")} — {t("title")}
              </p>
              <h3
                className="font-bold text-[#1A1A18] leading-tight tracking-tight mb-8 max-w-lg"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                {t("approach")}
              </h3>
              <div className="w-10 h-[3px] bg-[#1A1A18]/30 mb-8" />
              <p className="text-base text-[#1A1A18]/60 leading-relaxed max-w-md">
                {t("approachDesc")}
              </p>
            </div>
            <GhostNumber value="02" dark />
          </Panel>

          {/* ── PANEL 2: Portfolio ── */}
          <Panel>
            <div className="flex flex-col justify-center h-full py-16 sm:py-24 px-10 sm:px-16 lg:px-24">
              <p className="text-xs tracking-[0.3em] uppercase text-[#C8A96E] mb-6">
                {String(3).padStart(2, "0")} — {t("title")}
              </p>
              <h3
                className="font-bold text-white leading-tight tracking-tight mb-8 max-w-lg"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              >
                {t("portfolio")}
              </h3>
              <div className="w-10 h-[3px] bg-[#C8A96E] mb-8" />
              <p className="text-base text-white/50 leading-relaxed max-w-md">
                {t("portfolioDesc")}
              </p>
            </div>
            <GhostNumber value="03" />
          </Panel>

          {/* ── PANELS 3–5: Pillars ── */}
          {pillarKeys.map((key, i) => {
            const Icon = pillarIcons[i];
            return (
              <Panel key={key} accent={i % 2 === 1}>
                <div
                  className={`flex flex-col justify-between h-full py-16 sm:py-24 px-10 sm:px-16 lg:px-24 ${
                    i % 2 === 1 ? "text-[#1A1A18]" : "text-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <p
                      className={`text-xs tracking-[0.3em] uppercase ${
                        i % 2 === 1 ? "text-[#1A1A18]/40" : "text-[#C8A96E]"
                      }`}
                    >
                      {String(i + 4).padStart(2, "0")} — {t("title")}
                    </p>
                    <Icon
                      size={32}
                      strokeWidth={1.2}
                      className={i % 2 === 1 ? "text-[#1A1A18]/30" : "text-[#C8A96E]/60"}
                    />
                  </div>

                  <div>
                    <h3
                      className="font-bold leading-tight tracking-tight mb-6 max-w-sm"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
                    >
                      {t(`${key}.title`)}
                    </h3>
                    <div
                      className={`w-10 h-[3px] mb-6 ${
                        i % 2 === 1 ? "bg-[#1A1A18]/20" : "bg-[#C8A96E]"
                      }`}
                    />
                    <p
                      className={`text-base leading-relaxed max-w-md ${
                        i % 2 === 1 ? "text-[#1A1A18]/55" : "text-white/50"
                      }`}
                    >
                      {t(`${key}.description`)}
                    </p>
                  </div>

                  <div
                    className={`text-xs tracking-widest uppercase ${
                      i % 2 === 1 ? "text-[#1A1A18]/20" : "text-white/15"
                    }`}
                  >
                    {i + 1} / {pillarKeys.length}
                  </div>
                </div>
                <GhostNumber value={String(i + 4).padStart(2, "0")} dark={i % 2 === 1} />
              </Panel>
            );
          })}

        </motion.div>

        {/* ── PANEL COUNTER — bottom right ── */}
        <div className="absolute bottom-8 right-10 z-20 flex items-center gap-2">
          {Array.from({ length: totalPanels }).map((_, i) => (
            <motion.span
              key={i}
              className="block h-[2px] rounded-none origin-left"
              animate={{
                width: activePanel === i ? 28 : 10,
                backgroundColor:
                  activePanel === i ? "#C8A96E" : "rgba(255,255,255,0.2)",
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            />
          ))}
          <span className="ml-2 text-[10px] tabular-nums tracking-widest text-white/30">
            {String(activePanel + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(totalPanels).padStart(2, "0")}
          </span>
        </div>

      </div>
    </div>
  );
}

function Panel({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden ${
        accent ? "bg-[#C8A96E]" : "bg-[#1A1A18]"
      }`}
      style={{ width: "100vw", height: "100vh" }}
    >
      {children}
    </div>
  );
}

function GhostNumber({
  value,
  dark = false,
}: {
  value: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`absolute -bottom-8 -right-4 font-bold leading-none select-none pointer-events-none tabular-nums ${
        dark ? "text-[#1A1A18]/[0.07]" : "text-white/[0.05]"
      }`}
      style={{ fontSize: "clamp(10rem, 22vw, 18rem)" }}
      aria-hidden="true"
    >
      {value}
    </span>
  );
}