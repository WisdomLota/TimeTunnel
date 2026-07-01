"use client";

import { ThemeProvider, useTheme } from "./theme-provider";

function Shell() {
  const { theme, toggle } = useTheme();
  return (
    <main className="min-h-screen px-8 py-16 flex flex-col gap-8">
      <button
        onClick={toggle}
        className="self-start text-sm font-[family-name:var(--font-body)] border border-brass/40 px-4 py-2 rounded-full text-brass hover:border-brass transition-colors"
      >
        {theme === "dark" ? "Lights on" : "Lights off"}
      </button>

      <h1 className="display text-6xl md:text-8xl brass-text leading-[0.95]">
        NEU Time Tunnel
      </h1>

      <div className="brass-rule w-full max-w-xl" />

      <p className="max-w-md text-bone/70 leading-relaxed">
        Body copy in Inter. A quiet grotesque that steps back so the brass and
        the machine-cut display face carry the room.
      </p>

      <div className="flex gap-6 items-baseline">
        <span className="display text-4xl brass-text">1899</span>
        <span className="display text-4xl brass-text">1949</span>
        <span className="display text-4xl text-oxblood">SRT10</span>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}