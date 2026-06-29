"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "ar", label: "AR" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLanguage(code: string) {
    router.replace(pathname, { locale: code });
    setOpen(false);
  }

  const current = languages.find((l) => l.code === locale) || languages[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#6b6b6b] hover:text-[#161616] transition-colors"
      >
        {current.label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-20 bg-white border border-[#e5e5e0] rounded-lg shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full px-4 py-2.5 text-sm text-left transition-colors hover:bg-[#f8f8f6] ${
                lang.code === locale ? "font-semibold text-[#a67c00]" : "text-[#6b6b6b]"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
