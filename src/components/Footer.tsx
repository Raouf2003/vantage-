"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const c = useTranslations("contact");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const navLinks = [
    { href: "#ecosystem", label: n("ecosystem") },
    { href: "#strategy", label: n("strategy") },
    { href: "#investment", label: n("investment") },
    { href: "#contact", label: n("contact") },
  ];

  return (
    <footer className="bg-[#F0EDE8]">
      <div className="h-[2px] bg-[#C8A96E]" />

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20" dir={isRtl ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-2 max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/Vantage.png"
                alt="Vantage Group"
                className="h-10 w-auto object-contain"
              />
              <span className="text-lg font-bold tracking-tight text-[#1A1A18]">
                Vantage Group
              </span>
            </div>
            <p className="text-sm text-[#6B6B62] leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#6B6B62] mb-5">
              {t("quickLinks")}
            </p>
            <nav className="flex flex-col items-start gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="text-sm text-[#1A1A18] hover:text-[#C8A96E] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#6B6B62] mb-5">
              {c("title")}
            </p>
            <div className="space-y-3">
              <p className="text-sm text-[#1A1A18] leading-relaxed">
                {c("address")}
              </p>
              <a
                href={`tel:${c("phone").replace(/[^\d+]/g, "")}`}
                className="block text-sm text-[#1A1A18] hover:text-[#C8A96E] transition-colors duration-300"
              >
                {c("phone")}
              </a>
              <a
                href="mailto:contact@vantage-group.com"
                className="block text-sm text-[#1A1A18] hover:text-[#C8A96E] transition-colors duration-300"
              >
                contact@vantage-group.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-6 border-t border-[#DDD9D0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6B62]/50">
            &copy; {new Date().getFullYear()} Vantage Group. {t("rights")}
          </p>
          <div className="flex items-center gap-2">
            <span className="block w-5 h-px bg-[#C8A96E]" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C8A96E]">
              Vantage
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
