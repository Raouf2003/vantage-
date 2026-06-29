"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAnchors } from "@/contexts/AnchorContext";

interface AnchorRect {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

const SCROLL_RANGE = 500;
const Y_OFFSET = -28; // px — adjust this to move logo up/down at scroll=0 (negative = up)

export default function FloatingLogo() {
  const { heroAnchorRef, navbarAnchorRef } = useAnchors();
  const { scrollY } = useScroll();

  const [start, setStart] = useState<AnchorRect | null>(null);
  const [end, setEnd] = useState<AnchorRect | null>(null);

  const measure = useCallback(() => {
    const heroEl = heroAnchorRef.current;
    const navEl = navbarAnchorRef.current;
    if (!heroEl || !navEl) return;

    const hr = heroEl.getBoundingClientRect();
    const nr = navEl.getBoundingClientRect();

    setStart({
      cx: hr.left + hr.width / 2,
      cy: hr.top + hr.height / 2,
      w: hr.width,
      h: hr.height,
    });

    setEnd({
      cx: nr.left + nr.width / 2,
      cy: nr.top + nr.height / 2,
      w: nr.width,
      h: nr.height,
    });
  }, [heroAnchorRef, navbarAnchorRef]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);

    const ro = new ResizeObserver(measure);
    if (heroAnchorRef.current) ro.observe(heroAnchorRef.current);
    if (navbarAnchorRef.current) ro.observe(navbarAnchorRef.current);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  const x = useTransform(scrollY, (sy) => {
    if (!start || !end) return 0;
    const p = Math.min(sy / SCROLL_RANGE, 1);
    const ease = 1 - Math.pow(1 - p, 1.5);
    const cw = start.w + (end.w - start.w) * ease;
    return start.cx + (end.cx - start.cx) * ease - cw / 2;
  });

  const y = useTransform(scrollY, (sy) => {
    if (!start || !end) return 0;
    const p = Math.min(sy / SCROLL_RANGE, 1);
    const ease = 1 - Math.pow(1 - p, 1.5);
    const ch = start.h + (end.h - start.h) * ease;
    return start.cy + (end.cy - start.cy) * ease - ch / 2 + Y_OFFSET * (1 - ease);
  });

  const w = useTransform(scrollY, (sy) => {
    if (!start || !end) return start?.w ?? 0;
    const p = Math.min(sy / SCROLL_RANGE, 1);
    const ease = 1 - Math.pow(1 - p, 1.5);
    return start.w + (end.w - start.w) * ease;
  });

  const h = useTransform(scrollY, (sy) => {
    if (!start || !end) return start?.h ?? 0;
    const p = Math.min(sy / SCROLL_RANGE, 1);
    const ease = 1 - Math.pow(1 - p, 1.5);
    return start.h + (end.h - start.h) * ease;
  });

  const logoOpacity = useTransform(scrollY, [0, SCROLL_RANGE], [1, 0.85]);

  if (!start || !end) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{ x, y, width: w, height: h, opacity: logoOpacity }}
    >
      <img
        src="/images/Vantage.png"
        alt="Vantage Group"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
