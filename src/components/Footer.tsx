"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-12 px-6 border-t border-[#e5e5e0] bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img
            src="/images/Vantage.png"
            alt="Vantage Group"
            className="h-20 w-auto object-contain"
          />
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="#ecosystem"
            className="text-sm text-[#6b6b6b] hover:text-[#161616] transition-colors"
          >
            Ecosystem
          </Link>
          <Link
            href="#strategy"
            className="text-sm text-[#6b6b6b] hover:text-[#161616] transition-colors"
          >
            Strategy
          </Link>
          <Link
            href="#investment"
            className="text-sm text-[#6b6b6b] hover:text-[#161616] transition-colors"
          >
            Investment
          </Link>
          <Link
            href="#contact"
            className="text-sm text-[#6b6b6b] hover:text-[#161616] transition-colors"
          >
            Contact
          </Link>
        </div>

        <p className="text-sm text-[#ababa5]">
          &copy; {new Date().getFullYear()} Vantage Group. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
