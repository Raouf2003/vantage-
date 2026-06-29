"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const steps = ["step1", "step2", "step3", "step4", "step5"] as const;

export default function Strategy() {
  const t = useTranslations("strategy");
  const [active, setActive] = useState(0);

  return (
    <section id="strategy" className="bg-[#F0EDE8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex gap-0 lg:gap-16 xl:gap-24">

          {/* ── LEFT PANEL: desktop full / mobile slim strip ── */}
          <div className="sticky top-0 h-screen flex flex-col justify-between py-12 lg:py-28 shrink-0 w-10 sm:w-12 lg:w-56 xl:w-64">

            {/* Desktop: title block — hidden on mobile */}
            <div className="hidden lg:block">
              <span className="block w-[3px] h-10 bg-[#C8A96E] mb-6" />
              <p className="text-xs tracking-[0.25em] uppercase text-[#C8A96E] mb-3">
                {t("title")}
              </p>
              <h2 className="text-lg font-bold text-[#1A1A18] leading-snug tracking-tight">
                {t("subtitle")}
              </h2>
            </div>

            {/* Mobile: gold rule top — hidden on desktop */}
            <div className="lg:hidden flex flex-col items-center">
              <span className="block w-[2px] h-8 bg-[#C8A96E]" />
            </div>

            {/* Step indicators — shared, different style per breakpoint */}
            <div className="flex flex-col items-start lg:items-start gap-4 lg:gap-3">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center gap-2 lg:gap-3">

                  {/* Mobile: number only, vertical */}
                  <span
                    className={`lg:hidden text-[10px] tabular-nums font-medium tracking-wider transition-all duration-300 ${
                      active === i
                        ? "text-[#C8A96E]"
                        : "text-[#1A1A18]/20"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Desktop: dash + number */}
                  <span
                    className={`hidden lg:block h-px transition-all duration-500 ${
                      active === i ? "w-8 bg-[#C8A96E]" : "w-3 bg-[#1A1A18]/20"
                    }`}
                  />
                  <span
                    className={`hidden lg:block text-xs tabular-nums tracking-wider transition-colors duration-300 ${
                      active === i ? "text-[#C8A96E]" : "text-[#1A1A18]/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            <div />
          </div>

          {/* ── DIVIDER LINE ── */}
          <div className="sticky top-0 h-screen self-stretch shrink-0">
            <div className="h-full w-px bg-[#DDD9D0]" />
          </div>

          {/* ── RIGHT: scrollable steps ── */}
          <div className="flex-1 pl-5 sm:pl-8 lg:pl-16 xl:pl-20 py-12 lg:py-28">

            {/* Section title — mobile only */}
            <div className="lg:hidden mb-10">
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#C8A96E] mb-2">
                {t("title")}
              </p>
              <h2
                className="font-bold text-[#1A1A18] leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(1.6rem, 6vw, 2.4rem)" }}
              >
                {t("subtitle")}
              </h2>
            </div>

            {steps.map((step, i) => (
              <StepObserver key={step} index={i} onEnter={setActive}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`py-10 sm:py-14 ${
                    i < steps.length - 1 ? "border-b border-[#DDD9D0]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs tracking-[0.25em] uppercase text-[#C8A96E]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="block w-5 h-px bg-[#C8A96E]/40" />
                    </div>
                    <span className="text-xs tracking-wider text-[#6B6B62] uppercase">
                      {t(`${step}.year`)}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-[#1A1A18] leading-tight tracking-tight mb-4"
                    style={{ fontSize: "clamp(1.3rem, 4.5vw, 2.4rem)" }}
                  >
                    {t(`${step}.title`)}
                  </h3>

                  <p className="text-sm sm:text-base text-[#6B6B62] leading-relaxed">
                    {t(`${step}.description`)}
                  </p>
                </motion.div>
              </StepObserver>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function StepObserver({
  children,
  index,
  onEnter,
}: {
  children: React.ReactNode;
  index: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onEnter(index);
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onEnter]);

  return <div ref={ref}>{children}</div>;
}