"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "./AnimatedSection";

const items = [
  {
    image: "/images/digitalSmart.JPG",
    titleKey: "card1.title" as const,
    descKey: "card1.description" as const,
    index: "01",
  },
  {
    image: "/images/cenima.JPG",
    titleKey: "card3.title" as const,
    descKey: "card3.description" as const,
    index: "02",
  },
];

export default function Ecosystem() {
  const t = useTranslations("ecosystem");

  return (
    <section id="ecosystem" className="py-28 sm:py-36 bg-[#F0EDE8]">
      {/* Section header */}
      <div className="px-6 max-w-7xl mx-auto mb-20 sm:mb-28">
        <AnimatedSection>
          <div className="flex items-start gap-4">
            <span className="mt-1.5 block w-[3px] h-12 bg-[#C8A96E] shrink-0" />
            <div>
              <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#C8A96E] mb-3">
                {t("title")}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1A1A18] leading-[1.1]">
                {t("subtitle")}
              </h2>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Division panels */}
      <div className="flex flex-col">
        {items.map((item, index) => (
          <AnimatedSection key={index} delay={index * 0.12}>
            <div
              className={`
                flex flex-col lg:flex-row
                ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}
                border-t border-[#DDD9D0] last:border-b
              `}
            >
              {/* Image — full bleed, no padding */}
              <div className="w-full lg:w-[55%] overflow-hidden bg-[#1A1A18] group">
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="w-full h-72 sm:h-96 lg:h-[480px] object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Gold rule separator — desktop only */}
              <div className="hidden lg:block w-[2px] bg-[#C8A96E] shrink-0 self-stretch" />

              {/* Text content */}
              <div className="w-full lg:w-[45%] flex items-center px-6 sm:px-10 lg:px-14 py-12 lg:py-16 relative overflow-hidden">
                {/* Ghost index numeral */}
                <span
                  className="absolute -top-4 right-4 text-[9rem] sm:text-[12rem] font-bold leading-none text-[#1A1A18]/[0.04] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {item.index}
                </span>

                <div className="relative z-10 max-w-md">
                  <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#C8A96E] mb-4">
                    {item.index} — {t("title")}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1A18] mb-5 leading-snug">
                    {t(item.titleKey)}
                  </h3>
                  {/* Divider */}
                  <span className="block w-10 h-[2px] bg-[#C8A96E] mb-5" />
                  <p className="text-[#6B6B62] leading-relaxed text-sm sm:text-base">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}