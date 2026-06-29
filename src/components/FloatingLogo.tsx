"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, useMotionValue } from "framer-motion";
import { useAnchors } from "@/contexts/AnchorContext";

interface AnchorRect {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

const SCROLL_RANGE = 400;
const Y_OFFSET = -28; // px — logo vertical offset at scroll=0 (negative=up)

function easeOut(p: number) {
  return 1 - Math.pow(1 - p, 2);
}

export default function FloatingLogo() {
  const { heroAnchorRef, navbarAnchorRef } = useAnchors();
  const { scrollY } = useScroll();

  const [start, setStart] = useState<AnchorRect | null>(null);
  const [end, setEnd] = useState<AnchorRect | null>(null);

  // Keep latest rects in refs so scroll handler always reads fresh values
  const startRef = useRef<AnchorRect | null>(null);
  const endRef = useRef<AnchorRect | null>(null);

  // Raw motion values driven manually
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const mw = useMotionValue(0);
  const mh = useMotionValue(0);
  const mOpacity = useMotionValue(1);

  const measure = useCallback(() => {
    // rAF ensures layout is committed before reading rects
    requestAnimationFrame(() => {
      const heroEl = heroAnchorRef.current;
      const navEl = navbarAnchorRef.current;
      if (!heroEl || !navEl) return;

      const hr = heroEl.getBoundingClientRect();
      const nr = navEl.getBoundingClientRect();

      const s: AnchorRect = {
        cx: hr.left + hr.width / 2,
        cy: hr.top + hr.height / 2,
        w: hr.width,
        h: hr.height,
      };
      const e: AnchorRect = {
        cx: nr.left + nr.width / 2,
        cy: nr.top + nr.height / 2,
        w: nr.width,
        h: nr.height,
      };

      startRef.current = s;
      endRef.current = e;
      setStart(s);
      setEnd(e);

      // Immediately update motion values to current scroll position
      updateMotionValues(window.scrollY, s, e);
    });
  }, [heroAnchorRef, navbarAnchorRef]);

  function updateMotionValues(scrollYVal: number, s: AnchorRect, e: AnchorRect) {
    const p = Math.min(scrollYVal / SCROLL_RANGE, 1);
    const ease = easeOut(p);

    const cw = s.w + (e.w - s.w) * ease;
    const ch = s.h + (e.h - s.h) * ease;
    const cx = s.cx + (e.cx - s.cx) * ease;
    const cy = s.cy + (e.cy - s.cy) * ease;
    const cyOffset = Y_OFFSET * (1 - ease);

    mx.set(cx - cw / 2);
    my.set(cy - ch / 2 + cyOffset);
    mw.set(cw);
    mh.set(ch);
    mOpacity.set(1 - ease * 0.2);
  }

  // Subscribe to scrollY — always reads fresh rects from refs
  useEffect(() => {
    const unsub = scrollY.on("change", (val) => {
      const s = startRef.current;
      const e = endRef.current;
      if (!s || !e) return;
      updateMotionValues(val, s, e);
    });
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    measure();

    const ro = new ResizeObserver(measure);
    if (heroAnchorRef.current) ro.observe(heroAnchorRef.current);
    if (navbarAnchorRef.current) ro.observe(navbarAnchorRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  if (!start || !end) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        x: mx,
        y: my,
        width: mw,
        height: mh,
        opacity: mOpacity,
      }}
    >
      <img
        src="/images/Vantage.png"
        alt="Vantage Group"
        className="w-full h-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
}