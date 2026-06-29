// Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { useAnchors } from "@/contexts/AnchorContext";

const navLinks = [
  { href: "#ecosystem", labelKey: "ecosystem" },
  { href: "#strategy", labelKey: "strategy" },
  { href: "#investment", labelKey: "investment" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { navbarAnchorRef } = useAnchors();
  const isRtl = locale === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const logoTextOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#F0EDE8]/90 backdrop-blur-xl border-b border-[#DDD9D0]"
            : "bg-transparent"
        }`}
      >
        <div
          className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div ref={navbarAnchorRef} className="w-[62px] h-[62px] flex items-center justify-center">
              {/* VG monogram */}
              <motion.span
                className="text-base font-bold tracking-[0.12em] text-[#1A1A18] group-hover:text-[#C8A96E] transition-colors duration-300"
                style={{ opacity: logoTextOpacity }}
              >
                VANTAGE
              </motion.span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className="relative text-xs font-medium tracking-[0.15em] uppercase text-[#6B6B62] hover:text-[#1A1A18] transition-colors duration-200 group"
              >
                {t(link.labelKey as any)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-5">
            <LanguageSwitcher />
            {/* Sharp-corner CTA — no rounded-full */}
            <Link
              href="#contact"
              className="px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase text-[#FAFAF7] bg-[#1A1A18] hover:bg-[#C8A96E] transition-colors duration-300"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center border border-[#DDD9D0] hover:border-[#C8A96E] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={18} className="text-[#1A1A18]" />
          </button>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}