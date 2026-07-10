"use client";

import { motion } from "framer-motion";

type Props = { onReturn: () => void };

const LINKS = [
  { label: "Collection", href: "#collection" },
];

export default function Nav({ onReturn }: Props) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-5"
    >
      {/* wordmark — return to tunnel */}
      <button
        onClick={onReturn}
        className="display text-sm tracking-[0.2em] text-bone/70 hover:text-brass focus-visible:text-brass focus-visible:outline-none transition-colors"
      >
        NEU <span className="text-brass">·</span> TIME TUNNEL
      </button>

      {/* section links */}
      <div className="flex items-center gap-8">
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => scrollTo(l.href)}
            className="text-xs tracking-[0.25em] uppercase text-bone/50 hover:text-brass focus-visible:text-brass focus-visible:outline-none transition-colors"
          >
            {l.label}
          </button>
        ))}
        <a
        href="/admin/qr"
          className="text-xs tracking-[0.25em] uppercase text-bone/50 hover:text-brass transition-colors"
        >
          QR Codes
        </a>
      </div>
    </motion.nav>
  );
}