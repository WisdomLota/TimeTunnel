"use client";

import { ThemeProvider, useTheme } from "./theme-provider";
import Hero from "@/components/Hero";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 text-xs font-[family-name:var(--font-body)] border border-brass/40 px-4 py-2 rounded-full text-brass hover:border-brass transition-colors"
    >
      {theme === "dark" ? "Lights on" : "Lights off"}
    </button>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Hero />
      {/* spacer so scroll-recede has room — next section replaces this */}
      <section className="h-screen" />
    </ThemeProvider>
  );
}