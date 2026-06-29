"use client";

import { useTranslations } from "next-intl";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import AnimatedSection from "./AnimatedSection";
import { ArrowUpRight } from "lucide-react";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-sig",
});

export default function Contact() {
  const t = useTranslations("contact");

  const fields = [
    { code: "01", label: t("name"), type: "text", placeholder: "Raouf,Mohamed ...." },
    { code: "02", label: t("email"), type: "email", placeholder: "ahmed@example.com" },
  ];

  const index = [
    { code: "LOC", label: "Address", value: t("address"), href: undefined as string | undefined },
    { code: "TEL", label: "Phone", value: t("phone"), href: `tel:${t("phone").replace(/[^\d+]/g, "")}` },
    { code: "EML", label: "Email", value: "contact@vantage-group.com", href: "mailto:contact@vantage-group.com" },
  ];

  return (
    <section
      id="contact"
      className={`${display.variable} ${mono.variable} py-28 sm:py-36 px-6 bg-[#f7f5f0]`}
    >
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="max-w-4xl mb-20 lg:mb-28">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[12px] tracking-[0.14em] uppercase text-[#6b552f] whitespace-nowrap font-medium"
                style={{ fontFamily: "var(--font-mono-sig)" }}
              >
                {t("title")}
              </span>
              <span className="flex-1 h-px bg-[#d9d4c6]" />
            </div>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light tracking-tight text-[#11140f] leading-[0.98]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("titleAccent")}
            </h2>
            <p className="mt-7 text-xl text-[#403d36] max-w-xl leading-[1.6]">
              {t("subtitle")}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24">
          {/* Form */}
          <AnimatedSection delay={0.1}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-9">
              {fields.map((field) => (
                <div key={field.code} className="border-t border-[#dcd9d0] first:border-t-0 pt-7 first:pt-0">
                  <label
                    htmlFor={`field-${field.code}`}
                    className="block text-[12px] tracking-[0.12em] uppercase text-[#6b552f] mb-3 font-medium"
                    style={{ fontFamily: "var(--font-mono-sig)" }}
                  >
                    {field.code} — {field.label}
                  </label>
                  <input
                    id={`field-${field.code}`}
                    type={field.type}
                    className="w-full bg-transparent border-b-2 border-[#c9c4b6] px-3 py-3 text-xl text-[#11140f] placeholder-[#7a766a] outline-none rounded-t-md focus:border-[#3d4a3f] focus:bg-[#3d4a3f]/[0.04] transition-all duration-300"
                    style={{ fontFamily: "var(--font-display)" }}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div className="border-t border-[#dcd9d0] pt-7">
                <label
                  htmlFor="field-message"
                  className="block text-[12px] tracking-[0.12em] uppercase text-[#6b552f] mb-3 font-medium"
                  style={{ fontFamily: "var(--font-mono-sig)" }}
                >
                  03 — {t("message")}
                </label>
                <textarea
                  id="field-message"
                  rows={4}
                  className="w-full bg-transparent border-b-2 border-[#c9c4b6] px-3 py-3 text-xl text-[#11140f] placeholder-[#7a766a] outline-none rounded-t-md focus:border-[#3d4a3f] focus:bg-[#3d4a3f]/[0.04] transition-all duration-300 resize-none"
                  style={{ fontFamily: "var(--font-display)" }}
                  placeholder="Tell us about your project…"
                />
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex items-center gap-4"
              >
                <span className="w-14 h-14 rounded-full bg-[#11140f] flex items-center justify-center group-hover:bg-[#3d4a3f] transition-colors duration-300">
                  <ArrowUpRight
                    size={18}
                    className="text-[#f7f5f0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
                <span
                  className="text-[12px] tracking-[0.14em] uppercase text-[#11140f] font-medium"
                  style={{ fontFamily: "var(--font-mono-sig)" }}
                >
                  {t("send")}
                </span>
              </button>
            </form>
          </AnimatedSection>

          {/* Index / manifest */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col h-full">
              <div>
                {index.map((row) => (
                  <div
                    key={row.code}
                    className="border-t border-[#dcd9d0] first:border-t-0 py-7 flex items-start gap-6"
                  >
                    <span
                      className="text-[12px] tracking-[0.12em] uppercase text-[#6b552f] pt-1.5 w-14 shrink-0 font-medium"
                      style={{ fontFamily: "var(--font-mono-sig)" }}
                    >
                      {row.code}
                    </span>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="text-xl text-[#11140f] leading-[1.5] hover:text-[#3d4a3f] transition-colors duration-200"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p
                        className="text-xl text-[#11140f] leading-[1.5]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {row.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}