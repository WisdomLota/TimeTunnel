"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const RINGS = [1, 2, 3, 4, 5];
const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ onEnter }: { onEnter: () => void }) {
  const [diving, setDiving] = useState(false);

  const handleEnter = () => {
    setDiving(true);
    setTimeout(onEnter, 1100); // let the dive play before unmount
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #12211D 0%, var(--color-void) 70%), var(--color-void)",
      }}
      exit={{ opacity: 0, filter: "blur(8px)", scale: 1.15 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* tunnel rings */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "800px" }} aria-hidden>
        {RINGS.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, scale: 1.4 }}
            animate={
              diving
                ? { opacity: 0, scale: 3 + i * 0.5 } // rush outward on dive
                : { opacity: 0.15 + i * 0.06, scale: [1, 1.015, 1] }
            }
            transition={
              diving
                ? { duration: 1, ease: [0.7, 0, 0.84, 0] }
                : {
                    opacity: { delay: 0.2 + i * 0.12, duration: 1 },
                    scale: { duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                  }
            }
            className="absolute rounded-full border"
            style={{
              width: `${28 + r * 16}vmin`,
              height: `${28 + r * 16}vmin`,
              borderColor: "var(--color-brass)",
            }}
          />
        ))}
      </div>

      {/* title — blurs and scales through on dive */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={diving ? { opacity: 0, scale: 1.6, filter: "blur(10px)" } : { opacity: 1, scale: 1, y: 0 }}
        transition={diving ? { duration: 1, ease: [0.7, 0, 0.84, 0] } : { delay: 0.5, duration: 1.1, ease: EASE }}
        className="relative z-10 text-center px-6"
      >
        <p className="text-xs tracking-[0.4em] text-brass/70 uppercase mb-6">Near East University</p>
        <h1 className="display text-6xl md:text-8xl lg:text-9xl brass-text leading-[0.9]">Time Tunnel</h1>
        <p className="mt-6 max-w-md mx-auto text-bone/60 leading-relaxed">
          A passage through the Günsel Art Museum — a living collection of paintings and sculpture from across the Turkic world and beyond.
        </p>
      </motion.div>

      {/* Enter button */}
      <motion.button
        onClick={handleEnter}
        initial={{ opacity: 0 }}
        animate={{ opacity: diving ? 0 : 1 }}
        transition={{ delay: diving ? 0 : 1.6, duration: 0.6 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 z-10 group"
      >
        <span className="text-[10px] tracking-[0.3em] text-bone/40 group-hover:text-brass uppercase transition-colors">
          Enter
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-linear-to-b from-brass to-transparent"
        />
      </motion.button>
    </motion.section>
  );
}