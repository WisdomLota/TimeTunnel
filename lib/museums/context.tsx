"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { MuseumConfig } from "./types";

const MuseumContext = createContext<MuseumConfig | null>(null);

export function MuseumProvider({
  config,
  children,
}: {
  config: MuseumConfig;
  children: ReactNode;
}) {
  return (
    <MuseumContext.Provider value={config}>{children}</MuseumContext.Provider>
  );
}

export function useMuseum(): MuseumConfig {
  const ctx = useContext(MuseumContext);
  if (!ctx) throw new Error("useMuseum must be inside <MuseumProvider>");
  return ctx;
}