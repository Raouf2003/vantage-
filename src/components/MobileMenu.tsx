"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
];

export default function MobileMenu({ isOpen, onClose }: Props) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function switchLanguage(code: string) {
    router.replace(pathname, { locale: code });
  }

  const links = [
    { href: "#ecosystem", label: t("ecosystem") },
    { href: "#strategy", label: t("strategy") },
    { href: "#investment", label: t("investment") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#f8f8f6] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 h-20">
            <span className="text-xl font-bold tracking-tight text-[#161616]">Vantage</span>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#e5e5e0] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-10 gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  href={link.href as any}
                  onClick={onClose}
                  className="block text-3xl sm:text-4xl font-semibold tracking-tight text-[#161616] hover:text-[#a67c00] transition-colors py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-10 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-4"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`text-sm font-medium transition-colors ${
                    lang.code === locale
                      ? "text-[#a67c00]"
                      : "text-[#6b6b6b] hover:text-[#161616]"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
