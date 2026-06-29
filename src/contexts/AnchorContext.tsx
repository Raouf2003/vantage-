"use client";

import { createContext, useContext, useRef, ReactNode, RefObject } from "react";

interface AnchorContextType {
  heroAnchorRef: RefObject<HTMLDivElement | null>;
  navbarAnchorRef: RefObject<HTMLDivElement | null>;
}

const AnchorContext = createContext<AnchorContextType | null>(null);

export function useAnchors() {
  const ctx = useContext(AnchorContext);
  if (!ctx) {
    throw new Error("useAnchors must be used within AnchorProvider");
  }
  return ctx;
}

export function AnchorProvider({ children }: { children: ReactNode }) {
  const heroAnchorRef = useRef<HTMLDivElement>(null);
  const navbarAnchorRef = useRef<HTMLDivElement>(null);

  return (
    <AnchorContext.Provider value={{ heroAnchorRef, navbarAnchorRef }}>
      {children}
    </AnchorContext.Provider>
  );
}
